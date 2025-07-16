import fs from 'fs';
import path from 'path';
import * as libxmljs from 'libxmljs2';

describe('Generación de XML válido contra XSD Verifactu', () => {
  const xmlPath = path.join(__dirname, 'fixtures', 'factura-ejemplo.xml');
  const xsdPath = path.join(__dirname, '..', 'wsdl', 'SuministroLR.xsd');

  it('valida correctamente contra el esquema', () => {
    const xmlDoc = libxmljs.parseXml(fs.readFileSync(xmlPath, 'utf-8'));
    const xsdDoc = libxmljs.parseXml(fs.readFileSync(xsdPath, 'utf-8'));

    const isValid = xmlDoc.validate(xsdDoc);
    expect(isValid).toBe(true);

    if (!isValid) {
      console.error(xmlDoc.validationErrors);
    }
  });
});
