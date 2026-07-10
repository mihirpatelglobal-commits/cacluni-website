const fs = require('fs');
const content = fs.readFileSync('update_layout.js', 'utf8');
const lines = content.split('\n');

const keywords = ['customContent', 'processCalculatorPage', 'generateCalculatorSEO'];
lines.forEach((l, idx) => {
  if (keywords.some(k => l.includes(k))) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
