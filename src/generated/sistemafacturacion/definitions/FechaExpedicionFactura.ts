import { RangoFechaExpedicion } from "./RangoFechaExpedicion";

/**
 * FechaExpedicionFactura
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface FechaExpedicionFactura {
    /** fecha|string|length,pattern */
    FechaExpedicionFactura?: string;
    /** RangoFechaExpedicion */
    RangoFechaExpedicion?: RangoFechaExpedicion;
}
