# Parámetros de simulación — Línea 1

> Fuente de verdad del modelo: `js/core/process-graph.js` + `js/core/trace-engine.js`  
> **Mediciones de campo:** [`../../MEDICIONES_CAMPO.md`](../../MEDICIONES_CAMPO.md) — libro de números + **instrucciones para agentes AI**  
> Proceso físico: [`../../PROCESO.md`](../../PROCESO.md)  
> Persistencia local: clave `novopan-trazabilidad-params-v9` (localStorage)

## Modelo m_dot (2026-06-25)

La **velocidad prensa** (m/min) es el reloj maestro de las bandas acopladas (blanca, roja, prensa).  
Los flujos HMI y la receta entran en los bins y hoppers; el motor calcula τ a partir de masa y flujo.

| Tipo de nodo | Parámetro en panel | Fórmula |
|--------------|-------------------|---------|
| **Bin / hopper** (dosing, esparcidores) | `mass:*` (kg) + globales `F_*` | `τ = M / F × 60` [s] |
| **Encolador / sprays** (tiempo fijo) | `ret:*` (s) | `t = τ` [s] |
| **Banda inclinada** (velocidad HMI fija) | `len:*` (m) + `speed:*` (m/min) | `t = L / v_banda × 60` [s] |
| **Banda acoplada a prensa** (blanca, roja, prensa) | `len:*` (m) | `t = L / v_prensa × 60` [s] |
| **Cualquier etapa** | `buffer:*` (s) | `t_total = t_calc + buffer_manual` |

**Merge (esparcidores → banda blanca):** la banda blanca solo arranca cuando termina el esparcidor **más lento** de las tres rutas.

### Controles UI (defaults al abrir)

| Control | Default |
|---------|---------|
| Punto de inyección | `enc-all` (demo pintura) o `dosing-all` |
| Preset espesor | `observed-jun24` → **14,5 m/min** |
| Velocidad prensa (slider) | **14,5 m/min** |
| Velocidad reloj | **10×** |

### Presets de velocidad prensa

| ID | Etiqueta | m/min |
|----|----------|-------|
| `thick` | 36 mm | 7 |
| `observed-jun24` | 9 mm medido 24-jun | **14,5** (default) |
| `observed` | Observado 22-jun | 16,85 |
| `thin` | 9 mm ref. | 23 |

---

## Parámetros globales (HMI + receta)

| Clave | Etiqueta | Default | Origen |
|-------|----------|---------|--------|
| `_global:peso_manta` | Peso manta (báscula central) | **11,5** kg/m² | HMI 25-jun |
| `_global:F_SL` | Flujo SL (capa fina total) | **147,6** kg/min | HMI (69,5 + 78,1) |
| `_global:F_CL` | Flujo CL (core) | **118** kg/min | HMI 25-jun |
| `_global:pctSL1` | % SL1 del fino (BOTTOM) | **47,1** % | Receta (69,5 / 147,6) |
| `_global:pctSL2` | % SL2 del fino (TOP) | **52,9** % | Receta (78,1 / 147,6) |

Flujos derivados usados por el motor: `F_SL1 = F_SL × pctSL1` → **69,5 kg/min**; `F_SL2 = F_SL × pctSL2` → **78,1 kg/min**.

---

## Tabla completa de parámetros por etapa

| Clave | Nodo | Default | τ / t @ defaults | Origen | Req. | Notas |
|-------|------|---------|------------------|--------|------|-------|
| `mass:dosing-fine` | Dosing bin fina | **20** kg | τ ≈ **8,1 s** | HMI | Sí | `20 / 147,6 × 60` |
| `buffer:dosing-fine` | Dosing bin fina | 0 s | — | Manual | No | |
| `ret:enc-fine` | Encolador fina | **30** s | **30 s** | Estimado | Sí | Tiempo fijo; no depende de flujo |
| `buffer:enc-fine` | Encolador fina | 0 s | — | Manual | No | |
| `len:incl-fine` | Banda inclinada azul (fina) | **64,57** m | t ≈ **38,9 s** | Medido 25-jun | Sí | Una banda física; modelo bifurca en divisor |
| `speed:incl-fine` | Banda inclinada azul (fina) | **99,5** m/min | — | HMI (123,5 rpm) | Sí | No escala con v_prensa |
| `buffer:incl-fine` | Banda inclinada azul (fina) | 0 s | — | Manual | No | |
| — | **Divisor** | — | — | N/A | No | Sin τ ni longitud en motor |
| `mass:esp3-zone` | Esparcidor 3 (TOP) | **15** kg | τ ≈ **11,5 s** | HMI | Sí | `15 / 78,1 × 60` |
| `buffer:esp3-zone` | Esparcidor 3 | 0 s | — | Manual | No | |
| `mass:esp1-zone` | Esparcidor 1 (BOTTOM) | **12,5** kg | τ ≈ **10,8 s** | HMI | Sí | `12,5 / 69,5 × 60` |
| `buffer:esp1-zone` | Esparcidor 1 | 0 s | — | Manual | No | |
| `mass:dosing-thick` | Dosing bin gruesa | **25** kg | τ ≈ **12,7 s** | HMI | Sí | `25 / 118 × 60` |
| `buffer:dosing-thick` | Dosing bin gruesa | 0 s | — | Manual | No | |
| `ret:sprays-caida` | Sprays presión (caída) | **5** s | **5 s** | Estimado | No | Caída atomizada |
| `buffer:sprays-caida` | Sprays caída | 0 s | — | Manual | No | |
| `ret:enc-thick` | Encolador gruesa | **30** s | **30 s** | Estimado | Sí | Tiempo fijo; simétrico con fina |
| `buffer:enc-thick` | Encolador gruesa | 0 s | — | Manual | No | |
| `len:incl-thick` | Banda inclinada azul (gruesa) | **68,5** m | t ≈ **42,6 s** | Medido 25-jun | Sí | `68,5 / 96,5 × 60` |
| `speed:incl-thick` | Banda inclinada azul (gruesa) | **96,5** m/min | — | HMI (119 rpm) | Sí | No escala con v_prensa |
| `buffer:incl-thick` | Banda inclinada azul (gruesa) | 0 s | — | Manual | No | |
| `mass:esp2-zone` | Esparcidor 2 (CORE) | **40** kg | τ ≈ **20,3 s** | HMI | Sí | `40 / 118 × 60` |
| `buffer:esp2-zone` | Esparcidor 2 | 0 s | — | Manual | No | |
| `len:white` | Banda blanca → nariz #1 | **45** m | t ≈ **186 s** @ 14,5 | **Medido 30-jun** | Sí | Colchón + báscula + pre-prensa + nariz |
| `buffer:white` | Banda blanca | 0 s | — | Manual | No | |
| `len:red` | Banda roja | **10** m | t ≈ **41 s** @ 14,5 | **Medido 30-jun** | Sí | Sensor metales + Dynasteam |
| `buffer:red` | Banda roja | 0 s | — | Manual | No | |
| `len:press` | Banda prensa metálica | **16,6** m | t ≈ **69 s** @ 14,5 | Medido jun-2026 | Sí | Zona activa (19 marcos); 45 m total incluye retorno |

Tiempos de banda común en la tabla asumen **v_prensa = 14,5 m/min** (preset default). Cambian linealmente con el slider.

---

## Nodos sin parámetro editable (solo lógica visual)

| Nodo | Motivo |
|------|--------|
| Divisor fina | Bifurcación; no retiene material |
| Colchón / merge-point | Unión visual; downstream usa banda blanca |
| Salida prensa (`done`) | Fin de simulación |

---

## Cuándo usar cada tipo

- **Masa + flujo (`mass:*`)**: holdup medido en HMI o planta; τ se recalcula al cambiar flujo o receta.
- **τ fijo (`ret:*`)**: residencia que no escala con caudal (encoladores, sprays en caída).
- **Longitud + v_banda fija (`len:*` + `speed:*`)**: bandas inclinadas con velocidad propia en HMI.
- **Longitud + v_prensa (`len:*`)**: bandas mecánicamente acopladas a la prensa.
- **Buffer manual (`buffer:*`)**: ajuste operador por etapa; default 0.

---

## Qué medir en planta (prioridad)

1. **τ encoladores** fina y gruesa — validar o refinar los **30 s** estimados actuales.
2. **Holdup esparcidores** (`mass:esp*-zone`) — confirmar M en HMI a distintas recetas.
3. **Longitudes bandas inclinadas** — confirmar 64,57 m (fina) y 68,5 m (gruesa).
4. **τ sprays en caída** — si difiere de 5 s estimados.
5. **Tramo común** — blanca **45 m**, roja **10 m**, prensa **16,6 m** (medidos jun-2026; revisar si cambia layout).

---

## Schema UI (`getParameterSchema`)

Todos los parámetros de la tabla están en la pestaña **Parámetros**. Los badges (HMI, Receta, Medido, Estimado, Manual) reflejan `kindBadge` del schema. Botones **Guardar** / **Cargar** / **Defaults** persisten en `localStorage`.

---

## Demo pintura en planta

Prueba física: marcar **ambos encoladores** con pintura y seguir el cambio en el simulador.

1. En sidebar → **Demo pintura** (restaura defaults, t₀ = encoladores, reloj **30×**, prensa **14,5 m/min**).
2. En planta: aplicar pintura en encolador fina y gruesa al mismo tiempo → pulsar **Iniciar**.
3. Comparar ETA del simulador con observación real en nariz / prensa.

**ETA esperado @ 14,5 m/min (demo pintura, `enc-all`):**

| Tramo | Tiempo |
|-------|--------|
| Ruta más lenta hasta colchón (CORE) | ~93 s |
| Banda blanca (45 m) | ~186 s |
| Banda roja (10 m) | ~41 s |
| Banda prensa (16,6 m) | ~69 s |
| **Salida prensa** | **~389 s (~6,5 min)** |

El marcador en diagrama se muestra en **rosa** (clase `path-marker--paint`) cuando t₀ está en encolador.
