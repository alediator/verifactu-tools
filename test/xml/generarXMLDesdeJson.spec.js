import path from 'path';
import fs from 'fs';
import { generarXMLDesdeJson } from '../../src';
const fixturePath = path.join(__dirname, '../fixtures/xml', 'empresa-una-facturas.json');
const input = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
describe('generarXMLDesdeJson', () => {
    it('genera XML válido desde JSON mínimo', async () => {
        const xml = await generarXMLDesdeJson(input);
        expect(xml).toContain('<sf:SuministroLR');
        expect(xml).toContain('<sf:Cabecera>');
        expect(xml).toContain('<sf:RegistroAlta>');
    });
});
describe('Generar XML del ejemplo 9.1.1.1 de la documentacion', () => {
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
                        DetalleDesglose: [
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
    };
    it('El xml este bien formado', async () => {
        const xml = await generarXMLDesdeJson(facturaAlta);
        // ✅ Validaciones básicas
        expect(xml).toContain('<sf:SuministroLR');
        expect(xml).toContain('<sf:Cabecera>');
        expect(xml).toContain('<sf:RegistroAlta>');
        // ✅ Validar Cabecera
        expect(xml).toContain(`<sf:NombreRazon>${facturaAlta.Cabecera.ObligadoEmision.NombreRazon}</sf:NombreRazon>`);
        expect(xml).toContain(`<sf:NIF>${facturaAlta.Cabecera.ObligadoEmision.NIF}</sf:NIF>`);
        // ✅ Registro Alta
        expect(xml).toContain(`<sf:IDVersion>${facturaAlta.RegistroFactura[0].RegistroAlta.IDVersion}</sf:IDVersion>`);
        expect(xml).toContain(`<sf:TipoFactura>${facturaAlta.RegistroFactura[0].RegistroAlta.TipoFactura}</sf:TipoFactura>`);
        expect(xml).toContain(`<sf:ImporteTotal>${facturaAlta.RegistroFactura[0].RegistroAlta.ImporteTotal}</sf:ImporteTotal>`);
        expect(xml).toContain(`<sf:Huella>${facturaAlta.RegistroFactura[0].RegistroAlta.Encadenamiento.RegistroAnterior.Huella}</sf:Huella>`);
        expect(xml).toContain(`<sf:Huella>${facturaAlta.RegistroFactura[0].RegistroAlta.Huella}</sf:Huella>`);
    });
});
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
    };
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
