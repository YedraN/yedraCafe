/**
 * Genera una rama de yedra a partir de curvas Bézier cúbicas: el trazado del tallo y
 * la posición, giro y tamaño de cada hoja. Se calcula en build (sin JS en cliente).
 */

export type Point = readonly [number, number];
/** Segmento cúbico: punto de control 1, punto de control 2, punto final. */
export type Segment = readonly [Point, Point, Point];

export interface Leaf {
  /** Punto del tallo del que nace el peciolo. */
  sx: number;
  sy: number;
  /** Base de la hoja. */
  x: number;
  y: number;
  /** Grados. */
  rotate: number;
  scale: number;
  /** 0–1: posición a lo largo del tallo; sirve para escalonar la animación. */
  at: number;
  tone: 0 | 1 | 2;
}

export interface Vine {
  d: string;
  leaves: Leaf[];
}

interface VineOptions {
  start: Point;
  segments: readonly Segment[];
  leafCount: number;
  /** Tamaño base de la hoja (lado del cuadro de 100 unidades escalado). */
  leafSize: number;
  seed?: number;
  /** Hojas entre `from` y 1 (evita hojas en el arranque del tallo). */
  from?: number;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** PRNG determinista (mulberry32) para que la yedra no cambie entre builds. */
const random = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const cubic = (p0: Point, [p1, p2, p3]: Segment, t: number) => {
  const u = 1 - t;
  const x = u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0];
  const y = u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
};

export function createVine({ start, segments, leafCount, leafSize, seed = 7, from = 0.06 }: VineOptions): Vine {
  const rand = random(seed);
  const d =
    `M${r1(start[0])} ${r1(start[1])}` +
    segments.map(([a, b, c]) => `C${r1(a[0])} ${r1(a[1])} ${r1(b[0])} ${r1(b[1])} ${r1(c[0])} ${r1(c[1])}`).join('');

  const leaves: Leaf[] = [];
  for (let i = 0; i < leafCount; i++) {
    // Reparto uniforme con un poco de ruido para que no parezca una regla.
    const at = from + ((1 - from) * (i + 0.5 + (rand() - 0.5) * 0.6)) / leafCount;
    const scaled = at * segments.length;
    const index = Math.min(segments.length - 1, Math.floor(scaled));
    const p0 = index === 0 ? start : segments[index - 1][2];
    const { x, y, angle } = cubic(p0, segments[index], scaled - index);
    const side = i % 2 === 0 ? 1 : -1;
    // La hoja (dibujada apuntando hacia arriba) sale perpendicular al tallo, hacia un lado.
    const rotate = angle + 90 + side * (55 + rand() * 30);
    // Las hojas jóvenes, hacia la punta, son más pequeñas.
    const scale = (0.55 + rand() * 0.45) * (1 - at * 0.35);
    const offset = leafSize * 0.38 * scale;
    const rad = ((rotate - 90) * Math.PI) / 180;
    leaves.push({
      sx: r1(x),
      sy: r1(y),
      x: r1(x + Math.cos(rad) * offset),
      y: r1(y + Math.sin(rad) * offset),
      rotate: r1(rotate),
      scale: Math.round(scale * leafSize) / 100,
      at: Math.round(at * 1000) / 1000,
      tone: (Math.floor(rand() * 3) % 3) as 0 | 1 | 2,
    });
  }
  return { d, leaves };
}

/** Hoja de yedra (Hedera helix) de cinco lóbulos en un cuadro de 100×100, base en (50, 92). */
export const LEAF_PATH =
  'M50 92C40 86 22 84 6 68C13 60 18 54 23 48C17 43 13 37 13 30C23 31 31 33 38 37C38 25 44 13 50 5C56 13 62 25 62 37C69 33 77 31 87 30C87 37 83 43 77 48C82 54 87 60 94 68C78 84 60 86 50 92Z';
export const LEAF_VEINS = 'M50 92L50 16M50 64L20 36M50 64L80 36M50 78L14 66M50 78L86 66';
