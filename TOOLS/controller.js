/* Playback service: no DOM, storage, case data, navigation or game state access. */
(()=>{'use strict';
function createAudioController(config,env={}){
 const create=env.createAudio||(src=>new window.Audio(src));
 const now=env.now||(()=>Date.now()),every=env.every||((fn,ms)=>window.setInterval(fn,ms)),cancel=env.cancel||(id=>window.clearInterval(id));
 const music=new Map(),effects=new Map();
 let desired='start',unlocked=false,suspended=false,disposed=false,timer=null,generation=0,lastTick=-Infinity;
 const enabled={music:true,effects:true},offsets={};
 function stopTimer(){if(timer!==null){cancel(timer);timer=null;}}
 function player(cache,key,src,loop){
  if(cache.has(key))return cache.get(key);
  try{const audio=create(src);audio.loop=loop;audio.preload='none';audio.volume=0;
   audio.addEventListener('error',()=>{try{audio.pause();}catch{}});
   cache.set(key,audio);return audio;
  }catch{return null;}
 }
 function pause(audio){try{audio.pause();}catch{}}
 function play(audio){try{return Promise.resolve(audio.play()).then(()=>true,()=>false);}catch{return Promise.resolve(false);}}
 function reconcile(){
  if(disposed)return;
  const token=++generation;stopTimer();
  if(!unlocked||suspended||!enabled.music){for(const a of music.values())pause(a);return;}
  const target=player(music,desired,config.music[desired],true);if(!target)return;
  const seek=()=>{const value=offsets[desired];if(Number.isFinite(value)&&value>=0){try{target.currentTime=Number.isFinite(target.duration)&&target.duration>0?value%target.duration:value;delete offsets[desired];}catch{}}};
  seek();
  play(target).then(ok=>{
   if(disposed)return;
   if(token!==generation){if(music.get(desired)!==target||suspended||!enabled.music)pause(target);return;}
   if(!ok){for(const a of music.values())pause(a);return;}
   seek();const begin=now(),starts=new Map([...music].map(([key,a])=>[key,a.volume]));
   const fade=()=>{
    const progress=Math.min(1,(now()-begin)/Math.max(1,config.fadeMs));
    for(const [key,a] of music){const end=a===target?config.musicVolume:0;a.volume=Math.max(0,Math.min(1,starts.get(key)+(end-starts.get(key))*progress));if(progress===1&&a!==target)pause(a);}
    if(progress===1)stopTimer();
   };timer=every(fade,30);fade();
  });
 }
 function setScene(scene){if(!config.music[scene]||desired===scene)return;desired=scene;reconcile();}
 function unlock(){if(disposed)return;unlocked=true;const a=music.get(desired);if(!a||a.paused)reconcile();}
 function setEnabled(channel,value){if(!(channel in enabled))return;enabled[channel]=!!value;if(channel==='music')reconcile();else if(!value)for(const a of effects.values())pause(a);}
 function effect(key){
  if(disposed||!unlocked||suspended||!enabled.effects||!config.effects[key])return Promise.resolve(false);
  if(key==='tick'){if(now()-lastTick<config.sliderIntervalMs)return Promise.resolve(false);lastTick=now();}
  const a=player(effects,key,config.effects[key],false);if(!a)return Promise.resolve(false);
  try{a.currentTime=0;a.volume=config.effectsVolume;}catch{return Promise.resolve(false);}
  return play(a);
 }
 function suspend(value){suspended=!!value;if(suspended)for(const a of effects.values())pause(a);reconcile();}
 function restore(snapshot){if(!snapshot||typeof snapshot!=='object')return;for(const key of Object.keys(config.music)){const t=snapshot[key];if(Number.isFinite(t)&&t>=0)offsets[key]=t;}}
 function snapshot(){const times={...offsets};for(const [key,a] of music)if(Number.isFinite(a.currentTime))times[key]=a.currentTime;return times;}
 function dispose(){disposed=true;generation++;stopTimer();for(const a of [...music.values(),...effects.values()])pause(a);}
 return Object.freeze({setScene,unlock,setEnabled,effect,suspend,restore,snapshot,dispose});
}
window.PitchLedger.createAudioController=createAudioController;
})();
