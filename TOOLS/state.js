(()=>{
"use strict";
const { evaluateCase, flow, narrative }=window.PitchLedger;
const VERSION=3;
function signature(config,p){return JSON.stringify({config:{...config,availableCapital:config.availableCapital},caseData:p});}
function initialState(p){return {screen:"home",documentTab:"industry",nodeId:p.dialogue.startNodeId,answers:{},history:[],historyOpen:false,decision:null,amount:0,committed:false,result:null,saveNotice:"",pitchIndex:0,dialogueIndex:0,pitchComplete:false,visitedDocuments:[],investigationComplete:false,qnaComplete:false,instantText:false,notes:""};}
function saveState(storage,config,p,state){
  try{const {result,saveNotice,...saved}=state;storage.setItem(config.storageKey,JSON.stringify({version:VERSION,signature:signature(config,p),state:{...saved,history:state.history.map(h=>h.choiceId)}}));return "";}
  catch{return "Saving is unavailable. Keep this page open to continue.";}
}
function loadState(storage,config,p,scene={}){
  const fresh=initialState(p);let raw;
  try{raw=storage.getItem(config.storageKey);}catch{fresh.saveNotice="Storage unavailable — progress stays in this session.";return fresh;}
  if(!raw)return fresh;
  try{
    const record=JSON.parse(raw),s=record.state;
    if(record.version!==VERSION || record.signature!==signature(config,p)){fresh.saveNotice="Case or campaign capital changed — a new case session has started.";return fresh;}
    if(!s || !s.answers || typeof s.answers!=="object" || Array.isArray(s.answers))throw Error();
    const ids=new Set(p.checklist.map(c=>c.id));
    if(Object.keys(s.answers).some(id=>!ids.has(id)||typeof s.answers[id]!=="boolean"))throw Error();
    fresh.answers={...s.answers};
    const nodes=new Map(p.dialogue.nodes.map(n=>[n.id,n]));
    if(nodes.has(s.nodeId))fresh.nodeId=s.nodeId;
    const choices=new Map(p.dialogue.nodes.flatMap(n=>n.choices).map(c=>[c.id,c]));
    if(!Array.isArray(s.history))throw Error();
    fresh.history=s.history.map(id=>{const c=choices.get(id),node=nodes.get(c?.nextNodeId);if(!c||!node||c.navigationOnly||c.endsBranch)throw Error();return {choiceId:id,question:c.text,answer:node.founderText};});
    if(s.decision!==null && !["invest","reject"].includes(s.decision))throw Error();
    if(!Number.isFinite(s.amount)||s.amount<0)throw Error();
    fresh.decision=s.decision;fresh.amount=s.decision==="reject"?0:s.amount;
    fresh.pitchComplete=s.pitchComplete===true;
    fresh.visitedDocuments=Array.isArray(s.visitedDocuments)?[...new Set(s.visitedDocuments.filter(t=>flow.documentTabs.includes(t)))]:[];
    fresh.investigationComplete=s.investigationComplete===true && flow.documentTabs.every(t=>fresh.visitedDocuments.includes(t));
    fresh.qnaComplete=s.qnaComplete===true;
    const clamp=(v,length)=>Number.isInteger(v)?Math.max(0,Math.min(length-1,v)):0;
    fresh.pitchIndex=clamp(s.pitchIndex,narrative.pitchLines(p,scene).length);
    fresh.dialogueIndex=clamp(s.dialogueIndex,narrative.dialogueLines(p,fresh.nodeId,scene).length);
    fresh.instantText=s.instantText===true;
    fresh.notes=typeof s.notes==="string"?s.notes.slice(0,5000):"";
    if(flow.documentTabs.includes(s.documentTab))fresh.documentTab=s.documentTab;
    if(s.committed===true){fresh.result=evaluateCase(config,p,fresh.answers,fresh.decision,fresh.amount);fresh.committed=true;}
    if(flow.canVisit(s.screen,fresh))fresh.screen=s.screen;
    return fresh;
  }catch{fresh.saveNotice="Saved case session could not be restored — starting again.";return fresh;}
}
function resetState(storage,config,p){const state=initialState(p);try{storage.removeItem(config.storageKey);}catch{state.saveNotice="Previous save could not be cleared.";}return state;}
function commitDecision(config,p,state){if(state.committed)return false;state.result=evaluateCase(config,p,state.answers,state.decision,state.amount);state.committed=true;return true;}
Object.assign(window.PitchLedger,{initialState,saveState,loadState,resetState,commitDecision});
})();
