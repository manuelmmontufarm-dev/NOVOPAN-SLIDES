/**
 * ProcessGraph — Línea 1 (modelo m_dot, 2026-06-25)
 *
 * Modelo de tiempos:
 *   - Bins / hoppers (tolva):                        τ = M_holdup / F × 60   [s]
 *   - Encoladores / sprays (tiempo fijo):            τ = constante (s)       [s]
 *   - Bandas acopladas a prensa:                     t = L / v_prensa × 60   [s]
 *   - Bandas inclinadas (factor sobre prensa):       t = L / (v_prensa × factor) × 60   [s]
 *   - Sprays (caída instantánea):                    t = constante (estimado)
 *   - Cualquier etapa puede sumar buffer manual:     t_total = t_calc + buffer_s
 *
 * Origen de cada número:
 *   - hmi-live   → tag en vivo del HMI Metso/Dieffenbacher (entra cada turno)
 *   - recipe     → setpoint de receta (cambia con el producto)
 *   - mechanical → ficha técnica del equipo (constante para siempre)
 *   - measured   → cronometrado en planta
 *   - derived    → calculado a partir de otra medición
 *   - estimated  → mejor estimación, pendiente de medir
 *   - manual     → buffer añadido por el operador a la etapa
 */

export const PATH_IDS = {
  BOTTOM: 'path-bottom',
  CORE: 'path-core',
  TOP: 'path-top',
};

/**
 * Parámetros globales — entran arriba del panel y aplican a todas las etapas.
 * Cada uno declara su 'kind' (hmi-live | recipe | mechanical).
 */
export const GLOBAL_PARAMS = [
  // ── HMI en vivo ──
  {
    key: '_global:peso_manta',
    label: 'Peso manta (báscula central)',
    unit: 'kg/m²',
    default: 6.60,
    kind: 'hmi-live',
    desc: 'Variable maestra que define cuánto material pide la línea por m². Báscula central Metso.',
    step: 0.05,
  },
  {
    key: '_global:F_SL',
    label: 'Flujo SL (capa fina total)',
    unit: 'kg/min',
    default: 70.1,
    kind: 'hmi-live',
    desc: 'Suma del flujo SL1 (BOTTOM) + SL2 (TOP). Sale de las dosing fina o se mide en HMI.',
    step: 0.1,
  },
  {
    key: '_global:F_CL',
    label: 'Flujo CL (core)',
    unit: 'kg/min',
    default: 163.4,
    kind: 'hmi-live',
    desc: 'Flujo de la ruta gruesa (esparcidor 2). HMI dosing gruesa o esparcidor central.',
    step: 0.1,
  },
  // ── Receta ──
  {
    key: '_global:pctSL1',
    label: '% SL1 del fino (BOTTOM)',
    unit: '%',
    default: 47,
    kind: 'recipe',
    desc: 'Sub-receta capa fina inferior. SL1 + SL2 = 100.',
    step: 1,
  },
  {
    key: '_global:pctSL2',
    label: '% SL2 del fino (TOP)',
    unit: '%',
    default: 53,
    kind: 'recipe',
    desc: 'Sub-receta capa fina superior. SL1 + SL2 = 100.',
    step: 1,
  },
];

/** Prefijo compartido fina: dosing → encolador → banda inclinada (sube) → divisor */
export const FINE_PREFIX = [
  {
    id: 'dosing-fine',
    label: 'Dosing bin fina',
    kind: 'retention',
    model: 'bin',
    holdupKg: 100,
    flowSource: 'F_SL',
    layout: 'drop',
    source: {
      kind: 'hmi-live',
      desc: 'τ = M_bin_fina / F_SL × 60',
      detail: 'Tolva con celda de carga (kg). El τ baja cuando el bin se vacía o sube la demanda.',
    },
  },
  {
    id: 'enc-fine',
    label: 'Encolador fina',
    sublabel: 'Resina + parafina + agua',
    kind: 'retention',
    model: 'fixed',
    retentionSec: 30,
    layout: 'process',
    source: {
      kind: 'estimated',
      desc: 'τ = tiempo fijo (s)',
      detail: 'Un solo parámetro en segundos (~30 s acordado en planta). No depende de flujo ni holdup.',
    },
  },
  {
    id: 'incl-fine',
    label: 'Banda inclinada azul (fina)',
    kind: 'transport',
    lengthM: 64,
    speedFactor: 6.62, // 96 m/min ÷ 14,5 m/min prensa (24-jun)
    beltColor: 'blue',
    layout: 'incline-up',
    splitsTo: [PATH_IDS.BOTTOM, PATH_IDS.TOP],
    measuredAt: '2026-06-24',
    source: {
      kind: 'measured',
      date: '2026-06-24',
      desc: 't = L / (v_prensa × 6,62) × 60',
      detail: 'Banda inclinada va 6,62× más rápido que la prensa. Calibrado 24-jun: 64 m / 40 s = 96 m/min con prensa a 14,5.',
    },
  },
];

export const PATHS = {
  [PATH_IDS.BOTTOM]: {
    id: PATH_IDS.BOTTOM,
    label: 'BOTTOM · Esparcidor 1',
    color: '#1565C0',
    row: 'bottom',
    nodes: [
      {
        id: 'esp1-zone',
        label: 'Esparcidor 1',
        kind: 'retention',
        model: 'hopper',
        holdupKg: 30,
        flowSource: 'F_SL1', // = F_SL × pctSL1
        layout: 'spreader',
        measuredAt: '2026-06-24',
        source: {
          kind: 'hmi-live',
          desc: 'τ = M_hopper_esp1 / (F_SL × %SL1) × 60',
          detail: 'Hopper con báscula. A receta 30/70 con SL1 = 47 % y M = 30 kg, da ~55 s (mayor que esp2 porque el flujo de capa fina es menor).',
        },
        equipment: [
          { name: 'Banda interna', atPct: 20 },
          { name: 'Regula volumen', atPct: 45 },
          { name: 'Báscula capa', atPct: 65 },
          { name: 'Rodillos diamante', atPct: 85 },
        ],
      },
    ],
  },
  [PATH_IDS.TOP]: {
    id: PATH_IDS.TOP,
    label: 'TOP · Esparcidor 3',
    color: '#1976D2',
    row: 'top',
    nodes: [
      {
        id: 'esp3-zone',
        label: 'Esparcidor 3',
        kind: 'retention',
        model: 'hopper',
        holdupKg: 30,
        flowSource: 'F_SL2', // = F_SL × pctSL2
        layout: 'spreader',
        measuredAt: '2026-06-24',
        source: {
          kind: 'hmi-live',
          desc: 'τ = M_hopper_esp3 / (F_SL × %SL2) × 60',
          detail: 'Hopper con báscula. Recibe el SL2 (TOP). ~49 s a receta 30/70 con SL2 = 53 % y M = 30 kg.',
        },
        equipment: [
          { name: 'Banda interna', atPct: 20 },
          { name: 'Regula volumen', atPct: 45 },
          { name: 'Báscula capa', atPct: 65 },
          { name: 'Rodillos diamante', atPct: 85 },
        ],
      },
    ],
  },
  [PATH_IDS.CORE]: {
    id: PATH_IDS.CORE,
    label: 'CORE · Esparcidor 2',
    color: '#0A7D5A',
    row: 'core',
    nodes: [
      {
        id: 'dosing-thick',
        label: 'Dosing bin gruesa',
        kind: 'retention',
        model: 'bin',
        holdupKg: 100,
        flowSource: 'F_CL',
        layout: 'drop',
        source: {
          kind: 'hmi-live',
          desc: 'τ = M_bin_thick / F_CL × 60',
          detail: 'Tolva con celda de carga (kg). A 163 kg/min y 100 kg de holdup ≈ 37 s.',
        },
      },
      {
        id: 'sprays-caida',
        label: 'Sprays presión (caída)',
        sublabel: 'Resina + agua + endurecedor',
        kind: 'retention',
        model: 'fixed',
        retentionSec: 5,
        layout: 'drop',
        source: {
          kind: 'estimated',
          desc: 't = 5 s (caída atomizada)',
          detail: 'Spray de inyección en caída libre. Cinética de la mezcla en milisegundos; los 5 s son margen estimado. No depende de receta.',
        },
      },
      {
        id: 'enc-thick',
        label: 'Encolador gruesa',
        sublabel: '+ parafina',
        kind: 'retention',
        model: 'fixed',
        retentionSec: 30,
        layout: 'process',
        source: {
          kind: 'estimated',
          desc: 'τ = tiempo fijo (s)',
          detail: 'Un solo parámetro en segundos (~30 s acordado en planta). No depende de flujo ni holdup.',
        },
      },
      {
        id: 'incl-thick',
        label: 'Banda inclinada azul (gruesa)',
        kind: 'transport',
        lengthM: 68,
        speedFactor: 15.63, // 226,67 m/min ÷ 14,5 m/min prensa (24-jun)
        beltColor: 'blue',
        layout: 'incline-up',
        measuredAt: '2026-06-24',
        source: {
          kind: 'measured',
          date: '2026-06-24',
          desc: 't = L / (v_prensa × 15,63) × 60',
          detail: 'Banda inclinada va 15,63× más rápido que la prensa. Calibrado 24-jun: 68 m / 18 s = 226,67 m/min con prensa a 14,5.',
        },
      },
      {
        id: 'esp2-zone',
        label: 'Esparcidor 2',
        kind: 'retention',
        model: 'hopper',
        holdupKg: 30,
        flowSource: 'F_CL',
        layout: 'spreader',
        measuredAt: '2026-06-24',
        source: {
          kind: 'hmi-live',
          desc: 'τ = M_hopper_esp2 / F_CL × 60',
          detail: 'Hopper con báscula. Capa core lleva ~70 % de la masa → flujo alto → τ menor (~11 s a M=30 kg).',
        },
        equipment: [
          { name: 'Banda interna', atPct: 20 },
          { name: 'Regula volumen', atPct: 45 },
          { name: 'Báscula capa', atPct: 65 },
          { name: 'Rodillos diamante', atPct: 85 },
        ],
      },
    ],
  },
};

export const DOWNSTREAM = [
  {
    id: 'white',
    label: 'Banda blanca → nariz #1',
    kind: 'transport',
    lengthM: 29,
    beltColor: 'white',
    validated: true,
    measuredAt: '2026-06-24',
    source: {
      kind: 'derived',
      date: '2026-06-24',
      desc: 't = L_white / v_prensa × 60',
      detail: '29 m despejados del cronómetro encolador → nariz (120 s × 14,5 m/min ÷ 60). Banda acoplada a prensa.',
    },
    equipment: [
      { name: 'Colchón 3 capas', atPct: 12 },
      { name: 'Báscula central', atPct: 28 },
      { name: 'Pre-prensa ~153 bar', atPct: 52 },
      { name: 'Spray anti-pegado', atPct: 70 },
      { name: 'Nariz #1', atPct: 90 },
    ],
  },
  {
    id: 'red',
    label: 'Banda roja',
    kind: 'transport',
    lengthM: 27.43,
    beltColor: 'red',
    validated: true,
    source: {
      kind: 'measured',
      date: '2026-06',
      desc: 't = L_red / v_prensa × 60',
      detail: '27,43 m de banda acoplada a prensa. Cruza sensor de metales + Dynasteam.',
    },
    equipment: [
      { name: 'Sensor metales', atPct: 22 },
      { name: 'Dynasteam vapor', atPct: 55 },
    ],
  },
  {
    id: 'press',
    label: 'Banda prensa metálica',
    sublabel: '16,6 m activos',
    kind: 'transport',
    lengthM: 16.6,
    beltColor: 'press',
    validated: true,
    source: {
      kind: 'measured',
      date: '2026-06',
      desc: 't = L_press / v_prensa × 60',
      detail: 'Zona activa de prensado: 16,6 m (19 marcos). El total de 45 m incluye el retorno de la banda.',
    },
    equipment: [{ name: '19 marcos prensa', atPct: 50 }],
  },
];

export const INJECTION_OPTIONS = [
  { id: 'dosing-all', label: 'Inicio · ambos dosing bins', group: 'Inicio completo' },
  { id: 'dosing-fine', label: 'Dosing bin fina', group: 'Ruta fina' },
  { id: 'enc-fine', label: 'Encolador fina', group: 'Ruta fina' },
  { id: 'incl-fine', label: 'Banda inclinada fina', group: 'Ruta fina' },
  { id: 'esp3-zone', label: 'Esparcidor 3 (TOP)', group: 'Ruta fina' },
  { id: 'esp1-zone', label: 'Esparcidor 1 (BOTTOM)', group: 'Ruta fina' },
  { id: 'dosing-thick', label: 'Dosing bin gruesa', group: 'Ruta gruesa (core)' },
  { id: 'sprays-caida', label: 'Sprays caída', group: 'Ruta gruesa (core)' },
  { id: 'enc-thick', label: 'Encolador gruesa', group: 'Ruta gruesa (core)' },
  { id: 'incl-thick', label: 'Banda inclinada gruesa', group: 'Ruta gruesa (core)' },
  { id: 'esp2-zone', label: 'Esparcidor 2 (CORE)', group: 'Ruta gruesa (core)' },
  { id: 'white', label: 'Banda blanca', group: 'Tramo común' },
  { id: 'red', label: 'Banda roja', group: 'Tramo común' },
  { id: 'press', label: 'Banda prensa', group: 'Tramo común' },
];

/** Etapas downstream del merge (t=0 ya en colchón o después). */
export const DOWNSTREAM_STAGE_IDS = ['white', 'red', 'press', 'done'];

/** Rutas que reciben marcador según dónde se inyecta el cambio. */
export function pathsForInjection(injectionId) {
  if (injectionId === 'dosing-all') return [PATH_IDS.BOTTOM, PATH_IDS.CORE, PATH_IDS.TOP];
  if (injectionId === 'dosing-fine' || injectionId === 'enc-fine' || injectionId === 'incl-fine') {
    return [PATH_IDS.BOTTOM, PATH_IDS.TOP];
  }
  if (injectionId === 'dosing-thick' || injectionId === 'sprays-caida'
    || injectionId === 'enc-thick' || injectionId === 'incl-thick' || injectionId === 'esp2-zone') {
    return [PATH_IDS.CORE];
  }
  if (injectionId === 'esp1-zone') return [PATH_IDS.BOTTOM];
  if (injectionId === 'esp3-zone') return [PATH_IDS.TOP];
  if (DOWNSTREAM_STAGE_IDS.includes(injectionId)) {
    return [PATH_IDS.BOTTOM, PATH_IDS.CORE, PATH_IDS.TOP];
  }
  return [PATH_IDS.BOTTOM, PATH_IDS.CORE, PATH_IDS.TOP];
}

/** Nodo donde arranca t=0 en cada ruta (null = ruta sin cambio). */
export function startNodeForPath(injectionId, pathId) {
  if (DOWNSTREAM_STAGE_IDS.includes(injectionId)) return null;
  if (injectionId === 'dosing-all') {
    return pathId === PATH_IDS.CORE ? 'dosing-thick' : 'dosing-fine';
  }
  const nodes = nodesForPath(pathId);
  if (nodes.some((n) => n.id === injectionId)) return injectionId;
  return null;
}

export const SPEED_PRESETS = [
  { id: 'thick', label: '36 mm → 7 m/min', mPerMin: 7 },
  { id: 'observed-jun24', label: '9 mm medido 24-jun → 14,5 m/min', mPerMin: 14.5 },
  { id: 'observed', label: 'Observado 22-jun → 16,85 m/min', mPerMin: 16.85 },
  { id: 'thin', label: '9 mm ref. → 23 m/min', mPerMin: 23 },
];

/** Nodos ordenados por ruta (fina incluye prefijo compartido). */
export function nodesForPath(pathId) {
  if (pathId === PATH_IDS.BOTTOM || pathId === PATH_IDS.TOP) {
    return [...FINE_PREFIX, ...PATHS[pathId].nodes];
  }
  return PATHS[pathId].nodes;
}

/** Todos los nodos únicos para el diagrama (sin duplicar prefijo fina). */
export function allDiagramNodes() {
  const seen = new Set();
  const list = [];
  const add = (n, pathId, meta = {}) => {
    if (seen.has(n.id)) return;
    seen.add(n.id);
    list.push({ ...n, pathId, ...meta });
  };

  for (const n of FINE_PREFIX) add(n, 'fine-shared');
  for (const pathId of [PATH_IDS.TOP, PATH_IDS.CORE, PATH_IDS.BOTTOM]) {
    for (const n of PATHS[pathId].nodes) add(n, pathId, { spreaderRow: PATHS[pathId].row });
  }
  for (const n of DOWNSTREAM) add(n, 'merged');
  return list;
}

/**
 * Construye lista de parámetros por etapa. Tres tipos:
 *  - 'mass' (kg)      → holdup live (bin/hopper) o mecánico (encolador)
 *  - 'length' (m)     → longitud de banda
 *  - 'factor' (×)     → multiplicador de banda inclinada
 *  - 'retention' (s)  → t fijo (solo sprays)
 *  - 'buffer' (s)     → buffer manual añadido por operador (todas las etapas)
 */
export function getParameterSchema() {
  const params = [];
  const seen = new Set();

  const push = (node, group, meta = {}) => {
    if (node.model === 'fixed' && (node.retentionSec ?? 0) > 0 && !seen.has(`ret:${node.id}`)) {
      seen.add(`ret:${node.id}`);
      params.push({
        key: `ret:${node.id}`,
        nodeId: node.id,
        label: `τ ${node.label}`,
        unit: 's',
        type: 'retention',
        default: node.retentionSec,
        group,
        required: true,
        kindBadge: 'estimated',
      });
    }
    if (node.holdupKg != null && !seen.has(`mass:${node.id}`)) {
      seen.add(`mass:${node.id}`);
      const isMechanical = node.model === 'cstr';
      params.push({
        key: `mass:${node.id}`,
        nodeId: node.id,
        label: `M ${node.label}`,
        unit: 'kg',
        type: 'mass',
        default: node.holdupKg,
        group,
        required: true,
        kindBadge: isMechanical ? 'mechanical' : 'hmi-live',
        flowSource: node.flowSource,
        model: node.model,
      });
    }
    if ((node.lengthM ?? 0) > 0 && !seen.has(`len:${node.id}`)) {
      seen.add(`len:${node.id}`);
      params.push({
        key: `len:${node.id}`,
        nodeId: node.id,
        label: node.label,
        unit: 'm',
        type: 'length',
        default: node.lengthM,
        group,
        required: true,
        kindBadge: 'measured',
      });
    }
    if (node.speedFactor != null && !seen.has(`factor:${node.id}`)) {
      seen.add(`factor:${node.id}`);
      params.push({
        key: `factor:${node.id}`,
        nodeId: node.id,
        label: `Factor vs prensa · ${node.label}`,
        unit: '×',
        type: 'factor',
        default: node.speedFactor,
        group,
        required: false,
        kindBadge: 'measured',
      });
    }
    // Buffer manual (s) — disponible en TODAS las etapas
    if (!seen.has(`buffer:${node.id}`)) {
      seen.add(`buffer:${node.id}`);
      params.push({
        key: `buffer:${node.id}`,
        nodeId: node.id,
        label: `Buffer manual · ${node.label}`,
        unit: 's',
        type: 'buffer',
        default: 0,
        group,
        required: false,
        kindBadge: 'manual',
      });
    }
  };

  for (const n of FINE_PREFIX) push(n, 'Ruta fina (compartida)');
  for (const path of Object.values(PATHS)) {
    for (const node of path.nodes) push(node, path.label);
  }
  for (const node of DOWNSTREAM) {
    if (!seen.has(`len:${node.id}`)) {
      seen.add(`len:${node.id}`);
      params.push({
        key: `len:${node.id}`,
        nodeId: node.id,
        label: node.label,
        unit: 'm',
        type: 'length',
        default: node.lengthM,
        group: 'Tramo común (blanca → roja → prensa)',
        required: true,
        kindBadge: 'measured',
      });
    }
    if (!seen.has(`buffer:${node.id}`)) {
      seen.add(`buffer:${node.id}`);
      params.push({
        key: `buffer:${node.id}`,
        nodeId: node.id,
        label: `Buffer manual · ${node.label}`,
        unit: 's',
        type: 'buffer',
        default: 0,
        group: 'Tramo común (blanca → roja → prensa)',
        required: false,
        kindBadge: 'manual',
      });
    }
  }
  return params;
}

export function defaultParams() {
  const out = {};
  for (const p of GLOBAL_PARAMS) out[p.key] = p.default;
  for (const p of getParameterSchema()) out[p.key] = p.default;
  return out;
}

export function findNode(nodeId) {
  for (const n of FINE_PREFIX) {
    if (n.id === nodeId) return { ...n, pathId: 'fine-shared' };
  }
  for (const p of Object.values(PATHS)) {
    const n = p.nodes.find((x) => x.id === nodeId);
    if (n) return { ...n, pathId: p.id };
  }
  const d = DOWNSTREAM.find((x) => x.id === nodeId);
  return d ? { ...d, pathId: 'merged' } : null;
}

/** Secuencia para barra de progreso (orden físico izquierda → derecha). */
export const STAGE_SEQUENCE = [
  { id: 'dosing-fine', label: 'Dosing fina', short: 'D.fina' },
  { id: 'enc-fine', label: 'Encolador fina', short: 'Enc.fina' },
  { id: 'dosing-thick', label: 'Dosing gruesa', short: 'D.gruesa' },
  { id: 'sprays-caida', label: 'Sprays caída', short: 'Sprays' },
  { id: 'enc-thick', label: 'Encolador gruesa', short: 'Enc.gruesa' },
  { id: 'incl-fine', label: 'Banda inclinada fina', short: '↗ fina' },
  { id: 'incl-thick', label: 'Banda inclinada gruesa', short: '↗ gruesa' },
  { id: 'esp3-zone', label: 'Esparcidor 3 (TOP)', short: 'Esp.3' },
  { id: 'esp2-zone', label: 'Esparcidor 2 (CORE)', short: 'Esp.2' },
  { id: 'esp1-zone', label: 'Esparcidor 1 (BOTTOM)', short: 'Esp.1' },
  { id: 'white', label: 'Banda blanca', short: 'Blanca' },
  { id: 'red', label: 'Banda roja', short: 'Roja' },
  { id: 'press', label: 'Banda prensa', short: 'Prensa' },
  { id: 'done', label: 'Salida prensa', short: 'Salida' },
];
