/* Proves each check actually catches the thing it claims to catch.
 *
 * A check that never fires is worse than no check: it reports green and
 * everyone believes it. So for every check this builds two fixture sites —
 * one clean, one with a single deliberate defect — and asserts the check
 * passes the first and fails the second.
 *
 *   node _tools/selftest.mjs
 *
 * The contrast test renders in a browser. Like the contrast check itself, it
 * uses the one named in CHROMIUM_PATH when that is set:
 *   CHROMIUM_PATH=/path/to/chrome node _tools/selftest.mjs
 *
 * A case may carry its own `clean` fixture (the brand cases do: their clean
 * site has a base.css with tokens, and everything the check must let through).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let bust = 0;
async function runCheck(mod, root) {
  process.env.SITE_ROOT = root;
  // Fresh module graph each time: ROOT is resolved at import.
  const m = await import(`./checks/${mod}.mjs?v=${++bust}`);
  return await m.run();
}

const PAGE = (body, style = '', head = '') => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>t</title>
<link rel="alternate" hreflang="en" href="https://www.lumenandpixel.com/a.html" />
<link rel="alternate" hreflang="pt" href="https://www.lumenandpixel.com/pt/a.html" />
${head}<style>body{background:#021829;color:#fff;}${style}</style></head>
<body>${body}</body></html>`;

const PT_PAGE = PAGE('<p>ok</p>').replace('lang="en"', 'lang="pt"');

function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-selftest-'));
  for (const [rel, content] of Object.entries(files)) {
    const p = path.join(dir, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
  return dir;
}

const BASE = { 'a.html': PAGE('<p>ok</p>'), 'pt/a.html': PT_PAGE };

/* ── The brand check's own clean site ────────────────────────────────────
   Everything the check must stay quiet on: the scales and the two typeface
   tokens in base.css :root, @font-face for the two families, var(--radius)
   and 0 corners, `box-shadow: none`, filters that are neither blur nor
   shadow, transparent / currentColor / inherit, a hex inside a data: URI, a
   named colour inside a quoted string, an animation called `tan`, and an
   inline SVG icon with rounded caps and its own fill (exempt: D5). */
const BRAND_BASE_CSS = `:root{--blue-700:#021829;--gray-100:#f0f1f3;--green-500:#33fb31;
--accent:var(--green-500);--radius:0;
--font-display:'Space Mono','Courier New',monospace;
--font-body:'Inter',system-ui,sans-serif;}
body{background:var(--blue-700);color:var(--gray-100);font-family:var(--font-body);}
.btn{border-radius:var(--radius);border:1px solid transparent;box-shadow:none;}
select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23b8bec8'/%3E%3C/svg%3E");}`;
const BRAND_FONTS_CSS = `@font-face{font-family:'Inter';src:url('/fonts/i.woff2') format('woff2');}
@font-face{font-family:'Space Mono';src:url('/fonts/s.woff2') format('woff2');}`;
const BRAND_PAGE = (style = '', body = '') => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><title>t</title>
<style>h1{font-family:var(--font-display);color:var(--accent);border-radius:0;}
p{font-family:inherit;color:currentColor;background:transparent;border-color:inherit;}
img{filter:invert(1) brightness(100);animation:tan 1s;}
p::after{content:'red #ff0000';}
@keyframes tan{from{opacity:0;}to{opacity:1;}}
${style}</style></head>
<body><h1 style="margin-top:12px;color:var(--accent)">ok</h1>
<svg viewBox="0 0 8 8" style="color:#ff0000"><rect rx="2" fill="#ffffff" stroke-linecap="round"/></svg>
${body}</body></html>`;
const BRAND_CLEAN = {
  'base.css': BRAND_BASE_CSS, 'fonts.css': BRAND_FONTS_CSS, 'site.css': '.hp{position:absolute;}',
  'a.html': BRAND_PAGE(), 'pt/a.html': BRAND_PAGE(),
};
const brandCase = (defect, bad) =>
  ({ check: 'brand', defect, clean: BRAND_CLEAN, bad: { ...BRAND_CLEAN, ...bad } });

/* Each case: a clean site that must pass, and a broken one that must fail. */
const CASES = [
  {
    check: 'html-structure',
    defect: 'an unclosed <div>',
    bad: { ...BASE, 'a.html': PAGE('<div><p>ok</p>') },
  },
  {
    check: 'html-structure',
    defect: 'a duplicate id',
    bad: { ...BASE, 'a.html': PAGE('<div id="x"></div><div id="x"></div>') },
  },
  {
    check: 'links',
    defect: 'a link to a page that does not exist',
    bad: { ...BASE, 'a.html': PAGE('<a href="nope.html">x</a>') },
  },
  {
    check: 'parity',
    defect: 'an English page with no Portuguese counterpart',
    bad: { ...BASE, 'orphan.html': PAGE('<p>ok</p>') },
  },
  {
    check: 'parity',
    defect: 'an hreflang pointing at the wrong page',
    bad: {
      ...BASE,
      'a.html': PAGE('<p>ok</p>').replace(
        'hreflang="pt" href="https://www.lumenandpixel.com/pt/a.html"',
        'hreflang="pt" href="https://www.lumenandpixel.com/pt/wrong.html"'),
    },
  },
  {
    check: 'shared-logic',
    defect: 'IntersectionObserver pasted into a page',
    bad: {
      ...BASE,
      'a.html': PAGE('<p>ok</p>', '', '') +
        '<script>var o=new IntersectionObserver(function(){});</script>',
    },
  },
  {
    check: 'shared-logic',
    defect: 'a mobile-menu toggle pasted into a page',
    bad: {
      ...BASE,
      'a.html': PAGE('<p>ok</p>') +
        '<script>document.getElementById("hamburger").onclick=function(){};</script>',
    },
  },
  {
    check: 'base-css',
    defect: 'a shared rule left inline in a page',
    bad: {
      ...BASE,
      'a.html': PAGE('<p>ok</p>',
        '.reveal{opacity:0;transform:translateY(20px);transition:opacity 0.6s,transform 0.6s;}'),
    },
  },
  {
    check: 'contrast',
    defect: 'body text at 3.2:1',
    bad: {
      ...BASE,
      'a.html': PAGE('<p class="dim">unreadable</p>',
        '.dim{color:rgba(255,255,255,0.35);font-size:12px;}'),
    },
  },
  brandCase('a rounded corner in a page',
    { 'a.html': BRAND_PAGE('.pill{border-radius:999px;}') }),
  brandCase('one rounded corner, by its longhand',
    { 'a.html': BRAND_PAGE('.tab{border-top-left-radius:3px;}') }),
  brandCase('a radius token that is not 0',
    { 'base.css': BRAND_BASE_CSS.replace('--radius:0', '--radius:4px') }),
  brandCase('a box-shadow in a page',
    { 'a.html': BRAND_PAGE('.card{box-shadow:0 4px 12px var(--blue-700);}') }),
  brandCase('a box-shadow in base.css',
    { 'base.css': BRAND_BASE_CSS + '.card{box-shadow:inset 0 -2px 0 var(--accent);}' }),
  brandCase('a drop-shadow filter',
    { 'a.html': BRAND_PAGE('img{filter:drop-shadow(0 2px 2px var(--blue-700));}') }),
  brandCase('filter: blur',
    { 'a.html': BRAND_PAGE('.glow{filter:blur(40px);}') }),
  brandCase('backdrop-filter',
    { 'a.html': BRAND_PAGE('.bar{-webkit-backdrop-filter:saturate(2);backdrop-filter:saturate(2);}') }),
  brandCase('a third typeface in a page',
    { 'a.html': BRAND_PAGE(".x{font-family:'Nunito',sans-serif;}") }),
  brandCase('a typeface named directly instead of through its token',
    { 'a.html': BRAND_PAGE(".x{font-family:'Inter',sans-serif;}") }),
  brandCase('a typeface in the font shorthand',
    { 'a.html': BRAND_PAGE('.x{font:700 12px Georgia,serif;}') }),
  brandCase('a third @font-face family',
    { 'fonts.css': BRAND_FONTS_CSS + "@font-face{font-family:'Nunito';src:url('/fonts/n.woff2');}" }),
  brandCase('a typeface token that no longer starts with its typeface',
    { 'base.css': BRAND_BASE_CSS.replace("--font-body:'Inter',", "--font-body:'Nunito',") }),
  brandCase('a hex colour in a page <style>',
    { 'a.html': BRAND_PAGE('.x{color:#ff8800;}') }),
  brandCase('a token-valued hex in a page (must be var())',
    { 'a.html': BRAND_PAGE('.x{background:#021829;}') }),
  brandCase('an rgba() colour in a page',
    { 'a.html': BRAND_PAGE('.x{border:1px solid rgba(255,255,255,0.2);}') }),
  brandCase('an hsl() colour in a gradient',
    { 'a.html': BRAND_PAGE('.x{background:linear-gradient(hsl(210 90% 8%),transparent);}') }),
  brandCase('a named colour in a page',
    { 'a.html': BRAND_PAGE('.x{border-bottom:1px solid white;}') }),
  brandCase('a raw colour in a style attribute',
    { 'a.html': BRAND_PAGE('', '<p style="color:#ff8800">x</p>') }),
  brandCase('a raw colour in the <noscript> style',
    { 'a.html': BRAND_PAGE('', '<noscript><style>.x{color:red;}</style></noscript>') }),
  brandCase('a raw colour in base.css outside :root',
    { 'base.css': BRAND_BASE_CSS + '.x{color:rgb(2 24 41 / 0.5);}' }),
  brandCase('a raw colour in site.css',
    { 'site.css': '.x{outline:2px solid #33fb31;}' }),
];

let failed = 0, ran = 0;
for (const c of CASES) {
  ran++;
  const cleanDir = fixture(c.clean || BASE);
  const badDir = fixture(c.bad);
  let cleanFindings, badFindings, err = null;
  try {
    cleanFindings = await runCheck(c.check, cleanDir);
    badFindings = await runCheck(c.check, badDir);
  } catch (e) { err = e; }

  const label = `${c.check}: ${c.defect}`;
  if (err) {
    console.log(`\x1b[31mERROR\x1b[0m ${label}\n   ${err.message.split('\n')[0]}`);
    failed++;
  } else if (cleanFindings.length) {
    console.log(`\x1b[31mFAIL\x1b[0m  ${label}`);
    console.log(`   fires on a clean fixture (${cleanFindings.length}): ${cleanFindings[0].message}`);
    failed++;
  } else if (!badFindings.length) {
    console.log(`\x1b[31mFAIL\x1b[0m  ${label}`);
    console.log('   does not fire on the broken fixture');
    failed++;
  } else {
    console.log(`\x1b[32m  ok\x1b[0m  ${label}`);
  }
  fs.rmSync(cleanDir, { recursive: true, force: true });
  fs.rmSync(badDir, { recursive: true, force: true });
}

console.log(failed ? `\n${failed} of ${ran} self-tests failed` : `\nall ${ran} self-tests passed`);
process.exit(failed ? 1 : 0);
