const { getArticles, validArticleSlug } = require("../lib/site-articles");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const slug = req.query?.article;
  if (slug !== undefined && !validArticleSlug(slug)) {
    return res.status(400).json({ error: "Invalid article." });
  }

  try {
    const articles = await getArticles(slug);
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(articles);
  } catch {
    return res.status(503).json({ error: "Article library unavailable." });
  }
};
