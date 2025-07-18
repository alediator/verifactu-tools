import { calcularHash } from '../../src/core/calcularHash';

describe('calcularHash', () => {
  it('Caso 1: Alta inicial sin huella previa', () => {
    const hash = calcularHash({
      IDEmisorFactura: '89890001K',
      NumSerieFactura: '12345678/G33',
      FechaExpedicionFactura: '01-01-2024',
      TipoFactura: 'F1',
      CuotaTotal: '12.35',
      ImporteTotal: '123.45',
      Huella: '',
      FechaHoraHusoGenRegistro: '2024-01-01T19:20:30+01:00'
    });

    expect(hash).toBe('3C464DAF61ACB827C65FDA19F352A4E3BDC2C640E9E9FC4CC058073F38F12F60');
  });

  it('Caso 2: Alta con huella previa', () => {
    const hash = calcularHash({
      IDEmisorFactura: '89890001K',
      NumSerieFactura: '12345679/G34',
      FechaExpedicionFactura: '01-01-2024',
      TipoFactura: 'F1',
      CuotaTotal: '12.35',
      ImporteTotal: '123.45',
      Huella: '3C464DAF61ACB827C65FDA19F352A4E3BDC2C640E9E9FC4CC058073F38F12F60',
      FechaHoraHusoGenRegistro: '2024-01-01T19:20:35+01:00'
    });

    expect(hash).toBe('F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97');
  });

  it('Caso 3: Anulación con huella previa', () => {
    const hash = calcularHash({
      IDEmisorFacturaAnulada: '89890001K',
      NumSerieFacturaAnulada: '12345679/G34',
      FechaExpedicionFacturaAnulada: '01-01-2024',
      Huella: 'F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97',
      FechaHoraHusoGenRegistro: '2024-01-01T19:20:40+01:00'
    });

    expect(hash).toBe('177547C0D57AC74748561D054A9CEC14B4C4EA23D1BEFD6F2E69E3A388F90C68');
  });
});
