import { generarXMLDesdeJson } from '../src';
import type { RegFactuSistemaFacturacion } from '../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

describe('Generar XML del ejemplo 9.2.1.1 de la documentacion', () => {
  const endpoint = process.env.VERIFACTU_ENDPOINT;

  const facturaAlta = {
  Cabecera: {
    ObligadoEmision: {
      NombreRazon: 'XXXXX',
      NIF: 'AAAA',
    },
  },
  RegistroFactura: [
    {
      RegistroAnulacion: {
        IDVersion: '1.0',
        IDFactura: {
          IDEmisorFacturaAnulada: 'AAAA',
          NumSerieFacturaAnulada: '12345',
          FechaExpedicionFacturaAnulada: '13-09-2024',
        },

        SistemaInformatico: {
          NombreRazon: 'SSSS',
          NIF: 'NNNN',
          NombreSistemaInformatico: 'NombreSistemaInformatico',
          IdSistemaInformatico: '77',
          Version: '1.0.03',
          NumeroInstalacion: '383',
          TipoUsoPosibleSoloVerifactu: 'N',
          TipoUsoPosibleMultiOT: 'S',
          IndicadorMultiplesOT: 'S'
        },
        Encadenamiento: {
          RegistroAnterior: {
            IDEmisorFactura: 'AAAA',
            NumSerieFactura: '44',
            FechaExpedicionFactura: '13-09-2024',
            Huella: 'HuellaRegistroAnterior'
          }
        },
        FechaHoraHusoGenRegistro: new Date('2024-09-13T19:20:30+01:00'),
        TipoHuella: '01',
        Huella: 'Huella'
      }
    }
  ]
  } satisfies RegFactuSistemaFacturacion;

  it('El xml este bien formado', async () => {
    const xml = await generarXMLDesdeJson(facturaAlta);

    // ✅ Validaciones básicas
    expect(xml).toContain('<sf:SuministroLR');
    expect(xml).toContain('<sf:Cabecera>');
    expect(xml).toContain('<sf:RegistroAnulacion>');
    
    // ✅ Validar Cabecera
    expect(xml).toContain(`<sf:NombreRazon>${facturaAlta.Cabecera.ObligadoEmision.NombreRazon}</sf:NombreRazon>`);
    expect(xml).toContain(`<sf:NIF>${facturaAlta.Cabecera.ObligadoEmision.NIF}</sf:NIF>`);

    // ✅ Registro Anulacion
    expect(xml).toContain(`<sf:IDVersion>${facturaAlta.RegistroFactura[0].RegistroAnulacion.IDVersion}</sf:IDVersion>`);
    expect(xml).toContain(`<sf:IDEmisorFacturaAnulada>${facturaAlta.RegistroFactura[0].RegistroAnulacion.IDFactura.IDEmisorFacturaAnulada}</sf:IDEmisorFacturaAnulada>`);
    expect(xml).toContain(`<sf:NumSerieFacturaAnulada>${facturaAlta.RegistroFactura[0].RegistroAnulacion.IDFactura.NumSerieFacturaAnulada}</sf:NumSerieFacturaAnulada>`);
    expect(xml).toContain(`<sf:Huella>${facturaAlta.RegistroFactura[0].RegistroAnulacion.Encadenamiento.RegistroAnterior.Huella}</sf:Huella>`);
    expect(xml).toContain(`<sf:Huella>${facturaAlta.RegistroFactura[0].RegistroAnulacion.Huella}</sf:Huella>`);
  });
});
