# Línea 1 — Proceso completo (tableros de partículas MDP/MDP-RH)

> Documento vivo de mapa general de la Línea 1, de principio a fin.
> Cada área tiene su propia carpeta con detalle técnico, notas y transcripciones.
>
> **Última actualización:** 2026-06-22 — agregada el área de encolados.

---

## Mapa por áreas

| # | Área | Estado | Documentos |
|---|------|--------|------------|
| 1 | **Recepción de madera** (balanza, ANI, patios) | Documentado — semana anterior | [`instructivos/`](instructivos/), [`notas/`](notas/), [`transcripciones/`](transcripciones/) |
| 2 | **Preparación** (chipeado, secado, clasificación, silos) | Conecta recepción ↔ encolados | _(pendiente — la salida son los silos)_ |
| 3 | **Encolados** (silos → encolador → esparcidores → prensa → enfriadoras → estacado) | **Semana actual** | [`encolados/`](encolados/) |
| 4+ | Lijado, corte, acabado, despacho | Pendientes | _(por documentar)_ |

> **Nota:** el trabajo del área 1 (Recepción) es **independiente** del área 3 (Encolados). Comparten el repo pero no se mezclan los entregables.

---

## Área 1 — Recepción de madera

Toda la documentación entregable (IJP ISO, guías ANI, presentaciones) vive en la estructura actual del repo:

- [`instructivos/`](instructivos/) — IJPs formato ISO (IJP-REC-001 vigente)
- [`html-app/`](html-app/) — Guía interactiva NOVOPAN_Guia_Recepcion_Madera
- [`notas/`](notas/), [`transcripciones/`](transcripciones/), [`glossary/`](glossary/) — soporte
- [`TODAY.md`](TODAY.md) — bitácora general (estado de los entregables)

Ver [`README.md`](README.md) para reglas del repo y versionado de IJPs.

---

## Área 2 — Preparación (puente, parcialmente cubierto)

Entre la recepción de madera y los silos hay un proceso intermedio (chipeado, secado, clasificación) que aún no se ha documentado en detalle. Lo único que importa para encolados es la **salida**: los **silos** de partícula clasificada.

**Salida de esta área:**
- **Partícula fina** → capas externas del tablero.
- **Partícula media (biruta + polvo)** → capa central.

---

## Área 3 — Encolados (semana actual)

**Función:** convertir las partículas clasificadas en un tablero crudo prensado, enfriado y estacado.

**Detalle técnico completo en:** [`encolados/PROCESO.md`](encolados/PROCESO.md)

### Resumen del flujo

1. **Silos** — punto de entrada del área. Almacenan partícula fina y media por separado.

2. **Encolador + caja de dosificación** — dividido en dos líneas paralelas:
   - **Línea capas externas:** dosifica partícula fina y la mezcla con resina + parafina. Esta capa es más fina para dar mejor acabado superficial.
   - **Línea capa media:** dosifica biruta + polvo y los mezcla con resina + parafina. Es la capa estructural que da grosor.

   La parafina aporta resistencia a la humedad; la resina es el aglomerante que solidifica el tablero bajo calor y presión.

3. **Tres esparcidores (forming heads)** — depositan las partículas encoladas sobre la banda formadora, una encima de otra, armando la mesa cruda:
   - Esparcidor 1 → **capa fina inferior** (bottom)
   - Esparcidor 2 → **capa media** (core, la más gruesa, biruta)
   - Esparcidor 3 → **capa fina superior** (top)

   Resultado: una mesa en sandwich (fino / medio / fino) lista para prensar.

4. **Prensa caliente continua** — prensa larga de acero inoxidable. El calor activa la resina y la presión compacta la mesa al espesor objetivo. La continuidad de la prensa permite producción sin cortes intermedios.

5. **Corte angular en movimiento** — a la salida de la prensa, la sierra corta el tablero a la medida mientras la banda sigue avanzando; el corte es en ángulo (diagonal) para compensar la velocidad de avance.

6. **Enfriadoras tipo estrella (star coolers)** — estructuras rotativas grandes con brazos en forma de estrella. Cada estrella recibe **3 tableros a la vez**, los gira **180°** mientras tubos metálicos retiran el calor por contacto. El giro enfría ambas caras y nivela humedad interna evitando alabeo.

7. **Estacado** — los tableros enfriados se apilan. **Fin del área de encolados.**

### Salida del área

Pilas de tableros crudos enfriados, listas para las siguientes etapas (lijado, corte a medida, acabado).

---

## Áreas siguientes (pendientes de documentar)

- Lijado / calibración de espesor
- Corte a formato final
- Acabado superficial (melamínico, laminado)
- Despacho

Conforme se vayan visitando, se agregan carpetas en la raíz del repo siguiendo el patrón de `encolados/`.
