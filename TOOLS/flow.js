(()=>{
"use strict";
const flow = {
  screens: Object.freeze(["home","pitch","documents","dialogue","decision","report"]),
  documentTabs: Object.freeze(["industry","company","financials"]),
  canVisit(screen,state) {
    if (["home","pitch","documents","dialogue","decision"].includes(screen)) return true;
    if (screen === "report") {
      const api=window.PitchLedger;
      return state.committed && api.campaignState && api.isCampaignComplete(api.campaignState,api.campaign);
    }
    return false;
  },
  choose(p,state,choiceId) {
    const current=p.dialogue.nodes.find(n=>n.id===state.nodeId);
    const choice=current?.choices.find(c=>c.id===choiceId);
    const next=p.dialogue.nodes.find(n=>n.id===choice?.nextNodeId);
    if(!choice || !next) return false;
    if(!choice.navigationOnly && !choice.endsBranch) state.history.push({choiceId:choice.id,question:choice.text,answer:next.founderText});
    state.nodeId=next.id;state.dialogueIndex=0;
    return true;
  },
  visitDocument(state,tab) { if(this.documentTabs.includes(tab)) { state.documentTab=tab;if(!state.visitedDocuments.includes(tab))state.visitedDocuments.push(tab); } },
  completeInvestigation(state) { state.investigationComplete=this.documentTabs.every(t=>state.visitedDocuments.includes(t));state.screen="dialogue";return true; },
  completeQna(state) { state.qnaComplete=true;state.screen="decision";return true; }
};
window.PitchLedger.flow=Object.freeze(flow);
})();
