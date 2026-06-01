---
name: run-roofing-site
description: Run, start, launch, smoke test, or verify the roofing-site app — React/Vite frontend + Express/Claude AI backend
---

Peak Ridge Roofing is a React + Vite frontend (port 5173) backed by an Express server (port 3001) that calls the Claude API to generate confirmation emails and sends them via Resend. The primary interaction surface is the `POST /api/contact` endpoint. The driver is `.claude/skills/run-roofing-site/smoke.sh` — it starts both servers, runs three checks, then cleans up.

## Prerequisites

Node v24+ and npm are required. All packages are already installed in `node_modules/`. No additional system packages needed on macOS.

## Build

No build step needed for development. The Vite dev server compiles on the fly.

## Run (agent path)

```bash
cd roofing-site
bash .claude/skills/run-roofing-site/smoke.sh
```

The script:
1. Starts `npx vite --port 5173` (frontend)
2. Starts `node --env-file=.env index.js` from `server/` (backend)
3. **Check 1** — `GET http://localhost:5173/` returns HTML with `<title>Peak Ridge Roofing …`
4. **Check 2** — `POST /api/contact` with empty fields returns `HTTP 400` with validation error
5. **Check 3** — full valid form submission returns `{"success":true}` (calls live Claude API + sends emails via Resend; skipped with a warning if `ANTHROPIC_API_KEY` is unset)
6. Kills both servers on exit

To hit the API directly without the script:

```bash
# Validation smoke (no API keys needed)
curl -s -X POST http://localhost:3001/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"","email":"","phone":"","service":""}'
# → {"error":"Name, email, phone, and service are required."}

# Full submission (uses live keys from server/.env)
curl -s -X POST http://localhost:3001/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@example.com","phone":"(801) 555-0000","service":"Roof repair","message":"test"}'
# → {"success":true}
```

## Run (human path)

```bash
# Terminal 1 — frontend
cd roofing-site && npm run dev

# Terminal 2 — backend
cd roofing-site/server && npm run dev
```

Open `http://localhost:5173` in a browser. Ctrl-C to stop each.

## Gotchas

- **Backend root (`GET /`) returns 404** — that's correct; the only route is `POST /api/contact`. The smoke.sh `wait_for` loop accepts any HTTP response to detect readiness.
- **`server/.env` must exist** — the server uses `node --env-file=.env` to load `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, etc. A missing `.env` causes node to exit immediately with an error. Copy from `server/.env.example` and fill in real keys.
- **Prompt caching kicks in on the second request** — the first call writes the system prompt to Claude's cache (`cache_creation_input_tokens > 0`), subsequent calls read from it. Logged to console: `Claude usage — input: …, cache_read: …, cache_write: …`.
- **Vite proxies `/api/*` to `:3001`** — configured in `vite.config.js`. The frontend fetch to `/api/contact` routes through Vite to the Express server in dev; no CORS issues.
- **FROM_EMAIL default is `onboarding@resend.dev`** — works only with Resend's sandbox. For production, set a verified sender domain in `server/.env`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Error: Cannot find module` on server start | `cd server && npm install` |
| `Error: Missing env file` | Copy `server/.env.example` → `server/.env` and set real API keys |
| `{"error":"Failed to process your request"}` | Check console for Claude/Resend error; likely invalid API key or Resend unverified sender |
| Port already in use | `pkill -f "vite --port 5173"` and/or `pkill -f "node --env-file=.env index.js"` |
| Check 3 skipped | Set `ANTHROPIC_API_KEY` in `server/.env` |
