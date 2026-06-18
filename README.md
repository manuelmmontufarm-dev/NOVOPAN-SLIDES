# NOVOPAN — Pasantía e Instructivos

Repositorio personal con notas, transcripciones, instructivos y entregables generados durante la pasantía en Novopan del Ecuador (Itulcachi, Quito).

## Estructura

```
NOVOPAN-SLIDES/
├── instructivos/                  # Documentos formales (formato ISO IJP)
│   ├── IJP_Recepcion_v2.md        # ⭐ Versión vigente
│   └── archivo/                   # Versiones anteriores e iteraciones
├── notas/                         # Notas coherentes derivadas de transcripciones
├── transcripciones/               # Transcripciones automáticas de los audios
├── presentaciones/                # PPTX y materiales de presentación
└── TODAY.md                       # 📌 Bitácora — actualizar SIEMPRE antes de push
```

## Reglas del repo

1. **Antes de cada `git push`** se debe actualizar `TODAY.md` con la fecha y el resumen de cambios.
2. Cada versión nueva de un IJP queda como `IJP_<area>_v<N>.md` en `instructivos/`; la anterior se mueve a `instructivos/archivo/`.
3. Las transcripciones automáticas no se editan — si se necesita una versión limpia, se crea un archivo separado en `notas/`.

## Contexto del proyecto

- **Planta:** Novopan del Ecuador (Itulcachi, Quito). Tableros de partículas MDP/MDP-RH.
- **Patios externos:** Patapungo (con pase de control).
- **Sistemas:** ANI (recepción/balanza), Factory Track (consumo/inventario), INFOR (ERP/contable).
- **Documentación ISO:** los IJP se mantienen versionados con numeración consistente (Propósito → Definiciones → Responsabilidad → Actividades → Excepciones → Equipos → Sistema → Documentos relacionados).
