import fs from 'fs';
import path from 'path';

const INPUT_DIR = 'C:/Users/uk/Desktop/DOC/my-website/docs/wordpress';

// MDX ve JSON uyumlu hâle getirme
function sanitizeMDX(content) {
  // &nbsp; → boşluk
  content = content.replace(/&nbsp;/g, ' ');

  // Tırnak ve özel karakter düzeltmeleri
  content = content.replace(/[\u2018\u2019]/g, "'")
                   .replace(/[\u201C\u201D]/g, '"');

  // JSON için HTML encode edilmiş karakterleri düzelt
  content = content.replace(/&#123;/g, '{')
                   .replace(/&#125;/g, '}')
                   .replace(/&#91;/g, '[')
                   .replace(/&#93;/g, ']');

  // Normal HTML encode karakterlerini düzelt
  content = content.replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&amp;/g, '&')
                   .replace(/&quot;/g, '"');

  return content;
}

// Klasördeki tüm .md dosyalarını işleme
function processMDFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processMDFiles(fullPath); // alt klasörleri de işle
    } else if (file.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const sanitized = sanitizeMDX(content);
      fs.writeFileSync(fullPath, sanitized, 'utf8');
      console.log(`✅ Düzeltilen dosya: ${file}`);
    }
  });
}

processMDFiles(INPUT_DIR);
