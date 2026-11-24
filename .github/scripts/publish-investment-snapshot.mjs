import { readFile } from "node:fs/promises";

const { SUPABASE_URL, SUPABASE_SNAPSHOT_WRITER_KEY } = process.env;
const date = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const label = value => typeof value === "string" && value.trim() === value
  && value.length > 0 && value.length <= 180;
const holding = row => Array.isArray(row) && row.length === 2 && label(row[0])
  && (row[1] === null || date(row[1]));
const object = value => value && typeof value === "object" && !Array.isArray(value);

try {
  if (!SUPABASE_URL || !SUPABASE_SNAPSHOT_WRITER_KEY) throw new Error("Missing database configuration.");
  const source = JSON.parse(await readFile(".github/data/robinhood-public.json", "utf8"));
  const { industries, etfs, returns, valued_on } = source;
  if (!object(industries) || !Array.isArray(etfs) || !object(returns) || !date(valued_on)) {
    throw new Error("Invalid snapshot format.");
  }
  const groups = Object.entries(industries);
  if (!groups.length || !etfs.length || !etfs.every(holding)
    || !groups.every(([name, rows]) => label(name) && Array.isArray(rows) && rows.length && rows.every(holding))) {
    throw new Error("Incomplete holdings.");
  }
  const names = new Set([...groups.flatMap(([, rows]) => rows), ...etfs].map(([name]) => name));
  const entries = Object.entries(returns);
  if (!entries.every(([name, value]) => names.has(name) && (value === null || Number.isFinite(value)))) {
    throw new Error("Invalid return entries.");
  }

  const url = new URL("/rest/v1/site_investment_snapshots", SUPABASE_URL);
  url.search = "?on_conflict=source";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SNAPSHOT_WRITER_KEY,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      source: "robinhood",
      snapshot: { industries, etfs, returns, valued_on },
      refreshed_at: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Database update failed (HTTP ${response.status}).`);
  console.log("Published public investment snapshot.");
} catch (error) {
  console.error(error instanceof SyntaxError ? "Snapshot JSON is invalid." : error.message);
  process.exitCode = 1;
}
