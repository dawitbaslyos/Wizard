// src/compiler/codegen.ts
import type { Stmt } from './parser';

/**
 * Generate plain JavaScript from parsed statements.
 *
 * This codegen:
 * - Emits only valid JavaScript (no TypeScript syntax).
 * - Ensures window.realms exists.
 * - Injects a minimal 'book_of_pictura' runtime in the iframe (canvas + basic API)
 *   when that namespace is opened, so the sample code displays without extra runtime files.
 * - JSON.stringify()s string args and converts primitives safely.
 * - Wraps each runtime call in try/catch so one error doesn't stop the rest.
 */
export function codegen(stmts: Stmt[]): string {
  const out: string[] = [];

  // Make sure window.realms exists in the execution environment.
  out.push(`(function(){ if (typeof window !== 'undefined') window.realms = window.realms || {}; })();`);

  for (const s of stmts) {
    if (s.kind === 'open') {
      // Comment for readability
      out.push(`// open ${s.ns} as ${s.alias}`);

      // Ensure the namespace exists; if it's book_of_pictura, provide a minimal runtime.
      out.push(`(function(){`);
      out.push(`  if (typeof window === 'undefined') return;`);
      out.push(`  window.realms = window.realms || {};`);
      out.push(`  if (!window.realms['${s.ns}']) {`);
      // If namespace is book_of_pictura, inject minimal drawing runtime
      if (s.ns === 'book_of_pictura') {
        out.push(`    (function(){`);
        out.push(`      // Minimal book_of_pictura runtime: creates a canvas and simple drawing API`);
        out.push(`      var canvas = document.getElementById('__runner_canvas__');`);
        out.push(`      if (!canvas) {`);
        out.push(`        canvas = document.createElement('canvas');`);
        out.push(`        canvas.id = '__runner_canvas__';`);
        out.push(`        canvas.style.position = 'fixed'; canvas.style.left = '0'; canvas.style.top = '0';`);
        out.push(`        canvas.style.width = '100%'; canvas.style.height = '100%';`);
        out.push(`        canvas.style.zIndex = '9999'; // above background but below devtools`);
        out.push(`        canvas.width = window.innerWidth; canvas.height = window.innerHeight;`);
        out.push(`        document.body.appendChild(canvas);`);
        out.push(`        var resize = function(){`);
        out.push(`          canvas.width = window.innerWidth; canvas.height = window.innerHeight;`);
        out.push(`        };`);
        out.push(`        window.addEventListener('resize', resize, false);`);
        out.push(`      }`);
        out.push(`      var ctx = canvas.getContext('2d');`);
        out.push(`      // Simple camera / transform state`);
        out.push(`      var state = { t: 0, camX:0, camY:0, camZ:0, rotX:0, rotY:0, rotZ:0 };`);
        out.push(`      // Helper to clear with bg color (r,g,b)`);
        out.push(`      function clearWith(r,g,b){ ctx.fillStyle = 'rgb('+r+','+g+','+b+')'; ctx.fillRect(0,0,canvas.width,canvas.height); }`);
        out.push(`      // Exposed API`);
        out.push(`      var api = {`);
        out.push(`        t: 0,`);
        out.push(`        bg: function(r,g,b){ clearWith(r,g,b); },`);
        out.push(`        f: function(r,g,b){ /* fill color placeholder (not stored) */ },`);
        out.push(`        c: function(x,y,radius){`);
        out.push(`          // draw a simple circle centered by camera transform`);
        out.push(`          var cx = (canvas.width/2) + (Number(x)||0);`);
        out.push(`          var cy = (canvas.height/2) + (Number(y)||0);`);
        out.push(`          ctx.beginPath(); ctx.arc(cx, cy, Math.abs(Number(radius)||10), 0, Math.PI*2); ctx.fillStyle='white'; ctx.fill();`);
        out.push(`        },`);
        out.push(`        cam: function(x,y,z){ state.camX = x||0; state.camY = y||0; state.camZ = z||0; },`);
        out.push(`        rot: function(x,y,z){ state.rotX = x||0; state.rotY = y||0; state.rotZ = z||0; },`);
        out.push(`        b: function(){ /* background box / rect placeholder */ },`);
        out.push(`      };`);
        out.push(`      // Simple animation: increment t if user code expects it`);
        out.push(`      (function tick(){ try{ api.t += 1; }catch(e){}; requestAnimationFrame(tick); })();`);
        out.push(`      window.realms['${s.ns}'] = api;`);
        out.push(`    })();`);
      } else {
        // Generic empty object for other namespaces
        out.push(`    window.realms['${s.ns}'] = {};`);
      }
      out.push(`  }`);
      out.push(`})();`);

      // Create local alias binding to the runtime object
      out.push(`const ${s.alias} = window.realms['${s.ns}'];`);
    } else {
      // regular call
      // Convert arguments to JS literals safely
      const mappedArgs = s.args.map(a => {
        if (typeof a === 'string') return JSON.stringify(a);
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        // Booleans and numbers become their literal strings
        return String(a);
      }).join(',');

      // Emit call with try/catch
      out.push(`(function(){`);
      out.push(`  try {`);
      out.push(`    ${s.alias}.${s.fn}(${mappedArgs});`);
      out.push(`  } catch (e) {`);
      out.push(`    try { console.error('runtime call error', '${s.alias}.${s.fn}', e && e.stack ? e.stack : e); } catch(e2) { /* ignore */ }`);
      out.push(`  }`);
      out.push(`})();`);
    }
  }

  // Return the joined code (readable)
  return out.join('\n');
}
