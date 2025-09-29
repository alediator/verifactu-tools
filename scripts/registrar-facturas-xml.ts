#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { getVerifactuClient } from '../src';
import { ClientSSLSecurityPFX } from 'soap';

// Cargar variables del entorno
dotenv.config();

// --- PARÁMETROS CLI ---
const [,, pfxPath, passphrase, endpoint, xmlPath] = process.argv;

if (!pfxPath || !passphrase || !endpoint || !xmlPath) {
  console.error(`
Uso:
  tsx scripts/registrar-facturas-xml.ts <pfxPath> <passphrase> <endpoint> <xmlPath>

Ejemplo:
  tsx scripts/registrar-facturas-xml.ts ./certs/cert.pfx 1234 https://aeat-pre... ./mi-xml.xml
  `);
  process.exit(1);
}

// --- VALIDACIONES Y CARGA DE ARCHIVOS ---
const fullXmlPath = path.resolve(xmlPath);
const fullPfxPath = path.resolve(pfxPath);

if (!fs.existsSync(fullXmlPath)) {
  console.error(`[❌ XML no encontrado]: ${fullXmlPath}`);
  process.exit(1);
}

if (!fs.existsSync(fullPfxPath)) {
  console.error(`[❌ Certificado PFX no encontrado]: ${fullPfxPath}`);
  process.exit(1);
}

// --- ENVÍO ---
(async () => {
  try {
    const security = new ClientSSLSecurityPFX(
      fs.readFileSync(fullPfxPath),
      passphrase
    );

    const client = await getVerifactuClient(endpoint);
    client.setSecurity(security);

    const xmlContent = fs.readFileSync(fullXmlPath, 'utf-8');

    console.log('[📤 XML Enviado]');
    console.log(xmlContent);

    const input = client.wsdl.xmlToObject(xmlContent);
    const result = await client.RegFactuSistemaFacturacionAsync(input);

    console.log('[✅ Respuesta AEAT]:');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('[❌ Error al registrar]', err.message || err);
    process.exit(1);
  }
})();
