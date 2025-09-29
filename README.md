# 📦 verifactu-tools

Librería de utilidades para trabajar con **VeriFactu (AEAT)** desde Node.js y TypeScript.

Incluye:

- 🔧 Generación automática de tipos y cliente SOAP desde el WSDL oficial.
- 📄 Validación de XML contra los XSD de AEAT.
- 🧪 Pruebas unitarias con Jest.
- 🧰 Scripts para parchear referencias externas (`schemaLocation`) y trabajar completamente en local.

---

## 📁 Estructura del proyecto

```
verifactu-tools/
├── wsdl/                  # WSDL + XSD descargados desde AEAT
├── src/generated/         # Código generado por wsdl-tsclient
├── test/                  # Pruebas unitarias y fixtures
├── scripts/               # Scripts auxiliares para parcheo y codegen
├── package.json
└── tsconfig.json
```

---

## 🚀 Uso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Generar tipos desde WSDL

```bash
npm run codegen
```

Este comando:
- 🔧 Parchea las rutas `schemaLocation` en los `.xsd`
- ⚙️ Llama a `wsdl-tsclient` para generar cliente y tipos TypeScript

> Requiere que el archivo `xmldsig-core-schema.xsd` esté disponible en `./wsdl`.

---

### 3. Ejecutar tests

```bash
npm test
```

Ejecuta validaciones como:

- Comprobar que los XML generados cumplen los XSD
- Validación estructural contra `SuministroLR.xsd`, `RespuestaSuministro.xsd`, etc.

---

## 🧪 Validación XML contra XSD (con libxmljs2)

La librería usa [`libxmljs2`](https://www.npmjs.com/package/libxmljs2) para validar que los XML que se generen manualmente cumplan los esquemas definidos por AEAT.

Ejemplo:

```ts
const xmlDoc = libxmljs.parseXml(xml);
const xsdDoc = libxmljs.parseXml(fs.readFileSync('wsdl/SuministroLR.xsd'));
const valid = xmlDoc.validate(xsdDoc);
```

---

## 🧰 Scripts útiles

| Comando              | Descripción                                       |
|----------------------|---------------------------------------------------|
| `npm run patch-xsd`  | Corrige los `schemaLocation` en los `.xsd`        |
| `npm run codegen`    | Parches + genera cliente y tipos desde WSDL       |
| `npm test`           | Ejecuta las pruebas de validación XML             |

---

## 📥 Requisitos

- Node.js 18 o superior
- WSDL y XSD descargados desde la web de AEAT
- Archivo `xmldsig-core-schema.xsd` de [W3C](https://www.w3.org/TR/xmldsig-core/xmldsig-core-schema.xsd)

## Uso

```ts
import { getVerifactuClient } from 'verifactu-tools';

(async () => {
  // Puedes crear el cliente sin enviar nada, útil para generar XML
  const client = await getVerifactuClient();

  const input = {
    Cabecera: {
      IDVersionSii: '1.1',
      Titular: {
        NombreRazon: 'Empresa de Prueba S.L.',
        NIF: 'B12345678'
      }
    },
    RegistroAlta: [ ... ]
  };

  const xml = client.wsdl.objectToXML(
    { SuministroLR: input },
    'SuministroLR',
    'sf',
    'https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/sii/ws/SuministroFactEmitidas/v1.1/wsSuministroFactEmitidas.wsdl',
    true
  );

  console.log(xml);
})();

## Generar XML desde JSON

```ts
import { generarXMLDesdeJson } from 'verifactu-tools';

const input = {
  Cabecera: {
    IDVersionSii: '1.1',
    Titular: {
      NombreRazon: 'Empresa de Prueba S.L.',
      NIF: 'B12345678'
    }
  },
  RegistroAlta: [ ... ]
};

const xml = await generarXMLDesdeJson(input);
console.log(xml);
```

## 📜 Uso desde línea de comandos

Puedes ejecutar scripts incluidos en esta librería directamente desde terminal usando [`tsx`](https://github.com/esbuild-kit/tsx). Esto es últil para realizar pruebas manuales sin necesidad de montar código adicional o para recoger la última línea desde otro software.

> ⚠️ Requiere tener instalado `tsx` globalmente o usar `npx`.

Instalación recomendada:

```
npm install -g tsx
```

---

### 🔐 Requisitos

* Node.js >= 18
* Certificado digital en formato `.pfx`
* Clave (passphrase) del certificado

---

### 🧪 Calcular hash

```
verifactu-tools-hash <tipo> '<json>'
```

* `tipo`: `alta` o `anulacion`
* `json`: Objeto con los campos requeridos

Ejemplo:

```
verifactu-tools-hash anulacion '{"IDEmisorFacturaAnulada":"89890001K","NumSerieFacturaAnulada":"12345679/G34","FechaExpedicionFacturaAnulada":"01-01-2024","Huella":"F7B94CFD8924EDFF273501B01EE5153E4CE8F259766F88CF6ACB8935802A2B97","FechaHoraHusoGenRegistro":"2024-01-01T19:20:40+01:00"}'
```

---

### 📤 Registrar factura

```
verifactu-tools-registrar <cert.pfx> <passphrase> <endpoint> '<json>' [verbose]
```

Ejemplo:

```
verifactu-tools-registrar ./certs/cert.pfx 1234 https://prewww2.aeat.es/wlpl/TIKE-CONT/ws/SistemaFacturacion/VerifactuSOAP '{
  "Cabecera": {
    "ObligadoEmision": {
      "NombreRazon": "Empresa Test S.L.",
      "NIF": "89890001K"
    }
  },
  "RegistroFactura": [{
    "RegistroAlta": {
      "IDFactura": {
        "IDEmisorFactura": "89890001K",
        "NumSerieFactura": "12345678/G33",
        "FechaExpedicionFactura": "01-01-2024"
      },
      "TipoFactura": "F1",
      "DescripcionOperacion": "Servicio de prueba AEAT",
      "CuotaTotal": "12.35",
      "ImporteTotal": "123.45",
      "SistemaInformatico": {
        "NombreSistemaInformatico": "verifactu-tools",
        "Version": "1.0.8"
      },
      "FechaHoraHusoGenRegistro": "2024-01-01T19:20:30+01:00",
      "TipoHuella": "01"
    }
  }]
}' true
```

---

### 🔍 Consultar facturas

```
verifactu-tools-consultar <cert.pfx> <passphrase> <endpoint> [nif] [desde] [hasta] [verbose]
```

Ejemplo:

```
verifactu-tools-consultar ./certs/cert.pfx 1234 https://prewww2.aeat.es/wlpl/TIKE-CONT/ws/SistemaFacturacion/VerifactuSOAP B12345678 2025-07-01 2025-09-28 true
```


---

## 📄 Licencia

MIT
