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

const investmentIndustries = {
  "Aerospace & space": [
    ["AST SpaceMobile", "2026-02-13"],
    ["Joby Aviation", "2026-02-13"],
    ["New Horizon Aircraft", "2026-05-12"],
    ["Space Exploration Technologies", "2026-10-15"],
  ],
  "Automotive & robotics": [
    ["Lucid Group", "2025-07-18"],
    ["Serve Robotics", "2026-03-24"],
    ["Tesla", "2025-05-27"],
  ],
  "Cloud & enterprise software": [
    ["Microsoft", "2025-07-08"],
    ["Nutanix", "2025-08-07"],
    ["ServiceNow", "2025-05-30"],
    ["Shopify", "2026-07-08"],
  ],
  "Cybersecurity & internet infrastructure": [
    ["Cloudflare", "2025-05-30"],
    ["Crowdstrike Holdings", "2025-05-30"],
    ["Verisign", "2026-04-20"],
  ],
  "Digital assets": [
    ["Cleanspark", "2025-10-16"],
  ],
  "Energy": [
    ["Bloom Energy", "2026-10-13"],
    ["Chevron", "2026-01-21"],
    ["Diamondback Energy", "2026-05-11"],
    ["Eagle Nuclear Energy", "2026-03-04"],
    ["EOG Resources", "2026-09-15"],
  ],
  "Financial services": [
    ["Progressive", "2025-05-30"],
    ["Visa", "2025-05-30"],
  ],
  "Healthcare & life sciences": [
    ["Abbvie", "2025-05-30"],
    ["Gilead Sciences", "2025-05-30"],
    ["Intuitive Surgical", "2025-05-30"],
    ["Johnson & Johnson", "2025-07-08"],
    ["Lilly(Eli) & Co", "2025-10-08"],
    ["Merck & Co", "2026-01-21"],
    ["Neurocrine Biosciences", "2025-10-08"],
    ["Vertex Pharmaceuticals", "2026-09-22"],
  ],
  "Industrial equipment & transportation": [
    ["CSX", "2026-04-29"],
    ["Eaton Corporation", "2026-04-29"],
    ["Flowserve", "2026-02-17"],
    ["Trane Technologies", "2026-09-15"],
  ],
  "Internet & media": [
    ["Alphabet", "2025-06-06"],
    ["Meta Platforms", "2025-05-30"],
    ["Netflix", "2025-05-30"],
    ["Reddit", "2026-11-03"],
    ["Spotify Technology", "2025-05-30"],
  ],
  "Metals, mining & chemicals": [
    ["Cleveland-Cliffs", "2026-04-29"],
    ["Ecolab", "2026-06-08"],
    ["Freeport-McMoRan", "2026-04-14"],
    ["Linde", "2026-03-20"],
    ["Rare Earths Americas", "2026-05-12"],
  ],
  "Quantum computing": [
    ["IonQ", "2026-03-24"],
    ["Quantinuum", "2026-06-08"],
  ],
  "Retail & consumer goods": [
    ["Amazon.com", "2025-07-08"],
    ["Colgate-Palmolive", "2026-06-11"],
    ["Costco Wholesale", "2025-05-30"],
    ["Gap", "2025-05-30"],
  ],
  "Semiconductors & hardware": [
    ["Advanced Micro Devices", "2026-07-08"],
    ["Ambarella", "2026-06-08"],
    ["Apple", "2025-05-30"],
    ["Broadcom", "2025-05-30"],
    ["Cadence Design Systems", "2026-04-20"],
    ["Coherent", "2026-04-10"],
    ["Credo Technology Group Holding", "2026-04-10"],
    ["Entegris", "2026-06-18"],
    ["Lam Research", "2025-07-08"],
    ["NVIDIA", "2025-05-30"],
    ["Qualcomm", "2025-07-08"],
    ["SEALSQ", "2026-05-27"],
    ["Taiwan Semiconductor Manufacturing", "2026-11-03"],
  ],
};

const unrealizedReturns = {
  "NVIDIA": -9.9,
  "Alphabet": -23.6,
  "Microsoft": 16.3,
  "Tesla": 5.2,
  "AST SpaceMobile": -63.5,
  "New Horizon Aircraft": -65.7,
  "SEALSQ": -73,
  "Joby Aviation": -64.3,
  "Cleanspark": -60.2,
  "Eagle Nuclear Energy": -69.6,
  "IonQ": -50,
  "Lucid Group": -78.6,
  "Meta Platforms": -7.1,
  "Serve Robotics": -74.7,
  "Rare Earths Americas": -84.9,
  "Quantinuum": -25,
  "Netflix": -13.6,
  "Space Exploration Technologies": -12,
  "Crowdstrike Holdings": -15.5,
  "Reddit": -3.4,
  "Broadcom": -7.9,
  "Apple": 4.4,
  "Amazon.com": -3,
  "Colgate-Palmolive": 9,
  "Lilly(Eli) & Co": 19.8,
  "Costco Wholesale": 11,
  "Ecolab": 11.2,
  "Cloudflare": -10.6,
  "Abbvie": 10.9,
  "Eaton Corporation": -17.2,
  "Chevron": -4.6,
  "Diamondback Energy": -17.9,
  "Verisign": 4.8,
  "Credo Technology Group Holding": -18.9,
  "Neurocrine Biosciences": -2.9,
  "Flowserve": -2.7,
  "Linde": 10.3,
  "Visa": 9.3,
  "Johnson & Johnson": -1,
  "Gilead Sciences": 17.6,
  "Advanced Micro Devices": -16.1,
  "Vertex Pharmaceuticals": 4.4,
  "Nutanix": -12.6,
  "Qualcomm": -36.4,
  "Progressive": 0.5,
  "Spotify Technology": -4.1,
  "Intuitive Surgical": -11.8,
  "CSX": 2.4,
  "Trane Technologies": -3.6,
  "Shopify": 1.4,
  "EOG Resources": -4.3,
  "Coherent": -33.2,
  "Entegris": -12,
  "Lam Research": -34.2,
  "ServiceNow": -28.9,
  "Merck & Co": -6.2,
  "Cadence Design Systems": -9.4,
  "Ambarella": -14.1,
  "Freeport-McMoRan": -27.7,
  "Cleveland-Cliffs": -18.3,
  "Gap": 3.4,
  "Bloom Energy": -32.8,
  "Taiwan Semiconductor Manufacturing": -11.4,
  "Vanguard S&P 500 ETF (VOO)": 9.9,
  "Invesco QQQ Trust Series 1 (QQQ)": -4.3,
  "Vanguard Information Technology ETF (VGT)": 44.4,
  "VanEck Semiconductor ETF (SMH)": -13.1,
  "iShares Core S&P 500 ETF (IVV)": -6.9,
  "iShares 0-3 Month Treasury Bond ETF (SGOV)": 0,
  "Xtrackers Harvest CSI 300 China A-Shares ETF (ASHR)": -13.9,
  "iShares Russell 2000 Index Fund (IWM)": -8.1,
  "WisdomTree Japan Hedged Equity Fund (DXJ)": -5.3,
  "IShares MSCI Emerging Markets ex China ETF (EMXC)": -13.1,
  "State Street SPDR EURO Stoxx 50 ETF (FEZ)": -8,
  "State Street SPDR S&P Aerospace & Defense ETF (XAR)": -19.7,
  "SPDR Gold Shares (GLD)": -19.5,
  "VanEck Rare Earth/Strategic Metals ETF (REMX)": -51.1
};
const returnSnapshotDate = "November 24, 2026";

function investmentTables(groups, dateHeading = "First recorded purchase", nameHeading = "Company", showReturn = false) {
  const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
  return [...groups].sort(([a], [b]) => {
    if (a === "Industry unavailable") return 1;
    if (b === "Industry unavailable") return -1;
    return a.localeCompare(b);
  }).map(([industry, holdings]) => {
    const sorted = [...holdings].sort(([nameA, dateA], [nameB, dateB]) =>
      (dateA || "9999").localeCompare(dateB || "9999") || nameA.localeCompare(nameB)
    );
    const rows = sorted.map(([name, date]) => {
      const purchase = date ? `<time datetime="${esc(date)}">${esc(dateFormat.format(new Date(date)))}</time>` : "Unavailable";
      const value = unrealizedReturns[name];
      const quotedReturn = Number.isFinite(value) ? `${value > 0 ? "+" : ""}${value.toFixed(1)}%` : "—";
      const returnColor = Number.isFinite(value) ? (value < 0 ? "#b42318" : "#067647") : "var(--muted)";
      const returnCell = showReturn ? `<td class="investment-return" style="color: ${returnColor}; font-weight: 650">${quotedReturn}</td>` : "";
      return `<tr><th scope="row">${esc(name)}</th><td>${purchase}</td>${returnCell}</tr>`;
    }).join("");
    return `
      <div class="industry-card" data-industry="${esc(industry)}">
      <table class="investment-table">
        <caption>${esc(industry)} <span>${holdings.length}</span></caption>
        <thead><tr><th scope="col">${esc(nameHeading)}</th><th scope="col">${esc(dateHeading)}</th>${showReturn ? '<th scope="col">Unrealized return</th>' : ""}</tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }).join("");
}

async function renderIndiaInvestments() {
  try {
    const response = await fetch("/investments/india.json");
    if (!response.ok) return;
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) return;
    const groups = new Map();
    for (const { name, date, industry } of rows) {
      const label = industry || "Industry unavailable";
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label).push([name, date]);
    }
    $("indiaInvestments").innerHTML = `<h2>India</h2><div class="investment-grid">${investmentTables(groups)}</div>`;
  } catch {
    // Keep the Robinhood list available if the India feed fails.
  }
}

const earlyStageHoldings = {"Communication Services":[["Formative Intelligence Inc.","2026-06-07"],["Offworld Technologies Pte Ltd.","2026-08-19"]],"Consumer Discretionary":[["Anoria Inc.","2026-06-06"],["CatchBack Cards Incorporated","2026-03-19"]],"Consumer Staples":[["Bloomy Learning, Inc.","2026-09-09"]],"Energy":[["Voxel Energy Inc.","2026-04-10"]],"Financials":[["Agentcard Corporation","2026-09-02"],["Audun Inc.","2026-09-03"],["Financial Datasets, Inc.","2026-09-11"],["KelAI Tech, Inc.","2026-06-05"],["Klaimee Labs Inc.","2026-06-08"],["Lambda Systems, Inc.","2026-03-19"],["Luca IQ, Inc.","2026-09-01"],["PantaCapital, Inc. (d/b/a Panta Insurance Solutions)","2026-03-24"],["Rapidfolio Inc.","2026-09-09"],["Rex AI Inc.","2026-08-31"],["SpotPay, Inc.","2026-03-24"],["tash cards Inc.","2026-09-09"],["Trade Hobby, Inc.","2026-09-02"],["Unifold, Inc.","2026-03-23"]],"Health Care":[["Adialante, Inc.","2026-05-26"],["Allia Health, Inc.","2026-08-31"],["Avoca Systems Inc","2026-09-01"],["CellType Inc.","2026-03-20"],["Floracene, Inc.","2026-09-09"],["Lumius Imaging, Inc.","2026-06-06"],["Omnition Technologies, Inc.","2026-09-09"],["Opalite Health Inc.","2026-03-19"],["Prana AI Incorporated","2026-03-26"],["Prescience, Inc.","2026-08-27"],["Radley AI, Inc","2026-09-01"],["RonanRX Inc.","2026-09-09"],["Ruma, Inc.","2026-03-16"]],"Industrials":[["6thSense AI, Inc.","2026-09-01"],["Aerogen Systems, Inc.","2026-08-31"],["Apollo Atomics, Inc.","2026-05-20"],["Applied Electrodynamics, Inc.","2026-09-09"],["Aseon Labs, Inc.","2026-05-23"],["AxionOrbital Space Inc.","2026-03-26"],["Cosmic Robotics, Inc.","2026-09-01"],["Eden Robotics Inc.","2026-06-08"],["Edgerun Industries, Inc.","2026-08-28"],["Impact Drones, Inc.","2026-09-11"],["Isengard Industries Inc.","2026-08-30"],["Ornadyne, Inc.","2026-06-09"],["SubVysion, Inc.","2026-08-29"],["Tenet Industries Inc.","2026-05-31"],["The General Aviation Company","2026-05-22"]],"Information Technology":[["Agency Tool Company","2026-08-27"],["Agentic Fabriq, Inc.","2026-03-16"],["Amboras Inc.","2026-06-06"],["Apex Flux Inc.","2026-03-16"],["Arga Labs Inc.","2026-06-08"],["Arzana, Inc.","2026-06-12"],["Asimov Robotics, Inc.","2026-03-27"],["Autumn AI, Inc.","2026-03-23"],["BioStack Platforms, Inc.","2026-06-02"],["Caretta Inc.","2026-03-23"],["Carnot AI, Inc. (d/b/a Jinba)","2026-03-31"],["Coasty Systems, Inc.","2026-09-17"],["Codag Inc.","2026-09-01"],["Complir, Inc.","2026-06-11"],["Context Dev Inc.","2026-08-28"],["Crosslayer Labs, Inc.","2026-03-18"],["Crow, Inc.","2026-03-23"],["Cumulus Compute Labs Corporation","2026-03-16"],["Daymi, Inc.","2026-03-18"],["DeepReach Inc","2026-08-20"],["Didit Identity, Inc.","2026-03-16"],["Dipole Labs, Inc.","2026-08-28"],["DroneTector Inc.","2026-06-18"],["EnactLabs, Inc.","2026-09-03"],["Expanse Compute, Inc.","2026-05-19"],["Flow Intel Platform Inc.","2026-08-29"],["Fractal Machine Research, Inc.","2026-08-31"],["Frontier Computing Corporation","2026-09-08"],["General Context Labs, Inc.","2026-09-18"],["Gud Labs, Inc.","2026-09-03"],["InkVell Inc. (d/b/a Synthetic Sciences)","2026-03-31"],["InstaAgent Inc.","2026-06-06"],["JigsawStack, Inc.","2026-06-08"],["Keyframe Labs, Inc.","2026-06-09"],["Laminar Run, Inc.","2026-06-08"],["LegalOS Inc.","2026-03-23"],["Luel Inc.","2026-03-27"],["Matforge, Inc.","2026-06-01"],["Maywood AI Inc.","2026-03-23"],["MirageDoodle, Inc. (d/b/a AutoSitu)","2026-03-25"],["OpenRelay Incorporated","2026-08-19"],["Oxus AI, Inc.","2026-03-23"],["Plena Inc.","2026-06-08"],["Praxis Services Inc","2026-09-11"],["Qomplement, Inc.","2026-06-08"],["ReasonBlocks Inc.","2026-06-07"],["Relay Innovations, Inc.","2026-06-09"],["Replicas Group Inc.","2026-06-10"],["RMJ Labs, Inc.","2026-06-13"],["Robocurve, Inc.","2026-08-29"],["Rudus, Inc.","2026-06-07"],["Samora AI, Inc.","2026-03-19"],["Sarah AI Inc.","2026-03-22"],["Second Stage Labs, Inc.","2026-05-18"],["SharedGenes, Inc.","2026-06-08"],["Shortwave Communications, Inc.","2026-07-01"],["Shotwell, Inc.","2026-06-10"],["Silmaril Security Inc.","2026-06-08"],["Smol Machines, Inc.","2026-06-10"],["Sparkley Inc.","2026-03-16"],["Speedtrain, Inc.","2026-03-25"],["Standard Machines Inc.","2026-09-03"],["Surtr Defense Systems, Inc.","2026-06-08"],["Terminal Use, Inc.","2026-03-18"],["Truffle Technologies Inc.","2026-09-09"],["Unilabs","2026-06-14"],["Veriad, Inc.","2026-03-19"],["Visibl Semiconductors, Inc.","2026-03-19"],["Voygr Tech, Inc.","2026-03-26"],["Waddle Laboratories Inc.","2026-09-09"],["Whitespace AI, Inc.","2026-09-02"],["Workable Solutions Inc.","2026-03-19"],["Limrun, Inc.","2026-06-04"]],"Materials":[["Mass Energy Company","2026-09-11"],["Molagri Inc.","2026-09-02"]]};

function ventureInvestments() {
  const growthCompanies = ["Airwallex", "Boom Supersonic", "Canva", "Cognition", "Crusoe", "Databricks", "ElevenLabs", "Erebor", "Mercor", "OpenAI", "Oura", "Ramp", "Revolut", "SpaceX", "Stripe", "Whatnot"];
  return `
    <section class="venture-investments" id="venture" role="tabpanel" aria-labelledby="venture-tab" hidden>
      <h2>Venture investments</h2>
      <p>Company exposure through two venture funds. Holdings reported as of September 30, 2026.</p>
      <details>
        <summary>Growth-stage companies (${growthCompanies.length})</summary>
        <ul class="pill-list">${growthCompanies.map(name => `<li>${esc(name)}</li>`).join("")}</ul>
        <p><a class="text-link" href="https://robinhood.com/us/en/stocks/RVI/">Growth-stage fund disclosure</a></p>
      </details>
      <details>
        <summary>Early-stage companies</summary>
        <p><a class="text-link" href="https://www.sec.gov/Archives/edgar/data/2131040/000213104026000013/rvii-20260930.htm">Early-stage fund disclosure</a></p>
        <div class="investment-grid">${investmentTables(Object.entries(earlyStageHoldings), "Fund acquisition date")}</div>
      </details>
    </section>`;
}

const etfHoldings = [
  [
    "Vanguard S&P 500 ETF (VOO)",
    "2026-02-25"
  ],
  [
    "Invesco QQQ Trust Series 1 (QQQ)",
    "2024-10-02"
  ],
  [
    "Vanguard Information Technology ETF (VGT)",
    "2024-10-02"
  ],
  [
    "VanEck Semiconductor ETF (SMH)",
    "2026-11-03"
  ],
  [
    "iShares Core S&P 500 ETF (IVV)",
    "2025-05-30"
  ],
  [
    "iShares 0-3 Month Treasury Bond ETF (SGOV)",
    "2025-05-30"
  ],
  [
    "Xtrackers Harvest CSI 300 China A-Shares ETF (ASHR)",
    "2026-05-26"
  ],
  [
    "iShares Russell 2000 Index Fund (IWM)",
    "2026-02-06"
  ],
  [
    "WisdomTree Japan Hedged Equity Fund (DXJ)",
    "2025-05-30"
  ],
  [
    "IShares MSCI Emerging Markets ex China ETF (EMXC)",
    "2026-02-23"
  ],
  [
    "State Street SPDR EURO Stoxx 50 ETF (FEZ)",
    "2025-05-30"
  ],
  [
    "State Street SPDR S&P Aerospace & Defense ETF (XAR)",
    "2025-07-08"
  ],
  [
    "SPDR Gold Shares (GLD)",
    "2026-08-24"
  ],
  [
    "VanEck Rare Earth/Strategic Metals ETF (REMX)",
    "2025-10-08"
  ]
];

function investments() {
  const groups = Object.entries(investmentIndustries);
  const companyCount = groups.reduce((total, [, holdings]) => total + holdings.length, 0);
  return `
    <header class="investment-hero">
      <div>
        <h1>Investments</h1>
        <p>My public equity holdings and the companies I have exposure to through venture funds.</p>
      </div>
      <dl class="investment-overview">
        <div><dt>Public companies</dt><dd>${companyCount}</dd></div>
        <div><dt>Industry groups</dt><dd>${groups.length}</dd></div>
      </dl>
    </header>
    <div class="investment-tabs" role="tablist" aria-label="Investment categories">
      <button type="button" role="tab" id="public-equities-tab" aria-selected="true" aria-controls="public-equities">Public equities</button>
      <button type="button" role="tab" id="etfs-tab" aria-selected="false" aria-controls="etfs" tabindex="-1">ETFs</button>
      <button type="button" role="tab" id="venture-tab" aria-selected="false" aria-controls="venture" tabindex="-1">Venture investments</button>
    </div>
    <section id="public-equities" class="public-equities" role="tabpanel" aria-labelledby="public-equities-tab">
      <div class="investment-section-header">
        <div><h2>Public equities</h2><p>First recorded purchases, oldest first within each industry. Returns as of ${returnSnapshotDate}.</p></div>
        <label>Filter by industry
          <select id="investmentIndustry">
            <option value="">All industries</option>
            ${groups.map(([industry]) => `<option value="${esc(industry)}">${esc(industry)}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="investment-grid">${investmentTables(groups, "First recorded purchase", "Company", true)}</div>
      <section id="indiaInvestments"></section>
    </section>
    <section id="etfs" role="tabpanel" aria-labelledby="etfs-tab" class="public-equities" hidden>
      <h2>ETFs</h2>
      <p>Unrealized returns as of ${returnSnapshotDate}.</p>
      ${investmentTables([["Exchange-traded funds", etfHoldings]], "First recorded purchase", "Fund", true)}
    </section>
    ${ventureInvestments()}`;
}

function setupInvestments() {
  const industry = $("investmentIndustry");
  const cards = $("public-equities").querySelectorAll("[data-industry]");
  industry.addEventListener("change", () => {
    for (const card of cards) {
      card.hidden = Boolean(industry.value && card.dataset.industry !== industry.value);
    }
  });
  renderIndiaInvestments();
  const tabs = [$("public-equities-tab"), $("etfs-tab"), $("venture-tab")];

  function selectTab(active) {
    for (const tab of tabs) {
      const selected = tab === active;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $(tab.getAttribute("aria-controls")).hidden = !selected;
    }
  }

  function showLinkedTab() {
    selectTab(tabs.find(tab => "#" + tab.getAttribute("aria-controls") === window.location.hash) ?? tabs[0]);
  }

  function activate(tab) {
    selectTab(tab);
    window.history.replaceState(null, "", "#" + tab.getAttribute("aria-controls"));
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", event => {
      const next = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      activate(tabs[next]);
    });
  }

  showLinkedTab();
  window.addEventListener("hashchange", showLinkedTab);
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

function init(d){$("siteHeader").innerHTML='<nav class="site-nav shell"><a class="wordmark" href="/"><span class="monogram">AD</span><span class="brand-name">'+esc(d.name)+'</span></a><button id="menuToggle" class="menu-toggle" aria-controls="navItems" aria-label="Toggle navigation" aria-expanded="false">Menu</button><div class="nav-items" id="navItems">'+nav.map(([id,url,label])=>'<a '+(page===id?'aria-current="page"':'')+' href="'+url+'">'+label+'</a>').join("")+'<a class="nav-resume" href="/'+esc(d.resumeFile)+'" download>Résumé PDF</a></div></nav>';$("menuToggle").onclick=()=>{const open=$("navItems").classList.toggle("is-open");$("menuToggle").setAttribute("aria-expanded",String(open))};$("siteFooter").innerHTML='<div class="shell footer-row"><span>© '+new Date().getFullYear()+' '+esc(d.name)+'</span><a href="/contact/">Get in touch</a></div>';const exp=d.experience||[],ach=d.achievements||[];const link=(url,label,cls="text-link")=>'<a class="'+cls+'" href="'+url+'">'+label+'</a>';const intro=(kicker,title,desc)=>'<header class="page-intro"><p class="kicker">'+kicker+'</p><h1>'+title+'</h1><p class="lead">'+desc+'</p></header>';const job=j=>'<article class="career-row"><div><p class="eyeline">'+esc(j.date)+'</p><h2>'+esc(j.org)+'</h2><p class="job-role">'+esc(j.role)+'</p></div><ul>'+j.bullets.map(b=>'<li>'+esc(clean(b))+'</li>').join("")+'</ul></article>';const detailLink=a=>a.title.includes("Risk Central")?"/work/risk-central/":a.title.includes("access reviews")?"/work/access-reviews/":null;const card=a=>'<article class="work-card case-study"><p class="case-category">'+esc(a.category||"Selected work")+'</p><h2>'+esc(a.title)+'</h2><p class="case-status">'+esc(a.status||"")+'</p><div class="case-detail"><strong>The challenge</strong><p>'+esc(a.context||"")+'</p></div><div class="case-detail"><strong>What I did</strong><p>'+esc(a.action||"")+'</p></div><div class="case-detail"><strong>Outcome</strong><p>'+esc(a.impact||a.text||"")+'</p></div>'+(detailLink(a)?'<a class="text-link case-link" href="'+detailLink(a)+'">Read case study</a>':'')+'</article>';let out="";switch(page){case"home":out=home(d,link);break;case"about":out=intro("ABOUT ME","About Anirban De","I’m a founder, security leader, and investor based in the San Francisco Bay Area.")+'<section class="reading"><h2>What drives my work</h2><p>I founded <a class="text-link" href="https://grc-os.dev/">grcOS</a> to give security teams one place to run risk and compliance. My work at Replit and Uber has focused on turning enterprise security requirements into tools teams can use every day.</p><p>'+esc(clean(d.about))+'</p><p>I’ve spent more than 14 years working with teams that need to balance speed, security and trust. I enjoy translating technical challenges into clear decisions and building systems that make the right thing easier to do.</p><h2>How I approach problems</h2><p>Start with the people affected. Understand what is getting in their way. Build something useful, measure whether it helps, and keep improving it.</p>'+link("/work/","See examples of my work")+'</section>';break;case"work":out=intro("SELECTED WORK","Security","Case studies and outcomes from building security programs and software at Replit and Uber.")+'<section class="work-grid work-index">'+ach.map(card).join("")+'</section><section class="closing"><h2>Interested in building something better?</h2>'+link("/contact/","Let's connect","button-primary")+'</section>';break;case"career":out=intro("CAREER","Where I’ve worked.","My path has taken me from consulting to leading security programs and building tools that make them work better.")+'<section class="career-list">'+exp.map(job).join("")+'</section><section class="expertise"><p class="kicker">AREAS OF EXPERTISE</p><h2>What I work on</h2><div class="pill-list">'+(d.skills||[]).map(s=>'<span>'+esc(s)+'</span>').join("")+'</div></section><section class="closing"><h2>Want the full details?</h2>'+link("/"+esc(d.resumeFile),"Download my résumé","button-primary")+'</section>';break;case"investments":out=investments();break;case"views":out=views();break;case"contact":out=contact(d);break;} $("pageContent").innerHTML=out;
  if (page === "investments") setupInvestments();
  if (page === "views") {
    const topic = window.location.hash.slice(1);
    if (topic) $(topic)?.scrollIntoView();
  }
}fetch("/content.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Unable to load content");return r.json()}).then(init).catch(()=>{$("pageContent").innerHTML='<section class="page-intro"><h1>Something went wrong.</h1><p class="lead">Please refresh the page to try again.</p></section>'})})();