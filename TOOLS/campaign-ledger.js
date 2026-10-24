/* Campaign persistence and shared-capital ledger. Stores player inputs, recomputes results. */
(()=>{
"use strict";
const api = window.PitchLedger;
const VERSION = 1;
function signature(config, campaign) {
  return JSON.stringify({
    initialCapital: config.initialCapital,
    moneyUnit: config.moneyUnit,
    currency: config.currency,
    dealToFundRate: config.dealToFundRate,
    checklistWeight: config.checklistWeight,
    returnWeight: config.returnWeight,
    caseOrder: campaign.caseOrder,
    cases: campaign.caseOrder.map(id => {
      const p = api.getCase(id).data;
      return { id:p.id, contentVersion:p.contentVersion, deal:p.deal, checklist:p.checklist, caseWeight:p.report?.caseWeight };
    })
  });
}
function freshCampaignState() { return { completed: {}, saveNotice: "" }; }
function loadCampaignState(storage, config, campaign) {
  const fresh = freshCampaignState(); let raw;
  try { raw = storage.getItem(config.campaignStorageKey); }
  catch { fresh.saveNotice = "Campaign storage is unavailable — progress stays in this session."; return fresh; }
  if (!raw) return fresh;
  try {
    const record = JSON.parse(raw);
    if (record.version !== VERSION || record.signature !== signature(config,campaign) || !record.completed || typeof record.completed !== "object") return fresh;
    for (const id of campaign.caseOrder) {
      const r = record.completed[id]; if (!r) continue;
      const p = api.getCase(id).data;
      if (!["invest","reject"].includes(r.decision) || !Number.isFinite(r.amount) || r.amount < 0 || !r.answers || typeof r.answers !== "object") throw new Error();
      const allowed = new Set(p.checklist.map(x=>x.id));
      if (Object.keys(r.answers).some(k=>!allowed.has(k) || typeof r.answers[k] !== "boolean")) throw new Error();
      fresh.completed[id] = { decision:r.decision, amount:r.decision === "reject" ? 0 : r.amount, answers:{...r.answers} };
    }
    return fresh;
  } catch { fresh.saveNotice = "Campaign save could not be restored — starting a new campaign."; return fresh; }
}
function saveCampaignState(storage, config, campaign, state) {
  try {
    storage.setItem(config.campaignStorageKey, JSON.stringify({version:VERSION,signature:signature(config,campaign),completed:state.completed}));
    return "";
  } catch { return "Campaign progress could not be saved on this browser."; }
}
function caseResultSequence(config, campaign, state) {
  let available = api.fundValue(config); const results = [];
  if (available === null) throw new Error("Campaign fund capital is not configured.");
  for (const id of campaign.caseOrder) {
    const input = state.completed[id]; if (!input) break;
    const p = api.getCase(id).data;
    const result = api.evaluateCase({...config,availableCapital:available},p,input.answers,input.decision,input.amount,available);
    results.push({caseData:p,result});
    available -= result.allocatedCapital;
  }
  return { results, availableCapital: available };
}
function availableCapitalBeforeCase(config, campaign, state, caseId) {
  let available = api.fundValue(config); if (available === null) return null;
  for (const id of campaign.caseOrder) {
    if (id === caseId) return available;
    const input = state.completed[id]; if (!input) return available;
    const p = api.getCase(id).data;
    const result = api.evaluateCase({...config,availableCapital:available},p,input.answers,input.decision,input.amount,available);
    available -= result.allocatedCapital;
  }
  return available;
}
function recordCaseDecision(state, caseId, caseState) {
  state.completed[caseId] = { decision:caseState.decision, amount:caseState.decision === "reject" ? 0 : caseState.amount, answers:{...caseState.answers} };
}
function resetFromCase(state, campaign, caseId) {
  const index = campaign.caseOrder.indexOf(caseId);
  if (index < 0) return;
  for (const id of campaign.caseOrder.slice(index)) delete state.completed[id];
}
function resetCampaignState(storage, config) {
  try { storage.removeItem(config.campaignStorageKey); } catch {}
  return freshCampaignState();
}
function completedCount(state,campaign){return campaign.caseOrder.filter(id=>!!state.completed[id]).length;}
function isCampaignComplete(state,campaign){return campaign.caseOrder.length>0 && completedCount(state,campaign)===campaign.caseOrder.length;}
function firstIncompleteCaseId(state,campaign){return campaign.caseOrder.find(id=>!state.completed[id]) || campaign.caseOrder.at(-1) || campaign.defaultCaseId;}
function previousCasesComplete(state,campaign,caseId){const i=campaign.caseOrder.indexOf(caseId);return i>=0 && campaign.caseOrder.slice(0,i).every(id=>!!state.completed[id]);}
Object.assign(api,{freshCampaignState,loadCampaignState,saveCampaignState,caseResultSequence,availableCapitalBeforeCase,recordCaseDecision,resetFromCase,resetCampaignState,completedCount,isCampaignComplete,firstIncompleteCaseId,previousCasesComplete});
})();
