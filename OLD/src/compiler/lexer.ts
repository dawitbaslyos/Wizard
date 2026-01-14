export type Tok = { type: 'KW'|'ID'|'NUM'|'STR'|'(' | ')' | ','; val: string; pos: number };

export function* lex(src: string): Generator<Tok> {
  if (!src.trim()) return;
  const re = /\s*(book_of_\w+|\w+|\d+\.?\d*|["][^"]*["]|[(),])\s*/gy;
  let m;
  while ((m = re.exec(src))) {
    const raw = m[0].trim();
    if (!raw) continue;                       // ← skip empty
    if (raw[0] === '"') {
      yield { type: 'STR', val: JSON.parse(raw), pos: m.index };
      continue;
    }
    if (/^\d/.test(raw)) {
      yield { type: 'NUM', val: raw, pos: m.index };
      continue;
    }
    if ('(),'.includes(raw)) {
      yield { type: raw as any, val: raw, pos: m.index };
      continue;
    }
    yield { type: 'ID', val: raw, pos: m.index };
  }
}