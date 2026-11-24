const fields = "slug,title,topic,summary,body";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return res.status(503).json({ error: "Article library unavailable." });
  }

  try {
    const url = new URL("/rest/v1/site_articles", SUPABASE_URL);
    url.search = new URLSearchParams({
      select: fields,
      published: "eq.true",
      order: "sort_order.asc,slug.asc",
      limit: "100",
    }).toString();
    const response = await fetch(url, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Article query failed.");
    const articles = await response.json();
    if (!Array.isArray(articles)) throw new Error("Unexpected article response.");
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(articles);
  } catch {
    return res.status(503).json({ error: "Article library unavailable." });
  }
};
