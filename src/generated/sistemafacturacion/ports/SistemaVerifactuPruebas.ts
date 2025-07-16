import { RegFactuSistemaFacturacion } from "../definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType2 } from "../definitions/SfRrespuestaRegFactuSistemaFacturacionType2";
import { SfLrcconsultaFactuSistemaFacturacionType2 } from "../definitions/SfLrcconsultaFactuSistemaFacturacionType2";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType2 } from "../definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType2";

export interface SistemaVerifactuPruebas {
    RegFactuSistemaFacturacion(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, callback: (err: any, result: SfRrespuestaRegFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    ConsultaFactuSistemaFacturacion(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType2, callback: (err: any, result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
