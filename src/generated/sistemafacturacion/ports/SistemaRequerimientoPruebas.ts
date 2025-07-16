import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType6 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType6";

export interface SistemaRequerimientoPruebas {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType6, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
