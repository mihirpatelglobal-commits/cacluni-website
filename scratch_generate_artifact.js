const fs = require('fs');
const path = require('path');
const updateLayout = fs.readFileSync('update_layout.js', 'utf8');

// Parse categories from update_layout.js
const startIdx = updateLayout.indexOf('const categories = {');
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx + 'const categories ='.length; i < updateLayout.length; i++) {
  if (updateLayout[i] === '{') braceCount++;
  if (updateLayout[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
const categoriesStr = 'var categories = ' + updateLayout.slice(startIdx + 'const categories ='.length, endIdx);
eval(categoriesStr);

const seoData = require('./seo_data.js');

let md = `# CalcUni Calculator Content Registry\n\n`;
md += `This artifact documents the verified regulatory-aligned "About" content (formulas, step-by-step worked examples, and key FAQs) for all **63 active calculators** on CalcUni, grouped by their respective categories.\n\n`;

let totalCount = 0;

for (const [catKey, cat] of Object.entries(categories)) {
  const catTitle = cat.title || cat.name;
  md += `## 📂 ${catTitle}\n\n`;
  
  cat.calculators.forEach(calc => {
    totalCount++;
    const slug = calc.slug;
    const content = seoData.customContent[slug];
    
    md += `### ${totalCount}. 🧮 ${calc.name} (\`${slug}\`)\n\n`;
    
    if (content) {
      md += `#### Formula\n`;
      md += `\`\`\`\n${content.formula}\n\`\`\`\n\n`;
      
      md += `#### Formula Explanation\n`;
      md += `${content.formulaExplanation}\n\n`;
      
      md += `#### Worked Example\n`;
      md += `\`\`\`\n${content.example}\n\`\`\`\n\n`;
      
      if (content.faqs && content.faqs.length > 0) {
        md += `#### Frequently Asked Questions (FAQs)\n`;
        content.faqs.forEach((faq, index) => {
          md += `**Q${index + 1}: ${faq.q}**\n`;
          md += `> ${faq.a.replace(/<[^>]*>/g, '')}\n\n`; // Strip simple HTML tags for clean MD
        });
      }
    } else {
      md += `*No custom content found. Using category fallback template.*\n\n`;
    }
    
    md += `---\n\n`;
  });
}

fs.writeFileSync('calcuni_about_content_registry.md', md, 'utf8');
console.log(`Successfully generated registry at calcuni_about_content_registry.md`);
