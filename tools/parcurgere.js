const { chromium } = require('playwright');
const S=require('path').resolve(__dirname, 'out') + '/'; require('fs').mkdirSync(S, { recursive: true });
(async()=>{const b=await chromium.launch(); const e=[]; const p=await b.newPage({viewport:{width:1280,height:720}}); p.on('pageerror',x=>e.push(x.message)); p.on('console',m=>{if(m.type()==='error')e.push('console: '+m.text())});
await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(1000); await p.mouse.click(10,10); await p.waitForTimeout(300);
await p.evaluate(()=>{ const orig=window.updateGame; window.updateGame=function(g,dt){ if(g===__po.G){ for(let i=0;i<5;i++){ if(g.state==='build'&&!g.demo){ botBuild(g,'smart'); startWave(g);} if(g.req&&g.req.t>1) answer(g, Math.random()<0.85 ? !g.req.bad : g.req.bad); orig(g,dt); if(__po.scr!=='play') break; } } else orig(g,dt); }; });
for (let li=0; li<6; li++) {
  await p.evaluate(li=>{__po.startLevel(li,true); __po.clearPop();},li);
  const t0=Date.now(); let shot=0;
  while (Date.now()-t0 < 240000) { await p.waitForTimeout(2000); const st=await p.evaluate(()=>[__po.scr, __po.G&&__po.G.wave, __po.G&&Math.round(__po.G.bs), __po.G&&__po.G.pigs.length]); if(!shot && st[1]>=3){ await p.screenshot({path:S+li+'.png'}); shot=1;} if(st[0]!=='play'){ console.log('L'+(li+1), st[0], 'wave', st[1], 'bs', st[2], Math.round((Date.now()-t0)/1000)+'s'); await p.screenshot({path:S+li+'_end.png'}); break; } }
}
console.log('ERR', JSON.stringify(e.slice(0,10)), e.length); await b.close();})();
