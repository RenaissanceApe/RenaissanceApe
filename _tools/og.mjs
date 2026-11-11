/* Open Graph images to the DESIGN.md `og-image` spec: 1200 × 630, Signal Glow + sand grain,
 * horizontal lockup top-left, title in Space Mono 700, domain in green bottom-right.
 *
 *   node _tools/og.mjs
 *   CHROMIUM_PATH=/path/to/chrome node _tools/og.mjs    # if Playwright's browser isn't installed
 *
 * Written as JPEG (quality 85): the same picture at about a quarter of the PNG weight.
 * Run by hand; the output is committed. Run grain.mjs first: the images use its tile.
 * To add an article image, add a line to IMAGES and run again. Use <br> for a line break.
 *
 * Nothing is fetched: the font comes from fonts/ and the grain from images/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');

const IMAGES = [
  { file: 'images/og-image.jpg', title: 'The creative is ready.<br>Is the system?' },
  { file: 'images/og/portugal-events-en.jpg', title: 'The stage is not eligible.<br>The poster is.' },
  { file: 'images/og/portugal-events-pt.jpg', title: 'O palco não é elegível.<br>O cartaz é.' },
];

const b64 = f => fs.readFileSync(path.join(ROOT, f)).toString('base64');
const face = (file, range) => `@font-face{font-family:'Space Mono';font-weight:700;
  src:url(data:font/woff2;base64,${b64(file)}) format('woff2');unicode-range:${range};}`;

/* Mark: 70 px (14 px per cell). Wordmark: three lines that together are as tall as the mark;
   gap = 0.26 × mark width (DESIGN.md, "Brand Assets"). */
const html = title => `<!doctype html><meta charset="utf-8"><style>
${face('fonts/space-mono-700-normal-latin.woff2', 'U+0000-00FF')}
${face('fonts/space-mono-700-normal-latin-ext.woff2', 'U+0100-02FF')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;position:relative;overflow:hidden;color:#f0f1f3;
  font-family:'Space Mono',monospace;font-weight:700;
  background-image:url(data:image/png;base64,${b64('images/grain-tile-512.png')}),
    radial-gradient(42% 60% at 70% 30%, rgb(51 251 49 / .32), transparent 70%);
  background-color:#021829;background-size:512px 512px,cover;}
.lockup{position:absolute;left:72px;top:72px;display:flex;gap:18.2px;color:#33fb31}
.lockup svg{width:70px;height:70px;display:block}
.lockup p{font-size:20.83px;line-height:1.12;letter-spacing:.12em;text-transform:uppercase}
h1{position:absolute;left:72px;right:72px;top:50%;transform:translateY(-50%);
  font-size:64px;line-height:1.15;letter-spacing:0}
.domain{position:absolute;right:72px;bottom:64px;font-size:22px;line-height:1;color:#33fb31}
</style>
<div class="lockup"><svg viewBox="0 0 5 5" shape-rendering="crispEdges"><path fill="#33fb31" d="M0 0h5v3H4V1H1v4H0z M2 2h1v3H1V4h1z M3 2h1v1H3z M4 4h1v1H4z"/></svg><p>Lumen<br>and<br>Pixel</p></div>
<h1>${title}</h1>
<p class="domain">lumenandpixel.com</p>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const { file, title } of IMAGES) {
  await page.setContent(html(title));
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(ROOT, file);
  await page.screenshot({ path: out, type: 'jpeg', quality: 85 });
  console.log(`${file}  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
await browser.close();
