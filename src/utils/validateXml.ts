import fs from 'fs';
import libxmljs from 'libxmljs2';

/**
 * Valida un XML contra un XSD.
 * @param xmlString XML en string.
 * @param xsdPath Ruta al fichero XSD.
 * @returns true si es válido, lanza error si no lo es.
 */
export function validarXMLContraXSD(xmlString: string, xsdPath: string): boolean {
  const xsdString = fs.readFileSync(xsdPath, 'utf-8');
  const xmlDoc = libxmljs.parseXml(xmlString);
  const xsdDoc = libxmljs.parseXml(xsdString);

  const isValid = xmlDoc.validate(xsdDoc);
  if (!isValid) {
    const errores = xmlDoc.validationErrors.map(e => e.message).join('\n');
    throw new Error(`XML no válido:\n${errores}`);
  }

  return true;
}
