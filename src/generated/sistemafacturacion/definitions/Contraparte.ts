import { IdOtro } from "./IdOtro";

/**
 * Contraparte
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface Contraparte {
    /** TextMax120Type|string|maxLength */
    NombreRazon?: string;
    /** NIFType|string|length */
    NIF?: string;
    /** IDOtro */
    IDOtro?: IdOtro;
}
