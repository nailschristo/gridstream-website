# Service Request System — Notes & Future Work

Living document for the customer service-request system built July 2026 for the
Iowa City VAHCS chiller maintenance contract (solicitation 36C26326Q0707,
Gridstream prime / Johnson Controls sub). Read this first when picking the
system back up in a future session.

## Current state (as of 2026-07-16)

Live and end-to-end tested. The system is single-contract: the /support form is
hardcoded to the ICVAHCS chiller contract (equipment list, SOW urgency
language). The form page is a private, access-code-gated portal reached only
via bookmark (no nav/footer links to it, and the status page deliberately does
not link back to it):

    https://gridstream.ai/support?code=<ACCESS_CODE>

The status checker (/support/status) IS public — it's linked from the footer
("Check Ticket Status") since it reveals nothing without an unguessable
ticket ID.

## Architecture

```
VA staff → /support form (React, access-code gate, ticket ID GS-YYYYMMDD-XXXXXX)
   ├─→ Netlify Forms "support"  (durable record + email safety net if n8n is down)
   └─→ n8n intake webhook
         ├─→ Airtable: create ticket (Status "New" = awaiting Gridstream approval)
         ├─→ APPROVAL email to Tyler (Gmail) w/ "Approve & Dispatch" button
         ├─→ Confirmation email to requester (with status link)
         └─→ IF emergency: Twilio SMS w/ approve link → Wait 15 min →
             re-check Acknowledged At → if empty, escalate (SMS + email)
             (escalation loop doubles as the "you haven't approved yet" nag)

Approve link → n8n approve webhook (GET) → builds JCI dispatch email FROM THE
  AIRTABLE RECORD (Gmail, CC Tyler) → stamps Status "Dispatched" +
  Acknowledged At/JCI Notified At/Dispatched At. Idempotent (no double-
  dispatch); if the Gmail send fails the ticket stays "New" so the click
  can be retried. Approval = acknowledgment (silences the escalation loop).

/support/status?ticket=… → n8n status webhook (GET) → Airtable → JSON timeline
Ack link (legacy) → n8n ack webhook (GET) → stamps Acknowledged At only
```

NOTE (2026-07-18): the system was changed from auto-forward-to-JCI to
**approval-gated for ALL tickets** — including emergencies, so approving
emergency tickets fast is on Tyler. Tickets sit in Status "New" until the
approve button (in the approval email / emergency SMS) is clicked. Live email
nodes use Gmail ("Gridstream Google Workspace" credential), not SMTP.

### Inventory / IDs

| Thing | Value |
|---|---|
| Airtable base | "Gridstream Hub" — `app11j5F2xgFaKVXV` |
| Airtable table | "Service Tickets" — `tblSdUgv8mYlTJdHO` (22 fields) |
| n8n instance | `https://n8n.gridstream.ai` (self-hosted; NOT the old tnelson.app.n8n.cloud) |
| Intake webhook | `POST /webhook/support-intake-a7f3k9` |
| Status webhook | `GET /webhook/support-status-a7f3k9?ticket=…` |
| Ack webhook | `GET /webhook/support-ack-a7f3k9?ticket=…` |
| Approve webhook | `GET /webhook/support-approve-a7f3k9?ticket=…` — sends JCI dispatch + marks Dispatched (workflow "Support — Approve & Dispatch", repo copy `n8n/4-support-approve.json`) |
| Site pages | `src/pages/Support.jsx`, `src/pages/SupportStatus.jsx` |
| Config | `src/config.js` — SHOW_SUPPORT flag, webhook URLs, SUPPORT_ACCESS_CODE |
| Netlify form | hidden `support` form registered in `index.html` |
| Workflow JSON | `n8n/1-support-intake.json`, `n8n/2-support-status.json`, `n8n/3-support-ack.json` |
| Email templates | `n8n/email-templates/*.html` — paste-ready HTML for the JCI dispatch + requester confirmation nodes (nodes set to HTML format; the workflow JSON still has the older plain-text versions) |
| Airtable setup script | `scripts/create-airtable-base.sh` (standalone-base variant; table was actually created inside Gridstream Hub via API) |

⚠️ The live n8n workflows were imported and then **hand-tweaked in the n8n
editor** — the repo JSON files are close but not authoritative. Export from n8n
before assuming the repo copies match.

### The access code lives in TWO places (keep in sync)

1. `src/config.js` → `SUPPORT_ACCESS_CODE` (client-side gate)
2. n8n intake workflow → "Validate & Enrich" Code node → `ACCESS_CODE` const
   (server-side gate; silently drops mismatches)

### Airtable status/timestamp semantics

- Status: New → Acknowledged → Dispatched → Tech On Site → Resolved → Closed
- The status page timeline reads the **timestamp fields**, not Status:
  Submitted At / Acknowledged At / Dispatched At / On Site At / Resolved At
- The ack webhook stamps Acknowledged At only (deliberately does not touch
  Status, to avoid regressing "Dispatched")
- `On Site At` / `Resolved At` are currently **manual** — Tyler edits Airtable
  when JCI reports progress; the status page picks it up automatically
- `Public Notes` field is shown verbatim on the public status page
- SLA Due is computed by n8n at intake: +4h emergency, +24h routine
- Report Month (YYYY-MM) groups tickets for the monthly VA report

## Go-live checklist (verify before contract start 2026-05-27… i.e., NOW-ish)

- [ ] Netlify dashboard → Forms → `support` → email notification to tyler@gridstream.ai
- [ ] Rotate access code from `ICVAHCS-2026` (both places, see above); give COR the bookmark
- [ ] Real JCI dispatch email in "Email JCI Dispatch" node (was a placeholder)
- [ ] Verify ack-link host is `n8n.gridstream.ai` in all 3 intake notification
      nodes (SMS Alert, SMS Escalation, Escalation Email) — the originally
      imported copy had the old tnelson.app.n8n.cloud host and was fixed by hand
- [ ] Delete test rows from Airtable: GS-00000000-SAMPLE, GS-20260716-TEST01…04,
      GS-20260716-AHG6JH (live drill)
- [ ] Add Airtable views: "Open Tickets" (Status ≠ Resolved/Closed),
      "By Report Month" (grouped by Report Month)
- [ ] Kickoff meeting: demo portal to COR, position as documented request
      channel alongside the phone line (phone remains the contractual
      emergency contact per SOW)

## Future work

### Option 2: Multi-contract support portal  ← the main planned upgrade

Trigger: winning a second service contract. Design agreed in the July 2026
session:

- Replace the single hardcoded form with a `SUPPORT_CONTRACTS` config in
  `src/config.js` (or a JSON file), keyed by access code:

  ```js
  export const SUPPORT_CONTRACTS = {
    'ICVAHCS-2026': {        // key = access code = contract selector
      id: 'icvahcs-chillers',
      label: 'Iowa City VA Health Care System — Chiller Maintenance',
      contractNo: '36C26326Q0707',
      equipment: [ /* current EQUIPMENT_OPTIONS list */ ],
      roles: [ /* current REQUESTER_ROLES list */ ],
      urgencyTiers: [
        { value: 'Minor / Routine', slaHours: 24, description: 'SOW minor-repair language…' },
        { value: 'Major / Emergency', slaHours: 4, description: 'SOW mission-stoppage language…' },
      ],
      emergencyPhone: '(919) 926-7100',
    },
    // next contract: another key
  }
  ```

- UX: /support shows a neutral "enter your facility access code" gate first;
  a valid code (typed or via ?code=) reveals that contract's form with its
  own equipment list and urgency definitions. Footer link can then return.
- Payload gains a `contract` field; n8n "Validate & Enrich" validates the code
  against a matching map and routes dispatch (per-contract subcontractor
  email / SMS targets). Airtable gains a `Contract` single-select (or one
  table per contract if reporting diverges).
- Ticket ID prefix could encode contract (e.g., GS-ICV-… / GS-XYZ-…) — nice
  for at-a-glance routing, optional.
- SupportStatus needs no changes beyond possibly displaying the contract name.

### Option A: tap-links for On Site / Resolved (discussed, not built)

Extend the ack workflow with an `action` query param
(`?ticket=…&action=ack|onsite|resolved` via a Switch node):
- `onsite` → stamp On Site At + Status "Tech On Site"
- `resolved` → stamp Resolved At + Status "Resolved"
Include all three links in the JCI dispatch email (Tyler is CC'd) so ticket
progress can be updated from a phone without opening Airtable. Same
idempotency rule: never overwrite an existing timestamp.

Alternative/complement: Airtable automations that stamp timestamps when the
Status select changes.

### Smaller items

- reCAPTCHA site key in `src/utils/formSecurity.js` and `index.html` is still
  the placeholder (`6LcXXXXXXXXXXXXXXXXXXXX`) — captcha silently no-ops
  (errors are caught). Wire a real v3 key or remove.
- Direct POSTs to Netlify Forms bypass the access code (worst case: junk in
  the safety-net inbox, never a ticket). Acceptable; revisit if spam appears.
- `npm run lint` is broken repo-wide (no ESLint config) — predates this work.

## Lessons learned (save yourself the debugging)

- n8n **test** webhook URLs (`/webhook-test/…`) are one-shot — click
  "Execute workflow" before each test. Production URLs need the workflow Active.
- Status page bug (fixed): client-side ticket regex excluded 0/1 (not in the
  ID generator's alphabet) and rejected hand-made test IDs before calling the
  webhook. Pattern is now loose; the webhook is the authority.
- Status webhook must return CORS headers (`Access-Control-Allow-Origin`) —
  configured via the Webhook node's allowedOrigins option + response headers
  on the Respond nodes. Verified working from gridstream.ai.
- Netlify Forms requires the hidden static form in `index.html` to match the
  fields POSTed; new fields must be added in both places.
