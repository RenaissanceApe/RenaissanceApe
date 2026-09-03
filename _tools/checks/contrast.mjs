/* Check 4 — text contrast against WCAG AA.
 *
 * This is the check that stops the Field Notes bug returning a fourth time.
 *
 * It renders each page in headless Chromium and measures what the browser
 * actually computed. That matters: a first version of this check parsed the
 * CSS statically and reported 87 problems, of which about nine were real —
 * it could not tell that `.nav-links a` sits on a green button rather than
 * on the dark page background, so it flagged every piece of dark-on-light
 * chrome as 1.0:1. A check with a 90% false-positive rate is worse than no
 * check, because it trains people to ignore it.
 *
 * Measuring in the browser removes the guesswork entirely: the background is
 * whatever the ancestor chain actually paints, and the AA threshold comes
 * from each element's own computed font size and weight, so large text is
 * correctly held to 3:1 rather than 4.5:1.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { root, htmlFiles } from './lib.mjs';

export const name = 'contrast';
export const title = 'Text contrast meets WCAG AA (measured in a browser)';

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml' };

function serve() {
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\//, '');
    let file = path.join(root(), rel);
    try {
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, 'index.html');
      if (!file.startsWith(root()) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(fs.readFileSync(file));
    } catch { res.writeHead(500); res.end(); }
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}

/* Runs inside the page. Kept self-contained so it can be serialised. */
const MEASURE = () => {
  const parse = c => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a),
                            b: f.b * f.a + b.b * (1 - f.a), a: 1 });
  const lum = c => { const f = v => (v /= 255) <= 0.03928 ? v / 12.92
    : Math.pow((v + 0.055) / 1.055, 2.4);
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05); };
  const bgOf = el => {
    let acc = null;
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (!c || c.a === 0) continue;
      acc = acc ? over(acc, c) : c;
      if (acc.a === 1) return acc;
    }
    return acc && acc.a === 1 ? acc : null;
  };

  const out = [], seen = new Set();
  for (const el of document.querySelectorAll('*')) {
    const text = Array.from(el.childNodes).filter(n => n.nodeType === 3)
      .map(n => n.textContent.trim()).join(' ').trim();
    if (!text) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    let hidden = false;
    for (let n = el; n; n = n.parentElement)
      if (parseFloat(getComputedStyle(n).opacity) === 0) { hidden = true; break; }
    if (hidden) continue;
    const fg = parse(cs.color), bg = bgOf(el);
    if (!fg || !bg) continue;
    const px = parseFloat(cs.fontSize), wt = parseInt(cs.fontWeight, 10) || 400;
    const need = px >= 24 || (px >= 18.66 && wt >= 700) ? 3.0 : 4.5;
    const got = ratio(fg.a < 1 ? over(fg, bg) : fg, bg);
    if (got >= need) continue;
    const sel = el.tagName.toLowerCase() +
      (typeof el.className === 'string' && el.className.trim()
        ? '.' + el.className.trim().split(/\s+/).join('.') : '');
    const key = sel + '|' + cs.color + '|' + Math.round(px);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ sel, color: cs.color, px: Math.round(px * 10) / 10, need,
               got: Math.round(got * 100) / 100, sample: text.slice(0, 40) });
  }
  return out;
};

export async function run() {
  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch {
    return [{ file: '_tools/package.json', line: 1,
      message: 'playwright is not installed — run `npm ci` in _tools/' }];
  }

  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const out = [];
  let browser;
  try {
    /* CI installs its own matching browser via `playwright install chromium`.
       CHROMIUM_PATH lets a machine that already has one point at it instead. */
    browser = await chromium.launch(
      process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    for (const file of htmlFiles()) {
      // Redirect stubs navigate away the moment they load and carry no content
      // of their own. See the README's host-dependencies note.
      if (/http-equiv=["']refresh["']/i.test(fs.readFileSync(path.join(root(), file), 'utf8')))
        continue;
      const page = await ctx.newPage();
      try {
        await page.goto(`${base}/${file}`, { waitUntil: 'load', timeout: 20000 });
        await page.waitForTimeout(250);
        for (const f of await page.evaluate(MEASURE)) out.push({ file, ...f });
      } finally { await page.close(); }
    }
    await ctx.close();
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  /* One low colour in base.css is one bug, not 24. Group by cause so the
     report says what to fix rather than where it was seen. */
  const byCause = new Map();
  for (const f of out) {
    const key = `${f.sel}|${f.color}|${f.px}`;
    if (!byCause.has(key)) byCause.set(key, { ...f, files: [] });
    byCause.get(key).files.push(f.file);
  }
  return [...byCause.values()]
    .sort((a, b) => a.got - b.got)
    .map(c => ({
      file: c.files[0],
      line: 1,
      message: `${c.sel} — ${c.color} at ${c.px}px is ${c.got.toFixed(2)}:1, needs ${c.need}` +
        ` ("${c.sample}")` +
        (c.files.length > 1 ? ` — and ${c.files.length - 1} more page${c.files.length > 2 ? 's' : ''}` : ''),
    }));
}
