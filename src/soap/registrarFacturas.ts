import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { RegistroFactura } from '../generated/sistemafacturacion/definitions/RegistroFactura';

export async function registrarFacturas(input: RegistroFactura[], endpoint?: string) {
  const client = await getVerifactuClient(endpoint);
  const [{ Respuesta }] = await client.sfVerifactu.RegFactuSistemaFacturacionAsync({ RegistroFactura: input });
  return Respuesta;
}
