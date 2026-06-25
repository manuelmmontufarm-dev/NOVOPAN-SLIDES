#!/usr/bin/env bash
# Assembles public/ for Vercel static deploy (single project, multiple routes).
# Uses cp/find only — Vercel build images do not include rsync.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"

PARTE1="$ROOT/parte-1-preparacion-madera"
PARTE1_FINAL="$PARTE1/instructivos/finales"
PARTE1_APP="$PARTE1/html-app"
DECK="$ROOT/parte-2-aglomerados/deck"

echo "→ Building Vercel public/ from $ROOT"

rm -rf "$PUBLIC"
mkdir -p "$PUBLIC"

# Landing page
cp "$ROOT/vercel/index.html" "$PUBLIC/index.html"

# Trazabilidad simulator — Línea 1 (parte-2-aglomerados/deck/trazabilidad)
mkdir -p "$PUBLIC/trazabilidad"
cp -R "$DECK/trazabilidad/." "$PUBLIC/trazabilidad/"
find "$PUBLIC/trazabilidad" -type f \( -name '*.md' -o -name 'CLAUDE_*' \) -delete

# Design system tokens — CSS imports ../../_ds/... from trazabilidad/css/
mkdir -p "$PUBLIC/_ds"
cp -R "$DECK/_ds/." "$PUBLIC/_ds/"

# Patios / recepción madera — static HTML (preparación de madera, versión estática)
mkdir -p "$PUBLIC/patios"
cp "$PARTE1_FINAL/NOVOPAN_Guia_Recepcion_Madera_FINAL_ESTATICO.html" "$PUBLIC/patios/index.html"
mkdir -p "$PUBLIC/patios/NOVOPNHTML1_files"
cp -R "$PARTE1_FINAL/NOVOPNHTML1_files/." "$PUBLIC/patios/NOVOPNHTML1_files/"

# Patios interactivo — React/Babel app (preparación de madera, versión interactiva)
mkdir -p "$PUBLIC/patios-interactivo"
cp "$PARTE1_APP/NOVOPNHTML1.html" "$PUBLIC/patios-interactivo/index.html"
mkdir -p "$PUBLIC/patios-interactivo/NOVOPNHTML1_files"
cp -R "$PARTE1_APP/NOVOPNHTML1_files/." "$PUBLIC/patios-interactivo/NOVOPNHTML1_files/"

# Logo referenced by _ds_bundle.js as ../../assets/novopan-logo.jpg
mkdir -p "$PUBLIC/assets"
cp "$DECK/assets/novopan-logo.jpg" "$PUBLIC/assets/novopan-logo.jpg"

# Inject <base href="..."> for routes served without trailing slash (vercel.json trailingSlash: false).
python3 - "$PUBLIC" <<'PY'
import sys
from pathlib import Path

public = Path(sys.argv[1])

def inject_base(html_path: Path, base_href: str) -> None:
    html = html_path.read_text(encoding="utf-8")
    needle = f'<base href="{base_href}">'
    if needle in html:
        return
    html = html.replace("<head>", f"<head>\n  {needle}", 1)
    html_path.write_text(html, encoding="utf-8")

for html_path, base in [
    (public / "patios" / "index.html", "/patios/"),
    (public / "patios-interactivo" / "index.html", "/patios-interactivo/"),
    (public / "trazabilidad" / "index.html", "/trazabilidad/"),
]:
    inject_base(html_path, base)
PY

echo "✓ public/ ready ($(find "$PUBLIC" -type f | wc -l | tr -d ' ') files)"
echo "  /                    → index.html"
echo "  /trazabilidad        → parte-2-aglomerados/deck/trazabilidad + _ds tokens"
echo "  /patios              → parte-1-preparacion-madera (guía estática)"
echo "  /patios-interactivo  → parte-1-preparacion-madera/html-app (React/Babel)"
