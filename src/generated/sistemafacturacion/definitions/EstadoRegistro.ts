
/**
 * EstadoRegistro
 * @targetNSAlias `sfLRRC`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/RespuestaConsultaLR.xsd`
 */
export interface EstadoRegistro {
    /** dateTime */
    TimestampUltimaModificacion?: Date;
    /** EstadoRegistroType|string|Correcto,AceptadoConErrores,Incorrecto */
    EstadoRegistro?: string;
    /** ErrorDetalleType|integer */
    CodigoErrorRegistro?: string;
    /** TextMax500Type|string|maxLength */
    DescripcionErrorRegistro?: string;
}
