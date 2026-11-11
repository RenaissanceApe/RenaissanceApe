/* Brand patterns: Patch and Pixel Field (DESIGN.md, "Patterns, Texture & Iconography").
 *
 *   node _tools/patch.mjs              # rewrite the tiles in images/patterns/
 *   node _tools/patch.mjs --seed 12    # same, with another seed (it goes in the file name)
 *
 * Run by hand; the output is committed. The same seed always gives the same file.
 *
 * patch()      the generator exactly as DESIGN.md gives it: one SVG of w × h, not repeatable.
 * patchTile()  the same marks, seeds and orientations, but the grid wraps at the edges so the
 *              SVG can repeat as a CSS background with no seam, and neighbouring cells are
 *              merged into one path so the file stays small.
 * pixelField() the dot matrix: square dots on a square grid, at most 4% of them lit.
 */

import fs from 'node:fs';
import path from 'node:path';

/* Colours by their DESIGN.md token name. */
const BLUE_700 = '#021829';
const GREEN_500 = '#33fb31';
const PATTERN_TONE = '#03213a';

// ── From DESIGN.md, unchanged ────────────────────────────────────────────────
// Patch — returns an SVG string. cell in px; seed makes it reproducible.
const MARK = [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[0,2],[2,2],[3,2],[4,2],[0,3],[2,3],[0,4],[1,4],[2,4],[4,4]];
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function orient([x,y],k){if(k&4)x=4-x;for(let i=0;i<(k&3);i++)[x,y]=[4-y,x];return[x,y]}
export function patch(w,h,cell,fg,bg,seed=77){
  const r=rng(seed),cells=new Set(),cols=Math.ceil(w/(cell*4))+1,rows=Math.ceil(h/(cell*4))+1;
  for(let ty=0;ty<rows;ty++)for(let tx=0;tx<cols;tx++){const k=Math.floor(r()*8);
    for(const c of MARK){const[x,y]=orient(c,k);cells.add(`${tx*4+x},${ty*4+y}`)}}
  const rects=[...cells].map(s=>{const[x,y]=s.split(',').map(Number);return`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}"/>`}).join('');
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bg}"/><g fill="${fg}">${rects}</g></svg>`;
}
// ─────────────────────────────────────────────────────────────────────────────

/* A repeatable Patch tile of cols × rows marks (4-cell pitch, so 4·cols × 4·rows cells).
   Cells that fall past the right or bottom edge wrap round to the other side. */
export function patchTile(cols, rows, cell, fg, bg, seed = 77) {
  const r = rng(seed), W = cols * 4, H = rows * 4;
  const grid = Array.from({ length: H }, () => new Uint8Array(W));
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    const k = Math.floor(r() * 8);
    for (const c of MARK) { const [x, y] = orient(c, k); grid[(ty * 4 + y) % H][(tx * 4 + x) % W] = 1; }
  }
  let d = '';
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!grid[y][x]) continue;
    let n = 1; while (x + n < W && grid[y][x + n]) n++;
    d += `M${x} ${y}h${n}v1h-${n}z`;
    x += n;
  }
  const w = W * cell, h = H * cell;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><rect width="${w}" height="${h}" fill="${bg}"/><path fill="${fg}" transform="scale(${cell})" d="${d}"/></svg>\n`;
}

/* A repeatable Pixel Field tile of n × n dots. pitch = grid step, dot = dot size (both px). */
export function pixelField(n, pitch, dot, lit, unlit, bg, seed = 77, share = 0.035) {
  const r = rng(seed), size = n * pitch, o = (pitch - dot) / 2;
  const on = new Set();
  while (on.size < Math.floor(n * n * share)) on.add(Math.floor(r() * n * n));
  const dots = [...on].sort((a, b) => a - b)
    .map(i => `M${(i % n) * pitch + o} ${Math.floor(i / n) * pitch + o}h${dot}v${dot}h-${dot}z`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><defs><pattern id="d" width="${pitch}" height="${pitch}" patternUnits="userSpaceOnUse"><rect x="${o}" y="${o}" width="${dot}" height="${dot}" fill="${unlit}"/></pattern></defs><rect width="${size}" height="${size}" fill="${bg}"/><rect width="${size}" height="${size}" fill="url(#d)"/><path fill="${lit}" d="${dots}"/></svg>\n`;
}

if (import.meta.filename === path.resolve(process.argv[1] ?? '')) {
  const i = process.argv.indexOf('--seed');
  const seed = i > -1 ? Number(process.argv[i + 1]) : 77;
  if (!Number.isInteger(seed)) { console.error('--seed needs a whole number'); process.exit(1); }
  const out = path.resolve(import.meta.dirname, '..', 'images', 'patterns');
  fs.mkdirSync(out, { recursive: true });
  const files = {
    /* 20 × 12 marks at a 24 px cell: 1920 × 1152 px, each mark 120 px. */
    [`patch-tone-dark-s${seed}.svg`]: patchTile(20, 12, 24, PATTERN_TONE, BLUE_700, seed),
    [`patch-signal-dark-s${seed}.svg`]: patchTile(20, 12, 24, GREEN_500, BLUE_700, seed),
    /* Standard Pixel Field: 18 px grid, 4 px dots, 64 × 64 dots = 1152 px. */
    'pixel-field-standard-dark.svg': pixelField(64, 18, 4, GREEN_500, PATTERN_TONE, BLUE_700, seed),
  };
  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(out, name), svg);
    console.log(`images/patterns/${name}  ${(svg.length / 1024).toFixed(1)} KB`);
  }
}
