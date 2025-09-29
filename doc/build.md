# 📅 Build y Publicación de verifactu-tools

Este documento resume el flujo de trabajo para compilar, testear y publicar la librería `verifactu-tools`, incluyendo scripts CLI y código fuente.

---

## ♻️ Estructura del proyecto

```
verifactu-tools/
├── src/                 # Código fuente de la librería
├── scripts/             # Scripts CLI (ejecutables por npx)
├── test/                # Tests unitarios (Jest)
├── dist/                # Salida de compilación
├── package.json
├── tsconfig.json
├── tsup.config.ts
```

---

## ⚒️ Scripts disponibles

### ὒ7 Compilar la librería principal (src/)

Usa `tsup` para generar `dist/index.js` desde `src/index.ts`:

```bash
npm run build
```

---

### Ὄb Compilar los scripts CLI (scripts/)

Usa `tsc` para compilar cada script de la carpeta `scripts/` a `dist/scripts/*.js`:

```bash
npm run build-scripts
```

---

### ᾞa Ejecutar tests unitarios

Ejecuta todos los tests de Jest ubicados en `test/`:

```bash
npm test
```

---

### 📦 Publicar la librería

1. Compilar todo:

```bash
npm run build && npm run build-scripts
```

2. Publicar en npm:

```bash
npm publish
```

> ✅ Se publicarán los archivos en `dist/`, incluyendo los scripts definidos en `"bin"` en `package.json`.

---

## ⚖️ tsconfig.json

Asegúrate de tener lo siguiente para evitar errores como `TS2209`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": "./",
    "declaration": true,
    "emitDeclarationOnly": false,
    "declarationMap": false,
    "outDir": "dist",
    "rootDir": "." // ✅ necesario para compilar scripts/test sin error
  },
  "include": ["src", "scripts", "test"],
  "exclude": ["dist", "node_modules"]
}
```

---

## 🔧 Uso de binarios

Tras compilar, puedes ejecutar los scripts vía `npx`:

```bash
npx verifactu-hash anulacion '{...}'
```

Los binarios definidos actualmente son:

```json
"bin": {
  "verifactu-hash": "./dist/scripts/calcular-hash.js",
  "verifactu-consultar-facturas": "./dist/scripts/consultar-facturas.js",
  "verifactu-registrar-facturas": "./dist/scripts/registrar-facturas.js",
  "verifactu-registrar-facturas-xml": "./dist/scripts/registrar-facturas-xml.js"
}
```

---

## 📂 Buenas prácticas

* Todos los scripts CLI deben estar en `scripts/*.ts` y ser compilables con `tsc`
* Los tests deben permanecer en `test/`, y usar solo APIs exportadas por la librería
* No incluir `node_modules` ni `dist/` en git
* Usar solo rutas relativas o imports desde `src/` para garantizar compatibilidad

---

✉️ Para dudas o mejoras, revisar el README.md principal o contactar con el mantenedor.
