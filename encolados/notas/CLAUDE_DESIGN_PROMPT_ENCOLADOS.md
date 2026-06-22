# Claude Design Prompt — Mapa visual simple de Encolados

## Objetivo
Crear una página web estática (HTML/CSS, sin React necesariamente) que muestre el flujo de las 9 etapas del área de Encolados de forma visual y simple. No necesita ser elegante — necesita ser clara y útil para una presentación técnica.

---

## Prompt para Claude Design

```
Create a simple, clean one-page HTML visual of a particleboard production line called "Línea de Encolados". 

Show 9 steps in a horizontal flow (left to right, with arrows between). Each step is a card with:
- A number (1–9)
- A short name (2–4 words max)
- One simple icon (emoji is fine)
- 1–2 key facts max (parameter or sensor)

The 9 steps are:

1. Silos 🗄️ — nivel: sensor ultrasónico + paleta on/off
2. Dosing bins ⚖️ — descarga: peso × velocidad de banda
3. Clasificación 🔩 — rodillos moleteados 0.3–1.3 mm
4. Encolador 🧪 — mezcla resina + parafina; bombas 40–50%
5. Esparcidores 📐 — 3 capas: fino / medio / fino; tau objetivo = 0
6. Preprensa 🔧 — ~153 bar hidráulico; expulsa aire
7. Prensa principal 🔥 — 220–215 °C; es el máster de la línea
8. Enfriadoras estrella ⭐ — 3 tableros × estrella; 180° de rotación
9. Estacado 📦 — grupos de 3; sensor óptico + neumático

Design: white background, dark text, one accent color (industrial orange #E85D04 or similar). Cards in a row with → arrows. Below the flow, a small legend box showing the key parameter: "Tau = diferencia esparcidoras − báscula central. Setpoint: 0."

Keep it under 150 lines of HTML. No external dependencies.
```

---

## Fotos que pedir en la próxima visita

Estas fotos completan el mapa mejor que cualquier descripción:

1. **Silos** — foto de frente mostrando el sensor ultrasónico y la paleta (donde se ve el cable/montaje)
2. **Dosing bins** — foto del panel o pantalla que muestra el bin activo por capa
3. **Esparcidores** — foto lateral mostrando los 3 esparcidores en secuencia sobre la banda
4. **Pantalla PID** — captura/foto de la pantalla del controlador con SP (rojo) y PV (azul)
5. **Pantalla de tau** — foto de la pantalla donde aparece el valor de tau y el setpoint
6. **Prensa** — foto del lateral de la prensa continua (para ver la escala)
7. **Enfriadoras** — foto de una estrella para ver los brazos y los tubos metálicos

## Observaciones útiles para pedir en la próxima visita

- ¿Cuántos silos hay por calidad (fina / media)?
- ¿En la pantalla de dosing bins se ve el flujo kg/min en tiempo real?
- ¿La velocidad de línea se muestra en algún panel? (m/min)
- ¿La prensa tiene marca visible (Siempelkamp / Dieffenbacher)?
- ¿Hay pantalla SCADA centralizada o solo paneles locales?
```
