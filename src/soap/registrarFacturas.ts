import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { RegFactuSistemaFacturacion } from '../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

export async function registrarFacturas(input: RegFactuSistemaFacturacion, endpoint?: string) {
  const client = await getVerifactuClient(endpoint);
  const respuesta = await client.RegFactuSistemaFacturacionAsync(input);
  return respuesta;
}
