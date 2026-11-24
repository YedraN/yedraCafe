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

- Producción: `https://yedracafe.es` en Vercel. `www` y `http` redirigen con 308 al dominio principal. Compresión Brotli y TTFB de unos 120 ms (24/11/2026).
- `robots.txt` permite todo y declara el sitemap.
- `sitemap.xml` incluye `/` y `/aviso-legal`; la 404 queda fuera.
- `vercel.json` activa `cleanUrls`. Sin él, `/aviso-legal` daba 404 en Vercel (solo respondía `/aviso-legal.html`), aunque lo enlazaban el pie y el sitemap. Ahora `/aviso-legal.html` redirige con 308 a `/aviso-legal`. El archivo de verificación de Search Console también redirige a su versión sin `.html`; Google sigue redirecciones dentro del mismo dominio, pero conviene comprobar en Search Console que la propiedad sigue verificada.
- HTML estático sin dependencia de JS para el contenido: los paneles de la carta están en el HTML, aunque se oculten con JS.
- Rendimiento medido con Lighthouse 12 en local (`astro preview`, sin compresión del servidor):
  - Móvil: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1,4 s, CLS 0, TBT 0 ms.
  - Escritorio: 100 en las cuatro; LCP 0,4 s.
  - Habrá que repetir la medición en producción.
- CSS en línea, fuentes autoalojadas y precargadas, imágenes del mapa en diferido y sin terceros (ni iframes de Maps ni analítica).

## Datos estructurados

`@graph` con `CafeOrCoffeeShop`, `WebSite` y `WebPage`, generado por `src/lib/schema.ts`. Incluye nombre, descripción, url, logo, `PostalAddress`, `GeoCoordinates`, `containedInPlace` (Benicalap), `sameAs` (Instagram y Facebook), `telephone`, `openingHoursSpecification` y además:

- `image`: 4 fotos reales en JPEG de hasta 1200 px (fachada, comedor, vitrina y bollería; vertical, 4:3 y 1:1) más la imagen OG. Se generan a partir de `schemaPhotos` en `src/data/gallery.ts`.
- `hasMap`: la ficha de Google Maps por su CID (`maps.place` en `business.ts`), no una búsqueda.
- `servesCuisine`: café, desayunos, almuerzos y bocadillos (`business.cuisine`, confirmado por el cliente).

Se añadirán solos cuando se confirmen en `business.ts`: `email` y `hasMenu` (con la carta real).

**A propósito no se incluye**:

- `aggregateRating`: las reseñas propias no dan estrellas en Google, y la cifra de Google Maps (4,4, 35 reseñas) cambia con el tiempo.
- `priceRange`: no hay precios confirmados. Añadirlo (p. ej. `"1-10 €"`) cuando llegue la carta con precios.

Valídalo en producción con [Rich Results Test](https://search.google.com/test/rich-results) y el [validador de schema.org](https://validator.schema.org/).

## Situación en Google Maps (24/11/2026)

- La ficha «Yedra cafe» (categoría Cafetería, 4,4 con 35 reseñas, 44 fotos casi todas de 2022) **sigue enlazando a `yedracafe.com`**, que no existe, y **sigue con el horario antiguo** (L–V 7:00–15:00, sábado cerrado).
- Las dos reseñas más recientes (hace 5 y 11 meses) se quejan de encontrar el local cerrado dentro del horario anunciado, y no tienen respuesta visible.
- Con el mapa centrado en el local, la búsqueda «cafetería en Benicalap» no muestra Yedra entre los 10 primeros. Los que salen tienen entre 16 y 760 reseñas; la mayoría, más de 80.

## Acciones fuera de la web (las que más impacto tienen)

1. **Google Business Profile**: cambiar el sitio web a `https://yedracafe.es/?utm_source=gbp&utm_medium=organic`; corregir el horario (L–V 7:00–19:00, S 7:00–15:00) y cumplirlo; subir fotos recientes; revisar categorías secundarias y atributos (desayunos, para llevar); añadir la carta cuando exista.
2. **Coherencia NAP**: actualizar el teléfono de Facebook (muestra +34 747 42 34 73) y su horario; revisar la ficha de Too Good To Go, que lo clasifica como «panadería y pastelería».
3. **Instagram y Facebook**: enlazar la web en la bio.
4. **Reseñas**: pedirlas de forma natural en el local (por ejemplo, un QR en la barra y sin incentivos) y responderlas todas, también las negativas.
5. **Search Console** (ya verificado): enviar el sitemap y revisar «Páginas» y «Rendimiento». Dar de alta también Bing Webmaster Tools importando desde Search Console.

## Pendiente

- Carta real con precios: quitaría el aviso «Carta provisional» y activaría `hasMenu` y `priceRange`.
- Datos del titular para el aviso legal (ahora muestra «Pendiente de confirmar»).
- Obtener permiso para las fotos actuales o sustituirlas por originales. Ya llevan `alt` descriptivo y también se publican en el JSON-LD.
- Opcional: una sección de preguntas frecuentes con datos confirmados (pago con tarjeta, punto de recogida de paquetes si lo es, terraza).
