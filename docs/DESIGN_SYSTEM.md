# Sistema de diseño

## Concepto: «El toldo azul y la yedra de la pared»

La identidad sale del **local real** (fotos del negocio en Google Maps):

- Un toldo **azul intenso** con «Yedra» en letra caligráfica blanca: es lo que se reconoce desde la calle.
- Un rótulo **casi negro** con «Yedra» en blanco y «CAFÉ» en cobre, y una pizarra en el comedor.
- Un **suelo de damero** en diagonal, azul lavanda y ocre arena, que sale hasta la puerta.
- **Paredes blancas**, mesas y estanterías de **madera clara**, sillas negras.
- **Yedra de verdad** colgando de la pared del comedor.

Cómo se traduce a la web:

- **El motivo**: la rama de yedra en SVG (`IvyVine.astro`), ahora con los verdes de la planta real. Trepa por el marco del hero, que enmarca justo la foto de la yedra del comedor, y cuelga del footer.
- **El color de marca**: el azul del toldo (hero, cabecera, menú y footer).
- **La carta sobre pizarra**, como el rótulo y la pizarra del interior.
- **El damero del suelo** como remate de «Visítanos», a modo de escalón de entrada.
- **Una sola forma especial**: el arco del marco del hero. Lo demás es recto (`--radius-s: 2px`).

### Historial

La v1 usaba una paleta verde yedra inventada a partir del nombre, porque entonces no había acceso a fotos del local. Se sustituyó tras ver la ficha de Google Maps: el cliente comentó que esa paleta no encajaba con el bar.

## Paleta

| Token | Hex | Origen | Uso |
|---|---|---|---|
| `--toldo` | `#1F4E9F` | Toldo de la fachada | Color de marca. Hero, cabecera, menú móvil, footer, botones sobre claro. |
| `--toldo-2` | `#2D5DB0` | Toldo con luz | Capas sobre azul (marca gigante del footer). |
| `--toldo-osc` | `#173B78` | Toldo en sombra | Titulares sobre ocre. |
| `--pizarra` | `#222A27` | Rótulo y pizarra | Texto sobre claro y fondo de la carta y del mapa. |
| `--pizarra-2` | `#585F5B` | | Texto secundario sobre cal. |
| `--ocre` | `#E6C88C` | Baldosa ocre | Acento sobre oscuro y fondo de «Visítanos». |
| `--baldosa` | `#8B9DC9` | Baldosa azul | Solo en el damero. |
| `--cal` | `#F7F5F0` | Pared | Papel. |
| `--cal-2` | `#ECE8DF` | | Papel en sombra. |
| `--cobre` | `#C8692E` | «CAFÉ» del rótulo | Detalles (parada de tranvía y vías del mapa). Nunca texto pequeño. |
| `--madera` | `#B98E62` | Mesas | Reservado. |
| `--yedra`, `--yedra-2`, `--yedra-3` | `#6E9B58`, `#3F6B3A`, `#A6C78A` | Yedra de la pared | Hojas, tallo y favicon. |

Los colores se muestrearon en las fotos y se corrigieron a ojo: el sol y la cámara del móvil desplazan los tonos. Para transparencias hay canales RGB (`--cal-rgb`, `--pizarra-rgb`, `--toldo-rgb`, `--ocre-rgb`).

Contrastes WCAG medidos:

| Combinación | Ratio |
|---|---|
| cal sobre toldo | 7,3:1 |
| ocre sobre toldo | 4,9:1 |
| cal sobre pizarra | 13,5:1 |
| ocre sobre pizarra | 7,9:1 |
| pizarra sobre cal | 13,5:1 |
| pizarra-2 sobre cal | 6,0:1 |
| pizarra sobre ocre | 9,1:1 |
| toldo-osc sobre ocre | 6,7:1 |
| toldo sobre ocre | 4,9:1 |

### Ritmo de secciones

Toldo (hero), cal (esencia), pizarra (carta), cal (el local), ocre con damero (visítanos), toldo (footer).

## Tipografía

| Rol | Familia | Por qué |
|---|---|---|
| Display | **Gloock** 400 | Serif de alto contraste con terminaciones afiladas. Recuerda a los rótulos y cartas de bar antiguos sin caer en el retro de plantilla. En tamaño gigante («Yedra») funciona como logotipo. |
| Texto e interfaz | **Familjen Grotesk** 400–700 (variable) | Grotesca con carácter (la «g», la «y») que no es Inter ni ninguna fuente por defecto. Muy legible en tamaños pequeños. |

Las dos se sirven en local con la API de fuentes de Astro (`fontProviders.google()`): se descargan en build, se precargan y llevan fallbacks con métricas ajustadas para evitar saltos de maquetación (CLS 0).

Escala fluida (`tokens.css`), basada en la escala clásica 14/17/21/24/36/48/60/72:

| Token | Tamaño | Uso |
|---|---|---|
| `--step--1` | 14 px | Pies y etiquetas |
| `--step-0` | 16–18 px | Texto |
| `--step-1` y `--step-2` | 19–24 px | Entradillas y nombres de plato |
| `--step-3` a `--step-5` | 28–72 px | Titulares |
| Titular del hero | `clamp(6rem, 31vw, 30rem)`; 22vw en escritorio | El nombre «Yedra» |

Reglas: interlineado de 1.55 en texto y 1.0–1.1 en titulares; `text-wrap: balance` en titulares y `pretty` en párrafos; medida máxima de 34em. No se usan mayúsculas sostenidas en etiquetas, ni etiquetas encima de cada titular, ni palabras resaltadas sueltas.

## Espaciado y retícula

- Escala espaciosa de 4 a 128 px (`--space-1` a `--space-10`); secciones de `clamp(5rem, …, 11rem)`.
- Retícula de 12 columnas en escritorio (≥ 64rem), composiciones asimétricas y piezas que sangran hasta el borde (foto de Esencia, mapa).
- Margen lateral fluido (`--gutter`) de 20 a 56 px.
- Puntos de corte: 40rem (móvil grande), 48rem (tablet), 56rem (navegación de escritorio), 64rem (retícula completa), 80rem.

## Composiciones clave

```
HERO (escritorio)                          HERO (móvil)
┌──────────────────────────────────────┐   ┌──────────────┐
│ Yedra café      nav nav nav [Llegar] │   │ Yedra   Menú │
│ Desayunos, almuerzos      ╭──────╮🌿 │   │ Desayunos,   │
│ y comidas a un paso…    🌿│ arco │   │   │ almuerzos…   │
│                           │ taza │🌿 │   │      ╭────╮🌿│
│ c                         ╰──────╯   │   │     🌿│taza│ │
│ a  Y e d r a           🌿            │   │ cY e d r a   │
│ f ─────────────────────────────────  │   │ ──────────── │
│ é  dirección   [Carta][Dónde]  ↓     │   │ dirección    │
└──────────────────────────────────────┘   │ [Ver carta ] │
                                           │ [Dónde     ] │
                                           └──────────────┘
```

- **Esencia**: titular de 9 columnas; texto en las columnas 2–6, foto en 7–12 hasta el borde; «el día» como línea temporal de tres momentos. Es una secuencia real (mañana, media mañana, mediodía), por eso va numerada en orden.
- **Carta**: índice lateral fijo con pestañas en Gloock grande y lista de platos con línea de puntos solo si hay precio. En móvil, las pestañas hacen scroll horizontal.
- **El local**: collage de 5 piezas con tamaños, alturas y profundidades de parallax distintas.
- **Visítanos**: datos en una lista de definición y mapa ilustrado con calles reales.

## Componentes

| Componente | Función |
|---|---|
| `Button` | Variantes `solid` y `line`, sobre fondo oscuro o claro. Relleno que sube al pasar el ratón; pulsación con `scale(0.97)`. |
| `Pending` | Marca discontinua «Pendiente de confirmar» con la nota en `title`. |
| `PhotoFrame` | Foto real con `<Picture>` (AVIF/WebP) o ilustración de marca con el aviso de foto pendiente. |
| `ArtPanel` | Seis ilustraciones de reserva para huecos sin foto: taza, hojas, azulejo, vaso, barra y granos. |
| `IvyVine` | Rama de yedra generada en build. |
| `NeighborhoodMap` | Mapa del barrio a partir de datos de OSM. |
| `Wordmark` | Logotipo provisional. |
| `SplitWords` | Titulares revelados palabra a palabra. |

## Iconografía

Trazos de Lucide (ISC) en línea en `Icon.astro`: 1,75 px, decorativos (`aria-hidden`), nunca emojis.

## Fotografía

Fotos reales del negocio (ver la tabla en RESEARCH.md), servidas con `<Picture>` en AVIF y WebP. Cada una lleva su encuadre (`position`) para los recortes 4:5, 3:2, 3:4 y 1:1. Las ilustraciones de `ArtPanel` se quedan como reserva para huecos sin foto.

Para una sesión nueva: luz natural, la fachada con el toldo, la yedra del comedor, manos y tazas en la barra, y el damero. Instrucciones en `src/assets/fotos/README.md`.

### Pendiente de identidad

El logotipo real es caligráfico (rótulo y toldo). La web aún usa «Yedra» en Gloock como logotipo provisional. Con el archivo vectorial del rótulo se puede sustituir `Wordmark.astro` y el titular del hero.
