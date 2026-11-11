# BR5: quiz and resources

## Changelog
#### Changed
- **Quiz and Resources follow the brand system** (EN and PT). Square corners, tokens instead of
  one-off colours and sizes, the shared buttons, eyebrows, tags and cards, and display type at
  the `DESIGN.md` sizes (56 / 40 / 28 px). Headline emphasis is green, no longer italic.
- **Patch and grain.** The quiz sits on the Patch (tone on dark) with sand grain; the Resources
  hero is a full-width Patch band with grain. One Patch per view.
- **Quiz answers are outlined choices, not green buttons.** 1 px border, blue on hover. The
  chosen answer has a green border, a filled letter and a filled square on the right, so it does
  not depend on colour alone. The progress indicator is four square-cornered segments; the
  current one is taller.
- **Resources cards** use the shared card: icon, eyebrow, heading, text, tags, button. Hover is
  a blue border and a 2 px lift, no background change. "Coming soon" is an eyebrow. The Academy
  button is outlined, so each card view has one filled green button.
- **Small text on dark uses `--text-muted`** (Back, Start over, the result note), not gray-500.

#### Fixed
- **The EN and PT quiz no longer drift.** The two `<style>` blocks are byte-identical and the two
  scripts differ only in the translated strings (32 lines, all inside `SERVICES`). The questions,
  scoring, result logic and the `?service=` hand-off are unchanged; the EN script was not touched.

## Roadmap
BR5 built: page recipe applied to `quiz.html`, `resources.html` and their `pt/` mirrors.

## Pending: test lines (section 2)
- Take the quiz to a result in EN and in PT, then press "Start a conversation": the contact form
  should open with the matching service already selected.
- In the quiz, pick an answer and check you can tell which one is chosen without relying on the
  green (filled square on the right, filled letter).
- Open Resources on a phone and a desktop: say if the Patch behind the headline is too strong.

## Pending: new questions (section 3)
- **Quiz Patch covers the whole quiz, not a hero band.** The quiz has no hero (it opens on
  question 1), and D8 rules out adding a headline. Assumed: the quiz area is the "hero", so the
  Patch and grain sit behind all of it; the answer cards are solid, so text on them stays clean.
- **Tags on the Resources cards.** The software and topic pills now use the shared mint `.tag`
  (nine in total). It is the `DESIGN.md` tag, but it adds more green to the cards than before.
  Options: keep, or use an outlined tag variant (would be a new shared class, for BR7).
- **Progress indicator.** Read "square segments" as square-cornered bars across the full width
  (4 px, the current one 8 px), not four small squares. Say if you meant squares.
- **Green buttons (issue #35).** Changed: the Academy "launching soon" button on Resources went
  from a grey filled button to `.btn-secondary`. Nothing else changed colour role: the quiz's
  Next and "See full service detail" stay the one filled green button in their view, and
  "Start a conversation" was already outlined.

## Docs the release worker should update
- Nothing.

## Session prompt
BR5
