/* Presentation only. Case data, save format, gates and finance engines stay unchanged. */
(()=>{
'use strict';
const api=window.PitchLedger;
const {element:el,button:btn,prose,money,narrative,workspaceRenderers,refreshDecision}=api;
const {config,caseData:p,presentation}=api.session,scene=presentation.scene||{};
let cleanup=()=>{},finishText=()=>false;
let notesOpen=!window.matchMedia('(max-width: 1000px)').matches;
const cash=value=>money(value,config.currency).replace(/^USD /,'$ ');
function portrait(expression='idle'){
 const art=api.artDirection[p.id],frame=art[expression]||art.idle;
 const box=el('span',null,'founder-portrait');box.setAttribute('role','img');box.setAttribute('aria-label',p.name+' founder illustration');
 box.style.aspectRatio=frame.frameWidth+'/'+frame.height;
 box.style.backgroundImage='url("'+frame.file+'")';
 box.style.backgroundSize=(frame.width/frame.frameWidth*100)+'% 100%';
 box.style.backgroundPosition=(frame.width===frame.frameWidth?0:frame.x/(frame.width-frame.frameWidth)*100)+'% 0';
 return box;
}
function sidebar(state){
 const aside=el('aside',null,'case-sidebar'),card=el('section',null,'identity-card');
 const label=el('div',null,'identity-label');label.append(el('p','Case '+String(api.campaign.caseOrder.indexOf(p.id)+1).padStart(2,'0'),'case-number'),el('h1',p.name));
 const avatar=el('span',null,'founder-avatar');avatar.append(portrait('idle'));card.append(avatar,label);aside.append(card);
 const facts=el('dl',null,'fund-facts');
 for(const [label,value,kind] of [['The Ask',money(p.deal.referenceInvestment*p.deal.unit,p.deal.currency).replace(/^USD /,'$'),'ask'],['Equity Offered',(p.deal.referenceEquity*100).toLocaleString('en-US')+'%','equity']]){
  const row=el('div',null,'fact fact-'+kind);row.append(el('dt',label),el('dd',value));facts.append(row);
 }
 aside.append(facts);
 const notes=el('details',null,'notes-panel');notes.open=notesOpen;notes.addEventListener('toggle',()=>{notesOpen=notes.open;});notes.append(el('summary','Your Notes'));
 const labelNote=el('label','Your notes');labelNote.htmlFor='analyst-notes';labelNote.className='visually-hidden';const area=el('textarea');area.id='analyst-notes';area.maxLength=5000;area.value=state.notes;area.placeholder='Type your notes here';notes.append(labelNote,area);aside.append(notes);
 return aside;
}
function transcript(state){
 const modal=el('dialog',null,'transcript');modal.setAttribute('aria-labelledby','transcript-title');
 const header=el('header'),title=el('h2','Chat history');title.id='transcript-title';header.append(title,btn('Close ×','history'));modal.append(header);
 const body=el('div',null,'transcript-body');
 function turn(speaker,text){const row=el('section',null,'history-turn '+(speaker==='You'?'player-turn':'founder-turn'));row.append(el('p',speaker+':','history-speaker'),prose(text));body.append(row);}
 if(state.screen==='pitch'){
  narrative.pitchLines(p,scene).slice(0,state.pitchIndex+1).forEach(line=>turn(p.founderName||'Founder',line.text));
 }else{
  if(!state.history.length)body.append(el('p','Your questions and the founder’s answers will appear here.','empty-history'));
  for(const h of state.history){turn('You',h.question);turn(p.founderName||'Founder',h.answer);}
 }
 modal.append(body);modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
 return modal;
}
function stage(state,expression){
 const box=el('div',null,'stage '+(state.screen==='dialogue'?'qna-stage':'pitch-stage'));
 const img=el('img');img.src=api.artDirection[p.id].background;img.alt='';img.className='room-background';box.append(img);
 const figure=portrait(expression||'confident');figure.className+=' stage-founder';box.append(figure);return box;
}
function renderScene(state){
 const layout=el('section',null,'case-layout scene-layout');layout.append(sidebar(state));
 const main=el('section',null,'meeting');main.setAttribute('aria-label','Founder conversation');
 let lines,index,node;
 if(state.screen==='home'){lines=[{text:p.homeMessage}];index=0;}
 else if(state.screen==='pitch'){lines=narrative.pitchLines(p,scene);index=state.pitchIndex;}
 else{lines=narrative.dialogueLines(p,state.nodeId,scene);index=state.dialogueIndex;node=p.dialogue.nodes.find(n=>n.id===state.nodeId);}
 const line=lines[index]||lines[0],last=index===lines.length-1;
 main.append(stage(state,line.expression));
 const box=el('div',null,'dialogue-box'),text=el('p',null,'dialogue-text');text.setAttribute('aria-label',line.text);const visible=el('span',line.text);visible.setAttribute('aria-hidden','true');text.append(visible);box.append(text);
 const controls=el('div',null,'dialogue-controls');const history=btn('Chat history','history');history.className='scene-history';controls.append(history);controls.append(el('span',`${index+1} / ${lines.length}`,'line-counter'));
 let audio;
 if(line.voice){const voice=btn('▶ Play voice','voice');audio=new Audio(line.voice);voice.addEventListener('click',async()=>{try{if(audio.paused){await audio.play();voice.textContent='Ⅱ Pause voice';}else{audio.pause();voice.textContent='▶ Play voice';}}catch{voice.textContent='Voice unavailable';voice.disabled=true;}});audio.addEventListener('ended',()=>voice.textContent='▶ Play voice');controls.append(voice);}
 let advance;
 if(state.screen==='home')advance=btn('Hear the pitch →','begin-pitch');
 else if(state.screen==='pitch')advance=btn(last?'Check out documents →':'Continue →','next-line');
 else advance=btn(last?'Show full line':'Continue →',last?'reveal':'next-line');
 advance.className='primary dialogue-next';controls.append(advance);box.append(controls);main.append(box);
 if(state.screen==='dialogue'&&last){
  const options=el('section',null,'conversation-options');options.setAttribute('aria-label',node.speaker==='system'?'Choose a topic':'Your response');
  const list=el('div',null,'choice-list');node.choices.forEach((c,i)=>{const b=btn(String.fromCharCode(65+i)+'. '+c.text,'choice',c.id);list.append(b);});options.append(list);
  const footer=el('div',null,'conversation-end');const decide=btn('Make a decision →','finish-qna');footer.append(decide);options.append(footer);main.append(options);
 }
 layout.append(main);const log=transcript(state);layout.append(log);
 let timer,at=0,finished=false;
 const endText=()=>{if(finished)return false;finished=true;clearInterval(timer);visible.textContent=line.text;if(state.screen==='dialogue'&&last)advance.hidden=true;return true;};
 const start=()=>{if(state.instantText||window.matchMedia('(prefers-reduced-motion: reduce)').matches){endText();return;}visible.textContent='';timer=setInterval(()=>{at+=2;visible.textContent=line.text.slice(0,at);if(at>=line.text.length)endText();},16);};
 finishText=endText;cleanup=()=>{clearInterval(timer);audio?.pause();if(log.open)log.close();};return {element:layout,start};
}
function reportView(){return api.renderFinalReport();}
function renderWorkspace(state){
 if(state.screen==='report')return reportView();
 const layout=el('section',null,'case-layout workspace');layout.append(sidebar(state));
 const main=workspaceRenderers[state.screen](p,state);
 if(state.screen==='documents'){
  const footer=el('footer',null,'document-next'),go=btn('Talk to the founder →','finish-investigation');go.className='primary';go.disabled=false;
  footer.append(el('p','Explore the case in any order, or go directly to Decision.','note'),go);main.append(footer);
 }
 layout.append(main);return layout;
}
function renderScreen(container,caseData,state){
 cleanup();cleanup=()=>{};finishText=()=>false;
 if(['home','pitch','dialogue'].includes(state.screen)){const r=renderScene(state);container.replaceChildren(r.element);r.start();}
 else{container.replaceChildren(renderWorkspace(state));if(state.screen==='decision')refreshDecision(p,state);}
}
api.renderScreen=renderScreen;api.revealLine=()=>finishText();api.toggleHistory=()=>{const log=document.querySelector('.transcript');if(log){if(log.open)log.close();else log.showModal();}};
})();
