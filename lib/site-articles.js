const fields = "slug,title,topic,summary";

function validArticleSlug(slug) {
  return typeof slug === "string" && slug.length <= 180 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

async function getArticles(slug) {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) throw new Error("Article library unavailable.");

  const url = new URL("/rest/v1/site_articles", SUPABASE_URL);
  url.search = new URLSearchParams({
    select: slug ? fields + ",body" : fields,
    ...(slug ? { slug: "eq." + slug } : {}),
    published: "eq.true",
    order: "sort_order.asc,slug.asc",
    limit: slug ? "1" : "100",
  }).toString();
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Article query failed.");
  const articles = await response.json();
  if (!Array.isArray(articles)) throw new Error("Unexpected article response.");
  return articles;
}

module.exports = { getArticles, validArticleSlug };
