const { execSync } = require('child_process');
const fs = require('fs');
try {
  const diff = execSync('git diff finance-calculators/mortgage-calculator/index.html').toString();
  fs.writeFileSync('scratch_mortgage_diff.txt', diff, 'utf8');
  console.log('Mortgage diff written successfully');
} catch (err) {
  console.error('Error running git diff:', err.message);
}
