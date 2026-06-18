#!/usr/bin/env bash
# Enable HTTP/2 on the darulquran.pk SSL vhost when Apache + SSL are present.
set -euo pipefail

if [ ! -d /etc/apache2 ]; then
  echo "Apache not installed — skipping HTTP/2."
  exit 0
fi

a2enmod http2 2>/dev/null || true

for conf in /etc/apache2/sites-available/*.conf /etc/apache2/sites-enabled/*.conf; do
  [ -f "$conf" ] || continue
  if grep -qE 'ServerName\s+darulquran\.pk' "$conf" && grep -q '<VirtualHost \*:443>' "$conf"; then
    if ! grep -q 'Protocols h2' "$conf"; then
      echo "Adding HTTP/2 to $conf"
      sed -i '/<VirtualHost \*:443>/a \    Protocols h2 http/1.1' "$conf"
    fi
  fi
done

if apache2ctl configtest; then
  systemctl reload apache2
  echo "HTTP/2 configuration applied."
else
  echo "WARN: Apache configtest failed after HTTP/2 changes."
  exit 1
fi
