import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { RegFactuSistemaFacturacion } from '../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';
import type { AgentOptions } from 'https';

export async function registrarFacturas(
  input: RegFactuSistemaFacturacion,
  endpoint?: string,
  certOptions?: AgentOptions,
  verbose?: boolean,
) {
  const client = await getVerifactuClient(endpoint, {
    wsdl_options: {
      httpsAgent: certOptions ? new (await import('https')).Agent(certOptions) : undefined
    }
  }, verbose);

  if (verbose) {
    const xml = client.wsdl.objectToXML(
      { RegFactuSistemaFacturacion: input },
      'RegFactuSistemaFacturacion',
      'sf',
      'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
      true
    );

    console.log('\n[📤 XML Enviado - RegFactuSistemaFacturacion]');
    console.log(xml);
  }

  const respuesta = await client.RegFactuSistemaFacturacionAsync(input);
  return respuesta;
}