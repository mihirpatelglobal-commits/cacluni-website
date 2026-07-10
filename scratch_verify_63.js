const fs = require('fs');
const path = require('path');
const updateLayout = fs.readFileSync('update_layout.js', 'utf8');

const startIdx = updateLayout.indexOf('const categories = {');
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx + 'const categories ='.length; i < updateLayout.length; i++) {
  if (updateLayout[i] === '{') braceCount++;
  if (updateLayout[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
const categoriesStr = 'var categories = ' + updateLayout.slice(startIdx + 'const categories ='.length, endIdx);
eval(categoriesStr);

const seoData = require('./seo_data.js');

let totalCalcs = 0;
let hasCustomContent = 0;
let noCustomContent = [];

for (const [catKey, cat] of Object.entries(categories)) {
  for (const calc of cat.calculators) {
    totalCalcs++;
    if (seoData.customContent[calc.slug]) {
      hasCustomContent++;
    } else {
      noCustomContent.push(`${catKey}/${calc.slug}`);
    }
  }
}

console.log(`Total calculators in categories: ${totalCalcs}`);
console.log(`Calculators with custom content in seo_data.js: ${hasCustomContent}`);
console.log(`Calculators without custom content (using fallback templates): ${noCustomContent.length}`);
if (noCustomContent.length > 0) {
  console.log(`List without custom content:\n- ${noCustomContent.join('\n- ')}`);
}
