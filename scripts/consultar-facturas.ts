#!/usr/bin/env tsx

/**
 * Script para consultar facturas en el entorno de pruebas de AEAT VeriFactu.
 * 
 * Soporta certificados en formato:
 * - PEM + KEY + passphrase
 * - PFX + passphrase
 * 
 * Parámetros CLI esperados:
 *    tsx scripts/consultar-facturas.ts <certPath> <keyOrPassphrase> <passphraseOrEndpoint> [endpoint] [nif] [desde] [hasta]
 * 
 * Ejemplos:
 * 1. Certificado en PEM + KEY:
 *    tsx scripts/consultar-facturas.ts ./cert.pem ./key.pem 1234 https://aeat-pre.aeat.es/... B12345678 2025-07-01 2025-09-28
 * 
 * 2. Certificado en PFX:
 *    tsx scripts/consultar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... B12345678 2025-07-01 2025-09-28
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { consultarFacturas } from '../src';

// Cargar variables de entorno desde .env si existe
dotenv.config();

// --- PARÁMETROS CLI ---
const [
  ,
  ,
  certPath,                 // Path al cert (PFX)
  passphrase,     // passphrase o endpoint
  endpoint,
  nif = '00000000X',
  desde = '2025-07-01',
  hasta = '2025-09-28'
] = process.argv;

// --- Validación mínima ---
if (!certPath || !passphrase || !endpoint) {
  console.error(`
❌ Uso incorrecto

Modo PFX:
  tsx scripts/consultar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... B12345678 2025-07-01 2025-09-28
`);
  process.exit(1);
}

// --- Resolver tipo de certificado ---
let certOptions= {
    pfx: fs.readFileSync(path.resolve(certPath)),
    passphrase
  };

// --- Payload de ejemplo ---
const consulta = {
  Cabecera: {
    IDVersionSii: '1.1',
    ObligadoEmision: {
      NIF: nif,
    },
  },
  FiltroFactura: {
    FechaExpedicionDesde: desde,
    FechaExpedicionHasta: hasta,
  },
};

// --- Llamada ---
;(async () => {
  try {
    const result = await consultarFacturas(consulta, endpoint, certOptions, true);
    console.log('\n✅ Resultado de la consulta:');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('\n❌ Error al consultar:', err.message || err);
    process.exit(1);
  }
})();
