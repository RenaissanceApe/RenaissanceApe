/* Check 1 — HTML structure: unbalanced container tags and duplicate ids.
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
export const title = 'HTML structure (tag balance, duplicate ids)';

export function run() {
  const out = [];
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
  }
  return out;
}
