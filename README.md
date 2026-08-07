# cpim-api-api

CPIM API gateway.

## Role

Single entry point for the UI. Proxies auth, device communication, and exception APIs. Protects routes with Bearer token validation against `cpim-auth`.

## Prerequisites

- `cpim-auth` on 3001
- `cpim-api-app` on 3002
- `cpim-app-contentgeneration` on 3004

## Run

```bash
npm install
npm run dev
```

Listens on `http://localhost:3000`.

## Routes

| Gateway path | Upstream |
|--------------|----------|
| `POST /api/auth/login` | auth `/auth/login` (public) |
| `GET /api/auth/validate` | auth `/auth/validate` |
| `/api/devices/*` | api-app `/devices/*` |
| `/api/exceptions/*` | contentgeneration `/exceptions/*` |
| `GET /health` | local |

## Environment

- `PORT` (default `3000`)
- `AUTH_URL` (default `http://localhost:3001`)
- `APP_URL` (default `http://localhost:3002`)
- `EXCEPTIONS_URL` (default `http://localhost:3004`)

## Status

v0.1.1 — active development (API gateway).

## Roadmap

See [ROADMAP.md](ROADMAP.md) for this service’s 3-year track.
