# n8n workflows

Automation the website depends on. Kept here so it is versioned alongside the
site that calls it.

This directory starts with `_`, so **Jekyll does not publish it** — it is in the
repo but never served from lumenandpixel.com. (Do not add a `.nojekyll` file
without moving this somewhere else first.)

---

## `newsletter-double-opt-in.json`

The workflow behind the newsletter form on `index.html` and `pt/index.html`.
Without it imported and **active**, signups fail on the live site.

### Import

1. n8n → **Workflows** → **Import from File** → pick the JSON.
2. Open **Signup — Send confirmation** and attach an **SMTP credential**
   (see *Sending* below). Nothing else needs configuring.
3. Set `fromEmail` on that node if you want something other than
   `info@lumenandpixel.com`.
4. **Activate** the workflow. Production webhooks only exist while active —
   `webhook-test/` paths work in the editor, `webhook/` paths need it live.

### The three endpoints

> **Not called by the site since v1.53.** The newsletter form now posts to
> `/webhook/inbound-lead` with `form_type=newsletter`. This workflow only runs
> again if `inbound-lead` hands newsletter signups on to it.

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/webhook/newsletter-signup` | Called by the site's form. Records the request and sends a confirmation email. |
| `GET` | `/webhook/newsletter-confirm` | The link in that email. Flips the record to `confirmed` and redirects to the thank-you page. |
| `GET` | `/webhook/newsletter-unsubscribe` | Must be linked in every email you send. |

### Flow

```
POST /newsletter-signup
   └─ Validate & Record ── invalid ──▶ 400 { ok:false, error }
            │
          valid
            ├─ already confirmed ─────▶ 200 { ok:true }   (no email, no disclosure)
            └─ new or pending ─▶ send confirmation ─▶ 200 { ok:true }

GET /newsletter-confirm?email=…&token=…
   └─ token matches a pending record ─▶ status = confirmed ─▶ redirect to /thank-you.html
                              otherwise ─▶ redirect to /404.html

GET /newsletter-unsubscribe?email=…
   └─ status = unsubscribed ─▶ plain confirmation page
```

### Why it behaves the way it does

- **Nothing is added to the list until the confirmation link is clicked.** The
  site's success message already says "check your inbox", so the two agree.
- **An address that is already confirmed gets the same 200 and no email.** The
  response never reveals whether an address is on the list.
- **Consent is stored as evidence, not a boolean.** Each record keeps
  `consent_text` (the exact wording rendered beside the checkbox at the moment
  it was ticked), `consent_at`, and the request IP. That is what you would show
  if consent were ever challenged.
- **The endpoint re-validates.** The site screens with a honeypot, a timing
  gate and format checks, but the webhook is public and anyone can POST to it
  directly, so email format and consent are checked again here.
- **Confirmation tokens are single-use** and cleared once redeemed.

### CORS

The signup webhook sets **Allowed Origins** to
`https://www.lumenandpixel.com,https://lumenandpixel.com`.

The site sends `Content-Type: application/json`, which makes the browser send a
`OPTIONS` preflight first. If that origin list is wrong, the browser blocks the
request before n8n ever sees it and the form fails with a network error that
looks like the endpoint is down. Update it if the domain ever changes.

### Storage — read this before you rely on it

Subscribers live in n8n's **workflow static data**, so the workflow runs
immediately with no database to set up. That is deliberate for getting started,
but it is **not a durable system of record**: it is meant for small amounts of
data, it is rewritten on each execution, and it travels with the workflow.

When the list matters, replace the two `$getWorkflowStaticData('global')` reads
and writes — in **Signup — Validate & Record**, **Confirm — Apply** and
**Unsubscribe — Apply** — with a real store (Postgres, Supabase, Airtable,
Sheets). The record shape stays the same:

```json
{
  "email": "someone@example.com",
  "status": "pending | confirmed | unsubscribed",
  "token": "…",
  "consent": true,
  "consent_text": "I agree to receive occasional emails…",
  "consent_at": "2026-08-10T12:00:00.000Z",
  "consent_ip": "…",
  "language": "en | pt",
  "source": "Website newsletter",
  "entry_page": "/index.html",
  "requested_at": "…", "confirmed_at": "…", "unsubscribed_at": null
}
```

### Sending

The workflow uses n8n's SMTP node. **Do not point it at a personal mailbox or a
plain VPS** — bulk mail from either lands in spam and damages the domain's
reputation. Use the SMTP endpoint of a real sending service (Amazon SES,
Postmark, Resend, MailerSend). Called from n8n it never touches a visitor's
browser, so it does not reintroduce a cookie-consent obligation — but it *is* a
processor, so add it to the third-party list in `legal.html` and
`pt/legal.html` when you pick one.

Also set up **SPF, DKIM and DMARC** for lumenandpixel.com before sending
anything at volume, and make sure bounces and complaints actually suppress the
address. Unhonoured unsubscribes and unhandled bounces are what kill
deliverability.

### Testing before going live

```bash
# should return 400
curl -i -X POST https://lumenandpixel.app.n8n.cloud/webhook/newsletter-signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"not-an-email","consent":true}'

# should return 400
curl -i -X POST https://lumenandpixel.app.n8n.cloud/webhook/newsletter-signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","consent":false}'

# should return 200 and send you a confirmation email
curl -i -X POST https://lumenandpixel.app.n8n.cloud/webhook/newsletter-signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","consent":true,
       "consent_text":"I agree to receive occasional emails…",
       "consent_at":"2026-08-10T12:00:00.000Z",
       "language":"en","source":"curl","entry_page":"/index.html"}'
```

Then click the link in the email — you should land on `/thank-you.html`. Click
it a second time; it should send you to `/404.html`, because the token is spent.

Finally, submit the real form on the site once. If that fails while curl
succeeds, it is CORS.
