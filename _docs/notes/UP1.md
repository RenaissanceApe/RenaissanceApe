# UP1: Quiz and About scripts

## Changelog
#### Added
- **Fit finder without JavaScript:** the quiz now says it needs JavaScript and offers two ways on: the four services, or the contact form (EN and PT). (QF2)
#### Changed
- **Result heading reads as two words:** screen readers now hear "Technical Direction", not "TechnicalDirection", on all four quiz results in both languages. Looks the same. (QF6)
- **Contact form pre-fill accepts only the four quiz codes:** `about.html?service=` fills the service menu and the hidden `quiz_result` only for `SD`, `SC`, `SA` or `TD`. Anything else leaves both empty, so the page no longer writes text into the form that `INTAKE.md` doesn't allow. (QF3)
- **About's contact details:** "Based in", "Response time" and "Works with clients" are now plain text instead of form labels with no field. Looks the same. (QF5, About part)

## Roadmap
UP1 built: quiz `<noscript>` line, result-name spaces, `?service=` allow-list in both pre-fill functions, About's three labels as text, EN + PT ([UPKEEP_2.md](UPKEEP_2.md), "UP1").

## Pending: test lines (section 2)
- Quiz with JavaScript off (EN and PT): the line "The fit finder needs JavaScript." / "O questionário precisa de JavaScript." shows under question 1, and both buttons open Services and the contact form.
- `about.html?service=TD#contact-form` (EN and PT): Technical Direction is selected. `about.html?service=XX#contact-form`: the menu stays on "Select a service…".

## Pending: new questions (section 3)
- Without JavaScript, question 1 still shows above the new line with buttons that do nothing. Options: leave it (assumed), or hide the questions when JavaScript is off (a small look change for the copy review or a later upkeep).

## Session prompt
UP1
