# BR3: core pages

## Changelog
#### Changed
- **Home hero rebuilt as Signal Glow + sand grain** (#32). The hero no longer uses the link-preview
  card `images/og-image.png` as its background (the stretched logo and headline behind the real
  headline are gone); it is now a blue-700 field with a green radial glow at 42% and grain, drawn
  in CSS. The `og:image` tags are unchanged.
- **Home, Legal, 404, Thank you and Check your inbox follow the page recipe**, EN and PT: tokens
  instead of raw colours, square corners, the shared button / eyebrow / card classes, and display
  type on the `DESIGN.md` scale (56 / 40 / 28 px, 19 px card headings).
- **Home hero buttons:** "Find your fit" is the one filled green button, "Explore services" is
  secondary. "Read more" links on the service cards use the shared text button.
- **Home service cards show their gradients again.** A CSS ordering slip had been hiding the four
  service gradients (the cards rendered flat black); they are back, under grain and a navy veil
  that keeps the text readable.
- **Home newsletter field** follows the `form-input` spec (44 px, surface background, green border
  on focus). The form itself (fields, names, consent wording, honeypot, endpoint) is unchanged.
- **404, Thank you, Check your inbox:** Pixel Field ground with grain. On 404 the old grid lines
  and the green glow behind the number are gone, and "Contact us" is an outlined secondary button.
- **Legal:** the section tab bar is a solid 52 px bar on `--surface` (no blur) with Space Mono
  labels; no decoration, as decided.

#### Fixed
- **Thank you and Check your inbox use the shared navigation bar** (#34). Their own copy of the
  nav CSS (old blur, raw colours) is removed.

#### Removed
- Page copies of `.btn-primary` / `.btn-secondary` (404) and `.eyebrow` / `.card` (Thank you,
  Check your inbox), the hero zoom animation, hover zoom on the service cards, and the
  `!important` heading-size overrides on Home and 404.

## Roadmap
BR3 built: page recipe applied to `index`, `legal`, `404`, `thank-you`, `check-your-inbox` (EN and
PT); home hero is Signal Glow + grain (#32); confirmation pages use the shared nav (#34).

## Pending: test lines (section 2)
- Open the home page on a phone and a desktop (EN and PT): the hero should be a dark blue field
  with a soft green glow top right, no logo or second headline behind the text.
- On the home page, look at the four service cards: each should show its green/blue gradient.
- Subscribe to the newsletter from the home page with a test address: you should land on
  "Check your inbox" and the page should have the same top bar as the rest of the site.
- Open a wrong address (for example `/nope.html`): the 404 page should show a dotted ground, one
  green button and one outlined button.

## Pending: new questions (section 3)
- **Home hero buttons (issue #35).** "Find your fit" became the filled green button and "Explore
  services" the outlined one (before, both were outlined). Swap them if services should lead.
- **Service gradients.** They were hidden on the live site by a CSS slip and are visible again.
  Say so if the flat dark cards were preferred.
- **Newsletter field text size.** `DESIGN.md` sets inputs at 14 px; iPhones zoom the page when a
  field under 16 px is focused. Assumed: follow `DESIGN.md`. Option: 16 px on phones.
- **Green marquee strip on the home page.** A full-width green band that loops; it is more green
  than the "about 5% of a surface" rule. Left as it is.

## Docs the release worker should update
- None.

## Session prompt
BR3
