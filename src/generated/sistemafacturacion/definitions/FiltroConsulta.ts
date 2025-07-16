import { PeriodoImputacion } from "./PeriodoImputacion";
import { Contraparte } from "./Contraparte";
import { FechaExpedicionFactura } from "./FechaExpedicionFactura";
import { SistemaInformatico } from "./SistemaInformatico";
import { ClavePaginacion } from "./ClavePaginacion";

/**
 * FiltroConsulta
 * @targetNSAlias `sfLRC`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/ConsultaLR.xsd`
 */
export interface FiltroConsulta {
    /** PeriodoImputacion */
    PeriodoImputacion?: PeriodoImputacion;
    /** TextoIDFacturaType|string|minLength,maxLength */
    NumSerieFactura?: string;
    /** Contraparte */
    Contraparte?: Contraparte;
    /** FechaExpedicionFactura */
    FechaExpedicionFactura?: FechaExpedicionFactura;
    /** SistemaInformatico */
    SistemaInformatico?: SistemaInformatico;
    /** TextMax70Type|string|maxLength */
    RefExterna?: string;
    /** ClavePaginacion */
    ClavePaginacion?: ClavePaginacion;
}
