// Optional developer tests: node --test tests/logic.test.mjs
// Fixture settings below exercise arithmetic ONLY. They are not active case assumptions.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context = vm.createContext({ window: {} });
for (const file of ['../data/config.js','../data/plantfish.js','../js/engine.js','../js/state.js']) {
  vm.runInContext(fs.readFileSync(new URL(file, import.meta.url),'utf8'), context);
}
const { config:sourceConfig, plantfish:sourceCase, evaluate, investmentBounds, returnScore,
  initialState, saveState, loadState, resetState, commitDecision } = context.window.PitchLedger;
const clone=x=>JSON.parse(JSON.stringify(x));
const answers=Object.fromEntries(sourceCase.checklist.map(c=>[c.id,c.benchmark]));
function fixture(){
 const config={...sourceConfig,initialCapital:10_000_000,currency:'USD',moneyUnit:1,dealToFundRate:null};
 const p=clone(sourceCase);p.deal.minEquity=.1;p.deal.investmentStep=100;
 return {config,p};
}
function memory(){const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};}
test('Active USD 100m config: Reject preserves fund and needs no FX',()=>{
 const result=evaluate(sourceConfig,sourceCase,answers,'reject',0);
 assert.equal(result.initialCapital,100_000_000);assert.equal(result.finalCapital,result.initialCapital);
 assert.equal(result.checklist.accuracy,100);assert.equal(result.portfolioReturn,0);
 assert.equal(result.returnScore,20);assert.equal(result.overall,60);assert.equal(result.equity,0);
 assert.equal(result.classification,'Clownfish — Average');
 assert.equal(investmentBounds(sourceConfig,sourceCase).available,true);
});
test('Investment fixture: exact cash/equity/return identity',()=>{
 const {config,p}=fixture();const r=evaluate(config,p,answers,'invest',1500);
 assert.equal(r.equity,.15);assert.equal(r.investedFund,1_500_000);assert.equal(r.profit,-300_000);
 assert.equal(r.recovered,1_200_000);assert.equal(r.uninvestedCapital,8_500_000);
 assert.equal(r.finalCapital,9_700_000);assert.equal(r.portfolioReturn,-.03);
});
test('Cross-currency fixture converts both capital and proceeds at the same scenario rate',()=>{
 const {p}=fixture();const config={...sourceConfig,initialCapital:100_000_000_000,currency:"VND",dealToFundRate:25_000};
 const r=evaluate(config,p,answers,'invest',2000);
 assert.equal(r.investedFund,50_000_000_000);assert.equal(r.profit,-10_000_000_000);
 assert.equal(r.finalCapital,90_000_000_000);assert.equal(r.portfolioReturn,-.1);
});
test('Budget cap snaps down to permitted slider steps',()=>{
 const {config,p}=fixture();config.initialCapital=1_450_000;
 const b=investmentBounds(config,p);assert.equal(b.min,1000);assert.equal(b.max,1400);
 assert.throws(()=>evaluate(config,p,answers,'invest',1500));
 config.initialCapital=999_999;assert.equal(investmentBounds(config,p).available,false);
});
test('Reject ignores missing investment configuration, but never missing checklist answers',()=>{
 const a={...answers};delete a.check_01;
 assert.throws(()=>evaluate(sourceConfig,sourceCase,a,'reject',0));
 assert.throws(()=>evaluate(sourceConfig,sourceCase,answers,'reject',100));
 const p=clone(sourceCase);p.checklist=[];assert.throws(()=>evaluate(sourceConfig,p,{},'reject',0));
 const q=clone(sourceCase);q.checklist[0].benchmark=null;assert.throws(()=>evaluate(sourceConfig,q,answers,'reject',0));
});
test('Invalid amount, off-step, over-max, unknown decision, and missing rules fail closed',()=>{
 const {config,p}=fixture();
 for(const amount of [NaN,Infinity,-1,0,900,1050,2100])assert.throws(()=>evaluate(config,p,answers,'invest',amount));
 assert.throws(()=>evaluate(config,p,answers,null,0));
 p.deal.minEquity=null;assert.equal(investmentBounds(config,p).available,false);
});
test('Score bands cover exact boundaries and decimals without rounding',()=>{
 for(const [r,score] of [[.5,100],[.4999,80],[.3,80],[.2999,60],[.16875,60],[.15,60],[.1499,40],[.01,40],[.0099,20],[0,20],[-.15,20],[-.15001,0]])assert.equal(returnScore(sourceConfig,r),score);
});
test('Confirmation is idempotent and persisted results are recomputed',()=>{
 const {config,p}=fixture(),state=initialState(p),store=memory();state.answers={...answers};state.decision='invest';state.amount=1500;
 assert.equal(commitDecision(config,p,state),true);const result=clone(state.result);
 assert.equal(commitDecision(config,p,state),false);assert.equal(JSON.stringify(state.result),JSON.stringify(result));
 assert.equal(saveState(store,config,p,state),'');
 const record=JSON.parse(store.getItem(config.storageKey));record.state.result={finalCapital:999999999};store.setItem(config.storageKey,JSON.stringify(record));
 const restored=loadState(store,config,p);assert.equal(restored.committed,true);assert.equal(restored.result.finalCapital,9_700_000);assert.equal(restored.screen,'report');
});
test('Draft answers, current node and canonical history survive a reload',()=>{
 const {config,p}=fixture(),state=initialState(p),store=memory();
 state.answers={check_01:false};state.screen='dialogue';state.nodeId='topic_1_a';
 state.history=[{choiceId:'ask_topic_1_a',question:'changed text',answer:'changed text'}];
 saveState(store,config,p,state);const restored=loadState(store,config,p);
 assert.equal(restored.answers.check_01,false);assert.equal(restored.nodeId,'topic_1_a');
 assert.equal(restored.history[0].answer,p.dialogue.nodes.find(n=>n.id==='topic_1_a').founderText);
});
test('Corrupt/version-mismatched saves reset; denied storage does not crash',()=>{
 const {config,p}=fixture(),store=memory();store.setItem(config.storageKey,'{broken');
 assert.equal(loadState(store,config,p).committed,false);
 const state=initialState(p);saveState(store,config,p,state);
 const newCase=clone(p);newCase.contentVersion+=1;assert.match(loadState(store,config,newCase).saveNotice,/changed/);
 const denied={getItem:()=>{throw Error()},setItem:()=>{throw Error()},removeItem:()=>{throw Error()}};
 assert.match(loadState(denied,config,p).saveNotice,/unavailable/);
 assert.match(saveState(denied,config,p,state),/could not/);
 resetState(store,config,p);assert.equal(store.getItem(config.storageKey),null);
});

test('Active configuration: all eleven 10–20% slider positions give exact USD allocations',()=>{
 const b=investmentBounds(sourceConfig,sourceCase);
 assert.equal(b.available,true);assert.equal(b.rate,1);
 assert.equal(b.min,1000);assert.equal(b.max,2000);assert.equal(b.step,100);
 for(let percentage=10;percentage<=20;percentage++){
   const r=evaluate(sourceConfig,sourceCase,answers,'invest',percentage*100);
   assert.ok(Math.abs(r.equity-percentage/100)<1e-12);
   assert.equal(r.investedFund,percentage*100_000);
   assert.equal(r.profit,-percentage*20_000);
   assert.equal(r.finalCapital,100_000_000-percentage*20_000);
 }
 const r=evaluate(sourceConfig,sourceCase,answers,'invest',1500);
 assert.equal(r.finalCapital,99_700_000);assert.equal(r.portfolioReturn,-.003);
 assert.throws(()=>evaluate(sourceConfig,sourceCase,answers,'invest',1050));
});
