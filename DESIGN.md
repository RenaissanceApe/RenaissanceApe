---
version: alpha
name: Lumen-and-Pixel
description: Lumen and Pixel (L&P) is a live-event technical production studio in Porto. Its design language is dark-first and engineered — a deep navy field (#021829), one electric green accent (#33fb31) used at about 5% of any surface, Space Mono for everything that names and Inter for everything that explains, square corners everywhere, sand grain on every gradient, and a 5×5 pixel grid (the logo's own construction) as the module for patterns, icons, motion and layout. Two endorsed sub-brands, AVX (AV production copilot) and the Academy (professional education), share the system and differ only by glyph, native context and voice.

colors:
  # Blue — primary
  blue-100: "#dfe9f0"
  blue-300: "#82b2d7"
  blue-500: "#16598c"
  blue-700: "#021829"
  blue-900: "#00080e"
  # Green — accent
  green-100: "#dcf8dc"
  green-300: "#7ef67d"
  green-500: "#33fb31"
  green-700: "#576e20"
  green-900: "#273012"
  # Gray — neutral (cool-tinted; no pure white or black)
  gray-100: "#f0f1f3"
  gray-300: "#b8bec8"
  gray-500: "#6b7485"
  gray-700: "#2e3441"
  gray-900: "#0f141c"
  # Semantic aliases
  bg: "#021829"
  surface: "#00080e"
  surface-raised: "#16598c"
  accent: "#33fb31"
  accent-hover: "#7ef67d"
  accent-subtle: "#dcf8dc"
  text: "#f0f1f3"
  text-muted: "#b8bec8"
  text-subtle: "#6b7485"
  border: "#2e3441"
  nav-bg: "#dfe9f0"
  nav-text: "#021829"
  on-accent: "#021829"
  pattern-tone: "#03213a"
  # Light context
  bg-light: "#f0f1f3"
  surface-light: "#ffffff"
  text-light: "#021829"
  text-light-body: "#2e3441"
  border-light: "#dfe3e8"
  # Functional (not brand) — see Colors › Functional
  signal-error: "#b3261e"

typography:
  display-xl:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  display-lg:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  display-md:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  heading:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  lead:
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  button:
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  label:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.24em
    textTransform: uppercase
  data:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  wordmark:
    fontFamily: "'Space Mono', 'Courier New', monospace"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: 0.12em
    textTransform: uppercase

rounded:
  none: 0px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  section: 136px

components:
  nav-bar:
    backgroundColor: "{colors.nav-bg}"
    textColor: "{colors.nav-text}"
    typography: "{typography.body-sm}"
    height: 68px
    padding: "0 {spacing.3xl}"
    rounded: "{rounded.none}"
  nav-link:
    textColor: "{colors.nav-text}"
    typography: "{typography.body-sm}"
    activeIndicator: "2px {colors.accent} underline via ::after"
    rounded: "{rounded.none}"
  service-tab-nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    height: 52px
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    padding: "14px {spacing.lg}"
    rounded: "{rounded.none}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.on-accent}"
  button-primary-light:
    backgroundColor: "{colors.blue-700}"
    textColor: "{colors.gray-100}"
    typography: "{typography.button}"
    padding: "14px {spacing.lg}"
    rounded: "{rounded.none}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "{colors.gray-500}"
    typography: "{typography.button}"
    padding: "13px 23px"
    rounded: "{rounded.none}"
  button-text:
    textColor: "{colors.accent}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    padding: "{spacing.lg}"
    rounded: "{rounded.none}"
  card-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    padding: "{spacing.lg}"
    rounded: "{rounded.none}"
  card-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-light}"
    padding: "{spacing.lg}"
    rounded: "{rounded.none}"
  form-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
    focusBorderColor: "{colors.accent}"
    typography: "{typography.body-sm}"
    height: 44px
    padding: "0 {spacing.sm}"
    rounded: "{rounded.none}"
  tag:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.blue-700}"
    typography: "{typography.label}"
    padding: "5px 8px"
    rounded: "{rounded.none}"
  eyebrow:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  data-table:
    headerTypography: "{typography.label}"
    headerTextColor: "{colors.text-subtle}"
    bodyTypography: "{typography.body-sm}"
    valueTypography: "{typography.data}"
    rowBorder: "1px solid {colors.border}"
    rounded: "{rounded.none}"
  hero:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    typography: "{typography.display-xl}"
    padding: "{spacing.section} {spacing.3xl}"
    decoration: "Patch (signal or tone) or Signal Glow gradient + sand grain"
  footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body-sm}"
    padding: "{spacing.3xl} {spacing.3xl}"
  lower-third:
    backgroundColor: "{colors.bg}"
    accentBar: "{colors.accent}"
    nameTypography: "{typography.label}"
    roleTypography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  og-image:
    width: 1200px
    height: 630px
    backgroundColor: "{colors.bg}"
    decoration: "Signal Glow + sand grain"
    titleTypography: "{typography.display-md}"
  email-header:
    backgroundColor: "{colors.bg}"
    padding: "{spacing.md} {spacing.lg}"
  email-button:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    padding: "12px 20px"
    rounded: "{rounded.none}"
---

## Overview

Lumen and Pixel designs and directs the technical side of live events: lighting, show control, networks, video. The brand is written for people who already know what a DMX universe is. It earns trust the way a good production does — by being exact. Everything visual follows from one object: **the L&P mark, an L and a P resolved on a 5×5 grid of square cells, with one detached cell (the pixel)**. That cell is the module for every pattern, icon, animation and page grid.

The default environment is dark. Most surfaces begin on `{colors.blue-700}` (#021829), with type in `{colors.gray-100}` and a single electric green, `{colors.green-500}` (#33fb31), used for the one thing on the screen that matters most. Green is a signal, not a theme colour: about 5% of any surface, never more.

Two typefaces carry the duality of the practice. **Space Mono** names things — headlines, labels, numbers, codes, the wordmark. **Inter** explains things — sentences, UI copy, forms. Corners are square everywhere: no radius on buttons, cards, inputs, images or tags. Depth comes from blue steps and borders, never from shadows. Every gradient carries sand grain.

**Key characteristics**
- Dark navy field, one green accent at ~5%, cool grays for hierarchy. 75–80% blue-700 / 15–20% neutral / 5% green.
- Space Mono 700 for display and uppercase tracked labels (+0.24em); Inter 300–600 for everything else.
- `{rounded.none}` 0 px on every element. Square buttons on purpose: pills are the industry default and L&P does not use them.
- No drop shadows. No glows. No blur effects on the logo.
- Two patterns: **Patch** (the mark tiled into a maze — signature) and **Pixel Field** (dot matrix — quiet ground).
- Sand grain on every gradient and every full-bleed dark field.
- Motion is cell-by-cell and calibrated: 150–300 ms UI, 450–600 ms transitions, no bounces.

## Colors

### Brand & accent
- **Lime Green** (`{colors.green-500}` — `#33fb31`): the accent. Primary CTA fill, active nav underline, focus ring, logo on dark, the signal pixel on icons when live. One filled green button per viewport.
- **Soft Lime** (`{colors.green-300}` — `#7ef67d`): hover state of green elements only.
- **Mint Tint** (`{colors.green-100}` — `#dcf8dc`): tag fills and subtle highlights on light surfaces.
- **Olive** (`{colors.green-700}` — `#576e20`) and **Dark Sage** (`{colors.green-900}` — `#273012`): rare. Never for UI states.

### Surface (dark context — default)
- **Core Navy** (`{colors.blue-700}` — `#021829`): page background, `{colors.bg}`.
- **Jet Black** (`{colors.blue-900}` — `#00080e`): footer, deepest surfaces, cards on navy, AVX app background — `{colors.surface}`.
- **Mid Blue** (`{colors.blue-500}` — `#16598c`): raised panels — `{colors.surface-raised}`.
- **Pattern Tone** (`{colors.pattern-tone}` — `#03213a`): the only non-scale value — Patch drawn tone-on-tone on blue-700.
- **Dark Divider** (`{colors.gray-700}` — `#2e3441`): every border and table rule on dark — `{colors.border}`.

### Surface (light context — documents, email, Academy)
- Reverse the hierarchy: `{colors.gray-100}` background, `{colors.blue-700}` for type and structure, green only for active or accent elements. Cards are `#ffffff` on gray-100. Hairlines `{colors.border-light}`.
- **Obsidian (nav)** (`{colors.blue-100}` — `#dfe9f0`): the website nav bar background.

### Text
- `{colors.text}` gray-100 on dark; `{colors.text-muted}` gray-300 for subtitles; `{colors.text-subtle}` gray-500 for metadata only (it fails 4.5:1 for small text on blue-700 — never use it for body copy).
- On light: `{colors.text-light}` blue-700 for headings, `{colors.text-light-body}` gray-700 for body. gray-500 on gray-100 is 4.2:1: use it only for text ≥ 18 px; small labels on light use blue-500 or gray-700.

### Functional
The brand palette has no red. `{colors.signal-error}` (`#b3261e`) exists for form errors and "don't" markers only, always paired with an icon and a text label. It is a functional colour, not a brand colour. Status in AVX uses `{colors.blue-300}` (info/pending) and `{colors.green-500}` (ok/live). No other hues.

### Gradients (all from tokens, all with sand grain)
- **Blueprint**: blue-700 → blue-500, linear or radial. Section elevation.
- **Luminous Accent**: green-300 → green-500. High-impact CTAs only; counts toward the green budget.
- **Surface Elevation**: blue-900 → blue-700, top to bottom. Card and panel backgrounds.
- **Signal Glow**: green-500 radial at ≤ 42% over blue-700. Heroes and OG images.
- **Mixed Overlay**: blue-900 at 92% → 70% at 35% → 0% at 70%, running from the text edge. The only gradient allowed over photography.

### Print equivalents (confirm with a drawdown)
blue-700 → Pantone 296 C · blue-500 → 7462 C · blue-300 → 542 C · green-500 → 802 C (fluorescent; no close match exists, ΔE 8.2) · gray-900 / blue-900 → Black 6 C. Full table in Brand Book v1.2 §13.

## Typography

### Font family
1. **Space Mono** (Google Fonts, 400 / 700; self-host via `@fontsource/space-mono`). Display, headlines, labels, wordmark, data, code.
2. **Inter** (Google Fonts, 300–700; `@fontsource/inter`). Body, UI, nav, buttons, forms, email.

Fallbacks: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif` and `'Space Mono', 'Courier New', monospace`.

### Hierarchy

| Token | Face | Size / LH | Use |
|---|---|---|---|
| `{typography.display-xl}` | Space Mono 700 | 56 / 1.05 | Hero headline, cover |
| `{typography.display-lg}` | Space Mono 700 | 40 / 1.1 | Section dividers, page heroes |
| `{typography.display-md}` | Space Mono 700 | 28 / 1.15 | Section headlines, OG titles |
| `{typography.heading}` | Space Mono 700 | 19 / 1.2 | Card and block headlines |
| `{typography.lead}` | Inter 300 | 18 / 1.6 | Standfirst under a headline |
| `{typography.body-md}` | Inter 400 | 16 / 1.6 | Default body |
| `{typography.body-sm}` | Inter 400 | 14 / 1.55 | UI, tables, captions |
| `{typography.button}` | Inter 600 | 14 / 1 | Button labels |
| `{typography.label}` | Space Mono 700, caps, +0.24em | 11 / 1.3 | Eyebrows, section labels, table headers |
| `{typography.data}` | Space Mono 400 | 13 / 1.5 | Specs, timecode, addresses, prices |

### Principles
- **Space Mono names, Inter explains.** Never set a paragraph longer than two lines in Space Mono.
- **Uppercase only for tracked Space Mono labels.** Headlines are sentence case.
- **No italics in display.** Emphasis in a headline is colour: green-500 on dark, blue-500 on light.
- **Numbers are specific** ("32 channels", not "dozens"). In Inter tables use `font-variant-numeric: tabular-nums`.
- Eyebrow + headline + lead is the standard block: `{components.eyebrow}` → `{typography.display-*}` → `{typography.lead}`.

## Layout

### Spacing
Base unit 4 px. Tokens `{spacing.xxs}` 4 → `{spacing.section}` 136 px. Section padding on marketing pages is `{spacing.4xl}`–`{spacing.section}`; card interiors `{spacing.lg}`; inline gaps `{spacing.sm}`–`{spacing.md}`. The site uses a 136 px scroll-margin so anchors clear the sticky nav (68 px) plus the service tab nav (52 px).

### The Rail Grid
Five columns — one per cell of the mark. **Column 1 is the rail**: section label, page title, revision, page number, mark. Content spans columns 2–5.
- **Web ≥ 1024 px**: container max 1440 px, outer margin `{spacing.3xl}`, gutter `{spacing.lg}`. Rail is sticky.
- **640–1023 px**: rail collapses into a meta bar above the content.
- **< 640 px**: single column; meta bar becomes one label line.
- **A4 print**: margins 18 mm top/bottom, 15 mm left/right; 5 × 32 mm columns, 5 mm gutter.

### Composition
One focal point per view. Subject on a grid line, never centred by default. The mark appears once per composition, at a grid corner.

## Elevation & Depth

L&P has **no shadows**. Depth is built from three things:

| Level | Treatment | Use |
|---|---|---|
| 0 | `{colors.bg}` flat | Page field |
| 1 | `{colors.surface}` + 1 px `{colors.border}` | Cards, inputs, tables on dark |
| 2 | `{colors.surface-raised}` or Surface Elevation gradient | Highlighted panels, featured card |
| 3 | Blueprint / Signal Glow gradient + sand grain | Heroes, OG images, section openers |

On light: white cards on gray-100 with 1 px `{colors.border-light}` hairline. Hover elevation is a border change to `{colors.blue-300}` plus `translateY(-2px)`, never a shadow.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0 px | Everything: buttons, cards, inputs, tags, images, tooltips, avatars, modals |

The cell is the shape language. Icons use square caps and mitre joins; circles become squares or octagons. App icons are delivered as square artwork (the OS applies its own mask — never pre-round).

## Patterns, Texture & Iconography

### Patch (signature pattern)
The full mark (16 body cells + pixel) tiled on a **4-cell pitch** (neighbours share their edge row), each tile in one of 8 orientations (4 rotations × mirror) chosen by a seeded random generator. Record the seed in the asset name.

```js
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
```

| Mode | Foreground / ground | Use |
|---|---|---|
| Signal on dark | green-500 / blue-700 | Heroes, headers. One per page. |
| Tone on dark | `{colors.pattern-tone}` / blue-700 | Section openers, behind type |
| Signal on light | green-500 / white | Document headers only, ≤ 12% of the page |
| Tone on light | blue-100 / gray-100 | Behind body text in docs and email |
| Inverse | blue-700 / green-500 | Merch details, stickers |

Rules: type never sits on Signal mode; place the logo on a solid block cut out of the pattern with 1× clear space; one Patch per view; Patch never animates.

### Pixel Field (quiet ground)
Square dots, 1/5 of the cell, on a square grid; ≤ 4% of dots lit (green-500 on dark, blue-700 on light). Coarse 28/6 px, standard 18/4 px, fine 10/2 px. Used for empty states, card grounds, slide backgrounds.

### Sand grain
Monochrome, irregular grain over every gradient and full-bleed dark field: fine noise + 2× coarse noise + sparse 2 px specks. Web: layer the master tile `grain-tile-512.png` (luminance in alpha) over the gradient.

```css
.grain { background-image: url(/assets/grain-tile-512.png), radial-gradient(42% 60% at 70% 30%, rgb(51 251 49 / .32), transparent 70%), #021829;
         background-size: 512px 512px, cover, auto; }
```

### Icons — Signal Pixel
24 × 24 px canvas, 20 px live area, 2 px stroke, square caps, mitre joins, 2 × 2 px detail pixels, `currentColor`. Each icon may carry one **signal pixel** (`class="signal"`) that is `currentColor` at rest and `{colors.accent}` when the thing it represents is live. 16 px uses a hinted 1.5 px master without signal pixel. Vocabulary: `ICONS.md`. Third-party logos are never redrawn.

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances |
| `--ease-exit` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exits |
| `--ease-move` | `cubic-bezier(0.65, 0, 0.35, 1)` | A → B moves |
| `--ease-fade` | `linear` | Opacity and colour only |
| `--ease-step` | `steps(1, end)` | Cell-by-cell reveals |
| `--dur-snap` | 100 ms | Press feedback |
| `--dur-micro` | 150 ms | Hover, focus, colour |
| `--dur-control` | 250 ms | Menus, tabs, nav underline |
| `--dur-transition` | 450 ms | Sections, panels, lower thirds |
| `--dur-hero` | 600 ms | Page-level entrances |

- **Pixel Build** (default logo reveal): cells appear in scan order (A1→E1, row by row), 50 ms per cell, hard cut; pixel lands at 1100 ms with one 30 ms flicker. Plays once, then holds.
- **Cue GO** (show openers only): body in gray-700 for 450 ms, pixel flashes twice (60 ms), body cuts to green-500 at 650 ms.
- Section enter: fade + rise 10 px, 450 ms `--ease-enter`, 60 ms stagger in reading order, max 5 elements. Exit: fade only, 250 ms `--ease-exit`.
- `prefers-reduced-motion: reduce`: show final states, replace movement with ≤ 150 ms opacity, no loops.
- Never: bounce, overshoot, elastic, glow, blur, particles, parallax, animated patterns.

## Components

### Buttons
**`button-primary`** — `{colors.accent}` fill, `{colors.on-accent}` text, `{typography.button}`, padding 14 × 24 px, `{rounded.none}`. Hover → `{colors.accent-hover}` in 150 ms; press → `translateY(1px)`; focus → 2 px green outline, 3 px offset.
**`button-primary-light`** — on light UI and documents: blue-700 fill, gray-100 text.
**`button-secondary`** — transparent, 1 px gray-500 border, gray-100 text; hover → border and text green-500.
**`button-text`** — green-500 text, trailing "→" in Space Mono.
Email keeps `{components.email-button}` (green on white, square).

### Navigation
**`nav-bar`** — blue-100 background, blue-700 text and logo, 68 px, sticky. Links in `{typography.body-sm}` 500; active link gets a 2 px green-500 underline drawn by `::after` with `transform: scaleX()` over 250 ms. **`service-tab-nav`** — 52 px secondary bar on `{colors.surface}`, Space Mono labels.

### Cards & containers
**`card`** — surface + 1 px border, `{spacing.lg}` padding, square. Eyebrow → heading → body. **`card-raised`** for the one featured item. **`card-light`** — white on gray-100.

### Forms
**`form-input`** — 44 px tall, surface background, 1 px border, focus border green-500, label above in `{typography.label}`. Errors: `{colors.signal-error}` border + warning icon + message in Inter set in `{colors.text}` (the red is 3.1:1 on surface — enough for a border, not for text). Never colour alone.

### Data
**`data-table`** — header row in `{typography.label}` gray-500; values that are numbers, codes, addresses or timecode in `{typography.data}`; 1 px row borders; no zebra fills; no rounded cells.

### Brand surfaces
**`hero`** — blue-700 field with Patch (signal or tone) or Signal Glow + grain; eyebrow in green; headline `{typography.display-xl}`; lead in Inter 300; one green CTA + one secondary.
**`og-image`** — 1200 × 630, Signal Glow + grain, horizontal lockup top-left, page title in Space Mono 700, domain in Space Mono green bottom-right.
**`lower-third`** — green bar (1/5 of block height) + blue-700 block, name in Space Mono 700 caps, role in Inter; wipes in 450 ms.

## Brand Assets (inline SVG)

All three glyphs use `viewBox="0 0 5 5"`, one cell = 1 unit, one colour. Use `shape-rendering="crispEdges"`.

```html
<!-- Lumen and Pixel mark: body + detached pixel E5 -->
<svg viewBox="0 0 5 5" shape-rendering="crispEdges" role="img" aria-label="Lumen and Pixel">
  <path fill="#33fb31" d="M0 0h5v3H4V1H1v4H0z M2 2h1v3H1V4h1z M3 2h1v1H3z M4 4h1v1H4z"/>
</svg>

<!-- AVX slanted bolt (locked v1.2): D1 · B2 C2 · A3–E3 · C4 D4 · B5 -->
<svg viewBox="0 0 5 5" shape-rendering="crispEdges" role="img" aria-label="AVX">
  <path fill="#33fb31" d="M3 0h1v1H3z M1 1h2v1H1z M0 2h5v1H0z M2 3h2v1H2z M1 4h1v1H1z"/>
</svg>

<!-- Academy stair: C3 D3 · B4–D4 · A5–D5 + detached pixel E1 -->
<svg viewBox="0 0 5 5" shape-rendering="crispEdges" role="img" aria-label="Academy">
  <path fill="#021829" d="M2 2h2v3H0V4h1V3h1z M4 0h1v1H4z"/>
</svg>
```

Horizontal lockup: mark + stacked "LUMEN / AND / PIXEL" in `{typography.wordmark}`, stack height = mark height, gap = 0.26 × mark width. Clear space = 1× mark height. Minimum: lockup 128 px wide, mark alone 24 px.

## Sub-brands

Both arms inherit every token above. They differ only here:

| | Lumen and Pixel | AVX | Academy |
|---|---|---|---|
| Glyph | L–P mark | Slanted bolt | Stair |
| Endorsement | — | "A Lumen and Pixel product" | "A Lumen and Pixel school" |
| Native ground | `{colors.blue-700}` | `{colors.blue-700}` page, `{colors.blue-900}` chrome | `{colors.gray-100}` |
| Accent use | CTAs | Actions green-500; functional status and label colours (see AVX DESIGN.md) | Progress & completion green-500 |
| Body size | 16 px | 13–14 px (dense UI) | 16–18 px (long reading) |
| Patterns | Patch, Pixel Field | Pixel Field (empty states) | Patch Tone (covers, certificates) |
| Voice | Expert in repose | Operational, terse, second person | Instructor, patient, explains why |

**AVX** (the AV production copilot) is a product UI with its own `DESIGN.md` and design system: page on blue-700, top bar and phone tabs on blue-900, data in `{typography.data}`, three appearance themes (Show, Daylight, High contrast), functional status and label colours used only as text, chips and indicators. Empty states use Pixel Field. The app launch uses Pixel Build with the bolt (completes on B5).

**Academy** is light-first for reading: gray-100 ground, white cards, blue-700 type, module codes in Space Mono (`LX-101`), progress bars made of square segments, certificates A5 landscape with a navy rail and a verification code. No illustrations, no mascots.

Lockup for both: glyph + name in Space Mono 700 (0.6 × glyph height, +0.06em) + endorsement in Space Mono 400 caps (0.17 × glyph height, +0.18em). Glyphs never combine with the L&P mark in one lockup.

## Do's and Don'ts

### Do
- Start every surface on blue-700 (dark) or gray-100 (light) and keep green near 5%.
- Use one filled green button per viewport.
- Set names, labels and numbers in Space Mono; sentences in Inter.
- Keep every corner at 0 px.
- Put sand grain on every gradient and every full-bleed dark field.
- Build anything decorative from the 5×5 cell: Patch, Pixel Field, square icons.
- Show access, status and errors with a word or icon as well as a colour.

### Don't
- Don't round anything — no pills, no 4 px "soft" corners, no circular avatars.
- Don't add shadows, glows, blurs, bevels or glassmorphism.
- Don't give the logo's pixel a different colour from its body (v1.0 artwork with a brighter pixel is a bug).
- Don't rotate, mirror or outline the mark outside the Patch pattern.
- Don't introduce colours outside the scales; don't use green-700/900 for UI states.
- Don't put type directly on photography; use the Mixed Overlay.
- Don't use stock-event imagery (crowds, handshakes, bokeh); see Brand Book §08.
- Don't write marketing filler ("passionate", "seamless", "bespoke"); see Brand Book §10.

## Responsive Behavior

| Name | Width | Changes |
|---|---|---|
| Mobile | < 640 px | Single column; nav collapses to mark + menu icon (square overlay menu); rail → label line; 3-up → 1-up |
| Tablet | 640–1023 px | Rail → meta bar; 3-up → 2-up; service tab nav scrolls horizontally |
| Desktop | 1024–1439 px | Rail Grid active; sticky rail |
| Wide | ≥ 1440 px | Container caps at 1440 px; colour fields bleed edge to edge |

Touch targets ≥ 44 × 44 px (inputs 44 px, buttons ≥ 42 px tall + padding). Display sizes step down one token per breakpoint (display-xl → display-lg on tablet → display-md on mobile). Patterns keep cell size and crop; they never scale down below the fine size.

## Iteration Guide

1. Read this file and Brand Book v1.2 before designing; the book wins any conflict.
2. Work one component at a time; reference tokens by name (`{colors.accent}`), never raw hex.
3. Before shipping a view, check: green ≤ ~5%, one filled green button, all corners 0 px, no shadows, Space Mono/Inter split respected, contrast ≥ 4.5:1 for text.
4. For decoration, reach for Patch, Pixel Field or a grained gradient — never a new motif.
5. For a new icon, take its id from `ICONS.md` and follow the Signal Pixel spec.
6. For AVX or Academy work, apply the Sub-brands table and nothing else.
7. When this file changes, update the Brand Book changelog (§16) in the same change.
