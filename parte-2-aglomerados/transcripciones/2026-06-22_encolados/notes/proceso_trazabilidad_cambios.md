# Proceso de trazabilidad de cambios — encolado, formación y prensa

## Metadata

- Fecha de procesamiento: 2026-06-22
- Contexto: NOVOPAN / aglomerados / encolado-formacion-prensa
- Fuentes principales:
  - `transcripts_audio_encolados/2026-06-22_batch/new_recording_37.tsv`
  - `transcripts_audio_encolados/2026-06-22_batch/new_recording_39.tsv`
  - `transcripts_audio_encolados/2026-06-22_batch/explicacion.tsv`
- Raw:
  - `transcripts/2026-06-22_encolados/raw/new_recording_37.txt`
  - `transcripts/2026-06-22_encolados/raw/new_recording_39.txt`
  - `transcripts/2026-06-22_encolados/raw/explicacion.txt`

## Resumen ejecutivo

Este bloque es el más útil para detallar el **proceso** detrás del proyecto de trazabilidad de cambios. El problema no es solo saber que se cambió una receta o una dosificación, sino saber **dónde está físicamente ese cambio** mientras avanza desde encolado/formación, pasa por esparcidoras, preprensa, prensa, sensores de calidad y enfriamiento.

La necesidad operativa queda clara: NOVOPAN no tiene una pantalla general que agrupe toda la línea. Hay interfaces separadas para esparcidores, preprensa/nariz/banda de transferencia y prensa, pero falta una vista de punta a punta que diga: “este cambio está aquí, llegará a prensa en X tiempo, está saliendo por esta zona, y ya se puede evaluar en sensores/calidad”.

La propuesta técnica más aterrizada es usar un modelo de **distancia + velocidad + pulsos/rotaciones**. En vez de depender desde el inicio de comunicación compleja entre PLCs, se puede estimar posición con referencias físicas: distancia entre equipos, velocidad de banda/prensa y pulsos de rodillos o sensores existentes. Esto permitiría construir una primera pantalla de seguimiento sin rehacer toda la arquitectura de control.

## Flujo de proceso identificado

1. **Cambio en dosificación / encolado**
   - El cambio puede nacer en la dosificación de componentes: resina, parafina, agua, aditivos o cambios de densidad desde dosificadoras.
   - Se debe registrar el timestamp exacto del cambio y su punto de origen.

2. **Transportadores hacia formación**
   - Desde encolado, el material viaja por transportadoras hasta el inicio de formación.
   - El tiempo desde el cambio de dosificación hasta el primer punto de banda debe entrar al cálculo.

3. **Línea de formación**
   - Se mencionan capas `SL1`, `CL`, `SL2` y referencias como `Core Layer Bottom`, `Core Layer`, `Core Layer Top`.
   - Pendiente: confirmar nomenclatura real en HMI, porque hay ruido en la transcripción.

4. **Sprays / desmoldante**
   - Se mencionan sprays con agua y desmoldante al 1.5%.
   - Función: evitar que el material se pegue a la banda y a la banda metálica de la prensa.

5. **Esparcidoras**
   - Deben relacionarse con el avance del cambio por distancia o pulsos.
   - Idea explícita: contar pulsos desde cada esparcidora o punto de referencia.

6. **Imán / detector / perfilómetro**
   - Antes o alrededor de preprensa aparecen imán ferromagnético y detector.
   - Se menciona perfil de densidad por rayos X.

7. **Preprensa**
   - Compacta el colchón antes de prensa.
   - En la nota se la trata como una zona importante para enlazar la primera sección con prensa.

8. **Prensa**
   - Se mencionan distancias de referencia: formación/banda alrededor de 90 m, prensa de 22.1 m, y otra prensa/línea de 16 m.
   - La prensa tiene cuatro áreas o zonas; sería valioso saber por qué área pasa el cambio, no solo que “está en prensa”.

9. **Sensores de calidad post-prensa**
   - Medición de espesor con sensores/ruedas.
   - Detección de reventados o estructura interna mediante ultrasonido.
   - Peso del tablero y densidad promedio por espesor + peso + dimensiones.

10. **Enfriador y salida**
   - Después de prensa y sensores, el tablero pasa a enfriamiento.
   - El seguimiento debe cerrar cuando el cambio ya sale y puede analizarse en calidad.

## Diseño propuesto de seguimiento

### Opción A — Marcador físico en banda

- Usar pintura, franja, grapa u otro marcador físico para referenciar posición.
- Problema: por material, fricción, limpieza y condiciones de banda, el marcador puede durar poco.
- Puede servir como calibración inicial, pero no como solución robusta de largo plazo.

### Opción B — Pulsos / rotaciones

- Contar cuántos pulsos representan una vuelta o tramo de banda.
- Relacionar diámetro de rodillo, pulsos por vuelta y distancia recorrida.
- Convertir cada punto del proceso en una distancia equivalente o número de pulsos desde el origen.
- Ventaja: aprovecha sensores existentes y evita depender de una marca física permanente.

Formula conceptual:

```text
distancia_avanzada = pulsos_detectados * distancia_por_pulso
tiempo_estimado = distancia_restante / velocidad_actual
posicion_cambio = origen_del_cambio + distancia_avanzada
```

### Opción C — Comunicación entre PLCs

- Cada máquina tiene su propio PLC/controlador.
- La solución ideal sería comunicar máquinas y jalar señales entre encolado/formación/prensa.
- Es posible, pero se reconoce como un proyecto de programación más complejo.
- Para una primera versión, conviene empezar con una relación de distancia/velocidad y luego madurar a integración PLC.

## Pantalla requerida

La pantalla ideal no debe ser solo una pantalla genérica. Debe mostrar:

- Cambio activo: tipo de cambio, hora de origen y punto de origen.
- Posición estimada del cambio por tramo.
- Tiempo estimado hasta cada estación.
- Estado por estación: encolado, transportador, formación, esparcidora, preprensa, prensa, sensores de calidad, enfriador.
- Historial de últimos cambios.
- Relación con sensores de salida: espesor, densidad, reventados, peso y tablero fuera de tolerancia.

Referencia del audio: en otra línea sí existe una vista general donde las marcas se desplazan por puntos de referencia de la máquina. Esa lógica debe servir como inspiración para construir una vista similar en esta línea.

## KPIs para justificar el proyecto

- Tiempo desde cambio de receta/dosificación hasta salida detectable.
- Metros o tableros producidos en transición.
- Tableros fuera de tolerancia después de un cambio.
- Desperdicio por arranque o cambio.
- Tiempo de reacción de operadores ante cambio incorrecto.
- Reducción de pruebas a ciegas: saber cuándo mirar sensores de calidad.
- Costo estimado de sensores, programación, mano de obra y ajustes mecánicos vs ahorro por desperdicio evitado.

## Gaps técnicos

- **Distancias reales.** Levantar distancia entre encolado, inicio de formación, esparcidoras, preprensa, nariz, banda de transferencia, entrada/salida de prensa, sensores y enfriador.
- **Velocidades reales.** Identificar qué velocidad usar en cada tramo: banda de formación, rodillos, prensa, transferencia. No asumir que toda la línea tiene una sola velocidad efectiva.
- **Pulsos por tramo.** Confirmar sensores disponibles, pulsos por vuelta, diámetro real de rodillos y si existe deslizamiento.
- **Sincronización de PLCs.** Confirmar si los PLCs comparten reloj, red, tags o historian. Si no, documentar cómo se sincronizarían eventos.
- **Punto de origen del cambio.** Definir si el cambio se marca en HMI, en PLC, en dosificadora, en spray, en esparcidora o al primer punto físico de banda.
- **Nomenclatura de capas.** Confirmar `SL1`, `CL`, `SL2`, `Core Layer Bottom`, `Core Layer Top` y cómo se muestran en HMI.
- **Línea 1 vs línea 2.** Separar diferencias: sensores más modernos, IO-Link/entradas-salidas inteligentes, software Mezzo y disponibilidad de overview.
- **Calidad de salida.** Relacionar cada cambio con sensores de espesor, reventados/ultrasonido, peso, densidad y tolerancias.

## Decisión operativa sugerida

Primero construir un **mapa visual del proceso** con distancias, sensores y tramos. Luego armar una versión mínima del seguimiento por cálculo:

1. Registrar evento de cambio.
2. Tomar velocidad actual.
3. Convertir distancia a tiempo o pulsos.
4. Mostrar posición estimada del cambio.
5. Validar contra observación real en sensores de salida.

Con eso se puede justificar el proyecto antes de entrar a una integración PLC completa. Como dice el audio: escribir bien el problema ya resuelve media solución.

## Términos por confirmar

- `Mezzo`: aparece como software/interfaz de prensa o línea; confirmar escritura exacta.
- `IO-Link`: la transcripción suena como “IONX”; por contexto parece IO-Link o entradas/salidas inteligentes.
- `franja verde`: referencia visual de posición en otra línea.
- `nariz`: confirmar equipo exacto dentro de transferencia/formación.
- `desmoldante 1.5%`: confirmar concentración y si aplica en todos los productos.
- `22.1 m`, `16 m`, `90 m`: validar distancias reales antes de usarlas en cálculo.

