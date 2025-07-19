import { formatFechaConZona } from '../../src/utils/fechaUtils';

describe('formatearFechaConZona', () => {
  it('formatea una fecha en horario local con zona incluida', () => {
    const fecha = new Date('2024-01-01T19:20:30+01:00');
    const resultado = formatFechaConZona(fecha);

    // Extrae solo la parte sin milisegundos ni Z ni T00:00:00.000Z
    expect(resultado).toMatch(/^2024-01-01T19:20:30[+-]\d{2}:\d{2}$/);
  });

  it('formatea correctamente con ceros iniciales', () => {
    const fecha = new Date('2024-04-03T07:05:09+02:00');
    const resultado = formatFechaConZona(fecha);

    expect(resultado).toMatch(/^2024-04-03T07:05:09[+-]\d{2}:\d{2}$/);
  });

  it('no incluye milisegundos en el resultado', () => {
    const fecha = new Date('2024-01-01T19:20:30+01:00');
    const resultado = formatFechaConZona(fecha);

    expect(resultado.includes('.')).toBe(false);
  });
});
