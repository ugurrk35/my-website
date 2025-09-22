const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const OUTPUT_DIR = path.join(__dirname, '../wordpress');

// Çıktı dizinini oluştur
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Turndown servisini yapılandır
const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
    headingStyle: 'atx',
    bulletListMarker: '-',
    strongDelimiter: '**'
});

// HTML'yi temizleme ve ön işleme
function preprocessHtml(html) {
    return html
        // HTML entities'leri düzelt
        .replace(/&#8217;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#8211;/g, '-')
        .replace(/&#8212;/g, '--')
        
        // Gereksiz boş linkları temizle
        .replace(/<a[^>]*href="[^"]*"[^>]*>\s*<\/a>/g, '')
        
        // BR taglerini paragraf sonlarında düzelt
        .replace(/<br\s*\/?>\s*(?=<\/p>)/gi, '')
        
        // Ardışık BR taglerini paragraf olarak değerlendir
        .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '</p><p>')
        
        // Strong taglerini kontrollü olarak başlık yap - sadece tek satırlık olanlar
        .replace(/<p>\s*<strong>([^<]{1,80})<\/strong>\s*<\/p>/gi, '<h2>$1</h2>')
        
        // Tablo sonrasındaki gereksiz paragrafları temizle
        .replace(/(<\/table>)\s*<p>\s*<\/p>/gi, '$1')
        
        // Kod bloklarındaki fazla boşlukları temizle
        .replace(/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/gi, function(match, start, content, end) {
            const cleanContent = content.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
            return start + cleanContent + end;
        });
}

// Tablo dönüştürme kuralı - geliştirilmiş
turndownService.addRule('tables', {
    filter: ['table'],
    replacement: function (content, node) {
        const rows = Array.from(node.querySelectorAll('tr'));
        if (rows.length === 0) return '';

        const tableRows = rows.map(tr => {
            const cells = Array.from(tr.querySelectorAll('th, td'));
            return cells.map(cell => {
                return cell.textContent?.trim().replace(/\n/g, ' ') || '';
            });
        });

        if (tableRows.length === 0) return '';

        const header = tableRows[0];
        const body = tableRows.slice(1);
        
        // Tablo başlığı ve ayırıcı
        const headerRow = `| ${header.join(' | ')} |`;
        const separatorRow = `|${header.map(() => '------').join('|')}|`;
        
        // Tablo gövdesi
        const bodyRows = body.map(row => `| ${row.join(' | ')} |`);
        
        return [headerRow, separatorRow, ...bodyRows].join('\n') + '\n';
    }
});

// EnlighterJS kod bloklarını dönüştürme
turndownService.addRule('enlighterCode', {
    filter: function (node) {
        return node.nodeName === 'PRE' && 
               (node.classList.contains('EnlighterJSRAW') || 
                node.getAttribute('data-enlighter-language'));
    },
    replacement: function (content, node) {
        let language = node.getAttribute('data-enlighter-language') || '';
        
        // Generic dili boş bırak
        if (language === 'generic') {
            language = '';
        }
        
        // İçeriği temizle ve düzelt
        const code = content
            .trim()
            .replace(/\s+/g, ' ')  // Fazla boşlukları tek boşluk yap
            .replace(/\s*{\s*/g, '{\n\t')  // JSON formatını düzelt
            .replace(/\s*}\s*/g, '\n}')
            .replace(/,\s*/g, ',\n\t')
            .replace(/\[\s*/g, '[\n\t\t')
            .replace(/\s*\]/g, '\n\t]');
            
        return `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
    }
});

// Paragraf içeriğini temizleme
turndownService.addRule('cleanParagraphs', {
    filter: 'p',
    replacement: function (content, node) {
        const text = content.trim();
        if (!text) return '';
        
        // Eğer sadece strong tag varsa başlık olarak döndür
        if (text.match(/^\*\*[^*]+\*\*$/) && text.length < 100) {
            return `\n## ${text.replace(/^\*\*(.*)\*\*$/, '$1')}\n`;
        }
        
        return text + '\n\n';
    }
});

// Post işleme - Markdown'ı temizle
function postprocessMarkdown(markdown) {
    return markdown
        // Fazla boş satırları temizle
        .replace(/\n{3,}/g, '\n\n')
        
        // Başlık öncesi boşlukları düzelt
        .replace(/\n+##\s/g, '\n\n## ')
        
        // Liste öncesi boşlukları düzelt  
        .replace(/\n+-\s/g, '\n- ')
        
        // Tablo sonrası boşlukları düzelt
        .replace(/\|\n{3,}/g, '|\n\n')
        
        // Kod bloğu sonrası boşlukları düzelt
        .replace(/```\n{3,}/g, '```\n\n')
        
        // Noktalama sonrası paragraf ayrımları
        .replace(/([.!?])\s*\n\n([A-ZÜÖĞŞÇI])/g, '$1\n\n$2')
        
        // Yanlış başlık seviyelerini düzelt
        .replace(/\n### /g, '\n## ')
        .replace(/\n#### /g, '\n## ')
        
        // Tekrarlanan metinleri temizle
        .replace(/Bu alan 3 tip değer alabilir, bunlar;Bu alan 3 tip değer alabilir:/g, 'Bu alan 3 tip değer alabilir:')
        
        // JSON formatını düzelt
        .replace(/```json\s*{\s*/g, '```json\n{')
        .replace(/```json([^`]+)```/g, function(match, content) {
            try {
                // JSON'u parse edip güzel format
                const jsonObj = JSON.parse(content.trim());
                const formatted = JSON.stringify(jsonObj, null, '\t');
                return '```json\n' + formatted + '\n```';
            } catch (e) {
                // Parse edilemezse olduğu gibi bırak ama düzelt
                const cleaned = content
                    .replace(/^\s+|\s+$/g, '')
                    .replace(/\\?\[/g, '[')
                    .replace(/\\?\]/g, ']');
                return '```json\n' + cleaned + '\n```';
            }
        })
        
        // Son temizlik
        .trim();
}

// Ana dönüştürme fonksiyonu
function convertWordPressJsonToMarkdown(jsonData) {
    const post = jsonData;
    
    // İçeriği al ve ön işleme yap
    let htmlContent = post.content.rendered;
    htmlContent = preprocessHtml(htmlContent);
    
    // HTML'yi Markdown'a dönüştür
    let markdownContent = turndownService.turndown(htmlContent);
    
    // Post işleme yap
    markdownContent = postprocessMarkdown(markdownContent);
    
    // Başlığı temizle
    const title = post.title.rendered
        .replace(/&#8217;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
    
    // Son markdown içeriğini oluştur
    const finalContent = `# ${title}\n\n${markdownContent}`;
    
    return finalContent;
}

// WordPress API'den veri çekme
async function fetchWordPressPosts() {
    const CATEGORY_ID = 3; 
    const WORDPRESS_API = `http://docs.onerov.com/wp-json/wp/v2/posts?categories=${CATEGORY_ID}`;

    try {
        const response = await fetch(WORDPRESS_API);
        const posts = await response.json();

        if (!Array.isArray(posts)) {
            throw new Error('WordPress API beklenen formatta değil!');
        }

        console.log(`📥 ${posts.length} post bulundu, dönüştürme başlıyor...`);

        posts.forEach(post => {
            try {
                const markdownContent = convertWordPressJsonToMarkdown(post);
                const fileName = `${post.slug}.md`;
                const filePath = path.join(OUTPUT_DIR, fileName);
                
                fs.writeFileSync(filePath, markdownContent, 'utf8');
                console.log(`✅ Oluşturuldu: ${fileName}`);
            } catch (error) {
                console.error(`❌ ${post.slug} dönüştürülürken hata:`, error.message);
            }
        });

        console.log(`🎉 Tüm dosyalar ${OUTPUT_DIR} dizinine kaydedildi.`);

    } catch (error) {
        console.error('❌ WordPress API hatası:', error.message);
        
        if (error.message.includes('fetch is not defined')) {
            console.log('💡 Node.js sürümünüz fetch desteklemiyor. node-fetch yükleyin:');
            console.log('   npm install node-fetch');
        }
    }
}

// Dosya okuma ve dönüştürme
function convertJsonFile(inputFilePath) {
    try {
        const jsonContent = fs.readFileSync(inputFilePath, 'utf8');
        const jsonData = JSON.parse(jsonContent);
        
        const markdownContent = convertWordPressJsonToMarkdown(jsonData);
        
        const baseName = path.basename(inputFilePath, '.json');
        const outputPath = path.join(OUTPUT_DIR, `${baseName}.md`);
        
        fs.writeFileSync(outputPath, markdownContent, 'utf8');
        
        console.log(`✅ Başarıyla dönüştürüldü: ${outputPath}`);
        return outputPath;
        
    } catch (error) {
        console.error('❌ Dönüştürme hatası:', error.message);
        return null;
    }
}

// Export functions
module.exports = {
    convertJsonFile,
    convertWordPressJsonToMarkdown,
    fetchWordPressPosts
};

// Eğer script doğrudan çalıştırılırsa
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // WordPress'ten çek
        fetchWordPressPosts();
    } else {
        // JSON dosyasını dönüştür
        const inputFile = args[0];
        
        if (!fs.existsSync(inputFile)) {
            console.error(`❌ Dosya bulunamadı: ${inputFile}`);
            process.exit(1);
        }
        
        convertJsonFile(inputFile);
    }
}