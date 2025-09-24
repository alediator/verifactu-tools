// src/index.ts
export { calcularHash } from './core/calcularHash';
export { getVerifactuClient } from './xml/getVerifactuClient';
export { generarXMLDesdeJson } from './xml/generarXMLDesdeJson';
export { validarXMLContraXSD } from './utils/validateXml';
export { formatFechaConZona } from './utils/fechaUtils';
export { registrarFacturas } from './soap/registrarFacturas';
export { consultarFacturas } from './soap/consultarFacturas';