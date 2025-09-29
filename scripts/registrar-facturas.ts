#!/usr/bin/env tsx

/**
 * Script para registrar facturas en el entorno de pruebas de AEAT VeriFactu.
 * 
 * Solo admite certificados en formato:
 * - PFX + passphrase
 * 
 * Uso:
 * tsx scripts/registrar-facturas.ts <certPath.pfx> <passphrase> <endpoint> <jsonFactura> [verbose]
 * 
 * Ejemplo:
 * tsx scripts/registrar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... '<json>' true
 */

import fs from 'fs';
import path from 'path';
import { registrarFacturas } from '../src';
import type { RegFactuSistemaFacturacion } from '../src/generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion';

// --- PARÁMETROS CLI ---
const [,, certPath, passphrase, endpoint, jsonInput, verboseFlag] = process.argv;

if (!certPath || !passphrase || !endpoint || !jsonInput) {
  console.error(`
❌ Uso incorrecto

  tsx scripts/registrar-facturas.ts <certPath.pfx> <passphrase> <endpoint> '<jsonFactura>' [verbose]

Ejemplo:

  tsx scripts/registrar-facturas.ts ./cert.pfx 1234 https://aeat-pre.aeat.es/... '{
    "Cabecera": { ... },
    "RegistroFactura": [ ... ]
  }' true
`);
  process.exit(1);
}

// --- Resolver certificado ---
const certOptions = {
  pfx: fs.readFileSync(path.resolve(certPath)),
  passphrase,
};

const verbose = verboseFlag === 'true';

// --- Parsear JSON de factura ---
let facturaInput: RegFactuSistemaFacturacion;
try {
  facturaInput = JSON.parse(jsonInput);
} catch (err) {
  console.error('[❌ Error] JSON de factura no válido');
  process.exit(1);
}

// --- Enviar a AEAT ---
(async () => {
  try {
    const respuesta = await registrarFacturas(facturaInput, endpoint, certOptions, verbose);
    console.log('\n✅ Respuesta de AEAT:');
    console.log(JSON.stringify(respuesta, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      console.error('[❌ Error]', err.message);
    } else {
      console.error('[❌ Error desconocido]', err);
    }
    process.exit(1);
  }
})();
