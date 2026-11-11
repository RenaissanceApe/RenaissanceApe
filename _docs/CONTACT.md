# Contact and enquiry path (v1.59)

How a visitor gets from reading to the contact form (CE1–CE3). The form's fields are in
`INTAKE.md`, which this set did not change.

## Every route to the form

All go to the one form on About (`about.html#contact-form`, `pt/about.html#contact-form`).

| From | Link | Service chosen |
|---|---|---|
| Nav and mobile menu, every page | "Get started" | none |
| Footer, every page | "Contact" / "Contacto" | none |
| Services, end of each service section | "Ask about …" / "Pergunte sobre …" (`?service=SD`, `SC`, `SA`, `TD`) | that service |
| Services close, Home banner | "Start a conversation" / "Iniciar uma conversa" (outlined button) | none |
| Quiz result | "Tell us about your project" (`?service=` + the result) | the result |

## Where a link lands

- **Wide screens** (two columns side by side): on the form, as before.
- **Phones and narrow screens (≤ 900 px, stacked):** on the reply promise ("within one business
  day") at the top of the contact section's left column, so **Book a discovery call** is in view
  and the form follows below (D74). With JavaScript, `landOnContact()` in About's page script
  scrolls to `.intro` after load (web fonts reflow the text after the browser's first jump).
  Without it, `scroll-margin-top` on `#contact-form`, set per width band in the page's `<style>`,
  lifts the landing point by the same distance. If the left column's content changes height on a
  phone, re-measure those values in EN and PT.
- Focus moves to the chosen service menu if pre-filled, otherwise to the first visible field.

## `?service=` codes and the allow-list

`SD` Show Design, `SC` Show Control & Automation, `SA` System Architecture, `TD` Technical
Direction. About's script fills the service menu and the hidden `quiz_result` field only for
these four (one `map` object in each of two small functions); any other value leaves both empty,
so the page never writes text into the form that `INTAKE.md` doesn't allow. A new service means a
new code in both maps, in both languages, and an `INTAKE.md` change first.

## Footer links

Services, About, Field Notes, Resources, Contact (PT: Serviços, Sobre, Notas de Campo, Recursos,
Contacto), in `<div class="footer-nav" role="navigation" aria-label="Footer">`. The **markup** is
repeated in all 24 pages (EN and PT; the 404 uses root-relative links); the **styles** are the
"Footer" section of `base.css` (two rows wide, one centred column on a phone, green underline on
hover and keyboard focus). Changing the row means every page, and a `?v=` bump if `base.css`
changes. They are a phone visitor's only navigation without JavaScript.

## Required fields

Name, email and message: `required`, plus `<span aria-hidden="true">(required)</span>` /
`(obrigatório)` in the label; screen readers get it from the attribute (D75).

## Not built

- **CE4**: "Start a conversation" as the filled button on the quiz result. Left as it is (D52).
- **CE5**: optional date, place and audience-size fields, and the quiz mode carried to the form.
  Declined (D53): it needs an `INTAKE.md`, n8n and Notion change; instead the copy review (CR3)
  gives the message field a placeholder that asks for date, venue and size.
