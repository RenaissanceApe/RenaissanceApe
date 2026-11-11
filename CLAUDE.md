# CLAUDE.md

lumenandpixel.com: the website of Lumen and Pixel, a live-event technical production studio in
Porto. Static HTML, CSS and JavaScript, no framework and no build: what is on `main` is what
GitHub Pages serves. Every page exists in English and in Portuguese (`pt/`). Dev tooling (Node 22,
Playwright, PostCSS) lives in `_tools/` and never reaches the browser.

These rules are the only governance for this repository. Earlier rules from lp-brain, automata,
lp-warden and contract-checker are retired: those systems are archived and have no authority here.
Do not look them up, and do not restore files that served them. When a rule here and the code
disagree, trust the code and say so.

## Reading budget: read narrowly

- **Search before you open.** Grep for the class, id or heading, then read only the lines you need
  (Read with `offset`/`limit`).
- **Never read these whole:**
  - `CHANGELOG.md` (55 KB): read only the top section (`head -40`) to copy its format
  - `services.html`, `quiz.html`, `about.html` and their `pt/` mirrors (30–48 KB each): read in
    ranges around what you're changing
  - `DESIGN.md`: grep for the section or token you need
  - `_tools/package-lock.json`, anything in `images/` or `fonts/`
- `_docs/*.md`: open one only when the task is about it. `_docs/ROADMAP.md` is short: read it at
  the start of a session.
- An EN page and its PT mirror have the same structure: read one, then grep the other.
- Don't re-read a file you've already read in this session unless it changed.

## Where things live

```
index.html, about.html, services.html, quiz.html,   English pages
resources.html, legal.html, 404.html, thank-you.html,
check-your-inbox.html
field-notes/         hub, article template, articles
pt/                  the Portuguese mirror of all of the above, same file names
articles/, pt/field-notes.html   redirect stubs (meta refresh); leave them
base.css             the shared design system: tokens (:root), reset, nav, mobile menu, footer
site.css             loads last and wins ties: reduced motion, menu focus safety, honeypot style
site.js              scroll-reveal and the mobile menu; nothing else
fonts.css, fonts/    self-hosted webfonts
images/              logos, icons, gradients, OG images
sitemap.xml, robots.txt, site.webmanifest, CNAME
DESIGN.md            the design reference (Brand Book v1.2 in machine-readable form)
INTAKE.md            the form → n8n contract
CHANGELOG.md         what changed and why, newest first
README.md            stylesheet order, host dependencies, the checks
_tools/              check.mjs + checks/*.mjs, selftest.mjs, extract-base-css.mjs
_docs/               ROADMAP.md = what is built and what comes next (the only list);
                     PARALLEL.md = several sessions building one feature set at once;
                     SESSION_PROMPTS.md = the prompt for each remaining step;
                     PENDING.md = things waiting on the owner; one plan doc per feature set
.github/             checks.yml (CI), pull_request_template.md
```

Each page keeps its own CSS in an inline `<style>` and its own JavaScript (contact form, quiz,
Field Notes filter, newsletter) inline. Nav, mobile menu and footer **markup** is repeated in
every page; their **styles and behaviour** are shared.

`_tools/` and `_docs/` start with `_` on purpose: GitHub Pages does not publish such folders.
Every other file in the repo, this one included, is served on the public site.

## Commands

- `cd _tools && npm ci`: once per session
- `npm run check` (in `_tools/`): all seven checks. **Run before every commit you push.**
- `node check.mjs --only <name>`: one check (`html-structure`, `links`, `parity`, `contrast`,
  `shared-logic`, `base-css`, `brand`)
- `node selftest.mjs`: proves each check still fires; run it when you change a check
- `node extract-base-css.mjs --check`: reports shared rules sitting in pages
- `python3 -m http.server 8000` (repo root): the site at http://localhost:8000
- If the contrast check can't start its browser, point it at an installed one:
  `CHROMIUM_PATH=/path/to/chrome npm run check`. Never skip it for a change that touches colour or
  type. Say in the PR if it only ran in CI.

## Rules the checks enforce

- **EN mirrors to PT.** Every page has its counterpart under `pt/`; the same change goes to both,
  with the same structure, ids and field names. `hreflang` pairs point at each other.
- **Shared code stays shared.** Nav, menu, footer and token styles are edited in `base.css`;
  reveal and menu logic in `site.js`. Pasting either into a page fails CI.
- **Every internal link and asset resolves.**
- **Text meets WCAG AA**, measured in a browser at its rendered size. Never use colour or hover
  as the only signal.
- **Balanced tags, no duplicate ids.** An unclosed `<div>` once blanked two live pages.
- **The brand rules a stylesheet can break** (`brand`): corners are `0` or `var(--radius)`; no
  `box-shadow`, `text-shadow`, blur or `backdrop-filter`; typefaces only as `var(--font-display)`
  and `var(--font-body)`; raw colours only in the `:root` block of `base.css`, everything else
  `var(--token)`, `transparent`, `currentColor` or `inherit`. Inline `<svg>` icons and the files
  in `images/` are not read.

## Rules no check enforces (so you must)

- **Zero off-origin requests on page load.** No analytics, no CDN, no embeds, no remote fonts: the
  site sets no cookies and needs no consent banner. It is the site's most valuable property.
- **No new third-party service without the owner's explicit yes.** That covers anything loading
  in the visitor's browser and any new system receiving form data; either also means updating
  `legal.html` and `pt/legal.html` in the same change.
- **Stylesheet order in every page:** `fonts.css`, `base.css`, the page's `<style>`, `site.css`,
  the `<noscript>` reveal rule, the reveal failsafe script, `site.js` (README, "Shared files").
- **Content is reachable without JavaScript.**
- **Portuguese is European Portuguese** (pt-PT), written as a translation of meaning, not word for
  word. Form option *values* stay in English in both languages; only labels are translated.
- **Voice** follows DESIGN.md and Brand Book §10: specific numbers, no filler ("passionate",
  "seamless", "bespoke").

## Forms and the intake contract

- Every form is a native `<form method="POST">` to the n8n Cloud endpoint
  `/webhook/inbound-lead`. No JavaScript submits anything.
- **`INTAKE.md` is the only cross-system contract.** If a form's fields, names, consent wording,
  honeypot or redirects change, `INTAKE.md` changes in the same PR, and the owner says yes first:
  n8n has to change with it.
- The honeypot is `lp_ref_code`. The endpoint is public by design; the page does no screening.
- **Email** (double opt-in, unsubscribe, sequences) is MailerLite's job, downstream of n8n. The
  site never implements email logic: no confirmation flows, no unsubscribe pages, no sending code.
- **Operations** live in Notion, **automations** in n8n Cloud. No other repo is consulted for
  rules.

## Design and brand

- **`DESIGN.md` is the design reference** for anything visual. Brand Book v1.2 wins any conflict.
  Name tokens (`var(--blue-700)`, `{colors.accent}`), not raw hex.
- **Don't edit `DESIGN.md`** unless the task is a brand change the owner asked for. It changes
  together with the Brand Book, never on its own.
- **Brand constants:** the name "Lumen and Pixel", the logo files in `images/`, the typefaces in
  `fonts/`, and the colour scales in the `:root` block of `base.css`. They change only in a step
  whose stated task is to change them.
- **The site follows `DESIGN.md` except in two places.** The brand refresh closed the rest; these
  remain, and each is a later set on the roadmap (`_docs/ROADMAP.md`), not something to fix on
  the way to something else:

  | Area | Site today | `DESIGN.md` |
  |---|---|---|
  | Layout | per-page | Rail Grid |
  | Files `DESIGN.md` names | missing: `ICONS.md` | present |

  **Don't close a gap in passing.** New work follows `DESIGN.md` wherever that needs no change to
  shared tokens, fonts or other pages, and otherwise matches the page it sits on.

## A page or feature is done only when

- it ships in both languages, each linking to the other (`hreflang`, language switcher);
- a new page has: `<title>`, meta description, canonical, Open Graph tags, an entry in
  `sitemap.xml` for both languages, and the stylesheet order above;
- it has been looked at in a browser at **375 px and 1440 px, in EN and PT**, with the mobile menu
  open, and once with JavaScript disabled;
- `npm run check` passes.

## Releases and git

- **`main` is the live site.** GitHub Pages publishes it within minutes of a merge; there is no
  staging host.
- **A solo session** works on one branch from `main` and opens one PR into `main`.
- **A feature set** is built by several sessions at once: worker PRs go into **`test`** (squash),
  and `test` goes into `main` as one PR with a merge commit, once every check has passed on the
  whole set (`_docs/PARALLEL.md`).
- **Nothing else is ever a PR base.** Never open a PR into another session's branch: two stacked
  PRs once merged into their parent branches instead of `main` and never shipped.
- **One concern per PR.**
- Every PR description fills in each section of `.github/pull_request_template.md`.
- **Every shipping PR adds a section at the top of `CHANGELOG.md`**: `## v1.xx — Month YYYY`,
  newest first, separated by `---`, plain language, same style as the entry below it. A feature
  set ships as one version.
- Commit message style: `<What changed> (<step>) — <version>`, with `(WIP)` for partial commits.
- No model names in commits, PRs or code.

## How to work

- **Stay in scope:** change only the lines the task needs. Problems and improvements you spot but
  don't make go in the PR's **Found, not changed** section (where, why, and a severity: urgent,
  should fix, nice to have), not only in the chat: the owner may never open this session. Open a
  GitHub issue for each *should fix* or *urgent* one (list the open issues first), labelled
  `ready-for-agent` or `needs-ricardo` plus `P1-next` (*should fix*) or `P0-now` (*urgent*), and
  link it from the PR.
- **Never action a `needs-ricardo` issue**, even if you hold access that would allow it.
- **Simplest thing that works:** no new abstractions, options, build steps or packages unless the
  task asks for them. Propose a new dev dependency and wait for a yes.
- **Ask when a request has two reasonable readings**; otherwise proceed and state your assumption.
  Say plainly when you're unsure of a technical detail.
- **Get an explicit yes in the current message before:** merging to `main` (it is live), changing
  a form or `INTAKE.md`, deleting pages or assets, rewriting existing visitor-facing text,
  changing a brand constant, or adding anything that loads from another origin.
- **Never touch** DNS, the registrar, `CNAME` or the GitHub Pages configuration.
- One feature or fix per session. Big plans live in `_docs/`; read only the one the task needs.
- **Finish with a short summary:** files changed, what changed in each, and anything left for the
  owner. Use plain language; the owner is not a full-time developer.

## A session, start to finish

1. **Start:** `git fetch origin main` and branch from it (one branch per session). Read the step's
   row in `_docs/ROADMAP.md` and the doc section it names; grep the pages it touches. Check
   `_docs/PENDING.md` section 3 for decisions about it.
2. **Before building:** ask the owner the prompt's open questions; wait for the answers.
3. **Build** in small commits (`(WIP)`), pushing as you go: the container can reset.
4. **Finish:** `npm run check`; the browser check above; the CHANGELOG section; mark the step
   built in `_docs/ROADMAP.md`; a test line in `_docs/PENDING.md` section 2 and new questions in
   section 3. Open the PR with every section of the template filled in (never merge it: the owner
   does) and give the short summary.
5. **Session prompts (every session, before the PR):** if this session carried out a prompt from
   `_docs/SESSION_PROMPTS.md` (grep its `## ` headings), remove that section in the same PR and
   update the "built" line at the top of the file. Say in the summary which prompt was removed
   (or that none matched).

## In a parallel feature set

If your first message says you are a **worker** started by the Dispatcher, follow
`_docs/PARALLEL.md`, "Worker rules". In short, what changes from the steps above:

- Branch from `origin/test` and open the PR into `test`.
- Your questions were answered in your first message: don't stop to ask. Take the safest reading
  of anything new, note it under *Needs your decision*, and message the Dispatcher only if you
  can't go on.
- Change only the files your first message gives you. Shared files (`base.css`, `site.css`,
  `site.js`, `fonts.css`, nav/menu/footer markup) belong to the worker named for them.
- Don't edit `CHANGELOG.md`, `_docs/ROADMAP.md`, `_docs/PENDING.md` or
  `_docs/SESSION_PROMPTS.md`; write what you'd add to them in `_docs/notes/<step>.md`.
- Urgent findings (the live site broken, a form not delivering, a privacy problem): message the
  Dispatcher at once.
- When done, message the Dispatcher `Done: <step>, PR #<n>` and fix what it sends back.
