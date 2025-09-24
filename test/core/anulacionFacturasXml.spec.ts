import { parseXml, Element } from 'libxmljs2';
import type { RegFactuSistemaFacturacion } from '../../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';
import { anulacionFacturasXml } from '../../src/core/anulacionFacturasXml';

describe('anulacionFacturasXml', () => {
  it('genera XML con huellas calculadas', async () => {
    const input = {
      Cabecera: {
        ObligadoEmision: {
          NombreRazon: 'Empresa Test S.L.',
          NIF: '89890001K',
        },
      },
      RegistroFactura: [
        {
          RegistroAnulacion: {
            IDFactura: {
              IDEmisorFacturaAnulada: '89890001K',
              NumSerieFacturaAnulada: '12345679/G34',
              FechaExpedicionFacturaAnulada: '01-01-2024',
            },
            SistemaInformatico: {
              NombreSistemaInformatico: 'verifactu-tools',
              Version: '0.1.0',
            },
            FechaHoraHusoGenRegistro: new Date('2024-01-01T19:20:40+01:00'),
          },
        }
      ],
    } satisfies RegFactuSistemaFacturacion;

    const xml = await anulacionFacturasXml(input, 'F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97');
    console.log(xml);
    const xmlConEncabezado = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
    const doc = parseXml(xmlConEncabezado, { noblanks: true });
    console.log(doc);

    const huellas = doc.find('//sf:Huella', {
        sf: 'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
    }).map((n) => (n instanceof Element ? n.text() : ''));

    expect(huellas).toEqual([
        '177547C0D57AC74748561D054A9CEC14B4C4EA23D1BEFD6F2E69E3A388F90C68',
    ]);
  });
});