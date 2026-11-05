# Investigación: Yedra Café (Benicalap, València)

Fecha de la investigación: 5 de noviembre de 2026. Ampliada el 6 de noviembre con la ficha de Google Maps.

## Identidad del establecimiento

Hay otros negocios con nombres parecidos (p. ej. «Restaurante La Yedra», en Carmona). Esta web es para **Yedra Café, C/ de José Grollo 45, 46025 València (barrio de Benicalap)**. La misma dirección aparece en tres fuentes independientes, así que la identidad se considera verificada.

## Fuentes consultadas

| Fuente | Acceso | Qué aporta |
|---|---|---|
| Facebook: `facebook.com/people/Yedra-Café/100083203238752` | Bloqueada sin sesión. Solo se leyó el título («Yedra Café \| Valencia») y el resumen de un buscador. | Según el resumen: dirección José Grollo 45, desayunos, meriendas y comidas, apertura de lunes a sábado, vermut y cerveza fría, teléfono +34 747 42 34 73 y correo yedracafebenicalap@gmail.com. |
| Instagram: `@yedracafe` (nombre visible «Nacho Yedra») | Bloqueada sin sesión; solo el título. | Confirma el usuario. Según el resumen del buscador, la bio cita la misma calle y número. |
| InTravel (`intravel.net/valencia/restaurants-cafes/yedra-cafe`, también en español) | Leída completa. Ficha **no verificada** por el negocio. | Dirección y CP 46025, teléfono +34 651 11 42 39, Google 4,6/5 (31 opiniones), desayuno y almuerzo, para llevar, consumo en el local y entrega a domicilio, pago con tarjeta y NFC, accesibilidad, tranvía Benicalap a 124 m. Cita la web `yedracafe.com`. |
| `yedracafe.com` | **No resuelve en DNS** (ENOTFOUND). | Nada. El dominio está caducado o no existe. |
| `yedra-cafe.menufyy.com` | Devuelve HTML vacío (se monta con JS). | El resumen del buscador menciona «Café del Tiempo», bollería y cerveza fría. Es un directorio generado; no cuenta como fuente fiable. |
| Google Maps: ficha «Yedra cafe» (`/maps/place/Yedra+cafe`, CID `0x68c2f450ac6ebb06`) | Leída en Chromium headless rechazando cookies. | Dirección, teléfono **651 11 42 39**, horario **L–V 7:00–15:00, S–D cerrado**, 4,4/5 (35 reseñas), web `yedracafe.com` (no resuelve) y 44 fotos. La mayoría las subió el perfil del propio negocio («Yedra cafe», marzo–mayo 2022); alguna es de visitantes. |
| OpenStreetMap (Overpass / Nominatim) | Datos abiertos (ODbL). | Nodo de dirección «45» en Carrer de José Grollo (39.4908734, -0.3907989) y parada de tranvía «Benicalap» (nodo 3373193136). Distancia en línea recta: 120 m. Calles y manzanas del mapa. |

## Criterio de verificación

- **Confirmado**: aparece en al menos dos fuentes independientes, o procede de datos geográficos abiertos y comprobables.
- **Pendiente**: una sola fuente, una fuente indirecta (resumen de buscador) o fuentes contradictorias. No se publica como hecho: la web lo muestra con la marca «Pendiente de confirmar».

Los estados viven en `src/data/business.ts` (tipo `Verified<T>`). El JSON-LD solo incluye datos `confirmado`.

## Datos confirmados (publicados)

- Nombre: Yedra Café.
- Teléfono: +34 651 11 42 39 (coinciden Google Maps e InTravel; el de Facebook, +34 747 42 34 73, parece antiguo).
- Dirección: C/ de José Grollo, 45, 46025 València (Benicalap).
- Coordenadas: 39.4908734, -0.3907989 (nodo de dirección de OSM).
- Servicios: desayunos, almuerzos y comidas; para tomar en el local o para llevar.
- Transporte: parada de tranvía Benicalap, a unos 120 m.
- Redes: Instagram @yedracafe y la página de Facebook indicada.

## Pendiente de confirmar con el negocio

| Dato | Situación | Dónde se cambia |
|---|---|---|
| Horario | Google Maps: lunes a viernes 7:00–15:00, sábado y domingo cerrado. Facebook dice «de lunes a sábado» y dos reseñas se quejan de aperturas irregulares. Se muestra el de Google con la marca «por confirmar» y **no se publica en el schema**. | `business.hours` |
| Correo | yedracafebenicalap@gmail.com, solo por un resumen de buscador. | `business.email` |
| Vermut y cerveza fría | Solo Facebook (indirecto). | `business.drinks` |
| Carta y precios | No hay carta pública fiable. La web usa una carta **provisional** con avisos visibles. | `src/data/menu.ts` |
| Permiso de las fotografías | La web usa 7 fotos (de 9 descargadas) **subidas por el propio negocio** a Google Maps en 2022. Las de visitantes se excluyeron. Falta el visto bueno expreso del propietario y, a ser posible, los originales sin recomprimir. | `src/data/gallery.ts`, `src/assets/fotos/` |
| Logotipo | Existe: rótulo oscuro con «Yedra» en letra caligráfica blanca y «CAFÉ» en cobre; el toldo azul repite «Yedra». No hay archivo vectorial; la web usa un logotipo tipográfico provisional. Pedir el original. | `src/components/ui/Wordmark.astro` |
| Dominio | `yedracafe.com` no resuelve. | Variable `SITE_URL` en el despliegue |
| Datos legales | Titular, NIF/CIF y contacto para el aviso legal (LSSI-CE). | `business.legal`, `src/pages/aviso-legal.astro` |
| Entrega a domicilio, pago con tarjeta/NFC, accesibilidad | Solo InTravel. No se publican. | Añadir a `business` si se confirman |
| Valoración en Google | 4,4/5 con 35 reseñas en Google Maps (4,6/31 según InTravel, más antiguo). **No se publica** ni se marca en schema: Google no permite reseñas propias en datos estructurados y la cifra cambia. | — |

## Preguntas para el propietario

1. ¿El 651 11 42 39 es el teléfono actual?
2. ¿El horario es de lunes a viernes de 7:00 a 15:00? ¿Abrís los sábados?
3. ¿Podéis pasar la carta con precios, o una foto de la pizarra?
4. ¿Nos dais permiso para usar en la web las fotos que subisteis a Google Maps? ¿Tenéis los originales o fotos más recientes?
5. ¿Tenéis el logotipo del rótulo en vectorial (SVG, PDF o AI)?
6. Datos del titular para el aviso legal (nombre o razón social, NIF/CIF, correo).
7. ¿Qué dominio vais a usar?
8. ¿Hacéis entregas a domicilio? ¿Tenéis terraza?

## Fotografías (Google Maps)

| Archivo | Contenido | Autor en Google Maps | Uso en la web |
|---|---|---|---|
| `interior-yedra.jpg` | Comedor: yedra en la pared, mesa redonda y damero | Yedra cafe (abr 2022) | Hero |
| `vitrina.jpg` | Vitrina de la barra con bollería | Yedra cafe (mar 2022) | Esencia |
| `fachada.jpg` | Rótulo y toldo azul | Yedra cafe (may 2022) | El local |
| `espresso.jpg` | Café solo | Yedra cafe (may 2022) | El local |
| `bolleria.jpg` | Bandeja de bollería | Yedra cafe (mar 2022) | El local |
| `tostada-cafe-con-leche.jpg` | Tostada con tomate y café con leche | Yedra cafe (mar 2022) | El local |
| `crep.jpg` | Crep con chocolate y nata | Yedra cafe (mar 2022) | El local |
| `cookies.jpg`, `croissants.jpg` | Cookies y croissants | Yedra cafe (2022) | Sin usar (reserva) |

Excluida: la foto de un visitante (oct 2026). Antes de guardar las fotos se corrigió su orientación y se eliminaron los metadatos EXIF (modelo de móvil y fecha).
