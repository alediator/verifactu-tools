import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType1 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType1";
import { SfLrcconsultaFactuSistemaFacturacionType1 } from "../definitions/SfLrcconsultaFactuSistemaFacturacionType1";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType1 } from "../definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType1";

export interface SistemaVerifactuSello {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    ConsultaFactuSistemaFacturacion(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType1, callback: (err: any, result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
