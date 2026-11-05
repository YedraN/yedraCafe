# Progreso

Última actualización: 6 de noviembre de 2026.

## Fases

| Fase | Estado | Notas |
|---|---|---|
| 1. Investigación | Hecha | Repo (Astro 7), skills leídas, negocio verificado por la dirección. Ver RESEARCH.md. |
| 2. Dirección visual | Hecha | Concepto «El toldo azul y la yedra de la pared», paleta sacada del local, Gloock con Familjen Grotesk. Ver DESIGN_SYSTEM.md. |
| 3. Arquitectura | Hecha | Datos tipados con estado de verificación, tokens, componentes base. |
| 4. Desarrollo | Hecha | Todas las secciones, aviso legal, 404, robots y sitemap. Mapa con datos de OSM. |
| 5. Motion | Hecha | Coreografía del hero, revelados, parallax, pestañas y menú. Auditoría aplicada. |
| 6. Optimización | Hecha | SEO, guías de interfaz web, accesibilidad y rendimiento. |
| 7. Auditoría final | Hecha | Ver comprobaciones. |

## Cambios del 6 de noviembre (petición del cliente)

- Las ilustraciones se sustituyen por **7 fotos reales** subidas por el propio negocio a Google Maps (hero, esencia y collage). Las de visitantes se excluyeron. Se corrigió la orientación y se quitó el EXIF.
- **Paleta nueva** sacada del local: azul del toldo, pizarra del rótulo, ocre y azul del damero, blanco de la pared y verde de la yedra. Se añadió el damero como remate de «Visítanos».
- Datos de Google Maps: **teléfono confirmado** (651 11 42 39, también en el JSON-LD) y **horario** L–V 7:00–15:00, que se muestra marcado como pendiente porque contradice a Facebook.
- La carta provisional se ajustó a lo que aparece en las fotos del negocio. Sigue marcada como provisional y sin precios.
- Se regeneraron la imagen OG, el favicon y el icono de Apple.
- El cliente confirmó el horario: lunes a viernes de 7:00 a 19:00 y sábado de 7:00 a 15:00. Los días cerrados se calculan a partir de los datos.

## Comprobaciones realizadas

- `pnpm lint`: sin errores.
- `pnpm check` (`astro check`): 0 errores, 0 avisos, 0 sugerencias.
- `pnpm build`: correcto (3 páginas, `robots.txt` y `sitemap.xml`).
- Capturas con Chromium headless a 375×812, 820×1180 y 1440×900, en página completa y por secciones. Sin errores de consola y sin scroll horizontal (`scrollWidth` igual al ancho de la ventana).
- Pruebas de interacción automatizadas:
  - El primer Tab enfoca «Saltar al contenido», que se ve y lleva a `#contenido`.
  - Pestañas: flechas, Home y End cambian de panel y solo queda visible el activo.
  - Menú móvil: se abre, `main` queda `inert`, el foco va al primer enlace, Escape lo cierra y devuelve el foco al botón, y al pulsar un enlace se cierra y navega.
  - Con movimiento reducido el hero se muestra sin desplazamientos.
  - Sin JS, los 4 paneles de la carta están visibles y las máscaras no recortan nada.
- Lighthouse 12 (local, con fotos reales):
  - Móvil: 100 en Performance, Accessibility, Best Practices y SEO; LCP 1,9 s, CLS 0, TBT 0 ms.
  - Escritorio: 100 en las cuatro; LCP 0,4 s.
  - Queda un aviso de «imágenes responsive» (unos 68 KB por recortes de `object-fit`) que no penaliza la puntuación.
- Enlaces: todas las anclas internas existen y no hay rutas internas rotas. `/no-existe` devuelve 404.

**No probado**: dispositivos reales iOS y Android, Safari y Firefox, lectores de pantalla reales (VoiceOver y NVDA), y validación del JSON-LD en Rich Results Test (requiere una URL pública).

## Pendiente: contenido del negocio (bloquea producción)

- [x] Horario: L–V 7:00–19:00, S 7:00–15:00, D cerrado (confirmado por el cliente; ya en la web y en el JSON-LD)
- [x] Teléfono: 651 11 42 39 (Google Maps e InTravel)
- [ ] Carta y precios reales (ahora es provisional, con aviso)
- [ ] **Permiso del propietario** para usar las fotos de Google Maps, o los originales
- [ ] Logotipo vectorial del rótulo (caligráfico) para sustituir el provisional
- [ ] Datos legales del titular
- [ ] Dominio, para definir `SITE_URL`
- [ ] Validar con el propietario los textos de marca de Esencia y del local

## Pendiente: técnico, después de recibir los datos

- [ ] Medir Lighthouse en producción, con compresión y CDN
- [ ] Validar el JSON-LD en Rich Results Test
- [ ] Probar en Safari iOS y en Chrome Android reales
- [ ] Opcional: sincronizar la pestaña activa de la carta con la URL (`#carta-desayunos`)
- [ ] Opcional: versión en valenciano
