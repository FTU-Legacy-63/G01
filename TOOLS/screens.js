/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const api=window.PitchLedger;
const { config, presentation } = api.session;
const { investmentBounds, confirmationProblem } = api;
// UI only: no scoring, capital mutation or hidden-answer rendering before the final report.
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function button(text, action, value) {
  const node = element("button", text);
  node.type = "button"; node.dataset.action = action;
  if (value !== undefined) node.dataset.value = value;
  return node;
}
function prose(text) {
  const box = element("div", null, "prose");
  const paragraphs = typeof text === "string" && text.trim() ? text.split(/\n\s*\n/) : ["This information has not been supplied yet."];
  for (const paragraph of paragraphs) box.append(element("p", paragraph));
  return box;
}
function appendValue(cell,value){
  if(value && typeof value==="object" && value.nodeType)cell.append(value);else cell.textContent=value ?? "";
}
function table(headers, rows, caption) {
  const wrap = element("div", null, "table-scroll"), grid = element("table");
  if(caption)grid.append(element("caption", caption));
  const head = element("thead"), tr = element("tr");
  for (const name of headers) { const th = element("th", name); th.scope = "col"; tr.append(th); }
  head.append(tr); grid.append(head);
  const body = element("tbody");
  for (const values of rows) {
    const row = element("tr");
    values.forEach((value, index) => {
      const cell = element(index === 0 ? "th" : "td"); if (index === 0) cell.scope = "row"; appendValue(cell,value); row.append(cell);
    });
    body.append(row);
  }
  grid.append(body); wrap.append(grid); return wrap;
}
const number = value => Number.isFinite(value) ? value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—";
const percent = value => Number.isFinite(value) ? `${number(value*100)}%` : "—";
function money(value, currency) { return `${currency === "USD" ? "$" : currency+" "}${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`; }
function documents(p, state) {
  const section = element("section", null, "page documents");
  section.append(element("h2", "Documents", "visually-hidden"));
  const tabs = element("nav", null, "document-tabs"); tabs.setAttribute("aria-label", "Document sections");
  for (const [id, label] of [["industry", "Industry Overview"], ["company", "Company Overview"], ["financials", "Financial Statements"]]) {
    const tab = button(label, "document", id); if (id === state.documentTab) tab.setAttribute("aria-current", "page"); tabs.append(tab);
  }
  section.append(tabs);
  const panel = element("div", null, "paper");
  panel.tabIndex=0;panel.setAttribute("role","region");panel.setAttribute("aria-label","Document content");
  if (state.documentTab === "industry") {
    panel.append(api.renderIndustryBriefing(p));
  } else if (state.documentTab === "company") {
    panel.append(element("h2", "Company overview"), prose(p.companyOverview));
    if (p.companyFacts) panel.append(table(p.companyFacts.columns,p.companyFacts.rows,'Company facts'));
    if (p.financialHighlights) panel.append(table(p.financialHighlights.columns,p.financialHighlights.rows,p.financialHighlights.caption));
    if (p.operatingMetrics) panel.append(table(p.operatingMetrics.columns, p.operatingMetrics.rows, "Operating information"));
    const funds = p.fundingReference;
    if (funds?.status === "active_source_plan") {
      panel.append(table(["Use", "Share", presentation.fundingAmountLabel || funds.currency + " · Scale: " + number(funds.unit)], [...funds.useOfFunds.map(r => [r.category, `${number(r.share * 100)}%`, number(r.amount)]), ...(funds.total ? [['Total', `${number(funds.total.share*100)}%`, number(funds.total.amount)]] : [])], presentation.fundingCaption || "Use of funds"));
      panel.append(element("p", funds.note, "note"));
    }
  } else {
    panel.append(element("h2", "Financial statements")); const f = p.financials;
    panel.append(element("p", f.currency && f.unit ? `Currency: ${f.currency} · Scale: ${number(f.unit)}` : "Figures are shown as recorded in the workbook. Currency and scale are awaiting confirmation.", "note"));
    panel.append(element("p", presentation.financialNote || "Case financial statements · " + f.years.join("–"), "note"));
    for (const [key, label] of [["incomeStatement", "Income statement"], ["balanceSheet", "Balance sheet"], ["cashFlowStatement", "Cash flow statement"]]) panel.append(table(["Item", ...f.years.map(String)], f[key].map(r => [r.label, ...r.values.map(number)]), label));
    for (const note of f.notes || []) panel.append(element("p", note, "note"));
  }
  section.append(panel); return section;
}
function refreshDecision(p, state) {
  const progress = document.querySelector("#checklist-progress"); if (progress) progress.textContent = `${Object.keys(state.answers).length} / ${p.checklist.length} answered`;
  const summary = document.querySelector("#allocation-summary");
  if (summary) {
    const equity = state.amount / p.deal.referenceInvestment * p.deal.referenceEquity, slider = document.querySelector("#investment-slider");
    if (slider) {
      const lo=Number(slider.min),hi=Number(slider.max);
      const fill=state.decision==='invest'?(hi>lo?Math.max(0,Math.min(100,(state.amount-lo)/(hi-lo)*100)):100):0;
      slider.style.setProperty('--slider-fill',fill+'%');
    }
    if (slider) slider.setAttribute("aria-valuetext", `${number(equity * 100)}% equity, ${money(state.amount * p.deal.unit, p.deal.currency)}`);
    summary.textContent = `Capital allocated: ${money(state.amount * p.deal.unit, p.deal.currency)} · Equity: ${number(equity * 100)}%`;
  }
  const problem = confirmationProblem(config, p, state), status = document.querySelector("#confirmation-status");
  if (status) status.textContent = state.committed ? "Decision filed. This case allocation is locked into the campaign ledger." : problem || "Ready to confirm. This will lock your checklist and capital allocation.";
  const confirm = document.querySelector('[data-action="confirm"]'); if (confirm) confirm.disabled = !!problem;
}
function decision(p, state) {
 const section=element('section',null,'page decision-page'),check=element('section',null,'checklist-panel');
 check.append(element('h2','Checklist'),element('p','Please fill in the checklist below before making Invest/Reject decision.','checklist-instruction'));
 const headers=element('div',null,'checklist-head');headers.append(element('span',''),element('span','Yes'),element('span','No'));check.append(headers);
 const list=element('div',null,'checklist');
 p.checklist.forEach((item,index)=>{
  const row=element('div',null,'checklist-row');row.setAttribute('role','group');row.setAttribute('aria-labelledby','question-'+item.id);
  const title=element('span',`${index+1}. ${item.statement}`);title.id='question-'+item.id;row.append(title);
  for(const [value,label] of [['yes','Yes'],['no','No']]){const input=element('input');input.type='radio';input.name=item.id;input.value=value;input.dataset.checklistId=item.id;input.checked=state.answers[item.id]===(value==='yes');input.disabled=state.committed;input.setAttribute('aria-label',label+': '+item.statement);row.append(input);}
  list.append(row);
 });check.append(list);
 const progress=element('p','','note');progress.id='checklist-progress';progress.setAttribute('aria-live','polite');check.append(progress);section.append(check);
 const panel=element('section',null,'decision-panel');panel.append(element('h2','Decision making'));
 const grid=element('div',null,'allocation-grid'),controls=element('div',null,'decision-controls'),bounds=investmentBounds(config,p);
 for(const [value,title] of [['invest','Invest'],['reject','Reject']]){const b=button(title,'decision',value);b.disabled=state.committed||(value==='invest'&&!bounds.available);b.setAttribute('aria-pressed',String(state.decision===value));controls.append(b);}grid.append(controls);
 const allocation=element('div',null,'allocation-slider'),ends=element('div',null,'slider-limits');
 ends.append(element('span',state.decision==='invest'&&bounds.available?money(bounds.min*p.deal.unit,p.deal.currency).replace(/^USD /,'$'):'$0'),element('span','Max: '+(bounds.available?money(bounds.max*p.deal.unit,p.deal.currency).replace(/^USD /,'$'):'—')));allocation.append(ends);
 const label=element('label','Equity allocation','visually-hidden');label.htmlFor='investment-slider';const slider=element('input');slider.type='range';slider.id='investment-slider';slider.disabled=state.committed||state.decision!=='invest'||!bounds.available;
 if(state.decision==='invest'&&bounds.available){slider.min=String(bounds.min);slider.max=String(bounds.max);slider.step=String(bounds.step);slider.value=String(state.amount);}else{slider.min='0';slider.max='1';slider.value='0';}
 allocation.append(label,slider);const summary=element('p');summary.id='allocation-summary';allocation.append(summary);
 if(bounds.available)allocation.append(element('p',`Equity: ${number(bounds.min/bounds.price*100)}%–${number(bounds.max/bounds.price*100)}% · Step: ${number(bounds.step/bounds.price*100)} percentage point`,'note'));
 else allocation.append(element('p',bounds.issues.join(' '),'note'));grid.append(allocation);panel.append(grid);
 const footer=element('div',null,'confirmation-row'),status=element('p','','note');status.id='confirmation-status';status.setAttribute('aria-live','polite');const confirm=button('Confirm deal','confirm');confirm.disabled=true;footer.append(status,confirm);panel.append(footer);

 section.append(panel);return section;
}
function evidenceDetails(p,item,correct){
  const details=element("details"), title=correct ? item.feedback?.correctLabel || item.statement : item.feedback?.wrongTitle || item.statement;
  details.append(element("summary",title),element("p",item.statement),element("p",`Your assessment: ${item.answer?"Yes":"No"}. Benchmark: ${item.expected?"Yes":"No"}.`));
  if(!correct && item.feedback?.wrongFeedback)details.append(element("p",item.feedback.wrongFeedback));
  if(item.explanation)details.append(element("p",item.explanation));
  const rows=["incomeStatement","balanceSheet","cashFlowStatement"].flatMap(key=>p.financials[key]);
  for(const id of item.evidenceIds || []){
    const row=rows.find(x=>x.id===id),node=p.dialogue.nodes.find(x=>x.id===id);
    if(row)details.append(element("p",`${row.label}: ${row.values.map((v,i)=>`${p.financials.years[i]} = ${number(v)}`).join("; ")} (workbook units).`,"note"));
    else if(node)details.append(element("p",`Founder evidence: ${node.founderText}`,"note"));
    else if(id==="industry_data")details.append(element("p","See the case Industry Overview for the scenario market data and its limitations.","note"));
    else if(id==="company_data")details.append(prose(p.companyOverview));
    else if(id==="financial_notes")for(const note of p.financials.notes || [])details.append(element("p",note,"note"));
  }
  return details;
}
Object.assign(api, { element, button, prose, money, table, evidenceDetails, refreshDecision, workspaceRenderers: {documents, decision} });
})();
