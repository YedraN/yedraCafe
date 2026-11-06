# SEO

Revisado con la skill `seo-audit` (técnico, on-page y local). Las posiciones en Google no se pueden prometer: dependen de la ficha de Google Business Profile, las reseñas, la distancia de quien busca y la competencia.

## Búsquedas objetivo

- «Yedra Café Benicalap» y «Yedra Café Valencia» (marca más lugar): las más realistas.
- «cafetería en Benicalap» y «cafeterías en Valencia» (genéricas): dependen sobre todo del perfil de Google Business.

## On-page

| Elemento | Valor |
|---|---|
| `<title>` (55 caracteres) | Yedra Café \| Cafetería de barrio en Benicalap, València |
| Meta description (150 caracteres) | Yedra Café es una cafetería de barrio en la C/ de José Grollo 45, Benicalap (València). Desayunos, almuerzos y bocadillos, para tomar aquí o para llevar. |
| `<h1>` (texto extraído) | «Yedra café, cafetería en Benicalap, València» |
| `<h2>` | Nuestra esencia, Nuestra carta, Una experiencia para disfrutar, Visítanos en Benicalap |
| Idioma | `lang="es-ES"`, `og:locale es_ES` y `geo.region ES-V` |
| Canonical | Autorreferenciada en cada página indexable; la 404 lleva `noindex` y no tiene canonical |
| Open Graph y Twitter | Título, descripción e imagen de 1200×630 (`public/og/yedra-cafe.png`) |
| Dirección | Texto visible en el HTML del hero, de Visítanos y del footer (en `<address>`), idéntica al JSON-LD |

## Técnico

- `robots.txt` permite todo y declara el sitemap.
- `sitemap.xml` incluye `/` y `/aviso-legal`; la 404 queda fuera.
- HTML estático sin dependencia de JS para el contenido: los paneles de la carta están en el HTML, aunque se oculten con JS.
- Rendimiento medido con Lighthouse 12 en local (`astro preview`, sin compresión del servidor):
  - Móvil: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1,4 s, CLS 0, TBT 0 ms.
  - Escritorio: 100 en las cuatro; LCP 0,4 s.
  - Habrá que repetir la medición en producción.
- CSS en línea, fuentes autoalojadas y precargadas, imágenes del mapa en diferido y sin terceros (ni iframes de Maps ni analítica).

## Datos estructurados

`@graph` con `CafeOrCoffeeShop`, `WebSite` y `WebPage`, generado por `src/lib/schema.ts`. Incluye nombre, descripción, url, imagen, logo, `PostalAddress`, `GeoCoordinates`, `hasMap`, `containedInPlace` (Benicalap) y `sameAs` (Instagram y Facebook).

`telephone` y `openingHoursSpecification` ya están incluidos. Se añadirán solos cuando se confirmen en `business.ts`: `email` y `hasMenu` (con la carta real).

**A propósito no se incluye** `aggregateRating`: las reseñas propias no dan estrellas en Google, y la cifra de Google Maps (4,4, 35 reseñas) cambia con el tiempo.

Valídalo en producción con [Rich Results Test](https://search.google.com/test/rich-results) y el [validador de schema.org](https://validator.schema.org/).

## Acciones fuera de la web (las que más impacto tienen)

1. **Google Business Profile**: reclamar o verificar la ficha; categoría principal «Cafetería»; mismo nombre, dirección y teléfono que la web; horario; fotos reales; enlace a la web con UTM (`?utm_source=gbp&utm_medium=organic`).
2. **Coherencia NAP**: actualizar el teléfono de Facebook (muestra +34 747 42 34 73), **corregir el horario de Google Maps** (muestra L–V 7:00–15:00; el real es L–V 7:00–19:00 y S 7:00–15:00) y el de Facebook, y quitar `yedracafe.com` de Google Maps y de los directorios si no se va a recuperar ese dominio.
3. **Instagram y Facebook**: enlazar la web en la bio.
4. **Reseñas**: pedirlas de forma natural en el local (sin incentivos) y responderlas.
5. **Search Console**: dar de alta el dominio, enviar el sitemap y revisar la indexación en 2–4 semanas.

## Pendiente para producción

- Definir `SITE_URL` con el dominio real; los canonical y el sitemap dependen de él.
- Obtener permiso para las fotos actuales o sustituirlas por originales. Ya llevan `alt` descriptivo.
