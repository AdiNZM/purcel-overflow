const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch(); const p=await b.newPage(); await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(800);
const types=['stapler','printer','digger','firewall','slicer','vacuum','shower'], lvl={stapler:0,printer:1,digger:2,firewall:3,slicer:4,vacuum:5,shower:6};
const levels=await p.evaluate(()=>{const n=__po.LD.length; return Array.from({length:Math.max(0,n-2)},(_,i)=>i+2);});
for (const li of levels) { const row=[];
  for (const t of types) { if (lvl[t]>li) continue; const r=[]; for(let k=0;k<3;k++){ const o=await p.evaluate(([li,t])=>__po.simulate(li,0.85,'only:'+t),[li,t]); r.push((o.result==='win'?'W':'')+o.wave); } row.push(t+':'+r.join(',')); }
  console.log('L'+(li+1), row.join('  '));
}
// eficiență (daune / leu investit) cu botul deștept
const tot={}; for (const li of levels) for(let k=0;k<3;k++){ const o=await p.evaluate(li=>__po.simulate(li,0.85,'smart'),li); for(const t in o.inv){ const T=tot[t]||(tot[t]={d:0,i:0}); T.d+=o.dmgBy[t]||0; T.i+=o.inv[t]; } }
console.log('dmg/leu', Object.entries(tot).map(([t,v])=>t+'='+(v.d/v.i).toFixed(1)).join('  '));
await b.close();})();
