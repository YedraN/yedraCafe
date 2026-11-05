/**
 * Fotografías del local y huecos de la composición.
 *
 * ORIGEN: fotos publicadas por el propio negocio («Yedra cafe») en su ficha de Google Maps
 * (marzo–mayo de 2022). Se excluyen las fotos subidas por visitantes.
 * PENDIENTE: confirmación expresa del propietario para usarlas en la web y, si es posible,
 * los archivos originales (ver docs/RESEARCH.md).
 *
 * Si un hueco no tiene `photo`, se muestra la ilustración de marca (`art`).
 */
import bolleria from '../assets/fotos/bolleria.jpg';
import crep from '../assets/fotos/crep.jpg';
import espresso from '../assets/fotos/espresso.jpg';
import fachada from '../assets/fotos/fachada.jpg';
import interior from '../assets/fotos/interior-yedra.jpg';
import tostada from '../assets/fotos/tostada-cafe-con-leche.jpg';
import vitrina from '../assets/fotos/vitrina.jpg';
import type { ArtVariant, Photo } from './types';

export interface Frame {
  id: string;
  caption: string;
  art: ArtVariant;
  photo?: Photo;
}

const credit = 'Foto: Yedra Café (ficha de Google Maps, 2022)';

export const heroFrame: Frame = {
  id: 'hero',
  caption: 'La yedra del comedor',
  art: 'taza',
  photo: {
    image: interior,
    alt: 'Interior de Yedra Café: mesa redonda de madera con sillas negras, yedra colgando de la pared blanca y suelo de damero azul y ocre',
    credit,
    position: '50% 45%',
  },
};

export const esenciaFrame: Frame = {
  id: 'esencia',
  caption: 'La vitrina, con la bollería del día',
  art: 'barra',
  photo: {
    image: vitrina,
    alt: 'Vitrina de la barra de Yedra Café con cookies y bollería bajo campanas de cristal',
    credit,
    position: '40% 55%',
  },
};

export const experienceFrames: readonly Frame[] = [
  {
    id: 'fachada',
    caption: 'El toldo azul de José Grollo, 45',
    art: 'azulejo',
    photo: {
      image: fachada,
      alt: 'Fachada de Yedra Café con el rótulo oscuro, el toldo azul con el nombre y el damero a la entrada',
      credit,
      position: '50% 38%',
    },
  },
  {
    id: 'espresso',
    caption: 'Un café solo',
    art: 'taza',
    photo: { image: espresso, alt: 'Café solo en vaso de cristal sobre plato con cucharilla', credit, position: '50% 35%' },
  },
  {
    id: 'bolleria',
    caption: 'Bollería',
    art: 'granos',
    photo: { image: bolleria, alt: 'Bandeja de bollería con cookies y hojaldres azucarados', credit },
  },
  {
    id: 'tostada',
    caption: 'Tostada y café con leche',
    art: 'taza',
    photo: {
      image: tostada,
      alt: 'Café con leche en taza junto a una tostada con tomate',
      credit,
      position: '38% 50%',
    },
  },
  {
    id: 'crep',
    caption: 'Algo dulce',
    art: 'hojas',
    photo: { image: crep, alt: 'Crep con chocolate y nata en plato blanco sobre mesa de madera', credit, position: '50% 60%' },
  },
];
