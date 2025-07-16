import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType7 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType7";

export interface SistemaRequerimientoSelloPruebas {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType7, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
