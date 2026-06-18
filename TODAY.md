# TODAY — Bitácora de cambios

> **Regla:** este archivo se actualiza **SIEMPRE** antes de cada `git push`. Sin excepción.
> Es el documento de contexto que se pega al inicio de un nuevo chat para que el asistente entienda en qué punto está la pasantía.

---

## Cómo usar este archivo

1. **Antes de pushear:** agregar una entrada nueva arriba del todo bajo "Historial".
2. **Formato:** fecha en `YYYY-MM-DD`, lista corta de qué cambió y por qué.
3. **Estado actual** se actualiza para que refleje SIEMPRE el punto donde está hoy la pasantía.

---

## Estado actual

**Fecha:** 2026-06-18
**Pasante:** Manuel Montúfar
**Supervisor:** Daniel Sotalin (Encargado del Sistema de Gestión / ISO).

**Objetivo activo:** documentar el proceso de **recepción de madera en balanza** en formato IJP ISO, dividido en tres documentos separados (Recepción, Descargas y Consumo, Inventario).

**Documento vigente:** `instructivos/IJP_Recepcion_v2.md` (borrador).

**Próximos pasos (orden de prioridad):**
1. Validar IJP-Recepción v2 con Alejandro (operador de balanza) y Daniel Sotalin.
2. Resolver los `[POR VALIDAR]` que quedan en el doc:
   - Sistema ANI: nombre oficial y si es ANI Sistemas (Brasil).
   - Medición de diámetro: instrumento real (cinta vs calibrador) y si se anota en ANI o solo hoja de campo.
   - WhatsApp de asignación de patios: oficializar canal.
   - QR forestal: confirmar con Christian Villalba si es del SAF/MAATE.
3. Empezar IJP **Descargas y Consumo** (Balanza 1 + grúa + Factory Track + ITMAD→PREMAD).
4. Empezar IJP **Inventario** (basado en RJP-05 del IJP Rev9 original).
5. Construir presentación HTML interactiva para guía de campo en tablet (audiencia: operadores rurales).

**Cosas que NO se han hecho aún:**
- IJP-Recepción v2 no se ha exportado a `.docx` con tablas visibles (script existe en `/tmp/build_ijp_docx.py` pendiente de ejecutar).
- No se ha validado con planta nada del v2 — todo es borrador.
- Falta sección 1 "PROPÓSITO Y ALCANCE" formal (el documento empieza en 2. DEFINICIONES).

---

## Contexto rápido (para pegar en chats nuevos)

- **Personas clave:**
  - **Alejandro** — operador de balanza (fuente principal del flujo de recepción).
  - **Daniel Sotalin** — encargado del Sistema de Gestión / ISO (jefe directo del pasante para el instructivo).
  - **Christian Villalba** — ingeniero a cargo de parametrización del QR forestal.
  - **Iván** — segundo jefe de producción (guía operativa).
  - **Carlos** — gerente de planta.
  - **Gabriel** — jefe de patios.
  - **Jorge** — jefe de producción.
  - **Franklin** — jefe de control de calidad.

- **Sistemas mencionados:**
  - **ANI** — sistema de balanza/recepción. Teclas: `F4` (peso), `F12` (confirmar), `F5` (guardar/generar n.º de ingreso).
  - **Factory Track** — consumo/inventario en patio (handheld con lector de barras).
  - **INFOR** — ERP/contable. Códigos de proveedor creados por Contabilidad.
  - **ITMAD** — almacén con ubicación física (ej. `P07001` = Patio 7 / ubicación 01).
  - **PREMAD** — almacén sin ubicación, vinculado a consumo.

- **Documentos de referencia (formato ISO de Novopan):**
  - **IJP Rev9** — instructivo original que estamos reemplazando por secciones.
  - **RJP-01** — Comprobante de peso.
  - **RJP-03** — Esquema de patios.
  - **RJP-05** — Inventario mensual.
  - **LEF-01** — Lista de precios y forma de pago.

- **Tipos de carga que entran por balanza:**
  1. Rollizo (tronco)
  2. Subproducto (chip, aserrín, viruta, lámina, jampa, retazo)
  3. Combustible (DSL, GLP, resina)
  4. Reciclado (madera externa, recortes de tableros)
  5. Residuo (camión EMASEO)

- **Tipos de proveedor:** Propio · Tercero · Transportista.

---

## Historial

### 2026-06-18 — Organización del repo
- Repo Git inicializado y estructurado en cuatro carpetas: `instructivos/`, `notas/`, `transcripciones/`, `presentaciones/`.
- Se agregaron `README.md` y este `TODAY.md`.
- Política definida: `TODAY.md` se actualiza obligatoriamente antes de cada push.
- Archivos subidos: 8 (IJP_Recepcion_v2 + 3 instructivos archivados + notas coherentes + 2 transcripciones + PPTX de presentación).

### 2026-06-16 — IJP-Recepción v2
- Versión v2 con tablas, fórmulas de humedad, definiciones completas (ruma, ton húmeda/seca, m³ estéreo/neto), códigos INFOR mencionados.
- Renumeración 4.1–4.15 corregida (eliminado gap 4.7 y duplicado 4.11).
- Sección 4.13 "Medición de diámetro" ampliada con cinta diamétrica, cm, hoja de campo + ANI.
- Sección 5.2 "Patios externos" concretada: anotar número de pase en comprobante.
- Sección 4.14 "Asignación de patio": grupo de WhatsApp marcado como `[POR VALIDAR]` (canal informal).
- Nota agregada al final de Sección 4: "La salida del camión por Balanza 1 se procesa según el IJP de Descargas y Consumo."

### 2026-06-16 — Reunión con Alejandro (balanza)
- 5 audios grabados durante la mañana en planta.
- Transcripciones automáticas con `whisper-small` (Spanish).
- Información nueva levantada: Balanza 1=salida / Balanza 2=entrada, teclas ANI, QR forestal, pase para Patapungo, aserrín pagado por peso+distancia, cola en turno tarde, EMASEO/Daniel Sotalin.
- Día 2 anexado al archivo `transcripciones_audio.md`.

### 2026-06-15 — Primera visita a planta
- 9 audios grabados durante el recorrido con Iván.
- Notas coherentes derivadas en `notas_coherentes_novopan.md`.
- Presentación PPTX de 15 slides creada (`presentaciones/presentacion_pasantia_novopan.pptx`).
- Mapeo del flujo completo: recepción → patios → pisos móviles → chipeadora → secado → clasificación → silos → encolado → prensa.

