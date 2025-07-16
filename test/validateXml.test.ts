
import path from 'path';
import fs from 'fs';
import { generarXMLDesdeJson } from '../src';

const fixturePath = path.join(__dirname, 'fixtures/xml', 'empresa-una-facturas.json');
const input = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));

describe('generarXMLDesdeJson', () => {
  it('genera XML válido desde JSON mínimo', async () => {
    const xml = await generarXMLDesdeJson(input);
    expect(xml).toContain('<sf:SuministroLR');
    expect(xml).toContain('<sf:Cabecera>');
    expect(xml).toContain('<sf:RegistroAlta>');
  });
});
