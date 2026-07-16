// Site feature flags.
//
// SHOW_AGENTIC controls every Agentic Workflows surface — the /agentic route,
// the header nav link, the footer link, and the home page spotlight section.
// The page code lives in src/pages/Agentic.jsx and is kept intact; flip this to
// `true` to re-enable the page everywhere at once.
export const SHOW_AGENTIC = false

// SHOW_SUPPORT controls the customer service-request surfaces — the /support
// and /support/status routes plus the footer link. Pages live in
// src/pages/Support.jsx and src/pages/SupportStatus.jsx.
export const SHOW_SUPPORT = true

// --- Service Request (support) system configuration -------------------------
//
// SUPPORT_WEBHOOK_URL — n8n intake workflow webhook (POST, production URL).
//   Receives the full ticket JSON on every submission. Matches the webhook
//   path in n8n/1-support-intake.json; live once that workflow is Active.
//   The form also records to Netlify Forms, so no ticket is lost if n8n is down.
export const SUPPORT_WEBHOOK_URL = 'https://n8n.gridstream.ai/webhook/support-intake-a7f3k9'

// SUPPORT_STATUS_WEBHOOK_URL — n8n status-lookup webhook (GET).
//   Called as `${URL}?ticket=GS-...`; returns JSON in the shape documented at
//   the top of src/pages/SupportStatus.jsx. Matches n8n/2-support-status.json.
export const SUPPORT_STATUS_WEBHOOK_URL = 'https://n8n.gridstream.ai/webhook/support-status-a7f3k9'

// SUPPORT_ACCESS_CODE — shared access code given to authorized VA points of
//   contact (COR, Boiler Plant Operators, HVAC techs). Checked client-side as
//   a gate against drive-by submissions; n8n should re-validate it
//   server-side, since anything in this bundle is publicly readable.
//   Case-insensitive. VA staff can bookmark /support?code=<CODE> to pre-fill.
export const SUPPORT_ACCESS_CODE = 'ICVAHCS-2026'
