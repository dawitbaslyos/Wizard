// src/main.ts
import './style.css';
import type * as Monaco from 'monaco-editor';   // type-only alias
import { lex, parse, codegen } from './compiler';
import { injectIframe } from './runner/iframe';

let editor: Monaco.editor.IStandaloneCodeEditor;
let iframe: HTMLIFrameElement;
let monacoReady = false;

/* ---------- Monaco workers stub ---------- */
(window as any).MonacoEnvironment = {
  getWorker(_moduleId: string, _label: string) {
    return new Worker(
      URL.createObjectURL(new Blob([`/* no-op worker */`], { type: 'application/javascript' }))
    );
  },
};

/* ---------- sample spells ---------- */
const samples: Record<string, string> = {
  circle: `open book_of_pictura as pic
pic.bg(10,10,30)
pic.f(255,100,0)
pic.c(0,0,80)`,

  spin: `open book_of_pictura as pic
conjure t as 0
chant forever:
    pic.bg(10,10,30)
    pic.cam(0,t*0.01,300)
    pic.rot(t*0.02,t*0.03,0)
    pic.b(0,0,0,50,50,50)
    pic.t += 1`,
};

/* ---------- load Monaco + editor ---------- */
async function loadMonaco() {
  if (monacoReady) return;
  const monaco = await import('monaco-editor');
  monacoReady = true;

  monaco.languages.register({ id: 'wizard' });
  monaco.languages.setMonarchTokensProvider('wizard', {
    tokenizer: {
      root: [
        [/\b(open|conjure|conjust|chant|reveal)\b/, 'keyword'],
        [/\b(book_of_\\w+|pic|scena|sono)\b/, 'namespace'],
        [/\b\\d+\\.?\\d*\\b/, 'number'],
        [/"([^"\\\\]|\\\\.)*$/, 'string.invalid'], [/"/, 'string', '@string_double'],
      ],
      string_double: [[/[^\\"]+/, 'string'], [/"/, 'string', '@pop']],
    },
  });

  editor = monaco.editor.create(document.getElementById('editor')!, {
    value: samples.circle,
    language: 'wizard',
    theme: 'vs-dark',
    minimap: { enabled: false },
    fontSize: 15,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, compileAndRun);

  let t: number;
  editor.onDidChangeModelContent(() => {
    clearTimeout(t);
    t = setTimeout(compileAndRun, 600);
  });

  compileAndRun(); // first run
}

/* ---------- compile & send to iframe ---------- */
function compileAndRun() {
  if (!monacoReady) return;

  try {
    const src = editor.getValue().trim();
    if (!src) {
      iframe.contentWindow!.postMessage({ cmd: 'run', code: '' }, '*');
      return;
    }

    // Try to compile
    let jsCode = '';
    try {
      const tokens = [...lex(src)];
      const ast = parse(tokens);
      jsCode = codegen(ast);
    } catch (err: any) {
      console.error('💥 Compilation failed:', err);
      iframe.contentWindow!.postMessage({
        cmd: 'err',
        msg: 'Compilation failed: ' + (err.message || String(err))
      }, '*');
      return;
    }

    // Detect incomplete JS (missing braces, parentheses, or trailing operators)
    const openBraces = (jsCode.match(/{/g) || []).length;
    const closeBraces = (jsCode.match(/}/g) || []).length;
    const openParens = (jsCode.match(/\(/g) || []).length;
    const closeParens = (jsCode.match(/\)/g) || []).length;

    if (
      openBraces !== closeBraces ||
      openParens !== closeParens ||
      /[+\-*/]$/.test(jsCode.trim())
    ) {
      console.warn('⚠️ Incomplete generated code detected');
      iframe.contentWindow!.postMessage({
        cmd: 'err',
        msg: 'Compiler produced incomplete JS — check syntax or closing braces.'
      }, '*');
      return;
    }

    // Run safely
    iframe.contentWindow!.postMessage({ cmd: 'run', code: jsCode }, '*');
  } catch (e: any) {
    console.error('💥 Runtime error', e);
    iframe.contentWindow!.postMessage({ cmd: 'err', msg: String(e) }, '*');
  }
}

/* ---------- page ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  iframe = injectIframe(document.getElementById('canvas')!);

  document.getElementById('run')!.onclick = compileAndRun;

  document.getElementById('sample')!.onchange = (e) => {
    if (!monacoReady) return;
    editor.setValue(samples[(e.target as HTMLSelectElement).value]);
    compileAndRun();
  };

  loadMonaco();
});

/*-------- error show ----------*/

window.addEventListener('message', (ev) => {
  const d = ev.data || {};
  if (d.type === 'log' && Array.isArray(d.args)) {
    console.log(...d.args);
  } else if (d.type === 'error' || d.type === 'err') {
    console.error('Runner error:', d.error ?? d.msg ?? d);
  } else if (d.type === 'ready') {
    console.info('Runner iframe ready');
  }
});
