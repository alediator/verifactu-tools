import fs from 'fs';
import path from 'path';
import { createClientAsync } from '../src/generated/sistemafacturacion/client';

const WSDL_PATH = path.resolve(__dirname, '../wsdl/SistemaFacturacion.wsdl');
const FIXTURES_DIR = path.resolve(__dirname, 'fixtures/xml');

describe('VeriFactu XML Generation - fixtures', () => {
  const fixtures = fs.readdirSync(FIXTURES_DIR).filter(f => f.endsWith('.json'));

  it.each(fixtures)('should generate valid XML for %s', async (fixtureFile) => {
    const filePath = path.join(FIXTURES_DIR, fixtureFile);
    const contenido = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const client = await createClientAsync(WSDL_PATH);
    const xml = client.wsdl.objectToXML(
      { SuministroLR: contenido },
      'SuministroLR',
      'sf',
      'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
      true
    );

    console.log(`🧾 XML generado para ${fixtureFile}:\n`, xml);

    // ✅ Validaciones básicas
    expect(xml).toContain('<sf:SuministroLR');
    expect(xml).toContain('<sf:Cabecera>');
    expect(xml).toContain('<sf:RegistroAlta>');
    
    // ✅ Validar Cabecera
    expect(xml).toContain(`<sf:IDVersionSii>${contenido.Cabecera.IDVersionSii}</sf:IDVersionSii>`);``
    expect(xml).toContain(`<sf:NombreRazon>${contenido.Cabecera.Titular.NombreRazon}</sf:NombreRazon>`);
    expect(xml).toContain(`<sf:NIF>${contenido.Cabecera.Titular.NIF}</sf:NIF>`);

    // ✅ Validar cantidad de registros
    const expectedCount = contenido.RegistroAlta.length;
    const actualCount = (xml.match(/<sf:RegistroAlta>/g) || []).length;
    expect(actualCount).toBe(expectedCount);
  });
});
