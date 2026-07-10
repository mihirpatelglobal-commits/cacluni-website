const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Get git diff of all HTML files, ignoring the query string changes like ?v=
  // We can search for lines starting with + or - that contain "About" or the boilerplate phrases.
  const diff = execSync('git diff -- "*.html"').toString();
  const lines = diff.split('\n');
  const changes = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if ((line.startsWith('+') || line.startsWith('-')) && !line.startsWith('+++') && !line.startsWith('---')) {
      const content = line.substring(1).trim();
      // Ignore version cache-buster changes and whitespace-only changes
      if (content.includes('style.css?v=')) continue;
      if (content === '') continue;
      
      // Let's see if there are any changes to "About the" or SEO text
      if (content.toLowerCase().includes('about the') || content.toLowerCase().includes('high-precision online utility')) {
        changes.push({
          type: line[0],
          content: content
        });
      }
    }
  }

  console.log(`Found ${changes.length} About-related content changes.`);
  changes.forEach(c => {
    console.log(`${c.type}: ${c.content}`);
  });

} catch (err) {
  console.error('Error running check:', err.message);
}
