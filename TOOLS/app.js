/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const { config } = window.PitchLedger;
const { plantfish } = window.PitchLedger;
const { renderScreen, refreshDecision, money } = window.PitchLedger;
const { investmentBounds, fundValue } = window.PitchLedger;
const { loadState, saveState, resetState, commitDecision } = window.PitchLedger;
// Wrappers allow state helpers to handle browsers that throw on localStorage access.
const storage = { getItem:key=>window.localStorage.getItem(key), setItem:(key,value)=>window.localStorage.setItem(key,value), removeItem:key=>window.localStorage.removeItem(key) };
let state = loadState(storage, config, plantfish);
const content = document.querySelector("#content"), navigation = document.querySelector("#navigation");
const screens = new Set(["home", "pitch", "documents", "dialogue", "decision", "report"]);
document.querySelector("#game-title").textContent = config.gameTitle;
document.querySelector("#company-name").textContent = plantfish.name;
document.querySelector("#founder-name").textContent = plantfish.founderName || "Founder";
function notices() { document.querySelector("#save-notice").textContent = state.saveNotice; }
function persist() {
  const issue=saveState(storage, config, plantfish, state);
  if(issue)state.saveNotice=issue;
  notices();
}
function render() {
  for (const b of navigation.querySelectorAll("[data-screen]")) {
    if (b.dataset.screen === state.screen) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    if(b.dataset.screen === "report")b.hidden=!state.committed;
  }
  const fund=state.committed ? state.result.uninvestedCapital : fundValue(config);
  document.querySelector("#fund-capital").textContent=Number.isFinite(fund)?money(fund,config.currency):"—";
  renderScreen(content, plantfish, state);notices();
}
function changeScreen(screen) {
  if (!screens.has(screen) || (screen === "report" && !state.committed)) return;
  state.screen = screen; render(); persist(); content.focus({ preventScroll: true });window.scrollTo({ top: 0 });
}
function restart() {
  if(!window.confirm("Start a new game? Your current answers and decision will be cleared."))return;
  state=resetState(storage, config, plantfish);render();persist();content.focus();
}
document.querySelector("#reset-game").addEventListener("click",restart);
navigation.addEventListener("click", event => {
  const b=event.target.closest("[data-screen]");if(b)changeScreen(b.dataset.screen);
});
content.addEventListener("click", event => {
  const b=event.target.closest("button[data-action]");if(!b||b.disabled)return;
  const {action,value}=b.dataset;
  if(action === "screen")return changeScreen(value);
  if(action === "reset")return restart();
  if(action === "document" && ["industry","company","financials"].includes(value)) {
    state.documentTab=value;render();content.querySelector(`[data-action="document"][data-value="${value}"]`).focus();
  } else if(action === "choice") {
    const current=plantfish.dialogue.nodes.find(n=>n.id===state.nodeId),choice=current?.choices.find(c=>c.id===value);
    const next=plantfish.dialogue.nodes.find(n=>n.id===choice?.nextNodeId);if(!choice||!next)return;
    if(!choice.navigationOnly&&!choice.endsBranch)state.history.push({choiceId:choice.id,question:choice.text,answer:next.founderText});
    state.nodeId=next.id;render();content.focus({preventScroll:true});
  } else if(action === "history") {
    state.historyOpen=!state.historyOpen;render();content.querySelector('[data-action="history"]').focus();
  } else if(action === "decision" && !state.committed) {
    if(value==="reject"){state.decision="reject";state.amount=0;}
    else if(value==="invest") {
      const bounds=investmentBounds(config,plantfish);if(!bounds.available)return;
      if(state.decision!=="invest")state.amount=bounds.min;
      state.decision="invest";
    } else return;
    render();content.querySelector(`[data-action="decision"][data-value="${value}"]`).focus();
  } else if(action === "confirm" && !state.committed) {
    if(!window.confirm("Confirm this decision? Your checklist and investment amount will be locked."))return;
    try{commitDecision(config,plantfish,state);render();content.focus();window.scrollTo({top:0});}
    catch(error){document.querySelector("#confirmation-status").textContent=error.message;return;}
  }
  persist();
});
content.addEventListener("change", event => {
  const input=event.target,id=input.dataset.checklistId;
  if(state.committed || !id || !plantfish.checklist.some(c=>c.id===id) || !["yes","no"].includes(input.value))return;
  state.answers[id]=input.value==="yes";refreshDecision(plantfish,state);persist();
});
content.addEventListener("input", event => {
  if(event.target.id!=="investment-slider"||state.committed||state.decision!=="invest")return;
  state.amount=Number(event.target.value);refreshDecision(plantfish,state);persist();
});
render();

})();
