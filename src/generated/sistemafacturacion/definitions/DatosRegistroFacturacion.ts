import { Tercero } from "./Tercero";
import { FacturasRectificadas1 } from "./FacturasRectificadas1";
import { FacturasSustituidas1 } from "./FacturasSustituidas1";
import { ImporteRectificacion } from "./ImporteRectificacion";
import { Destinatarios1 } from "./Destinatarios1";
import { Desglose } from "./Desglose";
import { Encadenamiento2 } from "./Encadenamiento2";
import { SistemaInformatico } from "./SistemaInformatico";

/**
 * DatosRegistroFacturacion
 * @targetNSAlias `sfLRRC`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/RespuestaConsultaLR.xsd`
 */
export interface DatosRegistroFacturacion {
    /** TextMax120Type|string|maxLength */
    NombreRazonEmisor?: string;
    /** TextMax60Type|string|maxLength */
    RefExterna?: string;
    /** SubsanacionType|string|S,N */
    Subsanacion?: string;
    /** RechazoPrevioType|string|N,S,X */
    RechazoPrevio?: string;
    /** SinRegistroPrevioType|string|S,N */
    SinRegistroPrevio?: string;
    /** GeneradoPorType|string|E,D,T */
    GeneradoPor?: string;
    /** Generador */
    Generador?: Tercero;
    /** ClaveTipoFacturaType|string|F1,F2,R1,R2,R3,R4,R5,F3 */
    TipoFactura?: string;
    /** ClaveTipoRectificativaType|string|S,I */
    TipoRectificativa?: string;
    /** FacturasRectificadas */
    FacturasRectificadas?: FacturasRectificadas1;
    /** FacturasSustituidas */
    FacturasSustituidas?: FacturasSustituidas1;
    /** ImporteRectificacion */
    ImporteRectificacion?: ImporteRectificacion;
    /** fecha|string|length,pattern */
    FechaOperacion?: string;
    /** TextMax500Type|string|maxLength */
    DescripcionOperacion?: string;
    /** SimplificadaCualificadaType|string|S,N */
    FacturaSimplificadaArt7273?: string;
    /** CompletaSinDestinatarioType|string|S,N */
    FacturaSinIdentifDestinatarioArt61d?: string;
    /** MacrodatoType|string|S,N */
    Macrodato?: string;
    /** TercerosODestinatarioType|string|D,T */
    EmitidaPorTerceroODestinatario?: string;
    /** Tercero */
    Tercero?: Tercero;
    /** Destinatarios */
    Destinatarios?: Destinatarios1;
    /** CuponType|string|S,N */
    Cupon?: string;
    /** Desglose */
    Desglose?: Desglose;
    /** ImporteSgn12.2Type|string|pattern */
    CuotaTotal?: string;
    /** ImporteSgn12.2Type|string|pattern */
    ImporteTotal?: string;
    /** Encadenamiento */
    Encadenamiento?: Encadenamiento2;
    /** SistemaInformatico */
    SistemaInformatico?: SistemaInformatico;
    /** dateTime */
    FechaHoraHusoGenRegistro?: Date;
    /** TextMax15Type|string|maxLength */
    NumRegistroAcuerdoFacturacion?: string;
    /** TextMax16Type|string|maxLength */
    IdAcuerdoSistemaInformatico?: string;
    /** TipoHuellaType|string|01 */
    TipoHuella?: string;
    /** TextMax64Type|string|maxLength */
    Huella?: string;
    /** NIFType|string|length */
    NifRepresentante?: string;
    /** fecha|string|length,pattern */
    FechaFinVeriFactu?: string;
    /** IncidenciaType|string|S,N */
    Incidencia?: string;
}
