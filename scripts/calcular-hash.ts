#!/usr/bin/env node
import { calcularHash } from '../src';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(`\nUso:
  tsx scripts/calcular-hash.ts <tipo> <json>

ejemplos:
  tsx scripts/calcular-hash.ts alta '{"IDEmisorFactura":"89890001K", ...}'
  tsx scripts/calcular-hash.ts anulacion '{"IDEmisorFacturaAnulada":"89890001K", ...}'
`);
  process.exit(1);
}

const [tipo, jsonInput, verbose] = args;

try {
  const data = JSON.parse(jsonInput);

  if (tipo !== 'alta' && tipo !== 'anulacion') {
    console.error(`Tipo inválido: ${tipo}. Debe ser 'alta' o 'anulacion'.`);
    process.exit(1);
  }

  if(verbose) {
    console.log(`[Calculando hash] Tipo ${tipo}`);
    console.log(`[Calculando hash] Datos: ${jsonInput}`);
  }

  const hash = calcularHash(data);
  console.log(`\n[✅ HASH generado]:\n${hash}`);

  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
    } else {
      console.error('Error desconocido:', err);
    }
    process.exit(1);
  }