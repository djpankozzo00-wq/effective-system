#!/usr/bin/env bash
set -Eeuo pipefail

SRC="${ASSET_SOURCE_URL:-https://helixjunxgamer.club}"
OUT="public/assets"
mkdir -p "$OUT/img" "$OUT/css" "$OUT/js"

download() {
  local remote="$1"
  local target="$2"
  echo "Baixando $remote"
  curl --fail --location --silent --show-error --retry 3 --retry-delay 2 \
    "$SRC/assets/$remote" -o "$OUT/$target"
  test -s "$OUT/$target"
}

# Recursos visuais usados pelo front-end.
for file in \
  home-hero.webp wallet-hero.webp profile-cover.webp \
  upgrade-global-banner.webp upgrade-mascot.webp limit-mascot.webp \
  welcome-banner.webp missions-hero.webp google-g.svg logo-brand.svg
do
  download "img/$file" "img/$file"
done

# Mantém os arquivos de estilo e scripts de origem disponíveis localmente.
for file in css/app.css css/admin.css js/app.js js/admin.js js/sounds.js; do
  download "$file" "$file"
done

echo "Sincronização concluída em $OUT"
