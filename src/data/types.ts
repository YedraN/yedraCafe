import type { ImageMetadata } from 'astro';

/**
 * Un dato del negocio con su estado de verificación.
 * - `confirmado`: contrastado en al menos dos fuentes públicas o en un canal propio del negocio.
 * - `pendiente`: no se puede publicar como hecho. `value` guarda la mejor pista disponible
 *   (o null) y `note` explica qué falta. La UI lo muestra marcado como «pendiente».
 */
export type Verified<T> =
  | { status: 'confirmado'; value: T; sources: readonly string[] }
  | { status: 'pendiente'; value: T | null; note: string; sources: readonly string[] };

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningHours {
  days: readonly DayOfWeek[];
  /** Formato 24 h, «HH:MM». */
  opens: string;
  closes: string;
}

export interface SocialProfile {
  id: 'instagram' | 'facebook';
  label: string;
  handle: string;
  url: string;
}

export interface Address {
  street: string;
  postalCode: string;
  locality: string;
  district: string;
  region: string;
  countryCode: 'ES';
}

/** Fotografía real del local o de producto. Solo imágenes auténticas de Yedra Café. */
export interface Photo {
  image: ImageMetadata;
  alt: string;
  /** Crédito o procedencia de la foto (quién la hizo / cedió). */
  credit: string;
  /** Encuadre al recortar (CSS object-position), p. ej. "50% 30%". */
  position?: string;
}

/** Ilustraciones de marca que ocupan el hueco mientras no haya foto real. */
export type ArtVariant = 'taza' | 'hojas' | 'azulejo' | 'vaso' | 'barra' | 'granos';
