export function mountInvestments({ $, esc }) {
let investmentIndustries = {
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

let unrealizedReturns = {
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
let returnSnapshotDate = "November 24, 2026";

function investmentTables(groups, dateHeading = "First recorded purchase", nameHeading = "Company", showReturn = false, sort = "oldest") {
  const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
  return [...groups].sort(([a], [b]) => {
    if (a === "Industry unavailable") return 1;
    if (b === "Industry unavailable") return -1;
    return a.localeCompare(b);
  }).map(([industry, holdings]) => {
    const sorted = [...holdings].sort(([nameA, dateA], [nameB, dateB]) => {
      if (sort === "highest" || sort === "lowest") {
        const a = unrealizedReturns[nameA];
        const b = unrealizedReturns[nameB];
        if (Number.isFinite(a) !== Number.isFinite(b)) return Number.isFinite(a) ? -1 : 1;
        if (Number.isFinite(a) && a !== b) return sort === "highest" ? b - a : a - b;
      }
      if (Boolean(dateA) !== Boolean(dateB)) return dateA ? -1 : 1;
      const chronological = (dateA ?? "").localeCompare(dateB ?? "");
      return (sort === "newest" ? -chronological : chronological) || nameA.localeCompare(nameB);
    });
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

let etfHoldings = [
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

function setupHoldingsExplorer(panel, groups, nameHeading) {
  const search = panel.querySelector("[data-holdings-search]");
  const industry = panel.querySelector("[data-holdings-industry]");
  const sort = panel.querySelector("[data-holdings-sort]");
  const results = panel.querySelector("[data-holdings-results]");
  const status = panel.querySelector("[data-holdings-status]");

  function update() {
    const query = search.value.trim().toLocaleLowerCase("en");
    const matches = groups
      .filter(([label]) => !industry?.value || industry.value === label)
      .map(([label, holdings]) => [label, holdings.filter(([name]) =>
        name.toLocaleLowerCase("en").includes(query))])
      .filter(([, holdings]) => holdings.length);
    const count = matches.reduce((total, [, holdings]) => total + holdings.length, 0);
    results.innerHTML = investmentTables(matches, "First recorded purchase", nameHeading, true, sort.value);
    status.textContent = count ? `${count} ${count === 1 ? "holding" : "holdings"}` : "No holdings match your filters.";
  }

  search.addEventListener("input", update);
  industry?.addEventListener("change", update);
  sort.addEventListener("change", update);
  return nextGroups => {
    groups = nextGroups;
    if (industry) {
      const selected = industry.value;
      industry.innerHTML = '<option value="">All industries</option>' + groups.map(([name]) =>
        `<option value="${esc(name)}">${esc(name)}</option>`).join("");
      if (groups.some(([name]) => name === selected)) industry.value = selected;
    }
    update();
  };
}

let investmentRefreshedAt;

async function loadInvestmentSnapshot() {
  try {
    const response = await fetch("/api/investments", { signal: AbortSignal.timeout(3500) });
    if (!response.ok) return;
    const { snapshot, refreshed_at } = await response.json();
    if (!snapshot?.industries || !Array.isArray(snapshot.etfs) || !snapshot.returns) return;
    const valuationDate = new Date(snapshot.valued_on);
    if (!Number.isFinite(valuationDate.getTime())) return;
    investmentIndustries = snapshot.industries;
    etfHoldings = snapshot.etfs;
    unrealizedReturns = snapshot.returns;
    returnSnapshotDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(valuationDate);
    if (refreshed_at && Number.isFinite(Date.parse(refreshed_at))) {
      investmentRefreshedAt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium", timeStyle: "short", timeZone: "America/Los_Angeles"
      }).format(new Date(refreshed_at)) + " Pacific";
    }
    return true;
  } catch {
    // The bundled snapshot remains available when Supabase cannot be reached.
  }
}

function industryChartMarkup(groups) {
  const counts = groups.map(([name, rows]) => [name, rows.length])
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b));
  const max = counts[0]?.[1] || 1;
  return counts.map(([name, count]) =>
    `<button type="button" data-industry="${esc(name)}" aria-pressed="false"><span>${esc(name)}</span><span class="industry-meter" aria-hidden="true"><span style="--bar-width:${count / max * 100}%"></span></span><strong>${count}</strong></button>`
  ).join("");
}

function setupIndustryChart(panel) {
  const chart = $("industryChart");
  const filter = panel.querySelector("[data-holdings-industry]");

  function syncSelection() {
    for (const bar of chart.querySelectorAll("button")) {
      bar.setAttribute("aria-pressed", String(bar.dataset.industry === filter.value));
    }
  }

  chart.addEventListener("click", event => {
    const bar = event.target.closest("button[data-industry]");
    if (!bar) return;
    filter.value = filter.value === bar.dataset.industry ? "" : bar.dataset.industry;
    filter.dispatchEvent(new Event("change"));
  });
  filter.addEventListener("change", syncSelection);

  return groups => {
    const html = industryChartMarkup(groups);
    if (chart.innerHTML !== html) chart.innerHTML = html;
    syncSelection();
  };
}

function setupInvestments() {
  const venture = $("earlyStageVenture");
  let ventureRequested = false;
  venture.addEventListener("toggle", async () => {
    if (!venture.open || ventureRequested) return;
    ventureRequested = true;
    const target = $("earlyStageHoldings");
    target.textContent = "Loading holdings…";
    try {
      const response = await fetch("/investments/venture-holdings.json");
      if (!response.ok) throw new Error("Holdings unavailable.");
      const holdings = await response.json();
      target.innerHTML = investmentTables(Object.entries(holdings), "Fund acquisition date");
    } catch {
      target.textContent = "Holdings unavailable. Close and reopen this section to retry.";
      ventureRequested = false;
    }
  });
  const refreshEquities = setupHoldingsExplorer($("public-equities"), Object.entries(investmentIndustries), "Company");
  const refreshChart = setupIndustryChart($("public-equities"));
  const refreshEtfs = setupHoldingsExplorer($("etfs"), [["Exchange-traded funds", etfHoldings]], "Fund");
  renderIndiaInvestments();
  loadInvestmentSnapshot().then(loaded => {
    if (!loaded) return;
    const groups = Object.entries(investmentIndustries);
    refreshEquities(groups);
    refreshChart(groups);
    refreshEtfs([["Exchange-traded funds", etfHoldings]]);
    $("investmentCompanyCount").textContent = groups.reduce((total, [, rows]) => total + rows.length, 0);
    $("investmentIndustryCount").textContent = groups.length;
    for (const date of document.querySelectorAll("[data-return-snapshot-date]")) {
      date.textContent = returnSnapshotDate;
    }
    if (investmentRefreshedAt) {
      const refreshed = $("investmentRefreshedAt");
      refreshed.textContent = "Public equities and ETFs last refreshed " + investmentRefreshedAt;
      refreshed.hidden = false;
    }
  });
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

  setupInvestments();
}
