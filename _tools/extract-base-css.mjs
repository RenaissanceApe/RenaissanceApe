/* Lift the shared design-system CSS out of the pages' inline <style> blocks
   into /base.css.
 *
 * base.css is linked immediately BEFORE each page's inline <style> — which is
 * where these rules already sat — so the cascade is unchanged: shared base,
 * then page-specific, then site.css last.
 *
 *   node _tools/extract-base-css.mjs           # rewrite base.css and the pages
 *   node _tools/extract-base-css.mjs --check   # report only, change nothing
 *
 * Re-running is safe: pages already carrying the <link> are handled, and rules
 * already lifted simply aren't found again.
 */

import postcss from 'postcss';
import fs from 'node:fs';
import path from 'node:path';

/* SITE_ROOT lets _tools/selftest.mjs point the extractor at a fixture site,
   so check 6 can be proven to fire like the other five. */
const ROOT = process.env.SITE_ROOT
  ? path.resolve(process.env.SITE_ROOT)
  : path.resolve(import.meta.dirname, '..');
const CHECK = process.argv.includes('--check');

/* ── Which selectors belong to the shared design system ──────────────────
   Curated rather than inferred, so the split stays reviewable. Each was
   verified to have exactly one variant across the pages that carry it — the
   one exception is `nav`, handled below. */
const NAV_BLOCK = [
  'nav', '.nav-logo', '.nav-logo-mark', '.nav-logo-text', '.nav-logo-top', '.nav-logo-btm',
  '.nav-links', '.nav-links a', '.nav-links a:hover',
  '.nav-links a.active,.nav-links a[aria-current="page"]',
  '.nav-links a.active::after,.nav-links a[aria-current="page"]::after',
  '.nav-actions', 'nav .nav-cta', 'nav .nav-cta:hover',
  '.lang-switch', '.lang-switch span', '.lang-switch a', '.lang-switch a:hover',
  '.lang-switch a.active', '.lang-switch a.active::after',
  '.nav-hamburger', '.nav-hamburger span',
  '.nav-hamburger.open span:nth-child(1)',
  '.nav-hamburger.open span:nth-child(2)',
  '.nav-hamburger.open span:nth-child(3)',
  '.mobile-menu', '.mobile-menu.open', '.mobile-menu ul', '.mobile-menu ul a',
  '.mobile-menu ul a:hover', '.mobile-menu .mobile-cta',
  '.mobile-lang-switch', '.mobile-lang-switch span', '.mobile-lang-switch a',
  '.mobile-lang-switch a.active',
];
const A11Y_BLOCK = ['.skip-link', '.skip-link:focus', ':focus-visible', '.sr-only'];
const FOOTER_BLOCK = ['footer', '.footer-inner', '.footer-logo', '.footer-social',
                      '.footer-social a', '.footer-social a:hover', '.footer-copy'];
const MISC_BLOCK = ['.reveal', '.reveal.visible', '.nav-quiz-link', '.nav-quiz-link:hover'];

const SHARED = ['*,*::before,*::after', ':root', 'html', 'a',
                ...NAV_BLOCK, ...A11Y_BLOCK, ...FOOTER_BLOCK, ...MISC_BLOCK];
const SHARED_SET = new Set(SHARED);

/* `body` is split: the declarations every page agrees on move to base.css,
   and a page's extras (min-height / flex) stay inline. */
const BODY_SHARED = [
  'padding-left:env(safe-area-inset-left)', 'padding-right:env(safe-area-inset-right)',
  'background:var(--blue-700)', 'color:var(--gray-100)',
  'font-family:var(--font-body)', 'font-size:16px', 'line-height:1.6',
  'overflow-x:hidden',
];

/* Only the nav/footer half of the 900px breakpoint is shared; the rest of each
   page's mobile layout stays where it is. */
const MQ900 = new Set(['nav', '.nav-links', '.nav-actions', '.nav-hamburger',
                       '.mobile-menu', '.mobile-lang-switch', 'footer', '.footer-inner']);

/* thank-you.html makes its nav sticky instead of fixed, and so never set
   left/right. base.css does set them, so those two pages restore the values
   they computed before — otherwise lifting `nav` would change them. */
const NAV_VARIANT_RESET = { 'left': 'auto', 'right': 'auto' };

// ── helpers ──────────────────────────────────────────────────────────────
const normSel = s => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([,>+~])\s*/g, '$1')
  .trim();

const declText = d => `${d.prop}: ${d.value}${d.important ? ' !important' : ''}`;
const normDecl = d =>
  `${d.prop.trim()}:${d.value.replace(/\s+/g, ' ').trim()}${d.important ? '!important' : ''}`;
const sigOf = rule => rule.nodes
  .filter(n => n.type === 'decl')
  .map(normDecl).sort().join(';');

const isMq900 = node =>
  node.type === 'atrule' && node.name === 'media' &&
  normSel(node.params).replace(/\s/g, '') === '(max-width:900px)';

// ── gather pages ─────────────────────────────────────────────────────────
function htmlFiles(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules' || e.name === '_tools') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const STYLE_RE = /<style>([\s\S]*?)<\/style>/;
const pages = htmlFiles(ROOT)
  .filter(f => STYLE_RE.test(fs.readFileSync(f, 'utf8')))
  .sort();

console.log(`pages with an inline <style>: ${pages.length}\n`);

// ── work out the canonical text of each shared rule ──────────────────────
const canon = new Map();        // selector -> {rule, sig, count}
const canonMq = new Map();      // selector -> rule (inside @media 900)
const variants = new Map();     // selector -> Set(sig)

for (const f of pages) {
  const css = fs.readFileSync(f, 'utf8').match(STYLE_RE)[1];
  const root = postcss.parse(css, { from: f });
  root.each(node => {
    if (node.type === 'rule') {
      const sel = normSel(node.selector);
      if (!SHARED_SET.has(sel)) return;
      const sig = sigOf(node);
      if (!variants.has(sel)) variants.set(sel, new Map());
      const v = variants.get(sel);
      v.set(sig, (v.get(sig) || 0) + 1);
      if (!canon.has(sel)) canon.set(sel, { rule: node, sig });
    } else if (isMq900(node)) {
      node.each(inner => {
        if (inner.type !== 'rule') return;
        const sel = normSel(inner.selector);
        if (MQ900.has(sel) && !canonMq.has(sel)) canonMq.set(sel, inner);
      });
    }
  });
}

// the majority variant wins where a selector has more than one
for (const [sel, v] of variants) {
  if (v.size === 1) continue;
  const winner = [...v.entries()].sort((a, b) => b[1] - a[1])[0][0];
  console.log(`  note: "${sel}" has ${v.size} variants — using the one on ${v.get(winner)} pages`);
  if (canon.get(sel).sig !== winner) {
    for (const f of pages) {
      const css = fs.readFileSync(f, 'utf8').match(STYLE_RE)[1];
      let found = null;
      postcss.parse(css, { from: f }).each(n => {
        if (n.type === 'rule' && normSel(n.selector) === sel && sigOf(n) === winner) found = n;
      });
      if (found) { canon.set(sel, { rule: found, sig: winner }); break; }
    }
  }
}

const missing = SHARED.filter(s => !canon.has(s));

/* A page is allowed to override base.css from its own <style> — that is what
   the stylesheet ordering is for, and thank-you.html uses it to make the nav
   sticky instead of fixed. So an inline rule only counts as duplication if
   base.css does not already say something *different* for that selector.
   Without this, a deliberate override reads as drift for ever. */
const baseCssPath = path.join(ROOT, 'base.css');
const baseSigs = new Map();
if (fs.existsSync(baseCssPath)) {
  postcss.parse(fs.readFileSync(baseCssPath, 'utf8')).each(n => {
    if (n.type === 'rule') baseSigs.set(normSel(n.selector), sigOf(n));
  });
}
const overrides = [];
for (const [sel, { sig }] of canon) {
  if (baseSigs.has(sel) && baseSigs.get(sel) !== sig) {
    overrides.push(sel);
    canon.delete(sel);
  }
}

/* How many shared rules are still sitting inline in a page. This line is
   parsed by _tools/checks/base-css.mjs, so keep the format stable. */
console.log(`EXTRACTABLE: ${canon.size}`);
if (overrides.length)
  console.log(`deliberate overrides (base.css already differs): ${overrides.join(', ')}`);

/* Nothing left inline is the healthy steady state: the extraction has already
   happened and base.css is current. It is not an error — but the emit path
   below rebuilds base.css *from the pages*, so with an empty canon it would
   crash (and with a partial one it would silently drop every rule that has
   already been lifted). Stop here in both cases. */
if (canon.size === 0) {
  console.log('base.css is current: no shared rules remain inline.');
  process.exit(0);
}

/* --check is report-only and must never reach the rebuild below. */
if (CHECK) {
  console.log('still extractable:');
  for (const sel of SHARED.filter(s => canon.has(s))) console.log(`  ${sel}`);
  console.log('(--check: nothing was written)');
  process.exit(0);
}

if (missing.length) {
  console.log(`  warning: never found ${missing.join(', ')}`);
  {
    console.error(
      '\nRefusing to rewrite base.css: only some shared rules were found inline.\n' +
      'Rebuilding from this state would drop the rules that are already in\n' +
      'base.css. Re-run with --check to see what is still extractable.');
    process.exit(2);
  }
}

// ── build base.css ───────────────────────────────────────────────────────
const out = [`/* ─── LUMEN AND PIXEL — SHARED BASE ────────────────────────────────────────
   The design system every page shares: tokens, reset, navigation, mobile
   menu, footer, and the accessibility primitives.

   Loaded BEFORE each page's inline <style>, which is exactly where these
   rules used to live — so a page can still override any of them inline, and
   site.css still has the last word.

   Generated by _tools/extract-base-css.mjs. Edit here, not in a page: this
   block used to be pasted into 20 files, which is how one page ended up
   fixed while the others stayed broken.
   ────────────────────────────────────────────────────────────────────────── */
`];

const emit = (sel) => {
  const { rule } = canon.get(sel);
  const decls = rule.nodes.filter(n => n.type === 'decl')
    .map(d => `  ${declText(d)};`).join('\n');
  out.push(`${rule.selector.replace(/\s+/g, ' ').trim()} {\n${decls}\n}`);
};

out.push('/* ── Reset, tokens, base elements ────────────────────────────────────── */');
['*,*::before,*::after', ':root', 'html'].forEach(emit);
out.push(`body {\n${BODY_SHARED.map(d => `  ${d.replace(':', ': ')};`).join('\n')}\n}`);
emit('a');

out.push('\n/* ── Navigation ──────────────────────────────────────────────────────── */');
NAV_BLOCK.forEach(emit);

out.push('\n/* ── Skip link, focus, screen-reader utilities ───────────────────────── */');
A11Y_BLOCK.forEach(emit);

out.push('\n/* ── Breakpoint: swap the desktop nav for the mobile menu ────────────── */');
const mqNav = ['nav', '.nav-links', '.nav-actions', '.nav-hamburger', '.mobile-menu', '.mobile-lang-switch']
  .filter(s => canonMq.has(s))
  .map(s => {
    const r = canonMq.get(s);
    const d = r.nodes.filter(n => n.type === 'decl').map(x => `${declText(x)};`).join(' ');
    return `  ${r.selector.trim()} { ${d} }`;
  });
out.push(`@media (max-width: 900px) {\n${mqNav.join('\n')}\n}`);

out.push('\n/* ── Footer ──────────────────────────────────────────────────────────── */');
FOOTER_BLOCK.forEach(emit);
const mqFoot = ['footer', '.footer-inner'].filter(s => canonMq.has(s)).map(s => {
  const r = canonMq.get(s);
  const d = r.nodes.filter(n => n.type === 'decl').map(x => `${declText(x)};`).join(' ');
  return `  ${r.selector.trim()} { ${d} }`;
});
if (mqFoot.length) out.push(`@media (max-width: 900px) {\n${mqFoot.join('\n')}\n}`);

out.push('\n/* ── Scroll reveal (driven by site.js) and nav quiz link ─────────────── */');
MISC_BLOCK.forEach(emit);

const baseCss = out.join('\n') + '\n';
if (!CHECK) fs.writeFileSync(path.join(ROOT, 'base.css'), baseCss);
console.log(`\nbase.css: ${(baseCss.length / 1024).toFixed(1)} KB, ` +
            `${canon.size} rules + ${canonMq.size} breakpoint rules`);

// ── strip the lifted rules from every page ───────────────────────────────
const BODY_SHARED_SET = new Set(BODY_SHARED.map(d => d.replace(/\s/g, '')));
let totalRemoved = 0, totalKb = 0;

for (const f of pages) {
  const src = fs.readFileSync(f, 'utf8');
  const css = src.match(STYLE_RE)[1];
  const root = postcss.parse(css, { from: f });
  let removed = 0;

  root.each(node => {
    if (node.type === 'rule') {
      const sel = normSel(node.selector);

      if (sel === 'body') {
        const keep = node.nodes.filter(n =>
          n.type !== 'decl' || !BODY_SHARED_SET.has(normDecl(n).replace(/\s/g, '')));
        if (keep.length === 0) { node.remove(); removed++; }
        else { node.nodes = keep; }
        return;
      }

      if (!SHARED_SET.has(sel)) return;

      if (sigOf(node) === canon.get(sel).sig) { node.remove(); removed++; }
      else if (sel === 'nav') {
        // a genuine variant: keep it, and restore what base.css would newly impose
        for (const [prop, value] of Object.entries(NAV_VARIANT_RESET)) {
          if (!node.nodes.some(n => n.type === 'decl' && n.prop === prop)) {
            node.append({ prop, value });
          }
        }
      }
      return;
    }

    if (isMq900(node)) {
      node.each(inner => {
        if (inner.type === 'rule' && MQ900.has(normSel(inner.selector))) {
          inner.remove(); removed++;
        }
      });
      if (node.nodes.length === 0) node.remove();
    }
  });

  const newCss = root.toString().replace(/\n{3,}/g, '\n\n').trim();
  let outSrc = src.replace(STYLE_RE, `<style>\n${newCss}\n</style>`);
  if (!outSrc.includes('/base.css')) {
    outSrc = outSrc.replace('<style>', '<link rel="stylesheet" href="/base.css" />\n<style>');
  }
  if (!CHECK) fs.writeFileSync(f, outSrc);

  totalRemoved += removed;
  totalKb += newCss.length / 1024;
  console.log(`  ${path.relative(ROOT, f).padEnd(38)} removed ${String(removed).padStart(3)} rules, ` +
              `inline CSS now ${(newCss.length / 1024).toFixed(1).padStart(5)} KB`);
}

console.log(`\nremoved ${totalRemoved} duplicated rules; ` +
            `inline CSS across all pages now ${totalKb.toFixed(1)} KB`);
if (CHECK) console.log('(--check: nothing was written)');
