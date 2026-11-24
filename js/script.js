(()=>{"use strict";const $=id=>document.getElementById(id),page=document.body.dataset.page||"home";const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));const clean=s=>String(s??"").replace(/<[^>]*>/g,"");const nav=[["home","/","Home"],["about","/about/","About"],["work","/work/","Work"],["career","/career/","Career"],["contact","/contact/","Contact"]];function home(data, achievements, link) {
  const projects = [
    {
      href: "/work/access-reviews/",
      title: "Access reviews at scale",
      category: "Identity security",
      summary: "An engineering case study on turning fragmented SaaS permissions into accountable review decisions and auditable evidence."
    },
    {
      href: "/work/risk-central/",
      title: "Risk Central",
      category: "Risk platform engineering",
      summary: "How I built a common workflow at Uber for assigning risk ownership, prioritizing issues, and tracking decisions."
    }
  ];
  const outcomes = [
    ["70%", "smaller security issue backlog"],
    ["3×", "faster remediation, at peak"],
    ["40%", "less audit preparation effort"]
  ];
  const activeRole = data.experience?.[0];
  return `
    <section class="home-hero">
      <p class="kicker">Security engineering & technology risk</p>
      <h1>Security that scales<br class="hero-break"> with the business.</h1>
      <p class="lead">I’m ${esc(data.name)}. I build security programs and software that help teams manage access, track risk, and prove their controls work.</p>
      <div class="actions">
        ${link("/work/", "Explore my work", "button-primary")}
        ${link("/career/", "View experience", "button-secondary")}
      </div>
      ${activeRole ? `<p class="current-role"><strong>${esc(activeRole.org)}</strong><span>${esc(activeRole.role)}</span></p>` : ""}
    </section>
    <section class="home-section" aria-labelledby="selected-work">
      <div class="section-heading">
        <h2 id="selected-work">Selected work</h2>
        ${link("/work/", "See all work")}
      </div>
      <div class="work-grid">
        ${projects.map(project => `
          <a class="work-card project-link" href="${project.href}">
            <p class="case-category">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
            <span class="text-link">Read case study</span>
          </a>
        `).join("")}
      </div>
    </section>
    ${achievements.some(item => item.title === "Reducing the security issue backlog") &&
      achievements.some(item => item.title === "Automating compliance evidence") ? `
      <section class="home-section" aria-labelledby="impact">
        <div class="section-heading"><h2 id="impact">Program outcomes</h2></div>
        <dl class="outcome-grid">
          ${outcomes.map(([value, label]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
        </dl>
      </section>
    ` : ""}
  `;
}
function init(d){$("siteHeader").innerHTML='<nav class="site-nav shell"><a class="wordmark" href="/"><span class="monogram">AD</span><span class="brand-name">'+esc(d.name)+'</span></a><button id="menuToggle" class="menu-toggle" aria-controls="navItems" aria-label="Toggle navigation" aria-expanded="false">Menu</button><div class="nav-items" id="navItems">'+nav.map(([id,url,label])=>'<a '+(page===id?'aria-current="page"':'')+' href="'+url+'">'+label+'</a>').join("")+'<a class="nav-resume" href="/'+esc(d.resumeFile)+'" download>Résumé PDF</a></div></nav>';$("menuToggle").onclick=()=>{const open=$("navItems").classList.toggle("is-open");$("menuToggle").setAttribute("aria-expanded",String(open))};$("siteFooter").innerHTML='<div class="shell footer-row"><span>© '+new Date().getFullYear()+' '+esc(d.name)+'</span><span>Building safer, simpler technology.</span><a href="/contact/">Get in touch</a></div>';const exp=d.experience||[],ach=d.achievements||[];const link=(url,label,cls="text-link")=>'<a class="'+cls+'" href="'+url+'">'+label+'</a>';const intro=(kicker,title,desc)=>'<header class="page-intro"><p class="kicker">'+kicker+'</p><h1>'+title+'</h1><p class="lead">'+desc+'</p></header>';const job=j=>'<article class="career-row"><div><p class="eyeline">'+esc(j.date)+'</p><h2>'+esc(j.org)+'</h2><p class="job-role">'+esc(j.role)+'</p></div><ul>'+j.bullets.map(b=>'<li>'+esc(clean(b))+'</li>').join("")+'</ul></article>';const detailLink=a=>a.title.includes("Risk Central")?"/work/risk-central/":a.title.includes("access reviews")?"/work/access-reviews/":null;const card=a=>'<article class="work-card case-study"><p class="case-category">'+esc(a.category||"Selected work")+'</p><h2>'+esc(a.title)+'</h2><p class="case-status">'+esc(a.status||"")+'</p><div class="case-detail"><strong>The challenge</strong><p>'+esc(a.context||"")+'</p></div><div class="case-detail"><strong>What I did</strong><p>'+esc(a.action||"")+'</p></div><div class="case-detail"><strong>Outcome</strong><p>'+esc(a.impact||a.text||"")+'</p></div>'+(detailLink(a)?'<a class="text-link case-link" href="'+detailLink(a)+'">Read case study</a>':'')+'</article>';let out="";switch(page){case"home":out=home(d,ach,link);break;case"about":out=intro("ABOUT ME","A little about me.","I care about making complicated technology problems easier for people to understand and solve.")+'<section class="reading"><h2>What drives my work</h2><p>'+esc(clean(d.about))+'</p><p>I’ve spent more than 14 years working with teams that need to balance speed, security and trust. I enjoy translating technical challenges into clear decisions and building systems that make the right thing easier to do.</p><h2>How I approach problems</h2><p>Start with the people affected. Understand what is getting in their way. Build something useful, measure whether it helps, and keep improving it.</p>'+link("/work/","See examples of my work")+'</section>';break;case"work":out=intro("SELECTED WORK","What I’ve worked on.","A few examples of how I help organizations make security clearer, more effective and less manual.")+'<section class="work-grid work-index">'+ach.map(card).join("")+'</section><section class="closing"><h2>Interested in building something better?</h2>'+link("/contact/","Let's connect","button-primary")+'</section>';break;case"career":out=intro("CAREER","Where I’ve worked.","My path has taken me from consulting to leading security programs and building tools that make them work better.")+'<section class="career-list">'+exp.map(job).join("")+'</section><section class="expertise"><p class="kicker">AREAS OF EXPERTISE</p><h2>What I work on</h2><div class="pill-list">'+(d.skills||[]).map(s=>'<span>'+esc(s)+'</span>').join("")+'</div></section><section class="closing"><h2>Want the full details?</h2>'+link("/"+esc(d.resumeFile),"Download my résumé","button-primary")+'</section>';break;case"contact":out=intro("CONTACT","Let’s connect.","I enjoy conversations about technology, cybersecurity, AI and building useful products.")+'<section class="contact-options"><a href="mailto:'+esc(d.email)+'"><span>Email</span><strong>'+esc(d.email)+'</strong><b>↗</b></a><a href="'+esc(d.linkedin)+'" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><strong>Connect with me</strong><b>↗</b></a><a href="/'+esc(d.resumeFile)+'" download><span>Résumé</span><strong>Download PDF</strong><b>↗</b></a></section>';break;} $("pageContent").innerHTML=out}fetch("/content.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load content");return r.json()}).then(init).catch(()=>{$("pageContent").innerHTML='<section class="page-intro"><h1>Something went wrong.</h1><p class="lead">Please refresh the page to try again.</p></section>'})})();