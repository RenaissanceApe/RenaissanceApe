/* Sand grain master tile (DESIGN.md, "Sand grain"): images/grain-tile-512.png.
 *
 *   node _tools/grain.mjs
 *
 * Run by hand; the output is committed. The seed is fixed, so the file is always the same.
 *
 * 512 × 512, grey + alpha. The grain is carried by the alpha channel: each pixel is either
 * white (lifts what is under it) or black (darkens it), and its alpha says by how much. Light
 * and dark balance out, so the tile adds texture without shifting the colour of the field.
 * Three layers, as the Brand Book describes: fine noise (1 px), coarse noise (2 px blocks) and
 * sparse 2 px specks. Every layer wraps at the edges, so the tile repeats with no seam.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const SIZE = 512;
const SEED = 512;
const FINE = 0.07;     // most a fine-noise pixel can add or remove (0–1 alpha)
const COARSE = 0.05;   // same for a coarse 2 px block
const SPECKS = 0.0006; // share of pixels that start a speck
const SPECK = 0.16;    // alpha of a speck
const STEP = 10;       // alpha is rounded to steps of this (0–255): the file compresses far better

function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const r = rng(SEED);

const v = new Float32Array(SIZE * SIZE);
for (let i = 0; i < v.length; i++) v[i] = (r() * 2 - 1) * FINE;
for (let y = 0; y < SIZE; y += 2) for (let x = 0; x < SIZE; x += 2) {
  const c = (r() * 2 - 1) * COARSE;
  for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) v[(y + dy) * SIZE + x + dx] += c;
}
for (let n = Math.round(SIZE * SIZE * SPECKS); n > 0; n--) {
  const x = Math.floor(r() * SIZE), y = Math.floor(r() * SIZE), s = r() < 0.5 ? -SPECK : SPECK;
  for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) v[((y + dy) % SIZE) * SIZE + (x + dx) % SIZE] = s;
}

/* Scanlines: one filter byte, then grey + alpha for each pixel. */
const raw = Buffer.alloc(SIZE * (1 + SIZE * 2));
for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
  const val = v[y * SIZE + x], at = y * (1 + SIZE * 2) + 1 + x * 2;
  raw[at] = val > 0 ? 255 : 0;
  raw[at + 1] = Math.min(255, Math.round(Math.abs(val) * 255 / STEP) * STEP);
}

function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type), data]);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32(body));
  return Buffer.concat([len, body, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0); ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; ihdr[9] = 4; // 8-bit, grey + alpha
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const out = path.resolve(import.meta.dirname, '..', 'images', 'grain-tile-512.png');
fs.writeFileSync(out, png);
console.log(`images/grain-tile-512.png  ${(png.length / 1024).toFixed(0)} KB`);
