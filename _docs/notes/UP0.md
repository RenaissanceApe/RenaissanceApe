# UP0: CI survives an unreachable Ubuntu apt mirror

## Changelog
#### Changed
- **The checks no longer stop when Ubuntu's package mirror is down.** Since 11 November 2026 every
  run on GitHub failed while installing the test browser, because the runner could not reach
  Ubuntu's package mirror to download fonts, before any check ran. The browser now downloads
  without the mirror; the system libraries it needs are installed in a separate step that retries
  three times and, if the mirror is still down, shows a warning and carries on with the libraries
  the runner already has. No check, self-test case or step was removed or softened: if a library
  is really missing, the self-test and the contrast check still fail.

## Roadmap
UP0: CI install robust to apt outages (`.github/workflows/checks.yml`: browser from Playwright's
download host, system libraries as a retried, non-fatal step with a `::warning::`).

## Pending: test lines (section 2)
- Open the Actions tab: the `checks` runs should be green again; a yellow warning on "Install
  Chromium system libraries" means the Ubuntu mirror was down that day and nothing more.

## Pending: new questions (section 3)
- None.

## Session prompt
none (UP0 was dispatched directly, not from `_docs/SESSION_PROMPTS.md`)
