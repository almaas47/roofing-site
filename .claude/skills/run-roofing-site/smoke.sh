#!/usr/bin/env bash
# Smoke driver for roofing-site.
# Run from roofing-site/ — starts both servers, runs checks, then stops them.
set -e

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"   # roofing-site/
SERVER="$ROOT/server"

FRONTEND_PORT=5173
BACKEND_PORT=3001

cleanup() {
  kill "$VITE_PID" "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT

# ── Start frontend ───────────────────────────────────────────────────────────
echo "→ Starting Vite dev server on :$FRONTEND_PORT …"
cd "$ROOT"
npx vite --port "$FRONTEND_PORT" &
VITE_PID=$!

# ── Start backend ────────────────────────────────────────────────────────────
echo "→ Starting Express server on :$BACKEND_PORT …"
cd "$SERVER"
node --env-file=.env index.js &
SERVER_PID=$!

# ── Wait for both ─────────────────────────────────────────────────────────────
wait_for() {
  local url=$1 label=$2
  for i in $(seq 1 20); do
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "^[1-9]"; then
      echo "  ✓ $label up"
      return 0
    fi
    sleep 0.5
  done
  echo "  ✗ $label did not respond in time" >&2
  exit 1
}

wait_for "http://localhost:$FRONTEND_PORT/" "frontend"
wait_for "http://localhost:$BACKEND_PORT/" "backend (any 2xx/3xx/4xx)"

# ── Smoke tests ───────────────────────────────────────────────────────────────
echo ""
echo "── Check 1: frontend serves HTML ──────────────────────────────────────"
TITLE=$(curl -s "http://localhost:$FRONTEND_PORT/" | grep -o '<title>[^<]*</title>')
echo "  $TITLE"
echo "$TITLE" | grep -q "Peak Ridge" || { echo "  ✗ unexpected title"; exit 1; }
echo "  ✓ pass"

echo ""
echo "── Check 2: API rejects missing fields (400) ───────────────────────────"
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  "http://localhost:$BACKEND_PORT/api/contact" \
  -H 'Content-Type: application/json' \
  -d '{"name":"","email":"","phone":"","service":""}')
echo "  HTTP $CODE"
[ "$CODE" = "400" ] || { echo "  ✗ expected 400, got $CODE"; exit 1; }
echo "  ✓ pass"

echo ""
echo "── Check 3: full submission (needs live ANTHROPIC_API_KEY + RESEND_API_KEY) ─"
if [ -z "$ANTHROPIC_API_KEY" ] && [ -f "$SERVER/.env" ]; then
  export $(grep -v '^#' "$SERVER/.env" | xargs)
fi

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "  ⚠ ANTHROPIC_API_KEY not set — skipping live call"
else
  RESP=$(curl -s -w "\nHTTP %{http_code}" -X POST \
    "http://localhost:$BACKEND_PORT/api/contact" \
    -H 'Content-Type: application/json' \
    -d '{
      "name":    "Smoke Test",
      "email":   "matthewtgdiamond@gmail.com",
      "phone":   "(801) 555-0000",
      "service": "Roof repair",
      "message": "Automated smoke test"
    }')
  echo "  $RESP"
  echo "$RESP" | grep -q '"success":true' || { echo "  ✗ unexpected response"; exit 1; }
  echo "  ✓ pass — confirmation email sent to matthewtgdiamond@gmail.com"
fi

echo ""
echo "All checks passed."
