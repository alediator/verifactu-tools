import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType4 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType4";

export interface SistemaRequerimiento {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType4, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
