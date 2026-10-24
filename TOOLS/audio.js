/* DOM/storage adapter. All audio failures are contained here; game never awaits audio. */
(()=>{'use strict';
const api=window.PitchLedger,config=api.audioConfig;
const safely=fn=>{try{return fn();}catch{return undefined;}};
function setup(){
 if(!config||!api.createAudioController||typeof window.Audio!=='function')return;
 const audio=api.createAudioController(config),settings={music:true,effects:true};
 const read=(storage,key)=>safely(()=>JSON.parse(window[storage].getItem(key)));
 const write=(storage,key,value)=>safely(()=>window[storage].setItem(key,JSON.stringify(value)));
 const saved=read('localStorage',config.settingsKey);
 for(const key of Object.keys(settings)){if(typeof saved?.[key]==='boolean')settings[key]=saved[key];audio.setEnabled(key,settings[key]);}
 const resume=read('sessionStorage',config.resumeKey);audio.restore(resume?.times);
 let pending=resume?.confirm===true,pendingBusy=false,activeSlider=null,sliderValue=null,sliderChanged=false;
 const controls=[...document.querySelectorAll('[data-audio-toggle]')];
 function paint(){for(const button of controls){const key=button.dataset.audioToggle;button.textContent=(key==='music'?'Music':'SFX')+': '+(settings[key]?'on':'off');button.setAttribute('aria-pressed',String(settings[key]));}}
 function checkpoint(){write('sessionStorage',config.resumeKey,{times:audio.snapshot(),confirm:pending});}
 function flush(){
  if(!pending||pendingBusy)return;
  if(!settings.effects){pending=false;checkpoint();return;}
  pendingBusy=true;audio.effect('confirm').then(ok=>{pendingBusy=false;if(ok){pending=false;checkpoint();}}).catch(()=>{pendingBusy=false;});
 }
 function unlock(){audio.unlock();flush();}
 function listen(type,fn,capture=false){document.addEventListener(type,e=>safely(()=>fn(e)),capture);}
 function slider(target){return target?.matches?.('#investment-slider')&&!target.disabled?target:null;}
 function startSlider(target){const input=slider(target);if(input&&input!==activeSlider){activeSlider=input;sliderValue=input.value;sliderChanged=false;}}
 function release(){if(sliderChanged)audio.effect('release');activeSlider=null;sliderValue=null;sliderChanged=false;}
 listen('pointerdown',e=>{unlock();startSlider(e.target);},true);
 listen('keydown',e=>{if(!e.repeat&&!e.ctrlKey&&!e.metaKey&&!e.altKey)unlock();startSlider(e.target);},true);
 // Capture the original button before the app replaces the rendered scene.
 listen('click',e=>{
  const button=e.target.closest?.('button,summary');if(!button||button.disabled||button.closest('[inert]'))return;
  unlock();const channel=button.dataset.audioToggle;
  if(channel){settings[channel]=!settings[channel];audio.setEnabled(channel,settings[channel]);paint();write('localStorage',config.settingsKey,settings);if(settings.effects)audio.effect('click');return;}
  if(button.dataset.action==='confirm')return; // Only the app's successful commit emits confirm.
  const back=button.matches('.tutorial-header button,.tutorial-controls button:first-child,dialog [data-action="history"]');
  audio.effect(back?'back':'click');
 },true);
 listen('change',e=>{if(e.target.matches?.('input[data-checklist-id]')&&!e.target.disabled){unlock();audio.effect('click');}});
 listen('input',e=>{const input=slider(e.target);if(!input)return;unlock();if(input!==activeSlider){activeSlider=input;sliderValue=null;}if(input.value!==sliderValue){sliderValue=input.value;sliderChanged=true;audio.effect('tick');}});
 listen('pointerup',release);listen('pointercancel',release);listen('keyup',e=>{if(slider(e.target)&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(e.key))release();});
 listen('focusout',e=>{if(e.target===activeSlider)release();});
 listen('visibilitychange',()=>audio.suspend(document.hidden));
 window.addEventListener('pagehide',()=>safely(()=>{checkpoint();audio.suspend(true);}));
 window.addEventListener('pageshow',()=>safely(()=>audio.suspend(document.hidden)));
 paint();for(const panel of document.querySelectorAll('.audio-controls'))panel.hidden=false;
 api.audioUI=Object.freeze({
  syncScene:({opening,screen})=>safely(()=>audio.setScene(opening?'start':screen==='report'?'result':'gameplay')),
  confirmed:(nextPage=false)=>safely(()=>{if(nextPage){pending=true;checkpoint();}else{audio.unlock();audio.effect('confirm');}})
 });
 // Returning from a case navigation: try permitted autoplay; a blocked attempt retries on interaction.
 if(resume)unlock();
}
safely(setup);
})();
