/* Shared helpers for the site checks.
 *
 * Every check exports `run(ctx)` and returns an array of findings:
 *   { file, line, message }
 * An empty array means the check passed. Findings are printed by check.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';

/* The site root, read at call time rather than captured at import: the
   self-test points the checks at fixture directories, and a module-level
   const would freeze on whichever fixture was loaded first. */
const DEFAULT_ROOT = path.resolve(import.meta.dirname, '..', '..');
export const root = () =>
  process.env.SITE_ROOT ? path.resolve(process.env.SITE_ROOT) : DEFAULT_ROOT;

/* Directories never published, plus tooling. `_`-prefixed paths are skipped by
   Jekyll on GitHub Pages; see the README's host-dependencies note. */
const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'fonts', 'images']);
const isSkipped = name => SKIP_DIRS.has(name) || name.startsWith('_');

export function htmlFiles(from = root()) {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (isSkipped(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(path.relative(from, p));
    }
  })(from);
  return out.sort();
}

export const read = rel => fs.readFileSync(path.join(root(), rel), 'utf8');

export const lineOf = (src, index) => src.slice(0, index).split('\n').length;

/* Blank out regions whose contents must not be scanned as markup or CSS,
   preserving offsets and newlines so reported line numbers stay correct. */
export function blank(src, ranges) {
  const chars = src.split('');
  for (const [s, e] of ranges)
    for (let i = s; i < e && i < chars.length; i++)
      if (chars[i] !== '\n') chars[i] = ' ';
  return chars.join('');
}

export function regionsOf(src, tags) {
  const ranges = [];
  for (const tag of tags) {
    const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}\\s*>`, 'gi');
    let m;
    while ((m = re.exec(src))) {
      const inner = m.index + m[0].indexOf('>') + 1;
      ranges.push([inner, inner + m[1].length]);
    }
  }
  return ranges;
}

/* Comments are blanked before any scan: several pages document markup in them. */
export function stripComments(src) {
  const ranges = [];
  const re = /<!--[\s\S]*?-->/g;
  let m;
  while ((m = re.exec(src))) ranges.push([m.index, m.index + m[0].length]);
  return blank(src, ranges);
}

/* ── colour maths (WCAG 2.1) ─────────────────────────────────────────── */

export function parseColor(raw, vars = {}) {
  let s = String(raw).trim();
  for (let i = 0; i < 5 && s.includes('var('); i++)
    s = s.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g, (m, n, fb) =>
      vars[n] !== undefined ? vars[n] : fb !== undefined ? fb : m);
  s = s.trim();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3})$/i)))
    return { r: parseInt(m[1][0] + m[1][0], 16), g: parseInt(m[1][1] + m[1][1], 16),
             b: parseInt(m[1][2] + m[1][2], 16), a: 1 };
  if ((m = s.match(/^#([0-9a-f]{6})$/i)))
    return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16),
             b: parseInt(m[1].slice(4, 6), 16), a: 1 };
  if ((m = s.match(/^rgba?\(([^)]+)\)$/i))) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
    if (p.length < 3 || p.some(Number.isNaN)) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  const NAMED = { white: '#ffffff', black: '#000000' };
  if (NAMED[s.toLowerCase()]) return parseColor(NAMED[s.toLowerCase()]);
  return null;
}

export const composite = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});

const lum = c => {
  const f = v => (v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};

export function contrast(fg, bg) {
  const eff = fg.a < 1 ? composite(fg, bg) : fg;
  const [hi, lo] = [lum(eff), lum(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}
