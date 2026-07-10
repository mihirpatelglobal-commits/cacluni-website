const fs = require('fs');
const content = fs.readFileSync('update_layout.js', 'utf8');
const lines = content.split('\n');
for (let i = 401; i < 600; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
