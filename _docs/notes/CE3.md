# CE3: Contact section on a phone: land above the form; mark required fields

## Changelog
#### Changed
- **About, contact section on a phone:** every link to the form (`#contact-form`: the nav's
  "Get started", the quiz result, the Services and home links) now lands on the reply promise
  ("within one business day") with **Book a discovery call** below it and the form after that,
  instead of skipping straight past both to the name field. With and without JavaScript, EN and
  PT. On wider screens, where the two columns sit side by side, nothing changes.
- **About, contact form:** name, email and message are marked "(required)" / "(obrigatório)" in
  their labels, so a visitor knows before sending. No field, name or wording of the form changed
  otherwise.
- **About, keyboard focus:** following "Get started" on the About page itself now moves focus to
  the form (it stayed on the link before), and arriving from another page focuses the first field
  (it tried a hidden field before and the form kept the focus).

## Roadmap
CE3 built: arrivals at `#contact-form` on a stacked (≤ 900 px) About page land on `.intro` in the
contact section: the page script scrolls there after load; without JavaScript, `scroll-margin-top`
on `#contact-form` (measured per width band, in each page's `<style>`) lifts the landing point the
same distance. Required fields carry a visible "(required)" in the label (`aria-hidden`, since the
`required` attribute already tells screen readers).

## Pending: test lines (section 2)
- On a phone, tap ☰ → Get started on any page: you should see "…within one business day" at the
  top and "Book a discovery call" below it; scroll a little for the form. Same on `pt/`.
- Finish the quiz and follow "Tell us about your project": same landing, with the service already
  chosen in the form.
- Look at the form labels: name, email and message say "(required)" / "(obrigatório)".

## Pending: new questions (section 3)
- **Where a phone lands:** the brief said "the top of the contact section". On a 375 px phone the
  section from its top to the booking button is 770 px, taller than the screen, so landing at the
  top would hide the booking button. I landed on the reply promise instead (the "Get in touch"
  eyebrow and "Let's make something great." heading are just above, out of view). Options: keep
  this; or land at the top of the section and tighten the phone spacing of the contact details so
  the booking button still fits (a visual change). Assumed: keep this.
- **Words in the labels:** "(required)" / "(obrigatório)" in the label type (uppercase). Owner's
  yes needed (D13: no other copy changes without it).

## Session prompt
none (CE3 was dispatched from the "Contact and enquiry path" set, issue #70)
