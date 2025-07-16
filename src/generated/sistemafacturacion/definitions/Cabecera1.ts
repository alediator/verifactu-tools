import { ObligadoEmision1 } from "./ObligadoEmision1";
import { ObligadoEmision } from "./ObligadoEmision";

/**
 * Cabecera
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface Cabecera1 {
    /** VersionType|string|1.0 */
    IDVersion?: string;
    /** ObligadoEmision */
    ObligadoEmision?: ObligadoEmision1;
    /** Destinatario */
    Destinatario?: ObligadoEmision;
    /** IndicadorRepresentanteType|string|S */
    IndicadorRepresentante?: string;
}
