# Research tecnico aplicado - aglomerados, 2026-06-22

## Objetivo

Base externa para interpretar los tres audios de aglomerados del 22 de junio de 2026. No reemplaza la validacion en planta; sirve para separar lo que el audio describe con claridad de lo que debe confirmarse con tags, manuales del fabricante, HMI/PLC e historicos.

## Fuentes consultadas

- EPA AP-42, cap. 10.6.2, Particleboard Manufacturing: https://gaftp.epa.gov/ap42/ch10/s062/c10s06-2.pdf
- NIST Handbook 44, Section 2.21, Belt-Conveyor Scale Systems: https://www.nist.gov/document/2026-nist-handbook-44-section-221
- Siemens TIA Portal, PID_Compact S7-1200/S7-1500: https://docs.tia.siemens.cloud/r/en-us/v21/pid-control/pid-control-s7-1200-s7-1500-s7-1200-g2/using-pid_compact-s7-1200-s7-1500-s7-1200-g2/technology-object-pid_compact-s7-1200-s7-1500-s7-1200-g2
- Endress+Hauser, medicion de nivel de solidos en silos: https://www.us.endress.com/_storage/asset/4898436/storage/master/file/47932299/download/WP01074F24EN0118%20-%20Measuring%20the%20level%20of%20bulk%20solids%20stored%20in%20silos.pdf
- Endress+Hauser, principio electromagnetico de medicion de flujo: https://www.endress.com/en/support-overview/learning-center/flow-measuring-principle-emf
- Endress+Hauser, principio Coriolis: https://www.endress.com/en/support-overview/learning-center/flow-measuring-principle-coriolis
- Suo & Bowyer, Simulation modeling of particleboard density profile: https://wfs.swst.org/index.php/wfs/article/download/880/880/0
- Korai 2021, Difficulty of internal bond prediction of particleboard using the density profile: https://link.springer.com/article/10.1186/s10086-021-01994-4

## Sintesis util para NOVOPAN

### 1. Flujo industrial de tablero aglomerado

EPA describe el particleboard como particulas lignocelulosicas unidas con resina bajo calor y presion. El flujo general coincide con lo observado en planta: preparacion/reduccion de particulas, clasificacion por tamano, secado, mezcla con resina y cera/parafina, formacion de colchon, preprensa/prensa caliente y acabado.

La misma fuente indica que los tableros suelen fabricarse en tres o cinco capas: capas externas o face layers, con particula mas fina, y capa interna o core layer. Esto respalda que la relacion capa externa/core y la distribucion superior/inferior sean variables criticas para rectitud, superficie y desempeno mecanico.

### 2. Control PID y diagnostico de sobreoscilacion

La documentacion de Siemens PID_Compact confirma la logica explicada en los audios: el controlador compara el valor medido del proceso con el setpoint y calcula una salida de control. La salida combina accion proporcional, integral y derivativa.

Para NOVOPAN, esto aterriza en revisar tendencias de `SP`, `PV` y `LMN` o equivalente antes de ajustar. Si la salida se satura cerca de 100%, si el PV nunca alcanza al SP o si la variable oscila sin estabilizarse, el problema puede estar en sintonizacion, retardo de proceso, actuador limitado, sensor ruidoso, material variable o logica de interlock.

### 3. Basculas en banda, celdas de carga y calibracion dinamica

NIST Handbook 44 para belt-conveyor scales no limita la verificacion a poner pesos patron. Tambien exige mantener cero sin carga, limpieza de la zona de pesaje, evitar material adherido en la banda, pruebas periodicas de cero, pruebas simuladas o con material, y chequeos de alineacion.

Esto encaja con el gap de NOVOPAN: una esparcidora puede marcar bien con pesos patron en parada y fallar en produccion por arrastre de banda, adherencia, alineacion, velocidad, vibracion, punto de cero/tara, carga lateral o material no uniforme.

### 4. Nivel en silos de solidos

Endress+Hauser resume que radar guiado, ultrasonico y radar de pulso usan tiempo de vuelo, pero la seleccion depende de densidad o constante dielectrica del material, ubicacion de instalacion, altura del silo y perturbaciones como soportes, mezcladores, polvo y condensacion.

Para NOVOPAN, esto significa que no basta con decir "sensor ultrasonico": hay que registrar material, polvo, geometria del silo, punto de instalacion, ecos falsos, paletas de minimo/maximo, limpieza y escalamiento 0-100%.

### 5. Flujometros para resina, parafina, agua y aditivos

Endress+Hauser explica que los flujometros electromagneticos miden por ley de Faraday y requieren fluido conductivo. Son poco sensibles a presion, temperatura y viscosidad en su principio de medicion, pero dependen de que el fluido sea apto para magmeter.

Los Coriolis miden directamente flujo masico y tambien pueden entregar densidad y temperatura, por lo que son candidatos cuando cambian propiedades del fluido, concentracion o densidad. En planta hay que confirmar tecnologia real por linea antes de proponer acciones.

### 6. Perfil de densidad e interpretacion de calidad

Suo & Bowyer tratan el perfil de densidad vertical como un factor influyente en propiedades de particleboard. Korai 2021 advierte que el perfil de densidad ayuda, pero no predice por si solo el internal bond; tambien intervienen adhesivo, particula, humedad, parametros de prensa y variacion de fabricacion.

Para NOVOPAN, el perfilometro sirve para detectar distribucion anomala de material, pero la causa raiz debe cruzarse con receta, humedad, resina/parafina, relacion de capas, peso de colchon, prensa y resultados QC.

## Gaps tecnicos transversales

1. Exportar historian/PLC con timestamps sincronizados: alarmas, interlocks, velocidades, SP/PV/LMN, niveles, pesos, flujos, estados manual/auto y resets.
2. Definir formulas internas: `tau`, `TAM`, diferencia de capas, consumo, descarga kg/min y criterios de aceptacion.
3. Levantar mapa tiempo-distancia de linea: banda principal, esparcidoras, colchon, preprensa, prensa, corte, enfriamiento, lijado y apilado.
4. Separar calibracion estatica y dinamica: pesos patron, tara, cero sin carga, material test, alineacion, adherencia y vibracion.
5. Crear SOP de pruebas de papel/testigos: punto de muestreo, tiempo, pesaje, calculo de porcentajes y repetibilidad.
6. Validar sensores reales por equipo: tipo de nivel, tipo de flujo, celdas, encoders, inductivos, presostatos, actuadores y tags HMI/PLC.
7. Documentar secuencia de arranque: equipos vacios/llenos, orden de descarga por capa, rampas, apertura/cierre de compuertas/nariz, y criterio de estado estable.

## Aplicacion directa a los audios

- `new_recording_35`: usar como base para mapa de instrumentacion y diagnostico de taponamientos.
- `new_recording_36`: usar como base para proyecto de trazabilidad de cambios y optimizacion de arranque.
- `reunion_angeloncipales`: usar como base para calibracion de esparcidoras, tau/TAM, relacion de capas y perfilometro.
