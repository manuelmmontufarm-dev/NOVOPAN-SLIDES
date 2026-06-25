# Parámetros de simulación — Línea 1

> Fuente de verdad del modelo: `js/core/process-graph.js` + `js/core/trace-engine.js`  
> **Mediciones de campo:** [`../../MEDICIONES_CAMPO.md`](../../MEDICIONES_CAMPO.md) — libro de números + **instrucciones para agentes AI**  
> Proceso físico: [`../../PROCESO.md`](../../PROCESO.md)  
> Persistencia local: clave `novopan-trazabilidad-params-v5` (localStorage)

## Modelo

La **velocidad prensa** (m/min) es la **única base** (reloj maestro) de toda la línea.  
- **Bandas acopladas** (blanca, roja, prensa) → `L ÷ v_prensa`.  
- **Bandas inclinadas** → `v_prensa × speedFactor` (van más rápido que la prensa pero **escalan** con ella; el factor es una calibración de una sola vez).  
- **Esparcidores** → τ fijo (estimación).

| Tipo | Uso en motor | Fórmula |
|------|--------------|---------|
| **τ (retención / buffer)** | Dosing bins, encoladores, esparcidores | Tiempo fijo en segundos |
| **Longitud + v_prensa** | Banda blanca → nariz, roja, prensa | `t_s = (m / v_prensa) × 60` |
| **Longitud + factor** | Bandas inclinadas (múltiplo de prensa) | `t_s = (m / (v_prensa × factor)) × 60` |
| **Mixto (τ + m)** | Esparcidores con banda interna | `t_s = τ + (m / v_prensa) × 60` |

### Calibración 24-jun-2026 (9 mm, 14,5 m/min) — t₀ = color en encolador

| Clave | Valor | Fuente |
|-------|-------|--------|
| `ret:enc-fine` / `ret:enc-thick` | **128 s** | Cronómetro 24-jun: residencia del encolador |
| `ret:dosing-fine` / `ret:dosing-thick` | 2 s | Estimado (antes de t₀ del cronómetro) |
| `ret:sprays-caida` | 5 s | Estimado (antes de t₀) |
| `len:incl-fine` + `factor:incl-fine` **6,62×** | 64 m / 40 s ciclo → 96 m/min ÷ 14,5 prensa | Planta 24-jun |
| `len:incl-thick` + `factor:incl-thick` **15,63×** | 68 m / 18 s ciclo → 226,67 m/min ÷ 14,5 prensa | Planta 24-jun |
| `len:white` | 29 m | 120 s @ 14,5 m/min → nariz |
| `ret:esp*-zone` | **12 s** | Despejado: 30 s observado − 18 s incl-thick = 12 s buffer |

### Cuándo usar cada uno

- **τ puro**: el proceso físico no depende de cuánto material pasa (mezcla química, hopper llenándose, spray de inyección a presión).
- **Longitud pura**: cinta transportadora mecánicamente acoplada a la prensa (banda blanca, roja, metálica de prensa).
- **Factor**: cinta que va a un múltiplo de la velocidad de prensa y escala con ella. Inclinada fina **6,62×**, gruesa **15,63×** (calibrados 24-jun con prensa a 14,5 m/min). `factor = v_banda_medida ÷ v_prensa_al_medir`.
- **Mixto**: equipo con buffer físico + sección de transporte interna (esparcidores: hopper se llena unos segundos, luego material recorre la banda interna a velocidad de prensa).

---

## Tabla completa de parámetros

| Clave | Nodo | Físico | Default | Medido / est. | Requerido | Notas |
|-------|------|--------|---------|---------------|-----------|-------|
| `ret:dosing-fine` | Dosing bin fina | Retención mínima en bin antes del encolador | 2 s | **Estimado** — antes de t₀ del cronómetro 24-jun | No | Medir cuando se cronometre dosing → encolador |
| `ret:enc-fine` | Encolador fina | Residencia (color añadido aquí → sale del encolador) | **128 s** | **Medido 24-jun** | Sí | Mismo valor que `enc-thick` por simetría |
| `len:incl-fine` | Banda inclinada azul (fina) | Transporte ↗ desde encolador fina hasta divisor | 10 m | **Por medir** | Sí | Una sola banda física; modelo la bifurca en divisor |
| `factor:incl-fine` | Banda inclinada azul (fina) | Velocidad relativa a prensa | **6,62×** | **Calibrado 24-jun** (96 ÷ 14,5) | No | v_banda = v_prensa × 6,62. Editable en panel. |
| — | **Divisor** | Bifurca flujo fino → Esp.3 (TOP) / Esp.1 (BOTTOM) | — | N/A | No | Sin τ ni longitud en motor |
| `ret:esp3-zone` | Esparcidor 3 (TOP) | Buffer + transporte interno | **12 s** | **Derivado 24-jun** (por simetría) | Sí | Capa externa superior — medir individualmente cuando se pueda |
| `ret:esp1-zone` | Esparcidor 1 (BOTTOM) | Buffer + transporte interno | **12 s** | **Derivado 24-jun** (por simetría) | Sí | Capa externa inferior |
| `ret:dosing-thick` | Dosing bin gruesa | Retención antes del encolador | 2 s | **Estimado** — antes de t₀ | No | Igual que `dosing-fine` |
| `ret:sprays-caida` | Sprays presión (caída) | Mezcla resina + agua + endurecedor en caída | 5 s | **Estimado** — antes de t₀ | No | Ocurre antes del color añadido al encolador |
| `ret:enc-thick` | Encolador gruesa | Residencia (color añadido aquí → sale del encolador) | **128 s** | **Medido 24-jun** | Sí | t₀ del cronómetro 24-jun |
| `len:incl-thick` | Banda inclinada azul (gruesa) | Transporte ↗ hacia Esparcidor 2 | 68 m | **Medido 24-jun** | Sí | 68 m / 18 s = 226,67 m/min con prensa a 14,5 |
| `factor:incl-thick` | Banda inclinada azul (gruesa) | Velocidad relativa a prensa | **15,63×** | **Calibrado 24-jun** (226,67 ÷ 14,5) | No | v_banda = v_prensa × 15,63. Editable en panel. |
| `ret:esp2-zone` | Esparcidor 2 (CORE) | Buffer + transporte interno | **12 s** | **Derivado 24-jun**: 30 s − 18 s = 12 s | Sí | ~70 % peso total del tablero |
| `len:white` | Banda blanca → nariz #1 | Colchón 3 capas + pre-prensa + nariz #1 | 29 m | **Derivado 24-jun**: 120 s × 14,5 / 60 | Sí | Tramo acoplado a prensa |
| `len:red` | Banda roja | Sensor metales + Dynasteam | 27,43 m | **Medido** (campo jun-2026) | Sí | Validado en documentación |
| `len:press` | Banda prensa metálica | Zona activa de prensado (19 marcos) | 16,6 m | **Medido** (campo jun-2026) | Sí | 45 m total incluye retorno; simulación usa zona activa |

---

## Nodos sin parámetro en panel (τ = 0 / solo transporte)

| Nodo | Motivo |
|------|--------|
| Caídas por gravedad (sin `retentionSec`) | Paso instantáneo en motor si τ = 0 |
| Divisor fina | Punto de bifurcación; no retiene material |
| Colchón / merge-point | Punto lógico de unión visual; downstream usa banda blanca |
| Salida prensa (`done`) | Fin de simulación |

---

## Qué medir en planta (prioridad)

1. **τ encoladores** fina y gruesa — cronometrar tablero de prueba o marca desde inyección hasta salida encolador.
2. **Esparcidores — split buffer / banda interna**: para cada esparcidor cronometrar a **dos** velocidades de prensa distintas (ej. 16.85 y 7 m/min). Con dos puntos se despeja `τ_buffer` y `L_interna`: el τ es la parte que NO cambia al variar la velocidad, el resto se divide por la velocidad para sacar metros.
3. **Factor bandas inclinadas** — medir velocidad de la inclinada (fina y gruesa) en m/min y dividir entre velocidad de prensa al medir. Calibrado 24-jun: fina 96/14,5 = 6,62×, gruesa 226,67/14,5 = 15,63×. Recalibrar solo si cambia el ratio motor-inclinada vs prensa.
4. **τ sprays en caída** — si aplica retención distinta a la estimada (5 s).
5. **Longitudes bandas azules inclinadas** (fina y gruesa) en metros.
6. **Longitud banda blanca** — único tramo común aún estimado (38 m).

---

## Schema UI (`getParameterSchema`)

Todos los parámetros de la tabla anterior están expuestos en el panel lateral. Los badges **medido** / **est.** / **τ** reflejan `validated` y `type` del schema.
