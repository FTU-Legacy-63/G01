/* npm test — no third-party packages required. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const scripts = ['game/config.js','core/registry.js','cases/plantfish/case.js','cases/plantfish/scenes.js','cases/creoexchange/case.js','cases/clinova/case.js','game/campaign.js','core/narrative.js','core/engine.js','core/campaign-ledger.js','core/report-engine.js','core/flow.js','core/state.js'];
function load(){const context=vm.createContext({window:{}});for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});return context.window.PitchLedger;}
function answers(p,correct=true){return Object.fromEntries(p.checklist.map(x=>[x.id,correct?x.benchmark:!x.benchmark]));}
function memory(){const values=new Map();return {getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};}
function close(a,b){assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);}

test('three cases register with valid references, reachable dialogue, and no author-only insight leakage',()=>{
 const a=load();assert.equal(a.listCases().join(','),'plantfish,creoexchange,clinova');
 for(const id of a.campaign.caseOrder){const p=a.getCase(id).data;a.validateCase(p);assert.equal(p.checklist.length,7);
  const seen=new Set(),queue=[p.dialogue.startNodeId];while(queue.length){const key=queue.pop();if(seen.has(key))continue;seen.add(key);for(const c of p.dialogue.nodes.find(n=>n.id===key).choices)queue.push(c.nextNodeId);}
  assert.equal(seen.size,p.dialogue.nodes.length);
  for(const node of p.dialogue.nodes){assert.ok(node.choices.length);if(id!=='plantfish')assert.doesNotMatch(node.founderText,/Critical Insight|Intended assessment|[│├└]/);}
 }
});
test('source offer terms and inherited equity step give correct dollar allocations',()=>{
 const a=load();for(const [id,min,max,step] of [['plantfish',1e6,2e6,1e5],['creoexchange',2.5e6,4e6,250000],['clinova',4e6/15*10,4e6,4e6/15]]){
  const p=a.getCase(id).data,b=a.investmentBounds(a.config,p);assert.ok(b.available);close(b.min*p.deal.unit,min);close(b.max*p.deal.unit,max);close(b.step*p.deal.unit,step);close(b.step/b.price,.01);
 }
});
test('all 672 legal portfolio combinations respect capital and reproduce expected profit',()=>{
 const a=load();assert.equal(a.config.initialCapital,1e7);let count=0;
 function visit(i,state,expectedProfit,capital){
  if(i===3){const r=a.buildFinalReport(a.config,a.campaign,state);close(r.portfolio.totalProfit,expectedProfit);close(r.portfolio.totalAllocated,capital);assert.ok(capital<=a.config.initialCapital+1e-6);close(r.portfolio.finalFund,a.config.initialCapital+expectedProfit);close(r.accuracy,100);assert.ok(r.overall>=0&&r.overall<=100);count++;return;}
  const id=a.campaign.caseOrder[i],p=a.getCase(id).data,b=a.investmentBounds(a.config,p),options=[0];
  for(let v=b.min;v<=b.max+1e-7;v+=b.step)options.push(v);
  for(const amount of options){state.completed[id]={answers:answers(p),decision:amount?'invest':'reject',amount};visit(i+1,state,expectedProfit+amount*p.deal.unit*p.deal.roi,capital+amount*p.deal.unit);}
 }
 visit(0,a.freshCampaignState(),0,0);assert.equal(count,12*8*7);
});
test('opportunity envelope and report scores include both losing and winning cases',()=>{
 const a=load(),e=a.returnEnvelope(a.config,a.campaign);close(e.worstProfit,-1e6);close(e.bestProfit,1e6);
 close(a.normalizedReturnScore(-.1,e),0);close(a.normalizedReturnScore(.1,e),100);close(a.normalizedReturnScore(0,e),50);
 close(a.normalizedReturnScore(0,{bestReturn:0,worstReturn:0}),50);
 const s=a.freshCampaignState();for(const id of a.campaign.caseOrder){const p=a.getCase(id).data;s.completed[id]={answers:answers(p,false),decision:'reject',amount:0};}
 const r=a.buildFinalReport(a.config,a.campaign,s);close(r.accuracy,0);close(r.portfolio.finalFund,1e7);close(r.overall,25);
});
test('capital-limited investment refuses overspend; reject remains available',()=>{
 const a=load(),p=a.getCase('clinova').data,c={...a.config,availableCapital:1};
 assert.equal(a.investmentBounds(c,p).available,false);
 assert.throws(()=>a.evaluateCase(c,p,answers(p),'invest',4e6));
 close(a.evaluateCase(c,p,answers(p),'reject',0).allocatedCapital,0);
 const limited={...a.config,initialCapital:3e6};const e=a.returnEnvelope(limited,a.campaign);assert.ok(e.bestAllocated<=3e6);assert.ok(e.worstAllocated<=3e6);
});
test('invalid step, incomplete checklist and repeat confirmation are rejected',()=>{
 const a=load(),p=a.getCase('creoexchange').data;
 assert.throws(()=>a.evaluateCase(a.config,p,{},'reject',0));
 assert.throws(()=>a.evaluateCase(a.config,p,answers(p),'invest',2500001));
 assert.throws(()=>a.evaluateCase(a.config,p,answers(p),'reject',1));
 const s=a.initialState(p);Object.assign(s,{answers:{},decision:'reject',amount:0});assert.throws(()=>a.commitDecision(a.config,p,s));s.answers=answers(p);assert.equal(a.commitDecision(a.config,p,s),true);assert.equal(a.commitDecision(a.config,p,s),false);
});
test('report gating, sequential unlocking and replay invalidation',()=>{
 const a=load(),s=a.freshCampaignState();assert.throws(()=>a.buildFinalReport(a.config,a.campaign,s));assert.equal(a.previousCasesComplete(s,a.campaign,'clinova'),false);
 for(const id of a.campaign.caseOrder){assert.equal(a.previousCasesComplete(s,a.campaign,id),true);const p=a.getCase(id).data;s.completed[id]={answers:answers(p),decision:'reject',amount:0};}
 assert.ok(a.isCampaignComplete(s,a.campaign));a.resetFromCase(s,a.campaign,'creoexchange');assert.deepEqual(Object.keys(s.completed),['plantfish']);assert.equal(a.firstIncompleteCaseId(s,a.campaign),'creoexchange');assert.throws(()=>a.buildFinalReport(a.config,a.campaign,s));
 // Browser smoke additionally checks persisted downstream case sessions are cleared.
});
test('campaign and case saves round-trip; source version changes invalidate saves',()=>{
 const a=load(),storage=memory(),s=a.freshCampaignState(),p=a.getCase('plantfish').data;
 s.completed.plantfish={answers:answers(p),decision:'invest',amount:1000};a.saveCampaignState(storage,a.config,a.campaign,s);
 close(a.availableCapitalBeforeCase(a.config,a.campaign,a.loadCampaignState(storage,a.config,a.campaign),'creoexchange'),9e6);
 const c={...a.config,storageKey:'test-case'},state=a.initialState(p);state.notes='My own notes';a.saveState(storage,c,p,state);assert.equal(a.loadState(storage,c,p).notes,state.notes);
 p.contentVersion++;assert.equal(Object.keys(a.loadCampaignState(storage,a.config,a.campaign).completed).length,0);assert.equal(a.loadState(storage,c,p).notes,'');
});
test('storage failures and corrupt saves do not crash the core',()=>{
 const a=load(),storage={getItem(){throw Error('disabled');},setItem(){throw Error('disabled');}};
 assert.match(a.loadCampaignState(storage,a.config,a.campaign).saveNotice,/unavailable/);assert.match(a.saveCampaignState(storage,a.config,a.campaign,a.freshCampaignState()),/could not/);
 const m=memory();m.setItem(a.config.campaignStorageKey,'invalid json');assert.equal(Object.keys(a.loadCampaignState(m,a.config,a.campaign).completed).length,0);
});
test('document and Q&A flow gates; real choice adds source answer to history',()=>{
 const a=load(),p=a.getCase('clinova').data,s=a.initialState(p);assert.equal(a.flow.canVisit("documents",s),true);assert.equal(a.flow.canVisit("dialogue",s),true);assert.equal(a.flow.canVisit("decision",s),true);assert.equal(a.flow.completeQna(s),true);assert.equal(a.flow.completeInvestigation(s),true);s.pitchComplete=true;
 for(const tab of a.flow.documentTabs)a.flow.visitDocument(s,tab);assert.ok(a.flow.completeInvestigation(s));
 a.flow.choose(p,s,p.dialogue.nodes[0].choices[0].id);const n=p.dialogue.nodes.find(n=>n.id===s.nodeId);assert.ok(a.flow.choose(p,s,n.choices[0].id));assert.equal(s.history.length,1);assert.ok(s.history[0].answer.length>0);assert.ok(a.flow.completeQna(s));
});
test('index classic scripts/local assets exist; every JavaScript file parses',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.doesNotMatch(html,/type=["']module/);
 for(const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
 for(const f of fs.readdirSync(root,{recursive:true}))if(f.endsWith('.js')&&!f.startsWith('node_modules'))new vm.Script(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
 const a=load();for(const id of a.listCases()){const scene=a.getCase(id).presentation.scene;for(const key of ['background','spriteSheet'])assert.ok(fs.existsSync(path.join(root,scene[key])));}
});
