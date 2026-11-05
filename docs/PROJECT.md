# Yedra Café: visión y alcance

## Visión

Una web de una sola página para Yedra Café, la cafetería de la C/ de José Grollo 45, en Benicalap (València). Tiene que sentirse de barrio y con identidad propia, nada de plantilla de cafetería. Debe responder rápido a las tres preguntas que trae la mayoría de visitas: **qué sirven, dónde está y cuándo abre**.

## Público

- Vecinos de Benicalap y de los barrios cercanos (Campanar, Burjassot), casi siempre desde el móvil.
- Gente que pasa por la zona o llega en el tranvía (parada Benicalap) y busca «cafetería en Benicalap».
- Personas que encuentran el local en Google Maps o Instagram y quieren confirmar la ubicación y la carta.

## Objetivos

1. Conversión local: llegar al local (botón «Cómo llegar») y consultar la carta.
2. SEO local para «Yedra Café Benicalap», «Yedra Café Valencia», «cafetería en Benicalap» y «cafeterías en Valencia». No se promete ninguna posición concreta.
3. Una identidad visual que el negocio pueda reutilizar: yedra, verde, tipografía editorial.
4. Honestidad con los datos: nada inventado. Lo que falta se ve como pendiente.

## Alcance de la v1

- Inicio con hero, Nuestra esencia, Nuestra carta, Una experiencia para disfrutar (el local), Visítanos en Benicalap y footer.
- Página `/aviso-legal`, con estructura LSSI-CE y RGPD a falta de los datos del titular.
- Página 404, `robots.txt`, `sitemap.xml`, Open Graph y JSON-LD `CafeOrCoffeeShop`.
- Datos del negocio, carta, galería y redes centralizados en `src/data/`.

## Fuera de alcance (v1)

- CMS, backend, reservas, pedidos en línea o formularios.
- Analítica y cookies. Si se añade analítica, habrá que actualizar el aviso legal y valorar un banner de consentimiento.
- Versión en valenciano o en inglés. La arquitectura lo permite (ver ARCHITECTURE.md).

## Estado

Lista para presentar al cliente. **No está lista para producción** hasta cerrar los datos pendientes de `RESEARCH.md`, sobre todo horario, teléfono, carta, fotos, dominio y datos legales.
