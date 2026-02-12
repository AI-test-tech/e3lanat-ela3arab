const fs = require('fs');
const path = require('path');

console.log('🔍 مراجعة وإصلاح شاملة للموقع...\n');

const rootDir = path.join(__dirname, '..');
const domain = 'https://storesads.shop';

// 1. إصلاح robots.txt
console.log('📝 إصلاح robots.txt...');
const robotsTxt = `# Robots.txt for ArabSad Digital Marketing
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${domain}/sitemap.xml

# Disallow admin and scripts
Disallow: /scripts/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /react-app/

# Allow CSS and JS
Allow: /assets/css/
Allow: /assets/js/
Allow: /assets/images/
`;

fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('✅ robots.txt تم إصلاحه');

// 2. إنشاء sitemap.xml شامل
console.log('\n📝 إنشاء sitemap.xml...');

function getAllHtmlFiles(dir, baseDir = dir) {
    let files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', 'scripts', 'react-app', '.history-memo', '.idx'].includes(item)) {
                files = files.concat(getAllHtmlFiles(fullPath, baseDir));
            }
        } else if (item.endsWith('.html') && !['404.html', '500.html', 'shared-header.html', 'shared-footer.html'].includes(item)) {
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
            files.push(relativePath);
        }
    });
    
    return files;
}

const htmlFiles = getAllHtmlFiles(rootDir);
const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// الصفحة الرئيسية
sitemap += `  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

// باقي الصفحات
htmlFiles.forEach(file => {
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (file.includes('services/')) {
        priority = '0.9';
        changefreq = 'weekly';
    } else if (file.includes('blog/')) {
        priority = '0.7';
        changefreq = 'monthly';
    } else if (file.includes('cities/')) {
        priority = '0.8';
        changefreq = 'monthly';
    }
    
    const url = file === 'index.html' ? '/' : '/' + file.replace('.html', '');
    
    sitemap += `  <url>
    <loc>${domain}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

sitemap += '</urlset>';

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`✅ sitemap.xml تم إنشاؤه (${htmlFiles.length + 1} صفحة)`);

// 3. فحص وإصلاح ملفات HTML
console.log('\n🔍 فحص ملفات HTML...');

let fixedFiles = 0;
htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // إصلاح الروابط المكسورة
    if (content.includes('href="/') && !content.includes('href="http')) {
        content = content.replace(/href="\//g, 'href="');
        modified = true;
    }
    
    if (content.includes('src="/') && !content.includes('src="http')) {
        content = content.replace(/src="\//g, 'src="');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedFiles++;
    }
});

console.log(`✅ تم إصلاح ${fixedFiles} ملف HTML`);

// 4. التحقق من الملفات الأساسية
console.log('\n🔍 التحقق من الملفات الأساسية...');

const essentialFiles = [
    'index.html',
    'favicon.ico',
    'manifest.json',
    'sw.js',
    '.nojekyll',
    'CNAME'
];

essentialFiles.forEach(file => {
    const exists = fs.existsSync(path.join(rootDir, file));
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('\n✅ المراجعة والإصلاح اكتملت!');
console.log('\n📋 الخطوات التالية:');
console.log('1. git add .');
console.log('2. git commit -m "Fix sitemap, robots, and HTML files"');
console.log('3. git push new-origin main');
