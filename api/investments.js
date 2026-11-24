module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return res.status(503).json({ error: "Snapshot unavailable." });
  }

  try {
    const url = new URL("/rest/v1/site_investment_snapshots", SUPABASE_URL);
    url.search = "?source=eq.robinhood&select=snapshot,refreshed_at";
    const response = await fetch(url, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error("Snapshot query failed.");
    const [row] = await response.json();
    if (!row?.snapshot) throw new Error("Snapshot missing.");
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(row);
  } catch {
    return res.status(503).json({ error: "Snapshot unavailable." });
  }
};
