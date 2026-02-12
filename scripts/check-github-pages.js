const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 فحص إعدادات GitHub Pages...\n');

const rootDir = path.join(__dirname, '..');

// فحص الملفات الأساسية
const files = ['index.html', '.nojekyll', '404.html'];
files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        const size = fs.statSync(filePath).size;
        console.log(`✅ ${file} - ${size} bytes`);
    } else {
        console.log(`❌ ${file} - غير موجود!`);
    }
});

// فحص البرانش
try {
    const branch = execSync('git branch --show-current', { cwd: rootDir }).toString().trim();
    console.log(`\n📌 البرانش الحالي: ${branch}`);
    
    const remote = execSync('git remote -v', { cwd: rootDir }).toString();
    console.log(`\n🔗 الريموت:\n${remote}`);
} catch (e) {
    console.log('❌ خطأ في Git');
}

// إنشاء ملف تجريبي
const testPath = path.join(rootDir, 'test.html');
fs.writeFileSync(testPath, `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body><h1>Test Page Works!</h1></body>
</html>`, 'utf8');
console.log('\n✅ تم إنشاء test.html');

console.log('\n📝 قم بتنفيذ:');
console.log('git add test.html');
console.log('git commit -m "Add test page"');
console.log('git push new-origin main');
console.log('\nثم جرب: https://ai-test-tech.github.io/e3lanat-ela3arab/test.html');
