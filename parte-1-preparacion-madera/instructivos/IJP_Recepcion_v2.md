# IJP — RECEPCIÓN DE MADERA Y SUBPRODUCTOS

**Documento:** IJP-Recepción v2 (borrador)
**Reemplaza:** sección "Recepción y registro en balanza" del IJP Rev9
**Fecha:** 16 de junio de 2026
**Aplica a:** operadores de balanza, ayudante de patios, supervisor de preparación de madera

---

## 2. DEFINICIONES

- **Balanza 2 (BPS2):** balanza camionera dedicada al ingreso de camiones.
- **Balanza 1 (PS1):** balanza camionera dedicada a la salida de camiones.
- **Sistema ANI:** sistema informático donde se registra el ingreso, el peso y todos los datos del embarque.
- **QR forestal:** código de barras bidimensional generado por el proveedor desde su aplicativo. Contiene los datos del bosque, transporte, cosechador, categoría y especie.
- **Guía de circulación:** documento forestal obligatorio para transportar madera (exigido por el MAATE).
- **Guía de madera:** documento del proveedor con la descripción del producto despachado.
- **Guía de remisión:** documento tributario que ampara el traslado del material.
- **RJP-01:** Comprobante de peso (formato del sistema ANI).
- **LEF-01:** Lista de precios y forma de pago autorizada por Gerencia.
- **Patio interno:** patios ubicados en la planta.
- **Patio externo:** patios ubicados en Patapungo (requieren pase de control).
- **Ruma** — apilamiento de madera formando una unidad.
- **Tonelada húmeda** — 1000 kg de madera húmeda, medida con balanza camionera.
- **Tonelada seca** — 1000 kg de madera sin humedad (calculada con humedad de balanza analítica).
- **Metro cúbico estéreo** — largo × ancho × altura.
- **Metro cúbico neto** — m³ estéreo × factor de apilamiento.

$$\% \text{Humedad} = \left( \frac{\text{Peso inicial húmedo} - \text{Peso final seco}}{\text{Peso final seco}} \right) \times 100$$

$$\text{Peso seco} = \frac{\text{Peso húmedo}}{\left( \frac{\% \text{Humedad}}{100} \right) + 1}$$

---

## 3. RESPONSABILIDAD Y AUTORIDAD

| Rol | Responsabilidad principal |
|---|---|
| Operador de balanza | Recibir el camión, capturar el peso, registrar el ingreso en ANI, tomar la muestra de humedad cuando corresponda. |
| Ayudante de balanza | Apoyo al operador en horas pico y en toma de muestras. |
| Supervisor de preparación de madera | Verificar el cumplimiento del instructivo, autorizar excepciones, atender fuerza mayor. |
| Jefe de Patios | Definir el esquema diario de patios y aprobar la asignación de rumas. |
| Departamento Forestal | Mantener LEF-01 y autorizar precios. |
| Encargado de Sistema de Gestión (Daniel Sotalin) | Mantener este IJP actualizado y asegurar trazabilidad ISO. |

*La creación de códigos INFOR la realiza el Departamento Contable. Recepción de Madera recibe, agrupa la información y traslada los datos de proveedores.*

---

## 4. ACTIVIDADES — PASO A PASO

### 4.1 Llegada del camión

1. El camión entra y se ubica en Balanza 2.
2. El operador identifica el tipo de carga:
   - Rollizo (tronco)
   - Subproducto (chip, aserrín, viruta, lámina, jampa, retazo)
   - Combustible (DSL, GLP, resina)
   - Reciclado (madera externa, recortes de tableros)
   - Residuo (camión EMASEO)
3. Si la carga es un caso especial (combustible, residuo, trasbordo), continuar en la Sección 5 — Excepciones.

### 4.2 Captura del peso de entrada

1. Verificar que la balanza muestre cero y que el camión esté totalmente sobre la plataforma.
2. Presionar `F4` en ANI → captura automática del peso de entrada.
3. Verificar visualmente que el peso capturado coincida con el que muestra la balanza.

### 4.3 Recepción de documentos

Solicitar al conductor los documentos según el tipo de proveedor:

| Tipo de proveedor | Documentos |
|---|---|
| Propio — madera rolliza | Guía de circulación forestal + Guía de madera + Guía de remisión |
| Tercero — madera rolliza | Solo Guía de circulación forestal |
| Subproductos de terceros | Documentos según normativa + factura para el Departamento de Contabilidad |

**Para aserrín**, solicitar también la fotografía geolocalizada del punto más lejano donde se realizó la carga. Esta imagen se archiva en la oficina de balanza como parte del control documental y se guarda con el nombre del número de entrada.

### 4.4 Identificación del conductor

1. Si el camión va a patio externo (Patapungo), retener la cédula y entregar el pase de control. (Ver Sección 5.2.)

### 4.5 Ingreso de datos al sistema ANI

**Opción A — el camión trae QR forestal:**
1. Escanear el QR con el lector.
2. ANI prellena automáticamente: bosque, transporte, cosechador, categoría y especie.
3. **Revisar los campos prellenados.** Si alguno está vacío o incorrecto, completarlo manualmente.

**Opción B — el camión NO trae QR forestal:**
1. Llenar manualmente en ANI:
   - Placa del vehículo
   - Proveedor
   - Transportista
   - Servicio de explotación (mano de obra)
   - Especie
   - Categoría
   - Ubicación de descarga
2. Aplica sobre todo a proveedores terceros (eucalipto, pino, ciprés).

### 4.6 Validación de guía

1. ANI verifica automáticamente que la guía no esté duplicada en el sistema. Se verifica que no sea duplicada antes de dejar entrar.
2. Si ANI rechaza la guía:
   - Informar al conductor.
   - El camión debe salir de la balanza.
   - El proveedor debe reemitir una nueva guía.
   - No se permite descarga con guía repetida.

### 4.7 Muestreo de humedad

Tomar muestra según la siguiente frecuencia:

| ROLLIZO | # MUESTRAS/SEMANA |
|---|---|
| PROYECTO NUEVO (AL MENOS 10 SEGUIDAS O EL MÍNIMO DE UNA SEMANA CALENDARIO) | 10 |
| PROYECTO ANTIGUO (> DE 1 SEMANA) | 5 |
| TERCEROS CONTÍNUAS | 5 |
| TERCEROS OCASIONALES (1 DE 5 VEHÍCULOS) | 20% |
| SUBPRODUCTOS Y TODA LA MADERA QUE SE PAGUE EN SECO | 100% |
| Subproductos CHIP se toma muestras para realizar el análisis de porcentaje de corteza | 100% |

Si el bosque o el producto lo requiere, se puede muestrear con mayor frecuencia (criterio del supervisor).

### 4.8 Método de toma de muestra

**Para madera rolliza:**
1. Punto de muestreo: a 0,6 m del extremo de la troza, o al ¼ de su longitud.
2. Escoger un diámetro promedio representativo.
3. Obtener viruta con el taladro y broca de ½".

**Para chip y aserrín:**
1. Tomar tres muestras durante la descarga: al inicio, a la mitad y al final.
2. Homogeneizar las tres en una sola muestra.
3. Colocar la muestra en una funda etiquetada y llevarla al secadero.

**Para tablero, jampa, retazo y contaminado:**
1. Obtener viruta de tres piezas diferentes.
2. Unificar la viruta en una sola funda identificada.

### 4.9 Distribución de toma de muestras

| Ubicación | Tipo de material |
|---|---|
| Balanza | Madera rolliza de proveedores propios |
| Patio 5 | Madera rolliza de terceros y subproductos |

| No | Personal | Actividad | Ubicación |
|---|---|---|---|
| 1 | Operador de balanza | Muestra de madera rolliza propios | Oficina balanza |
| 1 | Operador de balanza / ayudante inventario | Muestra de madera rolliza terceros y subproductos | Patio 5 (se recibe la muestra) y Control Room Secadero 2 (se hace la prueba de humedad) |
| 1 | Supervisor de secadero | Muestra de madera rolliza terceros y subproductos | Patio 5 (se recibe la muestra) y Control Room Secadero 2 (se hace la prueba de humedad) |

### 4.10 Análisis en balanza analítica

Parámetros de calibración:

| Parámetro | Valor |
|---|---|
| Temperatura | 125 °C |
| Peso de muestra | 2,5 – 3,5 g |
| Desconexión | 1/20 mg/s |

Tiempo aproximado de análisis: **20 a 40 minutos** por muestra.

1. Colocar la muestra en la balanza analítica.
2. Iniciar el análisis.
3. Esperar hasta que el equipo muestre el resultado final.

### 4.11 Etiquetado y registro de la muestra

Cada muestra debe identificarse con una etiqueta. El contenido y la forma de la etiqueta dependen del lugar donde se tomó la muestra.

**A. En balanza (madera rolliza de proveedores propios)**

1. El sistema ANI imprime la etiqueta con los siguientes campos:
   - Ítem
   - Fecha
   - Número de ingreso
   - Placa
   - Humedad
   - Especie
   - Instrumento de obtención de muestra
2. Tomar fotografía del resultado mostrado en la balanza analítica junto con la etiqueta impresa.
3. Archivar la fotografía como parte del control documental y guardarla con el nombre del número de ingreso.

**B. En Patio 5 (madera rolliza de terceros y subproductos)**

1. Llenar la etiqueta manualmente con los siguientes campos:
   - Ítem
   - Número de ingreso
   - Placa del vehículo
   - Producto
2. Entregar la etiqueta al transportista.
3. La prueba de humedad se realiza en el Control Room del Secadero 2 (ver 4.9).

**C. Registro digital del resultado**

Independientemente del lugar de muestreo, registrar el resultado de humedad en el archivo compartido:

> *"14 % HUMEDADES DE INGRESO-REVXX"*
> Ubicación: carpeta `PRODUCCIÓN` del OneDrive del Control Room del Secadero 2.

### 4.12 Cuando el análisis demora más que el camión

1. Si el análisis de humedad excede el tiempo de permanencia del vehículo, registrar la salida del camión normalmente y dejar el campo de humedad pendiente.
2. Una vez obtenido el resultado, ingresar manualmente el porcentaje en ANI buscando por número de ingreso o placa.

### 4.13 Medición de diámetro

La medición de diámetro se hace junto con el muestreo de humedad de la madera rolliza (4.7 y 4.8).

**Cuándo:** después de tomar la muestra de humedad y antes de cerrar el ingreso.

**Dónde:** sobre un área representativa de **1 m²** del total de la carga.

**Cómo:**

1. Identificar un cuadro de 1 m² sobre las trozas expuestas en el camión que represente la mezcla de la carga.
2. Medir el diámetro de **cada troza** que entra en ese metro cuadrado, **separando por especie**.
3. Para cada troza:
   - Usar **cinta diamétrica** (cinta π) sobre la cara expuesta del corte. *[POR VALIDAR — confirmar si en planta usan cinta diamétrica, calibrador forestal o regla]*
   - Tomar el diámetro al centro de la troza, evitando nudos y deformaciones.
4. Registrar los diámetros en **cm**, con un decimal de precisión.
5. Calcular el **diámetro promedio por especie** dividiendo la suma de los diámetros entre el número de trozas medidas.

**Dónde se anota:**

1. Anotar primero en la hoja de campo de balanza junto con el número de ingreso.
2. Transcribir al sistema ANI en el campo correspondiente al número de ingreso. *[POR VALIDAR — confirmar si el campo de diámetro existe en ANI o si se registra solo en hoja de campo]*

### 4.14 Asignación del patio

1. Consultar la hoja de rumas actualizada y el esquema de patios (**RJP-03**) para el tipo de material.
2. Indicar al conductor el patio asignado.

> *[POR VALIDAR — el grupo de WhatsApp usado hoy para confirmar dónde descargar es un canal informal. Debe oficializarse o reemplazarse por un canal documentado para cumplir con la trazabilidad ISO.]*

### 4.15 Cierre del ingreso

1. Presionar `F12` para confirmar.
2. Presionar `F5` para guardar el ingreso → ANI genera el número de ingreso.
3. Entregar el comprobante (RJP-01) al conductor.
4. Liberar el camión hacia su patio.

> **Importante:** el camión NO puede pasar a descargar hasta que el número de ingreso esté generado.

---

> **La salida del camión por Balanza 1 se procesa según el IJP de Descargas y Consumo.**

---

## 5. EXCEPCIONES

### 5.1 Aserrín
- Único subproducto que se paga por peso Y por distancia.
- Tomar muestra de humedad en cada camión (subproducto = 100 %).
- Registrar la distancia del origen para el cálculo del pago.

### 5.2 Patios externos (Patapungo)

**En la entrada:**
1. Retener la cédula del conductor.
2. Entregar un pase de control.
3. El conductor presenta el pase en el control de arriba (camino hacia haciendas).
4. **Anotar en el comprobante de ingreso el número del pase entregado al conductor**, para reconciliarlo a la salida.

**En la salida:**
1. Devolver la cédula a cambio del pase.
2. Registrar humedad (obligatorio en patio externo).

### 5.3 Combustibles (DSL / GLP / resina)
- Solo se pesa entrada y salida como referencia para Bodega.
- No entra al flujo completo de ANI.
- La compra/pago la maneja directamente Bodega.

### 5.4 Residuos (camión EMASEO)
- Flujo simplificado.
- Registrar el peso de entrada y salida en la hoja de Google Drive compartida con el Encargado de Sistema de Gestión.
- No genera número de ingreso en ANI.

### 5.5 Reciclado
- Flujo completo de ANI como subproducto.
- Material destinado a biomasa o trituración, no a la receta principal.

### 5.6 Trasbordo
- Cuando el camión descarga en más de una máquina, debe regresar a balanza por un peso de salida adicional.
- Registrar la máquina que descargó cada parte.

### 5.7 Guía repetida / caducada / inválida
- ANI rechaza el ingreso automáticamente.
- Bajar el camión y pedir guía nueva al proveedor.

### 5.8 Cola en hora pico (turno 2 — desde las 14:00)
- Si la fila pasa al exterior de la planta, habilitar las dos balanzas de entrada en simultáneo con **dos personas**.

### 5.9 Fuerza mayor

**Si no se puede registrar en el sistema ANI:**
1. Anotar manualmente en el documento secuencial con todos los datos del embarque.
2. Regularizar el ingreso en ANI tan pronto se recupere el sistema.

**Si no se puede pesar el camión a la salida (daño de balanza) o daño mecánico del vehículo antes de salir:**
1. Usar el peso vacío histórico del sistema por placa.
2. Si no existe, usar la capacidad de carga de un vehículo similar.
3. Personal de Seguridad o el Supervisor puede verificar pesos y anotar en documento independiente.

---

## 6. EQUIPOS Y MATERIALES

| BALANZA | PATIO 5 / Control Room Secadero 2 |
|---|---|
| Taladro marca DEWALT (D25133-B3) | Taladro marca BOSCH (GSB 180-LI) |
| 1 BROCA ½" | 2 BROCAS ½" |
| 3 BALANZAS ANALÍTICAS | 2 BATERÍAS |
| SE ALMACENA EN OFICINA BALANZA | 7 BALANZAS ANALÍTICAS |
| | SE ALMACENA EN OFICINA DESCORTEZADOR |

---

## 7. TECLAS DEL SISTEMA ANI

| Tecla | Función |
|---|---|
| `F4` | Captura el peso desde la balanza |
| `F12` | Confirma / siguiente paso |
| `F5` | Guarda el ingreso y genera número |

---

## 8. DOCUMENTOS RELACIONADOS

- **RJP-01** — Comprobante de peso (ANI)
- **RJP-03** — Esquema de patios
- **RJP-05** — Inventario mensual
- **LEF-01** — Lista de precios y forma de pago
- **14 % HUMEDADES DE INGRESO-REVXX** — Registro de humedades (OneDrive · PRODUCCIÓN)
