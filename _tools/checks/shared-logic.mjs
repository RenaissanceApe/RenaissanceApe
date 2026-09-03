/* Check 5 — shared behaviour stays in site.js.
 *
 * The README says site.js owns scroll-reveal and the mobile menu and that the
 * logic must not be pasted back into a page. It was, into three pages.
 */
import { htmlFiles, read, lineOf, blank, regionsOf, stripComments } from './lib.mjs';

export const name = 'shared-logic';
export const title = 'Reveal and mobile-menu logic live only in site.js';

const BANNED = [
  [/\bnew\s+IntersectionObserver\b/g, 'IntersectionObserver — scroll-reveal belongs in site.js'],
  [/getElementById\(\s*['"]hamburger['"]\s*\)/g, 'mobile-menu toggle — belongs in site.js'],
  [/\bclassList\.toggle\(\s*['"]open['"]/g, 'mobile-menu open/close — belongs in site.js'],
  [/document\.body\.style\.overflow\s*=/g, 'scroll lock — belongs in site.js'],
];

export function run() {
  const out = [];
  for (const file of htmlFiles()) {
    const raw = stripComments(read(file));
    // Only inline <script> bodies; site.js itself is not an HTML file.
    const scripts = regionsOf(raw, ['script']);
    if (!scripts.length) continue;
    const onlyScripts = blank(raw, invert(raw.length, scripts));
    for (const [re, why] of BANNED) {
      let m; re.lastIndex = 0;
      while ((m = re.exec(onlyScripts)))
        out.push({ file, line: lineOf(raw, m.index), message: why });
    }
  }
  return out;
}

function invert(len, ranges) {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let at = 0;
  for (const [s, e] of sorted) { if (s > at) gaps.push([at, s]); at = Math.max(at, e); }
  if (at < len) gaps.push([at, len]);
  return gaps;
}
