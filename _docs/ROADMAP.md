# Roadmap

What is built and what comes next. This is the only list of what comes next: an idea becomes work
when it has a row here. Steps are grouped in **feature sets**; a set is built in parallel by worker
sessions on the `test` branch and reaches `main` as one PR ([PARALLEL.md](PARALLEL.md)).

Open questions and things waiting on the owner are in [PENDING.md](PENDING.md). The prompt for
each step still to run is in [SESSION_PROMPTS.md](SESSION_PROMPTS.md).

## Next

### 1. Brand refresh: bring the site up to Brand Book v1.2

Plan: [BRAND_REFRESH.md](BRAND_REFRESH.md). Closes issues #16 and #27.

| Step | What | Needs | Owns |
|---|---|---|---|
| **BR1** | Foundations: Inter replaces Nunito; semantic, spacing, radius and motion tokens; nav, menu, footer, buttons, inputs, tags to spec; the nine contrast failures (#16) fixed so CI is green | — | `base.css`, `site.css`, `site.js`, `fonts.css`, `fonts/`, nav/menu/footer markup in every page |
| **BR2** | Brand assets: Patch and Pixel Field tiles (seeded generator), sand grain tile, OG images to spec | — | `images/`, `_tools/patch.mjs` |
| **BR3** | Pages: home, legal, 404, thank-you, check-your-inbox | BR1, BR2 | those pages, EN + PT |
| **BR4** | Pages: services, about | BR1, BR2 | those pages, EN + PT |
| **BR5** | Pages: quiz, resources | BR1, BR2 | those pages, EN + PT |
| **BR6** | Pages: Field Notes hub, article template, articles | BR1, BR2 | `field-notes/`, `pt/field-notes/` |
| **BR7** | Sweep: a `brand` check in CI (corners, shadows, typefaces, colours outside the scales), leftovers, docs brought up to date | BR3–BR6 | `_tools/checks/`, `CLAUDE.md`, `README.md` |

Runs: BR1 and BR2 together → BR3, BR4, BR5, BR6 together → BR7 alone.

### Later sets (not planned yet; order is the owner's)

| Set | What | Waiting on |
|---|---|---|
| **Layout** | Rail Grid on every page (DESIGN.md "Layout") | D3 in PENDING; better after #12 |
| **Icons and motion** | Signal Pixel icons replacing the PNG service icons; Pixel Build logo reveal | `ICONS.md` from the owner (D5) |
| **Legal** | Privacy, Terms, Cookies and Disclaimer revised for the v2 stack (#28) | the owner (`needs-ricardo`) |
| **Assessment** | Previsualization Maturity Assessment on a subdomain (#13) | the owner (`needs-ricardo`) |
| **Markup** | Stop repeating nav and footer markup: partials or a site generator (#12) | the owner (`needs-ricardo`) |
| **Upkeep** | U1: keep `CLAUDE.md`, `DESIGN.md`, `INTAKE.md`, `CHANGELOG.md` off the public site (D11) | the owner's yes |

## Built

| Version | What | How it works |
|---|---|---|
| v1.55 | Agent rules, design reference, roadmap, parallel workflow | `CLAUDE.md`, `DESIGN.md`, `_docs/` |
| ≤ v1.54 | Everything before the roadmap existed | `CHANGELOG.md` |
