# UP2: 404, confirmation pages, Legal, Services

## Changelog
#### Changed
- **The 404 page works from any folder.** GitHub Pages shows the root `404.html` for every missing
  address, including ones inside a folder (`/field-notes/nope`, `/pt/nope`). Its logo, menu, buttons,
  language switcher and footer links were relative, so from inside a folder they pointed at pages
  that don't exist. They now all start at the site root (`/index.html`, `/images/…`; in Portuguese
  `/pt/…`). The icons and manifest in its `<head>` are left for UP4. EN and PT.
- **Skip link on the two confirmation pages.** "Thank you" and "Check your inbox" now carry the same
  "Skip to main content" link (PT: "Saltar para o conteúdo principal") as every other page, and
  their main area has `id="main-content"`. EN and PT.
- **Legal's tab bar is a navigation landmark.** The Privacy / Terms / Cookies / Disclaimer bar is now
  a `<nav>` named "Legal sections" (PT: "Secções legais") for screen readers. It looks and behaves
  exactly as before. EN and PT.
- **Services image paths fixed.** The four service backgrounds and icons pointed one folder too high
  (`../images/` in EN, `../../images/` in PT). They worked only because browsers ignore a step above
  the site root. Path fix only. EN and PT.

## Roadmap
UP2 built: 404 paths root-absolute (QF1); skip link and `main-content` on thank-you and
check-your-inbox, Legal's tab bar in a `<nav>` landmark, Services image paths (QF5, rest). EN + PT.
Plan: [UPKEEP_2.md](../UPKEEP_2.md), "UP2".

## Pending: test lines (section 2)
- After v1.58 is live, open `https://www.lumenandpixel.com/field-notes/nope` and
  `https://www.lumenandpixel.com/pt/nope`: the 404 shows with its logo, and every menu, button and
  footer link opens the right page.
- On "Thank you" (after sending the contact form) press Tab once: a "Skip to main content" link
  appears at the top; Enter moves to the message.

## Pending: new questions (section 3)
- None.

## Session prompt
UP2 (the `## UP2 · 404, confirmation pages, Legal, Services` section of `_docs/SESSION_PROMPTS.md`;
remove it at release).
