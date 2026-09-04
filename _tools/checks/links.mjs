/* Check 2 — internal links and assets resolve.
 *
 * Resolution uses RFC 3986 semantics via `new URL()`, not filesystem
 * normalisation: browsers discard leading `..` that would escape the root,
 * and `path.normalize` does not. Getting this wrong previously produced a
 * false report of eight broken images on a page that was fine.
 */
import fs from 'node:fs';
import path from 'node:path';
import { root, htmlFiles, read, lineOf, stripComments } from './lib.mjs';

export const name = 'links';
export const title = 'Internal links and assets resolve';

const EXTERNAL = /^(https?:|mailto:|tel:|data:|javascript:|#)/i;

/* Placeholders that are documented as such inside the article templates. */
const PLACEHOLDER = /(^|\/)(SLUG|ARTICLE-SLUG)\.html(\?|#|$)/;

function exists(rel) {
  const p = path.join(root(), rel);
  if (!fs.existsSync(p)) return false;
  return fs.statSync(p).isDirectory() ? fs.existsSync(path.join(p, 'index.html')) : true;
}

export function run() {
  const out = [];
  for (const file of htmlFiles()) {
    const src = stripComments(read(file));
    const base = new URL('http://x/' + file.split(path.sep).join('/'));
    const re = /\s(?:href|src)\s*=\s*"([^"]*)"/g;
    let m;
    while ((m = re.exec(src))) {
      const ref = m[1].trim();
      if (!ref || EXTERNAL.test(ref) || PLACEHOLDER.test(ref)) continue;
      let target;
      try { target = new URL(ref, base); } catch { continue; }
      let rel = decodeURIComponent(target.pathname).replace(/^\//, '');
      if (rel === '') rel = 'index.html';
      if (!exists(rel))
        out.push({ file, line: lineOf(src, m.index), message: `${ref} → ${rel} does not exist` });
    }
  }
  return out;
}
