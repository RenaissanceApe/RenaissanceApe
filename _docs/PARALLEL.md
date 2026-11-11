# Parallel feature sets

How several Claude Code sessions build one **feature set** (a group of ROADMAP steps) at the same
time, and how the owner gets one report and one PR to merge at the end. The usual way, one session
per change that the owner watches, still works and is unchanged (CLAUDE.md, "A session, start to
finish").

Decided 2026-11-10: work is chopped into steps, workers merge into `test`, and only the whole set,
with every check passed, goes to `main`.

## Who does what

| Role | What it does | What it never does |
|---|---|---|
| **You** (the owner) | Answer the set's questions once at the start, look at the preview, merge `test` → `main` | — |
| **Dispatcher** (one cloud session) | Plans the set with you, asks your questions in one go, starts one worker session per step, watches their PRs, sends failures back to the worker responsible, merges green worker PRs into `test`, opens the `test` → `main` PR with the summary, tells you | Edit pages, styles or scripts; merge into `main` |
| **Worker** (one cloud session per step) | Builds its step from its prompt, opens a PR into `test`, writes its report, fixes what the Dispatcher sends back | Touch another worker's files; edit the shared files listed below |
| **Release worker** (one short session at the end of a set) | Folds the workers' notes into CHANGELOG, ROADMAP, PENDING and SESSION_PROMPTS | Pages, styles or scripts |

## Branches

```
main  ← merge commit (you) ←  test  ← squash (Dispatcher) ←  one branch per worker
```

- `main` is the live site. Nothing reaches it except the one `test` → `main` PR per set (and solo
  PRs outside a set).
- `test` collects one feature set. It is **not published anywhere**: GitHub Pages serves `main`
  only. At the start of each set the Dispatcher moves `test` to match `main` (only when `test` has
  nothing that `main` lacks).
- Workers branch from `origin/test` and open their PR **into `test`**. Never into another worker's
  branch.
- `test` → `main` is merged with a **merge commit**, not a squash, so the two stay in line and
  `test` can simply be moved forward for the next set. Worker PRs into `test` are squashed.
- CI runs on every push and every PR, whatever the branch, so each worker PR and the final PR are
  checked.
- **While a set is open, avoid solo PRs into `main`** that touch pages or shared files. If one is
  needed (something live is broken), the Dispatcher merges `main` into `test` right after.

## Worker rules

What a worker does differently from a solo session. Everything else in CLAUDE.md still applies.

1. **Branch from `origin/test` and open the PR into `test`.**
2. **Don't wait for answers.** Your questions were answered before you started; the answers are in
   the message that started you. If a new question comes up, take the safest reading, write it
   under *Needs your decision* in the PR, and carry on. If you truly can't continue, message the
   Dispatcher (its session id is in your first message) and stop.
3. **Stay in your files.** The first message lists what you own, and the other workers and what
   they own. If you must change something another worker owns, message the Dispatcher first.
4. **Shared styles and markup have one owner per set.** `base.css`, `site.css`, `site.js`,
   `fonts.css` and the nav, mobile-menu and footer markup repeated in every page belong to the
   worker the first message names for them. If a page needs a shared rule that doesn't exist, keep
   it in that page's `<style>` and list it under *Found, not changed* for the sweep step.
5. **Don't edit the shared docs:** `CHANGELOG.md`, `_docs/ROADMAP.md`, `_docs/PENDING.md`,
   `_docs/SESSION_PROMPTS.md`. Write what you would have added in **`_docs/notes/<step>.md`**
   (format below). The release worker folds the notes in.
6. **EN and PT in the same PR**, always.
7. **Before the PR:** `npm run check` green, and the browser check from CLAUDE.md ("A page or
   feature is done only when") on every page you changed. Say in *Tests run* what you looked at.
8. **Report** in the PR description, using every section of the PR template, and file an issue for
   each *should fix* or *urgent* finding (see "Reports").
9. **When done**, message the Dispatcher: `Done: <step>, PR #<n>`. Then stay available: the
   Dispatcher may send fixes back. Fix them on the same branch and push.
10. If your PR can't be merged because `test` moved on, merge `origin/test` into your branch,
    resolve the conflicts, run `npm run check` and push.

## Reports

Nothing a worker found may live only in its chat, because the owner may never open that session.

**1. Each worker's PR description** uses `.github/pull_request_template.md`: *Changed*, *Found,
not changed* (each with where, why it matters and a severity: **urgent**, **should fix**, **nice
to have**), *Needs your decision*, *Tests run*, *For the owner*.

**2. GitHub issues** for every *should fix* or *urgent* finding: one issue each, a link back to
the PR and step, labelled `ready-for-agent` or `needs-ricardo` plus `P1-next` (*should fix*) or
`P0-now` (*urgent*). List the open issues first so the same finding isn't filed twice. *Nice to
have* stays in the PR only.

**3. Urgent findings don't wait.** The live site broken, a form not delivering, a privacy problem:
the worker messages the Dispatcher at once, and the Dispatcher tells the owner at once.

**4. The Dispatcher's summary** sits at the top of the `test` → `main` PR, in this order:

1. **Needs your action before merging:** decisions, anything n8n, MailerLite or the legal pages
   must change with, anything urgent
2. **Needs your decision:** from all workers, each with what the worker assumed meanwhile
3. **What changed:** one line per step, linking to its PR
4. **New findings:** the issues filed, grouped by severity
5. **Tests:** each worker's result, the full run on `test`, and the preview

## Notes file (`_docs/notes/<step>.md`)

```md
# <step>: <title>

## Changelog
<the lines you would have added under #### Added / #### Changed / #### Removed>

## Roadmap
<the "Built" row: what, how it works (doc link)>

## Pending: test lines (section 2)
- <one line per thing the owner should try by hand>

## Pending: new questions (section 3)
- <question, the options, what you assumed>

## Session prompt
<the prompt section this session carried out, e.g. "BR3", or "none">
```

## The Dispatcher's cycle

1. **Start or resume.** Read `_docs/ROADMAP.md` and the open PRs. Find the next set. If a set is
   half done (a tracking issue is open), pick up from it.
2. **Prepare.** Make sure `test` matches `main` (create it from `main` if it doesn't exist); if
   `test` has commits `main` lacks, stop and tell the owner. Open a **tracking issue** "Feature
   set: <name>" (label `meta`) listing the steps, and later each worker's session and PR. This is
   where the set's progress lives, so a new Dispatcher can carry on.
3. **Ask once.** Read the set's plan doc, its prompts in `_docs/SESSION_PROMPTS.md` and
   `_docs/PENDING.md` section 3. Gather every open question and ask the owner in one message,
   together with the steps that will run at the same time. Wait for the answers, and record them
   in the tracking issue.
4. **Dispatch.** Start one worker session per step that can run now (no more than 4). The first
   message is:

   ```
   You are a worker in the feature set "<set>", started by the Dispatcher (session <id>).
   Follow CLAUDE.md, "In a parallel feature set", and _docs/PARALLEL.md, "Worker rules".
   Base branch: test.
   You own: <files>.
   Other workers and what they own: <step: files, …>.
   The owner's answers to your step's questions: <answers>.
   Your prompt:
   <the prompt section, as it is>
   ```

5. **Watch.** Subscribe to each worker's PR when it opens. On a red check, send the worker the
   failing check's name and the first lines of its output, nothing more. On an urgent finding,
   tell the owner at once. As a fallback, check each worker every hour.
6. **Integrate.** Merge each green worker PR into `test` (squash), one at a time. **Never merge a
   red one.** If the next one now conflicts, ask its worker to merge `origin/test` and push. When
   a line of the set is merged, dispatch the next line.
7. **Release.** When every step is in `test`, start a release worker from `test`:
   *"Fold every file in `_docs/notes/` (except README.md) into CHANGELOG.md (one section for this
   version, a heading per step), `_docs/ROADMAP.md`, `_docs/PENDING.md` sections 2 and 3, and
   `_docs/SESSION_PROMPTS.md` (remove the prompts carried out, update the 'built' line). Delete
   the notes files. If the set changed `base.css`, `site.css`, `site.js` or `fonts.css`, set
   `?v=` on those four URLs to this version on every page. Run `npm run check`. Open the PR into
   `test`."* Merge it when green.
8. **Verify the whole set on `test`.** `npm run check` and `node selftest.mjs` on `test` itself.
   Then the **preview**: screenshots of every page from `test` at 375 px and 1440 px, in EN and
   PT, beside the same page from `main`, published as a private page and sent to the owner. This
   stands in for a staging site, which the repo does not have.
9. **Promote.** Open the PR `test` → `main` with the summary above. When its checks are green,
   tell the owner it's ready and send the preview link.
10. **Next.** When the owner has merged it (merge commit), load the live site once to see the
    change arrived (request pages only, or add a throwaway query string to static files, so a
    cached copy doesn't hide the new one), close the tracking issue and the issues the set fixed, move `test` to `main`,
    and go back to 1.

If the Dispatcher's conversation gets long, start a new one with the prompt below: everything it
needs is in GitHub (tracking issue, PRs, issues).

## What you set up once

- GitHub → Settings → General → Pull Requests: allow **merge commits** (needed for `test` →
  `main`) and squash merging (for worker PRs).
- Optional: a branch rule on `test` and on `main` requiring the `checks` job to pass.
- The Claude app's notifications on, so the Dispatcher's messages reach your phone.

## The Dispatcher prompt

Paste this into a new Claude Code session on this repository:

```
You are the Dispatcher for the Lumen and Pixel website. Read _docs/PARALLEL.md and follow "The
Dispatcher's cycle". You don't edit pages, styles or scripts: you plan, start worker sessions,
watch their PRs, merge green worker PRs into test, and open the test → main PR. Never merge into
main. Start with the next feature set (or the one I name here: <optional>).
```
