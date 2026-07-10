const fs = require('fs');
const content = fs.readFileSync('seo_data.js', 'utf8');

const startIdx = content.indexOf('function getSEOContentHTML');
if (startIdx !== -1) {
  console.log(content.substring(startIdx, startIdx + 1500));
} else {
  // Let's search case-insensitively or differently
  const secondTry = content.indexOf('getSEOContentHTML');
  if (secondTry !== -1) {
    console.log(content.substring(secondTry - 50, secondTry + 1500));
  } else {
    console.log("getSEOContentHTML not found");
  }
}
