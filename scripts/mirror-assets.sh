#!/usr/bin/env bash
set -euo pipefail
# Execute somente se você tiver autorização para copiar e reutilizar os assets da origem.
SRC="https://helixjunxgamer.club"
OUT="public/assets"
mkdir -p "$OUT/img" "$OUT/css" "$OUT/js"
for f in css/app.css css/admin.css js/app.js js/admin.js js/sounds.js; do
  curl -fsSL "$SRC/assets/$f" -o "$OUT/$f"
done
for f in home-hero.webp wallet-hero.webp profile-cover.webp upgrade-global-banner.webp upgrade-mascot.webp limit-mascot.webp welcome-banner.webp missions-hero.webp google-g.svg logo-brand.svg; do
  curl -fsSL "$SRC/assets/img/$f" -o "$OUT/img/$f" || echo "falhou: $f"
done
echo "assets em $OUT"