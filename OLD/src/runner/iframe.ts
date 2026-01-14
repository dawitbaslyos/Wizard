// src/runner/iframe.ts
export function injectIframe(host: HTMLElement): HTMLIFrameElement {
  const f = document.createElement('iframe');

  // Use srcdoc to avoid missing /iframe.html file (prevents 404 / unexpected EOF)
  const runner = `<!doctype html>
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
</html>`;

  f.srcdoc = runner;
  f.style.cssText = 'width:100%;height:100%;border:none;background:#000;';
  host.appendChild(f);
  return f;
}
