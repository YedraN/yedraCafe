# Sistema de movimiento

Se basa en las skills `animate` e `improve-animations` (filosofía de Emil Kowalski). El principio rector: **un solo momento orquestado** (la entrada del hero) y, después, movimiento solo donde explica algo o responde a una acción.

## Tokens (`src/styles/tokens.css`)

| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entradas, hovers, pulsaciones |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Movimiento en pantalla: máscaras, trazo de la yedra, indicador de pestañas |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Menú móvil |
| `--dur-press` | 160 ms | Pulsación de botones |
| `--dur-ui` | 220 ms | Hovers, color, subrayados |
| `--dur-panel` | 420 ms | Paneles |
| `--dur-reveal` | 900 ms | Titulares (marketing, poco frecuente) |
| `--dur-draw` | 1800 ms | Trazo de la yedra |
| `--stagger` | 60 ms | Escalonado de grupos |

No se usa `ease-in`, ni `transition: all`, ni `scale(0)`. Solo se animan `transform`, `opacity`, `clip-path` y `stroke-dashoffset`.

## Inventario

| # | Qué | Frecuencia y propósito | Herramienta | Ingredientes |
|---|---|---|---|---|
| 1 | Entrada del hero | Una vez por visita; explicación y deleite | CSS `@keyframes` (fuera del hilo principal, sin JS) | Marco: máscara `clip-path` 1200 ms ease-in-out con la ilustración asentándose (`scale` 1.14→1, 1800 ms). Cabecera: 300 ms. Letras de «Yedra» sobre máscara, escalonadas 70 ms desde 220 ms. Entradilla palabra a palabra a 35 ms. Yedra: el tallo se dibuja en 1800 ms desde 650 ms y las hojas brotan según su posición en el tallo. Pie del hero a 1050 ms. |
| 2 | Titulares de sección | Una vez por titular | IntersectionObserver + CSS | Palabras sobre máscara, `translateY(108%)`→0, 900 ms ease-out, 45 ms entre palabras |
| 3 | Fotos con máscara | Una vez | IO + CSS | `clip-path: inset(100% 0 0 0)`→`inset(0)` en 1100 ms ease-in-out, con la imagen interior de 1.08 a 1 en 1400 ms |
| 4 | Parallax del collage | Continuo al hacer scroll | CSS scroll-driven (`animation-timeline: view()`) | `translateY` según `--depth`: ±70 px en escritorio, ±28 px en móvil. Solo donde hay soporte y sin movimiento reducido. |
| 5 | Yedra del footer | Una vez | IO + CSS | Mismo trazo y brote que el hero |
| 6 | Mapa | Una vez | IO + CSS | José Grollo se dibuja en 1400 ms; el pin aterriza (−24 px, scale 0.9→1, 600 ms) y emite dos pulsos |
| 7 | Pestañas de la carta | Ocasional | WAAPI (interrumpible: cancela la anterior) | Indicador: `transform` 250 ms ease-in-out. Platos: opacidad y `translateY(14px)`, 420 ms, 45 ms entre elementos |
| 8 | Menú móvil | Ocasional | Transición CSS | Apertura `clip-path` 480 ms con el ease de drawer; cierre en 340 ms (más rápido). Enlaces escalonados a 55 ms; la hamburguesa se convierte en X en 220 ms. |
| 9 | Cabecera | Al hacer scroll | Transición CSS | Se oculta al bajar y vuelve al subir (300 ms ease-out); fondo sólido tras 24 px |
| 10 | Botones | Decenas de veces por visita | Transición CSS | Pulsación `scale(0.97)` 160 ms; relleno que sube en hover 220 ms (solo con `hover: hover` y `pointer: fine`) |
| 11 | Enlaces | Decenas de veces | Transición CSS | Subrayado con `scaleX` o `background-size` en 220 ms, solo con puntero fino |
| 12 | Indicador de scroll | Tres pasadas | CSS | Línea que recorre el carril; se detiene para no distraer |

## Accesibilidad del movimiento

- `prefers-reduced-motion: reduce` aparece en todos los archivos con animación. No significa cero movimiento: se quitan desplazamientos, escalas y trazos, y se conservan fundidos cortos (300–500 ms) que ayudan a entender el cambio. La yedra aparece completa con un fundido, el mapa no dibuja la calle y el collage no tiene parallax.
- Los hovers con movimiento solo se activan con `(hover: hover) and (pointer: fine)`, porque en táctil dispararían hovers falsos.
- Nada bloquea el scroll ni la interacción. Los escalonados son decorativos, el contenido es usable desde el primer frame y no hay `scroll-jacking`.
- Sin JS, nada queda oculto: los estados iniciales dependen de la clase `.js`.

## Detalle técnico: revelados con `clip-path`

Chromium descuenta el `clip-path` del propio elemento al calcular la intersección, así que un elemento con `inset(100% …)` nunca se considera visible. `motion.ts` observa el **contenedor** de las máscaras y aplica `[data-visible]` al elemento.

## Auditoría (`improve-animations`)

Se revisaron los ocho apartados de la skill. Hallazgos ya corregidos:

| Severidad | Hallazgo | Corrección |
|---|---|---|
| MEDIUM | Hovers de botón, nav y footer a 420 ms en elementos de uso frecuente | 220 ms |
| MEDIUM | Menú móvil con apertura y cierre casi iguales (560 ms) | 480 ms al abrir, 340 ms al cerrar |
| LOW | Indicador de pestañas a 320 ms | 250 ms (receta de la skill) |
| LOW | Indicador de scroll en bucle infinito | Tres iteraciones |
| LOW | Footer sin variante de movimiento reducido | Añadida |
| HIGH (bug) | Las máscaras nunca se revelaban (`clip-path` + IO) | Se observa el contenedor |

## Qué revisar a ojo

Estas cosas no se pueden juzgar por el código:

- El brote de las hojas del hero al 25 % de velocidad (panel Animations de DevTools).
- El parallax del collage en un móvil real (Safari 26+ y Chrome).
- El cierre del menú móvil en un dispositivo táctil.
