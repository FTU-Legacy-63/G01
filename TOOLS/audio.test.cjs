/* Deterministic service + DOM-event adapter tests. These do not emulate browser audio codecs. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const settle=async()=>{for(let i=0;i<8;i++)await Promise.resolve();};
function setup(options={}){
 const players=[],timers=new Map(),events={},wevents={};let time=0,timerId=0,blocked=!!options.blocked;
 const local=new Map(),session=new Map();if(options.resume)session.set('pitch-ledger:audio-resume:v1',JSON.stringify(options.resume));
 class Audio{
  constructor(src){if(options.unavailable)throw Error('No device');this.src=src;this.currentTime=0;this.duration=96;this.paused=true;this.plays=0;this.volume=0;players.push(this);}
  addEventListener(){} pause(){this.paused=true;}
  play(){this.plays++;if(blocked)return Promise.reject(Error('NotAllowedError'));this.paused=false;return Promise.resolve();}
 }
 const store=map=>({getItem:k=>{if(options.storageFails)throw Error('blocked storage');return map.get(k)||null;},setItem:(k,v)=>{if(options.storageFails)throw Error('quota');map.set(k,v);}});
 const controls=['music','effects'].flatMap(key=>[1,2].map(()=>({dataset:{audioToggle:key},setAttribute(k,v){this[k]=v;}})));
 const panel={hidden:true};
 const document={hidden:false,querySelectorAll:s=>s==='[data-audio-toggle]'?controls:s==='.audio-controls'?[panel]:[],addEventListener:(type,fn)=>{(events[type]??=[]).push(fn);}};
 const window={PitchLedger:{},Audio,localStorage:store(local),sessionStorage:store(session),setInterval:(fn)=>{timers.set(++timerId,fn);return timerId;},clearInterval:id=>timers.delete(id),addEventListener:(type,fn)=>{(wevents[type]??=[]).push(fn);}};
 const context=vm.createContext({window,document,Date:{now:()=>time}});
 const run=file=>vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
 run('game/audio-config.js');run('audio/controller.js');
 const api=window.PitchLedger,controller=api.createAudioController(api.audioConfig);
 return {api,controller,players,events,wevents,document,local,session,controls,panel,run,timers,
  setBlocked:value=>blocked=value,step:ms=>{time+=ms;for(const fn of [...timers.values()])fn();},
  fire:(type,target={},extra={})=>{for(const fn of events[type]||[])fn({target,...extra});}};
}
const find=(s,name)=>s.players.find(a=>a.src.includes(name));
test('BGM waits for interaction; same gameplay scene does not restart or create another player',async()=>{
 const s=setup();s.controller.setScene('gameplay');assert.equal(s.players.length,0);s.controller.unlock();await settle();s.step(800);
 const a=find(s,'gameplay');assert.ok(a.loop);assert.equal(a.volume,.7);a.currentTime=24;
 s.controller.setScene('gameplay');s.controller.unlock();await settle();assert.equal(a.plays,1);assert.equal(a.currentTime,24);assert.equal(s.players.length,1);
});
test('crossfade and rapid scene changes settle on the latest scene only',async()=>{
 const s=setup();s.controller.unlock();await settle();s.step(800);
 s.controller.setScene('gameplay');s.controller.setScene('result');await settle();s.step(800);
 assert.equal(find(s,'result').paused,false);assert.equal(find(s,'start_screen').paused,true);assert.equal(find(s,'gameplay').paused,true);assert.equal(s.timers.size,0);
});
test('music/SFX mutes are independent; hidden page stops all audio and restores only music',async()=>{
 const s=setup();s.controller.unlock();await settle();s.step(800);s.controller.setEnabled('music',false);
 assert.equal(find(s,'start_screen').paused,true);assert.equal(await s.controller.effect('click'),true);
 s.controller.setEnabled('effects',false);assert.equal(find(s,'button_click').paused,true);assert.equal(await s.controller.effect('confirm'),false);
 s.controller.setEnabled('music',true);await settle();s.step(800);s.controller.suspend(true);assert.ok(s.players.every(a=>a.paused));s.controller.suspend(false);await settle();s.step(800);assert.equal(find(s,'start_screen').paused,false);assert.equal(find(s,'button_click').paused,true);
});
test('blocked autoplay retries on the next interaction; unavailable device fails without throwing',async()=>{
 const s=setup({blocked:true});s.controller.unlock();await settle();assert.ok(s.players.every(a=>a.paused));
 s.setBlocked(false);s.controller.unlock();await settle();s.step(800);assert.equal(find(s,'start_screen').paused,false);
 const broken=setup({unavailable:true});assert.doesNotThrow(()=>broken.controller.unlock());assert.equal(await broken.controller.effect('click'),false);
});
test('slider tick throttle and bounded voice reuse prevent overlapping floods',async()=>{
 const s=setup();s.controller.unlock();for(let i=0;i<30;i++)await s.controller.effect('tick');
 assert.equal(find(s,'slider_tick').plays,1);s.step(81);await s.controller.effect('tick');assert.equal(find(s,'slider_tick').plays,2);assert.equal(s.players.filter(a=>a.src.includes('slider_tick')).length,1);
});
test('position checkpoint restores without touching game saves; dispose stops timers and playback',async()=>{
 const s=setup();s.controller.restore({gameplay:42,start:-9,result:'bad'});s.controller.setScene('gameplay');s.controller.unlock();await settle();s.step(800);assert.equal(find(s,'gameplay').currentTime,42);assert.equal(s.controller.snapshot().gameplay,42);
 s.controller.setScene('result');await settle();s.controller.dispose();assert.equal(s.timers.size,0);assert.ok(s.players.every(a=>a.paused));assert.equal(await s.controller.effect('click'),false);
});
function target(kind,extra={}){return {disabled:false,dataset:{},value:'1',matches:selector=>kind==='slider'?selector==='#investment-slider':kind==='radio'?selector==='input[data-checklist-id]':false,closest:selector=>selector==='button,summary'?target('button',extra):null,...extra};}
test('UI emits no generic click for Confirm; carries successful confirmation exactly once to next page',async()=>{
 const s=setup();s.run('ui/audio.js');s.fire('click',target('button',{dataset:{action:'confirm'}}));await settle();assert.equal(find(s,'button_confirm'),undefined);assert.equal(find(s,'button_click'),undefined);
 s.api.audioUI.confirmed(true);const resume=JSON.parse(s.session.get(s.api.audioConfig.resumeKey));assert.equal(resume.confirm,true);
 const next=setup({resume,blocked:true});next.run('ui/audio.js');next.api.audioUI.syncScene({opening:false,screen:'home'});await settle();assert.equal(JSON.parse(next.session.get(next.api.audioConfig.resumeKey)).confirm,true);
 next.setBlocked(false);next.fire('pointerdown');await settle();assert.equal(JSON.parse(next.session.get(next.api.audioConfig.resumeKey)).confirm,false);const count=find(next,'button_confirm').plays;next.fire('pointerdown');await settle();assert.equal(find(next,'button_confirm').plays,count);
});
test('UI slider mouse/keyboard emits only changed ticks and one release per gesture',async()=>{
 const s=setup();s.run('ui/audio.js');const input=target('slider');s.fire('pointerdown',input);s.fire('input',input);assert.equal(find(s,'slider_tick'),undefined);
 input.value='2';s.fire('input',input);s.fire('input',input);s.fire('pointerup',input);s.fire('change',input);s.fire('keyup',input,{key:'ArrowRight'});await settle();assert.equal(find(s,'slider_tick').plays,1);assert.equal(find(s,'slider_release').plays,1);
 s.step(100);s.fire('keydown',input,{key:'ArrowRight'});input.value='3';s.fire('input',input);s.fire('keyup',input,{key:'ArrowRight'});assert.equal(find(s,'slider_tick').plays,2);assert.equal(find(s,'slider_release').plays,2);
});
test('UI survives blocked storage, keeps controls in sync and maps opening/game/report correctly',async()=>{
 const s=setup({storageFails:true});s.run('ui/audio.js');assert.ok(s.api.audioUI);assert.equal(s.panel.hidden,false);
 s.api.audioUI.syncScene({opening:true,screen:'report'});s.fire('pointerdown');await settle();s.step(800);assert.equal(find(s,'start_screen').paused,false);
 s.fire('click',target('button',{dataset:{audioToggle:'music'}}));assert.ok(s.controls.filter(b=>b.dataset.audioToggle==='music').every(b=>b['aria-pressed']==='false'));s.api.audioUI.syncScene({opening:false,screen:'report'});await settle();assert.ok(s.players.filter(a=>a.loop).every(a=>a.paused));
 s.fire('click',target('button',{dataset:{audioToggle:'music'}}));await settle();s.step(800);assert.equal(find(s,'result_screen').paused,false);
});
test('pack references only shipped assets and keeps all audio code outside core/cases',()=>{
 const s=setup();for(const file of [...Object.values(s.api.audioConfig.music),...Object.values(s.api.audioConfig.effects)])assert.ok(fs.existsSync(path.join(root,file)));
 for(const folder of ['core','cases']){const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).forEach(e=>{const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.js'))assert.doesNotMatch(fs.readFileSync(f,'utf8'),/audioUI|createAudioController/);});walk(path.join(root,folder));}
});
