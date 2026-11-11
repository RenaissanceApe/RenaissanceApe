# Pending

Things waiting on the owner. Section 1: one-time setup. Section 2: things to try by hand after a
release. Section 3: decisions, each with the answer assumed until the owner gives one.

## 1. Setup

- [x] GitHub → Settings → General → Pull Requests: allow **merge commits** and **squash merging**
      (PARALLEL.md, "What you set up once").
- [ ] Optional: branch rules on `test` and `main` requiring the `checks` job.
- [ ] Issue #14 ("start here") is the old running order; `_docs/ROADMAP.md` replaces it. Close it
      or point it at the roadmap.

## 2. To try by hand

Nothing yet.

## 3. Decisions

**D1–D11 were accepted as assumed by the owner on 2026-11-11: the right-hand column is the
decision.** D12–D21 are still open.

| # | Question | Assumed until answered |
|---|---|---|
| D1 | How do you look at a feature set before merging it? `test` is not published anywhere. (a) The Dispatcher sends a private page of before/after screenshots of every page. (b) A preview host that serves `test` (a new third-party service). | (a) |
| D2 | Small grey text (footer, metadata) fails WCAG AA in gray-500. Move it to gray-300 (`--text-muted`) and change no brand colour? This closes #16 and is the "UI palette" of #27: the semantic tokens in DESIGN.md. | Yes |
| D3 | Rail Grid (one rail column + four content columns on every page): part of the brand refresh, or its own later set? It restructures every page. | Later set |
| D4 | Sand grain tile `grain-tile-512.png`: do you supply the master, or does BR2 generate one to the Brand Book description for you to approve in the preview? | BR2 generates |
| D5 | Signal Pixel icons and the Pixel Build logo reveal need `ICONS.md`, which is not in the repo. Leave both, and the PNG service icons, for a later set? | Later set |
| D6 | Decoration per page. Home hero: Signal Glow + grain. Services, About, Quiz, Resources, Field Notes heroes: Patch, tone on dark. 404 and the two confirmation pages: Pixel Field. Legal: none. Patch in Signal mode (green on navy): nowhere for now. | As listed |
| D7 | Version: the set ships as v1.56, or does the refresh deserve v2.0? | v1.56 |
| D8 | Is copy in scope? The refresh is visual only; text that breaks the voice rules is reported, not rewritten. | Visual only |
| D9 | Delete the Nunito font files once Inter is in? | Yes |
| D10 | DESIGN.md sizes display type at 56/40/28 px. Follow that scale exactly even where a page's headline is larger or smaller today? | Yes |
| D11 | `CLAUDE.md`, `DESIGN.md`, `INTAKE.md` and `CHANGELOG.md` are served on the public site (e.g. `/CLAUDE.html`). Hide them (upkeep step U1), or leave them? | Leave for now |
| D12 | Copy review: how do you approve rewritten text? (a) A before/after table per page in each PR, you edit or approve there. (b) Workers rewrite freely and you read the result in the preview. | (a) |
| D13 | Copy review: may meaning change (claims, numbers, service descriptions, calls to action), or only wording? And is there writing of yours the rewrite should sound like (emails, posts, proposals)? | Wording only; Brand Book §10 as the model |
| D14 | Previz quadrant: where does it live? (a) In this repo at a path such as `/tools/previz-maturity/`, possible since the forms posture was decided in v1.54. (b) `tools.lumenandpixel.com` as issue #13 planned (needs one DNS record from you and a second host). | (a) |
| D15 | Previz quadrant: the tool's repository (`MarurityQuadrant`, issue #13) is not attached to the Dispatcher's session. Grant access so PQ1 can copy it in? | Needed before PQ1 |
| D16 | Previz quadrant: does it ask for an email (optional report, newsletter)? If yes it needs a form, a `form_type` in `INTAKE.md`, and n8n and the legal pages change with it. The result itself stays reachable without an email. | No email in the first version |
| D17 | Languages: which variants? German for Germany, French for France, Spanish for Spain. URL folders `/de/`, `/fr/`, `/es/`; English stays at the root. | As listed |
| D18 | Languages: who checks the translations? (a) A second bot reader per language only. (b) A native speaker you name reads at least home, services and the contact form before each language goes live. | (b) for legal and the contact form, (a) elsewhere |
| D19 | Languages: forms would send `lang` = `de`, `fr`, `es`. n8n and MailerLite must handle them (reply language, sequences), and you answer enquiries in those languages. Ready for that, or should the new languages' forms say replies come in English? | Needs your answer before TR1 |
| D20 | Languages: are Field Notes articles and the legal pages translated too, or only the main pages? | Everything except legal, which waits for #28 and a human check |
| D21 | Discovery: who are the comparable studios to look at, and which markets matter most? Any ideas that are off the table from the start? | Scouts choose 8–10 studios in PT, ES, FR, DE, UK |
