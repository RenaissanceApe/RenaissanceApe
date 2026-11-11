# Upkeep 2: what it changed and how it works

Shipped as **v1.58** (UP0–UP4). It closed #37, #40 and #51 and discovery run 1's quick fixes
QF1–QF9 ([DISCOVERY.md](DISCOVERY.md)). The per-step detail is in `CHANGELOG.md`, v1.58. This page
keeps only what someone changing the site later needs to know.

## The release version on the shared files (#51)

- **Where it lives:** every page loads its four shared files with `?v=`:
  `/fonts.css?v=1.58`, `/base.css?v=1.58`, `/site.css?v=1.58`, `/site.js?v=1.58`. The redirect
  stubs (`articles/`, `pt/field-notes.html`) load none of them and are skipped.
- **When to bump it:** a release that changes `base.css`, `site.css`, `site.js` or `fonts.css`
  sets `?v=` to its own version on every page (CLAUDE.md "Releases and git", README "Shared
  files", PARALLEL.md release steps). A release that changes none of them may leave it alone.
- **How:** replace the old value on all pages at once, for example
  `grep -rl '?v=1.58' --include='*.html' . | xargs sed -i 's/?v=1\.58/?v=1.59/g'`, then
  `npm run check`. Update the example in README "Shared files" too.
- **The check:** `html-structure` (`_tools/checks/html-structure.mjs`) fails when a page loads
  one of the four files without `?v=`, or with a value different from the one most pages use.
  Two self-test cases in `_tools/selftest.mjs` prove it ("one page left on the previous release
  version", "a shared file loaded without ?v=").

## CI install step (UP0)

`.github/workflows/checks.yml` installs Chromium from Playwright's download host
(`npx playwright install chromium`), not from apt. The system libraries come in a separate step,
"Install Chromium system libraries": `apt-get update` plus `npx playwright install-deps chromium`,
each with a time limit, tried three times 20 s apart. If all three fail it prints a
`::warning::` and carries on with the runner's preinstalled libraries. A yellow warning there
means the Ubuntu mirror was down that day; if a library is really missing, the self-test and the
contrast check still fail.

## The quiz without JavaScript (UP1)

`quiz.html` and `pt/quiz.html` carry a `<noscript>` block after the result markup: one line
("The fit finder needs JavaScript." / "O questionário precisa de JavaScript.") and two buttons,
to `services.html` and `about.html#contact-form`, styled with the page's own result classes.
Question 1 still shows above it with buttons that do nothing (D70).

## The `?service=` allow-list (UP1)

`about.html` (and PT) has two separate pre-fill functions at the end of its inline script: one
sets the visible `#service` select, one the hidden `quiz_result`. Both use the value only when
`?service=` is one of the four keys of their `map` (`SD`, `SC`, `SA`, `TD`); anything else
leaves the field empty. A new quiz result code needs a new key in **both** maps, and in
`INTAKE.md` first.

## The 404 from any folder (UP2, UP4)

GitHub Pages serves the root `404.html` for every missing path, `/pt/nope` and
`/field-notes/nope` included. So every link, image, icon and manifest path in `404.html` and
`pt/404.html` is root-absolute (`/index.html`, `/images/…`, `/site.webmanifest`; PT `/pt/…`).
Keep it that way when editing either page: a relative path works at `/404.html` and breaks one
folder down. Locally, copy `404.html` into a folder and open it to test.

## The link-preview cards (UP4)

The three cards are JPEG, about 172 KB each: `images/og-image.jpg`,
`images/og/portugal-events-en.jpg`, `images/og/portugal-events-pt.jpg`. Every `og:image` and
`twitter:image` points at them; every page has `og:locale`, `og:locale:alternate` and an
`og:image:alt` describing its card. To regenerate them, or add an article's card (a line in
`IMAGES`), run from the repo root: `node _tools/og.mjs` (with `CHROMIUM_PATH=…` if Playwright's
browser isn't installed); run `_tools/grain.mjs` first if the grain tile changed. The old `.png`
cards are unused and stay until the owner says yes to deleting them (D68).
