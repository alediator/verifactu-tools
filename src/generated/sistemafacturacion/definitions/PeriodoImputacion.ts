
/**
 * PeriodoImputacion
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface PeriodoImputacion {
    /** YearType|string|length,pattern */
    Ejercicio?: string;
    /** TipoPeriodoType|string|01,02,03,04,05,06,07,08,09,10,11,12 */
    Periodo?: string;
}
