import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

const CATEGORY_ID = 3; 
const WORDPRESS_API = `http://docs.onerov.com/wp-json/wp/v2/posts?categories=${CATEGORY_ID}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../wordpress');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const turndownService = new TurndownService({ codeBlockStyle: 'fenced' });

turndownService.addRule('tables', {
  filter: ['table'],
  replacement: function (content, node) {
    const rows = Array.from(node.querySelectorAll('tr')).map(tr =>
      Array.from(tr.querySelectorAll('th,td')).map(cell =>
        cell.textContent?.trim() || ''
      )
    );

    if (rows.length === 0) return '';

    const header = rows[0];
    const body = rows.slice(1);
    const separator = header.map(() => '---');

    return [
      `| ${header.join(' | ')} |`,
      `| ${separator.join(' | ')} |`,
      ...body.map(r => `| ${r.join(' | ')} |`)
    ].join('\n');
  }
});

function enlighterCode(content) {
  return content.replace(/<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>/gs, (match, lang, code) => {
    const cleanCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return `\`\`\`${lang}\n${cleanCode}\n\`\`\``;
  });
}

// HTML karakterlerini MDX ile uyumlu hâle getirmek
function sanitizeMDX(content) {
  return content
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

async function fetchPosts() {
  try {
    const res = await fetch(WORDPRESS_API);
    const posts = await res.json();

    if (!Array.isArray(posts)) throw new Error('WordPress API beklenen formatta değil!');

    posts.forEach(post => {
      let mdContent = post.content.rendered;

      // Kod bloklarını EnlighterJS formatına çevir
      mdContent = enlighterCode(mdContent);

      // HTML -> Markdown (tablo ve diğer yapılar)
      mdContent = turndownService.turndown(mdContent);

      // MDX uyumlu hâle getir
      mdContent = sanitizeMDX(mdContent);

      const content = `---
title: "${post.title.rendered.replace(/"/g, '\\"')}"
---

${mdContent}
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
