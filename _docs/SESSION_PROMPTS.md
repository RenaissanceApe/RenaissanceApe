# Session prompts

One prompt per step still to run, in [ROADMAP.md](ROADMAP.md) order. A Dispatcher session runs a
feature set's steps in parallel, one worker session each ([PARALLEL.md](PARALLEL.md)); a step can
also be built alone by pasting its prompt into a new session on this repository.

**When a step's plan changes**, edit its prompt here and its plan in the doc it names, in the same
commit. **Once a prompt has been used, its section is removed**, so this file only holds prompts
still to run.

Built: BR1–BR7 (brand refresh, v1.56); DS1–DS3 (discovery run 1, v1.57). To run: UP1–UP4
(Upkeep 2). The proposed sets (Contact and enquiry path, Proof of work, Working with us) get
their prompts when the owner picks them.

---

## UP1 · Quiz and About scripts

```
Build ROADMAP step UP1. Read _docs/UPKEEP_2.md ("Names every step relies on", "Rules for every
step", "UP1").

In quiz.html and about.html, EN and PT: add the quiz's <noscript> line (QF2), a space before each
<br> in the result names (QF6), accept only SD/SC/SA/TD from ?service= in both pre-fill
functions (QF3), and turn About's three control-less <label>s into text (QF5). Put the new
<noscript> wording in a before/after table in the PR for the owner's yes.

Do only this step. Don't touch the form's fields, names or consent text, or any other page.
```

## UP2 · 404, confirmation pages, Legal, Services

```
Build ROADMAP step UP2. Read _docs/UPKEEP_2.md ("Names every step relies on", "Rules for every
step", "UP2").

Make every path on 404.html and pt/404.html root-absolute (QF1); add the skip link and
id="main-content" to thank-you and check-your-inbox, put Legal's tab bar in a <nav> landmark, and
fix the image paths on services (QF5), EN and PT. Nothing may look different.

Do only this step. Don't touch other pages, shared files, or the <head> shared-file URLs (UP4).
```

## UP3 · Field Notes hub and Resources

```
Build ROADMAP step UP3. Read _docs/UPKEEP_2.md ("Names every step relies on", "Rules for every
step", "UP3") and issues #37 and #40.

On the Field Notes hub, EN and PT: article titles as <h2> with the same look (QF4), aria-pressed
on the filter buttons and aria-live on the list (#37). On Resources, EN and PT: the Academy button
becomes a non-focusable <span> and the HTML comment above it goes (#40).

Do only this step. Don't change the empty-filter message (#38, D44) or any other page.
```

## UP4 · Head tags, caching, robots, link-preview images

```
Build ROADMAP step UP4, after UP1–UP3 are merged into test. Read _docs/UPKEEP_2.md ("Names every
step relies on", "Rules for every step", "UP4"), issue #51 and _docs/PENDING.md D25, D61 and D68.

On every page, EN and PT: ?v=1.58 on the four shared-file URLs, and html-structure failing when a
page's version is missing or differs, with a selftest case (#51); og:locale and its alternate,
og:image:alt, the PT home og:url, and the OG cards as JPEG from _tools/og.mjs (QF7); the
Organisation data on pt/index.html without a city (QF8); robots.txt without Disallow (QF9). Add
the version bump to CLAUDE.md, README.md and _docs/PARALLEL.md. Put the og:image:alt wording in
the PR for the owner's yes.

Do only this step. Change only <head> blocks in pages, and delete no image (D68).
```
