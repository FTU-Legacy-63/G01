/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const { config } = window.PitchLedger;
const { investmentBounds, confirmationProblem } = window.PitchLedger;
// UI only: no scoring, capital mutation or hidden-answer rendering.
// All authored content is inserted as text, never interpreted as HTML.
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function button(text, action, value) {
  const node = element("button", text);
  node.type = "button";
  node.dataset.action = action;
  if (value !== undefined) node.dataset.value = value;
  return node;
}
function prose(text) {
  const box = element("div", null, "prose");
  const paragraphs = typeof text === "string" && text.trim() ? text.split(/\n\s*\n/) : ["This information has not been supplied yet."];
  for (const paragraph of paragraphs) box.append(element("p", paragraph));
  return box;
}
function table(headers, rows, caption) {
  const wrap = element("div", null, "table-scroll");
  const grid = element("table");
  grid.append(element("caption", caption));
  const head = element("thead"), tr = element("tr");
  for (const name of headers) {
    const th = element("th", name); th.scope = "col"; tr.append(th);
  }
  head.append(tr); grid.append(head);
  const body = element("tbody");
  for (const values of rows) {
    const row = element("tr");
    values.forEach((value, index) => {
      const cell = element(index === 0 ? "th" : "td", value);
      if (index === 0) cell.scope = "row";
      row.append(cell);
    });
    body.append(row);
  }
  grid.append(body); wrap.append(grid); return wrap;
}
const number = value => Number.isFinite(value) ? value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—";
function founder(caseData) {
  const figure = element("figure", null, "founder");
  if (caseData.founderImage) {
    const image = element("img"); image.src = caseData.founderImage;
    image.alt = caseData.founderName || "Founder";
    image.addEventListener("error", () => { image.remove(); figure.prepend(element("div", null, "silhouette")); }, { once: true });
    figure.append(image);
  } else {
    const shape = element("div", null, "silhouette"); shape.setAttribute("aria-hidden", "true"); figure.append(shape);
  }
  figure.append(element("figcaption", caseData.founderName || "Founder"));
  return figure;
}
function home(p) {
  const scene = element("section", null, "scene home-scene");
  scene.append(element("h2", "Meet the founder", "visually-hidden"));
  const bubble = element("div", null, "speech"); bubble.append(prose(p.homeMessage));
  bubble.append(button("Read the pitch →", "screen", "pitch"));
  scene.append(bubble, founder(p)); return scene;
}
function pitch(p) {
  const section = element("section", null, "page");
  section.append(element("h2", "Pitch"));
  const panel = element("div", null, "paper"); panel.append(prose(p.pitch));
  section.append(panel); return section;
}
function documents(p, state) {
  const section = element("section", null, "page documents");
  section.append(element("h2", "Documents", "visually-hidden"));
  const tabs = element("nav", null, "document-tabs"); tabs.setAttribute("aria-label", "Document sections");
  for (const [id, label] of [["industry", "Industry Overview"], ["company", "Company Overview"], ["financials", "Financial Statements"]]) {
    const tab = button(label, "document", id);
    if (id === state.documentTab) tab.setAttribute("aria-current", "page");
    tabs.append(tab);
  }
  section.append(tabs);
  const panel = element("div", null, "paper");
  if (state.documentTab === "industry") {
    panel.append(element("h2", "Industry overview"), prose(p.industryOverview));
    const market = p.industryData;
    if (market) {
      panel.append(table(["Indicator", "Case information"], [
        ["Current market size", `${market.marketSize.currency} ${number(market.marketSize.value * market.marketSize.unit / 1e9)} billion`],
        [market.forecastGrowth.sourceLabel, `${number(market.forecastGrowth.value * 100)}%`],
        ["Leading segment", market.leadingSegment], ["Leading region", market.leadingRegion],
      ], "Market context"), element("p", market.dataNote, "note"), element("p", market.forecastGrowth.interpretation, "note"));
    }
    if (p.industryBenchmarks) {
      const b = p.industryBenchmarks;
      panel.append(table(["Metric", ...b.columns], b.rows.map(r => [r.label, ...r.values.map(v => r.unit === "ratio" ? `${number(v * 100)}%` : `${number(v)}×`)]), "Scenario comparison benchmarks"));
      panel.append(element("p", b.dataNote, "note"));
      for (const row of b.rows) if (row.note) panel.append(element("p", row.note, "note"));
    }
  } else if (state.documentTab === "company") {
    panel.append(element("h2", "Company overview"), prose(p.companyOverview));
    const funds = p.fundingReference;
    if (funds?.status === "active_source_plan") {
      panel.append(table(["Use", "Share", "USD thousands"], funds.useOfFunds.map(r => [r.category, `${number(r.share * 100)}%`, number(r.amount)]), "Use of funds — full USD 2 million raise"));
      panel.append(element("p", funds.note, "note"));
    }
  } else {
    panel.append(element("h2", "Financial statements"));
    const f = p.financials;
    panel.append(element("p", f.currency && f.unit ? `Currency: ${f.currency} · Scale: ${number(f.unit)}` : "Figures are shown as recorded in the workbook. Currency and scale are awaiting confirmation.", "note"));
    panel.append(element("p", "Fictional, adjusted case statements · 2024–2025", "note"));
    for (const [key, label] of [["incomeStatement", "Income statement"], ["balanceSheet", "Balance sheet"], ["cashFlowStatement", "Cash flow statement"]]) {
      panel.append(table(["Item", ...f.years.map(String)], f[key].map(r => [r.label, ...r.values.map(number)]), label));
    }
  }
  section.append(panel); return section;
}
function dialogue(p, state) {
  const section = element("section", null, "dialogue-screen");
  const current = p.dialogue.nodes.find(n => n.id === state.nodeId);
  if (!current) { section.append(element("p", "Dialogue is not available yet.")); return section; }
  const scene = element("div", null, "scene");
  const bubble = element("div", null, "speech");
  const topic = p.dialogue.topics.find(t => t.id === current.topicId);
  bubble.append(element("p", topic?.title || "Founder Q&A", "eyebrow"), prose(current.founderText));
  scene.append(bubble, founder(p)); section.append(scene);
  const options = element("div", null, "dialogue-options");
  options.append(element("h2", current.speaker === "system" ? "Discussion topics" : "You:", "options-label"));
  for (const choice of current.choices) options.append(button(choice.text, "choice", choice.id));
  const history = button(state.historyOpen ? "Close chat history" : "Chat history", "history");
  history.className = "history-toggle"; history.setAttribute("aria-expanded", String(state.historyOpen)); options.append(history);
  if (state.historyOpen) {
    const list = element("div", null, "history"); list.setAttribute("aria-label", "Chat history");
    if (!state.history.length) list.append(element("p", "No questions asked yet."));
    for (const item of state.history) {
      list.append(element("p", `You: ${item.question}`, "history-question"), element("p", `Founder: ${item.answer}`));
    }
    options.append(list);
  }
  section.append(options); return section;
}
function money(value, currency) {
  return `${currency} ${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}
function refreshDecision(p, state) {
  const progress = document.querySelector("#checklist-progress");
  if (progress) progress.textContent = `${Object.keys(state.answers).length} / ${p.checklist.length} answered`;
  const summary = document.querySelector("#allocation-summary");
  if (summary) {
    const equity = state.amount / p.deal.referenceInvestment * p.deal.referenceEquity;
    const slider = document.querySelector("#investment-slider");
    if (slider) slider.setAttribute("aria-valuetext", `${number(equity * 100)}% equity, ${money(state.amount * p.deal.unit, p.deal.currency)}`);
    summary.textContent = `Capital invested: ${money(state.amount * p.deal.unit, p.deal.currency)} · Equity: ${number(equity * 100)}%`;
  }
  const problem = confirmationProblem(config, p, state);
  const status = document.querySelector("#confirmation-status");
  if (status) status.textContent = state.committed ? "Decision confirmed. Your assessment is locked." : problem || "Ready to confirm. This will lock your checklist and investment decision.";
  const confirm = document.querySelector('[data-action="confirm"]');
  if (confirm) confirm.disabled = !!problem;
}
function decision(p, state) {
  const section = element("section", null, "page");
  section.append(element("h2", "Checklist"), element("p", "Answer every question before making an Invest/Reject decision."));
  const list = element("div", null, "checklist");
  p.checklist.forEach((item, index) => {
    const field = element("fieldset"); field.disabled = state.committed;
    field.append(element("legend", `${index + 1}. ${item.statement}`));
    for (const [value, title] of [["yes", "Yes"], ["no", "No"]]) {
      const label = element("label"), input = element("input");
      input.type = "radio"; input.name = item.id; input.value = value; input.dataset.checklistId = item.id;
      input.checked = state.answers[item.id] === (value === "yes");
      label.append(input, document.createTextNode(title)); field.append(label);
    }
    list.append(field);
  });
  section.append(list);
  const progress = element("p", "", "note");
  progress.id = "checklist-progress"; progress.setAttribute("aria-live", "polite"); section.append(progress);
  section.append(element("h2", "Decision making"));
  section.append(element("p", `Offer: ${money(p.deal.referenceInvestment * p.deal.unit, p.deal.currency)} for ${number(p.deal.referenceEquity * 100)}% equity.`));
  const bounds = investmentBounds(config, p);
  const controls = element("div", null, "decision-controls");
  for (const [value, title] of [["invest", "Invest"], ["reject", "Reject"]]) {
    const b = button(title, "decision", value);
    b.disabled = state.committed || (value === "invest" && !bounds.available);
    b.setAttribute("aria-pressed", String(state.decision === value)); controls.append(b);
  }
  section.append(controls);
  if (!bounds.available && !state.committed) {
    const note = element("div", null, "note");
    note.append(element("p", "Invest is unavailable:"));
    const ul = element("ul"); bounds.issues.forEach(issue => ul.append(element("li", issue))); note.append(ul); section.append(note);
  }
  const label = element("label", "Equity allocation"); label.htmlFor = "investment-slider";
  const slider = element("input"); slider.type = "range"; slider.id = "investment-slider";
  slider.disabled = state.committed || state.decision !== "invest" || !bounds.available;
  if (state.decision === "invest" && bounds.available) {
    slider.min = String(bounds.min); slider.max = String(bounds.max); slider.step = String(bounds.step); slider.value = String(state.amount);
    section.append(element("p", `Equity: ${number(bounds.min / bounds.price * 100)}% – ${number(bounds.max / bounds.price * 100)}% · Step: ${number(bounds.step / bounds.price * 100)} percentage point (${money(bounds.step * p.deal.unit, p.deal.currency)})`, "note"));
  } else { slider.min = "0"; slider.max = "1"; slider.value = "0"; }
  const summary = element("p"); summary.id = "allocation-summary";
  section.append(label, slider, summary);
  const status = element("p", "", "note"); status.id = "confirmation-status"; status.setAttribute("aria-live", "polite"); section.append(status);
  const confirm = button("Confirm deal", "confirm"); confirm.disabled = true; section.append(confirm);
  if (state.committed) section.append(button("View report →", "screen", "report"));
  return section;
}
function report(p, state) {
  const section = element("section", null, "page report");
  section.append(element("h2", "Investment report"));
  if (!state.committed || !state.result) { section.append(element("p", "Confirm a decision first.")); return section; }
  const r = state.result;
  section.append(element("p", `${p.name} · ${r.decision === "invest" ? "Invest" : "Reject"}`, "report-decision"));
  section.append(table(["Metric", "Result"], [
    ["Capital allocated", money(r.investment * p.deal.unit, p.deal.currency)],
    ["Equity", `${number(r.equity * 100)}%`],
    ["Initial fund", money(r.initialCapital, config.currency)],
    ["Invested capital in fund currency", money(r.investedFund, config.currency)],
    ["Uninvested capital", money(r.uninvestedCapital, config.currency)],
    ["Investment proceeds", money(r.recovered, config.currency)],
    ["Profit / loss", money(r.profit, config.currency)],
    ["Final fund value", money(r.finalCapital, config.currency)],
    ["Portfolio return", `${number(r.portfolioReturn * 100)}%`],
    ["Checklist accuracy", `${r.checklist.correct} / ${r.checklist.total} · ${number(r.checklist.accuracy)}%`],
    ["Return score", `${r.returnScore} / 100`],
    ["Overall performance", `${number(r.overall)} / 100`],
    ["Classification", r.classification],
  ], "Your results"));
  const formula = `Portfolio return = profit / initial fund × 100. Overall performance = ${number(config.checklistWeight * 100)}% × checklist accuracy + ${number(config.returnWeight * 100)}% × return score.`;
  section.append(element("p", formula, "note"));
  section.append(element("p", "Return score bands: ≥50% → 100; ≥30% → 80; ≥15% → 60; ≥1% → 40; ≥−15% → 20; below −15% → 0. Scores use unrounded returns.", "note"));
  if (r.rate && config.currency !== p.deal.currency) section.append(element("p", `Fixed scenario conversion: ${money(r.rate, config.currency)} per ${p.deal.currency} 1, used for both investment and recovery. No exchange-rate gain or loss is simulated.`, "note"));
  section.append(element("p", p.deal.horizonYears ? `Simulation horizon: ${p.deal.horizonYears} years.` : "The case does not specify a holding period. Returns are total simulated returns, not annualized.", "note"));
  if (r.decision === "reject") section.append(element("p", "You rejected the deal: investment and equity are zero, and no investment profit or loss is generated."));
  for (const [correct, title] of [[true, "What you identified well"], [false, "What you missed"]]) {
    section.append(element("h3", title));
    const items = r.checklist.items.filter(i => i.correct === correct);
    if (!items.length) section.append(element("p", correct ? "None of the assessments matched the benchmark." : "All assessments matched the benchmark."));
    for (const item of items) {
      const details = element("details");
      details.append(element("summary", correct ? item.feedback?.correctLabel || item.statement : item.feedback?.wrongTitle || item.statement));
      details.append(element("p", item.statement), element("p", `Your answer: ${item.answer ? "Yes" : "No"}. Case benchmark: ${item.expected ? "Yes" : "No"}.`));
      if (!correct && item.feedback?.wrongFeedback) details.append(element("p", item.feedback.wrongFeedback));
      details.append(element("p", item.explanation));
      const rows = ["incomeStatement", "balanceSheet", "cashFlowStatement"].flatMap(key => p.financials[key]);
      for (const id of item.evidenceIds || []) {
        const row = rows.find(x => x.id === id), node = p.dialogue.nodes.find(x => x.id === id);
        if (row) details.append(element("p", `${row.label}: ${row.values.map((v,i) => `${p.financials.years[i]} = ${number(v)}`).join("; ")} (workbook units).`, "note"));
        else if (node) details.append(element("p", `Founder evidence: ${node.founderText}`, "note"));
        else if (id === "industry_data") details.append(element("p", "See Documents → Industry Overview for the scenario market data and its limitations.", "note"));
      }
      section.append(details);
    }
  }
  section.append(element("h3", "Investment takeaway"), prose(p.outcomeExplanation));
  section.append(element("p", `Case designer’s benchmark view: ${p.caseAnalysis.benchmarkView}. ${p.caseAnalysis.reason}`));
  section.append(element("p", "Classification describes performance within this simulation, not real-world investing expertise.", "note"));
  section.append(button("Start a new game", "reset"));
  return section;
}
function renderScreen(container, p, state) {
  const screens = { home, pitch, documents, dialogue, decision, report };
  const render = screens[state.screen] || home;
  const screen = render(p, state);
  mountPages(container, screen, `${state.screen}:${state.documentTab}:${state.nodeId}:${state.historyOpen}:${state.committed}`);
  if (state.screen === "decision") refreshDecision(p, state);
}

// Native multi-column fragmentation turns long screens into horizontal pages.
// The controls remain outside the clipped viewport; no wheel/drag scrolling.
const pagePositions = new Map();
let activePaginationCleanup = () => {};
function mountPages(container, screen, key) {
  activePaginationCleanup();
  const viewport = element("div", null, "page-viewport");
  const strip = element("div", null, "page-strip"); strip.append(screen); viewport.append(strip);
  const controls = element("nav", null, "page-controls"); controls.setAttribute("aria-label", "Content pages");
  const previous = element("button", "← Previous"), next = element("button", "Next →");
  previous.type = next.type = "button";
  const label = element("span");label.setAttribute("aria-live", "polite");
  controls.append(previous,label,next);container.replaceChildren(viewport,controls);
  let width=1,total=1,index=pagePositions.get(key)||0,frame=0;
  function show() {
    index=Math.min(Math.max(0,index),total-1);pagePositions.set(key,index);
    strip.style.transform=`translateX(${-index*width}px)`;
    previous.disabled=index===0;next.disabled=index===total-1;
    label.textContent=`Page ${index+1} / ${total}`;
    viewport.scrollLeft=0;
  }
  function measure() {
    width=Math.max(1,viewport.clientWidth);
    strip.style.columnWidth=`${width}px`;
    strip.style.transform="none";
    total=Math.max(1,Math.ceil((strip.scrollWidth-1)/width));show();
  }
  function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(measure);}
  previous.addEventListener("click",()=>{index--;show();});
  next.addEventListener("click",()=>{index++;show();});
  // Keyboard focus on a field in a later column brings that page into view.
  strip.addEventListener("focusin",event=>{
    const target=event.target.getBoundingClientRect(),view=viewport.getBoundingClientRect();
    const offset=target.left-view.left+index*width;
    index=Math.floor(Math.max(0,offset)/width);show();
  });
  strip.addEventListener("toggle",schedule,true);
  strip.addEventListener("load",schedule,true);
  const observer=new ResizeObserver(schedule);observer.observe(viewport);
  schedule();
  activePaginationCleanup=()=>{observer.disconnect();cancelAnimationFrame(frame);};
}

Object.assign(window.PitchLedger, { element, money, refreshDecision, renderScreen });
})();
