# Instructivo de descargas — Balanza

**Pasantía Novopan · 16 de junio de 2026**
**Fuente:** reunión con Alejandro (operador de balanza)
**Alcance:** primera y última etapa del proceso de descarga (entrada y salida de camiones en balanza). No cubre lo que pasa en el patio durante la descarga (eso es flujo separado en IFO).

---

## 1. Resumen ejecutivo

### Personas clave
- **Alejandro** — operador de balanza, fuente del proceso.
- **Christian Villalba** — ingeniero a cargo de la parametrización del QR forestal.
- **Daniel Sotalin** — contacto de EMASEO (recolección de residuos).
- **Carlos** — jefe que coordina por radio las descargas.

### Sistema y equipo
- **Sistema ANIME** — software de ingreso/balanza.
- **Balanza 2 (BPS2)** — exclusivamente **ENTRADA**.
- **Balanza 1 (PS1)** — exclusivamente **SALIDA**.
- Hoy una sola persona opera ambas balanzas (cuello de botella confirmado en turno tarde).

### Teclas del sistema ANIME
| Tecla | Función |
|---|---|
| `F4` | Captura peso automático desde balanza |
| `F12` | Confirma / siguiente paso |
| `F5` | Guarda ingreso y genera número de ingreso |

### Tipos de proveedor
1. **Propio** — haciendas de Pelikano/Edimca (ej. Cuchitinga, Chilibamba).
2. **Terceros** — el dueño del bosque vende.
3. **Transportista** — caso en que el mismo transportista factura.

### Rubros que se pagan en rollizo
1. Hacienda (dueña de la madera).
2. Transportista.
3. Servicio de explotación (mano de obra que cortó la madera).

### Tipos de carga que pasan por la balanza
| Tipo | Descripción | Tratamiento |
|---|---|---|
| **Rollizo** | Tronco completo | Flujo completo, muestra de humedad, 3 rubros |
| **Subproductos** | Chip, aserrín, viruta, recortes de carpinterías, recortes de tableros propios | Flujo completo, muestra de humedad en cada camión |
| **Combustibles** | DSL (diésel), GLP, resina | Solo peso de referencia para Bodega — no entran al sistema completo |
| **Reciclado** | Madera de carpinterías externas, recortes de tableros | Flujo completo |
| **Residuos** | Camión de EMASEO (basura municipal) | Flujo simplificado, registro en Google Drive compartido con ingeniero |

### Guías que entrega el camión
1. **Guía de madera**
2. **Guía de remisión**
3. **Guía de circulación** (forestal — exigida por el MAATE / Ministerio del Ambiente)

### QR forestal
- Sistema que prellena automáticamente la mayoría de campos en ANIME.
- Lo generan los proveedores al despachar.
- Contiene: código de bosque, código de transporte, código del cosechador, categoría, especie.
- **No funciona al 100% hoy** — algunos campos quedan vacíos. Christian Villalba está a cargo de terminar la parametrización.

### Muestra de humedad
- **Rollizo:** las primeras **5 muestras semanales** por proyecto → promedio que aplica al resto de la semana.
- **Subproductos:** se mide en **cada camión**.
- **Equipo:** analizador de humedad — pesa ~3.5 g, tarda **20–40 min** por muestra.
- Solo se registra humedad en salida cuando el destino es **patios externos** o cuando aplica al producto.

---

## 2. Instructivo paso a paso

### A. ENTRADA (Balanza 2)

1. **Llegada del camión** — se ubica en Balanza 2.
2. **Identificar el tipo de carga** (rollizo / subproducto / combustible / reciclado / residuo).
3. **Capturar peso de entrada:** presionar **`F4`** → ANIME registra automáticamente el peso desde la balanza.
4. **Recibir las guías:** guía de madera, guía de remisión y guía de circulación.
5. **Identificar al conductor:** cédula (o licencia).
6. **Ingreso de datos:**
   - Si **trae QR forestal** → escanear → ANIME prellena bosque, transporte, cosechador, categoría, especie.
   - Si **no trae QR** → llenar manualmente: placa, ubicación de descarga, proveedor, transportista, servicio de explotación, especie, categoría.
7. **Validación automática:** ANIME verifica que la guía no esté repetida (control anti-duplicado).
8. **Muestra de humedad** (si aplica):
   - Rollizo → solo las primeras 5 del proyecto en la semana.
   - Subproductos → cada camión.
9. **Asignar patio de descarga:** consultar el grupo de WhatsApp de patios (los proveedores avisan qué traen y dónde se descarga) y la hoja de rumas actualizada.
10. **Guardar ingreso:** presionar **`F5`** → ANIME genera el número de ingreso.
11. **Liberar el camión:** avanza a su patio asignado.

> **Restricción:** el camión NO puede pasar a descargar hasta que el ingreso esté generado. Esto cambió recientemente — antes se descargaba primero y se ingresaba después, lo que causaba problemas con guías duplicadas (camiones ya descargados que había que bajar de nuevo).

### B. SALIDA (Balanza 1)

1. **Llegada del camión** a Balanza 1.
2. **Identificar al camión:** pedir placa y cédula (o licencia).
3. **Buscar el ingreso** en ANIME por placa.
4. **Registrar la máquina/grúa que descargó:** campo "Operador" — ej. máquina 7.
5. **Capturar peso de salida:** presionar **`F4`**.
6. **Registrar humedad** (si aplica al destino — solo patios externos generalmente).
7. **Cerrar ingreso:** presionar **`F5`**.
8. **Entregar comprobante** al proveedor.

### C. Excepciones

| Caso | Procedimiento |
|---|---|
| **Combustibles (DSL/GLP/resina)** | Solo se pesa entrada y salida como referencia para Bodega. No se ingresa al flujo completo de ANIME. |
| **EMASEO (residuos)** | Flujo simplificado. Se registra en una hoja de Google Drive compartida con el ingeniero responsable. Contacto: Daniel Sotalin. |
| **Trasbordos** | El camión regresa a balanza por peso de salida adicional cuando descarga en otra máquina. |
| **Guía repetida** | ANIME rechaza el ingreso. El camión debe bajar y el proveedor debe reemitir la guía. |

### D. Manejo de la fila en hora pico

- **Turno 2 (14:00 onwards):** flujo más alto. Hoy la cola sale hasta fuera de la planta.
- Operando con una sola persona y una sola balanza activa, no es posible procesar el flujo sin demora.
- **Solución propuesta por Alejandro:** habilitar las **2 balanzas de entrada en simultáneo** con 2 personas durante el pico.

---

## 3. Oportunidades de mejora detectadas

| # | Mejora | Esfuerzo | Impacto |
|---|---|---|---|
| 1 | Operar **las 2 balanzas en simultáneo** en turno pico con 2 personas | Bajo | Alto — elimina la cola |
| 2 | Llevar el **QR forestal al 100%** (terminar parametrización con C. Villalba) | Medio | Alto — elimina ingreso manual |
| 3 | **Validar guía repetida antes del peso**, no después | Bajo | Medio — evita bajar camiones |
| 4 | Reemplazar **grupo de WhatsApp de patios** por integración directa proveedor → ANIME | Alto | Medio — reduce errores de asignación |
| 5 | Capturar **timestamps por sub-etapa** (entrada balanza, llegada patio, fin descarga, salida balanza) — separa espera / traslado / descarga real | Medio | Alto — resuelve "no sé dónde se perdió el tiempo" |
| 6 | **Paralelizar** medición de humedad (segunda máquina o método más rápido) | Medio | Medio |

---

## 4. Pendientes por validar con planta

- Confirmar la grafía exacta de "ANIME" (¿sigla? ¿nombre comercial?).
- Confirmar códigos de especie/categoría (ej. "GENTER" — posible mala transcripción).
- Confirmar con Christian Villalba: ¿el QR forestal es del SAF/MAATE o sistema propio?
- Confirmar capacidad real de la balanza y rangos del semáforo verde/amarillo/rojo.
