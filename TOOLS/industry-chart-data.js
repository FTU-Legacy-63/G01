/* Generic adapter: authored industry content belongs to the case. */
window.PitchLedger.industryChartBriefings=Object.fromEntries(window.PitchLedger.listCases().map(id=>[id,window.PitchLedger.getCase(id).presentation.industryBriefing]));
