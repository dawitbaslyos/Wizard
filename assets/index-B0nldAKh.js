const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/editor.main-CJLcj2_o.js","assets/editor-C4nK10LM.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const _="modulepreload",k=function(n){return"/"+n},y={},x=function(e,t,s){let r=Promise.resolve();if(t&&t.length>0){let m=function(i){return Promise.all(i.map(l=>Promise.resolve(l).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");r=m(t.map(i=>{if(i=k(i),i in y)return;y[i]=!0;const l=i.endsWith(".css"),p=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${p}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":_,l||(u.as="script"),u.crossOrigin="",u.href=i,c&&u.setAttribute("nonce",c),document.head.appendChild(u),l)return new Promise((v,b)=>{u.addEventListener("load",v),u.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${i}`)))})}))}function o(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return r.then(a=>{for(const c of a||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};function*E(n){if(!n.trim())return;const e=/\s*(book_of_\w+|\w+|\d+\.?\d*|["][^"]*["]|[(),])\s*/gy;let t;for(;t=e.exec(n);){const s=t[0].trim();if(s){if(s[0]==='"'){yield{type:"STR",val:JSON.parse(s),pos:t.index};continue}if(/^\d/.test(s)){yield{type:"NUM",val:s,pos:t.index};continue}if("(),".includes(s)){yield{type:s,val:s,pos:t.index};continue}yield{type:"ID",val:s,pos:t.index}}}}function M(n){if(n=n.filter(o=>o&&o.type&&o.val),n.length===0)return[];let e=0;const t=[];function s(o=0){return n[e+o]}function r(o){if(e>=n.length)return console.warn("⚠️ Parser: Unexpected end of input"),"";const a=n[e++];return o&&a.val!==o&&console.warn(`⚠️ Parser: Expected "${o}" but got "${a.val}"`),a.val}for(;e<n.length;){const o=s();if(!o)break;if(o.val==="open"){e++;const i=r();s()?.val==="as"&&r();const l=r();t.push({kind:"open",ns:i,alias:l});continue}const a=r();let c="";s()?.val&&(c=r()),c.startsWith(".")&&(c=c.slice(1)),s()?.type==="("&&r("(");const m=[];for(;e<n.length&&s()?.type!==")";){const i=r();if(i===""||i===void 0)break;if(i===",")continue;const l=Number(i);m.push(isNaN(l)?i:l),s()?.type===","&&r(",")}s()?.type===")"&&r(")"),t.push({kind:"call",alias:a,fn:c,args:m})}return t}function S(n){const e=[];e.push("(function(){ if (typeof window !== 'undefined') window.realms = window.realms || {}; })();");for(const t of n)if(t.kind==="open")e.push(`// open ${t.ns} as ${t.alias}`),e.push("(function(){"),e.push("  if (typeof window === 'undefined') return;"),e.push("  window.realms = window.realms || {};"),e.push(`  if (!window.realms['${t.ns}']) {`),t.ns==="book_of_pictura"?(e.push("    (function(){"),e.push("      // Minimal book_of_pictura runtime: creates a canvas and simple drawing API"),e.push("      var canvas = document.getElementById('__runner_canvas__');"),e.push("      if (!canvas) {"),e.push("        canvas = document.createElement('canvas');"),e.push("        canvas.id = '__runner_canvas__';"),e.push("        canvas.style.position = 'fixed'; canvas.style.left = '0'; canvas.style.top = '0';"),e.push("        canvas.style.width = '100%'; canvas.style.height = '100%';"),e.push("        canvas.style.zIndex = '9999'; // above background but below devtools"),e.push("        canvas.width = window.innerWidth; canvas.height = window.innerHeight;"),e.push("        document.body.appendChild(canvas);"),e.push("        var resize = function(){"),e.push("          canvas.width = window.innerWidth; canvas.height = window.innerHeight;"),e.push("        };"),e.push("        window.addEventListener('resize', resize, false);"),e.push("      }"),e.push("      var ctx = canvas.getContext('2d');"),e.push("      // Simple camera / transform state"),e.push("      var state = { t: 0, camX:0, camY:0, camZ:0, rotX:0, rotY:0, rotZ:0 };"),e.push("      // Helper to clear with bg color (r,g,b)"),e.push("      function clearWith(r,g,b){ ctx.fillStyle = 'rgb('+r+','+g+','+b+')'; ctx.fillRect(0,0,canvas.width,canvas.height); }"),e.push("      // Exposed API"),e.push("      var api = {"),e.push("        t: 0,"),e.push("        bg: function(r,g,b){ clearWith(r,g,b); },"),e.push("        f: function(r,g,b){ /* fill color placeholder (not stored) */ },"),e.push("        c: function(x,y,radius){"),e.push("          // draw a simple circle centered by camera transform"),e.push("          var cx = (canvas.width/2) + (Number(x)||0);"),e.push("          var cy = (canvas.height/2) + (Number(y)||0);"),e.push("          ctx.beginPath(); ctx.arc(cx, cy, Math.abs(Number(radius)||10), 0, Math.PI*2); ctx.fillStyle='white'; ctx.fill();"),e.push("        },"),e.push("        cam: function(x,y,z){ state.camX = x||0; state.camY = y||0; state.camZ = z||0; },"),e.push("        rot: function(x,y,z){ state.rotX = x||0; state.rotY = y||0; state.rotZ = z||0; },"),e.push("        b: function(){ /* background box / rect placeholder */ },"),e.push("      };"),e.push("      // Simple animation: increment t if user code expects it"),e.push("      (function tick(){ try{ api.t += 1; }catch(e){}; requestAnimationFrame(tick); })();"),e.push(`      window.realms['${t.ns}'] = api;`),e.push("    })();")):e.push(`    window.realms['${t.ns}'] = {};`),e.push("  }"),e.push("})();"),e.push(`const ${t.alias} = window.realms['${t.ns}'];`);else{const s=t.args.map(r=>typeof r=="string"?JSON.stringify(r):r===null?"null":r===void 0?"undefined":String(r)).join(",");e.push("(function(){"),e.push("  try {"),e.push(`    ${t.alias}.${t.fn}(${s});`),e.push("  } catch (e) {"),e.push(`    try { console.error('runtime call error', '${t.alias}.${t.fn}', e && e.stack ? e.stack : e); } catch(e2) { /* ignore */ }`),e.push("  }"),e.push("})();")}return e.join(`
`)}function L(n){const e=document.createElement("iframe"),t=`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Runner Frame</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #111;
        color: white;
        height: 100%;
        width: 100%;
        overflow: hidden;
        font-family: monospace;
      }
    </style>
  </head>
  <body>
    <script>
      // --- Runner sandbox ---
      window.addEventListener('message', (ev) => {
        try {
          const data = ev.data || {};
          if (data && data.cmd === 'run') {
            const code = String(data.code || '');

            // Capture console.log and forward to parent
            (function(){
              const origLog = console.log;
              console.log = function(...args){
                parent.postMessage({ type: 'log', args }, '*');
                origLog.apply(console, args);
              };
              try {
                // Execute user code safely
                const result = new Function(code)();
                parent.postMessage({
                  type: 'done',
                  result: result === undefined ? null : result
                }, '*');
              } catch (err) {
                parent.postMessage({
                  type: 'error',
                  error: String(err && err.stack ? err.stack : err)
                }, '*');
              } finally {
                console.log = origLog;
              }
            })();
          }
        } catch (outerErr) {
          parent.postMessage({ type: 'error', error: String(outerErr) }, '*');
        }
      }, false);

      // Notify parent when ready
      parent.postMessage({ type: 'ready' }, '*');
    <\/script>
  </body>
</html>`;return e.srcdoc=t,e.style.cssText="width:100%;height:100%;border:none;background:#000;",n.appendChild(e),e}let f,d,g=!1;window.MonacoEnvironment={getWorker(n,e){return new Worker(URL.createObjectURL(new Blob(["/* no-op worker */"],{type:"application/javascript"})))}};const w={circle:`open book_of_pictura as pic
pic.bg(10,10,30)
pic.f(255,100,0)
pic.c(0,0,80)`,spin:`open book_of_pictura as pic
conjure t as 0
chant forever:
    pic.bg(10,10,30)
    pic.cam(0,t*0.01,300)
    pic.rot(t*0.02,t*0.03,0)
    pic.b(0,0,0,50,50,50)
    pic.t += 1`};async function P(){if(g)return;const n=await x(()=>import("./editor.main-CJLcj2_o.js").then(t=>t.e),__vite__mapDeps([0,1]));g=!0,n.languages.register({id:"wizard"}),n.languages.setMonarchTokensProvider("wizard",{tokenizer:{root:[[/\b(open|conjure|conjust|chant|reveal)\b/,"keyword"],[/\b(book_of_\\w+|pic|scena|sono)\b/,"namespace"],[/\b\\d+\\.?\\d*\\b/,"number"],[/"([^"\\\\]|\\\\.)*$/,"string.invalid"],[/"/,"string","@string_double"]],string_double:[[/[^\\"]+/,"string"],[/"/,"string","@pop"]]}}),f=n.editor.create(document.getElementById("editor"),{value:w.circle,language:"wizard",theme:"vs-dark",minimap:{enabled:!1},fontSize:15,scrollBeyondLastLine:!1,wordWrap:"on"}),f.addCommand(n.KeyMod.CtrlCmd|n.KeyCode.Enter,h);let e;f.onDidChangeModelContent(()=>{clearTimeout(e),e=setTimeout(h,600)}),h()}function h(){if(g)try{const n=f.getValue().trim();if(!n){d.contentWindow.postMessage({cmd:"run",code:""},"*");return}let e="";try{const a=[...E(n)],c=M(a);e=S(c)}catch(a){console.error("💥 Compilation failed:",a),d.contentWindow.postMessage({cmd:"err",msg:"Compilation failed: "+(a.message||String(a))},"*");return}const t=(e.match(/{/g)||[]).length,s=(e.match(/}/g)||[]).length,r=(e.match(/\(/g)||[]).length,o=(e.match(/\)/g)||[]).length;if(t!==s||r!==o||/[+\-*/]$/.test(e.trim())){console.warn("⚠️ Incomplete generated code detected"),d.contentWindow.postMessage({cmd:"err",msg:"Compiler produced incomplete JS — check syntax or closing braces."},"*");return}d.contentWindow.postMessage({cmd:"run",code:e},"*")}catch(n){console.error("💥 Runtime error",n),d.contentWindow.postMessage({cmd:"err",msg:String(n)},"*")}}document.addEventListener("DOMContentLoaded",()=>{d=L(document.getElementById("canvas")),document.getElementById("run").onclick=h,document.getElementById("sample").onchange=n=>{g&&(f.setValue(w[n.target.value]),h())},P()});window.addEventListener("message",n=>{const e=n.data||{};e.type==="log"&&Array.isArray(e.args)?console.log(...e.args):e.type==="error"||e.type==="err"?console.error("Runner error:",e.error??e.msg??e):e.type==="ready"&&console.info("Runner iframe ready")});export{x as _};
