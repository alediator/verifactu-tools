import { registrarFacturas, consultarFacturas } from '../../src';
import type { RegFactuSistemaFacturacion } from '../../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

describe('Suite de integración AEAT VeriFactu', () => {
  const endpoint = process.env.VERIFACTU_ENDPOINT;

  const factura = {
  Cabecera: {
    ObligadoEmision: {
      NombreRazon: 'Empresa Test S.L.',
      NIF: 'B12345678',
    },
  },
  RegistroFactura: [
    {
      RegistroAlta: {
        IDFactura: {
          IDEmisorFactura: 'B12345678',
          NumSerieFactura: 'F2025-TEST1',
          FechaExpedicionFactura: '2025-07-16',
        },
        FacturaSimplificadaArt7273: 'Prueba de registro en VeriFactu',
        SistemaInformatico: {
          NombreSistemaInformatico: 'verifactu-tools',
          Version: '0.1.0',
        }
      }
    }
  ]
  } satisfies RegFactuSistemaFacturacion;

  it('registra una factura', async () => {
    const response = await registrarFacturas(factura, endpoint);
    console.log('Respuesta registro:', JSON.stringify(response, null, 2));
    expect(response[0].EstadoEnvio).toBeDefined();
  });

  it('consulta la factura registrada', async () => {
    const consulta = {
      Cabecera: {
        IDVersionSii: '1.1',
        ObligadoEmision: {
          NIF: 'B12345678'
        }
      },
      FiltroFactura: {
        FechaExpedicionDesde: '2025-07-01',
        FechaExpedicionHasta: '2025-07-31',
        NumSerieFacturaEmisor: 'F2025-TEST1'
      }
    };
    const result = await consultarFacturas(consulta, endpoint);
    console.log('Respuesta consulta:', JSON.stringify(result, null, 2));
    expect(result.ResultadoConsulta).toBeDefined();
  });

  // it('modifica la factura', async () => { ... });
  // it('anula la factura', async () => { ... });
});
