# Trazabilidad L1 — Arquitectura

## Stack

| Capa | Archivo | Rol |
|------|---------|-----|
| Modelo | `process-graph.js` | Rutas, τ, longitudes, `STAGE_SEQUENCE` |
| Motor | `trace-engine.js` | `t` + `v_prensa` → marcadores, etapas completadas |
| Reloj | `simulation-clock.js` | `setInterval` 50 ms, play/pause, escala, tope ETA |
| Diagrama | `track-renderer.js` | Grid P&ID + SVG conectores + marcadores multi-ruta |
| Progreso | `stage-rail.js` | Barra de etapas clicables con ✓ |
| App | `app.js` | Orquestación, tecla Espacio = play/pause |

## Fórmulas

```
τ acumulado por ruta → retención en encolador, sprays, zona esparcidor
transporte: tiempo_s = (metros / v_prensa_m_min) × 60
merge: espera la ruta más lenta antes de banda blanca
```

## Abrir

```bash
cd encolados/deck && ./serve-trazabilidad.sh
# → http://localhost:8080/trazabilidad/
```

## Controles

- **Iniciar / Espacio** — play/pause
- **Slider manual** — avance paso a paso
- **Barra de etapas** — click salta al nodo
- **fit_screen** — volver al inicio del diagrama

## Pendiente planta

Medir longitudes reales y τ; editar en panel izquierdo. Ver [`PARAMETROS.md`](PARAMETROS.md) para lista completa y defaults.

**Persistencia:** botón **Guardar** → `localStorage` clave `novopan-trazabilidad-params-v1`. **Cargar** / **Defaults** en el mismo panel.
