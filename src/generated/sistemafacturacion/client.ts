import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { RegFactuSistemaFacturacion } from "./definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType";
import { SfLrcconsultaFactuSistemaFacturacionType } from "./definitions/SfLrcconsultaFactuSistemaFacturacionType";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType } from "./definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType";
import { SfRrespuestaRegFactuSistemaFacturacionType1 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType1";
import { SfLrcconsultaFactuSistemaFacturacionType1 } from "./definitions/SfLrcconsultaFactuSistemaFacturacionType1";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType1 } from "./definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType1";
import { SfRrespuestaRegFactuSistemaFacturacionType2 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType2";
import { SfLrcconsultaFactuSistemaFacturacionType2 } from "./definitions/SfLrcconsultaFactuSistemaFacturacionType2";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType2 } from "./definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType2";
import { SfRrespuestaRegFactuSistemaFacturacionType3 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType3";
import { SfLrcconsultaFactuSistemaFacturacionType3 } from "./definitions/SfLrcconsultaFactuSistemaFacturacionType3";
import { SfLrrcrespuestaConsultaFactuSistemaFacturacionType3 } from "./definitions/SfLrrcrespuestaConsultaFactuSistemaFacturacionType3";
import { SfRrespuestaRegFactuSistemaFacturacionType4 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType4";
import { SfRrespuestaRegFactuSistemaFacturacionType5 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType5";
import { SfRrespuestaRegFactuSistemaFacturacionType6 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType6";
import { SfRrespuestaRegFactuSistemaFacturacionType7 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType7";
import { SfVerifactu } from "./services/SfVerifactu";
import { SfRequerimiento } from "./services/SfRequerimiento";

export interface SistemaFacturacionClient extends SoapClient {
    SfVerifactu: SfVerifactu;
    SfRequerimiento: SfRequerimiento;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType1, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType2, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType3, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType4, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType5, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType6, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType7, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType1, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType2, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
    ConsultaFactuSistemaFacturacionAsync(consultaFactuSistemaFacturacion: SfLrcconsultaFactuSistemaFacturacionType3, options?: ISoapExOptions): Promise<[result: SfLrrcrespuestaConsultaFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType4, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType5, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType6, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType7, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create SistemaFacturacionClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<SistemaFacturacionClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
