import { calcularHash } from './calcularHash';
import { formatFechaConZona } from '../utils/fechaUtils';
import { generarXMLDesdeJson } from '../xml/generarXMLDesdeJson';
import type { RegFactuSistemaFacturacion } from '../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';
import type { HashAltaParams } from './calcularHash';

export async function altaFacturasXml(
  input: RegFactuSistemaFacturacion, huellaAnterior?: string
): Promise<string> {
  const { Cabecera, RegistroFactura } = input;

  if (!Array.isArray(RegistroFactura)) {
    throw new Error('RegistroFactura debe ser un array');
  }

  let huellaActual = huellaAnterior || '';
  for (const factura of RegistroFactura) {
    const alta = factura.RegistroAlta;
    if (!alta) continue;
    
    if (!alta.FechaHoraHusoGenRegistro) {
     throw 'FechaHoraHusoGenRegistro es requerido';
    }
    
    // TODO: valida inputs!
    const hashParams: HashAltaParams = {
      IDEmisorFactura: alta.IDFactura?.IDEmisorFactura || '',
      NumSerieFactura: alta.IDFactura?.NumSerieFactura || '',
      FechaExpedicionFactura: alta.IDFactura?.FechaExpedicionFactura || '',
      TipoFactura: alta.TipoFactura!,
      CuotaTotal: alta.CuotaTotal!,
      ImporteTotal: alta.ImporteTotal!,
      Huella: huellaActual,
      FechaHoraHusoGenRegistro: formatFechaConZona(alta.FechaHoraHusoGenRegistro),
    };

    huellaActual = calcularHash(hashParams);
    alta.Huella = huellaActual;
  }

  return generarXMLDesdeJson(input);
}
