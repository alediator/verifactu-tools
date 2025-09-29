import { getVerifactuClient } from '../xml/getVerifactuClient';
import type { SfLrcconsultaFactuSistemaFacturacionType } from '../generated/sistemafacturacion/definitions/SfLrcconsultaFactuSistemaFacturacionType';
import type { AgentOptions } from 'https';

/**
 * Consulta facturas registradas en AEAT vía VeriFactu.
 * @param input Datos de entrada para la consulta
 * @param endpoint (opcional) URL del servicio SOAP
 * @param certOptions (opcional) Certificado cliente en formato https.AgentOptions
 * @param verbose (opcional) Imprime por pantalla el XML que se envía.
 * @returns RespuestaConsulta
 */
export async function consultarFacturas(
  input: SfLrcconsultaFactuSistemaFacturacionType,
  endpoint?: string,
  certOptions?: AgentOptions,
  verbose?: boolean,
) {
  const httpsAgent = certOptions
    ? new (await import('https')).Agent(certOptions)
    : undefined;

  const client = await getVerifactuClient(endpoint, {
    wsdl_options: { httpsAgent }
  }, verbose);

  if(verbose) {
    const xml = client.wsdl.objectToXML(
      { ConsultaFactuSistemaFacturacion: input },
      'ConsultaFactuSistemaFacturacion',
      'sf',
      'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
      true
    );

    console.log('[XML Enviado]', xml);
  }

  // const [{ RespuestaConsulta }] = await client.sfVerifactu.ConsultaFactuSistemaFacturacionAsync(input);
  // const [{ RespuestaConsulta }] = await client.ConsultaFactuSistemaFacturacionAsync(input);
  // return RespuestaConsulta;

  const [respuesta] = await client.ConsultaFactuSistemaFacturacionAsync(input);
  return respuesta;
}
