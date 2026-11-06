// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// URL pública de producción. Se puede sobrescribir con la variable de entorno SITE_URL.
const SITE_URL = process.env.SITE_URL ?? 'https://yedracafe.es';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Una sola página principal con ~9 KB de CSS comprimido: inline evita peticiones bloqueantes.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  image: {
    responsiveStyles: true,
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Gloock',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Familjen Grotesk',
      cssVariable: '--font-text',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
