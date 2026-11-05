/**
 * Carta de Yedra Café.
 *
 * ESTADO: PROVISIONAL. No existe una carta pública verificable.
 * Las categorías parten de lo que el negocio dice servir (desayunos, almuerzos y comidas,
 * vermut y cerveza). Los platos marcados `provisional: true` son ejemplos de estructura
 * y se muestran con un aviso visible. Algunos se basan en lo que aparece en las fotos que el
 * negocio publicó en Google Maps (tostada con tomate, café con leche, croissants, cookies, crep),
 * pero siguen sin estar confirmados como carta actual. Sustitúyelos por la carta real y elimina el flag.
 * No añadas precios que no haya facilitado el negocio.
 */
import type { Photo } from "./types";

export interface MenuItem {
  name: string;
  description?: string;
  /** En euros. `undefined` = no se muestra precio. */
  price?: number;
  photo?: Photo;
  provisional: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  /** Momento del día al que pertenece, para la línea editorial. */
  moment: string;
  intro: string;
  items: readonly MenuItem[];
}

export const menu: readonly MenuCategory[] = [
  {
    id: "cafes",
    label: "Cafés",
    moment: "A cualquier hora",
    intro: "La barra empieza aquí. Pide el tuyo como lo tomes siempre.",
    items: [
      { name: "Café solo", provisional: true },
      { name: "Cortado", provisional: true },
      { name: "Café con leche", provisional: true },
      {
        name: "Café del temps",
        description: "Café solo con hielo y limón, a la valenciana.",
        provisional: true,
      },
      { name: "Carajillo", provisional: true },
      { name: "Cremaet", provisional: true },
      { name: "Infusión", provisional: true },
    ],
  },
  {
    id: "desayunos",
    label: "Desayunos",
    moment: "Por la mañana",
    intro: "Para empezar el día sin salir del barrio.",
    items: [
      { name: "Tostada con tomate", provisional: true },
      { name: "Tostada con aguacate y pavo", provisional: true },
      { name: "Croissant", provisional: true },
      { name: "Cookies con pepitas de chocolate", provisional: true },
      { name: "Crep con chocolate y nata", provisional: true },
    ],
  },
  {
    id: "almuerzos",
    label: "Almuerzos",
    moment: "A media mañana",
    intro: "El almuerzo, con calma y en buena compañía.",
    items: [
      {
        name: "Bocadillos",
        description: "Pregunta en barra por los del día.",
        provisional: true,
      },
      { name: "Bebida y café", provisional: true },
    ],
  },
  {
    id: "mediodia",
    label: "Mediodía",
    moment: "Al mediodía",
    intro: "Un vermut o una cerveza bien fría.",
    items: [
      { name: "Vermut", provisional: true },
      { name: "Cerveza fría", provisional: true },
    ],
  },
];

export const menuIsProvisional = menu.some((c) =>
  c.items.some((i) => i.provisional),
);
