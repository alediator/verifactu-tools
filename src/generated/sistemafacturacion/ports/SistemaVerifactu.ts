import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType";
import { SfLrcconsultaFactuSistemaFacturacionType } from "../definitions/SfLrcconsultaFactuSistemaFacturacionType";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType } from "../definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType";

export interface SistemaVerifactu {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    ConsultaFactuSistemaFacturacion(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType, callback: (err: any, result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
