# Área — Encolados (Línea 1)

> Documento técnico del área. Fuentes: descripción inicial + recorrido técnico 2026-06-22 (Marco Villalba, Juan Carlos, Emanuel, supervisor de producción).
> Se le van añadiendo observaciones, mediciones, fotos y diagramas conforme avanza el proyecto.
>
> **Última actualización:** 2026-06-22

---

## Entrada del área

**Silos** cargados desde el área de preparación con dos calidades de partícula clasificada:

| Calidad | Destino | Características |
|---------|---------|-----------------|
| Fina | Capas externas (top + bottom) | Partícula más pequeña → mejor acabado superficial |
| Media (biruta + polvo) | Capa central (core) | Partícula más gruesa → da grosor y estructura |

---

## Etapas

### 1. Silos

Punto de entrada del área. Almacenan partícula fina y media por separado hasta que los dosing bins los demandan.

**Instrumentación:**

| Sensor | Tipo | Función |
|--------|------|---------|
| Ultrasónicos | Continuo | Nivel de material (insensibles al polvo); calibración por interpolación lineal 0–100 |
| Paletas on/off | Discreto | Mínimos y máximos como redundancia de seguridad ante falla del ultrasónico |

> _Pendiente documentar:_ capacidad de cada silo, cuántos silos por calidad, lógica de selección de silo activo.

---

### 2. Dosing bins + clasificación

Los dosing bins reciben la partícula desde los silos y descargan cantidad controlada hacia el encolador. Hay un bin por tipo de capa (interna fina, externa fina, media).

**Cálculo de descarga:**
- Combina **peso (kg)** en la celda de carga del bin con **velocidad de banda (m/min)** → flujo másico resultante.
- El setpoint de flujo lo comanda la báscula central (ver §Parámetros clave).

**Clasificación por rodillos moleteados:**
- Los rodillos tienen perfiles moleteados con profundidades entre **0.3 y 1.3 mm**.
- Función: separar finos de gruesos; garantizar que solo la partícula del tamaño correcto pase a cada línea de encolado.

> _Pendiente documentar:_ número de rodillos, tipo de accionamiento, criterio para ajustar profundidad de moleteado, flujo másico típico por capa.

---

### 3. Encolador + caja de dosificación

Dos líneas paralelas, una por tipo de capa. Cada línea mezcla la partícula con resina y parafina.

- **Línea capas externas:** dosifica partícula fina → mezcla con **resina + parafina**.
- **Línea capa media:** dosifica biruta + polvo → mezcla con **resina + parafina**.

**Función de cada químico:**
- **Resina (aglomerante):** se activa con calor en la prensa y une las partículas. Define la resistencia mecánica del tablero.
- **Parafina:** repelente de humedad. Reduce hinchamiento del tablero terminado (clave para MDP-RH).

**Control PID de dosificación (resina y parafina):**

Las bombas de resina y parafina trabajan en lazo cerrado PID:

| Variable PID | Descripción |
|---|---|
| SP (Set Point) | Objetivo de flujo (L/min) |
| PV (Process Value) | Medición real del flujómetro (electromagnético o Coriolis) |
| LMN | Señal de salida del controlador a la bomba |

**Estado observado (2026-06-22):** la línea azul (PV) nunca se estabiliza sobre la roja (SP) — oscilación persistente por retardos de señal y mala sintonía del lazo. En pantalla: sube, corrige, baja, corrige.

**Rango de operación recomendado para bombas:** **40–50 % de capacidad nominal** como punto de trabajo estable. Evitar 100 % sostenido (solo picos breves) — fuerza equipos y degrada el control.

**Instrumentación de dosificación:**

| Instrumento | Tipo | Función |
|---|---|---|
| Flujómetros electromagnéticos | Continuo | Miden L/min de resina y parafina |
| Coriolis ("pitómetro electromagnético") | Continuo | Integrado con lazo PID; mayor precisión |
| Sensores de presión con membrana | Continuo | Protegidos de medios agresivos; requieren limpieza periódica |

> _Pendiente documentar:_ tipo de resina (¿UF / MUF / PMDI?), dosificación g/kg de partícula, temperatura de la caja de mezcla, tiempos de residencia en el encolador, proveedor de resina/parafina.

---

### 4. Tres esparcidores (forming heads)

Depositan las partículas encoladas en orden sobre la banda formadora, armando el "mat" (colchón o mesa cruda):

```
          esparcidor 3  →  ▒▒▒▒▒▒▒▒▒▒▒▒  (capa fina superior — top)
          esparcidor 2  →  ████████████  (capa media — core, la más gruesa, biruta)
          esparcidor 1  →  ▒▒▒▒▒▒▒▒▒▒▒▒  (capa fina inferior — bottom)
                            ───────────  (banda formadora)
```

Resultado: sandwich **fino / medio / fino**. Las capas externas dan acabado, la media da estructura.

**Setpoint de proporción de capas:**

| Capa | Proporción objetivo |
|------|-------------------|
| Externas (top + bottom) | **30 %** del peso total |
| Central (core) | **70 %** del peso total |
| Reparto externo (top / bottom) | **53 % / 43 %** (⚠ verificar: 53+43=96 — confirmar si es 53/47 con transcripción) |

**Estado observado:** prueba de papel en 2026-06-22 muestra ~33 % externas cuando se pide 30 % → problema de pesaje dinámico real.

**Celdas de carga en esparcidoras:**
- **2 celdas por esparcidora** (izquierda / derecha), acopladas a un rodillo.
- Calibración estática OK (pesos patrón), pero en dinámico falla.
- Linealización típica: **3–20 mV → 0–20 kg**. El offset en mV con peso muerto determina el escalado y es difícil de establecer correctamente.

**Perfilómetro de densidad:**
- Instrumento que lee la densidad a lo largo del tablero después de los esparcidores.
- Evidencia anomalías puntuales de distribución (manchas de alta/baja densidad).
- Relacionado con la variación cíclica de peso detectada por la báscula central.

**Variable maestra — peso del colchón en banda:**
- La báscula central tiene **4 celdas de carga**.
- Es la realimentación maestra de dosificación de toda la línea.
- **No intervenir sin justificación técnica** — cualquier ajuste manual se propaga a todos los lazos aguas arriba.

> _Pendiente documentar:_ velocidad de banda, gramaje objetivo por m², mecanismo de distribución cruzada del esparcidor, ajuste mecánico de compuertas de cada esparcidor.

---

### 5. Preprensa hidráulica

Etapa entre los esparcidores y la prensa principal.

- **Presión:** ~**153 bar** (hidráulico).
- **Función:** compactar levemente el colchón para expulsar el aire atrapado entre las partículas antes de entrar a la prensa caliente.
- Sin preprensa, el aire atrapado genera defectos de presión interna al calentarse en la prensa principal.

> _Pendiente documentar:_ longitud de la preprensa, tiempo de residencia, temperatura (¿ambiente o calefaccionada?), marca/modelo.

---

### 6. Prensa caliente continua

Prensa larga de acero inoxidable. **Es el máster de la línea**: su velocidad determina el ritmo de toda la producción aguas arriba y aguas abajo.

**Parámetros de proceso observados (2026-06-22):**

| Variable | Valor observado |
|---|---|
| Temperatura de platos | **220 – 220 – 220 – 215 °C** (presión mayor a la entrada, menor a la salida) |
| Temperatura aceite térmico | ~**285 °C** |

**Principio:** el calor activa la resina y la presión compacta la mesa al espesor objetivo. La continuidad de la prensa permite producción sin paradas intermedias.

**⚠ Sistema de vapor:** fuera de servicio al 2026-06-22.

> _Pendiente documentar:_ marca/modelo (Siempelkamp / Dieffenbacher / Metso?), longitud de la prensa, presión específica (N/mm²), velocidad de prensado (m/min), factor de prensado (s/mm), espesor de entrada vs. salida del colchón.

---

### 7. Corte angular en movimiento

A la salida de la prensa, la sierra corta el tablero a la medida **mientras la banda sigue avanzando**.

- El corte es en ángulo (diagonal) para compensar la velocidad de avance de la banda y que el corte resulte perpendicular al tablero.
- **Sierras longitudinales:** sincronizan distancia y velocidad con la línea.
- Requieren calibración de **diagonales (ortoángulo)** para garantizar escuadría del tablero.

> _Pendiente documentar:_ formato de corte estándar (mm), tipo de sierra, mecanismo de sincronización (servo / leva), tolerancia de escuadría.

---

### 8. Enfriadoras tipo estrella (star coolers)

- Estructura: brazos rotativos en forma de estrella.
- Capacidad: **3 tableros simultáneos por estrella**.
- Movimiento: rotación de **180°** durante el ciclo.
- Enfriamiento: **tubos metálicos** que retiran calor por contacto directo.

**Por qué se rotan:** nivelar la temperatura entre ambas caras del tablero y dejar escapar el calor residual uniformemente — evita alabeo (warping) y desbalance de humedad interna.

> _Pendiente documentar:_ número total de estrellas, tiempo de residencia, temperatura de entrada/salida del tablero, velocidad de rotación.

---

### 9. Estacado (grouping)

Los tableros enfriados se agrupan y apilan. **Punto de salida del área de encolados.**

**Mecanismo de agrupamiento:**
- Agrupa tableros de **3 en 3**.
- Sensores ópticos (emisor–receptor) para conteo y detección de presencia.
- Sistema neumático para el apilado físico.

> _Pendiente documentar:_ altura de estaca estándar, tiempo de reposo antes de la siguiente área (lijado), control de calidad en este punto (espesor, densidad, defectos visuales).

---

## Parámetros clave del área

| Parámetro | Descripción | Setpoint | Estado actual |
|-----------|-------------|----------|---------------|
| **Tau** | Diferencia entre lo que suman las esparcidoras y lo demandado por la báscula central. Mide el balance global del sistema de formación. | **0** (pequeña oscilación alrededor) | **+5 constante** → desajuste persistente sin resolver (~medio año) |
| **Proporción capas** | Externas / central | 30 % / 70 % | ~33 % / 67 % (problema de pesaje dinámico) |
| **Peso colchón en banda** | Variable maestra de realimentación (báscula central, 4 celdas) | Según receta | Variación cíclica — sobreoscilaciones cuando se corrige |
| **Bombas resina/parafina** | Punto de trabajo | 40–50 % nominal | Oscilación persistente en PV |

---

## Instrumentación general del área

| Tipo | Aplicación | Notas |
|------|------------|-------|
| Ultrasónicos | Nivel en silos | Insensibles a polvo; calibración 0–100 lineal |
| Paletas on/off | Mín/máx silos como redundancia | |
| Celdas de carga | Peso en esparcidoras (×2/esparcidora) y báscula central (×4) | Calibración estática OK; dinámico con problemas |
| Flujómetros electromagnéticos | L/min resina/parafina | |
| Coriolis | Flujo másico resina (lazo PID) | |
| Sensores de presión con membrana | Líneas de dosificación | Protegidos; necesitan limpieza |
| Inductivos | Detección metales, pulsos de rotación banda/motores | |
| Ópticos (emisor–receptor) | Presencia, altura/espesor, conteo tableros | |
| Finales de carrera mecánicos | Respaldo a inductivos | |
| **Sensores de mariposa** | **Detección de taponamientos** (giro trabado = tapón) | Relacionados con los 4 taponamientos del 2026-06-22 |
| Perfilómetro de densidad | Lee densidad a lo largo del tablero post-esparcidores | Evidencia anomalías puntuales |

---

## Estado actual del sistema (2026-06-22)

**Tres frentes de problema simultáneos:**
1. **Esparcidoras** — distribución incorrecta (tau +5, capas fuera de setpoint).
2. **Dosificadoras** — consumos con oscilación persistente en lazos PID.
3. **Tau** — balance global fuera de cero desde hace ~medio año; a la espera del instructivo del fabricante para calibración mecánica y eléctrica.

**Sistema de vapor:** fuera de servicio.

**Incidente 2026-06-22 madrugada (~04:00):** 4 taponamientos consecutivos.
- Evento 1: causa raíz no determinada.
- Eventos 2 y 3: sensor de máximo marcó ~120 (límite ≤85, alarma a 130) pero la señal no llegó al controlador → no hubo parada.
- Evento 4: consecuencia de reinicios sucesivos; acumulación en transportador.
- Hipótesis: interlock aguas arriba/aguas abajo amplifica el problema (sin material aguas arriba → se detiene el envío → aguas abajo demanda más → al destaponarse, sobrealimentación → nuevo tapón).
- **Mala práctica detectada:** resetear fallas sin análisis → reenciende sobre condiciones no resueltas.

---

## Personas en esta área

| Rol | Nombre | Tema |
|-----|--------|------|
| Gerente de mantenimiento | Marco Villalba | Instrumentación, interlocks, incidentes |
| Gerente de producción | Juan Carlos | Indicadores, recetas, decisiones |
| Jefe de aglomerado | Emanuel | Operación diaria del área |
| Supervisor de producción | _por confirmar nombre_ | Línea y recorrido técnico |
| Control de calidad (Área 1) | _por confirmar_ | Laboratorio asociado |
| Jefe de producción | Jorge | Indicadores globales |
| Control de calidad | Franklin | Criterios de aceptación, densidad |

---

## Pendientes

### Datos para confirmar
- [ ] Split exacto externas: ¿53/47 o 53/43? (53+43=96, debe ser error)
- [ ] Cronología exacta del incidente de madrugada (alarmas: ¿2:52 o 3:00–3:30?)
- [ ] Nombre oficial del área en Novopan (¿"Encolados", "Línea de formación", otro?)
- [ ] Nombre del supervisor de producción del recorrido

### Datos técnicos por medir/documentar
- [ ] Capacidad y cantidad de silos por calidad de partícula
- [ ] Flujo másico típico por capa (kg/min)
- [ ] Marca/modelo de la prensa principal (Siempelkamp / Dieffenbacher / Metso?)
- [ ] Longitud de la prensa y factor de prensado (s/mm)
- [ ] Velocidad de línea actual (m/min)
- [ ] Espesor de entrada/salida del colchón en prensa
- [ ] Temperatura de entrada/salida del tablero en enfriadoras
- [ ] Formato de corte estándar (mm)

### Documentos que se esperan
- [ ] Transcripciones completas de los 3 audios del 2026-06-22 → `encolados/transcripts/`
- [ ] Instructivo del fabricante para calibración mecánica y eléctrica de esparcidoras

---

## Estructura de la carpeta

```
encolados/
├── PROCESO.md              ← este archivo (descripción técnica del flujo)
├── notas/                  ← notas de campo y resúmenes de reuniones
│   └── 2026-06-22-resumenes-reuniones.md
├── transcripts/            ← transcripciones completas de audios
└── technical-research/     ← investigación técnica externa (por crear)
```
