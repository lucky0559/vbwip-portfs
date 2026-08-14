# Loop Budget: YOUR_PROJECT

## Daily limits

| Loop | Max runs/day | Max tokens/day | Max sub-agent spawns/run |
|------|--------------|----------------|--------------------------|
| Daily Triage | 2 | 100k | 0 (L1) / 2 (L2) |
| Portfolio Redesign | 1 when started | 80k | 0 (first audit) / 1 (approved implementation) |

## On budget exceed

1. Pause schedulers.
2. Append the event to `loop-run-log.md`.
3. Notify the human in `STATE.md`.

## Kill switch

Command or issue label: `loop-pause-all`.

Resume only after the human clears the flag in `STATE.md`.

## Setup note

The portfolio redesign loop is configured but not started. Setup work is not a loop run and must not be added to the run log.
