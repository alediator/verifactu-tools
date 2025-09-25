// src/index.ts
export { calcularHash } from './core/calcularHash.js';
export { getVerifactuClient } from './xml/getVerifactuClient.js';
export { generarXMLDesdeJson } from './xml/generarXMLDesdeJson.js';
export { validarXMLContraXSD } from './utils/validateXml.js';
export { formatFechaConZona } from './utils/fechaUtils.js';
export { registrarFacturas } from './soap/registrarFacturas.js';
export { consultarFacturas } from './soap/consultarFacturas.js';
