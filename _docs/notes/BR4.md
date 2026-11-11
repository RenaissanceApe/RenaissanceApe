# BR4: pages — services, about

## Changelog
#### Changed
- **Services and About follow the brand refresh, in English and Portuguese.** Both heroes sit on
  the Patch (tone on dark) with sand grain. Headlines use the `DESIGN.md` scale (56 / 40 / 28 px,
  stepping down on smaller screens); the emphasised word in a headline is green, never italic.
- **Services tab bar to spec:** a 52 px bar on Jet Black with Space Mono labels, no blur. The
  current tab is brighter and keeps its green underline.
- **Square corners everywhere on both pages:** the round accordion button, the service panels,
  the buttons, inputs and the mobile table cards.
- **Shared classes replace page copies:** eyebrows, cards (phases, "what's included", "two ways to
  engage", values), the story tag, and the buttons ("Find your fit", "Send message", "Book a
  discovery call", Instagram, LinkedIn). Page styles use tokens instead of raw colours.
- **Contact form restyled only** (`DESIGN.md` `form-input`): 44 px fields on Jet Black with a 1 px
  border, a green border and the shared green outline on focus, labels above in Space Mono. No
  field, name, value, consent wording, honeypot or action changed.
- **Small grey text is lighter:** table headers, the story byline, the form note and placeholders
  use `--text-muted` instead of `--text-subtle`, which failed AA on dark.
- **Body text follows the scale:** 16 px / 1.6 for paragraphs, 14 px / 1.55 for cards and tables.

#### Removed
- Unused page CSS on services and about: `@keyframes subOpen`, `.service-img`, `.social-link(s)`,
  an `.error-code` rule, a duplicated block of media queries, and the `!important` heading sizes.
- The hover colour change on the three value cards on About: they are not links.

## Roadmap
Built: BR4, services and about (EN + PT) restyled to `DESIGN.md` with the shared classes from
`base.css`; plan in `_docs/BRAND_REFRESH.md`, "The page recipe".

## Pending: test lines (section 2)
- Services (EN and PT), phone and desktop: scroll the page and check the tab bar stays under the
  nav and the highlighted tab follows the section; open each accordion.
- About (EN and PT): send one test message from the contact form and confirm it arrives in n8n as
  before (only the styling changed).
- About: tab through the form with the keyboard: every field shows a green outline.

## Pending: new questions (section 3)
- About's off-voice copy (issue filed): "my passion", "world-class design project", "something
  great". Options: rewrite to Brand Book §10, or keep. Assumed: keep (D8, visual only).
- About's hidden founder block (issue filed): publish it with a photo, or delete it. Assumed:
  leave hidden.
- "Book a discovery call", Instagram and LinkedIn are now secondary buttons (grey border, white
  text, green on hover). Before, the call button had a green outline and green text. Options:
  keep, or make the call button a text button. Assumed: secondary.
- Card titles inside the services accordions are 19 px (`heading`); before they were 16 px.
  Options: keep 19 px to match the scale, or add a smaller card title to `DESIGN.md`. Assumed: 19.

## Session prompt
BR4
