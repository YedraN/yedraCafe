import type { APIRoute } from 'astro';

/** Páginas indexables. Mantener sincronizado al añadir rutas (404 queda fuera a propósito). */
const pages = [
  { path: '/', priority: '1.0' },
  { path: '/aviso-legal', priority: '0.2' },
] as const;

export const GET: APIRoute = ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${new URL(p.path, site).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
