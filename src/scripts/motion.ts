/**
 * Revelados al hacer scroll. Un único IntersectionObserver para toda la página:
 * marca cada elemento con [data-visible] la primera vez que entra y deja de observarlo.
 * Las animaciones viven en CSS (global.css, IvyVine.astro); aquí solo se dispara el estado.
 *
 * Los elementos con máscara (data-reveal="mask") empiezan con clip-path: inset(100% …) y
 * Chromium descuenta ese recorte de la intersección: nunca «entrarían». Por eso se observa
 * su contenedor y el estado se aplica al elemento.
 */
const targets = document.querySelectorAll<HTMLElement | SVGElement>('[data-reveal], [data-reveal-trigger]');
const owners = new Map<Element, Element[]>();

for (const el of targets) {
  const observed = el.getAttribute('data-reveal') === 'mask' && el.parentElement ? el.parentElement : el;
  owners.set(observed, [...(owners.get(observed) ?? []), el]);
}

const show = (observed: Element) => owners.get(observed)?.forEach((el) => el.setAttribute('data-visible', ''));

if (!('IntersectionObserver' in window)) {
  owners.forEach((_, observed) => show(observed));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );
  owners.forEach((_, observed) => io.observe(observed));
}
