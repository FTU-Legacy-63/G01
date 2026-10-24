/* Resolve one case session against the shared campaign ledger before UI starts. */
(()=>{
"use strict";
const api = window.PitchLedger;
const storage={getItem:k=>window.localStorage.getItem(k),setItem:(k,v)=>window.localStorage.setItem(k,v),removeItem:k=>window.localStorage.removeItem(k)};
api.campaignState=api.loadCampaignState(storage,api.config,api.campaign);
function resolveCaseId(requested){
  const order=api.campaign.caseOrder;
  if(requested && order.includes(requested) && api.previousCasesComplete(api.campaignState,api.campaign,requested))return requested;
  return api.firstIncompleteCaseId(api.campaignState,api.campaign) || api.campaign.defaultCaseId;
}
function createSession(caseId) {
  if (!api.campaign.caseOrder.includes(caseId)) throw new Error("Case is not enabled: " + caseId);
  if (!api.previousCasesComplete(api.campaignState,api.campaign,caseId)) throw new Error("Earlier campaign cases must be completed first.");
  const definition = api.getCase(caseId);
  const availableCapital=api.availableCapitalBeforeCase(api.config,api.campaign,api.campaignState,caseId);
  const config = { ...api.config, availableCapital };
  config.storageKey = api.config.storageKey + ":case:" + caseId;
  return { caseId, caseData: definition.data, presentation: definition.presentation || {}, config };
}
api.createSession = createSession;
const requested = new URLSearchParams(window.location.search).get("case");
api.session = createSession(resolveCaseId(requested));
})();
