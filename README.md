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

---

## 📄 Licencia

MIT
