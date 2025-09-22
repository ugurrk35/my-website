import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORDPRESS_API = 'http://docs.onerov.com/wp-json/wp/v2/posts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../wordpress');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// HTML karakterlerini MDX ile uyumlu hâle getir
function sanitizeMDX(content) {
  return content
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

async function fetchPosts() {
  try {
    const res = await fetch(WORDPRESS_API);
    const posts = await res.json();

    if (!Array.isArray(posts)) throw new Error('WordPress API beklenen formatta değil!');

    posts.forEach((post) => {
      const content = `---
title: "${post.title.rendered.replace(/"/g, '\\"')}"
---

${sanitizeMDX(post.content.rendered)}
`;

      const filePath = path.join(OUTPUT_DIR, `${post.slug}.md`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Oluşturuldu: ${filePath}`);
    });
  } catch (err) {
    console.error('Hata:', err);
  }
}

fetchPosts();
