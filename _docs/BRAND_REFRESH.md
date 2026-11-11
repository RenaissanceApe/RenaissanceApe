# How the brand system works on the site

Built by the brand refresh (BR1–BR7, v1.56), which brought the site up to Brand Book v1.2.
`DESIGN.md` is the spec for every value; this page says where each part lives in the code and how
to use it. The owner's decisions behind it are D1–D11 and D22–D47 in [PENDING.md](PENDING.md).

## Tokens: the `:root` block of `base.css`

The only place a raw colour is written. Everything else uses `var(--token)`.

- **Colour scales** (brand constants): `--blue-*`, `--green-*`, `--gray-*`, steps 100–900.
- **Semantic colour**, named as in `DESIGN.md`; use these in new work, not the scales: `--bg`,
  `--surface`, `--surface-raised`, `--accent`, `--accent-hover`, `--accent-subtle`, `--text`,
  `--text-muted`, `--text-subtle`, `--border`, `--nav-bg`, `--nav-text`, `--on-accent`,
  `--pattern-tone`, the light-context set (`--bg-light`, `--surface-light`, `--text-light`,
  `--text-light-body`, `--border-light`) and `--signal-error` (form errors only).
- **Spacing:** `--space-xxs` (4 px) … `--space-4xl` (96 px), `--space-section` (136 px).
- **Corners:** `--radius: 0`.
- **Motion:** `--ease-enter`, `--ease-exit`, `--ease-move`, `--ease-fade`, `--ease-step`;
  `--dur-snap`, `--dur-micro`, `--dur-control`, `--dur-transition`, `--dur-hero`.
- **Type:** `--font-display` (Space Mono: names things) and `--font-body` (Inter: explains).

Small text on dark is `--text-muted`. `--text-subtle` fails WCAG AA under 24 px.

## Shared classes: `base.css`

The comment at the top of `base.css` is the index; each block has its own comment. A page uses
these and keeps only what is its own in its `<style>`.

| For | Classes |
|---|---|
| Buttons | `.btn-primary` (filled green), `.btn-secondary` (outlined), `.btn-text` (text with an arrow), `.btn-text-back` (arrow in front) |
| Display type | `.display-xl` (56 px), `.display-lg` (40 px), `.display-md` (28 px), `.heading` (19 px); the first two step down on smaller screens |
| Body type | `.lead` (Inter 300, 18 px); body text is the `body` default, 16 px / 1.6 |
| Small caps | `.eyebrow` (green, above a heading), `.tag` (mint pill), `.label` (the same type with no colour: tabs, filters, captions, back links) |
| Numbers | `.data` (dates, figures, codes), `.data-table` |
| Cards | `.card`, `.card-raised`; a card that is a link lifts 2 px with a blue border on hover; `.card-hover` gives the same lift to a card that only holds a link |
| Hero band | `.page-hero` with `.page-hero-inner`: one padding for every hero (96 px under the bar, 96 px below) |
| Forms | `.form-input`; the contact form and newsletter keep the class names in their markup (`.contact-form`, `.form-group`, `.newsletter-row` …), because form markup is part of `INTAKE.md` |
| Decoration | `.grain`, `.patch-tone`, `.pixel-field` (below) |
| Short nav | `.nav-home` ("Back to home" on the confirmation pages) |

Without a class: emphasis in a headline (`<em>` inside a `main` `h1` or `h2`) is green, never
italic; keyboard focus is a 2 px green outline, 3 px away; nav, mobile menu and footer are styled
here and their behaviour is in `site.js`.

## Assets and the scripts that make them

Each script is run by hand from the repo root and its output is committed. None adds a
dependency; none runs in CI. The header comment of each script is its manual.

| Script | Makes |
|---|---|
| `node _tools/patch.mjs` | `images/patterns/patch-tone-dark-s77.svg` (used by `.patch-tone`), `patch-signal-dark-s77.svg` (used nowhere yet), `pixel-field-standard-dark.svg` (used by `.pixel-field`). `--seed <n>` makes another Patch; the seed goes in the file name |
| `node _tools/grain.mjs` | `images/grain-tile-512.png` (used by `.grain`). Grain strength is the numbers at the top of the script |
| `node _tools/og.mjs` | `images/og-image.png` and `images/og/*.png`, 1200 × 630. Needs the grain tile and a browser (`CHROMIUM_PATH=…` if Playwright's is missing). A new article image is one line in `IMAGES` |

Patterns tile at their own size: cropped, never scaled. To use another file on one element, set
`--patch-image` or `--pixel-field-image` on it. The service gradients (`images/gradients/`), the
PNG service icons, the logo files and the favicon are not generated and stay as they are (D5).

## Decoration, page by page (D6)

| Page | Ground |
|---|---|
| Home | Hero: Signal Glow (a green radial glow on `--bg`, drawn in the page's CSS) + grain. Service cards and the closing banner: grain |
| Services, About, Resources, Field Notes hub | Hero band: `page-hero patch-tone grain`. Services' panels and closing banner: grain |
| Quiz | `patch-tone grain` on `<main>`: the quiz has no hero, so the Patch sits behind all of it |
| Field Notes articles and the template | Header: a grained gradient from `--surface` to `--bg`. No Patch behind reading text |
| 404, Thank you, Check your inbox | `pixel-field grain` |
| Legal | None |

Rules: one Patch per view, never animated; grain on every gradient and full-bleed dark field; one
filled green button per view in page content (the nav's "Get started" is not counted: D22).

## The two checks that guard it

Both run in `npm run check` and in CI; `node selftest.mjs` proves each still fires.

**`brand`** (`_tools/checks/brand.mjs`) reads `base.css`, `site.css`, `fonts.css`, every page's
`<style>` and every `style="…"` attribute. It fails on:

- a corner that is not `0` or `var(--radius)`;
- `box-shadow`, `text-shadow` or `drop-shadow()`; `blur()` or `backdrop-filter`;
- a typeface that is not `var(--font-display)`, `var(--font-body)` or `inherit`, the `font`
  shorthand, and a third `@font-face` family;
- a raw colour (hex, `rgb()`, `hsl()`, a named colour …) outside the `:root` block of
  `base.css`, even one that equals a token; the message names the token.

It lets through: `var(--token)`, `transparent`, `currentColor`, `inherit`, `color-mix()` over a
`var()`; and it does not read inline `<svg>`, the files in `images/` and `fonts/`, or anything
inside `url(…)`. For a see-through colour use `opacity`, or add a token to `:root`.

**`base-css`** (`_tools/checks/base-css.mjs`, list in `_tools/extract-base-css.mjs`) fails when
a rule that belongs to `base.css` (nav, menu, footer, tokens, and the shared classes above) sits
in a page's `<style>`. It lets through a page rule that adds something of its own to a shared
class (Legal narrows `.page-hero`, the 404 page spaces its eyebrow): a rule is a copy only when
every line in it is already in `base.css`. A new shared class is added to `base.css` by hand and
to the `BRAND_BLOCK` list in the script.

## The page recipe: checklist for any new page

Start from the page closest to the one you need (for an article,
`field-notes/article-template.html`), EN and PT together.

1. Stylesheet order as in README, "Shared files". Nav, menu and footer markup copied unchanged.
2. Colours, spacing and motion from tokens. No raw colour, no one-off value where a token fits.
3. Corners square: no `border-radius`, or `var(--radius)`.
4. Buttons, tags, cards, inputs, eyebrows, tables, dates: the shared classes. Don't restate them
   in the page; add to them only what the page needs.
5. Type from the scale: `.display-xl` once per page for the main headline, `.display-lg` /
   `.display-md` for sections, `.heading` for cards. Never a paragraph in Space Mono.
6. Opener: `.page-hero` with the ground the table above gives that kind of page, plus `.grain`.
7. Hover and focus as the shared classes give them. No shadows, glows or blurs. Never colour or
   hover as the only signal: pair it with a shape (the green pixel, a filled square, an underline).
8. One filled green button per view; green stays near 5% of a surface.
9. Check: `npm run check`; then a browser at 375 and 1440 px, EN and PT, menu open, and once with
   JavaScript off (CLAUDE.md, "A page or feature is done only when").
