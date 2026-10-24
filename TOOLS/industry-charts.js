/* Renderer only. All authored content lives in industry-chart-data.js and comes
   from industry_data_c1/c2/c3. Terminal market columns are CAGR calculations. */
(()=>{
'use strict';
const api=window.PitchLedger,{element:el}=api;
const number=n=>n.toLocaleString('en-US',{maximumFractionDigits:2});
function scale(d){
 const card=el('figure',null,'industry-chart'),title=el('figcaption',d.name+(d.unit==='%'?' (%)':''));card.dataset.metric=d.name;card.dataset.labelLayout=d.labelLayout||'default';card.append(title);
 const shell=el('div',null,'industry-scale-scroll'),plot=el('div',null,'industry-scale-plot');shell.append(plot);
 const lo=Math.min(...d.values),hi=Math.max(...d.values),pos=v=>(v-lo)/(hi-lo)*100;
 const track=el('div',null,'industry-gradient');track.style.background='linear-gradient(90deg,'+d.colors.join(',')+')';
 track.setAttribute('role','img');track.setAttribute('aria-label',d.name+': '+d.values.map((v,i)=>(i===d.values.length-1&&d.end?d.end:number(v)+d.unit)+' '+d.labels[i]).join('; '));
 for(let i=1;i<10;i++){const tick=el('i',null,'industry-tick');tick.style.left=i*10+'%';track.append(tick);}
 const top=el('div',null,'industry-end-labels');top.append(el('span',d.labels[0]),el('span',d.labels.at(-1)));plot.append(top,track);
 const below=el('div',null,'industry-point-labels');
 d.values.forEach((v,i)=>{
  const label=d.labels[i],point=el('div',null,'industry-point-label');point.style.left=pos(v)+'%';
  point.className+=i===0?' first':i===d.values.length-1?' last':'';
  point.append(el('strong',i===d.values.length-1&&d.end?d.end:number(v)+d.unit));
  // Endpoint categories appear above; interior categories sit below their dots.
  if(i>0&&i<d.values.length-1)point.append(el('span',label));below.append(point);
  if(i>0&&i<d.values.length-1){const marker=el('span',null,'industry-marker');marker.style.left=pos(v)+'%';marker.style.background=label.includes('Comparable')?'#f5b431':label.includes('Benchmark')?(v<0||d.name==='DEBT / ASSETS'?'#8c0f0f':'#005b87'):'#101f26';marker.title=label+': '+v+d.unit;track.append(marker);}
 });plot.append(below);card.append(shell);return card;
}
function marketChart(d){
 const f=el('figure',null,'market-chart');f.append(el('figcaption','MARKET SIZE'));
 const terminal=d.current*Math.pow(1+d.cagr,d.years),bars=el('div',null,'market-bars');
 const arrow=el('div','Projected CAGR '+number(d.cagr*100)+'%','market-growth-arrow');bars.append(arrow);
 for(const [value,label] of [[d.current,'Current'],[terminal,'In '+d.years+' years (E)']]){
  const col=el('div',null,'market-column'),bar=el('div',null,'market-bar');bar.style.height=(value/terminal*180)+'px';col.append(el('strong','$'+number(value)+' Billion'),bar,el('span',label));bars.append(col);
 }
 f.append(bars,el('p','(E) calculated from the stated CAGR: '+number(d.current)+' × (1 + '+number(d.cagr*100)+'%)^'+d.years+'.','market-calculation'));return f;
}
function renderIndustryBriefing(p){
 const d=api.industryChartBriefings[p.id],out=el('article',null,'industry-briefing');out.append(el('h2','Industry overview'),el('p',d.title,'briefing-title'));
 const meta=el('dl',null,'briefing-meta');for(const [key,value] of d.meta)meta.append(el('dt',key),el('dd',value.trim()));out.append(meta);
 for(const text of d.intro)out.append(el('p',text));out.append(el('h3',d.marketHeading));for(const text of d.marketText)out.append(el('p',text));out.append(marketChart(d));
 if(d.creators){const c=el('section',null,'creator-growth-chart');c.append(el('h4','GLOBAL CREATOR POPULATION'),el('p','≈'+d.creators+' million creators'));c.append(scale({name:'ANNUAL CREATOR GROWTH',unit:'%',values:d.creatorGrowth,labels:['10% annually','20% annually'],colors:['#a9d7f0','#13603d']}));out.append(c);}
 out.append(el('h3',d.economicsHeading));for(const text of d.economicsText)out.append(el('p',text));const grid=el('div',null,'industry-chart-grid');d.metrics.forEach(m=>grid.append(scale(m)));out.append(grid);
 if(d.valuation){out.append(el('h3','3. Industry Valuation'),el('p',d.valuationText),scale(d.valuation));}
 return out;
}
api.renderIndustryBriefing=renderIndustryBriefing;
})();
