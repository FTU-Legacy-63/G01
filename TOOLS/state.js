/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const { evaluate } = window.PitchLedger;
const VERSION = 1;
// Full source signature avoids accidentally reusing decisions after terms/answers change.
function signature(config, p) { return JSON.stringify({ config, caseData: p }); }
function initialState(p) {
  return { screen: "home", documentTab: "industry", nodeId: p.dialogue.startNodeId,
    answers: {}, history: [], historyOpen: false, decision: null, amount: 0,
    committed: false, result: null, saveNotice: "" };
}
function saveState(storage, config, p, state) {
  try {
    storage.setItem(config.storageKey, JSON.stringify({ version: VERSION, signature: signature(config, p),
      state: { screen: state.screen, documentTab: state.documentTab, nodeId: state.nodeId,
        answers: state.answers, history: state.history.map(h => h.choiceId),
        historyOpen: state.historyOpen, decision: state.decision, amount: state.amount, committed: state.committed } }));
    return "";
  } catch { return "Progress could not be saved on this browser. Keep this page open to continue."; }
}
function loadState(storage, config, p) {
  const fresh = initialState(p);
  let raw;
  try { raw = storage.getItem(config.storageKey); }
  catch { fresh.saveNotice = "Browser storage is unavailable. This session will work, but progress may not survive a reload."; return fresh; }
  if (!raw) return fresh;
  try {
    const record = JSON.parse(raw), s = record.state;
    if (record.version !== VERSION || record.signature !== signature(config, p)) {
      fresh.saveNotice = "The case or its rules changed. A new session has started."; return fresh;
    }
    if (!s || typeof s !== "object" || !s.answers || typeof s.answers !== "object") throw new Error();
    const ids = new Set(p.checklist.map(c => c.id));
    if (Object.keys(s.answers).some(id => !ids.has(id) || typeof s.answers[id] !== "boolean")) throw new Error();
    fresh.answers = { ...s.answers };
    if (["home", "pitch", "documents", "dialogue", "decision", "report"].includes(s.screen)) fresh.screen = s.screen;
    if (["industry", "company", "financials"].includes(s.documentTab)) fresh.documentTab = s.documentTab;
    const nodes = new Map(p.dialogue.nodes.map(n => [n.id,n]));
    if (nodes.has(s.nodeId)) fresh.nodeId = s.nodeId;
    const choices = new Map(p.dialogue.nodes.flatMap(n => n.choices).map(c => [c.id,c]));
    if (!Array.isArray(s.history)) throw new Error();
    fresh.history = s.history.map(id => {
      const c = choices.get(id), node = nodes.get(c?.nextNodeId);
      if (!c || !node || c.navigationOnly || c.endsBranch) throw new Error();
      return { choiceId:id, question:c.text, answer:node.founderText };
    });
    fresh.historyOpen = s.historyOpen === true;
    if (s.decision !== null && !["invest", "reject"].includes(s.decision)) throw new Error();
    if (!Number.isFinite(s.amount) || s.amount < 0) throw new Error();
    fresh.decision = s.decision; fresh.amount = s.amount;
    if (fresh.decision === "reject") fresh.amount = 0;
    if (s.committed === true) {
      // Never trust a saved score or capital balance: recalculate from committed inputs.
      fresh.result = evaluate(config, p, fresh.answers, fresh.decision, fresh.amount);
      fresh.committed = true;
    } else if (fresh.screen === "report") fresh.screen = "decision";
    return fresh;
  } catch { const reset=initialState(p);reset.saveNotice="The saved session could not be restored. A new session has started.";return reset; }
}
function resetState(storage, config, p) {
  const state = initialState(p);
  try { storage.removeItem(config.storageKey); }
  catch { state.saveNotice = "The previous browser save could not be cleared."; }
  return state;
}
function commitDecision(config, p, state) {
  if (state.committed) return false;
  const result = evaluate(config, p, state.answers, state.decision, state.amount);
  state.result = result;
  state.committed = true;
  state.screen = "report";
  return true;
}

Object.assign(window.PitchLedger, { initialState, saveState, loadState, resetState, commitDecision });
})();
