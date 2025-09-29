#!/usr/bin/env tsx

/**
 * Script para consultar facturas en el entorno de pruebas de AEAT VeriFactu.
 * 
 * Solo soporta certificados en formato:
 * - PFX + passphrase
 * 
 * Uso:
 * tsx scripts/consultar-facturas.ts <certPath.pfx> <passphrase> <endpoint> [nif] [desde] [hasta] [verbose]
 * 
 * Ejemplo:
 * tsx scripts/consultar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... B12345678 2025-07-01 2025-09-28 true
 */

import fs from 'fs';
import path from 'path';
import { consultarFacturas } from '../src';

// --- PARÁMETROS CLI ---
const [
  ,
  ,
  certPath,          // ./cert.pfx
  passphrase,        // 1234
  endpoint,          // https://...
  nif = '00000000X',
  desde = '2025-07-01',
  hasta = '2025-09-28',
  verboseFlag        // 'true' opcional
] = process.argv;

// --- Validación mínima ---
if (!certPath || !passphrase || !endpoint) {
  console.error(`
❌ Uso incorrecto

  tsx scripts/consultar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... B12345678 2025-07-01 2025-09-28 [verbose]
`);
  process.exit(1);
}

// --- Opciones de certificado ---
const certOptions = {
  pfx: fs.readFileSync(path.resolve(certPath)),
  passphrase,
};

const verbose = verboseFlag === 'true';

// --- Payload de consulta ---
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
(async () => {
  try {
    const result = await consultarFacturas(consulta, endpoint, certOptions, verbose);
    console.log('\n✅ Resultado de la consulta:');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
    } else {
      console.error('Error desconocido:', err);
    }
    process.exit(1);
  }
})();
