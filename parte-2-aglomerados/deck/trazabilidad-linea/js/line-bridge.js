/* ============================================================
   NOVOPAN · Línea 1 · Sección 2 — puente motor ⇄ SVG
   ------------------------------------------------------------
   Traduce los marcadores del trace-engine (posición en METROS por
   banda: white/red/press) a la coordenada X del canvas horizontal,
   y arma las anotaciones discretas de distancias medidas.

   Parte 1 (jul-2026): el SVG es PROPORCIONAL a los metros medidos.
   Se usa UNA sola escala lineal `x = X0 + PX_PER_M × m` (0 → 71.6 m),
   compartida por equipos, regla, trazador y anotaciones.
   ============================================================ */

import {
  bandSegmentsWithBounds, bandWaypoints, bandLengthM,
} from '../../trazabilidad/js/core/process-graph.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Offset absoluto (m) del inicio de cada banda a lo largo del downstream.
// Usa los totales del contenedor (45 / 10) para casar con marker.positionM.
export const BAND_OFFSET = { white: 0, red: 45, press: 55 };
export const DOWNSTREAM_TOTAL_M = 71.6; // 45 + 10 + 16.6

// Escala lineal única del downstream (misma que el SVG y la regla).
export const X0 = 80;        // px del metro 0 (formación del colchón)
export const PX_PER_M = 70;  // px por metro medido

/** Mapea metros absolutos del downstream a X del canvas (escala lineal única). */
export function mapAbsMToX(absM) {
  return X0 + PX_PER_M * clamp(absM, 0, DOWNSTREAM_TOTAL_M);
}

/** Metros absolutos del downstream para un marcador del motor. */
export function absMForMarker(m) {
  if (!m) return 0;
  if (m.nodeId === 'done' || m.phase === 'done') return DOWNSTREAM_TOTAL_M;
  const band = m.bandId ?? m.nodeId;
  const off = BAND_OFFSET[band];
  if (off == null) return 0;
  return off + (m.positionM ?? 0);
}

/** Selecciona el marcador downstream (white/red/press/done) del estado. */
export function pickDownstreamMarker(state) {
  const ids = ['white', 'red', 'press', 'done'];
  let best = null;
  for (const m of state.markers ?? []) {
    if (ids.includes(m.nodeId)) best = m; // el downstream se agrega al final
  }
  return best;
}

/** Texto corto de posición del marcador para lectura en vivo. */
export function markerReadout(m) {
  if (!m) return '—';
  if (m.nodeId === 'done' || m.phase === 'done') return 'Salida prensa · 71.6 m';
  const absM = absMForMarker(m);
  const seg = m.segmentLabel ? ` · ${m.segmentLabel}` : '';
  return `${absM.toFixed(1)} m${seg}`;
}

/**
 * Anotaciones discretas de distancias medidas:
 *  - segments: longitud de cada tramo (zonas + gaps) de blanca/roja + resumen prensa
 *  - waypoints: puntos con posición (m) y % de su banda
 */
export function buildAnnotations() {
  const segments = [];
  const waypoints = [];

  for (const band of ['white', 'red']) {
    const off = BAND_OFFSET[band];
    for (const s of bandSegmentsWithBounds(band)) {
      const cAbs = off + (s.startM + s.endM) / 2;
      segments.push({ x: mapAbsMToX(cAbs), len: s.lengthM, type: s.type, label: s.label });
    }
  }
  // Prensa: resumen de pitch (no se etiqueta cada marco para no saturar).
  segments.push({ x: mapAbsMToX(55 + 2.35), len: 0.75, type: 'pitch', label: '6× 0.75 m' });
  segments.push({ x: mapAbsMToX(55 + 10.0), len: 0.90, type: 'pitch', label: '12× 0.90 m' });

  const pressShow = new Set(['point:m1', 'point:m7', 'point:m13', 'point:m19', 'point:end']);
  for (const band of ['white', 'red', 'press']) {
    const off = BAND_OFFSET[band];
    const total = bandLengthM(band) || 1;
    for (const w of bandWaypoints(band)) {
      if (band === 'press' && !pressShow.has(w.id)) continue;
      waypoints.push({
        x: mapAbsMToX(off + w.atM),
        atM: w.atM,
        pct: Math.round((w.atM / total) * 100),
        label: w.label,
        band,
      });
    }
  }
  return { segments, waypoints };
}
