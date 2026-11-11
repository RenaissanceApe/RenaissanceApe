# BR1: foundations

## Changelog
#### Added
- **Inter, self-hosted.** Body text is now Inter 300–700 (one variable file each for latin and
  latin-ext, copied from the npm package `@fontsource-variable/inter` 5.3.0 into `fonts/`, with
  its licence in `fonts/inter-LICENSE.txt`). Nothing loads from another origin.
- **Design tokens in `base.css`.** Beside the colour scales (unchanged): semantic colours
  (`--bg`, `--surface`, `--accent`, `--text-muted`, `--nav-bg` …), spacing (`--space-xxs` …
  `--space-section`), `--radius: 0`, and motion (`--ease-*`, `--dur-*`), all as `DESIGN.md` names
  them.
- **Shared classes in `base.css`** for the page steps to use: `.btn-primary`, `.btn-secondary`,
  `.btn-text`, `.eyebrow`, `.tag`, `.card`, `.card-raised`, `.grain`, `.patch-tone`,
  `.pixel-field`, and type classes `.display-xl` (56 px), `.display-lg` (40 px), `.display-md`
  (28 px), `.heading`, `.lead`.
- **The current page is marked in the mobile menu** (`aria-current="page"` and a green pixel), the
  quiz link is marked as current on the quiz pages, and the active language carries
  `aria-current="true"`, in every page, EN and PT.

#### Changed
- **Navigation to spec:** solid `--nav-bg` bar (no blur), 68 px, links in Inter 14 px / 500, a
  2 px green underline that slides in over 250 ms, square "Get started" button and quiz link.
- **Mobile menu to spec:** a square overlay that covers the page below the bar and fades in; no
  blur, no rounded corners.
- **Footer to spec:** on `--surface` (Jet Black) with `--text-muted` text at 14 px.
- **Contrast: all nine findings of #16 fixed.** Footer text, the language switcher, the quiz link,
  the 404 error code, and the table notes and active tab on the services page now meet WCAG AA.
  No brand colour value changed.
- **Motion** uses the tokens; scroll reveal is a 10 px rise over 450 ms. With "reduce motion" on,
  only opacity and colour change, in at most 150 ms, and nothing loops.

#### Removed
- **Nunito** (`fonts/nunito-*.woff2`, its `@font-face` rules, and the `--font-body` value).

## Roadmap
BR1 built: Inter, tokens, shared classes, nav / mobile menu / footer to spec, nine contrast fixes.
How it works: the comment at the top of `base.css` and `_docs/BRAND_REFRESH.md`, "Names every
step relies on".

## Pending: test lines (section 2)
- On a phone, open the menu on the home page and on Services (EN and PT): it should cover the
  page, the current page should show a green square, and Escape / the X should close it.
- On a desktop, hover each nav link: a green line slides in under it; the current page keeps it.
- Read a long page (Services, a Field Note) and say if Inter reads well at body size.
- Turn on "reduce motion" in the OS and reload the home page: nothing should slide or loop.

## Pending: new questions (section 3)
- **Patch seed.** `.patch-tone` points at `/images/patterns/patch-tone-dark-s77.svg` (77 is the
  default seed in `DESIGN.md`). If BR2 made a different seed, change the one URL in `base.css` or
  set `--patch-image` on the element. Assumed: s77.
- **One filled green button per viewport.** The nav's "Get started" is filled green on every
  page, so any page with its own green button shows two. Options: make the nav button secondary
  (outlined), or count the nav as outside the rule. Assumed: left as it is.
- **Nav width.** `DESIGN.md` gives the bar 64 px side padding; it still lines up with the pages'
  1200 px column, because the Rail Grid is not in this set. Assumed: keep until the Rail Grid.

## Docs the release worker should update
- `README.md` line 52 and the gap table in `CLAUDE.md` still say the body typeface is Nunito.

## Session prompt
BR1
