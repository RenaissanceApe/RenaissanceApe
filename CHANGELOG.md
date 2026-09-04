# Lumen and Pixel — Website Changelog

Tracks locked-in changes to lumenandpixel.com.
Brainstorming and exploratory discussions are excluded.
Format: version → date → what changed and why.

---

## v1.51 — September 2026

### Tab scroll-spy moved into site.js (issue #11)

The issue reported `IntersectionObserver` pasted back into `legal.html`,
`pt/legal.html` and `services.html`, against the README rule that `site.js`
owns scroll-reveal.

Reading it before deleting it, as the issue asked: **it is not reveal logic.**
It is tab scroll-spy, which highlights the section nav as you scroll, and
`site.js` does not provide it. Deleting the three copies would have removed a
working feature from three pages.

The real problem was that the same feature existed three times and had already
drifted:

| | `legal.html` | `pt/legal.html` | `services.html` |
|---|---|---|---|
| variable | `obs` | `obs` | `sobs` |
| formatting | expanded | minified | minified |
| `rootMargin` | `-20% 0px -65% 0px` | `-20% 0px -65% 0px` | `-30% 0px -60% 0px` |
| `threshold` | `0.05` | `0.05` | none |

A translated pair carrying the same behaviour in two different shapes is the
exact drift this audit keeps finding.

It now lives once in `site.js`, opted into with `data-scrollspy` on the tab
strip. Sections come from the tab anchors' own `#fragment` hrefs rather than a
second hardcoded list, so the two cannot disagree. Each page's existing
`rootMargin` and `threshold` are preserved via data attributes, so nothing
changed behaviourally.

### Two markup defects in pt/services.html

Found by the new CI on its first run: a stray `</div>` after the mobile menu,
and `.footer-inner` never closed. Browsers recover from both, so neither was
visible — but an unclosed `<div>` in this same file is what blanked two PT
pages in production before. Both corrected against the EN counterpart.

### Shared typography guard lifted to base.css

`h1, h2, h3 { overflow-wrap: break-word; word-break: break-word; }` was pasted
into 18 pages. Now in `base.css` once.

### Not changed, and why

`extract-base-css.mjs --check` reports zero extractable rules, but its list of
shared selectors is curated, so that is not the whole picture. Measured
independently, **68 rules are still byte-identical across four or more pages**
— most significantly the entire `.resources-*` and `.resource-card*` block,
which the six Field Notes files inherit wholesale from `resources.html`.

That is page-family CSS, not design system. Lifting it into `base.css` would
put component styles into the shared base and make the split harder to reason
about, and it is the same root cause issue #12 exists to decide properly. Left
for that decision rather than half-solved here.

### Verification

Every computed style that matters (48 properties plus geometry) was captured
for every element on all 22 pages at 1280px and 375px, before and after, with
animations and transitions frozen so the comparison measured layout rather
than whichever frame was caught.

**Zero differences.** The only deltas were the element count on the three pages
that lost a `<script>` node, which is the change itself.

Scroll-spy behaviour was compared separately by recording the active tab at
every 150px of scroll on all three pages, before and after: 104 positions, of
which 101 identical. The other three are unstable run-to-run **on identical
code** — section boundaries where the observer callback races the measurement —
and were verified as flake, not regression, by comparing the new code against
itself.

---

## v1.49 — August 2026

### First Field Note published, PT and EN

`portugal-events` in both trees. The Field Notes section had been advertised in
the nav since v1.42 with nothing behind it; it now has an article, and both
hubs show a card instead of an empty state.

```
/pt/field-notes/portugal-events.html
/field-notes/portugal-events.html
/images/og/portugal-events-pt.png
/images/og/portugal-events-en.png
```

Same slug in both languages, per the site rule, rather than the per-language
slugs the source markdown proposed. `portugal-events` is a programme name, so
it reads correctly in both trees and leaves room for the planned follow-up.

Built to the content handover:

- measure capped at 68ch, line-height 1.8, body text not pure white
  (`rgba(255,255,255,0.75)` is 10.4:1 on `#021829`, passes AA)
- exactly one pull-quote, the Porto festival line, accent rule, not italic
- exactly one in-content CTA, at the foot, to cal.com. The nav "Get started"
  button is site chrome and was left alone.
- accent green held to four uses: pull-quote rule, the inline AV eligibility
  emphasis, the CTA, and the nav active state. The article template's green
  rule on the standfirst was muted so it would not be a fifth.
- source section breaks rendered as low-contrast dividers with real space
- the Nota renders as an inset disclaimer, a different register from the body
- all editorial scaffolding stripped: post type, slug header, legal basis
  line, the EN writing guidance, and the "O QUE MUDOU DA v1" section
- legal designations left in Portuguese on both pages, including in the EN
  body, per the brief

The EN body was written to the brief in the source file rather than machine
translated: mirrored section by section, same figures in the same order, first
person, designations untranslated.

### Fixed along the way

The article template's meta line used `rgba(255,255,255,0.35)`, which is 3.2:1
on the page background and fails WCAG AA. Raised to 0.55 on both new pages.
The templates themselves still carry the old value and should be updated when
the next article is built.

The template also ships `og:type` as `website` and carries placeholder meta
descriptions. Both new pages now declare `og:type` once, as `article`, and
carry a real description mirrored across `description`, `og:description`,
`twitter:description` and the JSON-LD, in the language of the page.

### OG images

1200x630, generated from the paid-ad creative spec using the site's
self-hosted Space Mono, one per language. Referenced as absolute URLs.

---

## v1.48 — August 2026

### Shared design-system CSS extracted to `base.css`

The last item on the audit backlog. Every page carried its own copy of the
tokens, reset, navigation, mobile menu, footer and accessibility primitives —
the root cause behind most of the drift this audit found, because fixing a nav
bug meant editing 20 files and remembering all 20.

**1,166 duplicated rules removed.** They now live once in `/base.css` (9.8 KB),
linked immediately **before** each page's inline `<style>` — which is exactly
where those rules already sat, so the cascade is unchanged:

```html
<link rel="stylesheet" href="/fonts.css" />
<link rel="stylesheet" href="/base.css" />   <!-- shared design system -->
<style> … page-specific … </style>            <!-- can still override base -->
<link rel="stylesheet" href="/site.css" />    <!-- always has the last word -->
```

Two rules are split rather than lifted whole, because pages legitimately differ:

- **`body`** — the eight declarations every page agrees on move to `base.css`;
  a page's own `min-height` / `display:flex` stay inline.
- **`@media (max-width: 900px)`** — only the nav/footer half is shared. Each
  page's mobile layout rules stay where they were.

`thank-you.html` and `pt/thank-you.html` make their nav `sticky` instead of
`fixed` and never set `left`/`right`. They keep their own `nav` rule inline, now
with explicit `left:auto; right:auto` so that lifting the shared rule cannot
introduce values they never had.

### Dev-only tooling: `_tools/`

The extraction is reproducible, not a one-off edit:

```bash
cd _tools && npm install
node extract-base-css.mjs --check    # report, change nothing
node extract-base-css.mjs            # rewrite base.css and the pages
```

`postcss` is a **dev dependency only** — the published site is still plain
static files with no build step, and pages remain editable in the GitHub web UI.
`_tools/` starts with `_`, so Jekyll never serves it, and `node_modules/` is
git-ignored.

A hand-rolled parser is what corrupted the first attempt (v1.47). postcss also
caught a subtler bug during this pass: it stores `!important` on `decl.important`
rather than in `decl.value`, so a naive emitter silently drops the flag. That
turned `.nav-quiz-link`'s `color: … !important` into a normal declaration and
changed the colour on all 20 pages — caught by the verification below, fixed,
and re-verified.

### Verification

Every computed style — 34 properties plus geometry — was captured for every
element on 20 pages at both 1280px and 375px, before and after. **Zero
substantive differences across all 40 page/viewport combinations.**

The behavioural suites were re-run on top: mobile menu opens on every page,
zero off-origin requests, fonts load, newsletter screening intact, both quizzes
working, hreflang and sitemap served.

---

## v1.47 — August 2026

### 18 broken CSS rules across 10 pages

Found while attempting the shared-CSS extraction: the inline `<style>` blocks
contained **dangling selectors** — a selector with no declaration block. CSS has
no way to know one is missing, so the parser glues the stray token onto the next
rule's selector, and that rule silently stops matching.

```css
  nav                              /* ← stray token, no { } */

  .section-label { … }             /* parsed as: nav nav .section-label */
```

26 stray lines forming 18 broken rules, all removed. Two had visible effects:

- **`.error-actions` on both 404 pages was completely unstyled.** `.error-`
  turned it into `.error- .error-actions`, which matches nothing, so the two
  buttons rendered stacked as plain blocks instead of a centred flex row with a
  20px gap. Confirmed against the deployed code, then re-measured after the fix
  (`display: block → flex`, `gap: normal → 20px`).
- **`.section-label` on both services pages was completely unstyled** — no
  uppercase, no letter-spacing, no bottom margin — because `nav nav
  .section-label` matches nothing.

The rest were latent: `.sub-accordion-` was swallowing `@keyframes subOpen`
(which nothing referenced, and no keyframes survived parsing at all), and the
`h1, h2, h3` and `.resources-hero` cases were either partly covered by the
comma-separated selector list or duplicated by a second, correct rule.

Verified by capturing every computed style on 20 pages at two viewports before
and after: the only substantive differences are `.error-actions` on the 404
pages and `.section-label` on the services pages. Nothing else moved.

### Shared-CSS extraction — attempted with a hand-rolled parser, reverted

A first attempt to lift the duplicated CSS used a hand-rolled parser and
produced corrupted output — the dangling selectors above are exactly why. It
was reverted, the dangling selectors were fixed, and the extraction was redone
properly with postcss (see v1.48).

---

## v1.46 — August 2026

Clears the P2/P3 backlog, and adds the n8n workflow the newsletter depends on.

### Two PT pages were rendering blank in production

Found while checking markup balance. `pt/resources.html` and `pt/404.html` each
had an unclosed `<div class="mobile-menu">`, so the parser nested `<main>` and
`<footer>` *inside* the mobile menu — which is `display:none` above 900px. Both
pages have been showing a nav bar above an empty void on desktop. Verified
against the deployed code before fixing, and re-rendered after.

`pt/services.html` had a third instance: an unclosed `.services-cta` left the
footer nested inside it and indented to 1184px instead of full width. All three
divs are now closed; every page in the repo balances.

`pt/404.html` also still carried an English button label ("Contact us"), now
"Fale connosco".

### New — `_n8n/newsletter-double-opt-in.json`

The workflow behind the newsletter form, importable as-is: signup, confirm and
unsubscribe webhooks, double opt-in, consent stored as evidence rather than a
boolean, and CORS set for the site's origins. `_n8n/README.md` covers import,
the storage swap point, deliverability caveats and a curl test sequence.

The directory starts with `_`, so Jekyll does not publish it — versioned with
the site but never served. Do not add `.nojekyll` without moving it first.

### P2

- **Copyright year.** The markup now carries the correct year plus a
  `data-copyright-year` hook; `site.js` rolls it forward only once the calendar
  passes it. Correct with JavaScript off, and no annual edit across 23 files.
- **LinkedIn.** JSON-LD `sameAs` pointed at `/company/lumenandpixel`, which is
  dead. Corrected to `/company/lumen-and-pixel`, matching the 25 visible links.

### P3

- **Orphaned pages.** `articles/index.html` and `pt/field-notes.html` were real
  URLs that may be indexed, so they are now redirect stubs (canonical + meta
  refresh) pointing at `/field-notes/` and `/pt/field-notes/`, consolidating any
  inbound links rather than 404ing them. `articles/article-template.html` was
  never a public URL and is deleted.
- **Article templates** are now `noindex, nofollow` — they ship with
  `ARTICLE TITLE` placeholders and should never have been indexable.
- **hreflang** on all 9 EN/PT pairs (18 pages), each with `x-default` and
  verified to match that page's own canonical.
- **`sitemap.xml`** (12 indexable URLs with language alternates) and
  **`robots.txt`** pointing at it and disallowing the redirect stubs.
- **Dead assets removed** — `_shared.css` (abandoned design system),
  `images/RB.png` (3.1 MB), `images/logos/palacio.png` and two stray `.txt`
  files, each confirmed unreferenced first. `images/` is now 628 KB.
- **`<main>` landmark** added to index/about/services in both languages, so the
  skip link lands on a real landmark. Layout captured before and after across
  all six pages and compared — identical, apart from the `pt/services.html`
  footer that the unclosed-div fix corrected.
- **Image dimensions.** All 48 `<img>` tags now carry intrinsic `width`/`height`
  read from the files themselves, to stop layout shift, plus `loading="lazy"`
  and `decoding="async"` on the 28 below-the-fold images. Nav logos are
  deliberately excluded from lazy loading — they are above the fold, and lazy
  loading them would delay the largest contentful paint.

---

## v1.45 — August 2026

Removes every third-party script from the visitor's browser, and makes the legal
pages describe what the site actually does.

### ⚠️ Required before this goes live

The newsletter now posts to an n8n webhook that **must exist first**, or signups
will fail:

```
POST https://lumenandpixel.app.n8n.cloud/webhook/newsletter-signup
{
  "email":        "someone@example.com",
  "consent":      true,
  "consent_text": "<the exact wording shown next to the checkbox>",
  "consent_at":   "2026-08-10T12:00:00.000Z",
  "language":     "en" | "pt",
  "source":       "Website newsletter",
  "entry_page":   "/index.html"
}
```

The workflow is expected to: send a confirmation email and only add the address
once that link is clicked (double opt-in — the site's success message already
says "check your inbox"), store the consent fields as the record of consent,
include a working unsubscribe link in every email sent, and honour unsubscribes
and bounces. A `200` marks success; anything else surfaces an error to the user.

**If a sending provider is added later** (SES, Resend, Postmark, …), it must be
added to the third-party list in `legal.html` and `pt/legal.html`. Called
server-side from n8n it never touches the visitor's browser, so it does not
reintroduce a consent requirement — but it is still a processor and must be
disclosed.

### MailerLite removed entirely

`universal.js` was loading on all 23 pages while the signup form existed on only
2 — 21 pages ran a marketing tracker for no functional reason, including
`legal.html`, whose cookie policy claimed no tracking was active.

The embed is replaced by a first-party form on both homepages, posting to n8n
with the same screening as the contact form: off-screen honeypot, 3-second
minimum fill time, email format validation, 15-second timeout, re-entrancy
guard. Consent is an explicit unticked checkbox, and the exact wording shown is
captured and sent so the record is evidence rather than a boolean.

### Fonts self-hosted

Google Fonts is gone. Space Mono (400/700, upright and italic) and Nunito
(300–800, variable) are served from `/fonts/` via `/fonts.css`, latin and
latin-ext only — the same faces the CDN link requested. Visitor IPs are no
longer disclosed to Google on every page load. `unicode-range` is preserved, so
a page still downloads only the subsets it uses.

To regenerate: fetch `https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700`
and `…?family=Nunito:wght@300..800` with a modern browser User-Agent, keep the
`latin` and `latin-ext` blocks, download each woff2 into `/fonts/`, and rewrite
the `src` URLs to local paths.

**This also fixed a bug:** `field-notes/`, `pt/field-notes/`, `articles/` and
`pt/field-notes.html` (7 pages) declared Space Mono and Nunito but never loaded
either font and had no `@font-face`. They had been rendering in fallback system
fonts, visibly different from the rest of the site. They now link `/fonts.css`
like everything else.

### Result: no third-party code in the browser at all

Verified in Chromium across 14 pages in both languages — a page load now makes
**zero off-origin requests**. Nothing sets a cookie. No consent banner is needed
because there is nothing to consent to.

### Legal pages rewritten to match reality

- Removed **Web3Forms** (gone since v1.43) and **MailerLite** (gone as of now).
- Third-party list is now GitHub Pages (hosting), n8n Cloud (form + newsletter
  delivery), cal.com and Gumroad (only reached if you follow a link).
- "What we collect" describes the newsletter consent record accurately.
- The cookie section now states plainly that no cookies are set and no
  third-party code loads — which is true as written, and testable.

## v1.44 — August 2026

Outcome of a full audit and stress test of the site. Only P0 and P1 findings are
addressed here; the remaining P2/P3 backlog is listed at the end.

### New shared files: `site.css` + `site.js`

Every page previously carried its own copy of the scroll-reveal observer and the
mobile-menu handler. That duplication is why the same bug could be fixed on one
page and left broken on twenty others. Both are now single files, loaded from the
site root on all 20 nav-bearing pages:

```html
<link rel="stylesheet" href="/site.css" />
<noscript><style>.reveal{opacity:1;transform:none;}</style></noscript>
<script>window.__lpRevealFailsafe=setTimeout(…,4000);</script>
<script src="/site.js" defer></script>
```

Absolute paths, so `/`, `/pt/` and `/field-notes/` all resolve identically.
The inline `<style>` blocks are untouched — `site.css` loads after them and wins
on cascade order. **When editing a page, do not re-add reveal or hamburger JS.**

### Fixed — P0

- **Field Notes was unnavigable on mobile.** `field-notes/index.html`,
  `pt/field-notes/index.html` and both article templates shipped the hamburger
  button and menu markup but no JavaScript to open it. Below 900px the desktop
  nav is hidden, so the only working link out of the section was the logo. They
  now load `site.js` like every other page.
- **Contact form had no spam protection or input bounds** (`about.html`,
  `pt/about.html`). The `botcheck` field was dropped in the v1.43 Web3Forms→n8n
  migration and nothing replaced it, leaving a public, per-execution-metered
  webhook wide open. Added: off-screen honeypot, a 3-second minimum fill time,
  email format validation (the form carries `novalidate`, so the browser's own
  check was off), `maxlength` on every field with matching server-side-style
  truncation, a 15-second `AbortController` timeout, and a re-entrancy guard.
- **The PT quiz threw away its own result.** `pt/quiz.html` linked to
  `about.html#contact-form` without the `?service=` parameter the EN version
  sends, and `pt/about.html` never had the pre-fill logic in the first place.
  Every Portuguese visitor who completed the quiz arrived at a blank form with
  an empty `quiz_result` in the payload. Both halves fixed; PT and EN quiz
  engines are now structurally identical so they can be diffed.

### Fixed — P1

- **Blank page without JavaScript.** `.reveal` defaults to `opacity:0` and was
  only ever cleared by JS, so with JS off the services grid, client logos, CTA,
  newsletter and the whole contact form were invisible. Added a `<noscript>`
  fallback, plus a self-cancelling timer that reveals everything if `site.js`
  itself is blocked or fails to load.
- **Mobile menu.** Closed menus were hidden with `opacity` + `pointer-events`
  only, which leaves links in the tab order — keyboard users fell into five
  invisible links on every phone viewport. Now `visibility:hidden`. Added an
  Escape handler, a real focus trap (the markup claims `aria-modal="true"`),
  focus restore to the hamburger, and release of the `body{overflow:hidden}`
  scroll lock when crossing back to desktop width — previously, opening the menu
  and rotating to landscape left the page permanently unscrollable.
- **Reduced motion.** Nothing in the site honoured `prefers-reduced-motion`.
  The infinite 22s marquee was a WCAG 2.2.2 failure on its own. Now the marquee,
  hero zoom, reveal transitions and all smooth scrolling stop when the OS
  setting is on.
- **Quiz state and accessibility.** Browser Back used to leave the page and
  destroy all four answers; step and answers now live in the URL hash, so Back
  steps between questions and a result can be refreshed, bookmarked and shared.
  Focus moves to each new question heading instead of falling to `<body>`.
  `JSON.parse` of the option data-attributes is guarded. The tie-break
  (always Show Design on a perfect tie) is now documented rather than incidental.
- **`100vh` hero** replaced with `100svh`, which excludes the collapsing mobile
  URL bar, so the hero no longer jumps on first scroll. The 640px floor is also
  released on short landscape viewports.

### Follow-up fixes (reported from mobile testing)

- **About page mobile menu was missing half the site.** `about.html` and
  `pt/about.html` listed only Serviços/Services and Sobre/About — 4 links where
  every other page has 6. Field Notes and the quiz were unreachable from a phone
  on the About page in both languages. The desktop nav was complete, so this was
  mobile-only.
- **PT quiz results rendered raw HTML entities** (`L&#237;der de Design`).
  `SERVICES_PT` held 125 entities like `&#237;`, and `renderResult` writes the
  mode name, rationale and description with `.textContent`, which does not
  decode them — only `nameHTML` went through `.innerHTML`, which is why the
  heading looked right and everything under it did not. The data is now literal
  UTF-8; `&amp;` is preserved in `nameHTML`, which is genuinely markup. EN was
  never affected — it had no entities.
- **PT pages sent visitors back to the English home.** The logo on all 11 PT
  pages pointed at `../index.html`, and `pt/404.html` and `pt/thank-you.html`
  did the same from their back-to-home CTAs. `pt/404.html`'s CTA also still read
  "Back to home" in English. No language detection was added — on a static site
  each page already knows its own language, so the links are simply correct now.
  The EN/PT switcher still crosses languages, as it should.

### Corrected from the audit

An earlier draft reported the service icons and gradients on `services.html` and
`pt/services.html` as broken, because they use `../images/…` from pages at or near
the site root. **That was wrong.** Browsers discard leading `..` segments that
would escape the root (RFC 3986), so the paths resolve correctly and always have.
The site has zero broken links. The paths remain fragile — they would break if
either page moved into a subdirectory — but nothing is broken today.

### Still outstanding (P2/P3 backlog)

- `legal.html` / `pt/legal.html` name **Web3Forms** as the contact-form processor;
  it is n8n Cloud since v1.43. cal.com is undisclosed. The cookie section claims
  no analytics is active while MailerLite loads on all 23 pages with no consent
  gate. *Agreed direction: correct the text and gate MailerLite behind consent.*
- `© 2025` hardcoded on 23 pages.
- JSON-LD `sameAs` points at `linkedin.com/company/lumenandpixel`; every visible
  link uses `lumen-and-pixel`. One of them is wrong.
- Superseded files still live and crawlable: `articles/index.html`,
  `articles/article-template.html`, `pt/field-notes.html`.
- Article templates are `robots: index, follow` with `ARTICLE TITLE` placeholders.
- No `hreflang` on 20 EN/PT pairs; no `sitemap.xml`; no `robots.txt`.
- Dead assets: `_shared.css` (an abandoned, entirely different design system),
  `images/RB.png` (3.1 MB), `images/logos/palacio.png`, two stray `.txt` files.
- `<main>` missing on index/about/services in both languages.
- 51 `<img>` tags, none with `width`/`height` or `loading="lazy"`.
- The remaining shared-CSS extraction: ~200 lines of tokens/nav/footer are still
  duplicated in every page's inline `<style>`.

---

## v1.43 — June 2026

### Base: uploaded v1.42 (with Field Notes section added externally)
This version uses the externally-produced v1.42 as its base, which includes the Field Notes section and articles directory created in a separate chat. The contact form migration was applied on top of this base.

**Important process note:** All website changes must be made in this chat only to avoid version conflicts. The Field Notes incident (changes made outside this chat) is documented here as a reminder of why this matters.

### Contact form migrated from Web3Forms to n8n
Applied to `about.html` and `pt/about.html`.
- Removed: `action`, `access_key`, `botcheck`, `redirect`, `subject` hidden fields
- Added: `fetch()` POST to `https://lumenandpixel.app.n8n.cloud/webhook/inbound-lead`
- On success: `window.location.href = 'thank-you.html'`
- On error: inline status message in brand colours
- Button disables + label changes during request
- All existing JS preserved: quiz pre-fill, smooth scroll, hash routing, hamburger nav
- Payload keys: `name`, `company`, `email`, `service`, `message`, `source`, `entry_page`, `quiz_result`
- Webhook note: `webhook/` = production (always on); `webhook-test/` = only active during n8n editor testing

---

---

## v1.42 — June 2026

### Field Notes section — correct structure + nav active state fix

**URL structure (final):**
- `/field-notes/index.html` — EN hub
- `/field-notes/slug.html` — EN article/case study
- `/pt/field-notes/index.html` — PT hub (fully translated UI)
- `/pt/field-notes/slug.html` — PT article/case study
- Language switcher on each page links to the same slug in the other language

**Active nav link fix (all 16 existing pages):**
- Active nav link: `var(--blue-700)` text + 2px `var(--green-500)` underline via `::after`
- Language switcher active: bold navy + 1.5px green underline
- Replaces illegible green-text-on-light-nav pattern

**New files (4):**
- `field-notes/index.html` — EN hub with filter (All / Articles / Case Studies), empty state, filter JS
- `field-notes/article-template.html` — EN article template with all meta, lede, body styles, callout box, footer CTA
- `pt/field-notes/index.html` — PT hub, full Portuguese UI, mirrors EN article list
- `pt/field-notes/article-template.html` — PT article template, all strings translated

**Nav updated on all 16 existing pages:**
- EN: Field Notes → `field-notes/index.html`
- PT: Notas de Campo → `field-notes/index.html` (relative = `/pt/field-notes/index.html`)
- Desktop nav + mobile menu updated on all pages

**How to publish a new article:**
1. Duplicate the relevant template (EN + PT), rename both to the same slug
2. Fill in all PLACEHOLDER values (title, slug, date, read time, lede, body, meta)
3. Add matching `<a class="fn-article-item">` entry to both hub pages
4. Deploy both language versions together

---

### Field Notes section + nav active state fix

**Active nav link fix (all 16 pages):**
- Active nav links now use `var(--blue-700)` text (dark navy, WCAG compliant) with a 2px `var(--green-500)` underline `::after` pseudo-element instead of green text on light nav background
- Language switcher active state fixed with same pattern (bold navy + thin green underline)

**New section: Field Notes**
- `/articles/index.html` — EN hub. Hero, filter buttons (All / Articles / Case Studies), article list (empty at launch, placeholder state shown). Filterable by JS with no page reload.
- `/articles/article-template.html` — reusable template for every new article or case study. Contains all semantic markup, full CSS, `og:type: article`, `article:published_time` meta, back navigation, article body styles (h2/h3, blockquote, callout note, lede), footer CTA.
- `/pt/field-notes.html` — PT hub mirror. Full PT UI (nav, hero, filters, footer). Articles link to EN `/articles/` pages. Language switcher on EN articles links back to this PT hub.

**Nav updated on all 16 existing pages:**
- Field Notes added to desktop nav and mobile menu on all EN pages (`articles/index.html`)
- Notas de Campo added to desktop nav and mobile menu on all PT pages (`../articles/index.html`)

**How to publish an article:**
1. Duplicate `articles/article-template.html`, rename to slug
2. Fill in: title, slug, date, read time, category tag, lede, body content, all meta tags
3. Add matching `<a class="fn-article-item">` entry to both `articles/index.html` and `pt/field-notes.html`
4. Deploy

---

## v1.41 — June 2026

### Complete `<head>` audit and upgrade across all 16 pages

**New assets added to `/images/`:**
- `favicon-16x16.png` and `favicon-32x32.png` — PNG fallback favicons (rasterised from SVG) for browsers that don't support SVG favicons
- `apple-touch-icon.png` (180×180) — replaces incorrect `og-image.png` reference on iOS home screen save
- `android-chrome-192x192.png` and `android-chrome-512x512.png` — for Android PWA/Chrome

**New root file:**
- `site.webmanifest` — PWA manifest referencing Android icons, theme colour `#021829`

**OG image fixed:**
- `og-image.png` resized from 1536×1024 to correct 1200×630 (LinkedIn/WhatsApp spec) with centre crop

**All 16 pages updated:**
- Favicon set: SVG primary + PNG 32×32 / 16×16 fallbacks
- `apple-touch-icon` corrected to `apple-touch-icon.png` (180×180)
- `<link rel="manifest">` added
- `<meta name="theme-color">` added (#021829)
- `<link rel="canonical">` added (page-specific absolute URL)
- `<meta name="robots">` added (`index,follow` on content pages; `noindex,nofollow` on quiz, thank-you, 404)
- `<meta name="description">` added (unique per page, separate from og:description — required for Google SEO)
- `og:image:width` (1200) and `og:image:height` (630) declared explicitly after og:image
- `og:type` and `og:site_name` standardised across all pages

**Homepage only:**
- JSON-LD Organisation schema added (schema.org/Organization — name, URL, logo, description, founder, address, email, sameAs)

**Decision: Drive URL approach abandoned.** All brand assets live in the repo under `/images/`. No external hosting needed for a static site on GitHub Pages. Reliable, fast, zero dependency.

---

## v1.40 — May 2026

### Resources page hidden from navigation
- Removed the Resources link from desktop nav, mobile menu, and lang-switch on all 16 pages (EN + PT).
- The page files (`resources.html`, `pt/resources.html`) are preserved on disk and accessible via direct URL. Nothing deleted.
- Reason: roadmap item, not ready for public visibility.
- To restore: re-add `<li><a href="resources.html">Resources</a></li>` to nav-links and mobile-menu on all pages.

### Founder section hidden on About page
- Wrapped the `.founder` section and its preceding `.divider` in `<div style="display:none">` on both `about.html` and `pt/about.html`.
- Content preserved in full — name, bio, photo placeholder, role.
- Reason: not yet substantiated enough to add credibility at this stage. To be restored when speaker/public appearances justify the personal profile section.
- To restore: remove the `<div style="display:none">` wrapper and its closing `</div>` from both pages.

### Cal.com discovery call CTA added to About page
- Added a "Book a discovery call" button in the contact-left panel on both `about.html` and `pt/about.html`.
- Sits below the social links (Instagram / LinkedIn), separated by a thin rule.
- Links to `https://cal.com/lumenandpixel` — update this URL when the cal.com account is configured.
- PT label: "Agendar uma chamada" / "Prefere falar diretamente?"
- Provides a sync (call) path alongside the existing async (contact form) path.

### Package and versioning convention established
- From this version forward: zip file named `lumenandpixel-v{MAJOR}.{MINOR}.zip`, folder inside matches.
- Versioning increments sequentially from v1.40.

---

## v1.41 — May 2026

### PT copy audit fixes

Full audit conducted across all EN and PT pages. EN copy assessed as consistent and deliberately left unchanged. The following PT errors were corrected:

**Values section — pt/about.html**
- "Artesanato Intencional" → "Execução Intencional" (artesanato = handicraft, wrong connotation for professional practice)
- "Clareza Antes da Complexidade" → "Clareza Primeiro" (literal translation, reads as translated rather than native)
- "A Alegria como Padrão" → "A Alegria como Critério" (padrão reads as ISO standard; critério = the measure by which success is judged)

**Terminology and consistency — pt/services.html**
- "Pré-Produção Programming" → "Programação de Pré-Produção" (untranslated English word)
- `<em>&amp; Automation</em>` → `<em>&amp; Automação</em>` in Show Control h2 heading (untranslated)
- "3D Pre-Visualização" → "Pré-Visualização 3D" (inverted word order from PT convention)
- "fly-throughs interativos" → "percursos virtuais interativos"
- "walkthroughs animados" → "percursos animados"

**European PT corrections**
- "Ainda não tenho certeza" → "Ainda não tenho a certeza" (Brazilian PT → European PT; missing article)
- "Director de Produção" → "Diretor de Produção" (old orthographic convention)

**Anglicisms**
- "Produções em tour" → "Digressões" (personal preference over "produções itinerantes")
- "dia do show" → "dia do espetáculo" (mixed register)
- "browser" → "navegador" (pt/index.html newsletter fallback)

**Terms intentionally kept in English (industry standard in PT context)**
- load-in (universal in Portuguese production industry; "montagem" would signal outsider)
- briefing (fully adopted into PT)
- rigging (no established PT equivalent in this industry)
- plot (technical term, no PT equivalent)
- show file / ficheiro de show (hybrid accepted in industry)

**EN copy — no changes made**
EN copy assessed as consistent in register throughout. The quiz and services page problem/response tables are the strongest writing on the site. AI-pattern density exists but is not at a level that damages credibility with a professional audience. Specific observations documented but not acted on pending Ricardo's direction.

**PT quiz encoding — no action needed**
Apparent encoding issue was a false positive from text extraction. The file uses HTML entities (&#227; etc.) which are valid HTML and render correctly in browsers.

---



### Hero image replaced
- New image: backstage technical rig with stage visible in background.
- Processing applied: highlight compression, shadow toning toward brand blue `#021829`, overall darkening. Image is intentionally near-abstract — scene is barely readable, serves as texture behind hero text.

### Hero headline rewritten
- Old: "Crafting pixel perfect experiences for live events."
- New: "The creative is ready. Is the system?"
- Rationale: original headline was generic and positioned on output. New headline names the specific tension the services resolve.

### Quiz surfaced to hero and navigation
- "Find your fit" link added to desktop nav and mobile menu on all 16 pages.
- Second CTA button added to homepage hero alongside "Explore services".
- Previously: quiz was only reachable from the bottom of the services page.

### Scope signal block integrated into hero
- Seven context tokens (event types, geography, production phase) added as a subtitle line inside the hero, between the headline and the CTAs.
- Replaced an earlier standalone "scope strip" section between hero and marquee, which did not fit visually.

### Client logo banner added to homepage
- Section heading: "Trusted by" (EN) / "Confiam em nós" (PT).
- Seven logos: SAP, Randstad, Verisure, CGD, Palácio da Bolsa (text), Yeatman, Real Companhia Velha.
- Later updated: Palácio da Bolsa removed (no image asset available). Six logo items remain.
- Logos self-hosted under `images/logos/`. SVG logos (Randstad, Verisure, CGD) preprocessed to white paths. PNG logos (SAP, Yeatman, RCV) have transparent backgrounds and use `filter: invert(1)`.
- Randstad rebuilt as stacked SVG (mark above wordmark) to solve readability at small size.
- RCV cropped to wordmark only — heraldic crest removed from crop.
- Position: between service cards and "One partner. Every system." CTA banner.

### Service card icons replaced (homepage)
- Old: custom inline SVG icons in brand green.
- New: four PNG icons extracted from uploaded icon sheet (spotlight motif per service), rendered white via `filter: invert(1)` on gradient backgrounds.
- Grainy gradient backgrounds generated as SVG files using `feTurbulence` filter — no raster files.
- Gradient colour map: Show Design (blue→green), Show Control (black→steel blue), System Architecture (dark blue shift), Technical Direction (blue→forest green).

### Stock images replaced on Services page
- Four Unsplash images removed.
- Replaced with gradient panels matching the homepage card gradients, centred icon at 120px.
- No external image requests on the services page.

### Scroll anchor fix on Services page
- `scroll-margin-top: 136px` added to `.service-section`.
- Fixed: section headings were being obscured by the sticky tab nav (68px main nav + 52px tab nav + 16px breathing room) when jumping to anchors.

### "From the field" project story section added to About page
- New section between founder block and contact form on both `about.html` and `pt/about.html`.
- Single story card, placeholder content: corporate awards ceremony, signal routing problem, System Architecture service.
- Structure: service tag + context meta, headline, two body paragraphs, pull quote with role attribution.
- Design: green left border accent, subtle green quote background, max-width 680px body.
- Section title ("From the field / How it works in practice") scales to multiple stories without structural change.
- Placeholder quote: "We've never had a load-in this clean." — Production Manager.
- To be replaced with a real named project when available.

---

## Persistent decisions (apply to all versions)

### Technology stack
- Pure HTML/CSS/JS. No framework. No build step.
- Hosted on GitHub Pages. DNS via GoDaddy.
- Forms: Web3Forms (contact), MailerLite (newsletter).
- Access key (Web3Forms): `2b0f7125-de63-40f7-9f81-674a1026f915`
- MailerLite account: `2252485`, form ID: `gZXg1D`

### Brand tokens
- Page background: `#021829` (blue-700)
- Accent: `#33fb31` (green-500)
- Display font: Space Mono
- Body font: Nunito

### Language structure
- EN pages: root (`/`)
- PT pages: `/pt/` subdirectory
- Lang switcher in every nav (desktop + mobile)
- All content changes must be mirrored to PT equivalents

### File structure conventions
- `images/` — hero, logo-mark, favicon, og-image
- `images/logos/` — client logo files
- `images/icons/` — service icons
- `images/gradients/` — SVG grain gradients per service
- `pt/` — Portuguese mirror of all EN pages

### Pages currently hidden from navigation (not deleted)
- `resources.html` + `pt/resources.html` — roadmap, hidden as of v1.40
- `.founder` section on About — hidden as of v1.40, content preserved
