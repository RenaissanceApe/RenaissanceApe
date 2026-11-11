# Discovery run 1: ranked findings

DS2, the challenger. Input: the four scout files in `_docs/discovery/` (55 findings: A1–A12,
B1–B14, C1–C14, T1–T15). Output: what survived, merged, scored and grouped. DS3 turns the top of
this list into roadmap rows; nothing here is a decision.

## How this was challenged

**Repo claims:** every file:line claim was re-opened on `origin/test` at `f889ab4` (the scouts
read `5ef3b1f`; no page changed in between). Each claim held unless marked below. Re-measured the
ones a decision hangs on: no `mailto:`/`tel:` on any page; "Porto" only in the Portugal Events
article (EN, PT); no page links to `resources.html` (only `sitemap.xml` lists it); the footer has
only Instagram, LinkedIn, Privacy, Terms, Cookies; at ≤ 900 px `base.css:455–461` hides the nav
and only `site.js` opens the menu; the four Services sections contain no link at all; the quiz has
no `<noscript>` beyond the reveal rule; `og:locale` exists only on the two article pages;
`og-image.png` is 794 KB and used by 22 pages; unused images are unused.

**Not re-measured:** pixel positions and page heights (C2, C4, C6, C10, C11), axe and keyboard
results (T-set "good shape" list), LCP/CLS. These were taken as given; no decision here hangs on
the exact number.

**Live site:** not requested. The brief forbids sending the domain to any outside service, and
T1/T2 can be judged from code (T1) or are already filed (T2 is #56).

**Outside claims:** 8 pages opened in headless Chromium (generic URLs, nothing about this studio
sent): Auditoria project page (Scope, Services Provided, DiGiCo, Optocore: all present), Auditoria
About (Emmy, AV Awards: present), WHITEvoid DIALOGUE ("485 … moving lights": present), Woodroffe
Bassett contact ("PORTFOLIO" download: present), ProIO home ("Brochure": present), OCUBO clients
("100", "300": present), Onionlab contact (field "APPROXIMATE DATE OF THE PROJECT": present; it
also loads reCAPTCHA, as DS1a said), BizBash's 8 questions (see B3, B2, B8 below). That is about
one in three of the outside URLs cited, every scout lens that cites outside sources included.

**Verification, per finding.** V = verified, P = partly true, X = not true.

| IDs | Status | Note |
|---|---|---|
| A1, A2, A4, A5, A7, A8, A9 | V | outside pages above hold; repo side holds (`about.html:199` hidden founder, `:226–241` the one story, `field-notes/index.html:121` filter) |
| A3 | V | six logos, `index.html:236–256`, no links |
| A6, A10, A12 | V as observations | value depends on facts nobody has checked (does the owner hold credentials, talks, real tools?) |
| A11 | V | no page names the buyer types |
| B1, B4, B5, B7, B9, B10, B11, B12, B14 | V | B5: no pricing words (grep hits are "feel"); B9: `legal.html` has no entity, NIF or address |
| B2 | V, stronger than stated | BizBash asks "Do you use the same crews for each event?" |
| B3 | P | the gap is real; BizBash's list does not ask about "events of a similar size" (its questions are cost structure, tools, own vs sourced gear, crews, setup time, emergencies, rehearsals) |
| B6, B13 | V | form fields at `about.html:293–330` |
| B8 | V, stronger than stated | BizBash asks "Do you own or source your audiovisual equipment?" |
| C1, C2, C3, C5, C6, C7, C8, C10, C11, C12, C13 | V | C3: `id="contact"` is the newsletter (`index.html:267`) |
| C4 | V | result's filled button is "See full service detail" (`quiz.html:346`) |
| C9 | P | the "if you signed up for updates" line is not wrong: the contact form has a newsletter consent box (`about.html:328`), so it applies to some contact visitors. It is unclear, not mistaken |
| C14 | V | the value is set as text (`.value`), so it is a data-hygiene bug, not a security hole |
| T1 | V in code | `404.html:6–9, 57–58` relative links and icons under root-absolute CSS; not re-checked live |
| T2 | not re-checked | already #56 |
| T3, T4, T5, T6, T7, T9, T10, T11, T12, T14 | V | T14 also: quiz result `<h1>` text reads "TechnicalDirection" (`quiz.html:406`, `<br>` with no space) |
| T8 | V | `og:locale` is missing on 22 pages, not 20; `pt/index.html:22` `og:url` is `/pt/index.html` |
| T13 | V | `images/RB.png` is a portrait photo, most likely the photo meant for the hidden founder section (#42); `PROFILE.png` is a logo avatar. Not urgent: the founder's name is already public in About's meta description (`about.html:17`). Owner's call |
| T15 | V | headers not re-checked live |

Nothing turned out urgent and unfiled, so the Dispatcher was not messaged mid-run.

## Ranked

Value 1–5 (to winning enquiries from the right buyers), Conf. 1–3, Effort 1–5 (agent build plus
owner time; 5 = most). Score = Value × Conf. ÷ Effort.

| Rank | Item | From | Value | Conf. | Effort | Score | Needs from the owner |
|---|---|---|---|---|---|---|---|
| 1 | Contact links where the reader decides: each Services section, the Services close, the Home banner | C2, C3, B11 (CTA part) | 4 | 3 | 1 | 12.0 | approve 2–3 button labels |
| 2 | Show the founder (and sign the articles) | A4, B2, #42 | 5 | 3 | 2 | 7.5 | publish or delete (#42); bio facts; photo (RB.png?) |
| 3 | Proof of work: a Work section with case pages | A1, A2, A3, A7, A8, B1 | 5 | 3 | 5 | 3.0 ↑ | 3–4 projects with facts, photos, permission to name clients |
| 4 | Say where, how far, in what languages | B4, B7, T6, B14 (paragraph) | 3 | 3 | 1 | 9.0 ↓ | city on the site; travel terms; working languages |
| 5 | A footer that navigates: pages, Resources, Contact | C1, C13, T3, C7, Resources orphan | 4 | 3 | 2 | 6.0 | show the email address? call it "Contact"? |
| 6 | Scale in numbers | B3 | 3 | 3 | 2 | 4.5 | 3–4 true figures |
| 7 | "Working with us": how we quote, what we supply, what to send, what happens next | B5, B8, B13, A11, B6 (text), B9 (insurance line) | 4 | 2 | 2 | 4.0 | the facts; whether pricing shape goes public |
| 8 | Article end: author, studio, links to Services and the form | B12, C11, B2 (byline) | 3 | 3 | 2 | 4.5 | byline name; D43 revisited |
| 9 | Contact section on a phone: land above the form; mark required fields | C6, T5 | 2 | 3 | 1 | 6.0 ↓ | yes to the visible form text |
| 10 | Quiz result: make "Start a conversation" the lead button | C4 | 2 | 2 | 1 | 4.0 | the order |
| 11 | Show sample deliverables (a redacted plot, patch sheet, previz still) | B10 | 3 | 2 | 3 | 2.0 | the documents, cleared to show |
| 12 | Ask for date, place and size on the form | B6 (fields), C8 | 3 | 2 | 3 | 2.0 | yes; INTAKE.md and n8n change |
| 13 | Self-hosted showreel | A9 | 3 | 2 | 5 | 1.2 | the footage and an edit |
| 14 | Studio PDF, EN and PT | A5 | 2 | 2 | 3 | 1.3 | approve; keep it current |
| 15 | Carry the quiz's mode to the form | C5 | 2 | 2 | 3 | 1.3 | yes; INTAKE.md and n8n change |
| 16 | Meta CSP and referrer policy | T15 (meta part) | 1 | 2 | 2 | 1.0 | yes (a wrong policy silently breaks things) |
| 17 | Newsletter sign-up on Field Notes and Resources | C10 | 1 | 2 | 3 | 0.7 | yes; INTAKE.md `source_page` values |

Technical quick fixes (T1, T7, T8 tags, T9 robots, T10, T14, C12/T4, C14) score 2–6 but are
listed under **Quick fixes**, not ranked: none moves an enquiry much, and none needs the owner.

**1. Contact links in Services and on Home.** The page where a buyer has just read "Technical
Direction" offers no way to ask for it; its one action sends them to a four-question quiz, whose
result links back to Services (a loop with no form). Home ends in a headline with no button and a
newsletter. *Matters:* yes, this is the moment of intent on the two most-shared pages. *Effort:*
tiny; `about.html?service=TD#contact-form` already pre-fills. *Rules:* fine; no form change; new
labels need the owner's yes; the one-green-button rule (#35) means the new links are secondary or
text buttons. *Depends:* nothing. Top because it is the cheapest change that closes a real leak.

**2. Show the founder.** Seven of nine peers name their people; a founder-led practice that hides
its founder asks the buyer to hire nobody. The section is built and hidden, a portrait is already
in `images/`, and the founder's name is already public in About's meta tags, so hiding it buys
little privacy. Articles are written in the first person with no visible name. *Matters:* yes,
most of all to festivals hiring a TD (a person). *Effort:* small for the agent; the owner must
decide (#42 is `needs-ricardo`) and fix the bio, which CR3 would then voice. *Rules:* fine.
*Depends:* #42. Ranked high although filed, because the score says so and DS3 should push it.

**3. Proof of work.** The one gap every lens found: one anonymous story, six unlinked logos, an
empty Case Studies filter, no photograph of a show. A Work hub plus a fixed case template
(client or description, event and size, year, which service, role, the system that mattered, a
number, credits, photos), then logos and Services sections linked to cases. *Matters:* most of
all; buyer guides and 8 of 9 peers lead with it. *Effort:* 5, almost all of it the owner's
(facts, photos, client permissions); the template is small. *Rules:* photos self-hosted; video
self-hosted or nothing; clients named only with permission. *Depends:* the owner's content.
*Override:* the formula puts it at 3.0, below cheap items; I moved it to 3 because nothing else
on this list does the same job and the owner's content takes longest, so it should start first.

**4. Where, how far, what languages.** "Based in Portugal · Working worldwide": no city on any
page, title or description; no travel terms; no working languages. A Madrid or London agency
prices travel from the city. *Matters:* yes but modestly. *Effort:* one line on About, a phrase in
Home and the titles; three answers from the owner. *Rules:* fine. *Depends:* overlaps CR (titles
and descriptions), but CR is "wording only" (D13) and a city is a fact, so it needs the owner's
facts first. *Override:* the formula ranks it 2nd; lowered because value per buyer is smaller
than items 2 and 3. B14 (a page for foreign agencies) is cut to one paragraph here: no evidence
of demand.

**5. A footer that navigates.** On a phone the nav's "Get started" is hidden, no page body links
to the form, the footer links only socials and legal, nothing says "Contact", and with JavaScript
off a phone visitor has no navigation at all. Resources has no inbound link anywhere. One footer
row (Services, About, Field Notes, Resources, Contact, optionally the email address) fixes
C1, T3 and the orphaned Resources in one move, and C13 in part. *Matters:* yes for phone visitors;
T3 alone is generic. *Effort:* shared footer markup in 24 pages plus `base.css`; one worker,
mechanical. Much cheaper after #12. *Rules:* the email address is the owner's call (spam; it is
already public in JSON-LD); a `mailto:` loads nothing. *Depends:* #12 helps; #51 (stale
stylesheet after a release) applies to any `base.css` change.

**6. Scale in numbers.** Only "1,200 guests" anywhere. The voice rules ask for specific numbers.
*Matters:* yes (am I in range?). *Effort:* small, once the owner has 3–4 true figures. *Rules:*
fine. *Depends:* owner's facts; CR can't invent them. Best built inside the Proof set.

**7. "Working with us".** One block: how a quote is built (day rate vs fixed fee per phase, no
figures needed), whether the studio supplies gear or is independent of rental houses, who it
works for and alongside, how early to book, what a useful first message contains, and what
happens after it, plus one line on insurance. BizBash asks two of these questions outright.
*Matters:* yes for agencies; the pricing part is the owner's strategy call (peers don't publish
prices; a shape is not a price). *Effort:* small text, EN and PT. *Rules:* new visitor-facing
text. *Depends:* owner's facts; touches `services.html`/`about.html`, which CR3 owns, so it runs
after CR3 or its facts go into CR3 as approved meaning changes. Confidence 2: which answers are
true is unknown.

**8. Article end.** The one article ends in a cal.com button only, no author, nothing about the
studio, no link to Services or the form; the template ends differently (D43 left both as they
are). A small author-and-studio block on the template, applied to the article. *Matters:* yes;
it is the most shareable page. *Effort:* small. *Rules:* fine. *Depends:* item 2 (whose name);
D43 should be re-asked; CR5 owns `field-notes/`, so after CR5 or inside it.

**9. Contact section on a phone.** "Get started" scrolls past the reply promise and the booking
button; required fields are not marked and errors come in the browser's language. *Matters:*
small. *Effort:* tiny. *Rules:* changing visible form text needs the owner's yes (not
INTAKE.md). Lowered from its score: it polishes a path that items 1 and 5 first have to feed.

**10. Quiz result order.** The filled button leads away from the form. *Matters:* plausible, no
data. *Effort:* tiny. *Depends:* owner's choice (like D23).

**11. Sample deliverables.** Services promises plots, rack diagrams, renders; shows none. One
redacted sheet is strong proof for system buyers. *Effort:* moderate; owner must clear documents.
Belongs in the Proof set.

**12. Date, place, size on the form.** Onionlab asks for the date; this form asks for none of the
three facts a first reply needs. *Matters:* moderately; only the owner's inbox shows the round
trips. *Effort:* fields are easy; INTAKE.md, n8n and Notion change with them, and the owner must
say yes. Try the cheap version first: a better message placeholder (absorbed into CR3).

**13. Showreel.** Strong for festival and touring buyers, weak for system buyers. Effort 5: the
footage. Self-hosted only (a Vimeo/YouTube embed breaks the zero off-origin rule). Park until
the Proof set shows whether footage exists.

**14. Studio PDF.** Two of nine peers; useful for agencies forwarding suppliers. Costs upkeep in
two languages. After the Proof set, built from its content.

**15. Quiz mode to the form.** The studio loses "Full Production Cycle" etc. Needs an INTAKE
change for a small gain. Only worth doing together with item 12 (one contract change, not two).

**16. Meta CSP.** The one technical item that fits this site's character: the browser would
enforce zero off-origin loads, and `form-action` would pin the form to n8n. Every page has inline
script and style, so the policy needs `'unsafe-inline'`; a wrong policy fails silently. Low
value, real risk. The Cloudflare-header half is the owner's (hosting).

**17. Newsletter on more pages.** Grows a list, not enquiries; needs INTAKE.md. Last.

## Quick fixes (agent only, no owner content)

Each is small, needs no facts from the owner, and changes no form field, consent text or brand
constant. Visible wording is limited to short new lines the owner approves in the PR. They touch
pages CR2–CR5 also own, so run them before CR's rewrites start or after CR6, not beside them.

- **QF1 (T1)** `404.html` and `pt/404.html`: root-absolute links, icons and logo (`/index.html`,
  `/images/…`), so the page works below a folder. Leave the language question (only the root 404
  is ever served) to DS3: it needs a parity-check exception or a two-language 404.
- **QF2 (C12, T4)** `quiz.html`, `pt/quiz.html`: a `<noscript>` line pointing to Services and the
  contact form.
- **QF3 (C14)** `about.html`, `pt/about.html`: accept only `SD|SC|SA|TD` from `?service=`; ignore
  anything else (matches INTAKE.md as written; no contract change).
- **QF4 (T10)** Field Notes hubs: article titles as `<h2>`, same look.
- **QF5 (T14)** skip link and `id="main-content"` on `thank-you` and `check-your-inbox` (EN, PT);
  About's three `<label>`s with no control become plain text; Legal's tab bar inside a landmark;
  `services.html` `../images/` → `images/` (EN, PT).
- **QF6** quiz result `<h1>`: a space before each `<br>` so it reads "Technical Direction".
- **QF7 (T8, tags only)** `og:locale` (`en_GB`/`pt_PT`) and `og:locale:alternate` on every page;
  `pt/index.html` `og:url` → `/pt/`; `og:image:alt` that describes the card on every page;
  re-encode `og-image.png` as JPEG (~180 KB, same 1200×630 picture, D25 unchanged), checked by eye.
- **QF8 (T7)** `Organization` JSON-LD on `pt/index.html`; `addressLocality` on both. The city
  waits for item 4's yes if the owner prefers it off the site.
- **QF9 (T9)** `robots.txt`: drop the two `Disallow` lines so crawlers can see the redirects.

## Candidate sets

**Proof of work** (items 3, 2, 6, 11; later 13, 14). The largest gain, gated by the owner.
- PW1: Work hub and case template, EN and PT, sitemap, nav entry; the About story becomes case 1.
  Owns `work/`, `pt/work/` (new), `sitemap.xml`.
- PW2: cases 2–4 from the owner's facts. Owns the case pages.
- PW3: tie proof in: logos link to cases, each Services section gets "Related work", the empty
  Case Studies filter gets entries (#38). Owns `index.html`, `services.html` (EN, PT) and the hubs.
- PW4: founder section published and articles signed (#42, B2). Owns `about.html` (EN, PT).
- PW5: a row of 3–4 figures (B3) on Home or About.
- PW6 (optional): sample deliverables on Services (B10).
- *Owner first:* 3–4 projects (client or description, year, size, role, system, a number),
  photos, which clients may be named, the #42 decision and bio, the figures, any cleared
  documents. Start collecting during the copy review; build after CR3, which owns About and
  Services.

**Contact and enquiry path** (items 1, 5, 9, 10; optional 12 + 15 together).
- CE1: contact links in each Services section and close, and a button in the Home banner.
- CE2: the footer row (pages, Resources, Contact, email if yes). Owns the footer markup and
  `base.css`.
- CE3: About's contact section: anchor to the section, required-field marks.
- CE4: quiz result button order.
- CE5 (only with an explicit yes): optional date/place/size fields and the quiz mode in one
  INTAKE.md change, n8n and Notion updated the same day.
- *Owner first:* labels; email shown or not; "Contact" in the nav (relates to #35/D22); button
  order; CE5 yes or no. Can run beside the copy review only if CR's workers don't own the same
  pages at the same time; otherwise straight after CR6.

**Working with us** (items 7, 4, 8). Mostly the owner's facts, a few short blocks.
- WW1: "How we work and quote" on Services (B5, B8, B13, A11, B6 text, insurance line).
- WW2: city, travel terms, working languages on About and Home; titles and descriptions name
  Porto (T6).
- WW3: author-and-studio block on the article template and the article (needs PW4's name).
- *Owner first:* pricing shape, supplier or independent, lead time, insurance, city, travel,
  languages, D43. Could be folded into CR3/CR5 as owner-approved meaning changes instead of a set.

**Upkeep** (QF1–QF9): one solo PR or a small set; DS3 decides.

## Absorbed by sets already on the roadmap

- B11 (who and where in the Services hero) → CR3, with item 4's facts.
- C9 thank-you wording ("shortly" vs one business day, the unclear newsletter line) → CR2. Adding
  a booking link there is a meaning change: put it in CR2's before/after table for the owner.
- C8 / B13 lighter option (a message placeholder that asks for date, venue, size) → CR3.
- Contact placeholders "John Doe" / "Your Company" (T-side note) → CR3.
- About's meta vs OG descriptions disagree ("technical director" vs "lighting designer") → CR3.
- C10 newsletter promise ("Keep up with the latest news") → CR2.
- T6 wording of titles and descriptions → CR (the city itself is item 4).
- A12 (own tools as proof of depth) → PQ; the Previz quadrant is exactly this.
- Resources reachable from Field Notes or the nav → PQ3 ("nav slot if wanted"); the footer link
  is item 5.
- T9 internal links to `index.html` instead of `/` → Markup (#12): it is nav markup in every page.
- C13 nav label, C1 nav/footer repetition → Markup (#12) makes it one edit.
- B9 company name, NIF and address on Legal → Legal (#28).
- T8 per-page and per-language share images → Languages (TR): one card per language once there
  are five; D25 chose one English card for now.
- "This site sets no cookies" as a selling line (DS1a side note) → CR, if the owner wants it.

## Rejected

- **T11** (`lastmod` in the sitemap): a hint search engines mostly ignore, and with no build step
  the dates go stale and mislead. Not worth it.
- **T12** (grain tile 112 KB): pages weigh 124–347 KB and load in under 2 s throttled; it is a
  brand texture. Not worth it.
- **T15** Cloudflare headers: hosting configuration agents may not touch; the HTTPS half is #56.
  The meta half is item 16.
- **A6** (credentials), **A10** (talks and publications): only if they exist; if they do, a line
  in PW4. Parked until the owner says so, not ranked.
- **B14** as its own page: no evidence of demand; kept as one paragraph in item 4.
- **Per-page share images now** (T8 rest): conflicts with D25 and multiplies under TR.
- **"Opens in a new tab" on external links** (DS1c side note): generic best practice, low effect
  here.
- **Quiz `noindex`** (T6 aside): a question for the owner, not a finding; DS3 may add it to
  PENDING.

## Already filed

- T2 (plain `http://`, no HSTS) → #56.
- A4, B2 (founder hidden), T13 (`RB.png`, the likely founder photo) → #42.
- A8, B1 (empty Case Studies filter and its message) → #38.
- T10 is new; the filter's state not being announced is #37.
- C10's dead "Academy" link → #40.
- One filled green button vs the nav button (relevant to items 1 and 10) → #35 (decided as D22).
- Shared nav and footer markup (C1, C13, T9) → #12.
- Any `base.css` change (item 5, QF5) meets the stale-stylesheet problem → #51.
- A12 → #13 (the Previz quadrant).
- T15 Cloudflare as host → #5 (deferred).
- Copy-voice lines on About (seen while verifying) → #41.
