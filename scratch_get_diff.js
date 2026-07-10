const { execSync } = require('child_process');
const fs = require('fs');
try {
  const diff = execSync('git diff statutory_inventory.json finance-calculators/mortgage-calculator/index.html finance-calculators/cmhc-insurance-calculator/index.html').toString();
  fs.writeFileSync('scratch_diff.txt', diff, 'utf8');
  console.log('Diff written successfully');
} catch (err) {
  console.error('Error running git diff:', err.message);
}
