const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage();
 const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(1500);
 if (process.argv[2]) await p.evaluate(a=>__po.setDiff(+a), process.argv[2]);
 const r=await p.evaluate(()=>{const out=[];
   for(let li=0;li<6;li++){ for(const [sk,st] of [[0.85,'smart'],[0.6,'naive']]){ let w=0,bsS=0,waves=[]; for(let i=0;i<4;i++){const x=__po.simulate(li,sk,st); if(x.result==='win')w++; bsS+=x.bs; waves.push(x.wave);} out.push(`L${li+1} ${st}: wins ${w}/4 bs~${Math.round(bsS/4)} waves ${waves}`);} }
   return out;});
 console.log(r.join('\n')); console.log('ERR',errs); await b.close();})();
