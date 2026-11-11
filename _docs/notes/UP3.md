# UP3: Field Notes hub and Resources

## Changelog
#### Changed
- **Field Notes hub (EN and PT):** article titles in the list are now real headings (`<h2>`) and
  look exactly as before, so screen-reader users can jump between articles (QF4).
- **Field Notes filters (EN and PT):** each filter button now says whether it is pressed, and the
  list is announced when it changes, so the "no articles yet" message is read out (#37).
- **Resources (EN and PT):** the "Academy launching soon" button is no longer a link to nowhere.
  It looks the same but can't be clicked or reached with Tab (#40).

#### Removed
- **Resources (EN and PT):** an HTML note to ourselves ("ACADEMY URL: Replace the href…") that was
  visible to anyone reading the page source (#40).

## Roadmap
UP3 · Field Notes hub and Resources: built. Hub titles are `<h2 class="fn-item-title heading">`;
filter buttons carry `aria-pressed`, set by the inline filter script; `#articleList` is
`aria-live="polite"`; the Academy CTA is a `<span>` (UPKEEP_2.md, "UP3").

## Pending: test lines (section 2)
- Field Notes hub, EN and PT, with a screen reader: Tab to the filters, choose "Case Studies";
  it should say "pressed" and read the "Articles are on their way" message.
- Resources, EN and PT: press Tab through the page; the Academy button is skipped and looks as before.

## Pending: new questions (section 3)
- none

## Session prompt
UP3 (`## UP3 · Field Notes hub and Resources` in SESSION_PROMPTS.md: the release worker removes it)
