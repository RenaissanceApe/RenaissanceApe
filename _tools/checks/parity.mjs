/* Check 3 — EN/PT parity.
 *
 * Every English page has a Portuguese counterpart and vice versa, and each
 * declares an hreflang pair pointing at the other. The README states this
 * rule; nothing enforced it, and the quiz pages drifted anyway.
 */
import postcss from 'postcss';
import { htmlFiles, read, stripComments, regionsOf } from './lib.mjs';

export const name = 'parity';
export const title = 'EN/PT counterparts exist, cross-link and match structurally';

/* String literals are masked before comparing, so translated copy is invisible
   and only structure is compared. quiz.html and pt/quiz.html looked 109 lines
   apart and were in fact the same program formatted two different ways — a
   byte diff could not tell anyone that, which is why they drifted unnoticed. */
const STRING = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g;
const normSel = x => x.replace(/\s+/g, ' ').replace(/\s*([,>+~])\s*/g, '$1').trim();

function cssShape(src) {
  const shape = new Map();
  for (const [s, e] of regionsOf(src, ['style'])) {
    let sheet;
    try { sheet = postcss.parse(src.slice(s, e)); } catch { continue; }
    sheet.walkRules(rule => {
      const mq = rule.parent?.type === 'atrule' ? `@media ${normSel(rule.parent.params)} ` : '';
      const decls = rule.nodes.filter(n => n.type === 'decl')
        .map(d => `${d.prop.trim()}:${d.value
          .replace(/\s+/g, ' ')
          /* A pt/ page sits one level deeper, so url(../images/x) there and
             url(images/x) at the root are the same asset, not drift. */
          .replace(/url\((['"]?)(?:\.\.\/)+/g, 'url($1')
          .trim()}${d.important ? '!important' : ''}`)
        .sort().join(';');
      shape.set(mq + normSel(rule.selector), decls);
    });
  }
  return shape;
}

function jsShape(src) {
  const body = src.split('</head>')[1] || '';
  const js = (body.match(/<script>([\s\S]*?)<\/script>/g) || []).join('\n');
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(STRING, '@STR@')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[;{}])/)
    .map(t => t.trim())
    .filter(Boolean);
}

/* Pages that legitimately exist in one language only. */
const EN_ONLY = new Set([
  'articles/index.html', // orphan, no inbound links; pending deletion
]);
const PT_ONLY = new Set(['pt/field-notes.html']); // meta-refresh redirect stub

export function run() {
  const files = htmlFiles();
  const set = new Set(files);
  const out = [];

  const counterpart = f => (f.startsWith('pt/') ? f.slice(3) : 'pt/' + f);

  for (const file of files) {
    if (EN_ONLY.has(file) || PT_ONLY.has(file)) continue;
    const other = counterpart(file);
    if (!set.has(other)) {
      out.push({ file, line: 1, message: `no counterpart: ${other} is missing` });
      continue;
    }
    const src = stripComments(read(file));
    if (!/rel="alternate"/.test(src)) continue; // templates may omit; structure check covers the rest
    const en = src.match(/hreflang="en"\s+href="([^"]+)"/);
    const pt = src.match(/hreflang="pt"\s+href="([^"]+)"/);
    if (!en || !pt) {
      out.push({ file, line: 1, message: 'declares rel="alternate" but not both hreflang="en" and hreflang="pt"' });
      continue;
    }
    const enPath = new URL(en[1]).pathname.replace(/^\//, '');
    const ptPath = new URL(pt[1]).pathname.replace(/^\//, '');
    const mine = file.startsWith('pt/') ? ptPath : enPath;
    const theirs = file.startsWith('pt/') ? enPath : ptPath;
    const norm = p => (p === '' || p.endsWith('/') ? p + 'index.html' : p);
    if (norm(mine) !== norm(file))
      out.push({ file, line: 1, message: `its own hreflang points at ${mine}, not ${file}` });
    if (norm(theirs) !== norm(other))
      out.push({ file, line: 1, message: `hreflang for the other language points at ${theirs}, not ${other}` });

    /* Structural comparison, EN side only so each pair is reported once. */
    if (file.startsWith('pt/')) continue;
    const mineSrc = src;
    const theirSrc = stripComments(read(other));

    const a = cssShape(mineSrc), b = cssShape(theirSrc);
    for (const sel of a.keys())
      if (!b.has(sel)) out.push({ file: other, line: 1, message: `CSS rule "${sel}" exists in ${file} but not here` });
    for (const sel of b.keys())
      if (!a.has(sel)) out.push({ file, line: 1, message: `CSS rule "${sel}" exists in ${other} but not here` });
    for (const [sel, decls] of a)
      if (b.has(sel) && b.get(sel) !== decls)
        out.push({ file, line: 1, message: `CSS rule "${sel}" differs between ${file} and ${other}` });

    const ja = jsShape(mineSrc), jb = jsShape(theirSrc);
    if (ja.length !== jb.length) {
      out.push({ file, line: 1,
        message: `JavaScript structure differs: ${ja.length} statements in ${file}, ${jb.length} in ${other}` });
    } else {
      const first = ja.findIndex((t, i) => t !== jb[i]);
      if (first !== -1)
        out.push({ file, line: 1,
          message: `JavaScript differs from ${other} at statement ${first + 1}: "${ja[first].slice(0, 60)}" vs "${jb[first].slice(0, 60)}"` });
    }
  }
  return out;
}
