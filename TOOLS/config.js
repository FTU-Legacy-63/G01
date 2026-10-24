/* Classic script: supports both file:// and HTTP. */
(()=>{
"use strict";
window.PitchLedger = window.PitchLedger || {};
const config = {
  gameTitle: "Pitch & Ledger",
  initialCapital: 10_000_000,
  currency: "USD",
  moneyUnit: 1,
  // Used only when a case deal currency differs from the fund currency.
  dealToFundRate: null,
  // Final campaign performance weights. Keep these at campaign/core level.
  checklistWeight: 0.5,
  returnWeight: 0.5,
  // Per-case saves are namespaced by core/session.js. Campaign decisions live here.
  storageKey: "pitch-ledger-scenes-v4-10m",
  campaignStorageKey: "pitch-ledger-campaign-v3-10m",
};
Object.assign(window.PitchLedger, { config });
})();
