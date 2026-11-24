/**
 * JSON-LD de schema.org a partir de src/data/business.ts.
 * Solo incluye datos con estado `confirmado`: teléfono, horario, email y menú
 * aparecerán automáticamente cuando se confirmen en los datos.
 */
import { getImage } from 'astro:assets';
import { business, maps } from '../data/business';
import { schemaPhotos } from '../data/gallery';
import { menu } from '../data/menu';
import { site } from '../data/site';
import type { DayOfWeek } from '../data/types';

const dayUrl = (d: DayOfWeek) => `https://schema.org/${d}`;

/** Ancho máximo de las fotos del JSON-LD. Google pide alta resolución (mínimo 50 000 píxeles). */
const SCHEMA_PHOTO_WIDTH = 1200;

/**
 * URLs absolutas de las fotos reales en JPEG, para `image`.
 * Se usa JPEG para máxima compatibilidad con los rastreadores. Nunca se amplía el original.
 */
async function photoUrls(base: string): Promise<string[]> {
  const images = await Promise.all(
    schemaPhotos.map(({ image }) =>
      getImage({ src: image, width: Math.min(SCHEMA_PHOTO_WIDTH, image.width), format: 'jpg' }),
    ),
  );
  return images.map((img) => new URL(img.src, base).href);
}

export async function cafeSchema(siteUrl: URL) {
  const base = siteUrl.origin;
  const a = business.address.value;

  const schema: Record<string, unknown> = {
    '@type': 'CafeOrCoffeeShop',
    '@id': `${base}/#cafe`,
    name: business.name,
    description: site.description,
    url: `${base}/`,
    image: [...(await photoUrls(base)), new URL(site.ogImage, base).href],
    logo: new URL('/favicon.svg', base).href,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.locality,
      addressRegion: a.region,
      addressCountry: a.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.value.latitude,
      longitude: business.geo.value.longitude,
    },
    hasMap: maps.place,
    containedInPlace: { '@type': 'Place', name: `${a.district}, ${a.locality}` },
    sameAs: business.social.map((s) => s.url),
  };

  const { phone, email, hours, cuisine } = business;
  if (phone.status === 'confirmado') schema.telephone = phone.value;
  if (email.status === 'confirmado') schema.email = email.value;
  if (cuisine.status === 'confirmado') schema.servesCuisine = cuisine.value;
  if (hours.status === 'confirmado') {
    schema.openingHoursSpecification = hours.value.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map(dayUrl),
      opens: h.opens,
      closes: h.closes,
    }));
  }

  // La carta solo se publica en datos estructurados cuando deja de ser provisional.
  const confirmedSections = menu
    .map((c) => ({ ...c, items: c.items.filter((i) => !i.provisional) }))
    .filter((c) => c.items.length > 0);
  if (confirmedSections.length > 0) {
    schema.hasMenu = {
      '@type': 'Menu',
      url: `${base}/#carta`,
      hasMenuSection: confirmedSections.map((c) => ({
        '@type': 'MenuSection',
        name: c.label,
        hasMenuItem: c.items.map((i) => ({
          '@type': 'MenuItem',
          name: i.name,
          ...(i.description && { description: i.description }),
          ...(i.price !== undefined && {
            offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'EUR' },
          }),
        })),
      })),
    };
  }

  return schema;
}

export async function pageGraph(siteUrl: URL, page: { url: URL; title: string; description: string }) {
  const base = siteUrl.origin;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      await cafeSchema(siteUrl),
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: `${base}/`,
        name: site.name,
        inLanguage: site.lang,
        publisher: { '@id': `${base}/#cafe` },
      },
      {
        '@type': 'WebPage',
        '@id': `${page.url.href}#webpage`,
        url: page.url.href,
        name: page.title,
        description: page.description,
        inLanguage: site.lang,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#cafe` },
      },
    ],
  };
}
