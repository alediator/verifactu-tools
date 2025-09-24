import { createHash } from 'crypto';

export type HashAltaParams = {
  IDEmisorFactura: string;
  NumSerieFactura: string;
  FechaExpedicionFactura: string; // en formato DD-MM-YYYY
  TipoFactura: string;
  CuotaTotal: string; // decimal con punto
  ImporteTotal: string;
  Huella: string;
  FechaHoraHusoGenRegistro: string; // en formato ISO 8601
};

export type HashAnulacionParams = {
  IDEmisorFacturaAnulada: string;
  NumSerieFacturaAnulada: string;
  FechaExpedicionFacturaAnulada: string;
  Huella: string;
  FechaHoraHusoGenRegistro: string;
};

export function calcularHash(input: HashAltaParams | HashAnulacionParams): string {
  const isAnulacion = 'IDEmisorFacturaAnulada' in input;

  const cadena = isAnulacion
    ? `IDEmisorFacturaAnulada=${input.IDEmisorFacturaAnulada}&NumSerieFacturaAnulada=${input.NumSerieFacturaAnulada}` +
      `&FechaExpedicionFacturaAnulada=${input.FechaExpedicionFacturaAnulada}&Huella=${input.Huella}` +
      `&FechaHoraHusoGenRegistro=${input.FechaHoraHusoGenRegistro}`
    : `IDEmisorFactura=${input.IDEmisorFactura}&NumSerieFactura=${input.NumSerieFactura}` +
      `&FechaExpedicionFactura=${input.FechaExpedicionFactura}&TipoFactura=${input.TipoFactura}` +
      `&CuotaTotal=${input.CuotaTotal}&ImporteTotal=${input.ImporteTotal}&Huella=${input.Huella}` +
      `&FechaHoraHusoGenRegistro=${input.FechaHoraHusoGenRegistro}`;

  return createHash('sha256').update(cadena).digest('hex').toUpperCase();
}
