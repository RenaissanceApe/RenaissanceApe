# Upkeep 2: defects fixed before the copy review

The plan for ROADMAP set **Upkeep 2** (UP1–UP4). It comes from discovery run 1 (v1.57): the
challenger's quick fixes QF1–QF9 in [DISCOVERY.md](DISCOVERY.md), plus three open
`ready-for-agent` issues: #51, #37 and #40. Agent-only: nothing here waits on facts from the owner.
The owner approves the few new words (listed per step) in the PR.

It runs first because it fixes real defects, needs no owner content, and touches pages the copy
review (CR2–CR5) will rewrite: done first, the rewrites start from fixed pages and no two sets
own a page at the same time.

Every QF below was re-checked against the code on `test` at `60d10cc` before it was written down.
All nine held. Two notes from that check are folded into the steps: QF5's `services.html` paths
are one level too deep in **both** languages (EN `../images/`, PT `../../images/`), and QF7's
JPEG treatment applies to all three generated cards, because one script (`_tools/og.mjs`) writes
them.

## Names every step relies on

- **Release version:** this set ships as **v1.58**. The cache-busting value (UP4) is `1.58`.
- **Steps:** UP1 quiz and about; UP2 404, confirmation pages, legal, services; UP3 Field Notes
  hub and Resources; UP4 head tags, caching, robots, OG images (every page's `<head>`).
- **Runs:** UP1, UP2 and UP3 together (no shared file) → UP4 alone, branched from `test` once the
  other three are merged. UP4 edits the `<head>` of every page, so it can't run beside a step that
  owns a page.

## Rules for every step

- **EN and PT together**, same structure, same ids. The parity check must stay green.
- **No form field, name, consent wording, honeypot or redirect changes, and no `INTAKE.md`
  change.** UP1 only stops the page from writing a value `INTAKE.md` doesn't allow.
- **New visible wording** is limited to what DISCOVERY.md names; each step lists its new words.
  Put them in the PR in a before/after table (EN and PT) for the owner's yes. Rewording existing
  text is the copy review's job, not this set's.
- **Nothing loads from another origin**; no new dependency.
- **No look changes**, except where a step says so. Check each changed page at 375 px and 1440 px
  in EN and PT, with the mobile menu open, and once with JavaScript off.
- **Shared files** (`base.css`, `site.css`, `site.js`, `fonts.css`, nav/menu/footer markup):
  only UP4 touches the shared-file URLs in each page's `<head>`. No step edits the shared files'
  contents.
- `cd _tools && npm run check` passes before each push; `node selftest.mjs` too in UP4 (it changes
  a check).

---

## UP1 · Quiz and About scripts

**Files:** `quiz.html`, `pt/quiz.html`, `about.html`, `pt/about.html`.
**Closes:** QF2, QF3, QF6, and the About part of QF5.

| What | Where | Change |
|---|---|---|
| **QF2** The quiz is blank without JavaScript | after the quiz markup, both quiz pages | A `<noscript>` block with one short line and two links: to `services.html` and to `about.html#contact-form` (PT: `services.html`, `about.html#contact-form` under `pt/`). Styled with the page's existing classes |
| **QF6** The result heading reads "TechnicalDirection" to screen readers | the four `nameHTML` strings, both quiz pages (EN `quiz.html:379–406`, PT `pt/quiz.html:300–…`) | A space before each `<br>` (`'Technical <br><em>Direction</em>'`). Looks the same |
| **QF3** `?service=` writes any text into the form | `about.html:377–401`, the two pre-fill functions (same in PT) | Use the value only if it is one of `SD`, `SC`, `SA`, `TD`; otherwise set nothing. Both the visible `<select>` and the hidden `quiz_result` (today `map[k]||k` lets anything through). This makes the page match `INTAKE.md` as written |
| **QF5** (About) Three `<label>`s with no control | `about.html:256, 260, 264` ("Based in", "Response time", "Works with clients"), same in PT | `<span class="label">` (or the element the page's CSS already styles the same way). Looks the same |

**New words for the owner's yes:** the `<noscript>` line, EN and PT. Suggested: "The fit finder
needs JavaScript. Read the four services, or tell us about your project." / "O questionário
precisa de JavaScript. Veja os quatro serviços ou fale-nos do seu projeto."

**Check:** with JavaScript off, the quiz shows the line and both links work. Open
`about.html?service=TD#contact-form`: Technical Direction is selected. Open
`about.html?service=<b>x</b>#contact-form` and submit nothing: the select stays on its
placeholder; in DevTools the hidden `quiz_result` is empty. Same in PT. A screen reader (or the
accessibility tree in DevTools) reads the result heading as "Technical Direction".

## UP2 · 404, confirmation pages, Legal, Services

**Files:** `404.html`, `pt/404.html`, `thank-you.html`, `pt/thank-you.html`,
`check-your-inbox.html`, `pt/check-your-inbox.html`, `legal.html`, `pt/legal.html`,
`services.html`, `pt/services.html`.
**Closes:** QF1, and the rest of QF5.

| What | Where | Change |
|---|---|---|
| **QF1** The 404 breaks below a folder | `404.html:6–10, 57–118` and `pt/404.html` | Every link, icon, manifest and logo path root-absolute: `/index.html`, `/images/…`, `/site.webmanifest`, `/services.html` …; in PT `/pt/index.html` … GitHub Pages serves the root `404.html` for any missing path (`/pt/nope`, `/field-notes/nope`), so relative paths resolve against the wrong folder there. The links check already resolves root-absolute paths |
| **QF5** No skip link or `main-content` target | `thank-you.html`, `check-your-inbox.html` (EN, PT) | The skip link the other pages carry (`<a href="#main-content" class="skip-link">`, PT wording as on the other PT pages) and `id="main-content"` on the page's main element |
| **QF5** Legal's tab bar sits outside every landmark | `legal.html:107` (`<div class="legal-tabs">`), same in PT | Make it `<nav class="legal-tabs" aria-label="…">`, keeping the class and `data-scrollspy` attributes so styles and behaviour don't change |
| **QF5** Service images one level too deep | `services.html:203–459` (`../images/…` → `images/…`); `pt/services.html:202–…` (`../../images/…` → `../images/…`) | Path fix only. They work today only because browsers drop a `..` that would leave the root |

**The 404's language.** Only the root `404.html` is ever served. It already links to `pt/404.html`
in its language switcher, which is enough; `pt/404.html` stays for parity. No exception to the
parity check and no two-language 404.

**New words for the owner's yes:** the Legal tab bar's `aria-label` (heard, not seen): "Legal
sections" / "Secções legais". The skip-link text copies the existing pages' wording, so it is not
new.

**Check:** with the site served locally (`python3 -m http.server 8000`), GitHub Pages' behaviour
can't be reproduced, so open `http://localhost:8000/404.html` and confirm every link and image,
then temporarily copy `404.html` to `field-notes/x.html` and open it: logo, icons and links still
resolve (delete the copy). Tab into each confirmation page: the first Tab shows the skip link and
Enter moves to the content. Legal and Services look exactly as before at 375 and 1440 px.

## UP3 · Field Notes hub and Resources

**Files:** `field-notes/index.html`, `pt/field-notes/index.html`, `resources.html`,
`pt/resources.html`.
**Closes:** QF4, #37, #40.

| What | Where | Change |
|---|---|---|
| **QF4** Article titles in the hub are `<div>`s | `.fn-item-title` (`field-notes/index.html:143`, and the commented example at `:131`), same in PT | `<h2 class="fn-item-title heading">`, same look (reset any heading margin the page CSS would add) |
| **#37** The active filter isn't announced | the three `.fn-filter` buttons and the inline filter script | `aria-pressed="true"` on the active button and `"false"` on the others, in the markup and in the click handler; `aria-live="polite"` on `#articleList` so the empty-state message is read out. Same in PT |
| **#40** The "Academy launching soon" button is a link to `#` | `resources.html` and PT, the Academy card's `resource-card-cta` | A `<span>` with the same classes (no `href`, not focusable), so it looks the same and does nothing. Remove the HTML comment above the card ("ACADEMY URL: Replace the href below…"): it is served on the public site |

The empty-filter message itself (#38) is not changed: its wording is the owner's (D44).

**New words for the owner's yes:** none.

**Check:** keyboard: Tab through the hub's filters; each says "pressed" or "not pressed" in the
accessibility tree, and the Case Studies filter's empty message is announced. On Resources the
Academy button can't be reached with Tab. Hub and Resources look the same at 375 and 1440 px.

## UP4 · Head tags, caching, robots, link-preview images

**Files:** the `<head>` of every page (EN and PT, Field Notes included; not the redirect stubs in
`articles/` and `pt/field-notes.html`, which load no stylesheet), `robots.txt`,
`_tools/og.mjs`, `images/og-image.jpg` and `images/og/*.jpg` (new),
`_tools/checks/html-structure.mjs`, `_tools/selftest.mjs`, `README.md` ("Shared files"),
`CLAUDE.md` ("Releases and git"), `_docs/PARALLEL.md` (the release worker's and the
Dispatcher's release steps).
**Closes:** #51, QF7, QF8, QF9.

| What | Change |
|---|---|
| **#51** New pages, old stylesheet for up to 4 hours after a release | Every page's four shared-file URLs carry the release version: `/fonts.css?v=1.58`, `/base.css?v=1.58`, `/site.css?v=1.58`, `/site.js?v=1.58`. **The value is the release's version** (this set ships as v1.58) |
| **#51** The check | `html-structure` (no new check, so "seven checks" stays true) fails when any page loads one of the four shared files without `?v=`, or with a value different from the other pages. Add a selftest case that breaks one page's version and expects the failure |
| **#51** The process | `CLAUDE.md` "Releases and git": a release that changes `base.css`, `site.css`, `site.js` or `fonts.css` sets `?v=` to its version on every page. `_docs/PARALLEL.md`: the same line in the release worker's steps, and in the Dispatcher's live-site check "request pages only, or add a throwaway query string to static files". `README.md`: the stylesheet-order example shows `?v=` |
| **QF7** Share tags | `og:locale` (`en_GB` on EN pages, `pt_PT` on PT) and `og:locale:alternate` (the other one) on every page that lacks them (22; the two articles have `og:locale` already, add the alternate). `pt/index.html:22` `og:url` → `https://www.lumenandpixel.com/pt/` (matches its canonical). `og:image:alt` that describes the card on every page (today "Lumen and Pixel") |
| **QF7** Card weight | `_tools/og.mjs` writes JPEG (Playwright `type: 'jpeg'`, quality about 85) to `images/og-image.jpg`, `images/og/portugal-events-en.jpg`, `images/og/portugal-events-pt.jpg`: same 1200×630 pictures, each about 150–250 KB instead of about 795 KB. Every `og:image` and `twitter:image` points at the `.jpg`. Compare old and new by eye before committing. The `.png` files stay in place: deleting assets needs the owner's yes (D68) |
| **QF8** Organisation data | The `Organization` JSON-LD block from `index.html:111–125` added to `pt/index.html`, with the PT description. `addressLocality` is **not** added in this set: the city waits on D61 |
| **QF9** Robots | `robots.txt`: remove the two `Disallow` lines (`/articles/`, `/pt/field-notes.html`) and the comment above them, so crawlers can read the redirect stubs and follow them |

**New words for the owner's yes:** the `og:image:alt` text, EN and PT. Suggested, for the site
card: "The Lumen and Pixel logo and the line “The creative is ready. Is the system?” on dark
blue" / "O logótipo da Lumen and Pixel e a frase “The creative is ready. Is the system?” sobre
azul-escuro" (the card is in English in both, D25); for the article cards, the same pattern with
their own line.

**Check:** `npm run check` and `node selftest.mjs` pass. `grep -L 'base.css?v=1.58'` over every
page lists only the two redirect stubs. Serve the site locally and
open three pages in EN and PT with DevTools → Network: each shared file is requested with
`?v=1.58` and returns 200. Open `images/og-image.jpg` beside the PNG at full size: same picture,
no visible banding in the green glow. `robots.txt` has no `Disallow`.

---

## After the set

- The release worker: the CHANGELOG section (v1.58), the roadmap row marked built, the four test
  lines in PENDING section 2 (the quiz with JavaScript off; a 404 below a folder; a link preview
  after release still shows; after the release, a page loads its stylesheet with `?v=1.58`).
- Close #37, #40 and #51 from the set's PR into `main`.
- From then on, every release that changes a shared file bumps `?v=` (CLAUDE.md, PARALLEL.md).
