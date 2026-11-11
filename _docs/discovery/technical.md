# DS1d: technical (performance, accessibility, SEO, sharing)

## How I looked

11 November 2026, branch from `origin/test` at `5ef3b1f`.

- **Local, every page in EN and PT** (22 pages plus the two article templates), served with
  `python3 -m http.server` and driven with the installed Playwright/Chromium at 375 px and 1440 px:
  every response (size, type), image natural size against rendered size, fonts loaded,
  render-blocking files in `<head>`, layout shift and LCP, headings, landmarks, skip links, every
  title, description, canonical, `hreflang`, Open Graph and Twitter tag, JSON-LD.
- **axe-core 4.10.2** (installed in a scratch folder outside the repo, injected into each page;
  WCAG 2.0/2.1/2.2 A and AA plus best-practice), at both widths.
- **Keyboard:** Tab through every page checking each stop has a visible outline; mobile menu opened
  and closed by keyboard; the quiz taken to a result by keyboard only (EN and PT).
- **Zoom:** reflow at 320 px and 720 px wide (400 % and 200 % of 1280 px) on all 22 pages.
- **Reduced motion** (emulated) and **JavaScript disabled** at 375 px on all 22 pages.
- **Slow connection:** 7 pages at 375 px with 1.6 Mbps / 150 ms latency and 4× CPU slowdown.
- **Live site** (pages only, plus one `?x=` cache-busted CSS request): redirects from the bare
  domain and from `http://`, response headers, and a 404 below a folder.
- Image re-encoding sizes measured with Pillow in a scratch folder; nothing written to the repo.

**What I could not check:** a real screen reader (I read the accessibility tree and roles instead);
Lighthouse (not run; my numbers come from Playwright and are not Lighthouse scores); Google Search
Console data; how WhatsApp, LinkedIn and Slack actually render the cards.

**What is already in good shape** (so the challenger doesn't have to look): axe finds one
moderate issue on 24 pages (below, T14); every tab stop on every page has a visible focus
outline; the mobile menu traps focus, closes on Escape and returns focus to its button; the quiz
works by keyboard, announces choices with `aria-pressed` and moves focus to each new question;
no page scrolls sideways at 200 % or 400 %; scroll-reveal content is visible with reduced motion
and without JavaScript; pages weigh 124–347 KB uncompressed (home is heaviest at 347 KB, 24
requests); layout shift is 0.000–0.005; on the throttled connection LCP is 0.6–1.7 s (slowest:
the Portugal Events article, 1.74 s); zero off-origin requests on load on every page.

## Findings

### T1 A missing page inside a folder shows a broken 404 page, always in English
- **What:** GitHub Pages serves the root `404.html` for every missing URL. Its stylesheets use
  root paths (`/base.css`), but its nav, buttons and logo use relative links (`index.html`,
  `images/logo-mark.svg`). Below a folder every one of those points to another missing page, and
  the logo image breaks. `pt/404.html` is never served, so Portuguese visitors always get the
  English page.
- **Evidence:** live, `https://www.lumenandpixel.com/pt/servicos/zz-nope-…`: `lang="en"`, nav
  links resolve to `/pt/servicos/services.html`, `/pt/servicos/about.html` … (all 404), and
  `/pt/servicos/images/logo-mark.svg` returns 404. `404.html:57`, `404.html:95`.
- **Who it serves:** anyone following an old or mistyped link, e.g. a client's saved link from an
  earlier site structure; PT visitors in particular.
- **Size:** S (root-relative links in `404.html`; a short EN/PT pair of messages on the one page)
- **Fits the rules:** yes (EN/PT parity check may need to accept that only the root 404 is served)
- **Confidence:** high, seen on the live site.

### T2 The site also answers on plain `http://` without redirecting to HTTPS
- **What:** `http://www.lumenandpixel.com/` and `http://www.lumenandpixel.com/about.html` return
  200 with the page instead of a redirect to `https://`. The bare domain redirects to `www` but
  keeps the scheme (`http://lumenandpixel.com/` → `http://www…`). No `Strict-Transport-Security`
  header on HTTPS responses either. A visitor who types the address can fill the contact form on
  an unencrypted page (the form itself posts to an HTTPS endpoint, but the page carrying it can be
  altered in transit).
- **Evidence:** `curl` on 11 Nov 2026: `HTTP/1.1 200 OK`, `server: cloudflare`, no `location`.
- **Who it serves:** every visitor who types the domain; the zero-cookie privacy promise.
- **Size:** S (one setting: GitHub Pages "Enforce HTTPS" or Cloudflare "Always Use HTTPS")
- **Fits the rules:** needs the owner: agents may not touch the GitHub Pages or DNS configuration.
- **Confidence:** high for the behaviour; which of the two settings is off I can't see.

### T3 On a phone with JavaScript off, there is no navigation at all
- **What:** below the mobile breakpoint the nav links are hidden and the hamburger is shown; the
  menu only opens with `site.js`. The footer has only Instagram, LinkedIn, Privacy, Terms,
  Cookies: no Services, About, Field Notes or contact link. CLAUDE.md requires content reachable
  without JavaScript.
- **Evidence:** all 22 pages at 375 px with JS disabled: 0 visible nav links, hamburger does
  nothing, menu stays `visibility:hidden`. `base.css:457-460`; footer at `about.html:342`.
- **Who it serves:** visitors with JS blocked or failed (corporate locked-down browsers, a JS error
  after a deploy, slow networks where `site.js` hasn't arrived).
- **Size:** S–M (a no-JS fallback in `base.css`, or page links in the footer markup of every page)
- **Fits the rules:** yes
- **Confidence:** high.

### T4 The quiz is a dead end without JavaScript
- **What:** with JS off the quiz shows question 1 with a disabled "Next" and no message. There is
  no `<noscript>` note and no route to the contact form or Services from inside the quiz.
- **Evidence:** `quiz.html` with JS disabled: visible text is question 1 only; the only
  `<noscript>` is the reveal rule (`quiz.html:100`).
- **Who it serves:** the same visitors as T3, at the moment they asked for a recommendation.
- **Size:** S (a `<noscript>` block per language)
- **Fits the rules:** yes
- **Confidence:** high.

### T5 The contact form doesn't say which fields are required, and errors come from the browser
- **What:** name, email and message are `required`, company and service are optional, but no
  label or note says so. Errors are the browser's own bubbles, in the browser's language, not the
  page's: an English-language browser on `pt/about.html` gets English errors.
- **Evidence:** `about.html:294-319` (no marker in labels, no `aria-describedby`, no
  `setCustomValidity`); same in `pt/about.html`.
- **Who it serves:** every enquirer, at the last step; screen-reader users get "required" read out
  but sighted users don't see it (WCAG 3.3.2).
- **Size:** S (label text; the form fields and names unchanged, so `INTAKE.md` is not affected)
- **Fits the rules:** yes; touches a form's visible text, so the owner says yes first.
- **Confidence:** high for the fact; medium for how much it costs in lost enquiries.

### T6 "Porto" appears on no page, title or description; the home title is only the brand name
- **What:** the studio is in Porto, but the word is on no page except the Portugal Events article.
  Titles and descriptions say "based in Portugal". The home title in both languages is
  "Lumen and Pixel" (15 characters); Services is "Services — Lumen and Pixel". A search for
  "show control Porto" or "direção técnica eventos Porto" has nothing on the site to match, and the
  result snippet for the home page names no service and no city. The quiz is
  `noindex, nofollow` (set in an earlier release, `CHANGELOG.md:1240`), so the one tool that sorts a visitor
  into a service can never be a search landing page; worth re-asking now it is finished.
- **Evidence:** `grep -ri porto` over all `.html`: only `field-notes/portugal-events.html` and its
  PT mirror; titles measured above.
- **Who it serves:** event agencies and producers searching for a local technical partner.
- **Size:** S (head tags; visible copy belongs to the copy review CR)
- **Fits the rules:** yes. Overlaps CR (which covers meta titles and descriptions): the evidence
  here is the missing place name, which CR's voice brief would not otherwise look for.
- **Confidence:** high for the fact, medium for the search effect.

### T7 Structured data: English home only, no city, no services
- **What:** the only JSON-LD is an `Organization` on the EN home and an `Article` on each article.
  The PT home has none; the address is only `addressCountry: PT`; nothing describes the four
  services (`Service`/`ProfessionalService`), and no page has `BreadcrumbList`. Articles have
  `datePublished` but no `dateModified`, and the author is the company, not a person.
- **Evidence:** `index.html:108-131`; `field-notes/portugal-events.html:101-114`; `pt/index.html`
  has no `ld+json`.
- **Who it serves:** search engines building a knowledge panel or rich result; local search.
- **Size:** S
- **Fits the rules:** yes (no request leaves the page)
- **Confidence:** medium: it helps search engines understand the business, but no rich result is
  guaranteed.

### T8 Share cards: one English card for 22 pages, heavy, with thin alt text
- **What:** every page except the article uses `images/og-image.png` ("The creative is ready. Is
  the system?", in English), including all eleven PT pages and Services, About, Resources. The
  file is 794 KB PNG (re-encoded: 179 KB JPEG q85, 125 KB WebP q80, same 1200×630).
  `og:image:alt` is "Lumen and Pixel" on most pages and missing on both Field Notes hubs.
  `og:locale` is missing on 20 pages. `pt/index.html:22` has `og:url` `/pt/index.html` while its
  canonical is `/pt/`.
- **Evidence:** measured tags above; `images/og-image.png`.
- **Who it serves:** anyone the page is shared with on LinkedIn, WhatsApp or Slack (the usual way
  agencies pass a supplier around); PT recipients get an English card.
- **Size:** M (an image per main page and language; tags on every page)
- **Fits the rules:** yes
- **Confidence:** high for the facts; low for the size effect (WhatsApp is reported to skip large
  preview images; I couldn't test it).

### T9 Old URLs can't pass on their links: the redirect stubs are blocked in robots.txt
- **What:** `robots.txt` disallows `/articles/` and `/pt/field-notes.html`. Those stubs carry a
  canonical, `noindex` and a meta refresh to the new pages, but a crawler that obeys robots.txt
  never fetches them, so it never sees the redirect, and links to the old URLs stay with a page
  search engines can't read. Separately, every page links to `index.html` and
  `field-notes/index.html` while the canonical URLs are `/` and `/field-notes/`, so the site
  itself links to the non-canonical variant (3× `index.html` on the home page alone).
- **Evidence:** `robots.txt:6-7`; `articles/index.html:6-8`; nav markup in every page.
- **Who it serves:** search ranking of Field Notes; anyone holding an old link.
- **Size:** S
- **Fits the rules:** yes (link-href change touches the repeated nav markup, so it fits best
  with #12)
- **Confidence:** medium: the robots.txt effect is documented crawler behaviour; how many
  outside links point at the old URLs I can't see.

### T10 Field Notes hub: article titles are not headings
- **What:** the hub's only heading is its H1; each article title is a `<div class="fn-item-title
  heading">`. A screen-reader user jumping by heading finds no articles; search engines get no
  heading structure for the list. (The filter's state not being announced is #37, not repeated.)
- **Evidence:** `field-notes/index.html:131` (template comment) and the live entry below it;
  heading outline measured: one H1.
- **Who it serves:** screen-reader users browsing the writing; future hub as it grows.
- **Size:** S
- **Fits the rules:** yes
- **Confidence:** high.

### T11 Sitemap has no dates
- **What:** 14 URLs, every indexable page present and nothing extra, but no `<lastmod>`. The
  article has a publish date in its JSON-LD; the sitemap doesn't say when anything changed, so
  crawlers re-discover changes by recrawling.
- **Evidence:** `sitemap.xml` (`grep -c lastmod` → 0).
- **Who it serves:** faster pickup of new Field Notes articles.
- **Size:** S (and a habit: update on each article)
- **Fits the rules:** yes
- **Confidence:** medium-low value: search engines treat `lastmod` as a hint only.

### T12 The largest file on 20 of 24 pages is the grain texture
- **What:** `images/grain-tile-512.png` (112 KB, grey+alpha noise) loads on every page with a
  grain background, more than any font or page. Lossless WebP of the same tile is 76 KB; a 256 px
  tile would be about a quarter. Small saving; the pages are already light.
- **Evidence:** largest response on every page but legal; `base.css:883`.
- **Who it serves:** first visit on mobile data.
- **Size:** S
- **Fits the rules:** yes (changing a brand texture's file needs a visual check against the
  Brand Book)
- **Confidence:** high for the numbers; low value.

### T13 1.15 MB of unused images are publicly served
- **What:** `images/RB.png` (655 KB, 1200×1200), `images/hero-stage.png` (477 KB),
  `images/PROFILE.png`, `images/PROFILE.svg` and `images/patterns/patch-signal-dark-s77.svg` are
  referenced by no page, stylesheet or script, but anyone can open them at a guessable URL. If
  `RB.png` or `PROFILE.png` is a personal photo, it is public without being on any page (see #42).
- **Evidence:** `grep -r` for each name over `.html`, `.css`, `.js`, `.webmanifest`: no matches.
- **Who it serves:** the owner (privacy, a clean repo).
- **Size:** S
- **Fits the rules:** yes; deleting assets needs the owner's yes.
- **Confidence:** high that they are unused; what they show is the owner's to judge.

### T14 Small markup gaps found by the accessibility pass
- **What:**
  - `thank-you.html`, `check-your-inbox.html` and their PT mirrors have no skip link and their
    `<main>` has no `id`; the other 18 pages have both.
  - `about.html:256-264` (and `pt/about.html:251-259`) use `<label>` for "Based in", "Response
    time", "Works with clients", with no form control: screen readers may announce them oddly.
  - `legal.html`: the section tabs sit outside any landmark (axe `region`, moderate, the only axe
    result on the site), EN and PT.
  - `services.html` loads its icons from `../images/…` at the site root (`services.html:204`),
    which works only because browsers clamp `..` at the root; any preview served under a sub-path
    would lose them.
- **Evidence:** as cited; axe run on 24 pages.
- **Who it serves:** keyboard and screen-reader users; future maintainers.
- **Size:** S
- **Fits the rules:** yes
- **Confidence:** high.

### T15 No security headers, and no meta fallback for them
- **What:** HTTPS responses carry no `Content-Security-Policy`, `Referrer-Policy`,
  `X-Content-Type-Options` or `Strict-Transport-Security`. GitHub Pages can't set headers;
  Cloudflare (already in front, `server: cloudflare`) can. Two of them can also be set per page as
  `<meta>` (`referrer`, and a CSP that would make the zero-off-origin rule enforced by the
  browser, not only by review). A CSP would also stop the `form-action` going anywhere but n8n.
- **Evidence:** live headers on `/` and `/base.css?x=…`.
- **Who it serves:** visitors; the owner's privacy promise.
- **Size:** S (meta tags in every page) or an owner setting in Cloudflare
- **Fits the rules:** meta: yes; Cloudflare rule: needs the owner (hosting configuration).
- **Confidence:** medium: real hardening, low urgency for a static site with no logins.

## Seen, other lens
- (copy) The contact form's placeholders are "John Doe" / "Your Company" (`about.html:295,299`).
- (prospect) "Based in: Portugal" on About is the only location statement; the city never
  appears (ties to T6).
- (conversion) A 404 visitor below a folder has no working way back (T1); every link on it fails.
