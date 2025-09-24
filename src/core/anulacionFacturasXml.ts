import { calcularHash } from './calcularHash';
import { formatFechaConZona } from '../utils/fechaUtils';
import { generarXMLDesdeJson } from '../xml/generarXMLDesdeJson';
import type { RegFactuSistemaFacturacion } from '../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';
import type { HashAnulacionParams } from './calcularHash';

export async function anulacionFacturasXml(
  input: RegFactuSistemaFacturacion, huellaAnterior?: string
): Promise<string> {
  const { Cabecera, RegistroFactura } = input;

  if (!Array.isArray(RegistroFactura)) {
    throw new Error('RegistroFactura debe ser un array');
  }

  let huellaActual = huellaAnterior || '';
  const registros = input.RegistroFactura ?? [];

  for (const reg of registros) {
    if (!reg.RegistroAnulacion) continue;

    const anulacion = reg.RegistroAnulacion;
    const fechaHora = anulacion.FechaHoraHusoGenRegistro as Date;
    
    if (!anulacion.FechaHoraHusoGenRegistro) {
     throw new Error('FechaHoraHusoGenRegistro es requerido');
    }

    const hashParams: HashAnulacionParams = {
      IDEmisorFacturaAnulada: anulacion.IDFactura?.IDEmisorFacturaAnulada || '',
      NumSerieFacturaAnulada: anulacion.IDFactura?.NumSerieFacturaAnulada || '',
      FechaExpedicionFacturaAnulada: anulacion.IDFactura?.FechaExpedicionFacturaAnulada || '',
      Huella: huellaActual,
      FechaHoraHusoGenRegistro: formatFechaConZona(fechaHora),
    };

    huellaActual = calcularHash(hashParams);
    anulacion.Huella = huellaActual;
  }

  return generarXMLDesdeJson(input);
}
