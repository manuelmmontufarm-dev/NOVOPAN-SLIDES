# New Recording 36 — Ideas de proyecto para aglomerados

## Metadata

- Fecha de procesamiento: 2026-06-22
- Contexto: NOVOPAN / aglomerados / línea de tableros de partículas MDP
- Audio original normalizado: `audios/2026-06-22_aglomerados/new_recording_36.m4a`
- Duración aproximada: 03:30
- Transcripción cruda: `transcripts/2026-06-22_aglomerados/raw/new_recording_36.txt`
- Artefactos timestamped: `transcripts_audio_aglomerados/2026-06-22_batch/new_recording_36.json/.srt/.tsv/.vtt`

## Resumen ejecutivo

Este audio recoge ideas de proyecto directamente conectadas con aglomerados. La opción que más fuerza tiene es crear un sistema de trazabilidad del avance de cambios de receta/componente, por ejemplo un cambio en resina, a través de la línea. La idea es marcar el cambio, medir distancias y tiempos entre equipos, y saber en qué punto del proceso se encuentra hasta la salida final.

La segunda línea de trabajo es optimizar el arranque de línea. Se compara con otra línea/planta donde el arranque está encadenado en un solo botón; en NOVOPAN el arranque se hace desde dos paneles y puede generar sobreoscilación de peso si todas las capas descargan a la vez. Una tercera idea es reducir desperdicio de arranque sincronizando dosificación, material en esparcidoras y tiempos de proceso.

## Puntos clave con timestamp

- `[00:07-00:37]` Idea 1: rastrear dónde está un cambio de componente/resina en cada máquina del proceso hasta la salida final.
- `[00:41-01:07]` La sensórica no sería lo más difícil; el trabajo fuerte está en medir tiempos, distancias y demoras entre banda principal, esparcidoras y equipos.
- `[01:08-01:33]` Idea 2: optimizar arranque. Actualmente se arranca desde dos paneles; un arranque mal secuenciado genera sobreoscilación y puede parar/rearrancar la línea.
- `[01:35-02:17]` Para un arranque continuo se debe identificar qué descarga primero, cuánto material queda en cada etapa y cómo secuenciar capas inferior, central y superior.
- `[02:28-02:45]` Idea 3: reducir desperdicio al iniciar encolado/formación sincronizando dosificación, llenado de esparcidoras y demora de transporte.
- `[03:09-03:27]` Se menciona análisis de datos como alternativa, pero se prioriza la idea de seguimiento/trazabilidad del cambio de proceso.

## Gaps técnicos detectados con research

- **Mapa tiempo-distancia de línea.** Falta levantar distancias reales, velocidades de banda, tiempos muertos, transportadores intermedios y residence time por equipo. El flujo de particleboard documentado por EPA/CORRIM ayuda a ordenar etapas, pero los tiempos deben medirse en NOVOPAN.
- **Definición de “marca” de cambio.** Hay que decidir si el marcador será evento PLC, cambio de setpoint, pulso de sensor, cambio de receta, batch ID o tag manual de HMI. Sin una marca única no se puede saber cuándo el cambio llega a esparcidoras, prensa, corte o QC.
- **Start-up sequence.** Se debe documentar el estado inicial: línea vacía/llena, nivel de silos, material en esparcidoras, resina/parafina habilitada, preprensa y prensa. El research de PID recomienda evitar saltos bruscos de setpoint cuando generan sobreoscilación; esto se traduce en rampas o secuencias escalonadas.
- **Capas y nomenclatura.** Confirmar nombres reales de capas (`SL1`, capa inferior, capa central/media, capa superior) y cómo se sincronizan con el setpoint de proporción externo/core.
- **KPIs del proyecto.** Definir cómo se medirá el beneficio: kg de desperdicio en arranque, metros de tablero fuera de especificación, tiempo hasta régimen estable, alarmas por sobreoscilación, desviación tau y número de cortes/rechazos.
- **Datos disponibles.** Antes de diseñar software, validar tags: SP/PV/LMN de resina/parafina, velocidades de banda, pesos por esparcidora, báscula central, perfilómetro/densidad, corte, prensa, alarmas y timestamps sincronizados.

## Términos por confirmar

- `SL1`: el audio lo asocia con capa inferior, pero debe validarse en HMI.
- `capa sembrar`: probablemente `capa central` o `capa media`.
- `nariz`: término operativo de arranque/formación; confirmar equipo o compuerta exacta.
- `sensor en banda principal`: definir si ya existe o si habría que instalar uno.

## Research externo usado para gaps técnicos

- [EPA AP-42, cap. 10.6.2 Particleboard Manufacturing](https://gaftp.epa.gov/ap42/ch10/s062/c10s06-2.pdf): confirma el flujo base de particleboard: preparación/clasificación de partículas, secado, mezcla con resina/cera, formación de colchón, prensado caliente y acabado.
- [CORRIM, Particleboard life-cycle inventory](https://corrim.org/wp-content/uploads/2018/03/lci-particleboard-panels-resource-through-product.pdf): referencia de proceso para secado, blending con resina/wax/catalyst, formación por capas face/core, hot pressing, enfriado, corte y lijado.
- [ANSI A208.1-2016 Particleboard](https://res.cloudinary.com/hdi/image/upload/v1621251940/Suppliers/Guides/CPA_ANSI_Standard_A208_1_Particleboard_2016.pdf): marco externo de propiedades, tolerancias, test methods, inspección e identificación de tableros de partículas.
- [NIST Handbook 44, Section 2.21 Belt-Conveyor Scale Systems](https://www.nist.gov/document/2026-nist-handbook-44-section-221): referencia para calibración, zero-load tests, material tests, alineación, limpieza y operación de básculas en banda.
- [Siemens PID_Compact docs](https://docs.tia.siemens.cloud/r/en-us/v21/pid-control/pid-control-s7-1200-s7-1500-s7-1200-g2/using-pid_compact-s7-1200-s7-1500-s7-1200-g2/technology-object-pid_compact-s7-1200-s7-1500-s7-1200-g2): referencia para SP, PV, desviación de control y acciones P/I/D en PLC.
- [Endress+Hauser, medición de nivel en silos de sólidos](https://www.us.endress.com/_storage/asset/4898436/storage/master/file/47932299/download/WP01074F24EN0118%20-%20Measuring%20the%20level%20of%20bulk%20solids%20stored%20in%20silos.pdf): criterios de selección para radar/ultrasonido en silos con polvo, estructuras internas y condensación.
- [Endress+Hauser, principio electromagnético de medición de flujo](https://www.endress.com/en/support-overview/learning-center/flow-measuring-principle-emf): referencia para flujómetros magnéticos en líquidos conductivos.
- [Endress+Hauser, principio Coriolis](https://www.endress.com/en/support-overview/learning-center/flow-measuring-principle-coriolis): referencia para medición directa de flujo másico, densidad y temperatura.
- [Suo & Bowyer, Simulation modeling of particleboard density profile](https://wfs.swst.org/index.php/wfs/article/download/880/880/0): el perfil de densidad vertical afecta propiedades del tablero y se relaciona con temperatura, humedad y prensado.
- [Korai 2021, Journal of Wood Science](https://link.springer.com/article/10.1186/s10086-021-01994-4): advierte que el perfil de densidad por sí solo no explica todo el internal bond; también importan adhesivo, partículas, especies, humedad y parámetros de prensa.

## Transcripción segmentada

> Transcripción automática con Whisper large-v3-turbo. Mantener como base cruda; corregir términos técnicos contra planta antes de usar en documentos formales.

- `[00:00-00:02]` Y a ver, ¿para el proyecto dices?
- `[00:03-00:06]` Esperas, te voy a decir algunas y el que te agrade, espérame decir bien, si vamos a trabajar.
- `[00:06-00:07]` ¿Qué ideas para el proyecto?
- `[00:07-00:24]` La línea de allá, me dice en qué etapa está cada cambio, es decir, yo hago un cambio en el componente de resina, le mando una marca y me dice en qué punto de cada máquina del proceso está, hasta salir a la parte final, lo que no ocurra acá.
- `[00:24-00:26]` no tengo eso acá
- `[00:26-00:28]` eso es bastante útil para saber
- `[00:28-00:30]` cuando ya pasa el cambio
- `[00:30-00:31]` y que afecta
- `[00:31-00:34]` y que afecta en el sistema
- `[00:34-00:36]` esa es la primera parte que
- `[00:36-00:37]` puede ser de mejor acá
- `[00:37-00:41]` y para programar algo
- `[00:41-00:42]` si, es solo programar
- `[00:42-00:43]` en un sensor la verdad
- `[00:43-00:46]` la parte que se tiene que trabajar
- `[00:46-00:48]` en eso es las distancias
- `[00:48-00:50]` tienes que medir perfectamente
- `[00:50-00:53]` los tiempos, las distancias para poder configurar
- `[00:53-00:56]` en qué tiempo pasa cada esparcidora, qué distancia hay de cada punto a cada otro punto.
- `[00:57-00:57]` Ah, ya, buenazo.
- `[00:57-00:59]` Esa es la parte del trabajo.
- `[00:59-01:03]` La parte de sensórico no es muy compleja, solo es un sensor que se pone en una banda principal
- `[01:03-01:07]` y eso nos va dando la retroalimentación de todo lo demás.
- `[01:08-01:13]` Otra parte que se puede trabajar acá es la parte de la optimización del arranque.
- `[01:13-01:16]` Allá el arranque se hace como un botón,
- `[01:17-01:19]` es decir, encadena todo el arranque de todo el proceso de la maquinaria.
- `[01:20-01:22]` Acá el arranque es mucho más complejo.
- `[01:23-01:30]` se arranca desde dos paneles diferentes y cuando no arrancas bien te produce un proceso de sobreosilación
- `[01:30-01:33]` que te hace que te pare o arranque la línea.
- `[01:33-01:33]` Ok.
- `[01:35-01:40]` Para trabajar en un solo proceso de arranque se tiene que tener identificado bien los tiempos,
- `[01:41-01:45]` las descargas, los materiales para que descargue ese arranque de tal forma
- `[01:45-01:47]` que es continua con lo que tienes...
- `[01:47-01:49]` Que vaya como un arranque.
- `[01:49-01:57]` Vale, a ver, allá me descarga primero la capa SL1, que es la capa inferior, la capa sembrar y la capa superior.
- `[01:58-01:59]` Acá me arranca todo de un mes.
- `[01:59-02:01]` Ya, no, no está bien.
- `[02:01-02:01]` Ok.
- `[02:01-02:02]` Esa es otra parte.
- `[02:02-02:05]` Pero es asumiendo que está vacía la...
- `[02:05-02:09]` Asumiendo que está vacía, que está vacía, que está llena casi es el mismo comportamiento.
- `[02:09-02:09]` Ah, ok.
- `[02:10-02:12]` Es mandarte todo el material de un solo golpe.
- `[02:12-02:13]` Siempre te va a aportar errores.
- `[02:13-02:17]` Te da sobreoscilación en la parte de peso, de renovación de peso.
- `[02:17-02:19]` Esa es otra parte que se puede optimizar acá.
- `[02:20-02:28]` Y hay otra parte de aperturas, la parte del material que se genera al momento de comenzar en color.
- `[02:29-02:33]` Hasta que tú puedas cerrar aquí la nariz, esa parte también se puede utilizar.
- `[02:34-02:39]` Si se sincroniza bien la parte de que tú dosificas el material, la parte de que tú tienes material en los disparcidoras
- `[02:39-02:45]` y la parte de que te demora en el proceso para compartir, eso es mejor relación de desperdicio.
- `[02:45-02:48]` Claro, porque solo se abre, pero eso es más relacionado también con la primera...
- `[02:48-02:49]` Sí.
- `[02:49-02:51]` O sea, necesitas primero saber dónde está lo que...
- `[02:51-02:52]` Con la parte del arranque.
- `[02:52-02:53]` Ah, ajá.
- `[02:53-02:54]` Es...
- `[02:54-02:55]` Chévere.
- `[02:55-02:57]` Eso es lo que podemos tener, si te ocurre alguno, o sea...
- `[02:57-03:01]` O sea, le voy a pensar, porque ahorita recién cachando cómo funciona todo...
- `[03:03-03:07]` No sé, todavía no ingenié nada, estaba concentrado en entender.
- `[03:07-03:09]` Pero la primera opción me gustó bastante.
- `[03:09-03:13]` Ya, y la otra parte, pues igual que podemos trabajar si quieren análisis de datos.
- `[03:13-03:16]` Tenemos datos que banco tiene en la parte operativa
- `[03:16-03:19]` que son de diferentes sistemas de las máquinas
- `[03:19-03:23]` No, no, esta parte me gusta más, la que estamos conversando ahorita
- `[03:23-03:27]` Esta bien, andale bien, desvele cualquier idea y le vamos a conversar
- `[03:27-03:30]` De una, ahorita formulo un plan
