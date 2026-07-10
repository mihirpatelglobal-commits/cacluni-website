const { execSync } = require('child_process');
const fs = require('fs');

function writeDiff(filePath, outName) {
  try {
    const diff = execSync(`git diff "${filePath}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    fs.writeFileSync(outName, diff, 'utf8');
    console.log(`Wrote diff for ${filePath} to ${outName}`);
  } catch (e) {
    console.error(`Error diffing ${filePath}:`, e.message);
  }
}

writeDiff('finance-calculators/mortgage-calculator/index.html', 'scratch_mortgage_diff.txt');
writeDiff('tax-calculators/income-tax-calculator-canada/index.html', 'scratch_tax_diff.txt');
writeDiff('health-calculators/bmi-calculator/index.html', 'scratch_bmi_diff.txt');
writeDiff('seo_data.js', 'scratch_seo_diff.txt');
writeDiff('math-calculators/percentage-calculator/index.html', 'scratch_percentage_diff.txt');
