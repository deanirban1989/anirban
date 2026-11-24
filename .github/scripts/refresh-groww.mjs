import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const api = "https://api.groww.in";
const output = "investments/india.json";
const { GROWW_API_KEY, GROWW_API_SECRET } = process.env;

async function request(path, token, body) {
  const response = await fetch(api + path, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-VERSION": "1.0",
    },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Groww request failed (HTTP ${response.status}).`);
  return response.json();
}

try {
  if (!GROWW_API_KEY || !GROWW_API_SECRET) throw new Error("Groww repository secrets are missing.");
  const timestamp = String(Math.floor(Date.now() / 1000));
  const checksum = createHash("sha256").update(GROWW_API_SECRET + timestamp).digest("hex");
  const auth = await request("/v1/token/api/access", GROWW_API_KEY, {
    key_type: "approval",
    checksum,
    timestamp,
  });
  if (!auth.token || auth.isActive === false) throw new Error("Groww has not issued an active token.");
  const response = await request("/v1/holdings/user", auth.token);
  const holdings = response.payload?.holdings;
  if (response.status !== "SUCCESS" || !Array.isArray(holdings)) throw new Error("Holdings response is unavailable.");
  const metadata = JSON.parse(await readFile(".github/scripts/groww-companies.json", "utf8"));
  const companies = new Map();
  for (const entry of holdings) {
    if (typeof entry.quantity !== "number" || !Number.isFinite(entry.quantity)) {
      throw new Error("Holdings response has an invalid quantity.");
    }
    if (entry.quantity <= 0) continue;
    const symbol = entry.trading_symbol;
    if (typeof symbol !== "string" || !/^[A-Z0-9][A-Z0-9&.-]{0,39}$/.test(symbol)) {
      throw new Error("Holdings response has an invalid stock symbol.");
    }
    const company = metadata[entry.isin] ?? metadata[symbol];
    companies.set(entry.isin || symbol, { name: company?.name ?? symbol, date: company?.date ?? null, ...(company?.industry && { industry: company.industry }) });
  }

  const rows = [...companies.values()].sort((a, b) => a.name.localeCompare(b.name, "en"));
  await writeFile(output, JSON.stringify(rows, null, 2) + "\n");
} catch (error) {
  console.error("Groww refresh failed. Check daily approval, repository secrets, and API availability.");
  process.exitCode = 1;
}
