(()=>{"use strict";const $=id=>document.getElementById(id),page=document.body.dataset.page;const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const clean=s=>String(s??"").replace(/<[^>]*>/g,"");const nav=[["home","/","Home"],["work","/work/","Security"],["investments","/investments/","Investments"],["views","/views/","My Views"],["about","/about/","About"],["career","/career/","Career"]];function grcosFeature() {
  return `
    <a class="demo-feature" href="https://grc-os.dev/">
      <div class="demo-feature-copy">
        <p class="kicker">grcOS</p>
        <h2>Run risk and compliance in one place.</h2>
        <p>grcOS connects controls, risks, vendors, and exceptions so security teams can see what needs action and who owns it.</p>
        <span class="demo-feature-link">Visit grcOS</span>
      </div>
      <figure class="workflow-cover demo-cover">
        <figcaption>Access review workflow</figcaption>
        <strong>From access inventory to audit evidence</strong>
        <div class="workflow-track"><span>Review access</span><span>Record decision</span><span>Verify removal</span></div>
      </figure>
    </a>`;
}

function caseStudyCovers() {
  return `
    <section class="security-feature-grid" aria-label="Featured case studies">
      <a class="security-feature" href="/work/access-reviews/">
        <figure class="workflow-cover access-cover">
          <figcaption>Access decision workflow</figcaption>
          <div class="workflow-track"><span>Permission</span><span>Owner decision</span><span>Evidence</span></div>
        </figure>
        <div class="security-feature-copy"><h2>Access Reviews</h2><p>How an owner’s decision becomes an auditable record and a tracked follow-up.</p></div>
      </a>
      <a class="security-feature" href="/work/risk-central/">
        <figure class="workflow-cover risk-cover">
          <figcaption>Enterprise risk workflow</figcaption>
          <div class="workflow-track"><span>Risk record</span><span>Assigned owner</span><span>Follow-up</span></div>
        </figure>
        <div class="security-feature-copy"><h2>Risk Central</h2><p>How teams connect a risk to the person responsible and the work still due.</p></div>
      </a>
    </section>`;
}

function home(data, link) {
  return `
    <section class="home-hero">
      <p class="kicker">Founder · Security leader · Investor</p>
      <h1>${esc(data.name)}</h1>
      <p class="lead">I build security software, lead security programs, and invest with a long-term perspective.</p>
      <p class="bio-summary">I founded grcOS to make risk and compliance easier to run. At Replit, I build security automation for an AI developer platform. Before that, I led risk management and control assurance at Uber.</p>
      <div class="actions">
        ${link("https://grc-os.dev/", "Visit grcOS", "button-primary")}
        ${link("/about/", "More about me", "button-secondary")}
        ${link("#siteFooter", "Get in touch", "button-secondary")}
      </div>
    </section>
    ${grcosFeature()}
    <section class="home-section" aria-labelledby="explore">
      <div class="section-heading"><h2 id="explore">What I do</h2></div>
      <div class="work-grid identity-grid">
        <article class="work-card project-link">
          <h3>Build</h3>
          <p>grcOS brings controls, risks, vendors, and exceptions into a single workspace.</p>
          <a class="text-link" href="https://grc-os.dev/">Visit grcOS</a>
        </article>
        <article class="work-card project-link">
          <h3>Lead security</h3>
          <p>I turn security and risk decisions into workflows engineers and business owners can use.</p>
          ${link("/work/", "Explore security work")}
        </article>
        <article class="work-card project-link">
          <h3>Invest</h3>
          <p>I’m interested in long-term investing, cybersecurity, and the infrastructure behind AI.</p>
          ${link("/investments/", "Explore investment interests")}
        </article>
      </div>
    </section>
    <section class="home-section">
      <div class="section-heading"><h2>My Views</h2>${link("/views/", "Read my views")}</div>
      <div class="work-card article-preview"><p class="kicker">Security</p><h2><a href="/views/?article=why-access-reviews-still-take-so-long">Why access reviews still take so long</a></h2><p>How to give application owners the context to decide who still needs access.</p></div>
    </section>`;
}

function renderFooter(data) {
  const links = [
    ["LinkedIn", data.linkedin, '<path d="M4 9v11M4 4v.1M10 20V9m0 5a5 5 0 0 1 10 0v6"/>'],
    ["GitHub", "https://github.com/deanirban1989", '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.2 4c.2-1 .2-2-.3-3 0 0-1.2-.4-3.9 1.5a14 14 0 0 0-7 0C5.3.6 4.1 1 4.1 1c-.5 1-.5 2-.3 3A5.8 5.8 0 0 0 2.2 8c0 5.7 3.5 7 6.8 7.4A3.5 3.5 0 0 0 8 18v4"/>'],
    ["Email", "mailto:" + data.email, '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>']
  ];
  $("siteFooter").innerHTML = `
    <div class="shell footer-row">
      <span>© ${new Date().getFullYear()} ${esc(data.name)}</span>
      <nav class="footer-socials" aria-label="Social and contact links">
        ${links.map(([label, href, icon]) => `
          <a href="${esc(href)}" aria-label="${label}" title="${label}">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg>
          </a>`).join("")}
      </nav>
    </div>`;
}

function init(d){renderFooter(d);if(!page)return;$("siteHeader").innerHTML='<nav class="site-nav shell"><a class="wordmark" href="/"><span class="monogram">AD</span><span class="brand-name">'+esc(d.name)+'</span></a><button id="menuToggle" class="menu-toggle" aria-controls="navItems" aria-label="Toggle navigation" aria-expanded="false">Menu</button><div class="nav-items" id="navItems">'+nav.map(([id,url,label])=>'<a '+(page===id?'aria-current="page"':'')+' href="'+url+'">'+label+'</a>').join("")+'</div></nav>';$("menuToggle").onclick=()=>{const open=$("navItems").classList.toggle("is-open");$("menuToggle").setAttribute("aria-expanded",String(open))};const exp=d.experience||[],ach=d.achievements||[];const link=(url,label,cls="text-link")=>'<a class="'+cls+'" href="'+url+'">'+label+'</a>';const intro=(kicker,title,desc)=>'<header class="page-intro"><p class="kicker">'+kicker+'</p><h1>'+title+'</h1><p class="lead">'+desc+'</p></header>';const job=j=>'<article class="career-row"><div><p class="eyeline">'+esc(j.date)+'</p><h2>'+esc(j.org)+'</h2><p class="job-role">'+esc(j.role)+'</p></div><ul>'+j.bullets.map(b=>'<li>'+esc(clean(b))+'</li>').join("")+'</ul></article>';const detailLink=a=>a.title.includes("Risk Central")?"/work/risk-central/":a.title.includes("access reviews")?"/work/access-reviews/":null;const card=a=>'<article class="work-card case-study"><p class="case-category">'+esc(a.category||"Selected work")+'</p><h2>'+esc(a.title)+'</h2><p class="case-status">'+esc(a.status||"")+'</p><div class="case-detail"><strong>The challenge</strong><p>'+esc(a.context||"")+'</p></div><div class="case-detail"><strong>What I did</strong><p>'+esc(a.action||"")+'</p></div><div class="case-detail"><strong>Outcome</strong><p>'+esc(a.impact||a.text||"")+'</p></div>'+(detailLink(a)?'<a class="text-link case-link" href="'+detailLink(a)+'">Read case study</a>':'')+'</article>';let out="";switch(page){case"home":out=home(d,link);break;case"about":out=intro("ABOUT ME","About Anirban De","I’m a founder, security leader, and investor based in the San Francisco Bay Area.")+'<section class="reading"><h2>What drives my work</h2><p>I founded <a class="text-link" href="https://grc-os.dev/">grcOS</a> to give security teams one place to run risk and compliance. My work at Replit and Uber has focused on turning enterprise security requirements into tools teams can use every day.</p><p>'+esc(clean(d.about))+'</p><p>I’ve spent more than 14 years working with teams that need to balance speed, security and trust. I enjoy translating technical challenges into clear decisions and building systems that make the right thing easier to do.</p><h2>How I approach problems</h2><p>Start with the people affected. Understand what is getting in their way. Build something useful, measure whether it helps, and keep improving it.</p>'+link("/work/","See examples of my work")+'</section>';break;case"work":out=intro("SELECTED WORK","Security","Case studies and outcomes from building security programs and software at Replit and Uber.")+caseStudyCovers()+'<section class="work-grid work-index">'+ach.map(card).join("")+'</section><section class="closing"><h2>Interested in building something better?</h2>'+link("#siteFooter","Let's connect","button-primary")+'</section>';break;case"career":out=intro("CAREER","Where I’ve worked.","My path has taken me from consulting to leading security programs and building tools that make them work better.")+
  '<section class="career-list" aria-label="Professional experience">'+exp.map(job).join("")+'</section>'+
  '<section class="expertise"><h2>Areas of expertise</h2><div class="pill-list">'+
  (d.skills||[]).map(skill=>'<span>'+esc(skill)+'</span>').join("")+'</div></section>';break;} $("pageContent").innerHTML=out;
  if (window.location.hash === "#siteFooter") $("siteFooter").scrollIntoView();

}const mount = page === "investments" ? () => import("/js/investments.mjs").then(module => module.mountInvestments({ $, esc }))
  : null;
if ($("menuToggle")) {
  $("menuToggle").onclick = () => {
    const open = $("navItems").classList.toggle("is-open");
    $("menuToggle").setAttribute("aria-expanded", String(open));
  };
}
if (page === "views") return;
if (mount) {
  mount().catch(() => {
    const target = $("articleLibrary") || $("pageContent");
    target.insertAdjacentHTML("beforeend", "<p>The interactive content is unavailable. Please try again later.</p>");
  });
  return;
}
fetch("/content.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load content");return r.json()}).then(init).catch(()=>{if($("pageContent") && !$("pageContent").querySelector("h1"))$("pageContent").innerHTML='<section class="page-intro"><h1>Something went wrong.</h1><p class="lead">Please refresh the page to try again.</p></section>'})})();