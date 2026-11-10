# Instructions for agents working in this repo

These rules are the only governance for this repository. Earlier rules from
lp-brain, automata, lp-warden and contract-checker are retired: those systems
are archived and have no authority here. Do not look them up, and do not
restore files that served them.

## What this repo is

- **The static website only** — www.lumenandpixel.com, bilingual EN/PT, served
  by GitHub Pages from `main`. Nothing is compiled: what is on `main` is live.
  See `README.md` for the file layout, the stylesheet order and the checks.

## Its one dependency on anything else

- Forms `POST` to the n8n Cloud intake endpoint `/webhook/inbound-lead`.
- The field contract is documented in **`INTAKE.md`**. That is the **only**
  cross-system contract. If a form changes, `INTAKE.md` changes in the same PR.

## Where everything else lives

- **Operations** live in Notion. **Automations** live in n8n Cloud.
- **No other repo is consulted for rules.**
- **Email** (double opt-in, unsubscribe, sequences) is handled by **MailerLite**.
  The site never implements email logic: no confirmation flows, no
  unsubscribe pages, no email-sending code.

## Design

- **`DESIGN.md` is the design reference** for anything visual: tokens,
  components, patterns, motion, do's and don'ts. It is the machine-readable
  companion to Brand Book v1.2; the book wins any conflict. Read the section
  you need before designing, and name tokens (`{colors.accent}`), not raw hex.
- **Don't edit `DESIGN.md`** unless the task is a brand change the owner asked
  for. It changes together with the Brand Book, never on its own.
- **The site has not caught up with `DESIGN.md` yet.** Known gaps:

  | Area | Site today | `DESIGN.md` |
  |---|---|---|
  | Body typeface | Nunito (`--font-body`, `fonts/`) | Inter |
  | Corners | 1–3 px on many elements, a pill and a circle on `services.html` and `404.html` | 0 px everywhere |
  | Tokens | colour scales only | semantic aliases, spacing, motion tokens |
  | Patterns and texture | none | Patch, Pixel Field, sand grain |
  | Layout | per-page | Rail Grid |
  | Assets `DESIGN.md` names | missing: `ICONS.md`, `grain-tile-512.png`, Inter font files | present |

  **Don't close a gap in passing.** Each one is its own PR, started by the
  owner. Until then, new work follows `DESIGN.md` wherever that needs no
  change to shared tokens, fonts or other pages, and otherwise matches the
  page it sits on. When a gap is closed, remove its row here in the same PR.

## How changes are made

- **Every PR targets `main`. No stacked PRs.** (Two stacked PRs once merged into
  their parent branches instead of `main` and never shipped.)
- **One concern per PR.**
- **EN changes mirror to PT.** Every page has its counterpart under `pt/`; the
  same change goes to both, with the same field names and structure. CI checks
  this (`_tools/checks/parity.mjs`).
- **Version bump and CHANGELOG entry** for every change, per the existing
  convention: a new `## v1.xx — Month YYYY` entry at the top of `CHANGELOG.md`,
  newest first, separated by `---`.
- **Brand constants unchanged:** the name "Lumen and Pixel", the logo files in
  `images/`, the typefaces in `fonts/`, and the colour tokens in the `:root`
  block of `base.css`. They change only in a PR whose stated task is to change
  them (see "Design").
- **No new third-party service without explicit approval.** This includes
  anything that loads in the visitor's browser — a page load currently makes
  zero off-origin requests — and any new system that receives form data, which
  also means updating `legal.html` and `pt/legal.html` in the same pass.

## Reading and checking

- `CHANGELOG.md` is large: read only the top entry (`head -40`) to copy its
  format. Pages are 10–45 KB each: grep for the section, then read that range.
- Shared styles and behaviour live in `base.css`, `site.css` and `site.js`.
  Edit them there; never paste nav, menu, footer or reveal code into a page
  (CI fails on it).
- Before every push: `cd _tools && npm ci && npm run check`. If you changed a
  check, also `node selftest.mjs`.
- After a visual change, look at the page in a browser (`python3 -m http.server
  8000`) at 375 px and at desktop width, in EN and PT, with the mobile menu
  open, and once with JavaScript disabled. Say in the PR what you looked at.

## How to work

- **Stay in scope:** change only what the task needs. Anything else you notice
  goes in the PR under *Found, not changed* (where, why it matters, and a
  severity: urgent, should fix, nice to have), not only in the chat: the owner
  may never open your session.
- **Ask when a request has two reasonable readings;** otherwise proceed and
  state your assumption.
- **Get an explicit yes before** rewriting existing visitor-facing copy,
  deleting pages or assets, or changing a form.
- **Never merge a PR.** `main` is the live site; the owner merges.
- **PR description**, in this order: *Changed* · *Found, not changed* ·
  *Needs your decision* (with what you assumed meanwhile) · *Checks run* ·
  *For the owner* (anything to do or look at by hand). Plain language; the
  owner is not a full-time developer.
- No model names in commits, PRs or code.

## When a Dispatcher started you

Several sessions may work on the site at once: a **Dispatcher** session plans
the work with the owner and starts one **worker** session per concern. If your
first message says you are a worker, these rules are added to the ones above:

- Branch from `origin/main` and open your PR into `main`, as always.
- Your questions were answered in your first message: don't stop to ask. Take
  the safest reading of anything new, write it under *Needs your decision*, and
  carry on. Message the Dispatcher only if you can't continue.
- Stay in the files your first message gives you. It also lists the other
  workers and what they own; if you must touch something of theirs, or a
  shared file (`base.css`, `site.css`, `site.js`, `fonts.css`) you weren't
  given, message the Dispatcher first.
- Use the version number the Dispatcher gave you for your CHANGELOG entry.
- If your PR conflicts because `main` moved on, merge `origin/main` into your
  branch, keep both CHANGELOG entries in version order, re-run the checks and
  push.
- Urgent findings (the live site broken, a form not delivering, a privacy
  problem): message the Dispatcher at once.
- When the PR is open and green, message the Dispatcher `Done: <task>, PR #<n>`
  and stay available for fixes.
