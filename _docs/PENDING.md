# Pending

Things waiting on the owner. Section 1: one-time setup. Section 2: things to try by hand after a
release. Section 3: decisions, each with the answer assumed until the owner gives one.

## 1. Setup

- [x] GitHub → Settings → General → Pull Requests: allow **merge commits** and **squash merging**
      (PARALLEL.md, "What you set up once").
- [ ] Optional: branch rules on `test` and `main` requiring the `checks` job.
- [ ] Issue #14 ("start here") is the old running order; `_docs/ROADMAP.md` replaces it. Close it
      or point it at the roadmap.

## 2. To try by hand

### v1.56 brand refresh

Everywhere:

- [ ] On a phone, open the menu on the home page and on Services (EN and PT): it should cover the
      page, the current page should show a green square, and Escape / the X should close it.
- [ ] On a desktop, hover each nav link: a green line slides in under it; the current page keeps
      it.
- [ ] Read a long page (Services, a Field Note) and say if Inter reads well at body size.
- [ ] Turn on "reduce motion" in the OS and reload the home page: nothing should slide or loop.
- [ ] Home, Services and 404: is the grain the right strength? (Too strong or too faint is a
      one-number change in `_tools/grain.mjs`.)
- [ ] After release, paste a page link and the Portugal Events article link (EN and PT) into
      WhatsApp or LinkedIn: the new card should show. Old cards can stay cached for days.

Home, 404 and the confirmation pages:

- [ ] Home on a phone and a desktop (EN and PT): the hero is a dark blue field with a soft green
      glow top right, no logo or second headline behind the text.
- [ ] Home: each of the four service cards shows its green/blue gradient.
- [ ] Home: move the mouse over the newsletter email field: its border turns light blue, like the
      contact form's fields.
- [ ] Subscribe to the newsletter from the home page with a test address: you should land on
      "Check your inbox", with the same top bar as the rest of the site. (The form was not
      changed, only its styling and where the styles live.)
- [ ] Open a wrong address (for example `/nope.html`): the 404 page shows a dotted ground, one
      green button and one outlined button.

Services and About:

- [ ] Services (EN and PT), phone and desktop: scroll the page and check the tab bar stays under
      the nav and the highlighted tab follows the section; open each accordion.
- [ ] About (EN and PT): send one test message from the contact form and confirm it arrives in
      n8n as before (only the styling changed, and where the styles live).
- [ ] About: tab through the form with the keyboard: every field shows a green outline.

Quiz and Resources:

- [ ] Take the quiz to a result in EN and in PT, then press "Start a conversation": the contact
      form should open with the matching service already selected.
- [ ] In the quiz, pick an answer and check you can tell which one is chosen without relying on
      the green (filled square on the right, filled letter).
- [ ] In the quiz, on question 2, hover "Back": the arrow slides slightly to the left.
- [ ] Resources on a phone and a desktop: say if the Patch behind the headline is too strong.

Field Notes and Legal:

- [ ] Field Notes (EN and PT) on a phone and a desktop: the hero shows the Patch pattern, and the
      three filter buttons work; the active one has a green square in front of its name.
- [ ] Read the Portugal Events article on a phone, in both languages, and say if the body text
      and the pull-quote read well.
- [ ] Tab through an article with the keyboard: each link and the button show a green outline.
- [ ] Legal, Field Notes and Resources on a phone and a desktop: the space under the hero is a
      little larger than before and matches About and Services.

## 3. Decisions

**D1–D11 were accepted as assumed by the owner on 2026-11-11: the right-hand column is the
decision.** D12–D20 are still open; D21 was used as assumed by discovery run 1. D22–D47 came out
of the brand refresh (v1.56): each is built as assumed, and stays that way unless the owner says
otherwise. D48–D69 came out of discovery run 1 (v1.57, [DISCOVERY.md](DISCOVERY.md)): nothing is
built on them yet; the proposed sets in ROADMAP wait on them, and "Assumed" says what the
challenger assumed or what stays as it is meanwhile.

| # | Question | Assumed until answered |
|---|---|---|
| D1 | How do you look at a feature set before merging it? `test` is not published anywhere. (a) The Dispatcher sends a private page of before/after screenshots of every page. (b) A preview host that serves `test` (a new third-party service). | (a) |
| D2 | Small grey text (footer, metadata) fails WCAG AA in gray-500. Move it to gray-300 (`--text-muted`) and change no brand colour? This closes #16 and is the "UI palette" of #27: the semantic tokens in DESIGN.md. | Yes |
| D3 | Rail Grid (one rail column + four content columns on every page): part of the brand refresh, or its own later set? It restructures every page. | Later set |
| D4 | Sand grain tile `grain-tile-512.png`: do you supply the master, or does BR2 generate one to the Brand Book description for you to approve in the preview? | BR2 generates |
| D5 | Signal Pixel icons and the Pixel Build logo reveal need `ICONS.md`, which is not in the repo. Leave both, and the PNG service icons, for a later set? | Later set |
| D6 | Decoration per page. Home hero: Signal Glow + grain. Services, About, Quiz, Resources, Field Notes heroes: Patch, tone on dark. 404 and the two confirmation pages: Pixel Field. Legal: none. Patch in Signal mode (green on navy): nowhere for now. | As listed |
| D7 | Version: the set ships as v1.56, or does the refresh deserve v2.0? | v1.56 |
| D8 | Is copy in scope? The refresh is visual only; text that breaks the voice rules is reported, not rewritten. | Visual only |
| D9 | Delete the Nunito font files once Inter is in? | Yes |
| D10 | DESIGN.md sizes display type at 56/40/28 px. Follow that scale exactly even where a page's headline is larger or smaller today? | Yes |
| D11 | `CLAUDE.md`, `DESIGN.md`, `INTAKE.md` and `CHANGELOG.md` are served on the public site (e.g. `/CLAUDE.html`). Hide them (upkeep step U1), or leave them? | Leave for now |
| D12 | Copy review: how do you approve rewritten text? (a) A before/after table per page in each PR, you edit or approve there. (b) Workers rewrite freely and you read the result in the preview. | (a) |
| D13 | Copy review: may meaning change (claims, numbers, service descriptions, calls to action), or only wording? And is there writing of yours the rewrite should sound like (emails, posts, proposals)? | Wording only; Brand Book §10 as the model |
| D14 | Previz quadrant: where does it live? (a) In this repo at a path such as `/tools/previz-maturity/`, possible since the forms posture was decided in v1.54. (b) `tools.lumenandpixel.com` as issue #13 planned (needs one DNS record from you and a second host). | (a) |
| D15 | Previz quadrant: the tool's repository (`MarurityQuadrant`, issue #13) is not attached to the Dispatcher's session. Grant access so PQ1 can copy it in? | Needed before PQ1 |
| D16 | Previz quadrant: does it ask for an email (optional report, newsletter)? If yes it needs a form, a `form_type` in `INTAKE.md`, and n8n and the legal pages change with it. The result itself stays reachable without an email. | No email in the first version |
| D17 | Languages: which variants? German for Germany, French for France, Spanish for Spain. URL folders `/de/`, `/fr/`, `/es/`; English stays at the root. | As listed |
| D18 | Languages: who checks the translations? (a) A second bot reader per language only. (b) A native speaker you name reads at least home, services and the contact form before each language goes live. | (b) for legal and the contact form, (a) elsewhere |
| D19 | Languages: forms would send `lang` = `de`, `fr`, `es`. n8n and MailerLite must handle them (reply language, sequences), and you answer enquiries in those languages. Ready for that, or should the new languages' forms say replies come in English? | Needs your answer before TR1 |
| D20 | Languages: are Field Notes articles and the legal pages translated too, or only the main pages? | Everything except legal, which waits for #28 and a human check |
| D21 | Discovery: who are the comparable studios to look at, and which markets matter most? Any ideas that are off the table from the start? | **Used, as assumed** (discovery run 1, v1.57): nine studios in PT, ES, FR, DE and the UK. Answer it before the next run if the list should change |
| D22 | **#35.** The nav's "Get started" is filled green on every page, so any page with its own green button shows two, against "one filled green button per viewport". Make the nav button outlined, or count the nav as outside the rule? (On Resources the Academy button became outlined, so page content keeps to one.) | The nav button is chrome, outside the rule, and stays green |
| D23 | Home hero buttons: "Find your fit" is now the filled green button and "Explore services" the outlined one (before, both were outlined). Swap them if services should lead? | "Find your fit" leads |
| D24 | Nav width: `DESIGN.md` gives the bar 64 px side padding; it still lines up with the pages' 1200 px column. Change now, or with the Rail Grid? | Keep until the Rail Grid (Layout set) |
| D25 | The site-wide link-preview image (`images/og-image.png`) needs a title: the home headline, a tagline of yours, or no title (lockup and domain only)? One file serves EN and PT pages. | The home headline "The creative is ready. Is the system?", in English |
| D26 | The stage photograph that was the home hero's background: keep it for later use, or delete it? | Kept as `images/hero-stage.png` (477 KB, used by nothing) |
| D27 | **#31.** Favicon and app icons: the mark's pixel is #00ff40 and its body #32ff32; the Brand Book wants one green (#33fb31). Supply corrected files, or have an agent redraw them from the mark in `DESIGN.md`? | Nothing changed; redrawing is in the Icons and motion set |
| D28 | Home service cards: their gradients were hidden on the live site by a CSS slip (flat dark cards) and are visible again. Were the flat dark cards preferred? | Gradients visible |
| D29 | Newsletter field text size: `DESIGN.md` sets inputs at 14 px; iPhones zoom the page when a field under 16 px is focused. Use 16 px on phones? | Follow `DESIGN.md` (14 px) |
| D30 | Home: the full-width green marquee strip is more green than the "about 5% of a surface" rule, and it loops. Keep, tone down, or remove? | Left as it is |
| D31 | **#41.** About has three lines off the brand voice ("my passion", "world-class design project", "something great"). Rewrite to Brand Book §10, or keep? | Kept (D8, visual only); handled in the copy review |
| D32 | **#42.** About's HTML holds a hidden founder section with placeholder text ("Add your photo here"). Publish it with a photo, or delete it? | Left hidden |
| D33 | About: "Book a discovery call", Instagram and LinkedIn are now secondary buttons (grey border, white text, green on hover); before, the call button had a green outline and green text. Keep, or make the call button a text button? | Secondary |
| D34 | Services: card titles inside the accordions are 19 px (`.heading`); before they were 16 px. Keep 19 px to match the scale, or add a smaller card title to `DESIGN.md`? | 19 px |
| D35 | Quiz: the Patch and grain sit behind the whole quiz, not a hero band, because the quiz has no hero and D8 rules out adding a headline. The answer cards are solid, so their text stays clean. All right? | Yes |
| D36 | Resources: the nine software and topic pills use the shared mint `.tag`. It is the `DESIGN.md` tag, but adds more green to the cards than before. Keep, or add an outlined tag variant? | Keep |
| D37 | Quiz progress indicator: "square segments" was read as four square-cornered bars across the full width (4 px, the current one 8 px), not four small squares. Did you mean squares? | Bars |
| D38 | **#40.** Resources: the "Academy launching soon" button is a link to "#" that goes nowhere and that the keyboard can still reach. Make it plain text until the Academy has a page, or point it somewhere (the newsletter, the contact form)? | Left as it is (outlined button) |
| D39 | Field Notes pull-quote: it was three sentences in Space Mono bold; `DESIGN.md` says never a paragraph in Space Mono. Inter (lead size) on a green rule, or shorten the quote to two lines and keep Space Mono? | Inter on a green rule |
| D40 | Field Notes: "Field Note" above an article title was grey on purpose (to keep green rare); `DESIGN.md` says eyebrows are green. Which? | Green, via the shared `.eyebrow` |
| D41 | Field Notes: Article and Case Study tags had different colours; the `tag` spec has one style. One style, or two? | One style; the word tells them apart |
| D42 | Numbers inside sentences (for example "500.000 €" in a paragraph) stay in Inter; the data style is used for dates, reading time and table values. Wrap figures in prose too? | Prose figures stay in Inter |
| D43 | Field Notes: the published article ends with a green button to cal.com; the template ends with a text link to the contact form. Which ending should new articles use? | Each left as it is |
| D44 | **#38.** Field Notes hub: the message shown when a filter has no articles is out of date, and EN and PT say different things. What should it say? | Left as it is (D8, visual only); can go with the copy review |
| D45 | Hero spacing: every hero band now has 96 px below it, as About and Services had. Legal and the Field Notes hub had 64 px. Keep 96 everywhere, or 64 everywhere? | 96 px everywhere |
| D46 | The `brand` check's colour rule is stricter than first described: a raw colour fails in a page even when it equals a token value, and `base.css` has no allowance for `rgb()` with alpha, because nothing uses one today. Keep it strict, or allow alpha forms of token colours in `base.css`? | Strict |
| D47 | Tab bars: Services and Legal each style their own, and they differ (hover and active colour is white on Services, green on Legal). Leave, or one shared tab bar? | Leave |
| D48 | Discovery: which proposed sets run, and in what order? **Contact and enquiry path** (CE1–CE5), **Proof of work** (PW1–PW6), **Working with us** (WW1–WW3); ROADMAP "Suggested order" puts them Upkeep 2 → Contact → Copy review (with Working with us) → Proof of work → Previz → Languages. | That order; none starts until you pick it. Upkeep 2 needs no answer and can start now |
| D49 | **CE1.** Labels for the new contact links on Services (one per service and one at the close) and the button in the Home banner. For example "Ask about Technical Direction" / "Pergunte sobre Direção Técnica", "Start a conversation" / "Vamos conversar". | Secondary or text buttons (D22 keeps the nav's green); wording proposed in the CE1 PR for your yes |
| D50 | **CE2.** Show the email address in the footer as a `mailto:` link? It is already public in the home page's structured data; showing it invites some spam, and loads nothing. | Not shown; the footer's "Contact" goes to the form |
| D51 | **CE2.** Call the form "Contact" in the footer, and add "Contact" to the nav? The nav's "Get started" already goes to the form, and the nav's green button is D22 (#35). | "Contact" in the footer only; the nav stays as it is |
| D52 | **CE4.** Quiz result: make "Start a conversation" the filled button and "See full service detail" the outlined one (today it is the other way round, so the lead button points away from the form)? Like D23 for the home hero. | The challenger suggests the swap; as it is until you say |
| D53 | **CE5.** Add optional date, place and audience-size fields to the contact form, and carry the quiz's mode ("Full Production Cycle" …) into the form, as **one** `INTAKE.md` change with n8n and Notion updated the same day? Yes or no. | No. The cheaper version first: a message placeholder that asks for date, venue and size, inside the copy review (CR3) |
| D54 | **Proof of work.** Which 3–4 projects become case pages (client or a description, year, size, your role, the system that mattered, one number, photos), and which clients may be named? | Nothing built until the material is in; clients named only with their permission |
| D55 | **PW4.** If the founder section is published (D32, #42): is `images/RB.png` the photo, and what are the bio facts? Articles would then be signed with the same name. | `RB.png` is the likely photo; nothing published until D32 is answered |
| D56 | **PW5.** 3–4 true figures for scale (for example shows a year, the largest audience, countries worked in, years in the trade). Today only "1,200 guests" appears anywhere. | No figures added; the copy review can't invent them |
| D57 | **WW1.** Say publicly how a quote is shaped (day rate, or a fixed fee per phase), with no prices? Peers don't publish prices; a shape is not a price. | Shape public, no figures |
| D58 | **WW1.** Does the studio supply equipment, or is it independent of rental houses and specifies what others supply? Buyers ask this outright. | Not stated until you say |
| D59 | **WW1.** How early should a client get in touch (lead time), for a festival and for a corporate show? | Not stated until you say |
| D60 | **WW1.** One line on insurance (for example public liability cover): do you hold it, and may the site say so? | Not stated until you say |
| D61 | **WW2.** On the site: the city (Porto), travel terms (for example "travel and lodging at cost outside Portugal"), and working languages. The city would also go in the page titles and in the structured data (`addressLocality`, held back from Upkeep 2 for this). | "Based in Portugal · Working worldwide", as today |
| D62 | A studio PDF (EN and PT) for agencies to forward: wanted? It needs keeping current in two languages. | Not built; if yes, after Proof of work, from its content |
| D63 | A showreel: is there footage, and an edit? It would be self-hosted video only (an embed from Vimeo or YouTube breaks the zero off-origin rule). | Parked until Proof of work shows what footage exists |
| D64 | **PW6.** Sample deliverables shown on Services (a redacted lighting plot, patch sheet, previz still): which documents may be shown, cleared by the clients concerned? | Not built until documents are cleared |
| D65 | Newsletter sign-up on Field Notes and Resources too? It grows the list, not enquiries, and needs new `source_page` values in `INTAKE.md`. | No; last on the list |
| D66 | A Content Security Policy in a `<meta>` tag on every page: the browser would enforce "nothing from another origin" and pin the form to n8n. A wrong policy breaks things silently, and every page needs `'unsafe-inline'`. | Not added |
| D67 | Fold **Working with us** into the copy review (WW1 into CR3, WW3 into CR5) as meaning changes you approve, instead of a separate set? This relaxes D13 ("wording only") for those blocks only, and WW3 also re-asks D43 (how articles end). | Folded in, if you agree; otherwise it runs after CR6 |
| D68 | **UP4.** Once the link-preview cards are JPEG (about 200 KB instead of 795 KB), delete the three old PNGs (`images/og-image.png`, `images/og/portugal-events-en.png`, `-pt.png`)? Nothing will use them. | Kept until you say yes |
| D69 | Hide the quiz from search results (`noindex`)? A search visitor landing on question 1 gets little context; the Services page answers the same search better. | Left indexed |
