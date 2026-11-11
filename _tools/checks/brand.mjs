/* Check 7 — the brand rules a stylesheet can break (DESIGN.md, Brand Book v1.2).
 *
 * Reads every declaration in base.css, site.css, fonts.css, each page's
 * <style> blocks (the <noscript> one included) and each inline style="…"
 * attribute, and fails on:
 *
 *   corners    `border-radius` (or a per-corner longhand) that is not `0` or
 *              `var(--radius)`; and `--radius` itself must be 0.
 *   shadows    `box-shadow` or `text-shadow` other than `none`, and
 *              `drop-shadow()` in a `filter`. Depth is blue steps and borders.
 *   blur       `blur()` in a `filter`, and any `backdrop-filter` but `none`.
 *   typefaces  `font-family` that is not exactly `var(--font-display)`,
 *              `var(--font-body)` or `inherit`, and the `font` shorthand
 *              (it carries a family) unless it is `inherit`. The two names
 *              are spelled out in two places only: the `--font-display` /
 *              `--font-body` tokens in base.css `:root`, which must start
 *              with 'Space Mono' and 'Inter', and the @font-face rules in
 *              fonts.css, which may declare those two families and no other.
 *   colours    a raw colour: a hex, a colour function (rgb, rgba, hsl, hsla,
 *              hwb, lab, lch, oklab, oklch, color) or a named colour.
 *
 * The colour rule is the narrowest one that is true of the site today:
 *
 *   Raw colours are written in one place: the custom properties of the
 *   `:root` block in base.css (the scales, and the few semantic tokens that
 *   have a value of their own). Every other colour, in base.css, site.css,
 *   fonts.css and the pages alike, is `var(--token)`, `transparent`,
 *   `currentColor` or `inherit`.
 *
 * So there is no allowance for rgb()/alpha forms of a token colour, in pages
 * or in the shared files: nothing uses one. Where a see-through colour is
 * needed the site uses `opacity`, and `color-mix()` over a `var()` passes
 * too. If a real case turns up, add a token to `:root` rather than an
 * exception here. A token-valued hex in a page (`#021829`) fails as well,
 * and the message names the token to use.
 *
 * Not read, on purpose (owner's decision D5: the service icons, the service
 * gradients and the existing inline icons stay as they are):
 *   - inline <svg> … </svg> in the pages: presentation attributes and any
 *     style inside it. Some icons have rounded caps (`stroke-linecap="round"`,
 *     `rx`) and they stay.
 *   - files in images/ and fonts/ (PNG icons, SVG gradients and patterns).
 *   - anything inside url(…), so a colour inside a data: URI passes (the
 *     select arrow in base.css carries `%23b8bec8`, the value of --gray-300:
 *     a token cannot be used inside a data: URI), and quoted strings.
 * Also out of scope: `font-style: italic` on display type, the one-green-
 * button rule and the 5 % green budget, which need eyes, not a parser.
 */
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import { htmlFiles, read, root, lineOf, stripComments, blank, regionsOf } from './lib.mjs';

export const name = 'brand';
export const title = 'Brand rules: square corners, no shadow or blur, two typefaces, token colours';

const SHARED_FILES = ['base.css', 'site.css', 'fonts.css'];
const FACES = ["'Space Mono'", "'Inter'"];
const FONT_TOKENS = { '--font-display': 'Space Mono', '--font-body': 'Inter' };
const FONT_OK = new Set(['var(--font-display)', 'var(--font-body)', 'inherit']);
const RADIUS_OK = new Set(['0', 'var(--radius)']);

/* The CSS named colours. `transparent`, `currentColor` and `inherit` are not
   in the list, so they pass. */
const NAMED = new Set(`aliceblue antiquewhite aqua aquamarine azure beige bisque black
blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral
cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen
darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon
darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink
deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro
ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo
ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen
lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen
magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen
mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream
mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid
palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum
powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown
seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen
steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow
yellowgreen`.split(/\s+/));

/* Named colours are looked for only where a colour can be written, so that an
   animation, grid area or font called `tan` or `snow` is not mistaken for one. */
const takesColour = prop =>
  prop.startsWith('--') ||
  /^(color|fill|stroke|background|border|outline|box-shadow|text-shadow|filter|backdrop-filter|column-rule|text-decoration|text-emphasis)\b/.test(prop) ||
  /-color$/.test(prop);

const HEX = /#[0-9a-f]{3,8}\b/i;
const COLOUR_FN = /\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i;

/* Quoted strings and url(…) are not CSS colours, whatever they contain. */
const bare = value => value
  .replace(/url\(\s*(?:"[^"]*"|'[^']*'|[^)]*)\s*\)/gi, 'url()')
  .replace(/"[^"]*"|'[^']*'/g, "''");

const hex6 = h => {
  let s = h.toLowerCase().replace('#', '');
  if (s.length === 3 || s.length === 4) s = s.split('').map(c => c + c).join('');
  return '#' + s.slice(0, 6);
};

/* hex → token name, from base.css :root, for the "use var(--x)" hint. */
function tokenNames() {
  const out = new Map();
  let css;
  try { css = postcss.parse(read('base.css')); } catch { return out; }
  css.walkRules(':root', rule => rule.walkDecls(/^--/, d => {
    const m = d.value.trim().match(/^#[0-9a-f]{3,8}$/i);
    if (m && !out.has(hex6(m[0]))) out.set(hex6(m[0]), d.prop);
  }));
  return out;
}

function checkDecl(decl, ctx) {
  const { file, line, where, tokens } = ctx;
  const out = [];
  const prop = decl.prop.toLowerCase();
  const value = decl.value.trim().replace(/\s*!important$/i, '');
  const lower = value.toLowerCase();
  const add = message => out.push({ file, line, message: `${message} (${where})` });

  const inFontFace = decl.parent?.type === 'atrule' && decl.parent.name === 'font-face';
  const inRoot = file === 'base.css' && decl.parent?.type === 'rule' && decl.parent.selector.trim() === ':root';
  const isToken = inRoot && prop.startsWith('--');

  // corners
  if (/^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/.test(prop) && !RADIUS_OK.has(lower))
    add(`${prop}: ${value} — corners are square: use 0 or var(--radius)`);
  if (prop === '--radius' && !/^0(px)?$/.test(lower))
    add(`--radius: ${value} — the radius token is 0`);

  // shadows and blur
  if ((prop === 'box-shadow' || prop === 'text-shadow') && lower !== 'none')
    add(`${prop}: ${value} — no shadows; use a border or a blue step`);
  if (/^(-webkit-)?filter$/.test(prop)) {
    if (/\bblur\(/.test(lower)) add(`${prop}: ${value} — no blur`);
    if (/\bdrop-shadow\(/.test(lower)) add(`${prop}: ${value} — no shadows`);
  }
  if (/^(-webkit-)?backdrop-filter$/.test(prop) && lower !== 'none')
    add(`${prop}: ${value} — no backdrop-filter`);

  // typefaces
  if (prop === 'font-family') {
    if (inFontFace) {
      if (file !== 'fonts.css') add('@font-face outside fonts.css');
      else if (!FACES.includes(value.replace(/"/g, "'")))
        add(`@font-face declares ${value} — the site has two typefaces, Space Mono and Inter`);
    } else if (!FONT_OK.has(lower)) {
      add(`font-family: ${value} — use var(--font-display) or var(--font-body)`);
    }
  }
  if (prop === 'font' && lower !== 'inherit')
    add(`font: ${value} — the shorthand carries a family; set font-family: var(--font-display) or var(--font-body) and the sizes on their own`);
  if (FONT_TOKENS[prop]) {
    const first = value.split(',')[0].trim().replace(/['"]/g, '');
    if (!isToken) add(`${prop} is defined outside base.css :root`);
    else if (first !== FONT_TOKENS[prop]) add(`${prop} starts with ${first}, not ${FONT_TOKENS[prop]}`);
  }

  // colours
  if (!isToken && !inFontFace) {
    const v = bare(value);
    const hex = v.match(HEX);
    const fn = v.match(COLOUR_FN);
    const named = takesColour(prop)
      ? (v.toLowerCase().match(/[a-z][a-z-]*/g) || []).find(w => NAMED.has(w)) : null;
    const raw = hex?.[0] || (fn && fn[0] + '…)') || named;
    if (raw) {
      const token = hex && tokens.get(hex6(hex[0]));
      add(`${prop}: ${value} — raw colour ${raw}; ` +
        (token ? `use var(${token})` : 'use a token from base.css :root (or transparent, currentColor, inherit)'));
    }
  }
  return out;
}

function checkCss(css, file, firstLine, where, tokens) {
  let ast;
  try { ast = postcss.parse(css); }
  catch (e) { return [{ file, line: firstLine + (e.line || 1) - 1, message: `CSS does not parse: ${e.reason || e.message} (${where})` }]; }
  const out = [];
  ast.walkDecls(d => out.push(...checkDecl(d,
    { file, line: firstLine + (d.source?.start?.line || 1) - 1, where, tokens })));
  return out;
}

export function run() {
  const findings = [];
  const tokens = tokenNames();

  for (const file of SHARED_FILES) {
    if (!fs.existsSync(path.join(root(), file))) continue;
    findings.push(...checkCss(read(file), file, 1, file, tokens));
  }

  for (const file of htmlFiles()) {
    const whole = read(file);
    /* Comments and scripts are not styles; inline <svg> is exempt (D5). */
    let src = stripComments(whole);
    src = blank(src, regionsOf(src, ['script']));
    /* The whole <svg> element goes, its opening tag included: an icon's own
       style="…" and presentation attributes are part of the icon. */
    const svgs = [];
    for (const s of src.matchAll(/<svg\b[\s\S]*?<\/svg\s*>/gi)) svgs.push([s.index, s.index + s[0].length]);
    src = blank(src, svgs);

    const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
    let m;
    while ((m = styleRe.exec(src))) {
      const start = m.index + m[0].indexOf('>') + 1;
      findings.push(...checkCss(m[1], file, lineOf(src, start), '<style>', tokens));
    }

    /* style="…" attributes, outside <style> blocks. A leading "x{" keeps
       postcss line numbers at 1 for a one-line attribute. */
    const body = blank(src, regionsOf(src, ['style']));
    const attrRe = /\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    while ((m = attrRe.exec(body))) {
      const css = `x{${m[1] ?? m[2]}}`;
      findings.push(...checkCss(css, file, lineOf(body, m.index), 'style attribute', tokens));
    }
  }
  return findings;
}
