# Yedra Café

Web de Yedra Café, cafetería de barrio en la C/ de José Grollo 45, Benicalap (València).
Astro 7 estático, TypeScript estricto y sin dependencias de ejecución aparte de Astro.

```bash
pnpm install
pnpm dev        # desarrollo (o: astro dev --background)
pnpm verify     # lint + tipos + build
pnpm preview    # sirve dist/
pnpm map        # regenera el mapa del barrio desde OpenStreetMap
SITE_URL=https://dominio-final.es pnpm build   # build de producción
```

- Contenido del negocio, carta, galería y redes: `src/data/`
- Datos pendientes de confirmar: `docs/RESEARCH.md`
- Estado y tareas: `docs/PROGRESS.md`
- Diseño, arquitectura, movimiento y SEO: `docs/`
