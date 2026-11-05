/** Formato del horario en español, compartido por «Visítanos» y la página de mantenimiento. */
import type { DayOfWeek, OpeningHours } from '../data/types';

const dayNames: Record<DayOfWeek, string> = {
  Monday: 'lunes',
  Tuesday: 'martes',
  Wednesday: 'miércoles',
  Thursday: 'jueves',
  Friday: 'viernes',
  Saturday: 'sábado',
  Sunday: 'domingo',
};

const order: readonly DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** «Lunes a viernes» si son 3 o más días consecutivos; si no, «Sábado y domingo». */
export function dayRange(days: readonly DayOfWeek[]): string {
  const idx = days.map((d) => order.indexOf(d)).sort((x, y) => x - y);
  const consecutive = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  const names = idx.map((i) => dayNames[order[i]]);
  const text =
    consecutive && names.length > 2
      ? `${names[0]} a ${names[names.length - 1]}`
      : new Intl.ListFormat('es', { type: 'conjunction' }).format(names);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Filas listas para pintar: cada franja y, al final, los días sin horario como «Cerrado». */
export function scheduleRows(hours: readonly OpeningHours[]): { days: string; time: string }[] {
  const rows = hours.map((h) => ({ days: dayRange(h.days), time: `${h.opens}–${h.closes}` }));
  const open = new Set(hours.flatMap((h) => h.days));
  const closed = order.filter((d) => !open.has(d));
  if (closed.length > 0) rows.push({ days: dayRange(closed), time: 'Cerrado' });
  return rows;
}
