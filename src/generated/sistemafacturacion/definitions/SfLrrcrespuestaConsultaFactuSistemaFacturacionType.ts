import { Cabecera1 } from "./Cabecera1";
import { PeriodoImputacion1 } from "./PeriodoImputacion1";
import { RegistroRespuestaConsultaFactuSistemaFacturacion } from "./RegistroRespuestaConsultaFactuSistemaFacturacion";
import { ClavePaginacion } from "./ClavePaginacion";

/** sfLRRC:RespuestaConsultaFactuSistemaFacturacionType */
export interface SfLrrcrespuestaConsultaFactuSistemaFacturacionType {
    /** Cabecera */
    Cabecera?: Cabecera1;
    /** PeriodoImputacion */
    PeriodoImputacion?: PeriodoImputacion1;
    /** IndicadorPaginacionType|string|S,N */
    IndicadorPaginacion?: string;
    /** ResultadoConsultaType|string|ConDatos,SinDatos */
    ResultadoConsulta?: string;
    /** RegistroRespuestaConsultaFactuSistemaFacturacion[] */
    RegistroRespuestaConsultaFactuSistemaFacturacion?: Array<RegistroRespuestaConsultaFactuSistemaFacturacion>;
    /** ClavePaginacion */
    ClavePaginacion?: ClavePaginacion;
}
