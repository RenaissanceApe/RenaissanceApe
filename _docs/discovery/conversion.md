# DS1c: Conversion: the paths from landing to enquiry, and where they leak

## How I looked

- **When:** 2026-11-11, on `test` at `5ef3b1f` (v1.56, the same as `main`).
- **Read:** `INTAKE.md`; every CTA, form and hand-off script in `index`, `services`, `about`, `quiz`,
  `resources`, `field-notes/` (hub, template, article), `legal`, `404`, `thank-you`,
  `check-your-inbox`, EN and PT (found with grep, then read in ranges).
- **Ran:** `python3 -m http.server` and three Playwright scripts at **375×667** and **1440×900**,
  EN and PT. For each page I listed every button-style link (`btn-*`, `nav-cta`, cal.com,
  `#contact-form`, Gumroad) and whether it is visible in the first viewport. I walked
  home → quiz → result → contact form, counted the clicks, read the pre-filled fields, tried an
  empty submit, and submitted a filled form with **every off-origin request intercepted and aborted**
  (the body was captured; nothing reached n8n). I also loaded the quiz and the contact form with
  JavaScript off, and fed `?service=` a value the quiz never sends.
- **Could not check:** what visitors actually do. The site has no analytics, on purpose, so I
  have no drop-off data. Every finding says where it would need data. I did not open the cal.com
  or Gumroad pages: the URL carries the studio name, and scouts don't send it to outside services.
  So the booking and store pages are unseen, including their language. I did not see n8n's real
  response or error page.

### The routes to an enquiry, as built

| From | Route | Clicks to the form | Notes |
|---|---|---|---|
| Any page, desktop | nav **Get started** → `about.html#contact-form` | 1 | Visible at 1440 on every page with a nav |
| Any page, phone | ☰ → **Get started** | 2 | The nav button is hidden at 375 on every page |
| Home | **Find your fit** → 4 questions → **Start a conversation** | 10 (measured) | The service is pre-filled |
| Services | single CTA at the end → quiz → … | 11+ | The page has no link to the form |
| Field Notes article | **Talk through a technical budget** → cal.com, new tab | off-site | The template article uses the form instead |
| Resources | **Browse the store** → Gumroad, new tab | off-site | No enquiry route in the body |
| 404 | **Contact us** | 1 | |
| Legal | "About page" text link | 1 | |
| Home (newsletter) | email + required consent → **Subscribe** | 1 | → `check-your-inbox.html` |

The contact form has 5 visible fields + consent; 3 are required (name, email, message). It is
1025 px tall at 375 (1.5 screens). A filled submit posted
`form_type=contact&lang=en&source_page=/about.html&quiz_result=&name=…&company=&email=…&service=&message=…&lp_ref_code=`,
which matches `INTAKE.md`.

## Findings

### C1 On a phone, no page body links to the contact form; the only route is inside the menu
- **What:** at 375 px the nav's **Get started** is hidden on every page. Only 404 and Legal have a
  contact link in the page itself. Home, Services, Resources, the Field Notes hub, and the quiz
  before its result have none. The footer has social and legal links only. A phone visitor who
  doesn't open ☰ never sees a way to enquire, except through the quiz.
- **Evidence:** Playwright at 375×667, every page EN+PT: `.nav-cta` reports `display:none`, and no
  other `#contact-form` link exists outside `.mobile-menu` (see the table). Footer: `index.html`
  near the end (`footer-social`: Instagram, LinkedIn, Privacy, Terms, Cookies).
- **Who it serves:** a producer or agency lead checking the studio on a phone between meetings and
  ready to send a note now.
- **Size:** M. One contact link in each page body where it's missing, and/or a contact item in
  the footer (shared markup, so every page, EN+PT).
- **Fits the rules:** yes. The footer markup is shared (#12 would make this one edit).
- **Confidence:** high that the route is missing; how much it costs needs visit data the site
  doesn't collect.

### C2 Services: 15 screens long, no "enquire about this" link, and its only CTA sends to the quiz
- **What:** the page where a buyer has just read what they need has no link to the form. The four
  service sections (Show Design, Show Control, System Architecture, Technical Direction) end with
  no action. The one CTA, at the very bottom, is **Find your fit** → quiz: four more questions to
  get a recommendation the visitor may already have.
- **Evidence:** `services.html:533-540` (`services-cta` → `quiz.html`); sections at `:195`, `:280`,
  `:365`, `:450` have no links. Measured height: 14.7 screens at 375 (15.5 in PT), 8.0 at 1440. The
  CTA sits at y = 9443 px at 375.
- **Who it serves:** a buyer who already knows they need, say, Technical Direction.
- **Size:** S–M. A link at the end of each service section to
  `about.html?service=TD#contact-form` (the pre-fill already exists, so no new code), and a
  contact button beside the quiz in the closing CTA. EN+PT.
- **Fits the rules:** yes. It reuses the existing `?service=` hand-off; no form change.
- **Confidence:** high.

### C3 Home: no contact action in the body, a CTA banner with no button, and `#contact` is the newsletter
- **What:** the hero offers **Explore services** and **Find your fit**. Below that, the
  "One partner. Every system. Exactly right." banner is a headline with nothing to click. The
  section with `id="contact"` is the newsletter ("Keep up with the latest news"). A visitor who
  scrolls the whole home page is offered a newsletter, never a conversation.
- **Evidence:** `index.html:172-181` (hero actions), `:263-265` (`cta-banner`, h2 only), `:267`
  (`<div class="newsletter reveal" id="contact">`). Same structure in `pt/index.html`.
- **Who it serves:** a first-time visitor who has decided in one scroll that the studio fits.
- **Size:** S. A button in the existing banner, EN+PT.
- **Fits the rules:** yes. Adding a button doesn't rewrite text; the label is the owner's.
- **Confidence:** high.

### C4 Quiz result: the main button leads away from the enquiry, and on a phone neither button is in view
- **What:** the result's filled button is **See full service detail** (→ services). **Start a
  conversation** is the secondary button. On a phone the first screen of the result is text only:
  the contact button is at y = 889 px (EN) and 964 px (PT) in a 667 px viewport. The services page
  then ends in **Find your fit**, so result → services → quiz is a loop with no form on it.
- **Evidence:** `quiz.html:346-353`; Playwright screenshot of the result at 375 (title, mode,
  "why" paragraph, no buttons); C2 for the services end.
- **Who it serves:** the visitor at the moment of highest intent: they just got a named answer.
- **Size:** S. Swap the button weights, or put the contact button above the explanation. EN+PT.
- **Fits the rules:** yes. One filled green button per viewport still holds (see #35).
- **Confidence:** medium–high. The loop is certain; which order converts better needs data.

### C5 The quiz hand-off drops half the result: the engagement mode and the answers
- **What:** the result names a service *and* a way of working (for example "Technical Direction →
  Full Production Cycle", or "Show Design → Design Lead"). Only the service reaches the form
  (`?service=TD` → `service` and `quiz_result`). The studio receives "Technical Direction" with no
  mode and none of the four answers, so its reply re-asks what the visitor already said.
- **Evidence:** `quiz.html:634` builds `about.html?service=<key>#contact-form`. `computeResult()`
  (`:603-622`) also computes `modeKey`, which is never passed on. `INTAKE.md` "Fields":
  `quiz_result` holds one of the four service names.
- **Who it serves:** the studio (a better first reply) and the visitor (no repeating).
- **Size:** S on the page, but it changes a form field.
- **Fits the rules:** needs the owner's yes and an `INTAKE.md` change in the same PR (a new value
  or a new hidden field), with n8n changed to match.
- **Confidence:** high that it's dropped; medium that the lost information matters to the reply.

### C6 Arriving at `#contact-form` skips the reassurance and the booking option (phone)
- **What:** every "Get started" link jumps to the form itself. At 375 the visitor lands with the
  name field at the top of the screen. Above it, scrolled past, are the "Send a message" heading,
  the promise "within one business day. No commitment, no pressure", and **Book a discovery
  call**. A phone visitor who'd rather talk never sees that the option exists. At 1440 the two
  columns sit side by side, so nothing is lost there.
- **Evidence:** `about.html:247-284` (left column), `:286-287` (heading, then form). Screenshot
  after ☰ → Get started at 375: the form fills the screen, and the heading and booking button are
  above. Positions at 375: booking y = 4014, submit y = 4858.
- **Who it serves:** phone visitors deciding between writing and calling.
- **Size:** S. Point the links at the section (`#contact-section`), or put the response time and
  the booking link beside the submit button. EN+PT, about page only (plus the anchor in the nav,
  which is shared markup).
- **Fits the rules:** yes.
- **Confidence:** medium. It depends on visitors wanting a call, which would need data.

### C7 No visible email address or phone, so a failed submission leaves the visitor with nothing
- **What:** the form and an off-site booking page are the only channels. No `mailto:` and no
  phone number appear on any page. A buyer who works by forwarding a brief or rider (a PDF) has
  nowhere to send it: the form takes no files. If the endpoint errors, the native POST lands the
  visitor on n8n's response, off the site and with no way back, and the page shows no fallback.
  The address is already public in the structured data.
- **Evidence:** `grep -E 'mailto:|tel:'` over all HTML: no matches. `index.html:125` (JSON-LD
  `"email"`). `INTAKE.md` "Response": "The site does not inspect the response beyond following
  the redirect."
- **Who it serves:** agencies and production companies that brief by email; anyone the form
  fails.
- **Size:** S. A visible address next to the form and in the footer (shared). EN+PT.
- **Fits the rules:** yes (a `mailto:` loads nothing). Showing the address is the owner's call
  (spam exposure; it is already in the page source).
- **Confidence:** high on the facts. I could not measure how often submissions fail.

### C8 The contact form asks nothing the first reply will need
- **What:** the form is short, which is good: 3 required fields. But a technical production
  enquiry is answered with the event date, city or venue, and the kind and size of event. The
  form asks for none of these, and the message placeholder ("Tell us a bit about your project,
  event, or challenge") doesn't prompt for them either. So the first reply is usually a list of
  questions, which adds a round trip before any proposal.
- **Evidence:** `about.html:293-320` (fields: name*, company, email*, service, message*; consent).
- **Who it serves:** both sides of the first exchange; most of all a buyer with a dated event.
- **Size:** S if only the placeholder changes. M if optional fields are added (`INTAKE.md`, n8n,
  Notion).
- **Fits the rules:** new fields need the owner's yes and an `INTAKE.md` change. A placeholder
  is visitor-facing text (owner's yes; it could go to CR3).
- **Confidence:** low–medium. Whether replies really need a round trip is something only the
  owner's inbox can show.

### C9 After an enquiry: a mixed message, a vaguer promise, and next steps that lead back out
- **What:** `thank-you.html` serves the contact form only (newsletter sign-ups go to
  `check-your-inbox.html`), yet it still tells everyone "If you signed up for updates, please
  check your inbox". It promises a reply "shortly", where About promised "within one business
  day". Its two buttons are **Back to home** and **Explore services**. It doesn't say what happens
  next, and it offers no booking link and no Field Notes to read while the visitor waits.
- **Evidence:** `thank-you.html:62-69`; `INTAKE.md` "Response" (contact → thank-you, newsletter →
  check-your-inbox); `about.html:252,260`. The same in `pt/thank-you.html`.
- **Who it serves:** a visitor who just enquired and is deciding whether to also call, or to wait.
- **Size:** S. One page, EN+PT.
- **Fits the rules:** yes. The text is the owner's (could fold into CR2, which already owns
  thank-you).
- **Confidence:** high on the facts. The newsletter line may be meant for contact visitors who
  ticked the consent box; if so, it needs saying that way.

### C10 The newsletter is on one page, at the bottom, with a promise that says nothing
- **What:** the only sign-up is the last section of the home page: y = 3611 px at 375 (about
  5.4 screens down), 2921 at 1440. It offers "Keep up with the latest news. Sign up today." with
  no topic or frequency. Readers who aren't ready to enquire, such as Field Notes readers or
  Resources visitors, are offered no sign-up. Resources even announces an "Academy launching
  soon" with no way to hear when (the dead `#` link itself is #40).
- **Evidence:** `index.html:267-291`; `INTAKE.md` "Forms" (`newsletter` on `index.html` only);
  `resources.html:146-168`; `field-notes/portugal-events.html:233-238`, where the article ends in
  a booking link only.
- **Who it serves:** an early-stage planner (the quiz's own "earlyStage" visitor), months from a
  brief.
- **Size:** M. The same form on more pages, EN+PT. `source_page` already exists for this, but
  INTAKE lists the newsletter's pages and their `source_page` values, so it needs an `INTAKE.md`
  update.
- **Fits the rules:** needs an `INTAKE.md` change (new `source_page` values) and the owner's yes.
  No new service.
- **Confidence:** medium. Sign-up rates need MailerLite numbers, which the owner has.

### C11 Field Notes: the article sends readers off-site to book; the hub has no next step
- **What:** the one published article ends in **Talk through a technical budget** → cal.com in
  a new tab, with no form option and no "opens a new site" signal. The template's ending sends
  readers to the contact form instead ("Let's talk."), so articles will differ. The hub lists
  one article and has no CTA. PT readers go to the same booking URL; I could not check its
  language.
- **Evidence:** `field-notes/portugal-events.html:233-235`;
  `field-notes/article-template.html:160-165`; `field-notes/index.html:105-150`. The PT pages are
  the same. Measured at 375: the article is 9.8 screens and the CTA sits at y = 6019.
- **Who it serves:** a reader the article has just convinced. The Portugal Events piece targets
  organisers with a September deadline.
- **Size:** S. A form link beside the booking link in the article; one line on the hub.
- **Fits the rules:** yes.
- **Confidence:** medium. Booking may suit this article's readers better; no data either way.

### C12 With JavaScript off, the quiz is a dead end
- **What:** without JavaScript the quiz shows question 1 with a disabled **Next** and no way
  on: no link to Services or to the form. The nav still works, but the page's main content
  offers no next step. CLAUDE.md asks that content be reachable without JavaScript.
- **Evidence:** Playwright, `javaScriptEnabled:false`, `quiz.html` at 375: four options and a
  greyed **Next** that never enables. `quiz.html:100` has only the reveal `<noscript>`. The
  contact form itself works without JavaScript; only the pre-fill needs it.
- **Who it serves:** few visitors (privacy browsers, some corporate locked-down machines).
- **Size:** S. A `<noscript>` line pointing to Services and the form, EN+PT.
- **Fits the rules:** yes.
- **Confidence:** high that it's a dead end; the number of visitors affected is unknown and
  probably small.

### C13 Nothing on the site is labelled "Contact"
- **What:** the nav reads Services · About · Field Notes · Find your fit, plus a **Get started**
  button (PT: **Começar**). The form lives on About. A visitor scanning for "Contact", the word
  most sites use, finds it in no menu, link or footer. "Get started" also reads like a sign-up
  or onboarding flow, not "write to us".
- **Evidence:** `index.html:139-147` (nav), `:155-162` (mobile menu); the footer, see C1. The
  same markup on every page.
- **Who it serves:** first-time visitors who navigate by label.
- **Size:** M. Shared nav or footer markup on every page, EN+PT. The label is the owner's call
  (ties to #35 on the nav button).
- **Fits the rules:** yes. Renaming visitor-facing text needs the owner's yes.
- **Confidence:** medium. A labelling convention, not measured.

### C14 `?service=` accepts anything: the menu goes blank and `quiz_result` carries free text
- **What:** the pre-fill script falls back to the raw value when the key is unknown
  (`map[k]||k`). `about.html?service=<b>x` leaves the service menu with **no option selected**
  (`selectedIndex -1`, not even the "Select a service…" placeholder), and puts `<b>x` into the
  hidden `quiz_result`, which is then posted. `INTAKE.md` says `quiz_result` is empty or one of
  four service names. An old or edited link sends values that n8n doesn't expect, from visitors
  who never took the quiz.
- **Evidence:** `about.html:379-380` and `:399-400`; the same in `pt/about.html:359,379`.
  Playwright: `{sel:'', idx:-1, qr:'<b>x'}`.
- **Who it serves:** clean intake data in Notion; a menu that doesn't look broken.
- **Size:** S. Accept only the four keys, EN+PT.
- **Fits the rules:** yes. It brings the page in line with `INTAKE.md`; no contract change.
- **Confidence:** high.

## Seen, other lens
- Prospect needs: the Field Notes "Case Studies" filter is empty, so there is no project proof
  past the six client logos (empty-state text: #38).
- Prospect needs: the founder section is hidden in About's HTML (#42), so the page called
  "About" has no person on it.
- Technical: the quiz result's `<h1>` reads "TechnicalDirection" / "ShowDesign" as text content
  (the line break in `nameHTML` has no space), which may be how a screen reader announces it.
- Technical: external links (`target="_blank"`, cal.com, Gumroad, Instagram, LinkedIn) say
  nowhere, in text, that they open a new tab.
- Comparable studios: no visible pricing cue or engagement minimum anywhere; worth checking
  against peers.
