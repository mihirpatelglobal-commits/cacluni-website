const fs = require('fs');
const path = require('path');

const updateLayoutContent = fs.readFileSync('update_layout.js', 'utf8');

const startIdx = updateLayoutContent.indexOf('const categories = {');
if (startIdx === -1) {
  console.error("Could not find categories in update_layout.js");
  process.exit(1);
}

// Find matching ending brace by scanning braces
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx + 'const categories ='.length; i < updateLayoutContent.length; i++) {
  if (updateLayoutContent[i] === '{') braceCount++;
  if (updateLayoutContent[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}

if (endIdx === -1) {
  console.error("Could not find matching end of categories object");
  process.exit(1);
}

const categoriesStr = 'var categories = ' + updateLayoutContent.slice(startIdx + 'const categories ='.length, endIdx);

eval(categoriesStr);

const urls = [];
const info = [];
for (const [catKey, cat] of Object.entries(categories)) {
  for (const calc of cat.calculators) {
    const url = `https://calcuni.com/${catKey}/${calc.slug}/`;
    urls.push(url);
    info.push({ category: cat.name, name: calc.name, url });
  }
}

fs.writeFileSync('urls.txt', urls.join('\n'), 'utf8');
fs.writeFileSync('info.json', JSON.stringify(info, null, 2), 'utf8');
console.log(`Successfully generated ${urls.length} URLs.`);
