#!/usr/bin/env bash
# Idempotently install Apache security headers for darulquran.pk.
# Run on the VPS as root or with sudo. Safe to re-run.
set -euo pipefail

SNIPPET_SRC="$(cd "$(dirname "$0")" && pwd)/apache-security-snippet.conf"
SNIPPET_DST="/etc/apache2/conf-available/darulquran-security.conf"

if [ ! -d /etc/apache2 ]; then
  echo "Apache not installed — skipping security snippet."
  exit 0
fi

if [ ! -f "$SNIPPET_SRC" ]; then
  echo "ERROR: Missing $SNIPPET_SRC"
  exit 1
fi

install -m 644 "$SNIPPET_SRC" "$SNIPPET_DST"

a2enmod headers 2>/dev/null || true
a2enconf darulquran-security 2>/dev/null || true

if apache2ctl configtest; then
  systemctl reload apache2
  echo "Apache security snippet applied and reloaded."
else
  echo "ERROR: Apache configtest failed — snippet not reloaded."
  exit 1
fi
