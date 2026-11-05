# Fotos de Yedra Café

Guarda aquí **solo fotografías auténticas** del local o de sus productos (cedidas o hechas
con permiso del negocio). Después impórtalas en `src/data/gallery.ts` o `src/data/menu.ts`:

```ts
import barra from '../assets/fotos/barra.jpg';
// …
photo: { image: barra, alt: 'Barra de Yedra Café con la cafetera encendida', credit: 'Foto: …' }
```

Astro las optimiza en build (AVIF/WebP y varios tamaños). Sube originales de al menos 1600 px de ancho.
