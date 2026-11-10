# Session prompts

One prompt per step still to run, in [ROADMAP.md](ROADMAP.md) order. A Dispatcher session runs a
feature set's steps in parallel, one worker session each ([PARALLEL.md](PARALLEL.md)); a step can
also be built alone by pasting its prompt into a new session on this repository.

**When a step's plan changes**, edit its prompt here and its plan in the doc it names, in the same
commit. **Once a prompt has been used, its section is removed**, so this file only holds prompts
still to run.

Built: nothing yet. To run: BR1–BR7 (brand refresh).

---

## BR1 · Foundations

```
Build ROADMAP step BR1. Read _docs/BRAND_REFRESH.md ("Names every step relies on", "Rules for
every step", "BR1") and _docs/PENDING.md D2 and D9. Grep DESIGN.md for the tokens, typography,
navigation, buttons, forms and motion sections.

Replace Nunito with self-hosted Inter, add the semantic, spacing, radius and motion tokens and the
shared classes to base.css, bring nav, mobile menu and footer to spec in base.css and in every
page's markup (EN and PT), and fix all nine contrast findings so `npm run check` ends green.

Do only this step. Don't restyle page content: that is BR3–BR6.
```

## BR2 · Brand assets

```
Build ROADMAP step BR2. Read _docs/BRAND_REFRESH.md ("Names every step relies on", "BR2") and
_docs/PENDING.md D4. Grep DESIGN.md for "Patch", "Pixel Field", "Sand grain", "og-image" and
"Brand Assets".

Add _tools/patch.mjs and generate the Patch, Pixel Field and grain tiles and the OG images at the
exact paths the plan fixes. Check the logo and icon files against the pixel-colour rule and report.

Do only this step. Change no page and no stylesheet.
```

## BR3 · Pages: home, legal, 404, thank-you, check-your-inbox

```
Build ROADMAP step BR3. Read _docs/BRAND_REFRESH.md ("Rules for every step", "The page recipe")
and _docs/PENDING.md D6. Read the comment at the top of base.css for the shared classes.

Apply the page recipe to index, legal, 404, thank-you and check-your-inbox, EN and PT.

Do only this step. Don't touch other pages, shared files, or nav/menu/footer markup.
```

## BR4 · Pages: services, about

```
Build ROADMAP step BR4. Read _docs/BRAND_REFRESH.md ("Rules for every step", "The page recipe")
and _docs/PENDING.md D6. Read the comment at the top of base.css for the shared classes.

Apply the page recipe to services and about, EN and PT. The contact form on about is restyled
only: its fields, names and consent wording must not change (INTAKE.md).

Do only this step. Don't touch other pages, shared files, or nav/menu/footer markup.
```

## BR5 · Pages: quiz, resources

```
Build ROADMAP step BR5. Read _docs/BRAND_REFRESH.md ("Rules for every step", "The page recipe")
and _docs/PENDING.md D6. Read the comment at the top of base.css for the shared classes.

Apply the page recipe to quiz and resources, EN and PT. The quiz's logic and its ?service=
hand-off must not change; keep the EN and PT quiz CSS and JavaScript identical in structure.

Do only this step. Don't touch other pages, shared files, or nav/menu/footer markup.
```

## BR6 · Pages: Field Notes

```
Build ROADMAP step BR6. Read _docs/BRAND_REFRESH.md ("Rules for every step", "The page recipe")
and _docs/PENDING.md D6. Read the comment at the top of base.css for the shared classes.

Apply the page recipe to field-notes/ (hub, article template, articles) and pt/field-notes/. Long
reading text follows the DESIGN.md body and lead styles. Leave the redirect stubs alone.

Do only this step. Don't touch other pages, shared files, or nav/menu/footer markup.
```

## BR7 · Sweep

```
Build ROADMAP step BR7. Read _docs/BRAND_REFRESH.md ("BR7") and the "Found, not changed" sections
of the BR3–BR6 pull requests.

Add the `brand` check with its selftest fixture, move the shared rules pages kept inline into
base.css, fix what the new check finds, and bring CLAUDE.md's gap table and README up to date.

Do only this step.
```
