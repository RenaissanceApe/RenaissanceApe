# BR6: Field Notes hub, article template, articles

## Changelog
#### Changed
- **Field Notes hub (EN and PT):** the hero sits on the Patch (tone on dark) with sand grain; the
  headline is the 56 px display size and the intro is the lead style. Each article in the list is
  a square card that lifts 2 px with a blue border on hover. The date is set in the data style.
- **Filter:** square buttons in label type, 44 px tall. The active filter shows a green pixel in
  front of its name as well as a green border, so it is not marked by colour alone. The filter's
  JavaScript is unchanged.
- **Article pages and the article template (EN and PT):** the header is a grained Surface
  Elevation gradient (no Patch behind reading text). Title 40 px, section headings 28 px, body
  Inter 16 px / 1.6, standfirst Inter 300 18 px / 1.6. Dates and reading time are in the data
  style and in `--text-muted`. The pull-quote is now Inter (lead size) on a green rule, not a
  Space Mono paragraph. The call-to-action uses the shared `.btn-primary`.
- **Tags** use the shared `.tag` (one style for Article and Case Study).
- **Tokens only:** every raw colour, every `rgba(255,255,255,…)` and every rounded corner in
  these six pages is gone. Small grey text is `--text-muted` everywhere.
- **The template** carries the same stylesheet as the published article and a comment listing
  every building block (headings, pull-quote, section break, callout, data table, closing note,
  button), so a new article starts from the recipe.

#### Removed
- About 170 lines per page of styles left over from the Resources page (`.resources-hero`,
  `.resource-card` …) that nothing in Field Notes used.

## Roadmap
BR6 built: Field Notes hub, article template and articles follow the page recipe, EN and PT.
How it works: `_docs/BRAND_REFRESH.md`, "The page recipe"; the comment at the top of each page's
`<style>`; the recipe comment in `field-notes/article-template.html`.

## Pending: test lines (section 2)
- Open Field Notes (EN and PT) on a phone and a desktop: the hero shows the Patch pattern, and
  the three filter buttons work; the active one has a green square in front of its name.
- Read the Portugal Events article on a phone, in both languages, and say if the body text and
  the pull-quote read well.
- Tab through an article with the keyboard: each link and the button show a green outline.

## Pending: new questions (section 3)
- **Pull-quote typeface.** It was Space Mono bold (three sentences); DESIGN.md says never a
  paragraph in Space Mono. Options: Inter lead on a green rule (assumed), or shorten the quote to
  two lines and keep Space Mono.
- **Article eyebrow colour.** "Field Note" above the title was grey on purpose (to keep green
  rare); DESIGN.md says eyebrows are green. Assumed: green, via the shared `.eyebrow`.
- **One tag style.** Article and Case Study tags had different colours; the `tag` spec has one.
  Assumed: one style, the word tells them apart.
- **Numbers inside sentences** (for example "500.000 €" in a paragraph) stay in Inter. The data
  style is used for dates, reading time and table values. Option: wrap prose figures too.
- **Two endings.** The published article ends with a green button to cal.com; the template ends
  with a text link to the contact form. Which one should new articles use?

## For the sweep (BR7)
- No shared class for `{typography.data}` or for a label-type control; these pages keep local
  copies (`.fn-item-date`, `.article-date`, `.article-read-time`, `.data`, `.fn-filter`,
  `.fn-back`, the `data-table` rules). Candidates for `base.css`.

## Session prompt
BR6
