import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType3 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType3";
import { SfLrcconsultaFactuSistemaFacturacionType3 } from "../definitions/SfLrcconsultaFactuSistemaFacturacionType3";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType3 } from "../definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType3";

export interface SistemaVerifactuSelloPruebas {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    ConsultaFactuSistemaFacturacion(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType3, callback: (err: any, result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
