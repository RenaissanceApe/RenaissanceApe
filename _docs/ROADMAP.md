# Roadmap

What is built and what comes next. This is the only list of what comes next: an idea becomes work
when it has a row here. Steps are grouped in **feature sets**; a set is built in parallel by worker
sessions on the `test` branch and reaches `main` as one PR ([PARALLEL.md](PARALLEL.md)).

Open questions and things waiting on the owner are in [PENDING.md](PENDING.md). The prompt for
each step still to run is in [SESSION_PROMPTS.md](SESSION_PROMPTS.md).

## Next

### 1. Copy review: every word, humanised

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

### 2. Previz maturity quadrant: the 3D previsualization assessment, live on the site

The assessment is built in its own repository (issue #13). This set brings it onto the site as a
tool visitors use, linked from Resources, in the site's brand and languages.

| Step | What | Needs | Owns |
|---|---|---|---|
| **PQ1** | Bring the tool in: its files under a tools path, working as static pages with zero off-origin requests, result reachable without giving an email | access to the tool's repository (D14, D15) | the tool's folder |
| **PQ2** | Brand and languages: tokens, type and components from `base.css`; EN and PT; copy to `_docs/VOICE.md` | PQ1, CR1 | the tool's folder |
| **PQ3** | Connect: cards on `resources.html` and `pt/`, nav slot if wanted, sitemap, `hreflang`, OG image; if it collects an email, the form and `INTAKE.md` (D16) | PQ2 | `resources.html`, `sitemap.xml`, `INTAKE.md` |

Runs: PQ1 → PQ2 → PQ3, one at a time.

### 3. Languages: DE, FR and ES beside EN and PT

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

### Standing: discovery (challenger) jobs

Finds useful things to add to the site, ranks them and plans how to address them. Changes no
page, so it can run beside any other set, and again whenever the owner asks.

| Step | What | Needs | Owns |
|---|---|---|---|
| **DS1** | Scouts, one lens each, run together: (a) what comparable studios' sites offer that this one doesn't; (b) what a prospective client looks for and can't find here (search, questions, proof); (c) conversion: the paths from landing to enquiry and where they leak; (d) technical: performance, accessibility, SEO, sharing | — | `_docs/discovery/<lens>.md` |
| **DS2** | Challenger: argues against every finding (is it true, is it worth it, does it fit the brand and the zero-third-party rule), then scores what survives by value and effort | DS1 | `_docs/DISCOVERY.md` (the ranked list) |
| **DS3** | Plan: the top items become proposed ROADMAP rows with steps and open questions; the owner picks | DS2 | `_docs/ROADMAP.md`, `_docs/PENDING.md` |

Runs: DS1 scouts together → DS2 → DS3.

### Later sets (not planned yet; order is the owner's)

| Set | What | Waiting on |
|---|---|---|
| **Markup** | Stop repeating nav and footer markup: partials or a site generator (#12). Best done before Languages | the owner (`needs-ricardo`) |
| **Legal** | Privacy, Terms, Cookies and Disclaimer revised for the v2 stack (#28). Before Languages translates them | the owner (`needs-ricardo`) |
| **Layout** | Rail Grid on every page (DESIGN.md "Layout") | D3 in PENDING; better after #12 |
| **Icons and motion** | Signal Pixel icons replacing the PNG service icons; Pixel Build logo reveal; favicon and app icons redrawn in one green (#31) | `ICONS.md` from the owner (D5) |
| **Upkeep** | U1: keep `CLAUDE.md`, `DESIGN.md`, `INTAKE.md`, `CHANGELOG.md` off the public site (D11) | the owner's yes |

### Suggested order

Copy review (with a first discovery run beside it) → Previz quadrant → Markup and
Legal (both need the owner) → Languages → Layout, Icons and motion.

## Built

| Version | What | How it works |
|---|---|---|
| v1.56 | Brand refresh (BR1–BR7): the site on Brand Book v1.2. Inter, tokens and shared classes in `base.css`; nav, menu and footer to spec; Patch, Pixel Field, grain and OG images from generator scripts; every page restyled, EN and PT; the `brand` check in CI. Closed #16, #27, #32, #34, #46 | [BRAND_REFRESH.md](BRAND_REFRESH.md); the comment at the top of `base.css` |
| v1.55 | Agent rules, design reference, roadmap, parallel workflow | `CLAUDE.md`, `DESIGN.md`, `_docs/` |
| ≤ v1.54 | Everything before the roadmap existed | `CHANGELOG.md` |
