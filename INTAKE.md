# Intake contract

The site's only cross-system contract: what its forms send to n8n, and what
they expect back. If a form changes, this file changes in the same PR.

## Endpoint

```
POST https://lumenandpixel.app.n8n.cloud/webhook/inbound-lead
Content-Type: application/x-www-form-urlencoded
```

- Every form on the site posts here. `form_type` tells them apart.
- Submission is a **native HTML form POST**. No JavaScript sends anything.
- The browser enforces `required` fields and `type="email"` before posting.
- The endpoint is public by design (see *Posture* below).

## Forms

| `form_type` | Pages |
|---|---|
| `contact` | `about.html`, `pt/about.html` |
| `newsletter` | `index.html`, `pt/index.html` |

`quiz` and `download` are reserved `form_type` values. No form uses them yet:
the quiz hands off to the contact form through `?service=`, and there are no
gated downloads.

## Fields

| Field | `contact` | `newsletter` | Notes |
|---|---|---|---|
| `form_type` | `contact` | `newsletter` | hidden |
| `lang` | `en` or `pt` | `en` or `pt` | hidden, matches the page language |
| `source_page` | `/about.html` or `/pt/about.html` | `/` or `/pt/` | hidden; the homepage sends its canonical path |
| `email` | required | required | `type="email"` |
| `name` | required | — | |
| `company` | optional | — | |
| `service` | optional | — | one of: `Show Design`, `Show Control & Automation`, `System Architecture`, `Technical Direction`, `Not sure yet`, or empty. English values in both languages. |
| `message` | required | — | up to 4000 characters |
| `quiz_result` | hidden | — | empty unless the visitor came from the quiz; then one of the four service names above, mapped from `?service=SD\|SC\|SA\|TD` |
| `consent` | optional | **required** | checkbox, `value="yes"`. **Absent** when unticked. Never pre-ticked. |
| `lp_ref_code` | honeypot | honeypot | must arrive **empty** |

Field names are identical in both languages.

## Consent wording

The consent checkbox label is identical on both forms. Rendered text, exactly:

- **EN:** `Send me occasional emails from Lumen and Pixel. Unsubscribe at any time. See our Privacy Policy.`
- **PT:** `Enviem-me emails ocasionais da Lumen and Pixel. Pode cancelar a subscrição a qualquer momento. Consulte a nossa Política de Privacidade.`

"Privacy Policy" / "Política de Privacidade" links to `legal.html#privacy`.
The form sends only `consent=yes`; the receiver records which wording was
agreed to from `lang`. Changing a label means updating this file and the
record of wording in the same PR.

## Honeypot

`lp_ref_code` is a text input hidden from people by `.hp-field` in `site.css`
(off-screen, not `type="hidden"`), with `tabindex="-1"` and
`autocomplete="off"`. People never fill it; many bots do. **The receiver must
discard any submission where it is not empty.** The page does no screening of
its own.

It is deliberately not named `website`: browsers autofill fields with that
name, which would discard real visitors.

## Response

The endpoint answers with a **303 redirect**:

| `form_type` | `lang=en` | `lang=pt` |
|---|---|---|
| `contact` | `/thank-you.html` | `/pt/thank-you.html` |
| `newsletter` | `/check-your-inbox.html` | `/pt/check-your-inbox.html` |

The site does not inspect the response beyond following the redirect.

## Posture

Public endpoint, native form POST, honeypot `lp_ref_code`, **no shared
secret**: a public form cannot hold one, because anything in the page is
readable by anyone. Screening happens on the n8n side.

## Downstream (outside this repo)

Recorded so a reader knows where the data goes; the site depends only on the
contract above.

- Newsletter signups go to **MailerLite** via n8n workflow v2-01. MailerLite
  runs double opt-in and records the confirmation IP and time.
- Consent wording and timestamp are stored on the **Notion** contact.
- The site never implements email logic.
