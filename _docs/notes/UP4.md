# UP4: head tags, caching, robots, link-preview images

## Changelog
#### Changed
- **A release now reaches visitors straight away.** Every page asks for its four shared files with
  the release version (`/base.css?v=1.58`, and the same for `site.css`, `site.js`, `fonts.css`), so
  a browser that cached the previous stylesheet fetches the new one instead of using the old one for
  up to four hours. The `html-structure` check fails if a page's version is missing or differs from
  the others, and a self-test proves it. From now on, a release that changes one of those files
  sets `?v=` to its own version on every page (CLAUDE.md, README, PARALLEL.md). EN and PT. (#51)
- **Link previews are lighter and better described.** The three preview cards (the site card and
  the two Portugal Events cards) are now JPEG, about 172 KB each instead of about 795 KB: the same
  picture. Every page names its language for link previews (`og:locale` `en_GB` / `pt_PT`, with the
  other as the alternate), and describes its card for people using screen readers (`og:image:alt`,
  which said only "Lumen and Pixel"). The Portuguese home's preview address is now `/pt/`, matching
  its canonical. The old PNG cards stay in `images/` until the owner decides (D68). EN and PT.
- **Search engines see the studio from the Portuguese home too.** The organisation data on the
  English home (name, logo, founder, country, email, social profiles) is now also on the
  Portuguese home, with the Portuguese description. No city yet (D61).
- **robots.txt no longer blocks the old addresses.** The two `Disallow` lines (`/articles/`,
  `/pt/field-notes.html`) are gone, so search engines can read those redirect pages and follow
  them to the current ones.
- **404 icons from any folder.** The 404 page's icons and manifest (in its `<head>`) start at the
  site root too, finishing what UP2 began. EN and PT.

## Roadmap
UP4 built: `?v=1.58` on the shared-file URLs and the `html-structure` version check with a
self-test (#51); `og:locale` and alternate, `og:image:alt`, PT home `og:url`, JPEG cards (QF7);
Organisation data on the PT home without a city (QF8); robots.txt without `Disallow` (QF9); 404
head paths root-absolute (QF1, rest). Plan: [UPKEEP_2.md](../UPKEEP_2.md), "UP4".

## Pending: test lines (section 2)
- After v1.58 is live, open any page with DevTools → Network: `base.css`, `site.css`, `site.js`
  and `fonts.css` are requested with `?v=1.58` and return 200.
- After v1.58 is live, paste `https://www.lumenandpixel.com/` and
  `https://www.lumenandpixel.com/field-notes/portugal-events.html` into a LinkedIn or WhatsApp
  message: the preview still shows the card.

## Pending: new questions (section 3)
- None new. D68 (delete the three old PNG cards) still open; D61 (city in the structured data)
  still open.

## Session prompt
UP4 (the `## UP4 · Head tags, caching, robots, link-preview images` section of `_docs/SESSION_PROMPTS.md`; remove it at release).
