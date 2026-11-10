# Pending

Things waiting on the owner. Section 1: one-time setup. Section 2: things to try by hand after a
release. Section 3: decisions, each with the answer assumed until the owner gives one.

## 1. Setup

- [ ] GitHub → Settings → General → Pull Requests: allow **merge commits** and **squash merging**
      (PARALLEL.md, "What you set up once").
- [ ] Optional: branch rules on `test` and `main` requiring the `checks` job.
- [ ] Issue #14 ("start here") is the old running order; `_docs/ROADMAP.md` replaces it. Close it
      or point it at the roadmap.

## 2. To try by hand

Nothing yet.

## 3. Decisions

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
