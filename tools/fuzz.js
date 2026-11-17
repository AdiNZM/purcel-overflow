const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch(); const e=[];
for (const vp of [{width:1280,height:720},{width:844,height:390,isMobile:true,hasTouch:true,deviceScaleFactor:2},{width:1024,height:768}]) {
 const c=await b.newContext({viewport:{width:vp.width,height:vp.height},isMobile:!!vp.isMobile,hasTouch:!!vp.hasTouch,deviceScaleFactor:vp.deviceScaleFactor||1}); const p=await c.newPage();
 p.on('pageerror',x=>e.push(vp.width+': '+x.message+' '+(x.stack||'').split('\n')[1])); p.on('console',m=>{if(m.type()==='error')e.push('console '+m.text())});
 await p.goto('file://' + require('path').resolve(__dirname, '../index.html')); await p.waitForTimeout(800);
 let seed=vp.width; const rnd=()=>{seed=(seed*16807)%2147483647; return seed/2147483647;};
 for (let i=0;i<600;i++){ const x=Math.floor(rnd()*vp.width), y=Math.floor(rnd()*vp.height);
   if (vp.hasTouch) await p.touchscreen.tap(x,y); else await p.mouse.click(x,y);
   if (i%50===0) await p.evaluate(()=>{ if(__po.G){ __po.G.money+=300; } });
   if (i%400===399) await p.setViewportSize({width: vp.height+200, height: vp.width>900?vp.height:vp.height}).catch(()=>{}), await p.setViewportSize({width:vp.width,height:vp.height});
   if (i%10===0) await p.waitForTimeout(40);
 }
 console.log(vp.width,'done scr=',await p.evaluate(()=>__po.scr));
 await c.close();
}
console.log('ERR', e.length, JSON.stringify([...new Set(e)].slice(0,15),null,1)); await b.close();})();
