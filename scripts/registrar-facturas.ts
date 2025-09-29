#!/usr/bin/env tsx

/**
 * Script para registrar facturas en el entorno de pruebas de AEAT VeriFactu.
 * 
 * Soporta certificados en formato:
 * - PEM + KEY + passphrase
 * - PFX + passphrase
 * 
 * Parámetros CLI esperados:
 *    tsx scripts/registrar-facturas.ts <certPath> <keyOrPassphrase> <passphraseOrEndpoint> [endpoint]
 * 
 * Ejemplos:
 * 1. Certificado en PEM + KEY:
 *    tsx scripts/registrar-facturas.ts ./cert.pem ./key.pem 1234 https://aeat-pre.aeat.es/...
 * 
 * 2. Certificado en PFX:
 *    tsx scripts/registrar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/...
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { registrarFacturas } from '../src';
import type { RegFactuSistemaFacturacion } from '../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

dotenv.config();

// --- PARÁMETROS CLI ---
const [
  ,
  ,
  certPath,
  keyOrPassphrase,
  passphraseOrEndpoint,
  maybeEndpoint,
] = process.argv;

if (!certPath || !keyOrPassphrase || !passphraseOrEndpoint) {
  console.error(`
❌ Uso incorrecto

Modo PEM + KEY:
  tsx scripts/registrar-facturas.ts ./cert.pem ./key.pem 1234 https://aeat-pre.aeat.es/...

Modo PFX:
  tsx scripts/registrar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/...
`);
  process.exit(1);
}

// --- Resolver certificado ---
let certOptions: any;
let endpoint: string;

if (keyOrPassphrase.endsWith('.pem')) {
  // Modo PEM + KEY
  certOptions = {
    cert: fs.readFileSync(path.resolve(certPath)),
    key: fs.readFileSync(path.resolve(keyOrPassphrase)),
    passphrase: passphraseOrEndpoint,
  };
  endpoint = maybeEndpoint;
} else {
  // Modo PFX
  certOptions = {
    pfx: fs.readFileSync(path.resolve(certPath)),
    passphrase: keyOrPassphrase,
  };
  endpoint = passphraseOrEndpoint;
}

// --- JSON de factura de prueba (basado en ejemplo de la documentación AEAT) ---
const facturaAlta: RegFactuSistemaFacturacion = {
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
        DescripcionOperacion: 'Servicio de prueba AEAT',
        CuotaTotal: '12.35',
        ImporteTotal: '123.45',
        SistemaInformatico: {
          NombreSistemaInformatico: 'verifactu-tools',
          Version: '1.0.8',
        },
        FechaHoraHusoGenRegistro: new Date('2024-01-01T19:20:30+01:00'),
        TipoHuella: '01',
      },
    },
  ],
};

// --- Enviar a AEAT ---
;(async () => {
  try {
    const respuesta = await registrarFacturas(facturaAlta, endpoint, certOptions, true);
    console.log('\n✅ Respuesta de AEAT:');
    console.log(JSON.stringify(respuesta, null, 2));
  } catch (err) {
    console.error('\n❌ Error al registrar:', err.message || err);
    process.exit(1);
  }
})();
