/* Proves each check actually catches the thing it claims to catch.
 *
 * A check that never fires is worse than no check: it reports green and
 * everyone believes it. So for every check this builds two fixture sites —
 * one clean, one with a single deliberate defect — and asserts the check
 * passes the first and fails the second.
 *
 *   node _tools/selftest.mjs
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
];

let failed = 0, ran = 0;
for (const c of CASES) {
  ran++;
  const cleanDir = fixture(BASE);
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
