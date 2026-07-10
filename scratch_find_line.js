const fs = require('fs');
const content = fs.readFileSync('seo_data.js', 'utf8');
const lines = content.split('\n');

function findAndPrint(key) {
  const idx = lines.findIndex(l => l.includes(key));
  if (idx !== -1) {
    console.log(`=== Key: ${key} found at line ${idx + 1} ===`);
    for (let i = Math.max(0, idx - 2); i < Math.min(lines.length, idx + 40); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  } else {
    console.log(`Key ${key} not found.`);
  }
}

findAndPrint("income-tax-calculator-canada");
findAndPrint("bmi-calculator");
