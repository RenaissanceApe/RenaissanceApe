# BR7: sweep — the brand check, shared rules moved into base.css, docs up to date

## Changelog
#### Added
- **A seventh check, `brand`** (`_tools/checks/brand.mjs`), run by `npm run check` and in CI. It
  reads `base.css`, `site.css`, `fonts.css`, every page's `<style>` and every `style="…"`
  attribute, and fails on: a corner that is not `0` or `var(--radius)`; a `box-shadow`,
  `text-shadow` or `drop-shadow()`; `blur()` or `backdrop-filter`; a typeface that is not
  `var(--font-display)` or `var(--font-body)` (or `inherit`), including the `font` shorthand and
  a third `@font-face` family; and a raw colour (hex, `rgb()`, `hsl()`, a named colour) anywhere
  but the `:root` block of `base.css`. It does not read inline `<svg>` icons, the files in
  `images/`, or anything inside `url(…)` (D5).
- **22 self-tests for it** in `_tools/selftest.mjs`, one per defect, with a clean site that holds
  everything the check must let through (31 self-tests in all).
- **Shared classes in `base.css`:** `.label` (label type without a colour), `.data` (dates,
  numbers, codes), `.data-table`, `.page-hero` / `.page-hero-inner` (one hero padding),
  `.card-hover` (the lift for a card that is not a link), `.btn-text-back` (text button with a
  leading arrow), `.form-input` and the form rules, `.nav-home`, headline emphasis
  (`main h1 em`, `main h2 em`) and eyebrow spacing (`main .eyebrow`).

#### Changed
- **The rules pages kept in their own `<style>` now live in `base.css`,** and the page copies are
  deleted, EN and PT: the contact form and the newsletter field, label type on tabs, filters,
  accordion labels, captions and back links, the data style on dates, the table, the Resources
  card hover, the quiz Back button, the short nav's "Back to home".
- **Every hero band has the same padding** (96 px under the bar and 96 px below; 64 / 64 px and
  24 px sides under 900 px): About, Services, Resources, Field Notes hub, Legal. Legal and the
  Field Notes hub got 32 px more below the hero on desktop; Resources, Legal and the hub changed
  by 16–32 px on phones and tablets.
- **`base.css`:** the one shadow (the underline of the active language in the mobile menu) is
  now drawn as a background, so the file has no `box-shadow`.
- **Field Notes article template:** the second `og:type` tag (`website`) is removed; `article`
  stays. The template's recipe comment now says tables use `class="data-table"`.
- **`README.md`:** Inter instead of Nunito, seven checks, the `brand` row, `CHROMIUM_PATH`, and
  the three generator scripts (`patch.mjs`, `grain.mjs`, `og.mjs`).
- **`CLAUDE.md`:** seven checks, `brand` in the check names and in "Rules the checks enforce";
  the gap table keeps only Layout (Rail Grid) and `ICONS.md`.

## Roadmap
BR7 built: the `brand` check is in CI, shared rules moved from pages into `base.css`, docs up to
date. How it works: the comment at the top of `_tools/checks/brand.mjs`; the comment at the top
of `base.css`; README, "Checking your work".

## Pending: test lines (section 2)
- Open Legal, Field Notes and Resources on a phone and a desktop: the space under the hero is a
  little larger than before and matches About and Services.
- On the home page, move the mouse over the newsletter email field: its border turns light blue,
  like the contact form's fields.
- In the quiz, on question 2, hover "Back": the arrow slides slightly to the left.
- Send one test message from the About contact form and one newsletter sign-up: the forms were
  not changed, only where their styles live.

## Pending: new questions (section 3)
- **Hero spacing.** All hero bands now use About and Services' spacing (96 px below). Legal and
  the Field Notes hub had 64 px below. Options: keep 96 everywhere (assumed), or 64 everywhere.
- **Colour rule in the `brand` check.** Stricter than first described: a raw colour fails in a
  page even when it equals a token value (the message names the token), and there is no
  allowance for `rgb()` with alpha in `base.css`, because nothing uses one today. Options: keep
  it strict (assumed), or allow alpha forms of token colours in `base.css`.
- **Tab bars.** Services and Legal each style their own tab bar, and they differ (hover and
  active colour is white on Services, green on Legal). Options: leave (assumed), or one shared
  tab bar.
