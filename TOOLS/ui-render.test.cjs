/* Dependency-free renderer checks. This small DOM adapter is NOT a browser/layout test. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
class Element{
 constructor(tag){this.tagName=tag;this.nodeType=1;this.children=[];this.dataset={};this.style={setProperty(k,v){this[k]=v;}};this.attributes={};this._text='';this.hidden=false;this.disabled=false;}
 set textContent(v){this._text=String(v);this.children=[];}
 get textContent(){return this._text+this.children.map(x=>x.textContent).join(' ');}
 append(...nodes){this.children.push(...nodes);}
 prepend(...nodes){this.children.unshift(...nodes);}
 replaceChildren(...nodes){this.children=[];this._text='';this.append(...nodes);}
 setAttribute(k,v){this.attributes[k]=String(v);}
 addEventListener(type,fn){(this.listeners??={})[type]=fn;}
 click(){if(!this.disabled)this.listeners?.click?.({target:this});}
 focus(){}
 showModal(){this.open=true;}
 close(){this.open=false;}
 querySelector(s){return this.querySelectorAll(s)[0]||null;}
 querySelectorAll(s){const found=[];const match=n=>s.startsWith('#')?n.id===s.slice(1):s.startsWith('.')?(n.className||'').split(' ').includes(s.slice(1)):s.startsWith('[data-action=')?n.dataset.action===s.match(/"([^"]+)"/)[1]:n.tagName===s;function walk(n){for(const c of n.children){if(match(c))found.push(c);walk(c);}}walk(this);return found;}
}
function setup(id){
 const document=new Element('document');document.createElement=t=>new Element(t);
 const context=vm.createContext({window:{matchMedia:()=>({matches:true})},document,clearInterval,setInterval});
 const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
 for(const f of ['game/config.js','core/registry.js','cases/plantfish/case.js','cases/plantfish/scenes.js','cases/creoexchange/case.js','cases/clinova/case.js','game/campaign.js','core/narrative.js','core/engine.js','core/campaign-ledger.js','core/report-engine.js','core/flow.js','core/state.js'])run(f);
 const a=context.window.PitchLedger,p=a.getCase(id);a.campaignState=a.freshCampaignState();a.session={caseData:p.data,presentation:p.presentation||{},config:{...a.config,availableCapital:a.config.initialCapital}};
 for(const cid of a.listCases())run('cases/'+cid+'/presentation.js');run('ui/screens.js');run('ui/industry-chart-data.js');run('ui/industry-charts.js');run('ui/art-direction.js');run('ui/final-report.js');run('ui/tutorial.js');run('ui/scenes.js');return {a,p:p.data,document,render:s=>a.renderScreen(document,p.data,s)};
}
for(const id of ['plantfish','creoexchange','clinova'])test(id+': real renderers preserve documents, every dialogue node, decision gates and report data',()=>{
 const {a,p,document:d,render}=setup(id),s=a.initialState(p);s.instantText=true;
 render(s);assert.ok(d.textContent.includes(p.homeMessage));assert.ok(d.querySelector('[data-action="begin-pitch"]'));
 s.screen='pitch';const lines=a.narrative.pitchLines(p,a.session.presentation.scene||{});s.pitchIndex=lines.length-1;render(s);assert.ok(d.textContent.includes(lines.at(-1).text));
 a.toggleHistory();assert.equal(d.querySelector('dialog').open,true);a.toggleHistory();assert.equal(d.querySelector('dialog').open,false);
 s.screen='documents';render(s);assert.equal(d.querySelectorAll('table').length,0);assert.ok(d.querySelector('.industry-gradient'));assert.equal(d.querySelector('[data-action="finish-investigation"]').disabled,false);
 for(const tab of a.flow.documentTabs){a.flow.visitDocument(s,tab);render(s);assert.ok(d.querySelector('.documents'));if(tab==='company'){assert.doesNotMatch(d.textContent,/NaN|undefined/);if(p.fundingReference?.total)assert.match(d.textContent,/Total 100%/);}}
 assert.equal(d.querySelector('[data-action="finish-investigation"]').disabled,false);assert.equal(d.querySelectorAll('caption').length,3);
 s.screen='dialogue';for(const node of p.dialogue.nodes){s.nodeId=node.id;const lines=a.narrative.dialogueLines(p,node.id,a.session.presentation.scene||{});s.dialogueIndex=lines.length-1;render(s);assert.equal(d.querySelectorAll('[data-action="choice"]').length,node.choices.length);assert.ok(d.textContent.includes(lines.at(-1).text));assert.ok(d.querySelector('[data-action="finish-qna"]'));assert.equal(d.querySelector('.dialogue-box').querySelectorAll('[data-action="history"]').length,1);}
 s.history=[{question:'Test question',answer:'Test answer'}];render(s);assert.match(d.querySelector('dialog').textContent,/Test question.*Test answer/);
 s.screen='decision';render(s);assert.equal(d.querySelectorAll('input').filter(n=>n.type==='radio').length,p.checklist.length*2);assert.equal(d.querySelector('[data-action="confirm"]').disabled,true);
 s.answers=Object.fromEntries(p.checklist.map(x=>[x.id,x.benchmark]));s.decision='invest';s.amount=a.investmentBounds(a.session.config,p).min;s.qnaComplete=true;render(s);assert.equal(d.querySelector('[data-action="confirm"]').disabled,false);assert.ok(!d.querySelector('#investment-slider').disabled);
 s.decision='reject';s.amount=0;render(s);assert.equal(d.querySelector('#investment-slider').disabled,true);assert.match(d.querySelector('#allocation-summary').textContent,/\$0/);
 a.commitDecision(a.session.config,p,s);render(s);assert.equal(d.querySelector('[data-action="confirm"]').disabled,true);assert.ok(d.querySelectorAll('input').filter(n=>n.type==='radio').every(n=>n.disabled));
 for(const cid of a.campaign.caseOrder){const c=a.getCase(cid).data;a.campaignState.completed[cid]={answers:Object.fromEntries(c.checklist.map(x=>[x.id,x.benchmark])),decision:'reject',amount:0};}
 s.screen='report';render(s);assert.ok(d.querySelector('.investment-report'));assert.equal(d.querySelectorAll('.case-report-card').length,0);assert.doesNotMatch(d.textContent,/NaN|undefined/);const buttons=d.querySelectorAll('[data-action="report-case"]');assert.equal(buttons.length,3);buttons.forEach((b,i)=>{b.click();assert.equal(d.querySelectorAll('.case-report-card').length,1);assert.equal(d.querySelector('.case-report-card').id,'case-detail-'+a.campaign.caseOrder[i]);});assert.ok(d.querySelector('[data-action="reset-campaign"]'));
});

test('performance fish follows all five engine classifications; slider fill uses bounds',()=>{
 const {a,p,document:d,render}=setup('plantfish');
 for(const [score,fish] of [[100,'Shark'],[85,'Shark'],[84,'Tuna'],[70,'Tuna'],[69,'Clownfish'],[50,'Clownfish'],[49,'Pufferfish'],[30,'Pufferfish'],[29,'Minnow'],[0,'Minnow']])assert.equal(a.reportCategoryImage(a.classification(score)),'./assets/performance-category-illustrations/'+fish+'.png');
 const s=a.initialState(p);s.screen='decision';s.decision='invest';const b=a.investmentBounds(a.session.config,p);
 for(const [amount,fill] of [[b.min,'0%'],[(b.min+b.max)/2,'50%'],[b.max,'100%']]){s.amount=amount;render(s);assert.equal(d.querySelector('#investment-slider').style['--slider-fill'],fill);}
 s.decision='reject';s.amount=0;render(s);assert.equal(d.querySelector('#investment-slider').style['--slider-fill'],'0%');
});
test('tutorial uses all ten slides in order and cannot mutate the campaign',()=>{
 const {a,document:d}=setup('plantfish'),overlay=new Element('section'),letter=new Element('article'),offer=new Element('button');
 overlay.id='opening-overlay';letter.className='opening-letter';offer.id='open-tutorial';letter.append(offer);overlay.append(letter);d.append(overlay);
 const before=JSON.stringify(a.campaignState);let finished=0;const {panel,slides}=a.setupTutorial(()=>finished++);
 assert.equal(slides.map(s=>s.id).join(','),'1.1,1.2,1.3,2,3.1,3.2,4.1,4.2,4.3,4.4');
 const controls=panel.querySelectorAll('button'),previous=controls[1],next=controls[2];
 offer.click();assert.equal(panel.hidden,false);assert.equal(letter.hidden,true);assert.equal(previous.disabled,true);
 next.click();assert.match(panel.querySelector('img').src,/1.2.png$/);previous.click();assert.match(panel.querySelector('img').src,/1.1.png$/);
 for(let i=0;i<9;i++)next.click();assert.equal(next.textContent,'Start game →');next.click();assert.equal(finished,1);assert.equal(panel.hidden,true);
 offer.click();assert.equal(finished,1);assert.equal(controls.length,3);assert.ok(panel.querySelector('.tutorial-button-cover'));
 offer.click();controls[0].click();assert.equal(letter.hidden,false);assert.equal(finished,1);
 assert.equal(JSON.stringify(a.campaignState),before);
 for(const slide of slides)assert.ok(fs.existsSync(path.join(root,slide.src)));
});
