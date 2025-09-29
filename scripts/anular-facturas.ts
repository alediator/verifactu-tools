#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { registrarFacturas } from '../src';
import { ClientSSLSecurityPFX } from 'soap';
import { getVerifactuClient } from '../src/xml/getVerifactuClient';
import type { RegFactuSistemaFacturacion } from '../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

// Cargar variables del entorno
dotenv.config();

const [,, pfxPath, passphrase, endpoint] = process.argv;

if (!pfxPath || !passphrase || !endpoint) {
  console.error(`
Uso:
  tsx scripts/anular-facturas.ts <pfxPath> <passphrase> <endpoint>

Ejemplo:
  tsx scripts/anular-facturas.ts ./certs/cert.pfx 1234 https://aeat-pre...
  `);
  process.exit(1);
}

const fullPfxPath = path.resolve(pfxPath);
if (!fs.existsSync(fullPfxPath)) {
  console.error(`[❌ Certificado PFX no encontrado]: ${fullPfxPath}`);
  process.exit(1);
}

const input: RegFactuSistemaFacturacion = {
  Cabecera: {
    ObligadoEmision: {
      NombreRazon: 'Empresa Test S.L.',
      NIF: 'B12345678',
    },
  },
  RegistroFactura: [
    {
      RegistroAnulacion: {
        IDFactura: {
          IDEmisorFacturaAnulada: 'AAA'
        },
        SistemaInformatico: {
          NombreSistemaInformatico: 'verifactu-tools',
          Version: '0.1.0'
        },
        FechaHoraHusoGenRegistro: new Date(),
        Huella: 'F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97'
      }
    }
  ]
};

(async () => {
  try {
    const security = new ClientSSLSecurityPFX(
      fs.readFileSync(fullPfxPath),
      passphrase
    );

    const client = await getVerifactuClient(endpoint);
    client.setSecurity(security);

    console.log('[📤 Enviando anulación de factura...]');

    const result = await registrarFacturas(input, endpoint, security, true);

    console.log('[✅ Respuesta AEAT]:');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('[❌ Error al anular factura]', err.message || err);
    process.exit(1);
  }
})();