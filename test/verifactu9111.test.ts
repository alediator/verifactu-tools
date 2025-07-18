import { generarXMLDesdeJson } from '../src';
import type { RegFactuSistemaFacturacion } from '../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

describe('Suite de integración AEAT VeriFactu referente a 9.1.1 de la documentacion', () => {
  const endpoint = process.env.VERIFACTU_ENDPOINT;
  let hashAnterior = '';

  const facturaAlta = {
  Cabecera: {
    ObligadoEmision: {
      NombreRazon: 'XXXXX',
      NIF: 'AAAA',
    },
  },
  RegistroFactura: [
    {
      RegistroAlta: {
        IDVersion: '1.0',
        IDFactura: {
          IDEmisorFactura: 'AAAA',
          NumSerieFactura: '12345',
          FechaExpedicionFactura: '13-09-2024',
        },
        NombreRazonEmisor: 'XXXXX',
        TipoFactura: 'F1',
        DescripcionOperacion: 'Descripc',
        Destinatarios: {
          IDDestinatario: [
            {
              NombreRazon: 'YYYY',
              NIF: 'BBBB'
            }
          ]
        },
        Desglose: {
          DetalleDesglose:[
            {
              ClaveRegimen: '01',
              CalificacionOperacion: 'S1',
              TipoImpositivo: '4',
              BaseImponibleOimporteNoSujeto: '10',
              CuotaRepercutida: '0.4',
            },
            {
              ClaveRegimen: '01',
              CalificacionOperacion: 'S1',
              TipoImpositivo: '21',
              BaseImponibleOimporteNoSujeto: '100',
              CuotaRepercutida: '21',
            },
          ]
        },
        CuotaTotal: '21.4',
        ImporteTotal: '131.4',

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
    const xml = generarXMLDesdeJson(facturaAlta);
    console.log(xml);
    expect(xml).toContain('<sf:SuministroLR');
    expect(xml).toContain('<sf:Cabecera>');
    expect(xml).toContain('<sf:RegistroAlta>');
  });
});
