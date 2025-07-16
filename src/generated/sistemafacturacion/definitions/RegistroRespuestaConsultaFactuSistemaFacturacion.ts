import { IdFactura } from "./IdFactura";
import { DatosRegistroFacturacion } from "./DatosRegistroFacturacion";
import { DatosPresentacion1 } from "./DatosPresentacion1";
import { EstadoRegistro } from "./EstadoRegistro";

/**
 * RegistroRespuestaConsultaFactuSistemaFacturacion
 * @targetNSAlias `sfLRRC`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/RespuestaConsultaLR.xsd`
 */
export interface RegistroRespuestaConsultaFactuSistemaFacturacion {
    /** IDFactura */
    IDFactura?: IdFactura;
    /** DatosRegistroFacturacion */
    DatosRegistroFacturacion?: DatosRegistroFacturacion;
    /** DatosPresentacion */
    DatosPresentacion?: DatosPresentacion1;
    /** EstadoRegistro */
    EstadoRegistro?: EstadoRegistro;
}
