import fs from 'fs';
import path from 'path';

// 📂 Carpeta donde están los XSD originales
const xsdDir = './wsdl';

const files = fs.readdirSync(xsdDir).filter(f => f.endsWith('.xsd'));

for (const file of files) {
  const filePath = path.join(xsdDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 🔄 Reemplaza schemaLocation con el nombre base del archivo
  content = content.replace(/schemaLocation=".*?([a-zA-Z0-9_-]+\.xsd)"/g, 'schemaLocation="$1"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Patched: ${file}`);
}
