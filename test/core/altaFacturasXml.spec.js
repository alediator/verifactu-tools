import { altaFacturasXml } from '../../src/core/altaFacturasXml';
import { parseXml, Element } from 'libxmljs2';
describe('altaFacturasXml', () => {
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
                    RegistroAlta: {
                        IDFactura: {
                            IDEmisorFactura: '89890001K',
                            NumSerieFactura: '12345678/G33',
                            FechaExpedicionFactura: '01-01-2024',
                        },
                        TipoFactura: 'F1',
                        CuotaTotal: '12.35',
                        ImporteTotal: '123.45',
                        SistemaInformatico: {
                            NombreSistemaInformatico: 'verifactu-tools',
                            Version: '0.1.0',
                        },
                        FechaHoraHusoGenRegistro: new Date('2024-01-01T19:20:30+01:00'),
                    },
                }, {
                    RegistroAlta: {
                        IDFactura: {
                            IDEmisorFactura: '89890001K',
                            NumSerieFactura: '12345679/G34',
                            FechaExpedicionFactura: '01-01-2024',
                        },
                        TipoFactura: 'F1',
                        CuotaTotal: '12.35',
                        ImporteTotal: '123.45',
                        SistemaInformatico: {
                            NombreSistemaInformatico: 'verifactu-tools',
                            Version: '0.1.0',
                        },
                        FechaHoraHusoGenRegistro: new Date('2024-01-01T19:20:35+01:00'),
                    },
                }
            ],
        };
        const xml = await altaFacturasXml(input);
        console.log(xml);
        const xmlConEncabezado = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        const doc = parseXml(xmlConEncabezado, { noblanks: true });
        console.log(doc);
        const huellas = doc.find('//sf:Huella', {
            sf: 'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
        }).map((n) => (n instanceof Element ? n.text() : ''));
        expect(huellas).toEqual([
            '3C464DAF61ACB827C65FDA19F352A4E3BDC2C640E9E9FC4CC058073F38F12F60',
            'F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97',
        ]);
    });
});
