// utils/fechaUtils.ts

/**
 * Devuelve la fecha en formato ISO con zona horaria local (por ejemplo: 2024-01-01T19:20:30+01:00)
 */
export function formatFechaConZona(fecha: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = fecha.getFullYear();
  const month = pad(fecha.getMonth() + 1);
  const day = pad(fecha.getDate());
  const hours = pad(fecha.getHours());
  const minutes = pad(fecha.getMinutes());
  const seconds = pad(fecha.getSeconds());

  const offsetMinutes = fecha.getTimezoneOffset();
  const offsetSign = offsetMinutes > 0 ? '-' : '+';
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMins = pad(absOffset % 60);

  const offset = `${offsetSign}${offsetHours}:${offsetMins}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}

