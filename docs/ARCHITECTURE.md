# Arquitectura

## Stack

- **Astro 7** (ya configurado en el repositorio). Se mantuvo en lugar de Next.js porque el brief pide respetar el stack existente y porque una web de contenido estático no necesita un runtime de React. El resultado es HTML estático con unos 3 KB de JS de cliente en total.
- **TypeScript estricto** (`astro/tsconfigs/strict`).
- **CSS con ámbito de componente y tokens globales.** No se usa Tailwind: no estaba instalado y no aporta nada a una sola página con un sistema de tokens propio.
- **Animación con CSS, WAAPI e IntersectionObserver.** No se usan Motion ni GSAP: ninguna secuencia lo justificaba (ver ANIMATIONS.md).
- **Iconos**: geometría de Lucide en línea, sin dependencia.
- **Imágenes**: `astro:assets` (`<Picture>`) para las fotos reales; las ilustraciones son SVG en línea.
- **Fuentes**: API de fuentes de Astro (Google, autoalojadas en build).

Dependencias de desarrollo: `@astrojs/check`, `typescript` (6.0, compatible con el ecosistema actual), `eslint` 10, `eslint-plugin-astro`, `typescript-eslint` y `@types/node`. **No hay dependencias de ejecución aparte de `astro`.**

## Estructura

```
src/
  data/                    ← fuente única de verdad del contenido
    types.ts               Verified<T>, OpeningHours, Photo, ArtVariant…
    business.ts            datos del negocio con estado confirmado/pendiente; enlaces a Maps
    menu.ts                carta (provisional)
    gallery.ts             fotos reales del local (y su ilustración de reserva)
    site.ts                título, descripción y navegación
    map.generated.json     calles reales (generado; no editar a mano)
  lib/
    vine.ts                geometría de la yedra (Bézier, PRNG determinista)
    schema.ts              JSON-LD a partir de data/
  layouts/BaseLayout.astro head SEO, fuentes, JSON-LD, skip link, header y footer
  components/
    layout/                Header (navegación y menú móvil), Footer
    sections/              Hero, Esencia, Carta, Experiencia, Visitanos
    ui/                    Button, Icon, Pending, PhotoFrame, SplitWords, Wordmark
    art/                   IvyVine, ArtPanel
    map/                   NeighborhoodMap
  scripts/motion.ts        un único IntersectionObserver para los revelados
  styles/                  tokens.css y global.css
  pages/                   index, aviso-legal, 404, robots.txt.ts, sitemap.xml.ts
  assets/fotos/            fotos reales (instrucciones en el README)
public/
  favicon.svg, apple-touch-icon.png, og/yedra-cafe.png
  map/benicalap-manzanas.svg   manzanas del mapa (generado, carga diferida)
scripts/generate-map.mjs   descarga OSM y genera los dos archivos del mapa
```

## Flujo de datos

`business.ts` define cada dato como `Verified<T>`:

```ts
{ status: 'confirmado', value, sources } | { status: 'pendiente', value | null, note, sources }
```

- Los componentes muestran el valor si está `confirmado` y `<Pending>` si está `pendiente`.
- `schema.ts` solo publica en el JSON-LD los datos `confirmado`. El teléfono, el horario y el correo aparecerán solos al confirmarlos.
- La carta pasa al JSON-LD (`hasMenu`) cuando sus platos dejen de tener `provisional: true`.
- La dirección, las coordenadas y el transporte están tipados como obligatoriamente confirmados: la web no compila si se marcan como pendientes.

### Tareas habituales

| Tarea | Cómo |
|---|---|
| Confirmar el horario | `business.hours = { status: 'confirmado', value: [{ days: ['Monday', …], opens: '07:00', closes: '15:00' }], sources: […] }` |
| Confirmar el teléfono | `business.phone = { status: 'confirmado', value: '+34 …', sources: […] }` |
| Carta real | Editar `menu.ts`, quitar `provisional` y añadir `price` solo si está confirmado. |
| Fotos | Ver `src/assets/fotos/README.md`. |
| Regenerar el mapa | `pnpm map` (requiere red; usa Overpass con un servidor de reserva). |

## Mejora progresiva

- Sin JS: todo el contenido es visible. Los paneles de la carta salen uno debajo de otro, no hay máscaras y la yedra aparece completa. El script en línea `document.documentElement.classList.add('js')` es el único que habilita los estados ocultos iniciales.
- El hero se anima solo con CSS, así que no depende de que cargue el JS.

## Calidad

```bash
pnpm lint     # ESLint (TS + Astro)
pnpm check    # astro check (tipos)
pnpm build    # build estático en dist/
pnpm verify   # los tres en orden
```

## Despliegue

Es un sitio estático (`dist/`), apto para cualquier CDN (Netlify, Vercel, Cloudflare Pages o GitHub Pages).

- **Obligatorio**: definir `SITE_URL` con el dominio final. Si no, canonical, sitemap y Open Graph usan el marcador `https://yedracafe.example`.
- `build.format: 'file'` genera `/aviso-legal.html`. Los hosts habituales sirven `/aviso-legal` sin extensión; compruébalo en el elegido.
- `404.html` se genera para hosts que lo usan automáticamente.

## Ampliaciones previstas

- **i18n** (valenciano o inglés): usar el routing i18n de Astro y mover los textos de las secciones a `src/data/`.
- **CMS ligero**: los tipos de `src/data/` encajan con content collections de Astro o con un CMS headless.
