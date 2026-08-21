(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  function el(tag, opts) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.class) node.className = opts.class;
    if (opts.html !== undefined) node.innerHTML = opts.html;
    if (opts.text !== undefined) node.textContent = opts.text;
    return node;
  }

  function renderContent(data) {
    document.getElementById("heroEyebrow").textContent = data.eyebrow || "";
    document.getElementById("heroName").textContent = data.name || "";
    document.getElementById("heroRole").textContent = data.role || "";
    document.getElementById("heroSummary").textContent = data.heroSummary || "";
    document.getElementById("heroLocation").textContent = data.location || "";
    document.getElementById("footerName").textContent = data.name || "";

    var heroEmail = document.getElementById("heroEmail");
    heroEmail.textContent = data.email || "";
    heroEmail.href = "mailto:" + (data.email || "");

    var heroLinkedin = document.getElementById("heroLinkedin");
    if (data.linkedin) heroLinkedin.href = data.linkedin;

    ["resumeLinkNav", "resumeLinkHero", "resumeLinkContact"].forEach(function (id) {
      var link = document.getElementById(id);
      if (data.resumeFile) link.href = data.resumeFile;
    });

    document.getElementById("aboutText").innerHTML = data.about || "";

    // stats
    var statsWrap = document.getElementById("aboutStats");
    statsWrap.innerHTML = "";
    (data.stats || []).forEach(function (s) {
      var stat = el("div", { class: "stat reveal" });
      var num = el("span", { class: "stat-num", text: "0" });
      num.setAttribute("data-count", s.value);
      var suffix = el("span", { class: "stat-suffix", text: s.suffix || "" });
      var label = el("span", { class: "stat-label", text: s.label || "" });
      stat.appendChild(num);
      stat.appendChild(suffix);
      stat.appendChild(label);
      statsWrap.appendChild(stat);
    });

    // experience timeline
    var timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    (data.experience || []).forEach(function (job) {
      var item = el("article", { class: "timeline-item reveal" });
      item.appendChild(el("div", { class: "timeline-dot" }));

      var card = el("div", { class: "timeline-card" });
      var head = el("div", { class: "timeline-head" });
      var titleWrap = el("div");
      titleWrap.appendChild(el("h3", { text: job.role || "" }));
      titleWrap.appendChild(el("p", { class: "timeline-org", text: job.org || "" }));
      head.appendChild(titleWrap);
      head.appendChild(el("span", { class: "timeline-date", text: job.date || "" }));
      card.appendChild(head);

      var list = el("ul", { class: "timeline-list" });
      (job.bullets || []).forEach(function (b) {
        list.appendChild(el("li", { html: b }));
      });
      card.appendChild(list);
      item.appendChild(card);
      timeline.appendChild(item);
    });

    // achievements
    var grid = document.getElementById("achievementsGrid");
    grid.innerHTML = "";
    (data.achievements || []).forEach(function (a) {
      var card = el("div", { class: "card reveal" });
      card.appendChild(el("div", { class: "card-icon", text: a.icon || "" }));
      card.appendChild(el("h3", { text: a.title || "" }));
      card.appendChild(el("p", { text: a.text || "" }));
      grid.appendChild(card);
    });

    // skills
    var tagCloud = document.getElementById("tagCloud");
    tagCloud.innerHTML = "";
    (data.skills || []).forEach(function (skill) {
      tagCloud.appendChild(el("span", { class: "tag", text: skill }));
    });

    // education
    var edu = data.education || {};
    var eduCard = document.getElementById("eduCard");
    eduCard.innerHTML = "";
    var eduLeft = el("div");
    eduLeft.appendChild(el("h4", { text: edu.degree || "" }));
    eduLeft.appendChild(el("p", { class: "timeline-org", text: edu.school || "" }));
    var eduMeta = el("div", { class: "edu-meta" });
    eduMeta.appendChild(el("span", { text: edu.date || "" }));
    eduMeta.appendChild(el("span", { text: edu.meta || "" }));
    eduCard.appendChild(eduLeft);
    eduCard.appendChild(eduMeta);

    // contact section
    var contactEmail = document.getElementById("contactEmail");
    contactEmail.href = "mailto:" + (data.email || "");
    document.getElementById("contactEmailValue").textContent = data.email || "";
    if (data.linkedin) document.getElementById("contactLinkedin").href = data.linkedin;
    document.getElementById("contactLocationValue").textContent = data.location || "";
  }

  function initInteractions() {
    // scroll progress bar
    var progressBar = document.getElementById("progressBar");
    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }

    var navWrap = document.getElementById("navWrap");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    function onScroll() {
      navWrap.classList.toggle("scrolled", window.scrollY > 10);
      updateProgress();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // scroll-spy active nav link
    var sections = Array.from(document.querySelectorAll("main section[id]"));
    var navLinkEls = Array.from(document.querySelectorAll(".nav-link"));

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinkEls.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spyObserver.observe(section); });

    // reveal-on-scroll
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach(function (elNode) {
      revealObserver.observe(elNode);
    });

    // animated stat counters
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var elNode = entry.target;
          var target = parseInt(elNode.getAttribute("data-count"), 10);
          var duration = 1200;
          var start = null;

          function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            elNode.textContent = Math.round(eased * target);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              elNode.textContent = target;
            }
          }
          requestAnimationFrame(step);
          statObserver.unobserve(elNode);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".stat-num").forEach(function (elNode) {
      statObserver.observe(elNode);
    });
  }

  fetch("content.json", { cache: "no-store" })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      renderContent(data);
      initInteractions();
    })
    .catch(function (err) {
      console.error("Failed to load content.json", err);
    });
})();
