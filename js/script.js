(()=>{"use strict";const $=id=>document.getElementById(id),page=document.body.dataset.page||"home";const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const clean=s=>String(s??"").replace(/<[^>]*>/g,"");const nav=[["home","/","Home"],["work","/work/","Security"],["investments","/investments/","Investments"],["views","/views/","My Views"],["contact","/contact/","Contact"],["about","/about/","About"],["career","/career/","Career"]];function home(data, link) {
  return `
    <section class="home-hero">
      <p class="kicker">Founder · Security leader · Investor</p>
      <h1>${esc(data.name)}</h1>
      <p class="lead">I build security software, lead security programs, and invest with a long-term perspective.</p>
      <p class="bio-summary">I founded grcOS to make risk and compliance easier to run. At Replit, I build security automation for an AI developer platform. Before that, I led risk management and control assurance at Uber.</p>
      <div class="actions">
        ${link("/about/", "More about me", "button-primary")}
        ${link("/contact/", "Get in touch", "button-secondary")}
      </div>
    </section>
    <section class="home-section" aria-labelledby="explore">
      <div class="section-heading"><h2 id="explore">What I do</h2></div>
      <div class="work-grid identity-grid">
        <article class="work-card project-link">
          <h3>Build</h3>
          <p>grcOS brings controls, risks, vendors, and exceptions into a single workspace.</p>
          <a class="text-link" href="https://grc-os.dev/">Explore grcOS</a>
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
      <p class="bio-summary">How I think about building security programs and evaluating investment ideas.</p>
    </section>`;
}

function investments(link) {
  return `
    <header class="page-intro">
      <h1>Investments</h1>
      <p class="lead">I invest with a long horizon and follow the businesses shaping cybersecurity and AI.</p>
    </header>
    <section class="work-grid work-index">
      <article class="work-card">
        <h2>Long-term investing</h2>
        <p>I think about broad market exposure, concentration, and how individual ideas fit into a portfolio over time.</p>
      </article>
      <article class="work-card">
        <h2>Cybersecurity & AI</h2>
        <p>I’m interested in founders solving problems I’ve seen firsthand, especially around identity, security automation, and governance for AI systems.</p>
      </article>
    </section>
    <section class="closing">
      ${link("/views/#investing", "Read my investing perspective", "button-primary")}
    </section>`;
}

function views() {
  return `
    <header class="page-intro">
      <h1>My Views</h1>
      <p class="lead">How I think about security and investing.</p>
      <nav class="actions" aria-label="Topics">
        <a class="button-secondary" href="#security">Security</a>
        <a class="button-secondary" href="#investing">Investments</a>
      </nav>
    </header>
    <article class="reading view-essay" id="security">
      <p class="kicker">Security</p>
      <h2>Automate the work around the security decision</h2>
      <p>In an access review, collecting entitlements, finding the right owner, and chasing evidence can take more time than deciding who needs access. I start by automating those steps so the reviewer can see who has access, what each permission allows, and why it was granted.</p>
      <p>I measure whether the process improves by looking at owner time, how quickly removals get verified, and whether the evidence shows what actually happened.</p>
      <a class="text-link" href="/work/access-reviews/">Read the access reviews case study</a>
    </article>
    <article class="reading view-essay" id="investing">
      <p class="kicker">Investments</p>
      <h2>A strong theme still needs a strong business</h2>
      <p>When I look at cybersecurity or AI, I start with the buyer. What problem is urgent enough to fund? Who owns the budget? How much work does it take to get the product running?</p>
      <p>I also look at where an idea fits in the portfolio. Several companies can depend on the same wave of spending. That shared exposure matters when deciding how much to put behind a thesis.</p>
    </article>`;
}

function contact(data) {
  return `
    <header class="page-intro">
      <h1>Contact</h1>
      <p class="lead">Get in touch about security, building products, or investing.</p>
    </header>
    <section class="contact-options" aria-label="Social profiles and email">
      <a href="${esc(data.linkedin)}"><span>LinkedIn</span><strong>Anirban De</strong></a>
      <a href="https://github.com/deanirban1989"><span>GitHub</span><strong>@deanirban1989</strong></a>
      <a href="mailto:${esc(data.email)}"><span>Email</span><strong>${esc(data.email)}</strong></a>
      <a href="/${esc(data.resumeFile)}" download><span>Résumé</span><strong>Download PDF</strong></a>
    </section>`;
}

function init(d){$("siteHeader").innerHTML='<nav class="site-nav shell"><a class="wordmark" href="/"><span class="monogram">AD</span><span class="brand-name">'+esc(d.name)+'</span></a><button id="menuToggle" class="menu-toggle" aria-controls="navItems" aria-label="Toggle navigation" aria-expanded="false">Menu</button><div class="nav-items" id="navItems">'+nav.map(([id,url,label])=>'<a '+(page===id?'aria-current="page"':'')+' href="'+url+'">'+label+'</a>').join("")+'<a class="nav-resume" href="/'+esc(d.resumeFile)+'" download>Résumé PDF</a></div></nav>';$("menuToggle").onclick=()=>{const open=$("navItems").classList.toggle("is-open");$("menuToggle").setAttribute("aria-expanded",String(open))};$("siteFooter").innerHTML='<div class="shell footer-row"><span>© '+new Date().getFullYear()+' '+esc(d.name)+'</span><a href="/contact/">Get in touch</a></div>';const exp=d.experience||[],ach=d.achievements||[];const link=(url,label,cls="text-link")=>'<a class="'+cls+'" href="'+url+'">'+label+'</a>';const intro=(kicker,title,desc)=>'<header class="page-intro"><p class="kicker">'+kicker+'</p><h1>'+title+'</h1><p class="lead">'+desc+'</p></header>';const job=j=>'<article class="career-row"><div><p class="eyeline">'+esc(j.date)+'</p><h2>'+esc(j.org)+'</h2><p class="job-role">'+esc(j.role)+'</p></div><ul>'+j.bullets.map(b=>'<li>'+esc(clean(b))+'</li>').join("")+'</ul></article>';const detailLink=a=>a.title.includes("Risk Central")?"/work/risk-central/":a.title.includes("access reviews")?"/work/access-reviews/":null;const card=a=>'<article class="work-card case-study"><p class="case-category">'+esc(a.category||"Selected work")+'</p><h2>'+esc(a.title)+'</h2><p class="case-status">'+esc(a.status||"")+'</p><div class="case-detail"><strong>The challenge</strong><p>'+esc(a.context||"")+'</p></div><div class="case-detail"><strong>What I did</strong><p>'+esc(a.action||"")+'</p></div><div class="case-detail"><strong>Outcome</strong><p>'+esc(a.impact||a.text||"")+'</p></div>'+(detailLink(a)?'<a class="text-link case-link" href="'+detailLink(a)+'">Read case study</a>':'')+'</article>';let out="";switch(page){case"home":out=home(d,link);break;case"about":out=intro("ABOUT ME","About Anirban De","I’m a founder, security leader, and investor based in the San Francisco Bay Area.")+'<section class="reading"><h2>What drives my work</h2><p>I founded <a class="text-link" href="https://grc-os.dev/">grcOS</a> to give security teams one place to run risk and compliance. My work at Replit and Uber has focused on turning enterprise security requirements into tools teams can use every day.</p><p>'+esc(clean(d.about))+'</p><p>I’ve spent more than 14 years working with teams that need to balance speed, security and trust. I enjoy translating technical challenges into clear decisions and building systems that make the right thing easier to do.</p><h2>How I approach problems</h2><p>Start with the people affected. Understand what is getting in their way. Build something useful, measure whether it helps, and keep improving it.</p>'+link("/work/","See examples of my work")+'</section>';break;case"work":out=intro("SELECTED WORK","Security","Case studies and outcomes from building security programs and software at Replit and Uber.")+'<section class="work-grid work-index">'+ach.map(card).join("")+'</section><section class="closing"><h2>Interested in building something better?</h2>'+link("/contact/","Let's connect","button-primary")+'</section>';break;case"career":out=intro("CAREER","Where I’ve worked.","My path has taken me from consulting to leading security programs and building tools that make them work better.")+'<section class="career-list">'+exp.map(job).join("")+'</section><section class="expertise"><p class="kicker">AREAS OF EXPERTISE</p><h2>What I work on</h2><div class="pill-list">'+(d.skills||[]).map(s=>'<span>'+esc(s)+'</span>').join("")+'</div></section><section class="closing"><h2>Want the full details?</h2>'+link("/"+esc(d.resumeFile),"Download my résumé","button-primary")+'</section>';break;case"investments":out=investments(link);break;case"views":out=views();break;case"contact":out=contact(d);break;} $("pageContent").innerHTML=out;
  if (page === "views") {
    const topic = window.location.hash.slice(1);
    if (topic) $(topic)?.scrollIntoView();
  }
}fetch("/content.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load content");return r.json()}).then(init).catch(()=>{$("pageContent").innerHTML='<section class="page-intro"><h1>Something went wrong.</h1><p class="lead">Please refresh the page to try again.</p></section>'})})();