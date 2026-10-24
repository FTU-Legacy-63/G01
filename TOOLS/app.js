(()=>{
"use strict";
const api=window.PitchLedger;
const {config,caseData:p,presentation}=api.session,scene=presentation.scene || {};
const {flow,narrative,loadState,saveState,resetState,commitDecision,investmentBounds,money,renderScreen,refreshDecision}=api;
const storage={getItem:k=>window.localStorage.getItem(k),setItem:(k,v)=>window.localStorage.setItem(k,v),removeItem:k=>window.localStorage.removeItem(k)};
let campaignState=api.campaignState;
let state=loadState(storage,config,p,scene);
// Campaign ledger is authoritative for a completed case; rebuild a missing case-session save if needed.
const recorded=campaignState.completed[p.id];
if(recorded && !state.committed){
  state.answers={...recorded.answers};state.decision=recorded.decision;state.amount=recorded.amount;
  state.result=api.evaluateCase(config,p,state.answers,state.decision,state.amount);state.committed=true;state.screen=api.isCampaignComplete(campaignState,api.campaign)?"report":"decision";
}else if(state.committed && !recorded){api.recordCaseDecision(campaignState,p.id,state);const issue=api.saveCampaignState(storage,api.config,api.campaign,campaignState);if(issue)campaignState.saveNotice=issue;}
const content=document.querySelector('#content'),nav=document.querySelector('#navigation'),shell=document.querySelector('.game-shell'),overlay=document.querySelector('#opening-overlay');
const caseIndex=api.campaign.caseOrder.indexOf(p.id);
document.title=config.gameTitle+' — '+p.name;
document.querySelector('#opening-fund-capital').textContent=money(api.fundValue(api.config),api.config.currency);
document.querySelector('.opening-date').textContent=api.campaign.roundLabel;
document.querySelector('#case-label').textContent=api.campaign.roundLabel+' / CASE '+String(caseIndex+1).padStart(2,'0')+' OF '+String(api.campaign.caseOrder.length).padStart(2,'0')+' / '+p.name;
const enter=document.querySelector('#open-tutorial');
function notices(){document.querySelector('#save-notice').textContent=state.saveNotice || campaignState.saveNotice || '●  Progress saved on this device';}
function saveCampaign(){const issue=api.saveCampaignState(storage,api.config,api.campaign,campaignState);if(issue)campaignState.saveNotice=issue;}
function persist(){const issue=saveState(storage,config,p,state);if(issue)state.saveNotice=issue;notices();}
function displayCapital(){
  if(state.screen==='report' && api.isCampaignComplete(campaignState,api.campaign))return api.buildFinalReport(api.config,api.campaign,campaignState).portfolio.finalFund;
  return Math.max(0,config.availableCapital-(state.committed?state.result.allocatedCapital:0));
}
function render(){
  document.body.dataset.screen=state.screen;
  const isScene=['home','pitch','dialogue'].includes(state.screen);shell.dataset.mode=isScene?'dialogue':'analyst';
  document.querySelector('#mode-label').textContent=isScene?'DIALOGUE MODE':state.screen==='report'?'FINAL REPORT':'ANALYST MODE';
  for(const b of nav.querySelectorAll('[data-screen]')){
    const target=b.dataset.screen;b.hidden=target==='report'&&!api.isCampaignComplete(campaignState,api.campaign);b.disabled=!flow.canVisit(target,state);
    if(target===state.screen || target==='pitch'&&state.screen==='home')b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');
    const completed={pitch:state.pitchComplete,documents:state.investigationComplete,dialogue:state.qnaComplete,decision:state.committed,report:state.screen==='report'};b.classList.toggle('completed',completed[target]);
    b.title=b.disabled?(target==='report'?'Complete every case to unlock the final report.':'Complete the preceding stage to unlock'):'';
  }
  document.querySelector('#fund-label').textContent=state.screen==='report'?'FINAL FUND VALUE':'AVAILABLE CAMPAIGN CAPITAL';
  document.querySelector('#fund-capital').textContent=Number(displayCapital()).toLocaleString('en-US', {maximumFractionDigits:2});
  document.querySelector('#text-speed').textContent=state.instantText?'Text: instant':'Text: animated';
  renderScreen(content,p,state);notices();
  api.audioUI?.syncScene({opening:!overlay.hidden,screen:state.screen});
}
function focusContent(){content.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function changeScreen(screen){if(!flow.canVisit(screen,state))return;state.screen=screen;if(screen==='documents')flow.visitDocument(state,state.documentTab);render();persist();focusContent();}
function restart(){
  const later=api.campaign.caseOrder.length-caseIndex-1;
  const extra=later?` This will also clear ${later} later campaign case${later===1?'':'s'} because their available capital depends on this allocation.`:'';
  if(!window.confirm('Start this case again? Your answers, notes and investment decision for this case will be cleared.'+extra))return;
  api.resetFromCase(campaignState,api.campaign,p.id);
  // A later case-session must not resurrect a decision removed from the ledger.
  for(const id of api.campaign.caseOrder.slice(caseIndex+1)){
    try{storage.removeItem(api.config.storageKey+':case:'+id);}catch{}
  }
  saveCampaign();state=resetState(storage,config,p);render();persist();focusContent();
}
function restartCampaign(){
  if(!window.confirm('Start a new campaign? All case decisions and campaign results will be cleared.'))return;
  campaignState=api.resetCampaignState(storage,api.config);api.campaignState=campaignState;
  for(const id of api.campaign.caseOrder){try{storage.removeItem(api.config.storageKey+':case:'+id);}catch{}}
  window.location.href='./index.html';
}
function enterGame(){overlay.hidden=true;shell.inert=false;shell.removeAttribute('inert');shell.removeAttribute('aria-hidden');render();persist();focusContent();}
api.setupTutorial(enterGame);

document.querySelector('#start-game').addEventListener('click',()=>{document.querySelector('.start-splash').hidden=true;document.querySelector('.opening-letter').hidden=false;enter.focus();});
document.querySelector('#reset-game').addEventListener('click',restart);
document.querySelector('#text-speed').addEventListener('click',()=>{state.instantText=!state.instantText;render();persist();});
nav.addEventListener('click',e=>{const b=e.target.closest('[data-screen]');if(b&&!b.disabled)changeScreen(b.dataset.screen);});
function nextLine(){
  if(api.revealLine())return;
  if(state.screen==='pitch'){
    const lines=narrative.pitchLines(p,scene);if(state.pitchIndex<lines.length-1)state.pitchIndex++;else{state.pitchComplete=true;return changeScreen('documents');}
  }else if(state.screen==='dialogue'){
    const lines=narrative.dialogueLines(p,state.nodeId,scene);if(state.dialogueIndex<lines.length-1)state.dialogueIndex++;else return;
  }else return;
  render();persist();content.focus({preventScroll:true});
}
content.addEventListener('click',e=>{
  const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;const {action,value}=b.dataset;
  if(action==='screen')return changeScreen(value);
  if(action==='reset')return restart();
  if(action==='reset-campaign')return restartCampaign();
  if(action==='history')return api.toggleHistory();
  if(action==='reveal')return api.revealLine();
  if(action==='next-line')return nextLine();
  if(action==='begin-pitch'){state.screen='pitch';}
  else if(action==='document'){flow.visitDocument(state,value);}
  else if(action==='finish-investigation'){if(!flow.completeInvestigation(state))return;}
  else if(action==='finish-qna'){if(!flow.completeQna(state))return;}
  else if(action==='choice'){
    const lines=narrative.dialogueLines(p,state.nodeId,scene);if(state.dialogueIndex!==lines.length-1)return;if(!flow.choose(p,state,value))return;
  }else if(action==='decision'&&!state.committed){
    if(value==='reject'){state.decision='reject';state.amount=0;}
    else if(value==='invest'){const bounds=investmentBounds(config,p);if(!bounds.available)return;if(state.decision!=='invest')state.amount=bounds.min;state.decision='invest';}else return;
  }else if(action==='confirm'&&!state.committed){
    if(!window.confirm('Confirm your decision? Your assessment and capital allocation will be locked into the campaign ledger.'))return;
    try{commitDecision(config,p,state);api.recordCaseDecision(campaignState,p.id,state);saveCampaign();if(api.isCampaignComplete(campaignState,api.campaign)){state.screen='report';api.audioUI?.confirmed();}else{api.audioUI?.confirmed(true);persist();const next=api.campaign.caseOrder[caseIndex+1];window.location.href='./index.html?case='+encodeURIComponent(next);return;}}
    catch(error){document.querySelector('#confirmation-status').textContent=error.message;return;}
  }else return;
  const keepScroll=['document','decision'].includes(action),y=window.scrollY;render();persist();
  if(keepScroll){const focus=content.querySelector('[data-action="'+action+'"][data-value="'+value+'"]');focus?.focus({preventScroll:true});window.scrollTo(0,y);}else focusContent();
});
content.addEventListener('change',e=>{
  const input=e.target,id=input.dataset.checklistId;if(state.committed||!id||!p.checklist.some(c=>c.id===id)||!['yes','no'].includes(input.value))return;
  state.answers[id]=input.value==='yes';refreshDecision(p,state);persist();
});
content.addEventListener('input',e=>{
  if(e.target.id==='analyst-notes'){state.notes=e.target.value.slice(0,5000);persist();return;}
  if(e.target.id!=='investment-slider'||state.committed||state.decision!=='invest')return;
  state.amount=Number(e.target.value);refreshDecision(p,state);persist();
});
document.addEventListener('keydown',e=>{
  if(!overlay.hidden||document.querySelector('dialog[open]')||e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key!==' '&&e.key!=='Enter')return;if(e.target.closest('button,a,input,textarea,select,summary'))return;
  if(['pitch','dialogue'].includes(state.screen)){e.preventDefault();nextLine();}
});
render();
// Confidential manager briefing is campaign-level: only show it before the first case.
if(caseIndex>0){overlay.hidden=true;shell.inert=false;shell.removeAttribute('inert');shell.removeAttribute('aria-hidden');focusContent();}else document.querySelector('#start-game').focus({preventScroll:true});
api.audioUI?.syncScene({opening:!overlay.hidden,screen:state.screen});
})();
