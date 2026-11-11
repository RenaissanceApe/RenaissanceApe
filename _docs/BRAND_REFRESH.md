# Brand refresh (BR1–BR7)

Brings the site up to Brand Book v1.2, using `DESIGN.md` as the reference. Visual only: no copy is
rewritten, no page is added or removed, no form field changes, nothing loads from another origin.
The set also fixes the nine contrast failures CI reports today (#16) and gives the site the
tested semantic tokens #27 asks for.

The owner's decisions are D1–D11 in [PENDING.md](PENDING.md), section 3. Until one is answered,
its **assumed** answer applies.

## Runs

```
BR1 foundations  ┐                 BR3 home + small pages ┐
                 ├→ merged →       BR4 services, about    ├→ merged → BR7 sweep
BR2 assets       ┘                 BR5 quiz, resources    │
                                   BR6 Field Notes        ┘
```

BR1 is merged before BR2: `main` is red today, and BR1 is the step that makes the checks green.
BR2 then merges `origin/test` and goes green.

## Names every step relies on

BR1 and BR2 run at the same time and BR3–BR6 build on both, so these names are fixed here.

**Tokens** (in `base.css` `:root`, added beside the colour scales, which stay as they are):

- Semantic colour, named as in `DESIGN.md`: `--bg`, `--surface`, `--surface-raised`, `--accent`,
  `--accent-hover`, `--accent-subtle`, `--text`, `--text-muted`, `--text-subtle`, `--border`,
  `--nav-bg`, `--nav-text`, `--on-accent`, `--pattern-tone`, `--bg-light`, `--surface-light`,
  `--text-light`, `--text-light-body`, `--border-light`, `--signal-error`
- Spacing: `--space-xxs` … `--space-4xl`, `--space-section`
- `--radius: 0`
- Motion: `--ease-enter`, `--ease-exit`, `--ease-move`, `--ease-fade`, `--ease-step`,
  `--dur-snap`, `--dur-micro`, `--dur-control`, `--dur-transition`, `--dur-hero`
- Type: `--font-display` (Space Mono) and `--font-body` (Inter) keep their names

**Shared classes** (in `base.css`; where a page already has a class for the same thing, BR1 keeps
the existing name and lists it in the comment at the top of `base.css`): `.btn-primary`,
`.btn-secondary`, `.btn-text`, `.eyebrow`, `.tag`, `.card`, `.card-raised`, `.grain`,
`.patch-tone`, `.pixel-field`.

**Asset paths** (made by BR2, referenced by BR1's classes):

- `/images/grain-tile-512.png`
- `/images/patterns/patch-tone-dark-s<seed>.svg`, `/images/patterns/patch-signal-dark-s<seed>.svg`
- `/images/patterns/pixel-field-standard-dark.svg` (and `-coarse-`, `-fine-` if used)
- `/images/og-image.png` and `/images/og/*.png`, same file names as today
- `_tools/patch.mjs`: the generator from `DESIGN.md`, run by hand, output committed

## Rules for every step

- `DESIGN.md` is the spec. Grep it for the component you're changing.
- Small text never uses `--text-subtle` on dark: it fails AA. Use `--text-muted` (D2).
- One filled green button per viewport; green stays near 5% of a surface.
- No italics in display type; emphasis in a headline is colour.
- Patch: one per view, never animated, type never sits on Signal mode.
- Sand grain on every gradient and every full-bleed dark field.
- Existing reveal animation stays in `site.js`; durations and easings come from the motion tokens.
- The service gradients and PNG service icons in `images/` stay as they are (D5).
- Logo files are brand constants: BR2 checks that the mark's pixel has the body's colour and
  reports if it doesn't; it does not redraw.

## The page recipe (BR3–BR6)

For each page you own, EN and PT together:

1. Replace raw colours and one-off values in the page's `<style>` with tokens.
2. Corners: every `border-radius` becomes 0 (remove the declaration or use `var(--radius)`).
3. Buttons, tags, cards, inputs, eyebrows: use the shared classes; delete the page's own copies.
4. Type: sizes and weights from the `DESIGN.md` scale; Space Mono names, Inter explains.
5. Hero and section openers: the decoration D6 gives for that page, plus grain.
6. Hover and focus states to spec (border to `--blue-300` and `translateY(-2px)`; 2 px green
   focus outline, 3 px offset). No shadows, glows or blurs.
7. Check: `npm run check`; browser at 375 and 1440 px, EN and PT, menu open, JavaScript off;
   before and after screenshots of each page in the PR's *Tests run*.

Leave alone: copy, form fields, ids, page JavaScript logic, nav/menu/footer markup (BR1's).

## Steps

### BR1: foundations

Owns `base.css`, `site.css`, `site.js`, `fonts.css`, `fonts/`, and the nav, mobile-menu and
footer markup in every page.

- Inter 300–700, self-hosted (latin and latin-ext, from `@fontsource/inter` or
  `@fontsource-variable/inter`, files copied into `fonts/`); Nunito removed from `fonts.css`,
  `--font-body` and `fonts/` (D9). No request leaves the origin.
- Add the tokens and shared classes above.
- Nav, menu, footer to spec: `--nav-bg` bar at 68 px, 2 px green active underline via `::after`
  and `scaleX()` over `--dur-control`, square menu overlay, footer on `--surface`.
- Fix all nine contrast findings (#16), including the three in page CSS (`404.html` error code,
  `services.html` `em` and active tab, and their PT mirrors). The check must end green.
- Reduced motion: final states, ≤ 150 ms opacity, no loops.

### BR2: brand assets

Owns `images/` and `_tools/patch.mjs`. Changes no page and no stylesheet.

- `_tools/patch.mjs` from the generator in `DESIGN.md`; Patch tiles with the seed in the name.
- Pixel Field tile(s); sand grain tile (D4).
- OG images to spec (1200 × 630, Signal Glow + grain, lockup top-left, title in Space Mono 700,
  domain bottom-right), same file names, so no page changes.
- Check the logo, favicon and manifest icons against the "pixel same colour as body" rule; report.

### BR3–BR6: pages

The recipe above, on: BR3 `index`, `legal`, `404`, `thank-you`, `check-your-inbox` · BR4
`services`, `about` · BR5 `quiz`, `resources` · BR6 `field-notes/` (hub, article template,
articles). Each with its `pt/` mirror. The redirect stubs are not touched.

### BR7: sweep

Owns `_tools/checks/`, `_tools/selftest.mjs`, `CLAUDE.md`, `README.md`, and any page for leftovers
only.

- New `brand` check with a selftest fixture: no `border-radius` other than 0, no `box-shadow`,
  `filter: blur` or `backdrop-filter`, no font family other than the two, no colour outside the
  token scales in page CSS.
- Rules that pages kept inline because they needed a shared class (listed in BR3–BR6's *Found,
  not changed*) move to `base.css`; `extract-base-css.mjs --check` is clean.
- `CLAUDE.md`: remove the closed rows from the gap table; README: fonts and checks tables.
