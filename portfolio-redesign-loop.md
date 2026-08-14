# Portfolio Redesign Loop

## Status

First L1 report-only run complete. The approved Shell, hero, and contact implementation passes are complete; the next pass remains human-gated.

## Pattern

- **Pattern ID:** `portfolio-redesign`
- **Register:** brand
- **Cadence:** on demand, maximum one run per day once started
- **Loop source:** `loop-engineering:portfolio-redesign`
- **Primary surface:** React/Vite architect portfolio at the project root
- **Audiences:** architecture studios and recruiters, plus prospective clients

## Objective

Redesign the existing architect portfolio around the creative north star **The Working Drawing**. Make project work, process, place, technical range, and contact paths more legible through a quiet editorial and material-dossier system. Preserve working functionality and real project assets while removing generic portfolio patterns.

## Design Context

- Use `PRODUCT.md` as the strategic brief.
- Use `DESIGN.md` as the target visual system.
- Keep the palette paper, graphite, and one oxide notation accent.
- Treat the project index as a drawing set, not a wall of identical cards.
- Support WCAG 2.2 AA, keyboard navigation, visible focus, descriptive alt text, 44px touch targets, and reduced motion.

## First-Run Protocol

The first execution must be report-only:

1. Audit the current page against `PRODUCT.md` and `DESIGN.md`.
2. Inspect the component hierarchy, content hierarchy, responsive behavior, motion, accessibility, and validation status.
3. Produce a prioritized redesign plan with one focused objective per pass.
4. Do not edit UI files, install packages, run auto-fix, spawn sub-agents, push, merge, or create a PR during the first audit run.

## Human Gates

- Do not start this loop until the human explicitly requests it.
- Do not implement a plan until the human approves the plan and the next focused objective.
- Never auto-merge or push. A draft PR and human review are required before any ready state.
- Respect `loop-constraints.md`, especially the protected paths and one-objective-per-pass rule.

## Suggested Start Command

```text
/loop 1d Run portfolio-redesign. Audit the current architect portfolio against PRODUCT.md and DESIGN.md. Report only; do not edit files or execute auto-fix.
```

## Definition of Done

- The hero establishes the architect and point of view without an auto-rotating carousel.
- The project index exposes title, place, year, role, and status before interaction.
- Project imagery and process details carry the narrative.
- Contact paths serve both hiring and client conversations.
- Reduced-motion and keyboard paths are equivalent to the visual experience.
- `npm run lint` and `npm run build` pass before an implementation pass is proposed.

## Latest Implementation

- **Completed objective:** Shell and hero.
- **Implemented:** semantic page shell, skip link, anchor navigation, active-section cue, responsive site index, manual featured-work hero, image dimensions/loading hints, descriptive hero alternatives, reduced-motion-safe hero behavior, and page metadata.
- **Validation:** `npm run build` passes. Browser checks passed at desktop and 390×844. Lint remains blocked by the known baseline `markX` error in `src/components/Thesis.jsx:61`; no test script is defined.
- **Completed objective:** Contact handoff.
- **Implemented:** same-origin form submission to a Vercel-compatible Nodemailer SMTP endpoint, server-side SMTP credentials, a branded HTML/plain-text email template, validation, honeypot protection, reply-to handling, delivery guidance, live status, error handling, and improved dark-surface field contrast.
- **Validation:** `npm run build` passes. Endpoint smoke checks confirmed method handling and validation. Lint remains blocked by the known baseline `markX` error; no test script is defined.
- **Next approved objective:** Project index.

## Latest Report

See `portfolio-redesign-report.md`. The next queued objective is **Project index**, pending human approval.
