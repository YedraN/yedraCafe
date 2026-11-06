export const site = {
  lang: 'es-ES',
  locale: 'es_ES',
  name: 'Yedra Café',
  title: 'Yedra Café | Cafetería de barrio en Benicalap, València',
  description:
    'Yedra Café es una cafetería de barrio en la C/ de José Grollo 45, Benicalap (València). Desayunos, almuerzos y bocadillos, para tomar aquí o para llevar.',
  themeColor: '#1F4E9F',
  ogImage: '/og/yedra-cafe.png',
} as const;

export const nav = [
  { href: '/#esencia', label: 'Esencia' },
  { href: '/#carta', label: 'Carta' },
  { href: '/#experiencia', label: 'El local' },
  { href: '/#visitanos', label: 'Visítanos' },
] as const;
