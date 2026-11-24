export function mountViews({ $, esc }) {
const articleLinks = {
  "why-access-reviews-still-take-so-long": ["/demo/access-review/", "Try the access review demo"],
  "what-building-grcos-taught-me": ["https://grc-os.dev/", "Explore grcOS"]
};

async function loadViews() {
  const library = $("articleLibrary");
  try {
    const slug = new URLSearchParams(window.location.search).get("article");
    const response = await fetch(slug ? "/api/views?article=" + encodeURIComponent(slug) : "/api/views");
    if (!response.ok) throw new Error("Article library unavailable.");
    const articles = await response.json();
    const articleUrl = article => "/views/?article=" + encodeURIComponent(article.slug);
    const readTime = article => Math.max(1, Math.ceil(article.body.join(" ").split(/\s+/).length / 200));
    if (slug) {
      const article = articles.find(item => item.slug === slug);
      if (!article) {
        library.innerHTML = '<h1>Article unavailable</h1><a class="text-link" href="/views/">Browse My Views</a>';
        return;
      }
      document.title = article.title + " | Anirban De";
      const related = articleLinks[article.slug];
      library.innerHTML = `<article class="reading article-reading">
        <a class="text-link" href="/views/">All articles</a>
        <p class="kicker">${esc(article.topic)} · ${readTime(article)} min read</p>
        <h1>${esc(article.title)}</h1>
        <p class="lead">${esc(article.summary)}</p>
        ${article.body.map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
        ${related ? `<a class="text-link" href="${esc(related[0])}">${esc(related[1])}</a>` : ""}
      </article>`;
      return;
    }

    library.innerHTML = `<header class="page-intro">
      <h1>My Views</h1>
      <p class="lead">Essays on security, building products, and investing.</p>
    </header>
    <section class="article-list" aria-label="Published articles">
      ${articles.map(article => `<article class="work-card article-preview" id="${esc(article.topic === "Investing" ? "investing" : article.topic.toLowerCase())}">
        <p class="kicker">${esc(article.topic)}</p>
        <h2><a href="${articleUrl(article)}">${esc(article.title)}</a></h2>
        <p>${esc(article.summary)}</p>
      </article>`).join("") || "<p>No articles are published yet.</p>"}
    </section>`;
    const topic = window.location.hash.slice(1);
    if (topic) $(topic)?.scrollIntoView();
  } catch {
    library.innerHTML = "<h1>My Views</h1><p>The article library is temporarily unavailable. Please try again later.</p>";
  }
}

  loadViews();
}
