/* Optional real-browser test. npm install --no-save playwright
   npx playwright install chromium
   npm run test:browser
   Uses a new isolated profile and file://; does not touch a real player's save. */
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
let chromium;
try{({chromium}=require('playwright'));}
catch{console.error('Install optional test dependency: npm install --no-save playwright');process.exit(1);}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  const url=pathToFileURL(path.resolve(__dirname,'../index.html')).href;
  const out=path.resolve(__dirname,'../test-results');fs.mkdirSync(out,{recursive:true});
  async function capture(label){for(const [width,height] of [[1920,1080],[1280,800],[390,844]]){await page.setViewportSize({width,height});await page.screenshot({path:path.join(out,label+'-'+width+'.png'),fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow '+label+' '+width);}await page.setViewportSize({width:1280,height:800});}
  await page.goto(url);await page.locator('#start-game').click();await page.locator('#open-tutorial').click();
  for(let i=0;i<9;i++)await page.getByRole('button',{name:'Next →',exact:true}).click();
  await page.getByRole('button',{name:'Start game →',exact:true}).click();
  for(const [i,id] of ['plantfish','creoexchange','clinova'].entries()){
   assert.equal(await page.evaluate(()=>PitchLedger.session.caseId),id);
   await page.locator('[data-action="begin-pitch"]').click();await capture(id+'-pitch');
   let guard=0;
   while(await page.locator('[data-action="next-line"]').count()){
    assert.ok(++guard<100);await page.locator('[data-action="next-line"]').click();
   }
   for(const tab of ['industry','company','financials'])await page.locator(`[data-action="document"][data-value="${tab}"]`).click();
   await capture(id+'-documents');await page.locator('[data-action="finish-investigation"]').click();
   await page.locator('[data-action="choice"]').first().click();
   while(await page.locator('[data-action="next-line"]').count())await page.locator('[data-action="next-line"]').click();
   await page.locator('[data-action="choice"]').first().click();
   while(await page.locator('[data-action="next-line"]').count())await page.locator('[data-action="next-line"]').click();
   await capture(id+'-qna');await page.locator('[data-action="history"]').first().click();assert.ok(await page.locator('dialog').isVisible());await page.locator('dialog [data-action="history"]').click();
   await page.locator('[data-action="finish-qna"]').click();await capture(id+'-decision');
   const checklist=await page.evaluate(()=>PitchLedger.session.caseData.checklist.map(c=>({id:c.id,value:c.benchmark?'yes':'no'})));
   for(const c of checklist)await page.locator(`input[name="${c.id}"][value="${c.value}"]`).check();
   await page.locator('[data-action="decision"][data-value="invest"]').click();
   await page.locator('[data-action="confirm"]').click();
   if(i<2)await page.waitForURL('**?case='+['plantfish','creoexchange','clinova'][i+1]);
  }
  await page.waitForSelector('.investment-report');assert.equal(await page.locator('.case-report-card').count(),0);
  for(const id of ['plantfish','creoexchange','clinova']){await page.locator('[data-action="report-case"][data-value="'+id+'"]').click();assert.equal(await page.locator('.case-report-card').count(),1);assert.equal(await page.locator('.case-report-card').getAttribute('id'),'case-detail-'+id);}
  assert.equal(await page.locator('.performance-illustration img').getAttribute('src'),await page.evaluate(()=>PitchLedger.reportCategoryImage(PitchLedger.buildFinalReport(PitchLedger.config,PitchLedger.campaign,PitchLedger.campaignState).classification)));
  for(const [width,height] of [[1280,800],[768,1024],[390,844]]){
   await page.setViewportSize({width,height});await page.screenshot({path:path.join(out,`report-${width}.png`),fullPage:true});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),`page overflow at ${width}`);
  }
  await page.goto(url+'?case=creoexchange');await page.locator('#reset-game').click();
  assert.ok(await page.evaluate(()=>!PitchLedger.campaignState.completed.clinova && !localStorage.getItem(PitchLedger.config.storageKey+':case:clinova')));
  assert.deepEqual(errors,[]);console.log('PASS: file:// three-case UI flow, report, replay cleanup, viewport overflow checks.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
