# Línea 1 — Proceso completo (tableros de partículas MDP/MDP-RH)

> Documento vivo de mapa general de la Línea 1, de principio a fin.  
> **Última actualización:** 2026-06-22 — reorganización repo en Parte 1 / Parte 2.

---

## División del repositorio

| Parte | Áreas de planta | Carpeta |
|-------|-----------------|---------|
| **Parte 1 — Preparación de madera** | Recepción, patios, balanza → salida hacia silos | [`parte-1-preparacion-madera/`](parte-1-preparacion-madera/) |
| **Parte 2 — Aglomerados** | Silos → encolados → prensa → estacado | [`parte-2-aglomerados/`](parte-2-aglomerados/) |
| **Compartido** | Glosario, roles, sistemas, pendientes | [`_compartido/`](_compartido/) |

**Corte:** Parte 2 empieza en los **silos** (entrada de partícula clasificada). Parte 1 termina ahí.

---

## Mapa por áreas

| # | Área | Estado | Documentos |
|---|------|--------|------------|
| 1 | **Recepción de madera** (balanza, ANI, patios) | Documentado — cerrado 19-jun | [`parte-1-preparacion-madera/instructivos/`](parte-1-preparacion-madera/instructivos/), [`notas/`](parte-1-preparacion-madera/notas/), [`transcripciones/`](parte-1-preparacion-madera/transcripciones/) |
| 2 | **Preparación** (chipeado, secado, clasificación → silos) | Puente — pendiente detalle | _(solo mapa; salida = silos)_ |
| 3 | **Encolados / aglomerados** (silos → estacado) | **Semana actual** | [`parte-2-aglomerados/encolados/`](parte-2-aglomerados/encolados/) |
| 4+ | Lijado, corte, acabado, despacho | Pendientes | _(por documentar)_ |

> Las Partes 1 y 2 comparten repo pero **no se mezclan entregables**.

---

## Área 1 — Recepción de madera (Parte 1)

- [`parte-1-preparacion-madera/instructivos/`](parte-1-preparacion-madera/instructivos/) — IJP-REC-001 vigente
- [`parte-1-preparacion-madera/html-app/`](parte-1-preparacion-madera/html-app/) — Guía interactiva
- [`parte-1-preparacion-madera/notas/`](parte-1-preparacion-madera/notas/), [`transcripciones/`](parte-1-preparacion-madera/transcripciones/), [`../_compartido/glossary/`](../_compartido/glossary/) — soporte
- [`TODAY.md`](TODAY.md) — bitácora general

Ver [`README.md`](README.md) y [`00_Index.md`](00_Index.md).

---

## Área 2 — Preparación (puente, parcialmente cubierto)

Entre recepción y silos: chipeado, secado, clasificación — **sin IJP detallado aún**.

**Salida hacia Parte 2:**
- **Partícula fina** → capas externas del tablero.
- **Partícula media (biruta + polvo)** → capa central.

---

## Área 3 — Encolados / aglomerados (Parte 2)

**Función:** convertir partículas clasificadas en tablero crudo prensado, enfriado y estacado.

**Detalle:** [`parte-2-aglomerados/encolados/PROCESO.md`](parte-2-aglomerados/encolados/PROCESO.md)  
**Base conocimiento:** [`parte-2-aglomerados/encolados/BASE_INFO_ENCOLADOS.md`](parte-2-aglomerados/encolados/BASE_INFO_ENCOLADOS.md)  
**Deck:** [`parte-2-aglomerados/deck/Encolados.dc.html`](parte-2-aglomerados/deck/Encolados.dc.html)

### Resumen del flujo

1. **Silos** — entrada del área.
2. **Encolador + dosificación** — capas externas (fina) y media (biruta+polvo), resina + parafina.
3. **Tres esparcidores** — sandwich fino / medio / fino.
4. **Prensa caliente continua**
5. **Corte angular en movimiento**
6. **Enfriadoras estrella** — 3 tableros, giro 180°
7. **Estacado** — fin del área de aglomerados.

---

## Áreas siguientes (pendientes)

Lijado, corte final, acabado, despacho — nuevas carpetas bajo `parte-2-aglomerados/` o futuras partes siguiendo el mismo patrón.
