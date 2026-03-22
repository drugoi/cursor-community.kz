#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm build
pnpm preview --host 127.0.0.1 --port 4321 &
PID=$!
sleep 3
pnpm dlx @axe-core/cli@4.10.2 \
  http://127.0.0.1:4321/ \
  http://127.0.0.1:4321/kk/ \
  http://127.0.0.1:4321/en/ \
  http://127.0.0.1:4321/projects/ \
  http://127.0.0.1:4321/kk/projects/ \
  http://127.0.0.1:4321/en/projects/
kill "$PID" 2>/dev/null || true
