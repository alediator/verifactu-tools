import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { RegFactuSistemaFacturacion } from '../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';
import type { AgentOptions } from 'https';

export async function registrarFacturas(
  input: RegFactuSistemaFacturacion,
  endpoint?: string,
  certOptions?: AgentOptions
) {
  const client = await getVerifactuClient(endpoint, {
    wsdl_options: {
      httpsAgent: certOptions ? new (await import('https')).Agent(certOptions) : undefined
    }
  });

  const respuesta = await client.RegFactuSistemaFacturacionAsync(input);
  return respuesta;
}