import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType5 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType5";

export interface SistemaRequerimientoSello {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType5, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
