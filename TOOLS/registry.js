/* Classic scripts, no fetch/import/build step. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const cases = new Map();
function validateCase(p) {
  const fail = message => { throw new Error("Invalid case: " + message); };
  if (!p || !/^[a-z0-9][a-z0-9-]*$/.test(p.id)) fail("id must be a lowercase URL slug");
  for (const key of ["name","homeMessage","pitch","industryOverview","companyOverview","outcomeExplanation"])
    if (typeof p[key] !== "string" || !p[key].trim()) fail(key + " is required");
  if (!p.deal || !p.caseAnalysis || typeof p.caseAnalysis.reason !== "string" || typeof p.caseAnalysis.benchmarkView !== "string") fail("deal and caseAnalysis are required");
  if (!p.report || !Number.isFinite(p.report.caseWeight) || p.report.caseWeight <= 0 || typeof p.report.benchmarkInvestmentView !== "string" || !p.report.benchmarkInvestmentView.trim() || !Array.isArray(p.report.keyTakeaways) || !p.report.keyTakeaways.length || p.report.keyTakeaways.some(x=>typeof x!=="string" || !x.trim())) fail("report.caseWeight, benchmarkInvestmentView and keyTakeaways are required");
  const unique = (rows, label) => {
    if (!Array.isArray(rows) || !rows.length) fail(label + " must be a non-empty array");
    const ids = new Set();
    for (const row of rows) { if (!row || typeof row.id !== "string" || !row.id || ids.has(row.id)) fail(label + " has a missing/duplicate id"); ids.add(row.id); }
    return ids;
  };
  const nodes = unique(p.dialogue?.nodes, "dialogue.nodes");
  if (!nodes.has(p.dialogue.startNodeId)) fail("startNodeId does not exist");
  const topics = unique(p.dialogue.topics, "dialogue.topics");
  const choices = [];
  for (const node of p.dialogue.nodes) {
    if (typeof node.founderText !== "string" || !Array.isArray(node.choices)) fail("invalid dialogue node");
    if (node.topicId && !topics.has(node.topicId)) fail("unknown topicId");
    for (const c of node.choices) { if (typeof c.text !== "string" || !nodes.has(c.nextNodeId)) fail("invalid choice target/text"); choices.push(c); }
  }
  unique(choices,"dialogue choices");
  unique(p.checklist,"checklist");
  for (const item of p.checklist) if (typeof item.benchmark !== "boolean" || typeof item.statement !== "string") fail("invalid checklist item");
  if (!Array.isArray(p.financials?.years) || !p.financials.years.length) fail("financial years are required");
  const rows = [];
  for (const key of ["incomeStatement","balanceSheet","cashFlowStatement"]) {
    if (!Array.isArray(p.financials[key])) fail(key + " must be an array");
    for (const row of p.financials[key]) {
      if (typeof row.label !== "string" || !Array.isArray(row.values) || row.values.length !== p.financials.years.length || !row.values.every(Number.isFinite)) fail("invalid financial row");
      rows.push(row);
    }
  }
  unique(rows,"financial rows");
  const evidence = new Set([...nodes,...rows.map(r=>r.id),"industry_data","company_data","financial_notes"]);
  for (const item of p.checklist) for (const id of item.evidenceIds || []) if (!evidence.has(id)) fail("unknown evidence " + id);
  const funding=p.fundingReference;
  if(funding?.status === "active_source_plan") {
    if(!Array.isArray(funding.useOfFunds)||!funding.useOfFunds.length)fail("active funding plan needs rows");
    for(const row of funding.useOfFunds)if(typeof row.category!=="string"||!Number.isFinite(row.share)||!Number.isFinite(row.amount)||row.share<0||row.amount<0)fail("invalid funding row");
    if(funding.total){
      const amount=funding.useOfFunds.reduce((sum,row)=>sum+row.amount,0),share=funding.useOfFunds.reduce((sum,row)=>sum+row.share,0);
      if(!Number.isFinite(funding.total.amount)||!Number.isFinite(funding.total.share)||Math.abs(amount-funding.total.amount)>1e-6||Math.abs(share-funding.total.share)>1e-6)fail("funding total must match rows: {amount, share}");
    }
  }
  return p;
}
function registerCase(definition) {
  validateCase(definition.data);
  const id = definition.data.id;
  if (cases.has(id)) throw new Error("Duplicate case: " + id);
  cases.set(id, definition);
}
function getCase(id) { const entry = cases.get(id); if (!entry) throw new Error("Unknown case: " + id); return entry; }
Object.assign(window.PitchLedger, { registerCase, getCase, validateCase, listCases: () => [...cases.keys()] });
})();
