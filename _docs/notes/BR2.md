# BR2: brand assets

## Changelog
#### Added
- `images/patterns/patch-tone-dark-s77.svg` and `patch-signal-dark-s77.svg`: the Patch pattern
  (the mark tiled into a maze) in tone-on-dark and signal-on-dark, seed 77. Each is 1920 × 1152 px
  (24 px cell, marks 120 px) and repeats with no seam. Signal mode is used nowhere yet (D6).
- `images/patterns/pixel-field-standard-dark.svg`: the Pixel Field dot matrix (18 px grid, 4 px
  dots, 3.5% lit in green), 1152 × 1152 px, repeats with no seam.
- `images/grain-tile-512.png`: the sand grain tile (512 × 512, grain in the alpha channel, repeats
  with no seam), generated to the Brand Book description (D4).
- `_tools/patch.mjs`, `_tools/grain.mjs`, `_tools/og.mjs`: the scripts that make the files above
  and the OG images. Run by hand (`node _tools/patch.mjs`, `node _tools/grain.mjs`,
  `node _tools/og.mjs`); the output is committed. No new dependency.
- `images/hero-stage.png`: a copy of the stage photograph that used to be `og-image.png`, kept so
  the photo is not lost (see the question below).

#### Changed
- `images/og-image.png`, `images/og/portugal-events-en.png`, `images/og/portugal-events-pt.png`:
  redrawn to the `og-image` spec (1200 × 630, Signal Glow + grain, lockup top-left, title in Space
  Mono 700, domain in green bottom-right). Same file names, so no page changed. The article
  images keep their titles; the site image now reads "The creative is ready. Is the system?".

## Roadmap
BR2 built: Patch and Pixel Field tiles from a seeded generator, the sand grain tile, OG images to
spec. How it works: the header comment of each script in `_tools/`, and `_docs/BRAND_REFRESH.md`,
"Names every step relies on".

## Pending: test lines (section 2)
- Open the preview's home, services and 404 pages: is the grain the right strength? (Too strong or
  too faint is a one-number change in `_tools/grain.mjs`.)
- Paste a page link and the Portugal Events article link (EN and PT) into WhatsApp or LinkedIn
  after release: the new card should show. Old cards can stay cached for days.

## Pending: new questions (section 3)
- The site-wide OG image needs a title. Options: the home headline, a tagline of yours, or no
  title (lockup and domain only). Assumed: the home headline "The creative is ready. Is the
  system?", in English for both languages (one file serves EN and PT pages).
- The home hero used `images/og-image.png` (a stage photograph) as its background. D6 replaces
  that hero with Signal Glow + grain. Keep the photograph for later use, or delete it? Assumed:
  keep, as `images/hero-stage.png` (477 KB, used by nothing).
- Favicon and app icons: the mark's pixel is #00ff40 and its body #32ff32 (the Brand Book wants
  one colour, #33fb31). Supply corrected files, or have an agent redraw them from the mark in
  `DESIGN.md`? Assumed: nothing changed.

## Session prompt
BR2
