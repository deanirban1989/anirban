const { getArticles, validArticleSlug } = require("../lib/site-articles");
const template = require("../lib/views-template");

const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = value => String(value ?? "").replace(/[&<>"']/g, match => entities[match]);
const articleUrl = slug => "/views/?article=" + encodeURIComponent(slug);
const description = "Essays on security, building products, and investing.";
const relatedLinks = new Map([
  ["why-access-reviews-still-take-so-long", ["https://grc-os.dev/", "Visit grcOS"]],
  ["what-building-grcos-taught-me", ["https://grc-os.dev/", "Explore grcOS"]],
]);

function renderIndex(articles) {
  const topics = new Set();
  const cards = articles.map((article, index) => {
    const topic = article.topic === "Investing" ? "investing" : article.topic.toLowerCase();
    const anchor = topics.has(topic) ? "" : ` id="${esc(topic)}"`;
    topics.add(topic);
    return `<article class="work-card article-preview${index === 0 ? " article-feature" : ""}"${anchor}>
      <p class="kicker">${index === 0 ? "Featured · " : ""}${esc(article.topic)}</p>
      <h2><a href="${esc(articleUrl(article.slug))}">${esc(article.title)}</a></h2>
      <p>${esc(article.summary)}</p>
    </article>`;
  }).join("");
  return `<header class="page-intro"><h1>My Views</h1><p class="lead">${description}</p></header>
    <section class="article-list" aria-label="Published articles">${cards || "<p>No articles are published yet.</p>"}</section>`;
}

function renderArticle(article) {
  const related = relatedLinks.get(article.slug);
  const words = article.body.join(" ").trim().split(/\s+/).length;
  return `<article class="reading article-reading">
    <a class="text-link" href="/views/">All articles</a>
    <p class="kicker">${esc(article.topic)} · ${Math.max(1, Math.ceil(words / 200))} min read</p>
    <h1>${esc(article.title)}</h1>
    <p class="lead">${esc(article.summary)}</p>
    ${article.body.map(paragraph => `<p>${esc(article.slug === "why-access-reviews-still-take-so-long" ? paragraph.replace(" The demo on this site shows what the decision and evidence can look like.", "") : paragraph)}</p>`).join("")}
    ${related ? `<a class="text-link" href="${esc(related[0])}">${esc(related[1])}</a>` : ""}
  </article>`;
}

function sendPage(res, status, content, article) {
  const values = {
    title: esc((article?.title ?? "My Views") + " | Anirban De"),
    description: esc(article?.summary ?? description),
    canonical: esc("https://www.anirbande.com" + (article ? articleUrl(article.slug) : "/views/")),
    content,
  };
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", status === 200 ? "public, s-maxage=60, stale-while-revalidate=300" : "no-store");
  return res.status(status).send(template.replace(/{{(title|description|canonical|content)}}/g, (_, key) => values[key]));
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }
  const slug = req.query?.article;
  const unavailable = '<section class="page-intro"><h1>Article unavailable</h1><a class="text-link" href="/views/">Browse My Views</a></section>';
  if (slug !== undefined && !validArticleSlug(slug)) return sendPage(res, 404, unavailable);
  try {
    const articles = await getArticles(slug);
    if (slug) return articles[0] ? sendPage(res, 200, renderArticle(articles[0]), articles[0]) : sendPage(res, 404, unavailable);
    return sendPage(res, 200, renderIndex(articles));
  } catch {
    return sendPage(res, 503, '<section class="page-intro"><h1>My Views</h1><p>The article library is temporarily unavailable. Please try again later.</p></section>');
  }
};
