# Loop Configuration: Triage + Portfolio Redesign

## Active Loops

| Pattern | Cadence | Status | Command |
|---------|---------|--------|---------|
| Daily Triage | 1d | L1 report-only | See `loop-triage` |
| Portfolio Redesign | On demand | Shell + hero + contact complete; next pass human-gated | See `portfolio-redesign-loop.md` |

## Human Gates

- No auto-fix until an L2 checklist is complete.
- All high-risk paths require human review.
- The portfolio redesign loop must not start from a scheduler or background process.
- The first portfolio redesign run is an audit and plan only. It must not edit UI files, install packages, or spawn sub-agents; later implementation passes require explicit human approval.
- A human must approve the plan before an implementation pass begins.
- Every implementation pass is limited to one focused UI objective and must run the available validation commands before completion is proposed.

## Budget

- See `loop-budget.md` for per-pattern limits.
- Append only executed runs to `loop-run-log.md`.
- Use the `loop-budget` skill at the start and end of an executed run.
- Kill switch: `loop-pause-all` pauses schedulers and requires human review.

## Links

- Design brief: `PRODUCT.md`
- Visual system: `DESIGN.md`
- Redesign manifest: `portfolio-redesign-loop.md`
- Binding constraints: `loop-constraints.md`
