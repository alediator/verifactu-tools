// src/xml/generarXMLDesdeJson.ts
import path from 'path';
import { createClientAsync } from '../generated/sistemafacturacion/client';

const WSDL_PATH = path.resolve(__dirname, '../../wsdl/SistemaFacturacion.wsdl');
const DEFAULT_NAMESPACE = 'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl';

/**
 * Genera XML válido para AEAT a partir de un input tipo SuministroLR
 * @param input Objeto con la estructura de SuministroLR
 * @returns XML en string
 */
export async function generarXMLDesdeJson(input: any): Promise<string> {
  const client = await createClientAsync(WSDL_PATH);

  return client.wsdl.objectToXML(
    { SuministroLR: input },
    'SuministroLR',
    'sf',
    DEFAULT_NAMESPACE,
    true
  );
}
