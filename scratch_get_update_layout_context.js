const fs = require('fs');
const content = fs.readFileSync('update_layout.js', 'utf8');
const lines = content.split('\n');

const idxs = [];
lines.forEach((l, idx) => {
  if (l.includes('customContent')) {
    idxs.push(idx);
  }
});

idxs.forEach(idx => {
  console.log(`=== Matches at line ${idx + 1} ===`);
  for (let i = Math.max(0, idx - 5); i < Math.min(lines.length, idx + 45); i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
});
