# CE1: Contact links on Services and Home

## Changelog
#### Added
- **Services:** each of the four service sections ends with a link to the contact form with that
  service already chosen ("Ask about Show Design", "Ask about Show Control", "Ask about System
  Architecture", "Ask about Technical Direction"), right after "Two ways to engage".
- **Services close ("Work with us"):** a second button, "Start a conversation", beside "Find your
  fit". It goes to the contact form on About.
- **Home:** the "One partner. Every system. Exactly right." banner now has a "Start a conversation"
  button to the contact form.
- All in Portuguese too. The new buttons are outlined or text links; the page keeps its one green
  button.

## Roadmap
CE1 built: contact links in each Services section and at the Services close, and a button in the
Home banner (`services.html`, `index.html`, EN + PT). They reuse the existing
`about.html?service=SD|SC|SA|TD#contact-form` pre-fill; no form or script change.

## Pending: test lines (section 2)
- Services (EN and PT): click each "Ask about …" / "Pergunte sobre …" link. About opens at the
  form with that service chosen in the "Service" menu.
- Services close and Home banner: "Start a conversation" / "Iniciar uma conversa" opens About at
  the form with no service chosen.

## Pending: new questions (section 3)
- D49 follow-up: the PT close/banner label is "Iniciar uma conversa", the label the PT quiz result
  already uses for the same link, instead of the suggested "Vamos conversar". Keep it, or switch
  both? Assumed: keep, so the site uses one label for one action.

## Session prompt
none (CE1 has no section in `_docs/SESSION_PROMPTS.md`)
