const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
function load(){const c=vm.createContext({window:{}});for(const f of ['game/config.js','core/registry.js','cases/plantfish/case.js','cases/plantfish/scenes.js','cases/creoexchange/case.js','cases/clinova/case.js','cases/plantfish/presentation.js','cases/creoexchange/presentation.js','cases/clinova/presentation.js','game/campaign.js','core/narrative.js','core/engine.js','core/campaign-ledger.js','core/flow.js','core/state.js','ui/art-direction.js','ui/industry-chart-data.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);return c.window.PitchLedger;}
test('case content owns all artwork and industry definitions',()=>{const a=load();for(const id of a.listCases()){const p=a.getCase(id).presentation;assert.equal(a.artDirection[id],p.artDirection);assert.equal(a.industryChartBriefings[id],p.industryBriefing);}for(const f of ['ui/art-direction.js','ui/industry-chart-data.js','ui/industry-charts.js'])assert.doesNotMatch(fs.readFileSync(path.join(root,f),'utf8'),/['"](?:plantfish|clinova|creoexchange)['"]/);});
test('direct Decision preserves checklist and choice guards for every case, including save/reload',()=>{
 const a=load();
 for(const id of a.listCases()){
  const p=a.getCase(id).data,s=a.initialState(p);s.screen='decision';
  assert.equal(a.flow.canVisit('decision',s),true);assert.equal(s.visitedDocuments.length,0);
  assert.throws(()=>a.commitDecision(a.config,p,s));
  s.answers=Object.fromEntries(p.checklist.map(c=>[c.id,true]));
  assert.throws(()=>a.commitDecision(a.config,p,s));
  s.decision='reject';assert.equal(a.commitDecision(a.config,p,s),true);
  let raw;const store={getItem:()=>raw,setItem:(k,v)=>raw=v};a.saveState(store,a.config,p,s);
  const restored=a.loadState(store,a.config,p);assert.equal(restored.committed,true);assert.equal(restored.screen,'decision');
  assert.equal(restored.pitchComplete,false);assert.equal(restored.qnaComplete,false);assert.equal(restored.visitedDocuments.length,0);
 }
});
test('Clinova investigation covers all source topics and deep follow-ups without author-only insights',()=>{const a=load(),p=a.getCase('clinova').data;assert.equal(p.dialogue.topics.length,4);assert.equal(p.dialogue.nodes.length,55);const n=p.dialogue.nodes.find(n=>n.id==='topic-3-q2-d-1');assert.ok(n.choices.some(c=>c.nextNodeId==='topic-3-q2-d-1-b'));assert.ok(p.dialogue.nodes.some(n=>n.founderText.includes('78%')));for(const n of p.dialogue.nodes)assert.doesNotMatch(n.founderText,/Critical Insight|TRUE RED FLAG|INVESTOR TAKEAWAY/);assert.doesNotMatch(p.companyOverview,/62%|Horizon|Victoria/);assert.equal(p.fundingReference.total.amount,4000);});

test('funding totals use one validated schema and match their source rows',()=>{const a=load();const p=a.getCase('plantfish').data;assert.equal(p.fundingReference.total.share,1);assert.equal(p.fundingReference.total.amount,2000);const invalid=JSON.parse(JSON.stringify(p));invalid.fundingReference.total=2000;assert.throws(()=>a.validateCase(invalid));assert.equal(a.getCase('creoexchange').data.name,'CreoExchange');assert.doesNotMatch(a.getCase('creoexchange').presentation.industryBriefing.valuationText,/one gradient bar/);});
