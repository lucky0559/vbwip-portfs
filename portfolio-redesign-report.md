# Portfolio Redesign Loop Report

## Run

- **Pattern:** `portfolio-redesign`
- **Mode:** L1 report-only
- **Run ID:** `2026-08-14T14:25:18Z`
- **Surface:** React/Vite architect portfolio
- **Audience:** Architecture studios and recruiters, plus prospective clients
- **Status:** Audit complete. Implementation not started.

## 1. High-Priority Items

### 1. Stabilize the hero and remove automatic rotation

- **Location:** `src/components/Hero.jsx:26-30`, `src/components/Hero.jsx:135-152`
- **Why it matters:** The auto-rotating hero competes with the architect's name and violates the target dossier direction. Hover pause is not an accessible pause mechanism, and reduced motion does not stop the JavaScript interval.
- **Next action:** Replace the carousel with one decisive hero image plus a manual, keyboard-accessible project selector. Add an explicit reduced-motion variant.
- **Estimate:** One focused implementation pass.

### 2. Turn the work wall into a real project index

- **Location:** `src/components/Works.jsx:70-123`, `src/components/Works.jsx:175-188`
- **Why it matters:** Cards use `cursor-pointer` but are not links or buttons, so the core work appears actionable without a destination. The current grid hides place and most project context until the card is read visually.
- **Next action:** Replace the repeated card wall with drawing-set rows or a mixed index. Make each project an actual link or an explicitly non-interactive catalog entry, and expose title, place, year, role, and status before interaction.
- **Estimate:** One focused implementation pass.

### 3. Repair semantic navigation and page landmarks

- **Location:** `src/App.jsx:14-28`, `src/components/Navbar.jsx:16-19`, `src/components/Navbar.jsx:47-54`, `src/components/Navbar.jsx:83-93`
- **Why it matters:** Section navigation is implemented as buttons that call `scrollIntoView`, so links cannot be deep-linked, opened in a new tab, or represented in the URL. The page has no `<main>`, skip link, active-section state, or `scroll-margin-top` for anchored content.
- **Next action:** Add a skip link and `<main>`, convert section navigation to anchors, add `scroll-margin-top`, and expose the active section with a non-color cue.
- **Estimate:** One focused implementation pass.

### 4. Make contact truthful and robust

- **Location:** `src/components/Contact.jsx:45`, `src/components/Contact.jsx:123-180`
- **Why it matters:** Submit currently flips to “Message received” without sending data anywhere. Inputs have labels but no `name` or `autocomplete`, the success state is not announced, and the message placeholder uses three periods.
- **Next action:** Choose an explicit delivery path, then add `name`, `autocomplete`, inline validation/status, `aria-live`, and a truthful success or mailto handoff. Keep the path useful for both hiring and client inquiries.
- **Estimate:** One focused implementation pass after the delivery choice.

### 5. Replace the global motion blanket with intentional reduced-motion behavior

- **Location:** `src/App.jsx:16`, `src/index.css:68-75`, `src/components/Hero.jsx:18-30`, `src/components/Skills.jsx:260-280`
- **Why it matters:** The site relies on scroll parallax, a 700vh sticky capabilities sequence, entrance choreography, and auto-advance. Global duration reduction does not remove the interval or provide a readable non-motion equivalent. The skills sequence is especially costly on mobile.
- **Next action:** Keep motion for standard users, but provide a static path for reduced motion. Remove automatic sequences and redesign capabilities as an accessible index with progressive detail.
- **Estimate:** One focused implementation pass for motion policy, one for capabilities.

### 6. Protect image stability and loading performance

- **Location:** `src/components/About.jsx:36-40`, `src/components/Works.jsx:86-92`, `src/components/Thesis.jsx:21-24`
- **Why it matters:** Rendered images have no explicit dimensions or lazy-loading strategy. This can create layout shift and loads many below-fold assets before they are needed.
- **Next action:** Add intrinsic dimensions or aspect-ratio contracts, lazy-load below-fold content, prioritize the hero asset, and use more descriptive alt text where the image is meaningful.
- **Estimate:** One focused implementation pass.

## 2. Watch Items

- `npm run lint` fails at `src/components/Thesis.jsx:61` because `markX` is assigned but unused. This is a baseline quality gate issue, not fixed in the report-only run.
- `npm test` is unavailable because `package.json` has no test script.
- `index.html:7` still uses the placeholder title `vbwip` and has no description or social preview metadata.
- `src/components/Works.jsx:155-169` exposes filter state through underline and color, but not `aria-pressed`, a current-state cue, or a live result count. The filter works after its transition settles.
- `src/components/Skills.jsx:102-105` marks every slide except the first as `aria-hidden`, even as scroll position changes which slide is visually active.
- The page is content-rich but long and repetitive: About, Services, Works, Thesis, Skills, Core Capabilities, Philosophy, and Contact all receive their own large narrative treatment. The redesign should preserve evidence while reducing scrolling fatigue.
- A mobile render at 390px wide had no horizontal overflow. The menu opens and the project filter resolves to the three thesis projects after its transition completes.
- The rendered console produced only a Framer Motion scroll-offset warning; no application error was observed.

## 3. Noise / Ignore

- Existing assets and the current warm cream/taupe palette are useful raw material, not a reason to preserve the current card or carousel patterns.
- Setup files and loop manifests are process artifacts, not UI scope.
- `npm run build` passes with the current source.

## 4. Recommended Pass Order

1. **Shell and hero:** semantic landmarks, anchor navigation, skip link, one decisive hero, reduced-motion-safe motion policy.
2. **Project index:** drawing-set rows, project metadata, real destinations, filter state semantics.
3. **Thesis dossier:** retain Singkaban evidence but reduce the parallax stack and clarify process, constraints, and outcome.
4. **Contact and metadata:** truthful delivery path, form semantics, page metadata, image dimensions and loading strategy.
5. **Capabilities:** replace the long sticky scroll sequence with a compact, accessible capability index.
6. **QA:** keyboard flow, reduced motion, 390/768/1280px layouts, image loading, lint, build, and content review.

## Human Gate

At the time of this audit, no implementation was performed. The first objective, **Shell and hero**, was subsequently approved and completed in the implementation pass recorded below.

## 5. Implementation Pass 1 — Shell and hero

- **Run ID:** `2026-08-14T15:07:38Z`
- **Mode:** approved implementation
- **Status:** Complete

### Delivered

- Added a semantic `<main>` landmark, skip link, visible focus treatment, anchor scroll offset, active-section navigation cue, and a responsive site-index menu with Escape support and focus trapping.
- Replaced the auto-rotating hero with one decisive featured-work image at a time and manual, keyboard-accessible selectors.
- Added descriptive hero image alternatives, intrinsic image dimensions, loading priorities, manual status feedback, and reduced-motion-safe transforms/transitions.
- Updated document title, description, theme color, and social preview metadata.
- Moved the global reset into Tailwind’s base layer so the intended spacing utilities apply consistently.

### Validation

- `npm run build` passes.
- Browser QA passed at the default desktop viewport and 390×844: anchor navigation, active section state, menu open/close via Escape, manual hero selection, no horizontal overflow, and no console errors.
- `npm run lint` remains blocked by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.
- `npm test` remains unavailable because no test script is defined.

### Next pass

Project index: replace the non-actionable card wall with a drawing-set index that exposes project metadata and filter state before interaction.

## 7. Implementation Pass 3 — Direct contact sending

- **Run ID:** `2026-08-14T18:18:35Z`
- **Mode:** approved implementation
- **Status:** Complete, pending deployment environment configuration

### Delivered

- Replaced the client-side mailto submit path with a same-origin `POST /api/contact` request.
- Added a Vercel-compatible server function that calls Resend with `RESEND_API_KEY` kept server-side.
- Added configurable `RESEND_FROM_EMAIL` and `CONTACT_RECIPIENT` values, defaulting to Resend’s test sender and the portfolio email.
- Added server-side input validation, a honeypot field, `reply_to`, safe generic failure responses, and client sending/success/error states.
- Documented deployment environment variables in `README.md` and ignored local environment files.

### Validation

- `npm run build` passes.
- Endpoint smoke checks pass for unsupported methods and invalid request bodies.
- `git diff --check` passes.
- `npm run lint` remains blocked only by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.

### Deployment requirement

Set `RESEND_API_KEY` in the server-side deployment environment. For production, use a verified sender in `RESEND_FROM_EMAIL`; Resend’s `onboarding@resend.dev` sender is restricted to testing and the Resend account email.

## 8. Implementation Pass 4 — Email template

- **Run ID:** `2026-08-14T18:22:57Z`
- **Mode:** approved implementation
- **Status:** Complete

### Delivered

- Added `api/contact-email.js` with a responsive, inline-styled HTML email template that matches the portfolio’s paper, graphite, and oxide language.
- Added a plain-text fallback for clients that do not render HTML.
- Included sender metadata, received time, escaped message content, and a direct reply action.
- Connected the template to the Resend payload.

### Validation

- Template smoke check confirms subject generation, HTML output, text fallback, and content escaping.
- `npm run build` passes.
- `git diff --check` passes.
- `npm run lint` remains blocked only by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.

## 10. Implementation Pass 6 — Resend delivery diagnostics

- **Run ID:** `2026-08-14T18:40:17Z`
- **Mode:** approved bug fix
- **Status:** Complete, pending Resend account configuration if the provider rejects delivery

### Delivered

- Added provider-aware error messages for invalid API keys, sender or recipient restrictions, rate limits, and upstream outages.
- Added bounded server-side logging of Resend’s response detail without exposing API keys to the browser.
- Documented the no-domain test-sender restriction and the verified-domain path.

### Validation

- A non-delivery request with a fixture key reaches Resend and returns the actionable `RESEND_API_KEY` error.
- `npm run build` passes.
- `git diff --check` passes.
- `npm run lint` remains blocked only by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.

## 6. Implementation Pass 2 — Contact handoff

- **Run ID:** `2026-08-14T18:07:17Z`
- **Mode:** approved implementation
- **Status:** Complete

### Delivered

- Replaced the false “Message received” state with a truthful `mailto:` handoff to `benipayovanessa@gmail.com`.
- Prefills the subject, visitor name, reply email, and message body in the visitor’s email app.
- Added `name`, `autocomplete`, `inputmode`, delivery guidance, a live status region, and a fallback link for reopening the email draft.
- Improved contact-field placeholder contrast on the dark surface.

### Validation

- `npm run build` passes.
- Browser QA confirmed the form structure, required fields, handoff copy, mail link, improved field contrast, no horizontal overflow, and no application errors.
- `npm run lint` remains blocked by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.
- `npm test` remains unavailable because no test script is defined.

### Next pass

Project index: replace the non-actionable card wall with a drawing-set index that exposes project metadata and filter state before interaction.

## 9. Implementation Pass 5 — Local contact endpoint

- **Run ID:** `2026-08-14T18:32:28Z`
- **Mode:** approved bug fix
- **Status:** Complete, pending local Resend environment configuration

### Delivered

- Added a Vite development middleware adapter for `/api/contact` that reuses the production contact handler.
- Kept `RESEND_API_KEY` server-side while allowing local `.env.local` values to be loaded by Vite.
- Removed the local 404 failure path; unsupported methods and invalid payloads now return the handler’s JSON responses.

### Validation

- Local `GET /api/contact` returns `405 Method Not Allowed`.
- Local invalid `POST /api/contact` reaches validation and returns `400 Bad Request`.
- `npm run build` passes.
- `git diff --check` passes.
- `npm run lint` remains blocked only by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.

## 11. Implementation Pass 7 — Nodemailer SMTP migration

- **Run ID:** `2026-08-14T18:45:25Z`
- **Mode:** approved implementation
- **Status:** Complete, pending SMTP provider configuration

### Delivered

- Replaced the external email API call with a Nodemailer SMTP transporter.
- Added server-side `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `MAIL_FROM` configuration.
- Preserved the branded HTML/plain-text template, reply-to behavior, validation, honeypot, and client status states.
- Added safe SMTP-specific diagnostics without returning credentials to the browser.
- Removed Resend from the active contact implementation and setup instructions.

### Validation

- Unconfigured SMTP returns a clear `500` configuration response.
- Mocked SMTP success and failure paths are covered without sending a real message.
- `npm run build` passes.
- `git diff --check` passes.
- `npm run lint` remains blocked only by the pre-existing unused `markX` in `src/components/Thesis.jsx:61`.
