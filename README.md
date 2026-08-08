# Made For — Bain Capital Site Progress Tracker

Client-facing progress tracker for the Bain Capital fitout at Suite 28.01 & 28.02,
Aurora Place, 88 Phillip Street, Sydney.

Cloned from the published prototype at https://madeforbaincapital.tiiny.site/ so we
have our own version under source control.

## Run locally

The whole thing is a single self-contained HTML file — no build step, no dependencies,
no server required. Just open it:

```bash
open index.html
```

## Tabs

- **Made For Team** — team profiles, responsibilities and contact details
- **Progress** — weekly entries (this week / next week / outstanding items / programme note)
- **Programme** — schedule against the target FDOB of February 2027
- **Budget** — base contract plus approved and pending client and design variations
- **Key Documents** — strategy, concept, DD and documentation registers
- **Tender** — long list, short list, tender responses and recommendation

## Known limitations

Nothing persists. All state lives in a single in-memory `S` object, so every checkbox
tick, added week, variation, document and tender response is lost on refresh, and
nothing is shared between viewers. The 27 weeks from 3 Aug 2025 to 1 Feb 2026 are
hardcoded in the source. It works as a demo or presentation prototype, not yet as a
tracker anyone can keep updated.

The page also still carries two bits injected by the original tiiny.host hosting: a
Plausible analytics script pointed at `madeforbaincapital.tiiny.site`, and an
Open Graph preview image pointing at tiiny's logo.

## Note on contents

This file contains client-identifying detail, contract values and personal contact
numbers for the Made For team. Keep this repository private.
