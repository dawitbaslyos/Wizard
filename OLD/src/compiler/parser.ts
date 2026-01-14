// src/compiler/parser.ts
import type { Tok } from './lexer';

export type Stmt = OpenStmt | CallStmt;

interface OpenStmt { kind: 'open'; ns: string; alias: string }
interface CallStmt { kind: 'call'; alias: string; fn: string; args: (string | number)[] }

export function parse(ts: Tok[]): Stmt[] {
  // 1. Drop null/invalid tokens
  ts = ts.filter(t => t && t.type && t.val);
  if (ts.length === 0) return [];

  let i = 0;
  const stmts: Stmt[] = [];

  function peek(offset = 0) {
    return ts[i + offset];
  }

  function consume(expected?: string): string {
    if (i >= ts.length) {
      // Instead of crashing, just warn and recover
      console.warn('⚠️ Parser: Unexpected end of input');
      return '';
    }
    const token = ts[i++];
    if (expected && token.val !== expected) {
      console.warn(`⚠️ Parser: Expected "${expected}" but got "${token.val}"`);
    }
    return token.val;
  }

  while (i < ts.length) {
    const current = peek();
    if (!current) break;

    // --- open statement ---
    if (current.val === 'open') {
      i++; // skip 'open'
      const ns = consume();        // book_of_pictura
      if (peek()?.val === 'as') consume();  // skip 'as' if present
      const alias = consume();     // alias
      stmts.push({ kind: 'open', ns, alias });
      continue;
    }

    // --- function call alias.fn(args) ---
    const alias = consume();
    let fn = '';
    if (peek()?.val) fn = consume(); // next token after alias (ex: .bg)
    if (fn.startsWith('.')) fn = fn.slice(1);

    // handle optional '('
    if (peek()?.type === '(') consume('(');

    const args: (string | number)[] = [];
    while (i < ts.length && peek()?.type !== ')') {
      const t = consume();
      if (t === '' || t === undefined) break;
      if (t === ',') continue;
      // Add argument, parse numbers safely
      const num = Number(t);
      args.push(isNaN(num) ? t : num);
      if (peek()?.type === ',') consume(',');
    }

    // optional closing ')'
    if (peek()?.type === ')') consume(')');

    stmts.push({ kind: 'call', alias, fn, args });
  }

  return stmts;
}
