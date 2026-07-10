const { execSync } = require('child_process');
const fs = require('fs');
try {
  const diff = execSync('git diff seo_data.js').toString();
  fs.writeFileSync('scratch_seo_diff.txt', diff, 'utf8');
  console.log('Seo diff written successfully');
} catch (err) {
  console.error('Error running git diff:', err.message);
}
