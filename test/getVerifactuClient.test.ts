import path from 'path';
import { getVerifactuClient } from '../src';

describe('getVerifactuClient', () => {
  it('crea un cliente válido con el WSDL local', async () => {
    const client = await getVerifactuClient();
    expect(typeof client).toBe('object');
    const operaciones = Object.keys(client);
    console.log('Operaciones disponibles:', operaciones);
    expect(operaciones).toContain('RegFactuSistemaFacturacion'); 
    expect(operaciones).toContain('RegFactuSistemaFacturacionAsync');
    expect(operaciones).toContain('ConsultaFactuSistemaFacturacion');
    expect(operaciones).toContain('ConsultaFactuSistemaFacturacionAsync');
    expect(operaciones).toContain('sfVerifactu');
    expect(operaciones).toContain('sfRequerimiento');
  });
});
