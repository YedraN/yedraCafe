// Genera src/data/map.generated.json con las calles reales alrededor de Yedra Café
// a partir de OpenStreetMap (© OpenStreetMap contributors, ODbL).
//
// Uso: node scripts/generate-map.mjs
// Solo hace falta volver a ejecutarlo si cambia la ubicación o se quiere otro encuadre.

import { mkdir, writeFile } from 'node:fs/promises';

// Punto de dirección OSM de C/ de José Grollo, 45 (nodo addr:housenumber=45).
const CAFE = { lat: 39.4908734, lon: -0.3907989 };
// Parada de tranvía «Benicalap» (nodo OSM 3373193136).
const TRAM_STOP = { lat: 39.4899812, lon: -0.3900134 };

// Dos portales de la misma acera (37 y 57) para orientar la etiqueta de la calle.
const GROLLO_37 = { lat: 39.490485, lon: -0.3902097 };
const GROLLO_57 = { lat: 39.4911211, lon: -0.3911367 };

// Encuadre: ~620 m × 420 m, desplazado para incluir la parada de tranvía.
const CENTER = { lat: 39.49045, lon: -0.39045 };
const HALF_W_M = 310;
const HALF_H_M = 210;
const WIDTH = 1200;
const HEIGHT = Math.round((WIDTH * HALF_H_M) / HALF_W_M);

const M_PER_DEG_LAT = 111_320;
const M_PER_DEG_LON = M_PER_DEG_LAT * Math.cos((CENTER.lat * Math.PI) / 180);

const bbox = {
  s: CENTER.lat - HALF_H_M / M_PER_DEG_LAT,
  n: CENTER.lat + HALF_H_M / M_PER_DEG_LAT,
  w: CENTER.lon - HALF_W_M / M_PER_DEG_LON,
  e: CENTER.lon + HALF_W_M / M_PER_DEG_LON,
};

const project = ({ lat, lon }) => ({
  x: ((lon - bbox.w) / (bbox.e - bbox.w)) * WIDTH,
  y: ((bbox.n - lat) / (bbox.n - bbox.s)) * HEIGHT,
});

const round = (n) => Math.round(n * 10) / 10;

const toPath = (geometry, close = false, r = round) => {
  const pts = geometry.map(project);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${r(p.x)} ${r(p.y)}`).join('');
  return close ? `${d}Z` : d;
};

const MAJOR = new Set(['primary', 'secondary', 'tertiary', 'trunk']);
const MINOR = new Set(['residential', 'living_street', 'unclassified', 'service', 'pedestrian']);

const query = `[out:json][timeout:60];
(
  way["highway"](${bbox.s},${bbox.w},${bbox.n},${bbox.e});
  way["railway"="tram"](${bbox.s},${bbox.w},${bbox.n},${bbox.e});
  way["building"](${bbox.s},${bbox.w},${bbox.n},${bbox.e});
  way["leisure"~"park|garden|pitch"](${bbox.s},${bbox.w},${bbox.n},${bbox.e});
);
out tags geom;`;

// Servidores públicos de Overpass; si uno falla (502/504 son habituales), se prueba el siguiente.
const ENDPOINTS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
let res;
for (const endpoint of ENDPOINTS) {
  res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'User-Agent': 'yedra-cafe-site/1.0', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ data: query }),
  }).catch(() => undefined);
  if (res?.ok) break;
  console.warn(`Overpass ${endpoint}: ${res?.status ?? 'sin respuesta'}`);
}
if (!res?.ok) throw new Error('Ningún servidor de Overpass respondió');
const { elements } = await res.json();

const streets = { major: [], minor: [] };
const named = new Map();
const tram = [];
const buildings = [];
const parks = [];

for (const el of elements) {
  if (!el.geometry || el.geometry.length < 2) continue;
  const t = el.tags ?? {};
  if (t.railway === 'tram') {
    tram.push(toPath(el.geometry));
  } else if (t.building) {
    buildings.push(toPath(el.geometry, true, Math.round));
  } else if (t.leisure) {
    parks.push(toPath(el.geometry, true));
  } else if (t.highway) {
    const kind = MAJOR.has(t.highway) ? 'major' : MINOR.has(t.highway) ? 'minor' : null;
    if (!kind) continue;
    const d = toPath(el.geometry);
    streets[kind].push(d);
    if (t.name) {
      const list = named.get(t.name) ?? [];
      list.push(el.geometry);
      named.set(t.name, list);
    }
  }
}

// Calle de la cafetería, como un único trazado para poder resaltarla.
const grollo = (named.get('Carrer de José Grollo') ?? []).map((g) => toPath(g));

const cafe = project(CAFE);
const tramStop = project(TRAM_STOP);

const g1 = project(GROLLO_37);
const g2 = project(GROLLO_57);
// Ángulo de la calle, normalizado para que el texto no quede boca abajo.
let labelAngle = (Math.atan2(g2.y - g1.y, g2.x - g1.x) * 180) / Math.PI;
if (labelAngle > 90) labelAngle -= 180;
if (labelAngle < -90) labelAngle += 180;

const out = {
  attribution: '© OpenStreetMap contributors (ODbL)',
  generatedAt: new Date().toISOString().slice(0, 10),
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  width: WIDTH,
  height: HEIGHT,
  parks: parks.join(''),
  major: streets.major.join(''),
  minor: streets.minor.join(''),
  tram: tram.join(''),
  highlight: grollo.join(''),
  cafe: { x: round(cafe.x), y: round(cafe.y) },
  tramStop: { x: round(tramStop.x), y: round(tramStop.y) },
  streetLabel: { x: round((g1.x + g2.x) / 2), y: round((g1.y + g2.y) / 2), angle: round(labelAngle) },
  // Distancia en línea recta café → parada, en metros.
  tramDistanceM: Math.round(
    Math.hypot((CAFE.lat - TRAM_STOP.lat) * M_PER_DEG_LAT, (CAFE.lon - TRAM_STOP.lon) * M_PER_DEG_LON),
  ),
};

// Las manzanas van en un SVG estático aparte (se carga en diferido y no engorda el HTML).
const buildingsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path fill="#333C38" d="${buildings.join('')}"/></svg>\n`;
await mkdir(new URL('../public/map/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/map/benicalap-manzanas.svg', import.meta.url), buildingsSvg);

await writeFile(new URL('../src/data/map.generated.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(
  `map.generated.json: ${buildings.length} edificios, ${streets.major.length + streets.minor.length} calles, ${tram.length} tramos de tranvía, parada a ${out.tramDistanceM} m`,
);
