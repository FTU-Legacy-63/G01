/* Final campaign report aggregation and opportunity-envelope scoring. */
(()=>{
"use strict";
const api=window.PitchLedger, EPS=1e-9;
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
function caseWeight(p){const w=p.report?.caseWeight;return Number.isFinite(w)&&w>0?w:1;}
function overallChecklistAccuracy(sequence){
  let weighted=0,totalWeight=0;
  for(const {caseData,result} of sequence.results){const w=caseWeight(caseData);weighted+=result.checklist.accuracy*w;totalWeight+=w;}
  return totalWeight?weighted/totalWeight:0;
}
function portfolioMetrics(config,sequence){
  const initial=api.fundValue(config);
  const totalAllocated=sequence.results.reduce((s,x)=>s+x.result.allocatedCapital,0);
  const totalProfit=sequence.results.reduce((s,x)=>s+x.result.profit,0);
  const finalFund=initial+totalProfit;
  return {initialFund:initial,totalAllocated,unallocatedCapital:initial-totalAllocated,totalProfit,finalFund,portfolioReturn:initial?totalProfit/initial:0};
}
function allocationOptions(config,p,capacity){
  const bounds=api.investmentBounds({...config,availableCapital:capacity},p,capacity);
  const options=[{capital:0,profit:0}];
  if(!bounds.available)return options;
  const count=Math.floor((bounds.max-bounds.min)/bounds.step+EPS)+1;
  // Exact discrete envelope. Authoring guidance keeps deal steps material enough for a finite choice set.
  if(count>20000) throw new Error(`Case ${p.id} has too many investment steps (${count}) for exact campaign-envelope scoring. Increase deal.investmentStep.`);
  for(let i=0;i<count;i++){
    const amount=bounds.min+i*bounds.step;
    const capital=amount*p.deal.unit*bounds.rate;
    options.push({capital,profit:capital*p.deal.roi});
  }
  return options;
}
function prune(states,direction){
  const ordered=[...states.values()].sort((a,b)=>a.capital-b.capital || (direction==="max"?b.profit-a.profit:a.profit-b.profit));
  const out=new Map();let best=direction==="max"?-Infinity:Infinity;
  for(const s of ordered){
    const improves=direction==="max"?s.profit>best+EPS:s.profit<best-EPS;
    if(improves){out.set(Math.round(s.capital*1e6),s);best=s.profit;}
  }
  return out;
}
function optimizeEnvelope(config,campaign,direction){
  const capacity=api.fundValue(config);if(capacity===null)throw new Error("Campaign fund capital is not configured.");
  let states=new Map([[0,{capital:0,profit:0}]]);
  for(const id of campaign.caseOrder){
    const p=api.getCase(id).data,options=allocationOptions(config,p,capacity),next=new Map();
    for(const base of states.values())for(const option of options){
      const capital=base.capital+option.capital;if(capital>capacity+EPS)continue;
      const profit=base.profit+option.profit,key=Math.round(capital*1e6),current=next.get(key);
      if(!current || (direction==="max"?profit>current.profit:profit<current.profit))next.set(key,{capital,profit});
    }
    states=prune(next,direction);
  }
  let chosen={capital:0,profit:0};
  for(const s of states.values())if(direction==="max"?s.profit>chosen.profit:s.profit<chosen.profit)chosen=s;
  return chosen;
}
function returnEnvelope(config,campaign){
  const initial=api.fundValue(config),best=optimizeEnvelope(config,campaign,"max"),worst=optimizeEnvelope(config,campaign,"min");
  return {bestProfit:best.profit,worstProfit:worst.profit,bestReturn:best.profit/initial,worstReturn:worst.profit/initial,bestAllocated:best.capital,worstAllocated:worst.capital};
}
function normalizedReturnScore(playerReturn,envelope){
  const range=envelope.bestReturn-envelope.worstReturn;
  if(Math.abs(range)<=EPS)return 50;
  return clamp(100*(playerReturn-envelope.worstReturn)/range,0,100);
}
function classification(score){
  if(score>=85)return "Shark — Excellent";
  if(score>=70)return "Tuna — Strong";
  if(score>=50)return "Clownfish — Average";
  if(score>=30)return "Pufferfish — Weak";
  return "Minnow — Poor";
}
function performanceSummary(accuracy,returnScore){
  const d=accuracy-returnScore;
  if(d>10)return "Your due-diligence accuracy was stronger than your realized portfolio outcome.";
  if(d<-10)return "Your realized portfolio outcome was stronger than your due-diligence accuracy.";
  return "Your analytical performance and realized portfolio outcome were broadly balanced.";
}
function buildFinalReport(config,campaign,campaignState){
  if(!api.isCampaignComplete(campaignState,campaign))throw new Error("Complete every campaign case before opening the final report.");
  const sequence=api.caseResultSequence(config,campaign,campaignState),portfolio=portfolioMetrics(config,sequence);
  const accuracy=overallChecklistAccuracy(sequence),envelope=returnEnvelope(config,campaign),returnScore=normalizedReturnScore(portfolio.portfolioReturn,envelope);
  const cw=config.checklistWeight,rw=config.returnWeight;
  if(!Number.isFinite(cw)||!Number.isFinite(rw)||cw<0||rw<0||Math.abs(cw+rw-1)>EPS)throw new Error("Invalid final performance weights.");
  const overall=accuracy*cw+returnScore*rw;
  return {accuracy,portfolio,envelope,returnScore,overall,classification:classification(overall),summary:performanceSummary(accuracy,returnScore),cases:sequence.results};
}
Object.assign(api,{caseWeight,overallChecklistAccuracy,portfolioMetrics,returnEnvelope,normalizedReturnScore,classification,performanceSummary,buildFinalReport});
})();
