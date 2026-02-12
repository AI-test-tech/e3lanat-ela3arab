const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح مشكلة 404 في GitHub Pages...\n');

const rootDir = path.join(__dirname, '..');

// 1. التأكد من وجود .nojekyll
const nojekyllPath = path.join(rootDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '', 'utf8');
    console.log('✅ تم إنشاء .nojekyll');
} else {
    console.log('✅ .nojekyll موجود');
}

// 2. التأكد من index.html في الـ root
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
    console.log('✅ index.html موجود في الـ root');
} else {
    console.log('❌ index.html غير موجود!');
    process.exit(1);
}

// 3. إصلاح 404.html
const html404Path = path.join(rootDir, '404.html');
const html404Content = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - الصفحة غير موجودة | مؤسسة إعلانات العرب</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Cairo', sans-serif;
            background: linear-gradient(135deg, #0f142e 0%, #1a1f3a 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
        }
        h1 {
            font-size: 8rem;
            color: #FFB800;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(255, 184, 0, 0.3);
        }
        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.8;
        }
        .btn {
            display: inline-block;
            background: #FFB800;
            color: #000;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 184, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <h2>عذراً، الصفحة غير موجودة</h2>
        <p>الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
        <a href="/" class="btn">العودة للصفحة الرئيسية</a>
    </div>
    <script>
        setTimeout(function() {
            window.location.href = '/';
        }, 5000);
    </script>
</body>
</html>`;

fs.writeFileSync(html404Path, html404Content, 'utf8');
console.log('✅ تم إصلاح 404.html');

console.log('\n✅ تم إصلاح جميع مشاكل GitHub Pages!');
console.log('\n📝 الخطوات التالية:');
console.log('1. git add .');
console.log('2. git commit -m "Fix GitHub Pages 404"');
console.log('3. git push new-origin main');
console.log('4. انتظر 2-3 دقائق');
console.log('5. زر الموقع على: https://ai-test-tech.github.io/e3lanat-ela3arab/');
