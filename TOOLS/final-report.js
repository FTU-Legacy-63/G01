/* Presentation only: consumes the existing report engine, never recomputes grades. */
(()=>{
'use strict';
const a=window.PitchLedger,{element:el,button:btn,table,prose,money,evidenceDetails}=a;
const num=n=>n.toLocaleString('en-US',{maximumFractionDigits:2}),pct=n=>num(n*100)+'%';
const species=['Shark','Tuna','Clownfish','Pufferfish','Minnow'];
function reportCategoryImage(classification){
 const name=species.find(s=>classification===s||classification.startsWith(s+' —'));
 return name?'./assets/performance-category-illustrations/'+name+'.png':null;
}
function caseDetail({caseData:p,result:r},index){
 const card=el('section',null,'case-report-card');card.id='case-detail-'+p.id;
 const title=el('h3',`Case ${index+1} · ${p.name}`);title.tabIndex=-1;card.append(title);
 const grid=el('div',null,'case-detail-grid'),assessment=el('div',null,'case-assessment'),feedback=el('div',null,'case-feedback');
 assessment.append(table(['Checklist item','Your assessment','Benchmark','Result'],r.checklist.items.map(item=>[item.statement,item.answer?'Yes':'No',item.expected?'Yes':'No',item.correct?'✓ Correct':'✕ Incorrect']),'Checklist assessment'));
 const stats=el('details',null,'case-outcome-details');stats.append(el('summary','Case outcome'),table(['Metric','Result'],[['Decision',r.decision],['Capital allocated',money(r.allocatedCapital,a.config.currency)],['Case ROI',pct(r.roi)],['Profit / loss',money(r.profit,a.config.currency)],['Checklist accuracy',num(r.checklist.accuracy)+'%']],'Case outcome'));assessment.append(stats);
 for(const [correct,title] of [[true,'✓ What You Identified Well'],[false,'✕ What You Missed']]){
  feedback.append(el('h4',title));const items=r.checklist.items.filter(i=>i.correct===correct);
  if(!items.length)feedback.append(el('p',correct?'No checklist assessment matched the benchmark.':'All checklist assessments matched the benchmark.'));
  for(const item of items)feedback.append(evidenceDetails(p,item,correct));
 }
 feedback.append(el('h4','Benchmark Investment View'),prose(p.report.benchmarkInvestmentView),el('h4','Key takeaways'));
 const ul=el('ul');for(const text of p.report.keyTakeaways)ul.append(el('li',text));feedback.append(ul);
 if(p.outcomeExplanation)feedback.append(el('p',p.outcomeExplanation));
 grid.append(assessment,feedback);card.append(grid);return card;
}
function renderFinalReport(){
 const wrap=el('section',null,'investment-report final-report');
 const header=el('header',null,'report-heading'),logo=el('div',null,'brand');
 const symbol=el('img');symbol.src='./assets/ui/brand-symbol.svg';symbol.alt='&';logo.append(el('span','PITCH'),symbol,el('span','LEDGER'));
 const restart=btn('Restart','reset-campaign');restart.className='report-restart';header.append(logo,restart,el('h1','FINAL INVESTMENT REPORT'));wrap.append(header);
 let r;try{r=a.buildFinalReport(a.config,a.campaign,a.campaignState);}catch(e){wrap.append(el('p',e.message));return wrap;}
 const upper=el('div',null,'report-upper'),overall=el('section',null,'report-panel overall-panel');overall.append(el('h2','1. OVERALL PERFORMANCE'));
 overall.append(table(['Metrics','Result'],[['Checklist Accuracy',num(r.accuracy)+'%'],['Portfolio Return',pct(r.portfolio.portfolioReturn)],['Return Score',num(r.returnScore)+'/100'],['Overall Performance',num(r.overall)+'/100'],['Performance Category',r.classification]],'Overall performance'));
 overall.append(el('p','Summary: '+r.summary,'report-summary'));
 const figure=el('figure',null,'performance-illustration'),img=el('img');img.src=reportCategoryImage(r.classification);img.alt=r.classification;figure.append(img,el('figcaption',r.classification));upper.append(overall,figure);wrap.append(upper);
 const lower=el('section',null,'report-panel portfolio-panel');lower.append(el('h2','2. PORTFOLIO OVERVIEW'));
 const host=el('div',null,'case-detail-host');host.id='selected-case-details';host.setAttribute('aria-live','polite');host.append(el('p','Choose “View details” above to review a case.','case-detail-empty'));
 const buttons=[];
 function select(id){const i=r.cases.findIndex(c=>c.caseData.id===id);if(i<0)return;
  host.replaceChildren(caseDetail(r.cases[i],i));host.scrollTop=0;
  for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.value===id));
 }
 const rows=r.cases.map(({caseData:p,result:c})=>{const b=btn('View details','report-case',p.id);b.className='report-detail-link';b.setAttribute('aria-label','View details: '+p.name);b.setAttribute('aria-controls',host.id);b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>select(p.id));buttons.push(b);
  return [p.name,c.decision==='invest'?'Invest':'Reject',money(c.allocatedCapital,a.config.currency),pct(c.roi),money(c.profit,a.config.currency),num(c.checklist.accuracy)+'%',b];});
 lower.append(table(['Startup','Decision','Capital allocated','ROI','Profit / loss','Accuracy','Details'],rows,'Portfolio overview'),el('h2','3. CASE-BY-CASE DUE DILIGENCE'),host);
 const methods=el('details',null,'report-methods');methods.append(el('summary','Fund totals & scoring method'),table(['Fund metric','Result'],[['Initial fund',money(r.portfolio.initialFund,a.config.currency)],['Capital allocated',money(r.portfolio.totalAllocated,a.config.currency)],['Unallocated capital',money(r.portfolio.unallocatedCapital,a.config.currency)],['Total profit / loss',money(r.portfolio.totalProfit,a.config.currency)],['Final fund',money(r.portfolio.finalFund,a.config.currency)]],'Fund totals'),el('p',`Return Score normalizes portfolio return between ${pct(r.envelope.worstReturn)} and ${pct(r.envelope.bestReturn)}. Overall Performance = ${num(a.config.checklistWeight*100)}% × Checklist Accuracy + ${num(a.config.returnWeight*100)}% × Return Score. Invest/Reject is not scored as a right/wrong answer. ROI is the authored case outcome; rejected cases allocate no capital and have zero profit/loss.`));lower.append(methods);wrap.append(lower);return wrap;
}
Object.assign(a,{renderFinalReport,reportCategoryImage});
})();
