// src/xml/getVerifactuClient.ts
import path from 'path';
import { createClientAsync } from '../generated/sistemafacturacion/client';

const WSDL_PATH = path.resolve(__dirname, '../../wsdl/SistemaFacturacion.wsdl');
const DEFAULT_NAMESPACE = 'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl';


/**
 * Crea un cliente de VeriFactu para generación de XML o envío a AEAT.
 * @param serviceUrl (opcional) URL del endpoint SOAP (ej: AEAT o mock)
 * @returns cliente SOAP compatible con las operaciones definidas
 */
export async function getVerifactuClient(serviceUrl?: string) {
  const client = await createClientAsync(WSDL_PATH);
  if (serviceUrl) {
    client.setEndpoint(serviceUrl);
  }
  return client;
}