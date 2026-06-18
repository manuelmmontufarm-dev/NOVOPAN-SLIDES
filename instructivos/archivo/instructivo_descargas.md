# Instructivo de descargas — Balanza

**Versión:** v1 · 16 de junio de 2026
**Para:** operadores de balanza
**Aplica a:** recepción y despacho de camiones en balanza (entrada y salida).

---

## A. Entrada (Balanza 2)

1. El camión se ubica en **Balanza 2**.
2. Identificar el tipo de carga: rollizo / subproducto / combustible / reciclado / residuo.
3. Presionar **`F4`** para capturar el peso de entrada.
4. Recibir las guías del conductor:
   - Guía de madera
   - Guía de remisión
   - Guía de circulación (forestal)
5. Pedir cédula o licencia del conductor.
6. Ingresar datos al sistema **ANIME**:
   - **Si trae QR forestal** → escanear. ANIME prellena bosque, transporte, cosechador, categoría y especie.
   - **Si no trae QR** → llenar manualmente: placa, ubicación de descarga, proveedor, transportista, servicio de explotación, especie y categoría.
7. ANIME valida automáticamente que la guía no esté repetida. Si lo está, el camión debe bajar y reemitir la guía.
8. Tomar muestra de humedad si aplica:
   - **Rollizo:** solo las primeras 5 muestras semanales del proyecto.
   - **Subproductos:** en cada camión.
9. Asignar el patio de descarga consultando el grupo de WhatsApp de patios y la hoja de rumas actualizada.
10. Presionar **`F5`** para guardar el ingreso y generar el número.
11. Liberar el camión hacia su patio.

> **Importante:** no permitir descarga sin número de ingreso generado.

---

## B. Salida (Balanza 1)

1. El camión llega a **Balanza 1**.
2. Pedir placa y cédula (o licencia) del conductor.
3. Buscar el ingreso en ANIME por placa.
4. Registrar la máquina/grúa que descargó (campo Operador).
5. Presionar **`F4`** para capturar el peso de salida.
6. Registrar humedad si el destino es patio externo.
7. Presionar **`F5`** para cerrar el ingreso.
8. Entregar el comprobante al proveedor.

---

## C. Excepciones

### C.1 Aserrín
- Único subproducto que se paga **por peso Y por distancia** (los demás solo por peso).
- Tomar muestra de humedad en cada camión (igual que otros subproductos).
- Registrar la distancia/origen del proveedor para el cálculo del pago.

### C.2 Patios externos (haciendas / patios lejanos)
- Aplica cuando el camión va a descargar fuera de la planta principal.
- En la **entrada**:
  - Pedir **cédula** del conductor (queda retenida o registrada).
  - Entregar un **pase / credencial** que el conductor presenta en el control de arriba.
  - Sin pase, el control de arriba no deja pasar al camión (protege contra ingresos desconocidos por el camino que sube a las haciendas).
- En la **salida**:
  - Devolver la cédula al conductor a cambio del pase.
  - **Sí registrar humedad** (en patios externos es obligatorio).

### C.3 Combustibles (DSL / GLP / resina)
- Solo peso de entrada y salida como referencia para Bodega.
- No entra al flujo completo de ANIME.

### C.4 Residuos (EMASEO)
- Flujo simplificado.
- Registrar en la hoja de Google Drive compartida con el ingeniero.
- Contacto: Daniel Sotalin.

### C.5 Reciclado (madera externa, recortes de tableros)
- Flujo completo de ANIME como subproducto.
- Material reciclado va a biomasa o trituración, no a la receta principal.

### C.6 Trasbordo
- Si el camión descarga en más de una máquina, vuelve a balanza por un peso de salida adicional.

### C.7 Guía repetida
- ANIME rechaza el ingreso (la guía ya existe en el sistema).
- Bajar el camión y solicitar al proveedor nueva guía.
- Ocurre cuando los forestales imprimen la misma guía dos veces.

### C.8 Camión sin QR forestal
- Llenar todos los campos manualmente: placa, ubicación, proveedor, transportista, servicio de explotación, especie, categoría.
- Aplica sobre todo a **terceros** (eucalipto, pino, ciprés). Los proveedores propios suelen tener QR habilitado.

### C.9 Cola en hora pico (turno tarde)
- Si la fila pasa al exterior de la planta, habilitar las **dos balanzas de entrada en simultáneo** con dos personas (alternativa propuesta por Alejandro).

---

## D. Teclas del sistema ANIME

| Tecla | Función |
|---|---|
| `F4` | Captura peso automático desde balanza |
| `F12` | Confirma / siguiente paso |
| `F5` | Guarda ingreso y genera número de ingreso |

---

# Outline — Siguientes pasos del proceso de descarga

Lo que pasa **después** de balanza, para completar el panorama de la descarga.

## 1. Traslado al patio

- Camión avanza al patio asignado en la entrada.
- Espera turno de grúa si hay cola.
- Tiempo de espera y traslado **no se mide hoy** — oportunidad de captura por timestamp.

## 2. Descarga con grúa

- Operador de grúa descarga el camión en la ruma indicada.
- Usa dispositivo handheld con **app IFO** + lector de código de barras.
- Escanea el código del material (ej. `MAD0005` = pino).

## 3. Reporte de inventario en IFO

- IFO registra un traslado de stock:
  - **ITMAD** (almacén con ubicación física, ej. `P07001` = Patio 7, ubicación 01)
  - → **PREMAD** (almacén sin ubicación, vinculado al consumo de producción)
- ITMAD baja toneladas, PREMAD sube toneladas listas para línea.

## 4. Consumo en producción

- Producción descuenta desde PREMAD según receta del día.
- La receta cambia por producto (MDP estándar vs MDP-RH), por humedad y por especies disponibles.

## 5. Retorno del camión a balanza

- Camión vuelve a **Balanza 1** para salida.
- Cierra el ciclo descrito en la sección B.

---

## Pendientes por documentar

- **Operación de la grúa** — protocolo de descarga, criterios para elegir ruma.
- **App IFO** — pantallas, códigos de error, validaciones.
- **ITMAD ↔ PREMAD** — confirmar nombres exactos y reglas de movimiento con TI / Christian Villalba.
- **Manejo de humedad en patio** — frecuencia, equipo, registro.
- **Excepciones en descarga** — qué hacer si el código de barras no escanea, si la ruma asignada está llena, si llega material no declarado en la guía.
