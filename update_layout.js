const fs = require('fs');
const path = require('path');
const seoData = require('./seo_data.js');

const ASSET_VERSION = Date.now();

// Configuration of categories and calculators
const categories = {
  'finance-calculators': {
    name: 'Finance',
    title: 'Finance Calculators',
    desc: 'Calculate loans, mortgage payments, interest, and investment growth.',
    calculators: [
      { slug: 'mortgage-calculator', name: 'Mortgage Calculator', desc: 'Estimate home loan payments and total interest.', icon: '🏠' },
      { slug: 'loan-calculator', name: 'Loan Calculator', desc: 'Calculate personal, auto, or business loan payments.', icon: '💵' },
      { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', desc: 'Estimate investment growth with compound interest.', icon: '📈' },
      { slug: 'car-loan-calculator', name: 'Car Loan Calculator', desc: 'Calculate auto loan payments, interest, and terms.', icon: '🚗' },
      { slug: 'amortization-calculator', name: 'Amortization Calculator', desc: 'View monthly amortization schedules and principal/interest splits.', icon: '📊' },
      { slug: 'credit-card-calculator', name: 'Credit Card Calculator', desc: 'Find out how long it will take to pay off credit card debt.', icon: '💳' },
      { slug: 'retirement-calculator', name: 'Retirement Calculator', desc: 'Plan how much you need to save to retire comfortably.', icon: '🌴' },
      { slug: 'cmhc-insurance-calculator', name: 'CMHC Insurance Calculator', desc: 'Calculate Canadian mortgage default insurance (CMHC) fees.', icon: '🛡️' },
      { slug: 'mortgage-stress-test-calculator', name: 'Mortgage Stress Test Calculator', desc: 'Find out if you qualify for a Canadian mortgage under the stress test rules.', icon: '📋' }
    ]
  },
  'tax-calculators': {
    name: 'Tax',
    title: 'Tax Calculators',
    desc: 'Estimate Canadian sales tax and income tax using simple calculators.',
    calculators: [
      { slug: 'gst-hst-calculator-canada', name: 'GST/HST Calculator Canada', desc: 'Calculate GST, HST, PST, and QST by province.', icon: '🍁' },
      { slug: 'income-tax-calculator-canada', name: 'Income Tax Calculator Canada', desc: 'Estimate federal and provincial income tax.', icon: '💼' },
      { slug: 'pst-calculator', name: 'PST Calculator', desc: 'Calculate Provincial Sales Tax (PST, RST, or QST) for Canadian provinces.', icon: '💵' },
      { slug: 'vat-calculator', name: 'VAT Calculator', desc: 'Calculate Value Added Tax (VAT) with global rates or custom percentages.', icon: '🌍' },
      { slug: 'payroll-tax-calculator', name: 'Payroll Tax Calculator', desc: 'Estimate gross pay, taxes, CPP/QPP, EI, and take-home net pay.', icon: '💰' }
    ]
  },
  'business-calculators': {
    name: 'Business',
    title: 'Business Calculators',
    desc: 'Calculate profit margins, markups, break-even targets, payrolls, ROI, and commissions.',
    calculators: [
      { slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', desc: 'Calculate profit, gross margin percentage, and markup percentage from revenue and cost.', icon: '📊' },
      { slug: 'markup-calculator', name: 'Markup Calculator', desc: 'Calculate the selling price, revenue profit, and margin from cost and markup percentage.', icon: '🏷️' },
      { slug: 'break-even-calculator', name: 'Break-even Calculator', desc: 'Find the sales volume (units) and revenue required to cover all fixed and variable costs.', icon: '📉' },
      { slug: 'payroll-calculator', name: 'Payroll Calculator', desc: 'Calculate gross wages, tax deductions, and net take-home pay based on hourly rate, hours worked, and overtime.', icon: '💵' },
      { slug: 'roi-calculator', name: 'ROI Calculator', desc: 'Calculate the Return on Investment (ROI) and annualized ROI for any commercial asset or trade.', icon: '📈' },
      { slug: 'commission-calculator', name: 'Commission Calculator', desc: 'Calculate sales agent commission payouts and total earnings based on contract values and structures.', icon: '💰' }
    ]
  },
  'health-calculators': {
    name: 'Health',
    title: 'Health Calculators',
    desc: 'Simple health and fitness calculators for daily use.',
    calculators: [
      { slug: 'bmi-calculator', name: 'BMI Calculator', desc: 'Calculate body mass index and BMI category.', icon: '⚖️' },
      { slug: 'calorie-calculator', name: 'Calorie Calculator', desc: 'Estimate daily maintenance calories using BMR.', icon: '🔥' },
      { slug: 'bmr-calculator', name: 'BMR Calculator', desc: 'Calculate Basal Metabolic Rate using standard formulas.', icon: '🏃' },
      { slug: 'body-fat-calculator', name: 'Body Fat Calculator', desc: 'Estimate body fat percentage using neck, waist, and hip measures.', icon: '📏' },
      { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', desc: 'Find your healthy target weight range.', icon: '🎯' },
      { slug: 'tdee-calculator', name: 'TDEE Calculator', desc: 'Estimate your Total Daily Energy Expenditure based on your activity level.', icon: '⚡' },
      { slug: 'macronutrient-calculator', name: 'Macronutrient Calculator', desc: 'Calculate your optimal daily protein, carb, and fat macros.', icon: '🥗' }
    ]
  },
  'construction-calculators': {
    name: 'Construction',
    title: 'Construction Calculators',
    desc: 'Estimate materials, area, tiles, roofing, and concrete volumes.',
    calculators: [
      { slug: 'concrete-calculator', name: 'Concrete Calculator', desc: 'Estimate concrete volume in cubic yards or bags needed for slabs, footings, and columns.', icon: '🧱' },
      { slug: 'square-footage-calculator', name: 'Square Footage Calculator', desc: 'Calculate total square footage for rectangular, circular, or triangular spaces.', icon: '📐' },
      { slug: 'paint-calculator', name: 'Paint Calculator', desc: 'Estimate the gallons of paint needed based on wall surface dimensions.', icon: '🎨' },
      { slug: 'tile-calculator', name: 'Tile Calculator', desc: 'Calculate number of tiles and grout bags required with wastage margin.', icon: '🔳' },
      { slug: 'roofing-calculator', name: 'Roofing Calculator', desc: 'Estimate roof area, number of shingle squares, and bundles needed.', icon: '🔺' }
    ]
  },
  'transportation-calculators': {
    name: 'Transportation',
    title: 'Transportation Calculators',
    desc: 'Estimate fuel costs, fuel efficiency, gas mileage, EV charging rates, and travel durations.',
    calculators: [
      { slug: 'fuel-cost-calculator', name: 'Fuel Cost Calculator', desc: 'Estimate the cost and quantity of fuel required for a driving trip.', icon: '⛽' },
      { slug: 'mileage-calculator', name: 'Mileage Calculator', desc: 'Calculate fuel consumption or gas mileage based on odometer readings and fuel added.', icon: '🏁' },
      { slug: 'mpg-calculator', name: 'MPG Calculator', desc: 'Convert distance and gas quantity to Miles Per Gallon (MPG) and fuel economy indicators.', icon: '🚗' },
      { slug: 'ev-charging-cost-calculator', name: 'EV Charging Cost Calculator', desc: 'Estimate the cost of charging an electric vehicle based on battery capacity, utility rates, and charging amounts.', icon: '🔌' },
      { slug: 'travel-time-calculator', name: 'Travel Time Calculator', desc: 'Calculate estimated driving duration and arrival hours based on travel distance and average speeds.', icon: '⏱️' }
    ]
  },
  'technology-calculators': {
    name: 'Technology',
    title: 'Technology Calculators',
    desc: 'Network planning tools, binary conversions, subnet masking, data bandwidth calculations, and storage unit converters.',
    calculators: [
      { slug: 'binary-calculator', name: 'Binary Calculator', desc: 'Perform basic logic or mathematical operations directly in Binary representation.', icon: '💻' },
      { slug: 'subnet-calculator', name: 'Subnet Calculator', desc: 'Calculate subnets, hosts ranges, CIDR masks, and network configurations.', icon: '🌐' },
      { slug: 'ip-calculator', name: 'IP Calculator', desc: 'Check internet protocol classes, addresses integer formats, and scope classifications.', icon: '📡' },
      { slug: 'bandwidth-calculator', name: 'Bandwidth Calculator', desc: 'Estimate internet download and upload transfer durations based on standard digital quantities.', icon: '⚡' },
      { slug: 'storage-converter', name: 'Storage Converter', desc: 'Convert data units between common decimal scales (KB, MB, GB, TB) and OS binary sizes (KiB, MiB, GiB, TiB).', icon: '💾' }
    ]
  },
  'math-calculators': {
    name: 'Math',
    title: 'Math Calculators',
    desc: 'Percentage, fraction, scientific, average, GPA, and grade calculators.',
    calculators: [
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Quickly find percentages, increases, and decreases.', icon: '🔢' },
      { slug: 'fraction-calculator', name: 'Fraction Calculator', desc: 'Add, subtract, multiply, and divide fractions.', icon: '➗' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Perform advanced math functions with an online calculator.', icon: '🔬' },
      { slug: 'average-calculator', name: 'Average Calculator', desc: 'Calculate mean, median, mode, sum, and range.', icon: '📉' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', desc: 'Calculate weighted GPA from course grades and credit hours.', icon: '🎓' },
      { slug: 'grade-calculator', name: 'Grade Calculator', desc: 'Estimate final course grades and required final exam scores.', icon: '📝' }
    ]
  },
  'conversion-calculators': {
    name: 'Conversion',
    title: 'Conversion Calculators',
    desc: 'Convert speed, area, volume, currency, length, weight, and temperature.',
    calculators: [
      { slug: 'unit-converter', name: 'Unit Converter', desc: 'Convert speed, area, volume, and other common units.', icon: '⚙️' },
      { slug: 'currency-converter', name: 'Currency Converter', desc: 'Convert between global currencies with real-time reference rates.', icon: '💱' },
      { slug: 'length-converter', name: 'Length Converter', desc: 'Convert metric and imperial length and distance units.', icon: '📏' },
      { slug: 'weight-converter', name: 'Weight Converter', desc: 'Convert between different mass and weight units.', icon: '⚖️' },
      { slug: 'temperature-converter', name: 'Temperature Converter', desc: 'Convert Celsius, Fahrenheit, and Kelvin temperature scales.', icon: '🌡️' }
    ]
  },
  'date-time-calculators': {
    name: 'Date & Time',
    title: 'Date & Time Calculators',
    desc: 'Calculate age, date intervals, business days, time duration, and hours.',
    calculators: [
      { slug: 'age-calculator', name: 'Age Calculator', desc: 'Find your exact age in years, months, days, and time to your next birthday.', icon: '🎂' },
      { slug: 'date-difference-calculator', name: 'Date Difference Calculator', desc: 'Calculate the total days and weeks between two specific dates.', icon: '📅' },
      { slug: 'business-days-calculator', name: 'Business Days Calculator', desc: 'Find the number of working days between two dates, excluding weekends.', icon: '👔' },
      { slug: 'time-duration-calculator', name: 'Time Duration Calculator', desc: 'Add, subtract, or find the difference between two times.', icon: '⏱️' },
      { slug: 'hours-calculator', name: 'Hours Calculator', desc: 'Calculate total hours worked for timesheets or payroll.', icon: '⏰' }
    ]
  },
  'everyday-calculators': {
    name: 'Everyday',
    title: 'Everyday Calculators',
    desc: 'Useful everyday math tools for splitting tips, discounting prices, sleeping schedules, and generation tools.',
    calculators: [
      { slug: 'password-generator', name: 'Password Generator', desc: 'Build secure, randomized password combinations utilizing custom character inclusions.', icon: '🔑' },
      { slug: 'discount-calculator', name: 'Discount Calculator', desc: 'Calculate final prices after discounts and applicable sales taxes.', icon: '🛍️' },
      { slug: 'sleep-calculator', name: 'Sleep Calculator', desc: 'Optimize bedtime schedules or wake-up targets using standard 90-minute human sleep cycle models.', icon: '🌙' },
      { slug: 'tip-calculator', name: 'Tip Calculator', desc: 'Determine standard gratuity payout and split bill totals across party members.', icon: '🍳' },
      { slug: 'random-number-generator', name: 'Random Number Generator', desc: 'Generate pseudo-random values or lists matching lower and upper boundaries.', icon: '🎲' }
    ]
  }
};

const rootDir = __dirname;

// Helper to determine depth and relative paths
function getDepthInfo(filePath) {
  const relPath = path.relative(rootDir, filePath);
  const parts = relPath.split(path.sep);
  const depth = parts.length - 1;
  const rootRel = depth === 0 ? '' : '../'.repeat(depth);
  return { depth, rootRel };
}

// Generate the unified header HTML (no Home link, and no About/Contact top links as per user request to save space)
function getHeaderHTML(rootRel, activeCategory = '') {
  return `
  <header class="site-header">
    <nav class="header-nav">
      <a href="${rootRel || './'}" class="logo-link" aria-label="CalcUni Home">
        <img src="${rootRel}CalcUni_Light.png" alt="CalcUni Logo" class="logo-img light-logo" width="117" height="38">
        <img src="${rootRel}CalcUni_Dark.png" alt="CalcUni Logo" class="logo-img dark-logo" width="117" height="38">
      </a>
      <div class="nav-tabs">
        <a href="${rootRel}finance-calculators/" class="${activeCategory === 'Finance' ? 'active' : ''}">Finance</a>
        <a href="${rootRel}tax-calculators/" class="${activeCategory === 'Tax' ? 'active' : ''}">Tax</a>
        <a href="${rootRel}business-calculators/" class="${activeCategory === 'Business' ? 'active' : ''}">Business</a>
        <a href="${rootRel}health-calculators/" class="${activeCategory === 'Health' ? 'active' : ''}">Health</a>
        <a href="${rootRel}construction-calculators/" class="${activeCategory === 'Construction' ? 'active' : ''}">Construction</a>
        <a href="${rootRel}transportation-calculators/" class="${activeCategory === 'Transportation' ? 'active' : ''}">Transportation</a>
        <a href="${rootRel}technology-calculators/" class="${activeCategory === 'Technology' ? 'active' : ''}">Technology</a>
        <a href="${rootRel}math-calculators/" class="${activeCategory === 'Math' ? 'active' : ''}">Math</a>
        <a href="${rootRel}conversion-calculators/" class="${activeCategory === 'Conversion' ? 'active' : ''}">Conversion</a>
        <a href="${rootRel}date-time-calculators/" class="${activeCategory === 'Date & Time' ? 'active' : ''}">Date/Time</a>
        <a href="${rootRel}everyday-calculators/" class="${activeCategory === 'Everyday' ? 'active' : ''}">Everyday</a>
      </div>
      <div class="header-actions">
        <button type="button" id="themeToggleBtn" class="theme-toggle-btn" aria-label="Toggle theme">
          <svg class="dark-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <svg class="light-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
      </div>
    </nav>
  </header>`;
}

// Head script snippet to configure light/dark mode preference immediately to avoid flash
function getThemeHeaderScript() {
  return `
  <!-- Theme Init to prevent flash of light theme -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
      document.documentElement.style.color = theme === 'dark' ? '#f8fafc' : '#0f172a';
    })();
  </script>
  `;
}

// Generate unified responsive footer HTML
function getFooterHTML(rootRel) {
  return `
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-left">
        &copy; 2026 CalcUni.com &mdash; Simple calculators for everyone.
      </div>
      <div class="footer-right">
        <a href="${rootRel}about.html" style="margin-left: 15px;">About Us</a>
        <a href="${rootRel}contact.html" style="margin-left: 15px;">Contact</a>
        <a href="${rootRel}blog/" style="margin-left: 15px;">Blogs</a>
        <a href="${rootRel}privacy.html" style="margin-left: 15px;">Privacy Policy</a>
        <a href="${rootRel}terms.html" style="margin-left: 15px;">Terms of Use</a>
        <a href="${rootRel}disclaimer.html" style="margin-left: 15px;">Disclaimer</a>
        <a href="${rootRel}sitemap.html" style="margin-left: 15px;">Sitemap</a>
      </div>
    </div>
  </footer>
  
  <!-- Floating Scroll to Top + Reading Progress Indicator -->
  <button id="scrollToTopBtn" class="scroll-to-top" aria-label="Scroll to top" tabindex="0">
    <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
      <circle class="progress-ring__track" cx="24" cy="24" r="20" fill="none" stroke-width="4"></circle>
      <circle class="progress-ring__indicator" cx="24" cy="24" r="20" fill="none" stroke-width="4" stroke-linecap="round"></circle>
    </svg>
    <span class="scroll-to-top__arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </span>
  </button>

  <script>
  (function() {
    // Theme Toggle Toggler
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.style.backgroundColor = newTheme === 'dark' ? '#0f172a' : '#f8fafc';
        document.documentElement.style.color = newTheme === 'dark' ? '#f8fafc' : '#0f172a';
      });
    }

    // Scroll to Top & Progress Indicator Logic
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
      const circle = scrollBtn.querySelector('.progress-ring__indicator');
      const circumference = 125.66; // 2 * PI * r (r = 20)
      let isTicking = false;

      function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const totalScrollable = scrollHeight - clientHeight;
        
        // Calculate progress ratio (0 to 1)
        const progress = totalScrollable > 0 ? scrollTop / totalScrollable : 0;
        
        // Set dashoffset accordingly
        if (circle) {
          const offset = circumference - (progress * circumference);
          circle.style.strokeDashoffset = offset;
        }

        // Toggle visibility after 250px scroll threshold
        if (scrollTop > 250) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
        
        isTicking = false;
      }

      function onScroll() {
        if (!isTicking) {
          window.requestAnimationFrame(updateProgress);
          isTicking = true;
        }
      }

      // Passive scroll listener for better performance
      window.addEventListener('scroll', onScroll, { passive: true });
      
      // Click action
      scrollBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // Run initial check
      updateProgress();
    }
  })();
  </script>`;
}

// Generate standard meta tags for SEO
function getMetaTagsHTML(title, description, rootRel, canonicalPath) {
  const canonicalUrl = canonicalPath ? `https://calcuni.com/${canonicalPath}` : 'https://calcuni.com';
  return `
  <!-- Google tag (gtag.js) -->
  <script>
    (function() {
      const isLocal = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.protocol === 'file:';
      
      const hasDevParam = window.location.search.includes('dev=true');
      const hasDevCookie = localStorage.getItem('dev_mode') === 'true';
      
      if (hasDevParam || hasDevCookie) {
        localStorage.setItem('dev_mode', 'true');
      }
      if (window.location.search.includes('dev=false')) {
        localStorage.removeItem('dev_mode');
      }

      if (isLocal || hasDevParam || hasDevCookie || localStorage.getItem('dev_mode') === 'true') {
        window['ga-disable-G-8QXJ3X2XGV'] = true;
        console.log('Google Analytics (G-8QXJ3X2XGV) disabled for developer mode.');
      }

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8QXJ3X2XGV');

      // Lazy load GTag script after page load to prevent main thread blocking and optimize performance
      window.addEventListener('load', function() {
        setTimeout(function() {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8QXJ3X2XGV';
          document.head.appendChild(script);
        }, 1500);
      });
    })();
  </script>

  <!-- Technical SEO & Meta Tags -->
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://calcuni.com/logo2.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonicalUrl}">
  <meta property="twitter:title" content="${title}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="https://calcuni.com/logo2.png">
  `;
}

// Generate sidebar HTML
function getSidebarHTML(rootRel, catKey, activeSlug = '') {
  const cat = categories[catKey];
  if (!cat) return '';

  const links = cat.calculators.map(calc => {
    const isActive = calc.slug === activeSlug ? 'class="active"' : '';
    return `<li><a href="${rootRel}${catKey}/${calc.slug}/" ${isActive}>${calc.name}</a></li>`;
  }).join('\n        ');

  const overviewActive = activeSlug === 'overview' ? 'class="active"' : '';

  return `
    <aside class="sidebar">
      <h2 class="sidebar-heading">${cat.name.toUpperCase()} TOOLS</h2>
      <ul class="sidebar-menu">
        <li><a href="${rootRel}${catKey}/" ${overviewActive}>Overview</a></li>
        ${links}
      </ul>
    </aside>`;
}

// Process single calculator page
function processCalculatorPage(filePath, catKey, calcSlug) {
  console.log(`Processing calculator: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const { rootRel } = getDepthInfo(filePath);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'CalcUni Calculator';

  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) || html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i);
  const description = descMatch ? descMatch[1].trim() : 'Free online calculator.';

  // Extract core calculator body from <main>
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
  let mainContent = '';
  if (mainMatch) {
    mainContent = mainMatch[1];
    // Remove breadcrumbs
    mainContent = mainContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/gi, '');
    mainContent = mainContent.replace(/<div class="breadcrumb"[\s\S]*?>[\s\S]*?<\/div>/gi, '');
    // Remove category nav or hero elements if any
    mainContent = mainContent.replace(/<div class="category-nav">[\s\S]*?<\/div>/gi, '');
    mainContent = mainContent.replace(/<section class="links-card">[\s\S]*?<\/section>/gi, '');
    // Remove template-injected header elements to prevent duplication on repeated builds
    mainContent = mainContent.replace(/<span[^>]*class="category-badge"[^>]*>[\s\S]*?<\/span>/gi, '');
    mainContent = mainContent.replace(/<h1[^>]*class="page-title"[^>]*>[\s\S]*?<\/h1>/gi, '');
    mainContent = mainContent.replace(/<p[^>]*class="page-desc"[^>]*>[\s\S]*?<\/p>/gi, '');
    // Remove previously injected disclaimer so it doesn't stack
    mainContent = mainContent.replace(/<div[^>]*class="calculator-disclaimer"[^>]*>[\s\S]*?<\/div>/gi, '');
    // Remove previously injected SEO content section to prevent duplicates
    mainContent = mainContent.replace(/<section[^>]*class="calculator-seo-content"[^>]*>[\s\S]*?<\/section>/gi, '');
  } else {
    // Fallback if no main tag
    mainContent = '<div>Calculator content placeholder</div>';
  }

  // Extract scripts
  let scripts = '';
  const scriptRegex = /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi;
  let match;
  const seenScripts = new Set();
  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].includes('application/ld+json')) continue; // Skip schema
    const scriptContent = match[2].trim();
    if (!scriptContent) continue;
    // Exclude theme-related scripts and Google Analytics tags to avoid duplication
    if (scriptContent.includes('themeToggleBtn') || scriptContent.includes('savedTheme') || scriptContent.includes('prefers-color-scheme')) continue;
    if (match[1].includes('gtag/js') || scriptContent.includes('G-8QXJ3X2XGV') || scriptContent.includes('gtag(')) continue;
    if (seenScripts.has(scriptContent)) continue;
    if (mainContent.includes(match[2])) continue; // Already in mainContent
    seenScripts.add(scriptContent);
    scripts += `<script${match[1]}>${match[2]}</script>\n`;
  }

  // Find header category name
  const cat = categories[catKey];
  const calcInfo = cat.calculators.find(c => c.slug === calcSlug);
  const calcName = calcInfo ? calcInfo.name : 'Calculator';
  const calcDesc = calcInfo ? calcInfo.desc : description;

  let disclaimerText = '';
  if (catKey === 'finance-calculators') {
    disclaimerText = 'Calculations shown here are estimates for planning and informational purposes only. Actual interest rates, payments, and schedules may vary based on your lender\'s specific terms, credit score, and market fluctuations. Always consult a certified financial advisor before making major financial decisions.';
  } else if (catKey === 'health-calculators') {
    disclaimerText = 'These calculators are for informational and educational purposes only. They do not constitute medical advice, diagnosis, or treatment. Always consult with a qualified physician or healthcare provider before starting any new diet, fitness program, or health regimen.';
  } else if (catKey === 'math-calculators') {
    disclaimerText = 'These math tools are provided for educational and reference purposes. While we strive to ensure mathematical accuracy, we recommend verifying critical calculations independently for formal academic, scientific, or professional work.';
  } else if (catKey === 'tax-calculators') {
    disclaimerText = 'Tax calculations are estimates based on standard provincial and federal rates for the selected tax year and do not constitute professional tax advice or tax planning. Please consult a qualified CPA or tax professional for actual filings and tax planning.';
  } else if (catKey === 'conversion-calculators') {
    if (calcSlug === 'currency-converter') {
      disclaimerText = 'Converted rates shown here are for informational purposes only, are subject to constant market fluctuation, and may differ from the actual rates offered by your bank or financial institution.';
    } else {
      disclaimerText = 'Conversions are provided for informational and reference purposes only. While we verify unit ratios, please double-check measurements independently for critical engineering, commercial, or culinary applications.';
    }
  } else if (catKey === 'date-time-calculators') {
    disclaimerText = 'These date calculations are for reference and planning purposes. Business days calculations exclude standard weekends and do not account for local statutory holidays. Please verify timesheets and contract durations independently.';
  } else if (catKey === 'construction-calculators') {
    disclaimerText = 'Estimates are for planning purposes and include standard material wastage multipliers. Actual material requirements can vary based on specific site conditions, installation methods, and professional contractor recommendations. Verify quantities with your supplier before ordering.';
  } else if (catKey === 'business-calculators') {
    disclaimerText = 'Business and financial calculations shown are estimates for planning and informational purposes only. Actual values may vary depending on tax regulations, payroll rules, and specific transaction terms. Consult a qualified professional or accountant for official business planning.';
  } else if (catKey === 'transportation-calculators') {
    disclaimerText = 'Fuel costs, charging costs, and trip times are estimates based on standard vehicle consumption rates, driving patterns, and utility tariffs. Actual costs and travel times will vary due to traffic, weather, road conditions, and individual driving habits.';
  } else if (catKey === 'everyday-calculators') {
    disclaimerText = 'These general everyday tools are provided for quick estimation and reference purposes. Sleep cycles, passwords, and random numbers are based on standard mathematical algorithms and should be verified for security-critical applications.';
  } else if (catKey === 'technology-calculators') {
    disclaimerText = 'Technology tools are for network planning, educational reference, and storage conversions. Please verify network subnets and bandwidth calculations with standard network engineering practices before deploying in live environments.';
  }

  const disclaimerHTML = disclaimerText ? `
      <div class="calculator-disclaimer">
        <strong>Disclaimer:</strong> ${disclaimerText}
      </div>` : '';

  const headerHTML = getHeaderHTML(rootRel, cat.name);
  const sidebarHTML = getSidebarHTML(rootRel, catKey, calcSlug);

  // Generate 5-6 related calculators from same/sibling categories
  const relatedCalculators = [];
  cat.calculators
    .filter(c => c.slug !== calcSlug)
    .forEach(c => relatedCalculators.push({ name: c.name, slug: c.slug, catKey }));

  if (relatedCalculators.length < 6) {
    let siblingCats = [];
    if (catKey === 'finance-calculators' || catKey === 'business-calculators' || catKey === 'tax-calculators') {
      siblingCats = ['finance-calculators', 'business-calculators', 'tax-calculators'];
    } else if (catKey === 'health-calculators' || catKey === 'everyday-calculators') {
      siblingCats = ['health-calculators', 'everyday-calculators', 'math-calculators'];
    } else if (catKey === 'math-calculators' || catKey === 'technology-calculators' || catKey === 'conversion-calculators') {
      siblingCats = ['math-calculators', 'technology-calculators', 'conversion-calculators', 'date-time-calculators'];
    } else if (catKey === 'construction-calculators') {
      siblingCats = ['construction-calculators', 'math-calculators', 'conversion-calculators'];
    } else {
      siblingCats = Object.keys(categories);
    }

    for (const sibKey of siblingCats) {
      if (sibKey === catKey) continue;
      const sibCat = categories[sibKey];
      if (!sibCat) continue;
      for (const calc of sibCat.calculators) {
        if (relatedCalculators.length >= 6) break;
        relatedCalculators.push({ name: calc.name, slug: calc.slug, catKey: sibKey });
      }
      if (relatedCalculators.length >= 6) break;
    }
  }


  const canonicalPath = `${catKey}/${calcSlug}/`;
  const metaTagsHTML = getMetaTagsHTML(title, description, rootRel, canonicalPath);
  const seoContentHTML = seoData.getSEOContentHTML(catKey, calcSlug, calcName, relatedCalculators);
  const schemaMarkup = seoData.getJSONLD(catKey, calcSlug, calcName, `https://calcuni.com/${canonicalPath}`, relatedCalculators);

  const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="${rootRel}assets/css/style.css?v=${ASSET_VERSION}">
  <link rel="icon" href="${rootRel}assets/icons/favicon_io/favicon.ico">
  ${getThemeHeaderScript()}
  ${metaTagsHTML}
  ${schemaMarkup}
</head>
<body>
  ${headerHTML}

  <div class="page-shell">
    ${sidebarHTML}

    <main class="main-content">
      <div class="breadcrumb">
        <a href="${rootRel || './'}">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="${rootRel}${catKey}/">${cat.title}</a>
        <span class="breadcrumb-separator">/</span>
        <span>${calcName}</span>
      </div>

      <span class="category-badge">${cat.name} Calculator</span>
      <h1 class="page-title">${calcName}</h1>
      <p class="page-desc">${calcDesc}</p>

      ${mainContent}
      ${seoContentHTML}
      ${disclaimerHTML}
    </main>
  </div>

  ${getFooterHTML(rootRel)}

  ${scripts}
</body>
</html>`;

  fs.writeFileSync(filePath, finalHTML, 'utf8');
}

// Category Rich Content for SEO Page Quality
const categoryRichContent = {
  'finance-calculators': {
    intro: "Managing personal finance, calculating mortgage options, and estimating interest rates are critical steps for achieving long-term financial security. Our comprehensive suite of finance calculators is designed to help you model real-world scenarios, from buying your first home to planning your comfortable retirement.",
    body: "With tools like the Amortization Calculator, Loan Calculator, and Compound Interest Calculator, you can visualize interest accumulation, principal paydowns, and how even small changes to interest rates or contribution frequencies can compound over years. These planning tools offer estimates to help you make informed decisions, whether you are budgeting for a car, assessing credit card repayment strategies, or running a mortgage stress test."
  },
  'tax-calculators': {
    intro: "Navigating regional tax structures can be a complex process, whether you are a business owner calculating payroll or an individual checking sales tax on a purchase. Our tax calculators simplify Canadian and international tax calculations by providing instant estimates based on current rates.",
    body: "Whether you need to compute GST/HST in Canada, calculate Provincial Sales Tax (PST), determine Value Added Tax (VAT) for global transactions, or estimate payroll deductions (including CPP, EI, and income tax brackets), these calculators provide transparent details on tax components. Use them for commercial budgeting, invoice verification, and salary planning."
  },
  'business-calculators': {
    intro: "Running a business successfully requires precise margin calculations, ROI estimates, and clear break-even targets. Our business calculations module provides operators, agents, and entrepreneurs with essential tools to assess financial viability and monitor key performance indicators.",
    body: "Calculate profit margins, markup pricing targets, sales commissions, and payroll rates in seconds. By using the Break-Even Calculator or ROI Calculator, you can analyze different cost scenarios and determine the precise revenue levels required to sustain and grow your business operations."
  },
  'health-calculators': {
    intro: "Maintaining a healthy lifestyle involves tracking key fitness metrics such as energy expenditure, caloric intake, and body mass index. Our health and fitness tools provide quick estimation models to support your wellness journey.",
    body: "Estimate your body mass index (BMI), basal metabolic rate (BMR), total daily energy expenditure (TDEE), and body fat percentage using standard scientific formulas. Additionally, our macronutrient and calorie tools help you plan daily meals by breaking down optimal ratios of proteins, carbohydrates, and healthy fats."
  },
  'construction-calculators': {
    intro: "Accurate material estimation is the foundation of any successful DIY project or professional construction job. Overestimating leads to wasted budget, while underestimating causes project delays. Our construction tools calculate exact quantities for a variety of tasks.",
    body: "Estimate the volume of concrete required for slabs and columns, calculate the square footage of irregular rooms, or determine how many gallons of paint, ceramic tiles, or roofing shingles are required. Every calculator integrates standard wastage margins to ensure your material orders match real-world building needs."
  },
  'transportation-calculators': {
    intro: "Optimizing vehicle travel costs and efficiency is a great way to save money and reduce your carbon footprint. Our transportation suite offers calculators to track driving expenses and compare travel options.",
    body: "Plan your trip budget using the Fuel Cost Calculator, monitor fuel economy with the MPG or Mileage tools, and estimate the electricity cost of recharging an electric vehicle (EV). You can also calculate travel durations and arrival times based on speed and distance limits."
  },
  'technology-calculators': {
    intro: "System administrators, network engineers, and students need fast, accurate utilities to plan IT infrastructure and perform data conversions. Our technology tools simplify binary calculations and network planning.",
    body: "Perform binary mathematics, calculate CIDR network masks using the Subnet Calculator, check IP address scopes, and estimate file download times based on bandwidth capacity. You can also convert between file size units like Gigabytes (GB) and Gibibytes (GiB) for accurate storage configuration."
  },
  'math-calculators': {
    intro: "Solving complex math problems, calculating averages, or finding percentage changes doesn't have to be tedious. Our mathematics section provides clean interfaces for everyday arithmetic and academic calculations.",
    body: "Easily solve percentage questions, add/subtract fractions, perform advanced calculations with our online scientific calculator, or find the mean, median, mode, and range of a dataset. We also offer GPA and school grade calculators to help students track academic progress and exam targets."
  },
  'conversion-calculators': {
    intro: "Converting measurements between different metric and imperial units is a frequent necessity in commerce, travel, cooking, and science. Our conversion tools convert quantities accurately and instantly.",
    body: "Quickly convert lengths, weights, temperatures, and speeds. We also offer a real-time currency converter with standard baseline rates to help you estimate international exchange values for travel or business expenses."
  },
  'date-time-calculators': {
    intro: "Planning project schedules, calculating ages, or finding work durations requires precise date calculations that account for calendar nuances. Our time utilities handle these calculations automatically.",
    body: "Determine your exact age down to the day, calculate the total difference in days or weeks between two dates, or count work days (excluding weekends) using the Business Days Calculator. You can also calculate elapsed timesheet hours and duration splits."
  },
  'everyday-calculators': {
    intro: "Some of the most common calculations are the ones we do in our everyday routines, such as splitting restaurant bills, calculating retail discounts, or building secure passwords.",
    body: "Use our Everyday Calculators to compute final sale prices after discounts and taxes, calculate restaurant tips and split the bill among guests, generate strong secure passwords, select random numbers, or optimize your sleep cycles based on natural sleep rhythms."
  }
};

// Process category index page (e.g. finance-calculators/index.html)
function processCategoryPage(filePath, catKey) {
  console.log(`Processing category: ${filePath}`);
  const { rootRel } = getDepthInfo(filePath);
  const cat = categories[catKey];

  const headerHTML = getHeaderHTML(rootRel, cat.name);
  const sidebarHTML = getSidebarHTML(rootRel, catKey, 'overview');

  // Generate category grid cards
  const cardsHTML = cat.calculators.map(calc => `
      <div class="calc-card">
        <div class="icon">${calc.icon || '🧮'}</div>
        <h3>${calc.name}</h3>
        <p>${calc.desc}</p>
        <div class="card-link-list">
          <a href="${calc.slug}/">Open Calculator →</a>
        </div>
      </div>`).join('');

  const title = `${cat.title} | CalcUni`;
  const canonicalPath = `${catKey}/`;
  const metaTagsHTML = getMetaTagsHTML(title, cat.desc, rootRel, canonicalPath);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://calcuni.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cat.title,
        "item": `https://calcuni.com/${canonicalPath}`
      }
    ]
  };
  const schemaMarkup = `
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
  `;

  const richInfo = categoryRichContent[catKey];
  const richHTML = richInfo ? `
      <section class="category-seo-content" style="margin-top: 40px; border-top: 1px solid var(--border); padding-top: 30px;">
        <h2 style="font-size: 22px; color: var(--primary); margin-bottom: 16px;">About ${cat.name} Calculators</h2>
        <p style="line-height: 1.6; margin-bottom: 16px; color: var(--muted);">${richInfo.intro}</p>
        <p style="line-height: 1.6; margin-bottom: 16px; color: var(--muted);">${richInfo.body}</p>
      </section>` : '';

  const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${cat.desc}">
  <link rel="stylesheet" href="${rootRel}assets/css/style.css?v=${ASSET_VERSION}">
  <link rel="icon" href="${rootRel}assets/icons/favicon_io/favicon.ico">
  ${getThemeHeaderScript()}
  ${metaTagsHTML}
  ${schemaMarkup}
</head>
<body>
  ${headerHTML}

  <div class="page-shell">
    ${sidebarHTML}

    <main class="main-content">
      <div class="breadcrumb">
        <a href="${rootRel || './'}">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span>${cat.title}</span>
      </div>

      <span class="category-badge">Category Hub</span>
      <h1 class="page-title">${cat.title}</h1>
      <p class="page-desc">${cat.desc}</p>

      <div class="calculator-grid">
        ${cardsHTML}
      </div>
      ${richHTML}
    </main>
  </div>

  ${getFooterHTML(rootRel)}
</body>
</html>`;

  fs.writeFileSync(filePath, finalHTML, 'utf8');
}

// Process root info pages (about, contact, privacy)
function processInfoPage(filePath, pageKey) {
  console.log(`Processing info page: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const { rootRel } = getDepthInfo(filePath);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'CalcUni';

  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i);
  const description = descMatch ? descMatch[1].trim() : 'Free online calculators.';

  // Extract core main body — prefer <main>, fall back to stripped <body>
  const mainMatch = html.match(/<main([^>]*)>([\s\S]*?)<\/main>/);
  let mainTag = '';
  let mainContent = '';
  if (mainMatch) {
    mainTag = '<main' + mainMatch[1] + '>';
    mainContent = mainMatch[2];
  } else {
    const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
    mainContent = bodyMatch ? bodyMatch[1] : '';
    mainContent = mainContent.replace(/<header[\s\S]*?<\/header>/gi, '');
    mainContent = mainContent.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    mainContent = mainContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  }

  // Keep scripts
  let scripts = '';
  const scriptRegex = /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi;
  let match;
  const seenScripts = new Set();
  while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].includes('application/ld+json')) continue; // Skip schema
    const scriptContent = match[2].trim();
    // Exclude theme-related scripts and Google Analytics tags to avoid duplication
    if (scriptContent.includes('themeToggleBtn') || scriptContent.includes('savedTheme') || scriptContent.includes('prefers-color-scheme')) continue;
    if (match[1].includes('gtag/js') || scriptContent.includes('G-8QXJ3X2XGV') || scriptContent.includes('gtag(')) continue;
    if (seenScripts.has(scriptContent)) continue;
    if (mainContent.includes(match[2])) continue; // Already in mainContent
    seenScripts.add(scriptContent);
    scripts += '<script' + match[1] + '>' + match[2] + '</script>\n';
  }

  const headerHTML = getHeaderHTML(rootRel, '');

  // If content came from <main>, re-wrap it; otherwise inject directly
  const bodyContent = mainTag
    ? mainTag + '\n    ' + mainContent + '\n  </main>'
    : mainContent;

  // Dynamically calculate the accurate relative canonical path from rootDir
  let canonicalPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  if (canonicalPath.endsWith('index.html')) {
    canonicalPath = canonicalPath.substring(0, canonicalPath.length - 10);
  }
  const metaTagsHTML = getMetaTagsHTML(title, description, rootRel, canonicalPath);

  let schemaMarkup = '';
  if (pageKey === 'blog-post') {
    const canonicalUrl = `https://calcuni.com/${canonicalPath}`;
    const cleanTitle = title.replace(/\s*\|\s*CalcUni/g, '');
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": cleanTitle,
      "description": description,
      "image": "https://calcuni.com/logo2.png",
      "publisher": {
        "@type": "Organization",
        "name": "CalcUni",
        "logo": {
          "@type": "ImageObject",
          "url": "https://calcuni.com/logo2.png"
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Fiable Technologies"
        }
      },
      "author": {
        "@type": "Organization",
        "name": "CalcUni Editorial Team"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "datePublished": "2026-05-15T08:00:00Z",
      "dateModified": "2026-06-15T12:00:00Z"
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://calcuni.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://calcuni.com/blog/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": cleanTitle,
          "item": canonicalUrl
        }
      ]
    };

    schemaMarkup = `
    <script type="application/ld+json">
      ${JSON.stringify(articleSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    `;
  }

  const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="${rootRel}assets/css/style.css?v=${ASSET_VERSION}">
  <link rel="icon" href="${rootRel}assets/icons/favicon_io/favicon.ico">
  ${getThemeHeaderScript()}
  ${metaTagsHTML}
  ${schemaMarkup}
</head>
<body>
  ${headerHTML}

  ${bodyContent}

  ${getFooterHTML(rootRel)}

  ${scripts}
</body>
</html>`;

  fs.writeFileSync(filePath, finalHTML, 'utf8');
}

// Process main root index page
function processHomepage(filePath) {
  console.log(`Processing homepage: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const { rootRel } = getDepthInfo(filePath);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'CalcUni';

  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i);
  const description = descMatch ? descMatch[1].trim() : 'Free online calculators.';

  // Extract main content (cards/directory sections) — preserve hand-authored HTML
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
  let mainContent = mainMatch ? mainMatch[1] : '';

  // Build flat calc data array from categories for autocomplete (generated at build time)
  const calcData = Object.entries(categories).flatMap(([catKey, cat]) =>
    cat.calculators.map(calc => ({
      name: calc.name,
      url: catKey + '/' + calc.slug + '/',
      category: cat.name,
      keywords: (calc.name + ' ' + calc.desc + ' ' + calc.slug.replace(/-/g, ' ') + ' ' + cat.name).toLowerCase()
    }))
  );
  const calcDataJS = JSON.stringify(calcData, null, 2);

  const headerHTML = getHeaderHTML(rootRel, 'home');
  const metaTagsHTML = getMetaTagsHTML(title, description, rootRel, '');

  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CalcUni",
    "url": "https://calcuni.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://calcuni.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CalcUni",
    "url": "https://calcuni.com/",
    "logo": "https://calcuni.com/logo2.png",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Fiable Technologies"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Canada"
    },
    "description": "Online calculator platform covering finance, construction, health, education, business, and engineering calculations."
  };

  const schemaMarkup = `
    <script type="application/ld+json">
      ${JSON.stringify(siteSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(orgSchema, null, 2)}
    </script>
  `;

  const finalHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="${rootRel}assets/css/style.css?v=${ASSET_VERSION}">
  <link rel="icon" href="${rootRel}assets/icons/favicon_io/favicon.ico">
  ${getThemeHeaderScript()}
  ${metaTagsHTML}
  ${schemaMarkup}
</head>
<body>
  ${headerHTML}

  <header class="hero-header">
    <section class="hero">
      <h1>All Calculators. One Place.</h1>
      <p>CalcUni.com is a simple calculator hub for finance, health, tax, education, and daily life calculations.</p>
      <div class="search-box">
        <div class="search-box-row">
          <input id="searchInput" type="text" placeholder="Search calculators: mortgage, BMI, tax, loan..." autocomplete="off" aria-label="Search calculators" autofocus />
          <button id="searchBtn" type="button">Search</button>
        </div>
        <div id="searchSuggestions" class="search-suggestions" role="listbox" aria-label="Calculator suggestions"></div>
      </div>
    </section>
  </header>

  <main style="max-width: 1280px; margin: 0 auto; padding: 40px 24px 60px;">
    ${mainContent}
  </main>

  ${getFooterHTML(rootRel)}

  <script>
  (function () {
    const CALC_DATA = ${calcDataJS};

    const input = document.getElementById('searchInput');
    const sugBox = document.getElementById('searchSuggestions');
    const searchBtn = document.getElementById('searchBtn');
    let activeIdx = -1;

    function escHtml(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function highlight(text, query) {
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx === -1) return escHtml(text);
      return escHtml(text.slice(0, idx))
           + '<mark>' + escHtml(text.slice(idx, idx + query.length)) + '</mark>'
           + escHtml(text.slice(idx + query.length));
    }

    function closeSuggestions() {
      sugBox.innerHTML = '';
      sugBox.style.display = 'none';
      activeIdx = -1;
    }

    function filterGrid(q) {
      document.querySelectorAll('.calc-card').forEach(card => {
        const text = (card.innerText + ' ' + (card.dataset.name || '')).toLowerCase();
        card.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
      document.querySelectorAll('.link-group').forEach(group => {
        const text = group.innerText.toLowerCase();
        group.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
    }

    function renderSuggestions(raw) {
      const q = raw.trim().toLowerCase();
      if (!q) { closeSuggestions(); filterGrid(''); return; }

      const matches = CALC_DATA.filter(c =>
        c.keywords.includes(q) || c.name.toLowerCase().includes(q)
      ).slice(0, 8);

      activeIdx = -1;

      if (matches.length === 0) {
        sugBox.innerHTML = '<div class=\"suggestion-empty\">No calculators found for \"' + escHtml(raw.trim()) + '\"</div>';
        sugBox.style.display = 'block';
        filterGrid(q);
        return;
      }

      sugBox.innerHTML = matches.map((c, i) =>
        '<div class=\"suggestion-item\" data-url=\"' + c.url + '\" data-idx=\"' + i + '\" role=\"option\">' +
          '<span class=\"sug-name\">' + highlight(c.name, raw.trim()) + '</span>' +
          '<span class=\"sug-cat\">' + escHtml(c.category) + '</span>' +
        '</div>'
      ).join('');
      sugBox.style.display = 'block';

      sugBox.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          sugBox.querySelectorAll('.suggestion-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          activeIdx = +item.dataset.idx;
        });
        item.addEventListener('click', () => { window.location.href = item.dataset.url; });
      });

      filterGrid(q);
    }

    function navigateToActive() {
      const items = sugBox.querySelectorAll('.suggestion-item');
      const target = activeIdx >= 0 ? items[activeIdx] : items[0];
      if (target) window.location.href = target.dataset.url;
    }

    input.addEventListener('input', () => renderSuggestions(input.value));

    input.addEventListener('keydown', e => {
      const items = [...sugBox.querySelectorAll('.suggestion-item')];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        items.forEach((item, i) => item.classList.toggle('active', i === activeIdx));
        if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, -1);
        items.forEach((item, i) => item.classList.toggle('active', i === activeIdx));
        if (activeIdx >= 0 && items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        navigateToActive();
      } else if (e.key === 'Escape') {
        closeSuggestions();
      }
    });

    searchBtn.addEventListener('click', () => {
      if (input.value.trim()) navigateToActive();
    });

    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !sugBox.contains(e.target) && !searchBtn.contains(e.target)) {
        closeSuggestions();
      }
    });

    // Auto-focus search input on page load
    input.focus();
  })();
  </script>

</body>
</html>`;

  fs.writeFileSync(filePath, finalHTML, 'utf8');
}

// Generate XML Sitemap dynamically for all 55 calculators and content nodes
function generateSitemap() {
  console.log('Generating sitemap.xml...');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Core pages
  const corePages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'disclaimer.html', 'sitemap.html', 'blog/index.html'];
  corePages.forEach(p => {
    const urlPath = p === 'index.html' ? '' : (p === 'blog/index.html' ? 'blog/' : p);
    const priority = p === 'index.html' ? '1.0' : (p === 'blog/index.html' ? '0.7' : '0.5');
    const changefreq = p === 'index.html' ? 'weekly' : 'monthly';
    const loc = urlPath ? `https://calcuni.com/${urlPath}` : 'https://calcuni.com/';
    xml += `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  });

  // Blog posts
  const blogPosts = [
    'how-mortgage-payments-work',
    'gst-vs-hst-in-canada',
    'how-to-calculate-bmi',
    'how-to-calculate-concrete-volume',
    'fuel-efficiency-tips',
    'understanding-subnetting',
    'how-roi-is-calculated',
    'best-retirement-planning-methods',
    'fixed-vs-variable-mortgage-canada',
    'what-is-cmhc-insurance',
    'how-to-calculate-tdee',
    'macronutrients-101',
    'why-bmi-misleading-for-athletes'
  ];
  blogPosts.forEach(post => {
    xml += `  <url><loc>https://calcuni.com/blog/${post}/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
  });

  // Category and calculator pages
  Object.entries(categories).forEach(([catKey, cat]) => {
    // Category hub
    xml += `  <url><loc>https://calcuni.com/${catKey}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;

    // Calculators
    cat.calculators.forEach(calc => {
      xml += `  <url><loc>https://calcuni.com/${catKey}/${calc.slug}/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
    });
  });

  xml += `</urlset>\n`;
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf8');
  console.log('sitemap.xml generated successfully!');
}

// Generate robots.txt dynamically
function generateRobotsTxt() {
  console.log('Generating robots.txt...');
  const robots = `User-agent: *
Allow: /

Sitemap: https://calcuni.com/sitemap.xml
`;
  fs.writeFileSync(path.join(rootDir, 'robots.txt'), robots, 'utf8');
  console.log('robots.txt generated successfully!');
}

// Generate llms.txt dynamically for AI crawler agents
function generateLLMSTxt() {
  console.log('Generating llms.txt...');
  let md = `# CalcUni

> Free online calculator platform covering finance, tax, business, health, construction, transportation, technology, mathematics, unit conversions, date/time calculation, and everyday planning. All calculators execute client-side in real-time in the browser.

## Core Calculators Directory

`;

  Object.entries(categories).forEach(([catKey, cat]) => {
    const catName = cat.title || cat.name;
    md += `### ${catName}\n\n`;
    
    cat.calculators.forEach(calc => {
      const canonicalUrl = `https://calcuni.com/${catKey}/${calc.slug}/`;
      md += `- [${calc.name}](${canonicalUrl}): ${calc.desc}\n`;
      
      // Pull formula info if defined in customContent
      const custom = seoData.customContent[calc.slug];
      if (custom && custom.formula) {
        if (calc.slug === 'mortgage-calculator') {
          md += `  - Formula: \`M = P * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]\`\n`;
          md += `  - Canadian Compounding Rate: \`r = (1 + annual_rate / 2)^(2/12) - 1\` (compounded semi-annually under Interest Act)\n`;
          md += `  - Reference Scenario: $400,000 Home, $40,000 Down (10%), 30-year Amortization, 5.0% Interest Rate -> Monthly Payment = $1,921.29\n`;
        } else {
          md += `  - Formula: \`${custom.formula}\`\n`;
        }
      }
    });
    md += `\n`;
  });

  md += `## About CalcUni

CalcUni provides verified calculation tools built on standard mathematical formulas. For any questions or support, visit our [Contact Page](https://calcuni.com/contact.html).
`;

  fs.writeFileSync(path.join(rootDir, 'llms.txt'), md, 'utf8');
  console.log('llms.txt generated successfully!');
}

// Main execution
function main() {
  // 1. Process Homepage
  processHomepage(path.join(rootDir, 'index.html'));

  // 2. Process Info and Legal Pages
  processInfoPage(path.join(rootDir, 'about.html'), 'about');
  processInfoPage(path.join(rootDir, 'contact.html'), 'contact');
  processInfoPage(path.join(rootDir, 'privacy.html'), 'privacy');
  processInfoPage(path.join(rootDir, 'terms.html'), 'terms');
  processInfoPage(path.join(rootDir, 'disclaimer.html'), 'disclaimer');
  processInfoPage(path.join(rootDir, 'sitemap.html'), 'sitemap');
  processInfoPage(path.join(rootDir, '404.html'), '404');

  // 3. Process Blog Directory
  const blogIndex = path.join(rootDir, 'blog', 'index.html');
  if (fs.existsSync(blogIndex)) {
    processInfoPage(blogIndex, 'blog');
  }

  const blogDir = path.join(rootDir, 'blog');
  if (fs.existsSync(blogDir)) {
    const items = fs.readdirSync(blogDir);
    items.forEach(item => {
      const itemPath = path.join(blogDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const postIndex = path.join(itemPath, 'index.html');
        if (fs.existsSync(postIndex)) {
          processInfoPage(postIndex, 'blog-post');
        }
      }
    });
  }

  // 4. Process Categories and Calculators
  Object.keys(categories).forEach(catKey => {
    const catDir = path.join(rootDir, catKey);

    // Process category index
    const catIndex = path.join(catDir, 'index.html');
    if (fs.existsSync(catIndex)) {
      processCategoryPage(catIndex, catKey);
    }

    // Process individual calculators
    categories[catKey].calculators.forEach(calc => {
      const calcDir = path.join(catDir, calc.slug);
      const calcIndex = path.join(calcDir, 'index.html');
      if (fs.existsSync(calcIndex)) {
        processCalculatorPage(calcIndex, catKey, calc.slug);
      } else {
        console.warn(`Calculator index file not found: ${calcIndex}`);
      }
    });
  });

  // 5. Generate dynamic crawlers files
  generateSitemap();
  generateRobotsTxt();
  generateLLMSTxt();

  console.log('All files processed successfully!');
}

main();
