#!/usr/bin/env tsx

/**
 * Script para enviar un XML preformado a AEAT usando un certificado PFX.
 *
 * Inputs:
 *   - Certificado PFX
 *   - Passphrase
 *   - Endpoint SOAP
 *   - Ruta al XML
 *   - Ruta de salida (opcional)
 *   - Verbose (opcional)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- PARÁMETROS CLI ---
const [
  ,
  ,
  certPath,
  passphrase,
  endpoint,
  xmlPath,
  outputPath,
  verbose
] = process.argv;

if (!certPath || !passphrase || !endpoint || !xmlPath) {
  console.error(`\n❌ Uso incorrecto:

Uso:
  tsx scripts/enviar-xml.ts <cert.pfx> <passphrase> <endpoint> <xmlPath> [outputPath] [verbose]

Ejemplo:
  tsx scripts/enviar-xml.ts ./cert.pfx 1234 https://aeat-pre... ./xmls/mi-envio.xml ./respuesta.xml true
`);
  process.exit(1);
}

if (verbose) {
  console.log('[🛂 Certificado]:', certPath);
  console.log('[🔐 Passphrase]:', '*'.repeat(passphrase.length));
  console.log('[🌍 Endpoint]:', endpoint);
  console.log('[📤 XML]:', xmlPath);
  if (outputPath) console.log('[📥 Output]:', outputPath);
}

try {
  const pfx = fs.readFileSync(path.resolve(certPath));
  const xml = fs.readFileSync(path.resolve(xmlPath), 'utf-8');

  const httpsAgent = new https.Agent({
    pfx,
    passphrase,
    rejectUnauthorized: false, // AEAT usa certificados autofirmados en pre
  });

  const response = await axios.post(endpoint, xml, {
    httpsAgent,
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '""'
    },
    responseType: 'text',
    timeout: 30000,
    validateStatus: () => true // no lanza error en 500
  });

  if(verbose){
    console.log('\n✅ Respuesta de AEAT:');
  }

  console.log(response.data);

  if (outputPath) {
    fs.writeFileSync(path.resolve(outputPath), response.data, 'utf-8');
    if(verbose){
      console.log(`\n💾 Guardado en: ${outputPath}`);
    }
  }

} catch (err: any) {
  console.error('\n❌ Error al enviar XML:', err.message || err);
  process.exit(1);
}
