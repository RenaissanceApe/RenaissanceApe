# Roadmap

What is built and what comes next. This is the only list of what comes next: an idea becomes work
when it has a row here. Steps are grouped in **feature sets**; a set is built in parallel by worker
sessions on the `test` branch and reaches `main` as one PR ([PARALLEL.md](PARALLEL.md)).

Open questions and things waiting on the owner are in [PENDING.md](PENDING.md). The prompt for
each step still to run is in [SESSION_PROMPTS.md](SESSION_PROMPTS.md).

## Next

### 1. Upkeep 2: defects fixed before the copy review

Agent-only, and can start now. Placed first because it needs no content from the owner, fixes real
defects (a quiz that is blank without JavaScript, a 404 that breaks below a folder, a stale
stylesheet after each release, controls a screen reader can't use), and touches pages the copy
review is about to rewrite: done first, the two sets never own a page at the same time. From
discovery run 1: the challenger's quick fixes QF1–QF9 ([DISCOVERY.md](DISCOVERY.md)) and the open
`ready-for-agent` issues #51, #37 and #40. Plan: [UPKEEP_2.md](UPKEEP_2.md). Ships as v1.58.

| Step | What | Needs | Owns |
|---|---|---|---|
| **UP1** | Quiz and About scripts: a no-JavaScript line on the quiz (QF2); the result heading read as two words (QF6); `?service=` accepts only `SD`/`SC`/`SA`/`TD` (QF3); About's three control-less labels become text (QF5, About part) | — | `quiz.html`, `about.html`, EN + PT |
| **UP2** | 404, confirmation pages, Legal, Services: root-absolute paths on the 404 (QF1); skip link and `main-content` on thank-you and check-your-inbox, Legal's tab bar in a landmark, Services' image paths (QF5, rest) | — | `404.html`, `thank-you.html`, `check-your-inbox.html`, `legal.html`, `services.html`, EN + PT |
| **UP3** | Field Notes hub and Resources: article titles as `<h2>` (QF4); the active filter announced (#37); the Academy button no longer a dead link (#40) | — | `field-notes/index.html`, `resources.html`, EN + PT |
| **UP4** | Every page's `<head>`: a release version on the shared-file URLs and a check that every page carries the same one (#51); `og:locale`, `og:image:alt`, PT home `og:url`, OG cards as JPEG (QF7); Organisation data on the PT home (QF8); `robots.txt` (QF9) | UP1–UP3 merged | the `<head>` of every page, `robots.txt`, `_tools/og.mjs`, `_tools/checks/html-structure.mjs`, `_tools/selftest.mjs`, the release lines in `CLAUDE.md`, `README.md`, `_docs/PARALLEL.md` |

Runs: UP1, UP2, UP3 together → UP4 alone (it edits every page). Owner first: nothing to start;
the few new words (the quiz's no-JavaScript line, two `aria-label`/`alt` texts) are approved in the
PR, and the old PNG cards are deleted only on a yes (D68).

### 2. Copy review: every word, humanised

All visitor-facing text on the site, EN and PT: pages, Field Notes articles, form labels and
messages, meta titles and descriptions, alt text, OG text. Removes AI telltales and makes it read
as written by the people who run the studio, to the voice rules in Brand Book §10. Comes after the
brand refresh (built, v1.56) because both touch every page.

| Step | What | Needs | Owns |
|---|---|---|---|
| **CR1** | The yardstick: a telltale list and voice guide (`_docs/VOICE.md`) from Brand Book §10, plus an inventory of every piece of copy with its problems marked | — | `_docs/VOICE.md`, `_docs/COPY_REVIEW.md` |
| **CR2** | Rewrite: home, legal (wording only, not legal meaning), 404, thank-you, check-your-inbox | CR1 | those pages, EN + PT |
| **CR3** | Rewrite: services, about | CR1 | those pages, EN + PT |
| **CR4** | Rewrite: quiz, resources | CR1 | those pages, EN + PT |
| **CR5** | Rewrite: Field Notes hub, template, articles | CR1 | `field-notes/`, `pt/field-notes/` |
| **CR6** | Read-through of the whole site in each language for consistency of terms and tone; a second reader that only hunts telltales | CR2–CR5 | leftovers only |

Runs: CR1 alone → CR2, CR3, CR4, CR5 together → CR6 alone. Every rewrite PR carries a
before/after table per page so the owner approves text, not diffs (D12, D13).

### 3. Previz maturity quadrant: the 3D previsualization assessment, live on the site

The assessment is built in its own repository (issue #13). This set brings it onto the site as a
tool visitors use, linked from Resources, in the site's brand and languages.

| Step | What | Needs | Owns |
|---|---|---|---|
| **PQ1** | Bring the tool in: its files under a tools path, working as static pages with zero off-origin requests, result reachable without giving an email | access to the tool's repository (D14, D15) | the tool's folder |
| **PQ2** | Brand and languages: tokens, type and components from `base.css`; EN and PT; copy to `_docs/VOICE.md` | PQ1, CR1 | the tool's folder |
| **PQ3** | Connect: cards on `resources.html` and `pt/`, nav slot if wanted, sitemap, `hreflang`, OG image; if it collects an email, the form and `INTAKE.md` (D16) | PQ2 | `resources.html`, `sitemap.xml`, `INTAKE.md` |

Runs: PQ1 → PQ2 → PQ3, one at a time.

### 4. Languages: DE, FR and ES beside EN and PT

The whole site in five languages. Runs after the copy review (translate the final text, once) and
after the quadrant tool (so it is translated with the rest). Strongly better after **Markup**
(#12): five languages multiply the repeated nav and footer markup by five.

| Step | What | Needs | Owns |
|---|---|---|---|
| **TR1** | Groundwork: `de/`, `fr/`, `es/` structure; language switcher for five; `hreflang` and sitemap for five; the parity check extended from EN/PT pairs to all five; `lang` values in forms and `INTAKE.md` (D19); a glossary of studio terms per language (`_docs/GLOSSARY.md`) | copy review, D17–D20 | shared files, `_tools/checks/parity.mjs`, `INTAKE.md` |
| **TR2** | German: every page | TR1 | `de/` |
| **TR3** | French: every page | TR1 | `fr/` |
| **TR4** | Spanish: every page | TR1 | `es/` |
| **TR5** | Sweep: a second reader per language against the glossary; links, switcher and forms tried in each language; `CLAUDE.md` and README updated from "EN and PT" to five languages | TR2–TR4 | leftovers, docs |

Runs: TR1 alone → TR2, TR3, TR4 together → TR5 alone.

### 5. Contact and enquiry path (proposed)

**Proposed by discovery run 1 (v1.57); not started until the owner picks it.** Closes the leaks
between reading and asking: Services and Home have no contact link at the moment a buyer decides,
the footer doesn't navigate, a phone visitor without JavaScript has no navigation at all, and the
quiz result's lead button points away from the form. DISCOVERY.md items 1, 5, 9, 10 (optional 12
and 15).

| Step | What | Needs | Owns |
|---|---|---|---|
| **CE1** | Contact links in each Services section and the Services close (`about.html?service=…#contact-form`, which already pre-fills), and a button in the Home banner. Secondary or text buttons (one green button, D22) | D49 | `services.html`, `index.html`, EN + PT |
| **CE2** | A footer row that navigates: Services, About, Field Notes, Resources (no inbound link today), Contact, the email address if D50 says yes. Fixes the no-JavaScript phone case too | D50, D51 | the footer markup in every page, `base.css` (bumps `?v=`, #51) |
| **CE3** | About's contact section on a phone: "Get started" lands above the reply promise and booking button, not past them; required fields marked | yes to the visible text | `about.html`, EN + PT |
| **CE4** | Quiz result: "Start a conversation" as the filled button | D52 | `quiz.html`, EN + PT |
| **CE5** | Only with an explicit yes: optional date, place and size fields, and the quiz's mode carried to the form, as **one** `INTAKE.md` change with n8n and Notion updated the same day | D53 | `about.html`, `INTAKE.md` |

Runs: CE1, CE3, CE4 together → CE2 alone (every page). If D53 is yes before the set starts, CE5
is built inside CE3 (same page); otherwise it isn't built. Can't run beside the copy review:
CE1, CE3 and CE4 own pages CR2, CR3 and CR4 rewrite, and CE2 touches every page. Run it before
CR2–CR5 start or after CR6. Much cheaper after **Markup** (#12), which makes CE2 one edit.
Owner first: the button labels (D49); the email address in the footer (D50); "Contact" in the nav
(D51, relates to D22/#35); the quiz button order (D52); CE5 yes or no (D53).

### 6. Proof of work (proposed)

**Proposed by discovery run 1 (v1.57); not started until the owner picks it.** The gap every
discovery lens found: one anonymous story, six unlinked logos, an empty Case Studies filter, no
photograph of a show, and a founder-led studio that hides its founder. DISCOVERY.md items 3, 2, 6,
11 (later 13 and 14). Almost all the effort is the owner's material; the template is small.

| Step | What | Needs | Owns |
|---|---|---|---|
| **PW1** | Work hub and a fixed case template (client or description, event and size, year, service, role, the system that mattered, a number, credits, photos), EN and PT, sitemap; the About story becomes case 1 | D54 | `work/`, `pt/work/` (new), `sitemap.xml` |
| **PW2** | Cases 2–4 from the owner's facts and photos (self-hosted; clients named only with permission) | PW1, D54 | the case pages |
| **PW3** | Tie the proof in: Home's logos link to cases, each Services section gets "Related work", the Case Studies filter gets entries (#38), the nav gets "Work" | PW2 | `index.html`, `services.html`, `field-notes/index.html`, EN + PT; the nav markup in every page |
| **PW4** | Founder section published and the articles signed (#42) | D32, D55 | `about.html`, EN + PT |
| **PW5** | A row of 3–4 true figures for scale, on Home | D56 | `index.html`, EN + PT |
| **PW6** | Optional: sample deliverables on Services (a redacted plot, patch sheet, previz still) | D64 | `services.html`, EN + PT |

Runs: PW1 alone → PW2, PW4, PW5 together → PW3 alone (owns Home after PW5, and every page for
the nav entry) → PW6 if wanted. Build after CR3 (which owns About and Services) and CR2 (Home);
start collecting the owner's material during the copy review, because it takes longest.
Owner first: 3–4 projects with facts and photos, and which clients may be named (D54); publish the
founder (D32) and the photo and bio facts (D55); 3–4 figures (D56); cleared documents (D64). A
showreel (D63) and a studio PDF (D62) come after this set, from its content.

### 7. Working with us (proposed)

**Proposed by discovery run 1 (v1.57); not started until the owner picks it.** A few short blocks
that answer an agency's first questions: how a quote is built, what the studio supplies, how early
to book, where it is and how far it travels, who wrote the article. DISCOVERY.md items 7, 4, 8.
Mostly the owner's facts.

| Step | What | Needs | Owns |
|---|---|---|---|
| **WW1** | "How we work and quote" on Services: day rate or fixed fee per phase (a shape, not prices), supplier or vendor-independent, who the studio works for and alongside, lead time, what a useful first message contains, what happens next, one line on insurance | D57–D60 | `services.html`, EN + PT (its title and description too) |
| **WW2** | City, travel terms and working languages on About and Home; the titles and descriptions of those pages name the city; `addressLocality` in the Organisation data | D61 | `about.html`, `index.html`, EN + PT |
| **WW3** | An author-and-studio block at the end of the article template and the article, linking to Services and the form | PW4 (the name), D43 | `field-notes/article-template.html`, `field-notes/portugal-events.html`, EN + PT |

Runs: WW1 and WW2 together → WW3 once PW4 has shipped. Owns the same pages as CR2, CR3 and CR5,
so it can't run beside them: either fold it into CR3 and CR5 as owner-approved meaning changes
(D67), or run it after CR6. Owner first: pricing shape public or not (D57), supplier or
independent (D58), lead time (D59), insurance (D60), city, travel and languages (D61), the article
ending (D43).

### Standing: discovery (challenger) jobs

Finds useful things to add to the site, ranks them and plans how to address them. Changes no
page, so it can run beside any other set, and again whenever the owner asks.

| Step | What | Needs | Owns |
|---|---|---|---|
| **DS1** | Scouts, one lens each, run together: (a) what comparable studios' sites offer that this one doesn't; (b) what a prospective client looks for and can't find here (search, questions, proof); (c) conversion: the paths from landing to enquiry and where they leak; (d) technical: performance, accessibility, SEO, sharing | — | `_docs/discovery/<lens>.md` |
| **DS2** | Challenger: argues against every finding (is it true, is it worth it, does it fit the brand and the zero-third-party rule), then scores what survives by value and effort | DS1 | `_docs/DISCOVERY.md` (the ranked list) |
| **DS3** | Plan: the top items become proposed ROADMAP rows with steps and open questions; the owner picks | DS2 | `_docs/ROADMAP.md`, `_docs/PENDING.md` |

Runs: DS1 scouts together → DS2 → DS3.

Run 1 done (v1.57; [DISCOVERY.md](DISCOVERY.md)). Next run when the owner asks, ideally after
Proof of work ships, so the scouts judge the site with its proof in place.

### Later sets (not planned yet; order is the owner's)

| Set | What | Waiting on |
|---|---|---|
| **Markup** | Stop repeating nav and footer markup: partials or a site generator (#12). Best done before Languages | the owner (`needs-ricardo`) |
| **Legal** | Privacy, Terms, Cookies and Disclaimer revised for the v2 stack (#28). Before Languages translates them | the owner (`needs-ricardo`) |
| **Layout** | Rail Grid on every page (DESIGN.md "Layout") | D3 in PENDING; better after #12 |
| **Icons and motion** | Signal Pixel icons replacing the PNG service icons; Pixel Build logo reveal; favicon and app icons redrawn in one green (#31) | `ICONS.md` from the owner (D5) |
| **Upkeep** | U1: keep `CLAUDE.md`, `DESIGN.md`, `INTAKE.md`, `CHANGELOG.md` off the public site (D11) | the owner's yes |

### Suggested order

1. **Upkeep 2**: fixes real defects with no owner content, and must finish before the copy review
   rewrites the same pages.
2. **Contact and enquiry path**: the cheapest change that closes a real leak, and it runs best
   before the copy review takes the same pages.
3. **Copy review**, with **Working with us** folded in as owner-approved meaning changes if the
   owner agrees (D67): one pass over Services, About and the article instead of two.
4. **Proof of work**, once the owner's projects, photos and permissions are in: the largest gain,
   gated only by material that should start being collected now.
5. **Previz quadrant**: brings the studio's own tool on site, after the copy it links from is
   final.
6. **Languages**: translate the final text once, the quadrant included.
7. **Layout, Icons and motion**: visual sets that wait on D3 and `ICONS.md`.

**Markup** and **Legal** (Later sets) slot in whenever the owner decides them; both are best done
before Languages.

## Built

| Version | What | How it works |
|---|---|---|
| v1.57 | Discovery run 1 (DS1–DS3): four scouts, a challenger's ranked list, and this plan: Upkeep 2 ready to run, three proposed sets waiting on the owner, decisions D48–D69 | [DISCOVERY.md](DISCOVERY.md), `_docs/discovery/`, [UPKEEP_2.md](UPKEEP_2.md) |
| v1.56 | Brand refresh (BR1–BR7): the site on Brand Book v1.2. Inter, tokens and shared classes in `base.css`; nav, menu and footer to spec; Patch, Pixel Field, grain and OG images from generator scripts; every page restyled, EN and PT; the `brand` check in CI. Closed #16, #27, #32, #34, #46 | [BRAND_REFRESH.md](BRAND_REFRESH.md); the comment at the top of `base.css` |
| v1.55 | Agent rules, design reference, roadmap, parallel workflow | `CLAUDE.md`, `DESIGN.md`, `_docs/` |
| ≤ v1.54 | Everything before the roadmap existed | `CHANGELOG.md` |
