# CE2: A footer that navigates

## Changelog
#### Added
- **Footer, every page (EN and PT):** a row of page links: Services, About, Field Notes,
  Resources, Contact (PT: Serviços, Sobre, Notas de Campo, Recursos, Contacto). "Contact" opens
  the contact form on About. Resources now has a link from every page; until now nothing linked
  to it. A phone visitor with JavaScript off, whose menu can't open, can now reach every main
  page from the footer.
#### Changed
- **Footer layout:** two rows on a wide screen (the name and the page links, then Instagram,
  LinkedIn, Privacy, Terms, Cookies and the copyright); one centred column on a phone. Every
  footer link shows the green underline on keyboard focus as well as on hover.
- `base.css` changed, so every page now loads the four shared files with `?v=1.59`.

## Roadmap
CE2 built: a page-link row (Services, About, Field Notes, Resources, Contact) in the footer
markup of all 24 pages, EN + PT, laid out by the footer rules in `base.css`. The footer was
already on `--surface`, body-sm, `--text-muted`; the new row reuses those link styles.

## Pending: test lines (section 2)
- Any page, EN and PT, at the bottom: click each footer link (Services, About, Field Notes,
  Resources, Contact / Contacto). Contact opens About at the contact form.
- On a phone with JavaScript off (or the browser's "disable JavaScript"): scroll to the
  footer; the five page links are there and work.
- 404 page (EN and PT, e.g. `/nope` and `/pt/nope`): the footer links go to the right pages.

## Pending: new questions (section 3)
- PT label for Contact: "Contacto" (pt-PT spelling). Assumed; the owner's yes is asked in the PR.
- The footer row has no link to "Find your fit" (the quiz) or "Get started": the brief named
  five links, and Contact already covers the form. Assumed: keep it to the five.

## Session prompt
none (CE2 has no section in `_docs/SESSION_PROMPTS.md`)
