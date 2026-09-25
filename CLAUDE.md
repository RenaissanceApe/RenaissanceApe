# Instructions for agents working in this repo

These rules are the only governance for this repository. Earlier rules from
lp-brain, automata, lp-warden and contract-checker are retired: those systems
are archived and have no authority here. Do not look them up, and do not
restore files that served them.

## What this repo is

- **The static website only** — www.lumenandpixel.com, bilingual EN/PT, served
  by GitHub Pages from `main`. See `README.md` for how it is built and checked.

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
  `images/`, the typefaces (Space Mono, Nunito), and the colour tokens in the
  `:root` block of `base.css`.
- **No new third-party service without explicit approval.** This includes
  anything that loads in the visitor's browser — a page load currently makes
  zero off-origin requests — and any new system that receives form data, which
  also means updating `legal.html` and `pt/legal.html` in the same pass.
