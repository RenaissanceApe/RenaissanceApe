/* Check 3 — EN/PT parity.
 *
 * Every English page has a Portuguese counterpart and vice versa, and each
 * declares an hreflang pair pointing at the other. The README states this
 * rule; nothing enforced it, and the quiz pages drifted anyway.
 */
import { htmlFiles, read, stripComments } from './lib.mjs';

export const name = 'parity';
export const title = 'EN/PT counterparts exist and cross-link';

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
  }
  return out;
}
