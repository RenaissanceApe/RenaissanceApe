# DS1b: What a prospective client looks for and can't find here

## How I looked

- **When:** 2026-11-11, on `origin/test` at `5ef3b1f` (same as `main`, v1.56).
- **Site:** read from the repository, not the live site or a search engine. I pulled the visible
  text of every EN page with a small tag-stripping script, then grepped the PT mirrors for the
  same places (`pt/index.html`, `pt/about.html` and others). Line numbers below are for the EN
  file unless marked PT; the PT line is usually within a few lines of it.
- **Greps across all pages:** `mailto:`, `tel:`, `Porto`, insurance and safety words, price,
  budget and quote words, language words, legal-entity words (Lda, NIF, VAT), `<img` sources, and
  inbound links to each page.
- **Open issues:** listed with the GitHub tool (14 open). I cite #42 and #41 rather than
  re-report them.
- **Outside sources (generic searches only):** what buyers ask when hiring event AV or technical
  production. Most of these are written by vendors, so I use them only for *which questions buyers
  ask*, not for any figures:
  - BizBash, "8 questions to ask before hiring an event production company":
    https://www.bizbash.com/production-strategy/opinion-experts/article/13233700/checklist-8-questions-to-ask-before-hiring-an-event-production-company
  - Meetings Today, "Top 10 questions planners should ask their AV company":
    https://www.meetingstoday.com/articles/145020/top-10-questions-planners-should-ask-their-av-company
  - KRS Productions, "Five top tips for selecting a technical production partner":
    https://krsproductions.co.uk/news/krss-five-top-tips-for-selecting-a-technical-production-partner-2-2-2
  - Centric Events, "How to choose an event production company":
    https://centric.events/blog/how-to-choose-an-event-production-company/
  - EMS Events, "How to choose an event production company":
    https://www.ems-events.co.uk/how-to-choose-an-event-production-company
  - PORT, "Six questions to ask your AV experts" (what the client must give the supplier):
    https://www.portlighting.com/blog/six-questions-to-ask-your-av-experts
  - The questions they share: recent, comparable work; references; scale handled; who will be on
    site; cost structure and how quotes are built; why specific gear is chosen; contingency plans;
    liability insurance and certificates.
- **What I couldn't check:** what clients actually ask on discovery calls (that is in the owner's
  Notion and inbox, which I did not read); what the store at Gumroad and the cal.com booking page
  say (both off-site); search-engine snippets for the site (I was not allowed to search for it).

### The visitors I walked the site as

| | Visitor | Arrives with |
|---|---|---|
| **V1** | Producer at an event agency in Lisbon or Madrid, shortlisting a show-control partner for a 900-guest corporate conference in 6 weeks | Have you done this at this size? Which consoles and servers? Can you program before we're in the room? How do you charge? Can you start now? |
| **V2** | Production manager of a music festival in Portugal, deciding whether to hire a technical director | Who exactly would be on site? What does a TD here cover, and for how many days? Festival experience? Insurance? |
| **V3** | Brand-activation agency in London or Berlin, needing system architecture for a touring build across several EU cities | Do you travel, and on what terms? What language do you run the crew in? Are you tied to a rental house? What do I get on paper? |
| **V4** | A referred or returning contact checking credentials the day before a call | Who is this person? What have they done that I can point my client to? What will they ask me for? |

### Where each answer is

| Question | Answer on the site | Where |
|---|---|---|
| Capability (what they do) | **Clear**, in detail | `services.html:198–526` |
| Systems and kit they work with | **Clear** for consoles, servers and protocols | `services.html:342–345` |
| Past work | **One anonymous story**; six client logos not tied to any work | `about.html:231–241`; `index.html:229–258` |
| Scale handled | **One number** (1,200 guests) | `about.html:232` |
| Who you'll work with | **Missing**: founder section hidden | `about.html:199` (#42) |
| Where based | **"Portugal"**; the city only in an article | `index.html:172`, `about.html:256`; `field-notes/portugal-events.html:171` |
| Travel | **"Worldwide"**, nothing more | `about.html:264` |
| Languages | **Missing** | none found |
| Availability and lead time | **Missing**, though the quiz asks about it | `quiz.html:199–227` |
| How pricing works | **Missing** | none found |
| Own gear or vendor-neutral | **Unclear** | `services.html:414`; `field-notes/portugal-events.html:179` |
| Insurance, safety, company details | **Missing** | `legal.html` has no entity details |
| How to start | **Partly**: form, call link, 1-business-day reply | `about.html:250–333` |

## Findings

### B1 There is almost no visible past work
- **What:** a buyer who wants to see comparable shows finds one anonymised story (no client, venue,
  year or picture) and six logos that link to nothing and are not tied to any work. The Field Notes
  "Case Studies" filter is empty. No page has a photograph of a show, a previz render or a drawing:
  apart from logos, the only `<img>` files used are the four service icons and the logo mark.
  `images/hero-stage.png` and `images/RB.png` are in the repo and used by no page.
- **Evidence:** `about.html:231–241` (the one story: "Corporate · Awards Ceremony · 1,200 guests",
  quote credited to "Production Manager"); `index.html:229–258` (logos: SAP, Randstad, Verisure,
  CGD, The Yeatman, Real Companhia Velha); `field-notes/index.html:121,148` (the filter and its
  empty message, see #38). All five buyer guides above put recent, comparable work first.
- **Who it serves:** all four visitors, most of all V1 and V4 when they defend the shortlist to
  their own client.
- **Size:** M (a work or case-study section, plus 2–4 written cases in EN and PT); the content has
  to come from the owner.
- **Fits the rules:** yes, if images are self-hosted. No video embeds (YouTube or Vimeo would break
  the zero off-origin rule; self-hosted video would not). Naming clients needs their permission.
- **Confidence:** high. This is the most common thing buyers ask for, and the gap is measurable.

### B2 A visitor can't find out who they'd be working with
- **What:** the site is founder-led but shows no person. The founder section is hidden. The one
  article is written in the first person ("I went to the portaria…") with no visible name: the
  author appears only in meta tags. Nothing says who else crews a job (the founder alone, or a
  regular network of programmers and technicians), which matters to a TD or show-control buyer
  sizing the team.
- **Evidence:** `about.html:199` (`<div style="display:none">` around the founder; already #42, not
  re-reported). `field-notes/portugal-events.html:165` (first person), `:33` (`article:author`
  meta only), `:111` (JSON-LD author is the company). Buyer guides: ask who will actually be on
  site, and ask for a technical walkthrough with the TD (Centric, KRS).
- **Who it serves:** V2 (hiring a person, not a company), V4 (checking the person before a call).
- **Size:** S for a visible byline on articles plus a one-line author note; the founder section
  itself is #42. "Who crews the job" is a short paragraph on About.
- **Fits the rules:** yes.
- **Confidence:** high for the byline gap. The crew question is medium: I'm inferring buyers ask
  it from the guides, not from this studio's enquiries.

### B3 Scale is never stated in numbers
- **What:** apart from "1,200 guests" once, the site gives no measure of scale: years working,
  number of shows, largest audience, countries worked in, size of systems (universes, LED surfaces,
  servers), longest tour. The voice rules ask for exactly this ("specific numbers", CLAUDE.md;
  DESIGN.md / Brand Book §10).
- **Evidence:** grep of all EN pages for digits in body copy: the only scale figure is
  `about.html:232`. The founder bio, though hidden, says "has spent years" (`about.html:212`).
  BizBash and EMS both list "events of a similar size" as a first check.
- **Who it serves:** V1 (is 900 guests in range?), V3 (have you done a multi-city tour?).
- **Size:** S (a row of 3–4 figures on Home or About, EN and PT), if the owner supplies the numbers.
- **Fits the rules:** yes. The copy review (CR) will rewrite existing words, but it can't invent
  numbers it doesn't have. This needs the owner's figures, so it is worth raising before CR3.
- **Confidence:** high.

### B4 Where the studio is and how it travels is vague
- **What:** core pages say "Based in Portugal" and "Working worldwide" without naming the city,
  the regions it travels to, or how travel is charged. The city (Porto) appears only inside the
  Portugal Events article, and only as an example. "Worldwide" names no country where the studio
  has worked.
- **Evidence:** `index.html:172` and `pt/index.html:148` ("Baseados em Portugal · A trabalhar
  globalmente"); `about.html:256,264` ("Based in Portugal", "Works with clients Worldwide");
  `field-notes/portugal-events.html:171` (the only "Porto" on the site, EN and PT).
- **Who it serves:** V3 (estimating travel days and cost), V1 in Madrid (how far is Porto).
- **Size:** S (one line each on About's contact panel and Home's scope line; a sentence on travel
  terms).
- **Fits the rules:** yes.
- **Confidence:** high that it's missing; medium on how much it costs the studio enquiries.

### B5 Nothing says how pricing or quoting works
- **What:** a buyer with a budget can't tell whether the studio charges a day rate, a fixed fee
  per phase, or a quote per project, what a quote is based on, or whether small jobs are taken.
  Services describes "Two ways to engage" for each service, which is a natural place for this, but
  gives no commercial shape. No figure is needed: "we quote per project after a 30-minute call,
  fixed fee per phase for design, day rate for on-site work" would answer it.
- **Evidence:** grep for price, pricing, fee, rate, quote, budget, orçamento: no commercial hits.
  The engagement blocks are at `services.html:268–271, 353–356, 438–441, 523–526`. BizBash: "What is
  your cost structure?"; Meetings Today: have the supplier explain the quote line by line.
- **Who it serves:** V1 (deciding fast whether to enquire), V2 (a festival budget holder).
- **Size:** S (a "How we work and quote" block on Services or About, EN and PT).
- **Fits the rules:** yes. It is new visitor-facing text, so the owner writes or approves it.
- **Confidence:** medium. It is a common buyer question, but some studios leave pricing off on
  purpose; the challenger should weigh that.

### B6 Lead time and availability aren't stated, and the form doesn't ask for the date
- **What:** the quiz asks the visitor how far out the show is, but the site never says how early
  to book, whether short-notice work (under 4 weeks) is accepted, or how far ahead the calendar
  fills. The contact form asks for name, company, email, service and a free-text message, but not
  the event date, location or audience size, which are the first facts a supplier needs to say yes
  or no.
- **Evidence:** `quiz.html:199–227` (the four timeline answers, including "Close in — under 4 weeks
  to show"); `about.html:234` (the story's brief arrived "six weeks before load-in"); form fields
  at `about.html:288–329`.
- **Who it serves:** V1 (6 weeks out), V2 (festival dates fixed a year ahead).
- **Size:** S for a lead-time line. Adding form fields is M: a form change means `INTAKE.md`, n8n
  and the owner's explicit yes.
- **Fits the rules:** the text, yes. Form fields need the INTAKE change and the owner's yes (the
  standing rule, not an exception).
- **Confidence:** medium-high.

### B7 Working languages aren't stated
- **What:** the site works in EN and PT, but never says which languages the studio runs a crew,
  calls a show or writes documentation in. For a studio "working worldwide" with international
  agencies (V3) this is a hiring question, and it is cheap to answer.
- **Evidence:** grep for language, idioma, língua, English, inglês: only the language switcher's
  `aria-label` matches (e.g. `about.html:136`). Nothing in About's contact panel
  (`about.html:254–266`).
- **Who it serves:** V3; any non-Portuguese agency bringing an event to Portugal.
- **Size:** S (one row in About's contact panel, EN and PT).
- **Fits the rules:** yes. Not related to the TR set (translating the site); this is about the
  service, not the pages.
- **Confidence:** medium. Obvious to a Portuguese reader, not to a foreign buyer.

### B8 It isn't clear whether the studio supplies equipment or is independent of rental houses
- **What:** Services lists the systems the studio programs and promises "performance-based
  equipment specification … not a standard kit list", which reads as vendor-neutral. But the site
  never says whether the studio rents gear itself, or whether the buyer still needs an AV supplier.
  The article calls the studio one of "we technical suppliers", which suggests the opposite. A buyer
  needs to know if they are hiring a design and direction service, a supplier, or both. If the studio
  is independent of rental houses, that is a selling point that should be stated.
- **Evidence:** `services.html:342–345` (systems), `:414` ("not a standard kit list");
  `field-notes/portugal-events.html:179` ("We technical suppliers do not apply for anything").
  Meetings Today and Centric: ask why specific gear is chosen, to find out whether it fits the
  event or the vendor's own stock.
- **Who it serves:** V1 and V3 when deciding who else to hire; V2 checking for conflicts of interest
  with the festival's rental supplier.
- **Size:** S (one paragraph on Services, EN and PT).
- **Fits the rules:** yes.
- **Confidence:** medium. The ambiguity is real; which answer is true is the owner's to say.

### B9 No insurance, safety or company details for supplier onboarding
- **What:** agencies and corporate clients onboard suppliers with the legal name, VAT number,
  address and proof of liability insurance, and a TD is asked about safety practice (risk
  assessment, rigging sign-off, who has authority to stop the show). The site has none of it. The
  legal entity ("Lumen and Pixel, Lda.") appears only in one article's JSON-LD; `legal.html` names
  no entity, VAT number or address.
- **Evidence:** grep of `legal.html` for Lda, NIF, NIPC, VAT, address, registered: only the
  privacy-data list matches (`legal.html:125–127`); `field-notes/portugal-events.html:111`
  (JSON-LD). EMS and KRS: check public liability insurance and the certificate's expiry.
- **Who it serves:** V2 (a festival's procurement), V1 (agency supplier forms).
- **Size:** S (a "Company details" line in the footer or on Legal; one sentence on insurance and
  safety on Services under Technical Direction).
- **Fits the rules:** yes. Any wording on `legal.html` overlaps #28 (legal revision) and should go
  there; the insurance and safety sentence belongs on Services. Whether Portuguese law also requires
  entity details on the site is for the owner or #28 to check; I did not verify it.
- **Confidence:** medium-high for the gap; medium for how often it blocks an enquiry.

### B10 The deliverables are described, never shown
- **What:** Services promises concrete documents: CAD plots, pixel maps, rack diagrams, patch
  sheets, a "technical dossier", "photorealistic 3D renders and interactive fly-throughs". None is
  shown, not even a redacted page or a single previz still. For a buyer comparing studios, one
  sample sheet is stronger proof than a paragraph.
- **Evidence:** `services.html:226` (renders), `:257–260` (previz, design package, client
  presentation), `:412–415` (signal flow, networks, dossier), `:500` ("post-show technical debrief
  within 48 hours"). No `<img>` other than icons, logos and the logo mark on any page (grep of
  `src=`).
- **Who it serves:** V3 (what do I get on paper?), V1 (client sign-off tooling).
- **Size:** M (3–4 self-hosted images with captions across the service sections, EN and PT alt
  text). Could share work with B1.
- **Fits the rules:** yes, self-hosted. Images in `images/` are outside the brand check, but must
  follow DESIGN.md.
- **Confidence:** medium-high.

### B11 Landing straight on Services: no proof, no studio, and the only way out is the quiz
- **What:** a visitor sent a link to Services (the most likely page to be shared between
  colleagues) gets 300+ lines of service detail with no line on who the studio is or where it is,
  no client or case, and one closing call to action: the quiz. The direct route to an enquiry is only
  the nav's "Get started". Quiz and Field Notes visitors fare better: the quiz result links to both
  the service and the contact form (`quiz.html:346–350`, `:633–634`).
- **Evidence:** hero `services.html:177–178`; closing block `:531–537` (eyebrow "Work with us", one
  button to `quiz.html`); no mention of Portugal or any client on the page (grep).
- **Who it serves:** V4 and V1 when a colleague forwards "look at their services".
- **Size:** S (a one-line identity in the hero or footer strip; a second button to the contact
  form next to the quiz).
- **Fits the rules:** yes.
- **Confidence:** medium-high. The closing-CTA part overlaps DS1c (conversion); the identity part
  is in this lens.

### B12 Landing on an article: no author, no studio, and the only next step leaves the site
- **What:** the Portugal Events article is the site's strongest proof of expertise and the page
  most likely to be shared on LinkedIn. A reader arriving there sees no author name, no line about
  the studio or its four services, no link to Services, and one call to action that opens cal.com in
  a new tab. A reader not ready for a call has nowhere on the site to go except "Back to Field
  Notes" and the nav.
- **Evidence:** `field-notes/portugal-events.html:229` (the paragraph "If what you need is the
  technical part, that is what we do…"), `:234` (CTA to `https://cal.com/lumenandpixel`), `:237`
  ("Back to Field Notes"). No author block. The template carries the same shape
  (`field-notes/article-template.html`).
- **Who it serves:** V2 (a festival PM who found the article through the funding topic); any
  first-time reader.
- **Size:** S on the template (an author-and-studio block with links to Services and the contact
  form), then applied to each article, EN and PT.
- **Fits the rules:** yes.
- **Confidence:** high for the gap.

### B13 What to send, and what happens after you enquire, isn't said
- **What:** About promises a reply within one business day and "just a conversation", which is
  good. But it doesn't say what a useful first message contains (date, venue, audience, drawings,
  current supplier list) or the steps after it (call → scope → proposal → booking). A buyer
  preparing for a call (V4) doesn't know what to bring; the free-text placeholder only says "Tell us a
  bit about your project, event, or challenge".
- **Evidence:** `about.html:252` (reply promise), `:319` (message placeholder), `:277–280` (the call
  link). PORT (sources above) stresses that suppliers need venue,
  audience, run of show and budget up front.
- **Who it serves:** V4, V1.
- **Size:** S (three short steps beside the form, EN and PT; changing the placeholder text only).
- **Fits the rules:** yes. A placeholder is not a field, name or consent text, so it shouldn't
  touch INTAKE.md, but the owner should confirm.
- **Confidence:** medium.

### B14 Foreign agencies bringing an event to Portugal aren't spoken to
- **What:** the article shows real local knowledge (funding rules, regional tourism bodies, the
  "contracted in Portugal" condition that favours a local team). That is exactly what a foreign
  agency staging an event in Portugal needs, but no page offers it as a service ("your technical
  partner on the ground in Portugal"). The article itself makes the argument
  ("contracting here keeps it in") and the site never uses it again.
- **Evidence:** `field-notes/portugal-events.html:193–196` ("quando contratados em Portugal … It is
  an argument"); `index.html:172` (only "Based in Portugal"). No page mentions venues, suppliers or
  regions in Portugal the studio knows.
- **Who it serves:** a fifth visitor: a UK, German or Spanish agency with a conference or incentive
  in Porto or Lisbon.
- **Size:** S as a paragraph on About or Home; M as its own page in both languages.
- **Fits the rules:** yes.
- **Confidence:** low-medium. It is an inference from the business and the article, not from
  evidence of demand; DS1a may show whether comparable studios position this way.

## Seen, other lens

- Conversion: `resources.html` and `pt/resources.html` have no inbound link from any page (not in
  the nav, footer or any body text); only `sitemap.xml` lists them. The store is unreachable by
  browsing.
- Conversion: the quiz opens straight on Question 1 with no line on length, purpose or "no email
  needed" (`quiz.html:140`).
- Technical/SEO: About's meta description says "creative director and technical director", while
  its `og:description` and `twitter:description` say "creative director and lighting designer"
  (`about.html:17` vs `:21`, `:29`).
- Technical/SEO: the article's JSON-LD author is the company, while `article:author` names a person
  (`field-notes/portugal-events.html:33` vs `:111`).
- Technical/sharing: Services, the quiz and others share the one generic `og-image.png` with alt
  "Lumen and Pixel" (`services.html:23–26`, `quiz.html:23–26`).
- Housekeeping: `images/hero-stage.png` and `images/RB.png` are not used by any page.
