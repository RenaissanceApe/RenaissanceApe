# DS1a: Comparable studios' sites

## How I looked

**When:** 2026-11-11, one session.

**This site:** read from the repository on branch `test` at `5ef3b1f`: `index.html`, `about.html`,
`services.html`, `resources.html`, `field-notes/index.html`, the open issues, and `images/`
(to see which photos and videos exist). PT mirrors not read separately: they have the same structure.

**Finding studios:** generic web searches only (for example "show control design consultancy live
events studio UK", "Berlin studio stage design video design show design concerts tours"). I put no
detail about this studio into any search or request.

**Reading their sites:** most of these sites build their pages with JavaScript, so a plain fetch came
back empty. I opened each page in headless Chromium and saved the rendered text, links and form
fields. That shows text, links, form fields, `<video>` tags and iframes. It does not show text drawn
into images. For each studio I read the home page, the about/team page, the projects list, at
least one project page and the contact page, where they exist. I did not look at the images, so "?" in the photos row means not checked.

**Not checked:** how deep every project page goes (one or two sampled per studio); anything behind
a login; the sites in languages other than the one served by default; mobile layouts.

### The studios

Nine studios: four from the UK, Germany, France and Portugal, three more from the UK and Spain,
and two outside Europe. No small independent studio for technical direction or system design came
up in Germany, Spain or France: the searches there returned rental houses (POOLgroup, BMotion,
Novelty, Videlio). The two picked outside Europe fill that gap.

| # | Studio | Base | URL | Why it is comparable |
|---|---|---|---|---|
| 1 | Auditoria | London (also Dubai, Sydney) | https://auditoria.systems/ | Small AV design consultancy; sells "Show Control Design" as its own service for live events and ceremonies |
| 2 | Mesmer | London | https://www.mesmer.co.uk/ | Small studio: video and projection design, content, and "Technical Consultancy" for live events |
| 3 | Woodroffe Bassett Design | London | https://www.woodroffebassett.com/ | Small lighting and show design practice for touring, theatre and events |
| 4 | WHITEvoid | Berlin | https://www.whitevoid.com/ | Founder-led design studio: kinetic light shows, stage performances, brand events, concept to build |
| 5 | Onionlab | Barcelona | https://www.onionlab.com/ | Mid-size studio: projection mapping, AV space design, "Technical services" for events and festivals |
| 6 | 1024 Architecture | Paris | https://www.1024architecture.net/ | Three-founder studio for light and sound in space; also makes the MadMapper software |
| 7 | OCUBO | Agualva-Cacém (Lisbon) | https://www.ocubo.com/ | Portuguese studio for large shows, mapping and immersive work; the nearest Portuguese peer |
| 8 | Silent Partners Studio | Montreal and Los Angeles | https://www.silentpartnersstudio.com/ | Outside Europe. Show design and video content for tours and award shows, with a full FR/EN site (the same two-language problem as EN/PT here) |
| 9 | ProIO | USA (works worldwide) | https://proio.one/ | Outside Europe. Four-person technical consultancy for show control, AV and lighting design and commissioning; the closest match for Show Control & System Architecture |

Looked at and left out: *Standby, Please* (https://standby-site.pages.dev/consulting/), a single
page with no location; POOLgroup (Berlin), a large rental house.

### The table

✓ = has it; ~ = partly or vague; — = not found. The links are the pages I read.

| Feature | Auditoria | Mesmer | Woodroffe B. | WHITEvoid | Onionlab | 1024 | OCUBO | Silent P. | ProIO | **This site** |
|---|---|---|---|---|---|---|---|---|---|---|
| Project pages | ✓ ~12+ filterable | ✓ | ✓ list by sector | ✓ 30+ | ✓ | ✓ | ✓ ~40 | ✓ ~100 | — | — (one anonymised story on About) |
| Project page has brief/context | ✓ | ✓ | ~ | ✓ | ~ one line | ? | ~ 3 lines | ✓ (case studies) | — | ~ (About story) |
| ...role / scope stated | ✓ "Scope", "Services Provided" | ✓ "Services" | — | ✓ credits | — | ? | — | ~ | — | ✓ (About story) |
| ...kit list / technical numbers | ✓ full kit list | — | — | ✓ "485 moving lights…" | — | ? | — | — | — | ~ ("1,200 guests") |
| ...credits (people, partners) | ✓ | ✓ 20 named | — | ✓ | — | ? | — | — | — | — |
| ...photos | ? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| ...video | — | ✓ `<video>` | showreel page | ✓ Vimeo | ✓ `<video>` | ✓ | ✓ Vimeo | ✓ reel | — | — |
| Named clients | ✓ per project | ✓ | ✓ artists | ✓ client list | ✓ | ~ | ✓ logos + /clients | ✓ per project | ~ regions | ~ 6 logos, not tied to work |
| Team / founder page | ✓ 7 people | ✓ on home | — | ✓ founder | — | ✓ 3 founders | ✓ /the-team | ✓ 6 partner bios | ✓ 4 bios | — (hidden, #42) |
| Process / how we work | — | — | — | ~ | — | — | — | — | ✓ by project phase | ✓ (About, Services) |
| Service page per discipline | ✓ 6 pages | ~ on home | — | — | ✓ "Know-how" | — | — | — | ✓ | ✓ (one page, 4 sections) |
| Engagement models | — | — | — | — | — | — | — | — | ✓ Blue Sky / Green Field / Revitalization | ✓ "Two ways to engage" ×4 |
| Pricing | — | — | — | — | — | — | — | — | — | — |
| Downloadable portfolio / brochure | — | — | ✓ PDF | — | — | — | — | — | ✓ brochure | — |
| Articles / blog / news | ✓ project news | — | — | ✓ news | ✓ dated blog | ✓ news | — | — | ✓ news | ~ 1 article |
| Newsletter | — | — | — | ✓ | ✓ | ✓ | — | — | — | ✓ |
| Tools / calculators / own software | — | — | — | ✓ Kinetic Lights products | ✓ OnInOff software | ✓ MadMapper | ✓ OLAB R&D | — | ✓ Products page | ✓ quiz; store templates |
| Booking a call | — | — | — | — | — | — | — | — | — | ✓ cal.com |
| Contact form fields | name, phone, email, subject, message | none (email) | name, email, subject, phone, message | none (email) | name, email, **approx. project date**, idea | none (email) | name, phone + country, email, message | none (email) | none (phone, email) | name, company, email, service, message |
| Languages | EN | EN | EN | EN | EN | EN | EN (+PT quote button) | FR, EN | EN | EN, PT |
| Credentials / awards | ✓ 8 named, with year and project | ~ "award-winning" | — | ✓ Awards tab | — | ~ festival list | ~ "multi-awarded" | ~ "award-winning" | ~ one certification in a bio | — |
| Talks / publications | — | — | — | ✓ talks (title, place, year), publications | — | ✓ exhibitions list | — | — | — | — |
| Press contact | — | — | — | ✓ | — | ✓ | ✓ social@ | — | — | — |
| Careers | — | — | ✓ | ✓ | ✓ jobs email | ✓ | ✓ hr@ | — | — | — |
| Testimonials | — | — | — | — | — | — | — | — | — | ✓ one, unattributed |

**What the table says.** This site is ahead of the nine in four places: engagement models (only
ProIO does something similar), a recommendation tool (the quiz), booking a call (none of the nine
offer it), and two languages (only Silent Partners has two). It is behind in one large area,
**proof of past work**: every studio but ProIO has project pages, seven show project photos (Auditoria not checked), seven
show video, and seven name their people. This site has none of those visible. Pricing, testimonials
and process pages are rare among the nine as well, so their absence here isn't a gap.

## Findings

### A1 Project pages with scope, role, kit and credits
- **What:** a "Work" section with one page per project, each with the same fixed fields: client
  (or a description if it can't be named), event type and size, location, year, which of the four
  services, the studio's role, the kit or system that mattered, a number or two, credits for
  partners, and photos. This is the largest gap the comparison shows.
- **Evidence:** Auditoria's project page lists CLIENT, LOCATION, YEAR, PROJECT TYPE, "Scope", "Services
  Provided" and a "Technical Highlights" kit list ("DiGiCo Quantum 852… 300+ input channels")
  (https://auditoria.systems/project/the-royal-edinburgh-military-tattoo-2026/). WHITEvoid's DIALOGUE
  page gives client, year, city, "485 moving lights, 72 LED floodlights and 4 ultra-bright lasers",
  and credits for production partners (https://www.whitevoid.com/dialogue/). Mesmer's Princess page
  gives duration ("since 2023"), the problem, 20 named credits, client and services
  (https://www.mesmer.co.uk/work/princess). Here: the only project account is the anonymised story
  on `about.html:226–241` ("Corporate · Awards Ceremony · 1,200 guests"); the Field Notes "Case
  Studies" filter has no entries (`field-notes/index.html:121`, see #38); `images/` holds no project
  photographs (only `hero-stage.png`, which nothing uses).
- **Who it serves:** an agency producer or production manager shortlisting technical partners,
  checking "has this studio done a show like mine, at my scale, in this role?" before writing.
- **Size:** M (a template plus a hub, EN and PT; the content is the owner's work, from 3–4 projects).
- **Fits the rules:** yes. Photos are local files. Video must be self-hosted (WHITEvoid and OCUBO
  embed Vimeo, which would break the zero off-origin rule). Where a client can't be named, the
  About story already shows how to describe one.
- **Confidence:** high. 8 of 9 studios do it; it is the most common feature after a team page.

### A2 Technical facts on project pages, not only pictures
- **What:** within A1, give each project a short "system" block: control architecture, protocols,
  servers and consoles, signal counts, redundancy, timeline (for example "six weeks before load-in").
  Most comparable sites show pictures and very few facts. A buyer of show control or system
  architecture can't judge either from a photo.
- **Evidence:** only 2 of 9 do this: Auditoria (full kit list, "Redundant AVB and Optocore signal
  distribution") and WHITEvoid (fixture counts, "close synchronization of the light and laser
  animations between the two towers"). OCUBO's EDP page is three lines of mood
  (https://www.ocubo.com/edp-50-years); Onionlab's Blau page is one sentence
  (https://www.onionlab.com/works/blau/). The About story here already has the right instinct
  ("mapped every signal path… identified three critical failure points", `about.html:236`).
- **Who it serves:** technical directors and production managers at production companies: the
  people who judge whether a show-control partner is credible.
- **Size:** S (one block in the A1 template).
- **Fits the rules:** yes. It also fits the voice rules (specific numbers).
- **Confidence:** high that it sets this studio apart, since the studios that sell systems
  (Auditoria) do it and the ones that sell visuals mostly don't.

### A3 Logos tied to what was done
- **What:** the home page's "Trusted by" strip shows six logos (`index.html:232–256`: SAP, Randstad,
  Verisure, CGD, The Yeatman, Real Companhia Velha) that link nowhere and say nothing about the
  work. Comparable sites tie every client name to a project.
- **Evidence:** Silent Partners lists about 100 projects as "client: project", e.g. "Netflix TUDUM
  2025", "Google I/O Pre-Show 2025" (https://www.silentpartnersstudio.com/case-studies/vma, nav
  list). OCUBO has a client page with a count, "over 100 brands and… more than 300 projects"
  (https://www.ocubo.com/clients). Auditoria names the client on every project page.
- **Who it serves:** a corporate event team or agency recognising a client; it turns "they know
  SAP" into "they did the control system for SAP's X".
- **Size:** S once A1 exists (link each logo to its project, or add one line per logo).
- **Fits the rules:** yes, if the owner may name each client against the work (NDA question).
- **Confidence:** medium: depends on what the owner may say about each client.

### A4 Named people (evidence for #42)
- **What:** this is open issue #42 (the founder section is hidden). The comparison adds evidence:
  seven of nine studios name the people behind the work (Woodroffe Bassett and Onionlab don't), and
  the founder-led ones put the founder up front. That makes the hidden section more urgent than "should fix" suggests.
- **Evidence:** Auditoria "Meet the Team", 7 people with titles (https://auditoria.systems/about/);
  ProIO bios with years of experience ("over 15 years of production, integration, and programming")
  (https://proio.one/about-us); 1024's three co-founders (https://www.1024architecture.net/about);
  WHITEvoid's founder story (https://www.whitevoid.com/about); Silent Partners' six partner bios;
  OCUBO's team page; Mesmer's team on its home page. Here: `about.html:199` `<div style="display:none">`.
- **Who it serves:** every buyer of a founder-led practice: they are hiring the person.
- **Size:** S (the section is built, #42).
- **Fits the rules:** yes.
- **Confidence:** high.

### A5 A downloadable studio PDF
- **What:** a one- or two-page PDF (services, engagement models, three projects, contact) that a
  visitor can save and forward. Agencies forward suppliers to their clients and procurement teams,
  who don't browse websites.
- **Evidence:** Woodroffe Bassett's contact page: "DOWNLOAD COMPANY PORTFOLIO"
  (https://www.woodroffebassett.com/contact). ProIO's home page: "Take a closer look at our
  capabilities and experience by viewing our Company Brochure" (https://proio.one/). Here: no PDF
  about the studio; `resources.html` links to store products only.
- **Who it serves:** an agency producer building a proposal or a supplier list for their own client.
- **Size:** S (one file per language in `images/` or a new folder, linked from About and Services).
- **Fits the rules:** yes (a local file). It needs EN and PT versions and has to be kept current
  with the pages.
- **Confidence:** medium: only 2 of 9 do it, but both are the most B2B and consultancy-like of the nine.

### A6 Credentials named specifically, or not at all
- **What:** if the studio holds certifications, memberships or awards, list each one with what, who
  gave it, and the year. Most of the nine only say "award-winning", so a specific list stands out.
- **Evidence:** Auditoria lists eight awards, each with year and project ("named AV Consultancy of the
  Year at the 2020 AV Awards"; an Emmy for the Baku 2015 opening ceremony)
  (https://auditoria.systems/about/). WHITEvoid's About has an "Awards" tab. The others are vague:
  Mesmer "an award-winning creative studio", OCUBO "multi-awarded studio", Silent Partners
  "plusieurs fois récompensés". Here: none (the only "award" on About is the event type,
  `about.html:232`).
- **Who it serves:** procurement and in-house event teams who need something to tick on a
  supplier form; production managers checking manufacturer training (consoles, media servers).
- **Size:** S (a short list on About).
- **Fits the rules:** yes. Manufacturer marks would be logos, so check their brand terms.
- **Confidence:** low: I don't know what credentials the owner holds. If there are none, drop this.

### A7 Each service page shows its own proof
- **What:** under each of the four services, link two or three projects where that service was the
  role. A visitor reading "System Architecture" sees the systems this studio has architected.
- **Evidence:** Auditoria's "Show Control Design" page ends with "Related Projects" (three projects)
  (https://auditoria.systems/solution/show-control-design/); its projects list filters by event type
  *and* by service ("Show Control Design", "AV & Infrastructure Design")
  (https://auditoria.systems/projects/). Here: the four service sections in `services.html` (each
  with "Two ways to engage", lines 268, 353, 438, 523) link to no project.
- **Who it serves:** a visitor who arrived on Services from a search or from the quiz result, at the
  moment of deciding whether to enquire.
- **Size:** S once A1 exists.
- **Fits the rules:** yes.
- **Confidence:** high that it helps; it depends on A1.

### A8 Behind-the-scenes write-ups of the studio's own shows
- **What:** a Field Notes article about one of the studio's own projects: what went wrong, what
  was decided, what the system looked like. This fills the empty "Case Studies" filter and gives
  the newsletter something to send.
- **Evidence:** Onionlab's dated blog mixes method pieces with write-ups of its own projects:
  "Behind the Scenes: Transforming Palacio de la Magdalena through Projection Mapping", "Unveiling
  Automotive Innovation: Onionlab's Immersive Contributions to the Cupra Exponential Impulse Event"
  (https://www.onionlab.com/blog/). Auditoria's news is all project news ("Auditoria Returns to The
  Royal Edinburgh Military Tattoo") (https://auditoria.systems/). Here: one article
  (`field-notes/portugal-events.html`); the Case Studies filter is empty (#38).
- **Who it serves:** a returning visitor or newsletter reader deciding whether the studio's
  thinking holds up, which is the Field Notes audience.
- **Size:** S per article (the template exists).
- **Fits the rules:** yes.
- **Confidence:** medium: it overlaps A1. The difference is the format (story vs. fact sheet) and the
  channel (Field Notes and newsletter).

### A9 A showreel, self-hosted
- **What:** one short reel (60–90 s), on Home or About, served from this site.
- **Evidence:** Silent Partners has "Reel" as the first item in its main nav
  (https://www.silentpartnersstudio.com/reel); Woodroffe Bassett has "SHOWREEL" in its nav;
  Onionlab's home page plays 7 `<video>` elements; Mesmer's project pages use `<video>`. 7 of 9 show
  moving images somewhere. Here: no `<video>` on any page; no video file in the repo.
- **Who it serves:** a festival or touring producer who judges show design by watching it, in the
  first minute of a visit.
- **Size:** M: the reel itself is the owner's work. On the site it is a `<video>` element with a
  poster image and captions, plus a check on file size (GitHub refuses files over 100 MB, and a Pages
  site is limited to 1 GB).
- **Fits the rules:** yes only if self-hosted. A YouTube or Vimeo embed would need an exception to
  the zero off-origin rule (and a consent banner), so it is not an option.
- **Confidence:** medium: common among the visual studios, less so among the consultancies
  (Auditoria and ProIO have none). It helps Show Design more than System Architecture.

### A10 Talks and publications list
- **What:** a short list on About of talks given, panels, workshops and articles published
  elsewhere, each with title, place and year.
- **Evidence:** WHITEvoid's About page has tabs "Lectures", "Publications", "Awards"; the lectures
  table lists title, location and year (e.g. "Light as a material / CUE Trade Show, Rotterdam,
  2026") (https://www.whitevoid.com/about). 1024 lists exhibitions and festivals with cities
  (https://www.1024architecture.net/about). Here: none.
- **Who it serves:** buyers who can't judge the technical work themselves and look for signs that
  peers respect it.
- **Size:** S.
- **Fits the rules:** yes.
- **Confidence:** low: only useful if the owner has talks or articles to list. Only 2 of 9 do it.

### A11 Say who the studio works for and alongside
- **What:** one line on Services or About naming the kinds of client and partner, e.g. "agencies,
  production companies, in-house event teams, rental houses". A buyer can then see where they fit
  and that the studio won't compete with their suppliers.
- **Evidence:** ProIO: "We partner with owner-operators, creative agencies, and technology
  integrators to fulfill any need from project start to finish" (https://proio.one/services).
  POOLgroup offers itself as a "sparring partner" for parts of an event
  (https://www.pool.de/en/services/trades/technical-planning). Here: the services describe problems
  ("Our touring kit and the venue's in-house system don't speak the same language",
  `services.html:397`), but no page names the buyer types; the quiz asks "Who else is handling the
  technical decisions?" but the answer isn't reflected on the pages.
- **Who it serves:** an agency producer or production company wondering whether this studio
  partners with them or competes with them.
- **Size:** S.
- **Fits the rules:** yes. It is new visitor-facing text: owner's yes; could go with the copy review (CR3).
- **Confidence:** medium.

### A12 Show the studio's own tools as proof of depth
- **What:** where the studio has built its own show files, templates, control patches or software,
  present them as evidence of technical depth (what the studio uses on its own shows), not only as
  store products.
- **Evidence:** 5 of 9 show their own tools or R&D: 1024 (MadMapper in the main nav,
  https://www.1024architecture.net/mad), WHITEvoid (Kinetic Lights, "designed, engineered and
  manufactured under one roof"), OCUBO (OLAB, https://www.ocubo.com/olab), Onionlab (OnInOff software
  update on its blog), ProIO (Products page). Here: `resources.html` presents templates as things to
  buy ("Browse the store"); the previz quadrant tool (PQ) is on the roadmap. This evidence supports PQ
  and does not change it.
- **Who it serves:** technical buyers looking for signs of real production depth.
- **Size:** S (framing on Resources or About).
- **Fits the rules:** yes.
- **Confidence:** low: the studios that do this mostly sell a product as a second business. It is
  worth doing only if the owner's tools are real production tools.

## Seen, other lens
- (conversion) Onionlab's contact form asks "Approximate date of the project"; Auditoria and Woodroffe
  Bassett ask for a phone number; this form asks neither (`about.html:294–318`). A change needs
  `INTAKE.md` and the owner's yes.
- (conversion) Cal.com booking sits only on About (`about.html:280`); none of the nine offer booking,
  so it is a strength worth showing on Services too.
- (technical) At least three of the nine load third-party code: WHITEvoid and OCUBO embed Vimeo, and
  Onionlab loads reCAPTCHA and a cookie banner ("Accept All"); this site's zero off-origin rule is a real point of difference and could be
  said on the site (e.g. "this site sets no cookies").
- (prospect needs) None of the nine publish prices or day rates; a freelance Madrid technical
  director lists 450 € per day on Malt (search result, not visited), which shows what buyers compare against.
- (prospect needs) Silent Partners keeps FR and EN in step with a visible En/Fr switch on every
  page, the same pattern as EN/PT here.
