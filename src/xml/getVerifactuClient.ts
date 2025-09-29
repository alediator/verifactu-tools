import path from 'path';
import { createClientAsync } from '../generated/sistemafacturacion/client';
import type { IExOptions } from 'soap';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WSDL_PATH = path.resolve(__dirname, '../../wsdl/SistemaFacturacion.wsdl');

/**
 * Crea un cliente de VeriFactu para generación de XML o envío a AEAT.
 * @param serviceUrl (opcional) URL del endpoint SOAP (ej: AEAT o mock)
 * @param options (opcional) Opciones extra, como `httpsAgent` para certificados
 * @param verbose (opcional) Imprime por pantalla el XML que se envía.
 * @returns cliente SOAP compatible con las operaciones definidas
 */
export async function getVerifactuClient(
  serviceUrl?: string, 
  options?: IExOptions,
  verbose?: boolean,
) {
  const client = await createClientAsync(WSDL_PATH, options);
  if (serviceUrl) {
    client.setEndpoint(serviceUrl);
  }
  if(verbose) {
    console.log(`[VerifactuClient] Usando ${serviceUrl}`);
  }
  return client;
}