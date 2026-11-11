/* Check 1 — HTML structure: unbalanced container tags, duplicate ids, and the
 * release version on the shared-file URLs.
 *
 * An unclosed <div> is not theoretical here: it shipped twice, and both times
 * it nested the page's own content inside the mobile menu, which is
 * display:none above 900px. Two PT pages rendered blank in production.
 */
import { htmlFiles, read, lineOf, blank, regionsOf, stripComments } from './lib.mjs';

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link',
  'meta','param','source','track','wbr']);

/* Containers whose close tag is mandatory in practice. Elements with optional
   end tags (li, p, td, option …) are deliberately excluded: browsers close
   them implicitly, so tracking them produces false positives, not bugs. */
const TRACK = new Set(['html','head','body','div','section','main','nav','footer',
  'header','article','aside','form','ul','ol','table','button','select','figure',
  'figcaption','blockquote','fieldset','details','dialog','picture','video','audio',
  'svg','label','a','span','h1','h2','h3','h4','h5','h6','pre','textarea','noscript',
  'address','time','strong','em']);

export const name = 'html-structure';
export const title = 'HTML structure (tag balance, duplicate ids, shared-file version)';

/* The four shared files carry the release version (`/base.css?v=1.58`) so a
   release reaches visitors whose browser cached the previous one (#51). Every
   page must ask for the same version; a page left behind would get yesterday's
   stylesheet. Pages that load none of them (the redirect stubs) are skipped. */
const SHARED = /\s(?:href|src)\s*=\s*"(?:\.\.\/)*\/?((?:fonts|base|site)\.css|site\.js)(?:\?([^"]*))?"/g;

export function run() {
  const out = [];
  const versions = [];
  for (const file of htmlFiles()) {
    const raw = read(file);
    // Script/style bodies contain `<` inside strings and CSS; never scan them.
    const src = blank(stripComments(raw), regionsOf(raw, ['script', 'style', 'textarea']));

    const stack = [];
    const tag = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g;
    let m;
    while ((m = tag.exec(src))) {
      const [full, closing, rawName, attrs] = m;
      const el = rawName.toLowerCase();
      if (!TRACK.has(el)) continue;
      if (VOID.has(el) || attrs.trimEnd().endsWith('/')) continue;
      if (closing) {
        const i = stack.map(f => f.el).lastIndexOf(el);
        if (i === -1) {
          out.push({ file, line: lineOf(src, m.index), message: `stray </${el}>` });
        } else {
          for (const f of stack.slice(i + 1))
            out.push({ file, line: f.line,
              message: `<${f.el}> is never closed (still open at </${el}> on line ${lineOf(src, m.index)})` });
          stack.length = i;
        }
      } else {
        stack.push({ el, line: lineOf(src, m.index) });
      }
    }
    for (const f of stack)
      out.push({ file, line: f.line, message: `<${f.el}> is never closed` });

    const seen = new Map();
    const id = /\sid\s*=\s*"([^"]+)"/g;
    while ((m = id.exec(src))) {
      const v = m[1];
      if (seen.has(v))
        out.push({ file, line: lineOf(src, m.index),
          message: `duplicate id "${v}" (first used on line ${seen.get(v)})` });
      else seen.set(v, lineOf(src, m.index));
    }

    SHARED.lastIndex = 0;
    while ((m = SHARED.exec(src))) {
      const v = /^v=([^&]+)$/.exec(m[2] || '');
      const line = lineOf(src, m.index);
      if (!v) out.push({ file, line, message: `${m[1]} is loaded without ?v=<release version>` });
      else versions.push({ file, line, shared: m[1], v: v[1] });
    }
  }

  // The version most pages use is the release; anything else is left behind.
  const count = new Map();
  for (const x of versions) count.set(x.v, (count.get(x.v) || 0) + 1);
  const release = [...count].sort((a, b) => b[1] - a[1])[0]?.[0];
  for (const x of versions)
    if (x.v !== release)
      out.push({ file: x.file, line: x.line,
        message: `${x.shared}?v=${x.v} differs from the other pages' ?v=${release}` });
  return out;
}
