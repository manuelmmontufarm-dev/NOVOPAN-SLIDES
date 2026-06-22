# Área — Encolados (Línea 1)

> Documento técnico del área. Se le van añadiendo observaciones, mediciones, fotos y diagramas conforme avanza el proyecto.

## Entrada del área

**Silos** cargados desde el área de preparación con dos calidades de partícula clasificada:

| Calidad | Destino | Características |
|---------|---------|-----------------|
| Fina | Capas externas (top + bottom) | Partícula más pequeña → mejor acabado superficial |
| Media (biruta + polvo) | Capa central (core) | Partícula más gruesa → da grosor y estructura |

---

## Etapas

### 1. Encolador + caja de dosificación

Dos líneas paralelas, una por tipo de capa:

- **Línea capas externas:** dosifica partícula fina → entra al encolador → se mezcla con **resina + parafina**.
- **Línea capa media:** dosifica biruta + polvo → entra al encolador → se mezcla con **resina + parafina**.

**Función de cada químico:**
- **Resina (aglomerante):** se activa con calor en la prensa y une las partículas. Define la resistencia mecánica del tablero.
- **Parafina:** repelente de humedad. Reduce hinchamiento del tablero terminado (clave para MDP-RH).

> _Pendiente documentar:_ tipo de resina (¿UF / MUF / PMDI?), dosificación g/kg, temperatura de la caja, control de la mezcla, proveedor.

---

### 2. Tres esparcidores (forming heads)

Depositan las partículas encoladas en orden, sobre una banda transportadora, armando el "mat" (mesa cruda):

```
          esparcidor 3  →  ▒▒▒▒▒▒▒▒▒▒▒▒  (capa fina superior — top)
          esparcidor 2  →  ████████████  (capa media — core, la más gruesa, biruta)
          esparcidor 1  →  ▒▒▒▒▒▒▒▒▒▒▒▒  (capa fina inferior — bottom)
                            ───────────  (banda formadora)
```

Sandwich resultante: **fino / medio / fino**. Las capas externas dan acabado, la media da estructura.

> _Pendiente documentar:_ espesor de cada capa, velocidad de banda, distribución cruzada, gramaje por m².

---

### 3. Prensa caliente continua

- Construcción: **acero inoxidable**, muy larga (continuous press).
- Calor activa la resina; presión compacta la mesa al espesor objetivo.
- Producción continua sin paradas para cargar/descargar.

> _Pendiente documentar:_ marca/modelo, temperatura de platos, presión específica (N/mm²), velocidad de prensado, espesor de entrada vs. salida, factor de prensado (s/mm).

---

### 4. Corte angular en movimiento

A la salida de la prensa, la sierra corta el tablero a la medida **mientras la banda sigue avanzando**, por eso el corte es en ángulo (diagonal) — compensa la velocidad de avance para que el corte resulte perpendicular al tablero.

> _Pendiente documentar:_ formato de corte estándar, tipo de sierra, mecanismo de sincronización (servo / leva).

---

### 5. Enfriadoras tipo estrella (star coolers)

- Estructura: brazos rotativos en forma de estrella, varias unidades.
- Capacidad: **3 tableros simultáneos por estrella**.
- Movimiento: rotación de **180°** durante el ciclo.
- Enfriamiento: **tubos metálicos** retiran calor por contacto.

**Por qué se rotan:** la rotación nivela la temperatura entre ambas caras del tablero y permite que el calor residual escape uniformemente, evitando alabeo (warping) y desbalance de humedad.

> _Pendiente documentar:_ tiempo de residencia, temperatura entrada/salida, número total de estrellas, velocidad de rotación.

---

### 6. Estacado

Los tableros enfriados se apilan en estacas. **Punto de salida del área de encolados.**

> _Pendiente documentar:_ altura de estaca estándar, tiempo de reposo antes de la siguiente área, control de calidad en este punto (espesor, densidad, defectos visuales).

---

## Personas a contactar en esta área

> _Pendiente confirmar (probable: Iván — segundo jefe de producción; Jorge — jefe de producción; Franklin — control de calidad)._

| Rol | Nombre | Tema |
|-----|--------|------|
| Operador de encolador | _por confirmar_ | Dosificación, mezcla |
| Operador de prensa | _por confirmar_ | Setpoints, paradas |
| Control de calidad | Franklin (?) | Criterios de aceptación |
| Jefe de producción | Jorge | Indicadores globales |

---

## Pendientes generales

- [ ] Diagrama de flujo con cotas y velocidades reales
- [ ] Fotos de cada etapa
- [ ] Identificar puntos críticos de control (CCPs ISO)
- [ ] Medir variables clave (temperatura, presión, humedad, tiempo de ciclo)
- [ ] Definir el alcance del proyecto que se va a trabajar en esta área (¿IJP por etapa? ¿guía visual estilo recepción?)

## Estructura de la carpeta

```
encolados/
├── PROCESO.md          ← este archivo (descripción técnica del flujo)
├── notas/              ← notas de campo, observaciones diarias
└── transcripts/        ← transcripciones de conversaciones con operadores
```
