/* Mandatory slideshow before Case 1. Only the last slide can finish. */
(()=>{
'use strict';
const a=window.PitchLedger;
const slides=['1.1','1.2','1.3','2','3.1','3.2','4.1','4.2','4.3','4.4'].map(n=>({id:n,src:'./assets/tutorial/Tutorial '+n+'.png'}));
function setupTutorial(onFinish){
 const {element:el}=a,overlay=document.querySelector('#opening-overlay'),letter=document.querySelector('.opening-letter'),offer=document.querySelector('#open-tutorial');
 const panel=el('section',null,'tutorial-panel');panel.hidden=true;panel.setAttribute('aria-label','Game tutorial');
 const header=el('header',null,'tutorial-header'),title=el('h2','Tutorial'),back=el('button','Back to briefing');back.type='button';header.append(title,back);
 const stage=el('div',null,'tutorial-stage'),img=el('img');img.draggable=false;stage.append(img);
 const cover=el('span',null,'tutorial-button-cover');cover.setAttribute('aria-hidden','true');stage.append(cover);
 const footer=el('footer',null,'tutorial-controls'),previous=el('button','← Previous'),counter=el('span'),next=el('button','Next →');
 for(const b of [previous,next])b.type='button';counter.setAttribute('role','status');next.className='primary';footer.append(previous,counter,next);
 const hint=el('p','Use Previous / Next or the arrow keys. These supplied slides are illustrative; live game values come from the case data.','tutorial-hint');panel.append(header,stage,footer,hint);overlay.append(panel);
 let index=0;
 function render(){const slide=slides[index];img.src=slide.src;img.alt='Tutorial '+slide.id+' — slide '+(index+1)+' of '+slides.length;counter.textContent=(index+1)+' / '+slides.length;previous.disabled=index===0;next.textContent=index===slides.length-1?'Start game →':'Next →';cover.hidden=index!==slides.length-1;}
 function finish(){if(index!==slides.length-1)return;panel.hidden=true;letter.hidden=false;onFinish();}
 function close(){panel.hidden=true;letter.hidden=false;offer.focus();}
 function advance(){if(index===slides.length-1)finish();else{index++;render();}}
 offer.addEventListener('click',()=>{index=0;letter.hidden=true;panel.hidden=false;render();next.focus();});
 previous.addEventListener('click',()=>{if(index>0){index--;render();}});next.addEventListener('click',advance);back.addEventListener('click',close);
 panel.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();advance();}else if(e.key==='ArrowLeft'){e.preventDefault();if(index>0){index--;render();}}else if(e.key==='Escape'){e.preventDefault();close();}});
 render();return {panel,slides};
}
Object.assign(a,{tutorialSlides:slides,setupTutorial});
})();
