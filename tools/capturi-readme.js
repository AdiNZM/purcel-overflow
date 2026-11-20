const { chromium } = require('playwright');
const S=require('path').resolve(__dirname, '../screenshots') + '/';
(async()=>{const b=await chromium.launch(); const e=[]; const p=await b.newPage({viewport:{width:1280,height:720}}); p.on('pageerror',x=>e.push(x.message)); await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.evaluate(()=>{for(const k of Object.keys(localStorage)) if(k.startsWith('po_unlocked')) {} ; localStorage.setItem('po_unlocked4', String(__po.LD.length)); localStorage.setItem('po_done4','[0,1,2]');}); await p.reload(); await p.waitForTimeout(1500); await p.mouse.click(10,10);
await p.waitForTimeout(1500); await p.screenshot({path:S+'meniu.png'});
await p.evaluate(()=>{__po.scr='levels'}); await p.waitForTimeout(500); await p.screenshot({path:S+'nivele.png'});
await p.evaluate(()=>__po.startLevel(0)); await p.waitForTimeout(600); await p.evaluate(()=>{__po.tut.i=2}); await p.waitForTimeout(900); await p.screenshot({path:S+'tutorial.png'});
await p.evaluate(()=>{__po.closeTut(); __po.startLevel(4); __po.clearPop(); const g=__po.G; g.money=900;
 const put=(t,c,r,l)=>g.towers.push({id:g.idc++,type:t,c,r,lvl:l,invest:100,cd:0,ang:0,fx:0,buff:1,spin:0,born:-9});
 const d=__po.LD[4]; const types=['stapler','printer','bubbles','digger','firewall','slicer','coffee','stapler','printer','digger']; let n=0;
 const ok=(c,r)=>c>=0&&r>=0&&c<20&&r<12&&!d.blocked[r][c]&&!d.pathT[r][c]&&!d.zoneT[r][c]&&!g.towers.some(t=>t.c===c&&t.r===r)&&[[1,0],[-1,0],[0,1],[0,-1]].some(([x,y])=>d.pathT[r+y]&&d.pathT[r+y][c+x]);
 for(let r=0;r<12&&n<types.length;r+=2)for(let c=1;c<20&&n<types.length;c+=3) if(ok(c,r)){put(types[n],c,r,1+(n%3));n++;}
 __po.startWave(g); g.wave=3;});
await p.waitForTimeout(12500); await p.screenshot({path:S+'joc.png'});
console.log('ERR',e); await b.close();})();
