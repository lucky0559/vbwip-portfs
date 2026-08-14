# Loop Constraints

These rules are binding for every executed loop.

## Push and merge

- Don't push before telling me.
- Never auto-merge to main without human approval.
- Always create a draft PR first; let me review before marking ready.

## Paths

- Never edit `.env`, `.env.*`, `auth/`, `payments/`, `secrets/`, or `credentials/`.
- Never edit infrastructure configs without human approval.

## Code

- Always run tests before proposing a fix. If no test script exists, report that explicitly.
- Never disable tests to make CI green.
- Never refactor unrelated code.
- Max 3 fix attempts per item; escalate after.
- Keep each implementation pass focused on one UI objective.

## Communication

- Always tell me what you are about to do before doing it.
- Never close an issue or PR without my approval.

## Design loop

- Do not start `portfolio-redesign` until the human explicitly requests it.
- Its first run is report-only and must not edit UI files, install dependencies, or spawn sub-agents.
- Respect WCAG 2.2 AA, keyboard access, visible focus, descriptive alternatives, 44px touch targets, and reduced-motion preferences.

## Budget

- If token spend hits 80% of the daily cap, switch to report-only.
- If `loop-pause-all` is active, exit immediately.
