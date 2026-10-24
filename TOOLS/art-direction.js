/* Generic adapter: assets are owned by each case presentation. */
window.PitchLedger.artDirection=Object.fromEntries(window.PitchLedger.listCases().map(id=>[id,window.PitchLedger.getCase(id).presentation.artDirection]));
