const fs = require('fs');
const content = fs.readFileSync('seo_data.js', 'utf8');
const lines = content.split('\n');

const idx = lines.findIndex(l => l.includes('getSEOContentHTML'));
if (idx !== -1) {
  console.log(`=== getSEOContentHTML found at line ${idx + 1} ===`);
  for (let i = Math.max(0, idx - 5); i < Math.min(lines.length, idx + 100); i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} else {
  console.log('getSEOContentHTML not found');
}
