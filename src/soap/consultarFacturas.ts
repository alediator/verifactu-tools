import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { SfLrcconsultaFactuSistemaFacturacionType } from '../generated/sistemafacturacion/definitions/SfLrcconsultaFactuSistemaFacturacionType';

export async function consultarFacturas(input: SfLrcconsultaFactuSistemaFacturacionType, endpoint?: string) {
  const client = await getVerifactuClient(endpoint);
  const [{ RespuestaConsulta }] = await client.sfVerifactu.ConsultaFactuSistemaFacturacionAsync(input);
  return RespuestaConsulta;
}