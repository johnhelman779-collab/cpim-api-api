# cpim-api-api roadmap

CPIM API gateway. Part of the workspace [3-year roadmap](../ROADMAP.md) (CPIM-first).

## This repo’s track

| Period | Focus | Status |
|--------|--------|--------|
| **Y1Q1** | Docker Compose integration with sibling services | `planned` |
| **Y1Q2** | Role checks on mutating routes (write / ack) | `planned` |
| **Y1Q4** | Rate limits + structured logging (request IDs) | `planned` |
| **Y2Q3** | Metrics endpoint (latency, proxy/poll errors) | `planned` |
| **Y3Q1** | Container image; HTTPS termination in deploy profile | `planned` |
| **Y3Q2** | Stateless gateway; Redis-backed rate limits | `planned` |
| **Y3Q4** | API versioning (`/api/v1`) | `planned` |

## Depends on

- `cpim-auth` for token validation
- `cpim-api-app` and `cpim-app-contentgeneration` as upstreams

## Notes

Update status here when a milestone ships; keep the master roadmap in sync.
