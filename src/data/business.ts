/**
 * Datos de Yedra Café (Benicalap, València).
 * Fuente única de verdad: la web, el JSON-LD y la documentación leen de aquí.
 * Antes de cambiar un `pendiente` a `confirmado`, anota la fuente (ver docs/RESEARCH.md).
 */
import type { Address, OpeningHours, SocialProfile, Verified } from './types';

const SOURCES = {
  google: 'Google Maps: ficha «Yedra cafe» (consultada el 5/11/2026)',
  facebook: 'Facebook: facebook.com/people/Yedra-Café/100083203238752',
  instagram: 'Instagram: @yedracafe',
  intravel: 'InTravel (directorio, ficha no verificada por el negocio)',
  osm: 'OpenStreetMap: nodo de dirección C/ de José Grollo 45',
} as const;

interface Business {
  name: string;
  shortDescription: string;
  address: Verified<Address>;
  geo: Verified<{ latitude: number; longitude: number }>;
  phone: Verified<string>;
  email: Verified<string>;
  openDays: Verified<string>;
  hours: Verified<readonly OpeningHours[]>;
  services: Verified<readonly string[]>;
  drinks: Verified<string>;
  transit: Verified<{ stop: string; kind: string; distanceM: number }>;
  social: readonly SocialProfile[];
  legal: Verified<{ holder: string; taxId: string; contact: string }>;
}

// La dirección y las coordenadas son imprescindibles para la web: deben estar confirmadas.
type Confirmed<T> = Extract<Verified<T>, { status: 'confirmado' }>;

export const business: Business & {
  address: Confirmed<Address>;
  geo: Confirmed<{ latitude: number; longitude: number }>;
  transit: Confirmed<{ stop: string; kind: string; distanceM: number }>;
} = {
  name: 'Yedra Café',
  shortDescription: 'Cafetería de barrio en Benicalap, València',

  address: {
    status: 'confirmado',
    value: {
      street: 'C/ de José Grollo, 45',
      postalCode: '46025',
      locality: 'València',
      district: 'Benicalap',
      region: 'Valencia',
      countryCode: 'ES',
    },
    sources: [SOURCES.google, SOURCES.facebook, SOURCES.instagram, SOURCES.intravel],
  },

  /** Coordenadas del nodo de dirección «45» en OpenStreetMap. */
  geo: {
    status: 'confirmado',
    value: { latitude: 39.4908734, longitude: -0.3907989 },
    sources: [SOURCES.osm],
  },

  /** Coincide en Google Maps e InTravel. Facebook muestra otro (+34 747 42 34 73), probablemente antiguo. */
  phone: {
    status: 'confirmado',
    value: '+34 651 11 42 39',
    sources: [SOURCES.google, SOURCES.intravel],
  },

  email: {
    status: 'pendiente',
    value: null,
    note: 'Un resumen de buscador atribuye a Facebook el correo yedracafebenicalap@gmail.com; no se ha podido comprobar en la página.',
    sources: [SOURCES.facebook],
  },

  /** Días de apertura: solo una fuente (Facebook, leída de forma indirecta). */
  openDays: {
    status: 'pendiente',
    value: 'De lunes a sábado',
    note: 'Facebook indica apertura de lunes a sábado; falta confirmarlo y conocer las horas.',
    sources: [SOURCES.facebook],
  },

  /** Horario de Google Maps. Se muestra marcado como pendiente hasta que lo confirme el negocio. */
  hours: {
    status: 'pendiente',
    value: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '15:00' }],
    note: 'Según Google Maps (lunes a viernes, 7:00–15:00; sábado y domingo cerrado). Facebook habla de lunes a sábado y algunas reseñas mencionan aperturas irregulares: confirmar con el negocio.',
    sources: [SOURCES.google],
  },

  /** Lo que sirve, según Facebook e InTravel. */
  services: {
    status: 'confirmado',
    value: ['Desayunos', 'Almuerzos y comidas', 'Para tomar aquí o para llevar'],
    sources: [SOURCES.facebook, SOURCES.intravel],
  },

  drinks: {
    status: 'pendiente',
    value: 'Vermut y cerveza fría',
    note: 'Lo menciona la página de Facebook (vista de forma indirecta). Confirmar.',
    sources: [SOURCES.facebook],
  },

  transit: {
    status: 'confirmado',
    value: { stop: 'Benicalap', kind: 'Parada de tranvía', distanceM: 120 },
    sources: [SOURCES.osm, SOURCES.intravel],
  },

  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@yedracafe',
      url: 'https://www.instagram.com/yedracafe/',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'Yedra Café',
      url: 'https://www.facebook.com/people/Yedra-Caf%C3%A9/100083203238752/',
    },
  ] satisfies readonly SocialProfile[],

  /** Datos del titular para el aviso legal (LSSI-CE art. 10). */
  legal: {
    status: 'pendiente',
    value: null,
    note: 'Faltan razón social o nombre del titular, NIF/CIF y datos de contacto legal.',
    sources: [],
  },
};

export const fullAddress = (a: Address = business.address.value) =>
  `${a.street}, ${a.postalCode} ${a.locality}`;

const mapsQuery = encodeURIComponent(`${business.name}, ${fullAddress()}`);

export const maps = {
  /** Abre la búsqueda en Google Maps (no depende de un ID de ficha sin verificar). */
  view: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  osm: `https://www.openstreetmap.org/?mlat=${business.geo.value.latitude}&mlon=${business.geo.value.longitude}#map=18/${business.geo.value.latitude}/${business.geo.value.longitude}`,
} as const;
