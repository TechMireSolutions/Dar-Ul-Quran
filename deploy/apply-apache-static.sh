#!/usr/bin/env bash
# Serve /_next/static from disk with correct MIME types; exclude from reverse proxy.
set -euo pipefail

APP_ROOT="/var/www/darulquran_next"
SNIPPET_SRC="$(cd "$(dirname "$0")" && pwd)/apache-static-snippet.conf"
SNIPPET_DST="/etc/apache2/conf-available/darulquran-static.conf"

if [ ! -d /etc/apache2 ]; then
  echo "Apache not installed — skipping static asset config."
  exit 0
fi

if [ ! -f "$SNIPPET_SRC" ]; then
  echo "ERROR: Missing $SNIPPET_SRC"
  exit 1
fi

install -m 644 "$SNIPPET_SRC" "$SNIPPET_DST"

a2enmod alias mime 2>/dev/null || true
a2enconf darulquran-static 2>/dev/null || true

# Ensure SSL vhost proxies dynamic routes only (static served by Alias above).
for vhost in /etc/apache2/sites-enabled/*; do
  [ -f "$vhost" ] || continue
  if grep -qE 'ServerName\s+darulquran\.pk' "$vhost" 2>/dev/null; then
    if ! grep -q 'ProxyPass /_next/static/' "$vhost"; then
      echo "Adding ProxyPass exclusion to $vhost"
      sed -i '/ProxyPass \/ http/i \    ProxyPass /_next/static/ !' "$vhost"
    fi
  fi
done

if apache2ctl configtest; then
  systemctl reload apache2
  echo "Apache static asset config applied."
else
  echo "ERROR: Apache configtest failed after static asset changes."
  exit 1
fi
