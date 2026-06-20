#!/usr/bin/env bash
# Production deploy — run on VPS after git sync (GitHub Actions or manual).
# v8 · PM2 app darulquran-next · port from deploy/runtime.cjs
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/darulquran_next}"
PM2_APP="darulquran-next"
BRANCH="${DEPLOY_BRANCH:-main}"

cd "$APP_ROOT"

echo "=== Dar Ul Quran remote deploy v8 $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
echo "App root: $APP_ROOT"

PREV_COMMIT="$(git rev-parse HEAD)"
echo "Previous HEAD: $PREV_COMMIT"

rollback() {
  echo "ERROR: Deploy failed — rolling back to ${PREV_COMMIT}"
  git reset --hard "$PREV_COMMIT"
  if command -v pm2 >/dev/null 2>&1; then
    pm2 start ecosystem.config.cjs --update-env 2>/dev/null \
      || pm2 restart "$PM2_APP" --update-env 2>/dev/null \
      || true
  fi
}
trap rollback ERR

git checkout -- . 2>/dev/null || true
git fetch origin "$BRANCH"
if [ -n "${DEPLOY_SHA:-}" ]; then
  git reset --hard "$DEPLOY_SHA"
else
  git reset --hard "origin/$BRANCH"
fi
echo "Deployed commit: $(git rev-parse --short HEAD) ($(git log -1 --format='%s'))"

if [ -f .env ]; then set -a && . ./.env && set +a; fi
if [ -f .env.local ]; then set -a && . ./.env.local && set +a; fi
unset NODE_ENV

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$HOME/.nvm/nvm.sh"
  nvm use 24 2>/dev/null || nvm use 22 2>/dev/null || nvm use node 2>/dev/null || true
fi
echo "Node: $(node -v) · npm: $(npm -v)"

# Stop before rebuild — avoids 500s on /_next/static/chunks mid-build.
pm2 stop "$PM2_APP" 2>/dev/null || true

npm ci --include=dev --no-audit --no-fund
npm run build

if [ ! -f .next/BUILD_ID ]; then
  echo "ERROR: Build output missing (.next/BUILD_ID not found)"
  exit 1
fi

SAMPLE_CHUNK="$(find .next/static/chunks -maxdepth 1 -name '*.js' -type f | head -1)"
if [ -z "$SAMPLE_CHUNK" ]; then
  echo "ERROR: No JS chunks in .next/static/chunks"
  exit 1
fi
echo "Build chunks OK: $(basename "$SAMPLE_CHUNK")"

pm2 delete "$PM2_APP" 2>/dev/null || true
pm2 start ecosystem.config.cjs --update-env
pm2 save

APP_PORT="$(node -e "console.log(require('./deploy/runtime.cjs').PORT)")"
CHUNK_URL_PATH="/_next/static/chunks/$(basename "$SAMPLE_CHUNK")"
HEALTH_OK=0

for i in 1 2 3 4 5 6; do
  if curl -fsS "http://127.0.0.1:${APP_PORT}/" -o /dev/null \
    && curl -fsS "http://127.0.0.1:${APP_PORT}${CHUNK_URL_PATH}" -o /dev/null; then
    echo "Health check passed: homepage + ${CHUNK_URL_PATH}"
    HEALTH_OK=1
    break
  fi
  echo "Waiting for app (attempt ${i}/6)..."
  sleep 5
done

if [ "$HEALTH_OK" -ne 1 ]; then
  echo "ERROR: App not responding on http://127.0.0.1:${APP_PORT}"
  pm2 logs "$PM2_APP" --lines 40 --nostream || true
  exit 1
fi

if [ -d /etc/apache2 ] && command -v apache2ctl >/dev/null 2>&1; then
  echo "Applying Apache security headers..."
  sudo bash deploy/apply-apache-security.sh || echo "WARN: Apache security snippet skipped."
  echo "Configuring Apache static asset serving..."
  sudo bash deploy/apply-apache-static.sh || echo "WARN: Apache static config skipped."
  echo "Enabling HTTP/2 on SSL vhost..."
  sudo bash deploy/enable-http2.sh || echo "WARN: HTTP/2 enable skipped."
fi

trap - ERR
echo "=== Deploy complete $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
