/**
 * CalcUni SEO Content & Schema Database
 * Contains formulas, worked examples, key FAQs, and category metadata
 * for all 55 calculators, used by the build pipeline (update_layout.js).
 */

const customContent = {
  // 1. Mortgage Calculator
  'mortgage-calculator': {
    formula: 'M = P * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
    formulaExplanation: 'Where: M = monthly payment, P = principal loan amount, r = monthly interest rate (annual interest rate divided by 12 months), and n = total number of monthly payments (loan term in years multiplied by 12).',
    example: 'For a $400,000 home purchase with a 10% down payment ($40,000), the loan principal (P) is $360,000. At an annual interest rate of 5% (monthly r = 0.05 / 12 = 0.004167) and a 30-year term (n = 30 * 12 = 360 payments):\n\nM = 360,000 * [ 0.004167(1.0004167)^360 ] / [ (1.0004167)^360 - 1 ]\nM = $1,932.90 per month (principal and interest).',
    faqs: [
      { q: 'What is included in a standard mortgage payment?', a: 'A standard mortgage payment consists of Principal (the amount borrowed) and Interest (the lender charge). It often also includes property taxes, home insurance (PITI), and private mortgage insurance (PMI) if your down payment was less than 20%.' },
      { q: 'How does a down payment affect my monthly mortgage?', a: 'A larger down payment reduces the total loan principal (P) you need to borrow, which directly lowers your monthly payment and saves you thousands in interest over the life of the loan. It can also help you avoid costly Private Mortgage Insurance (PMI).' },
      { q: 'What is the difference between fixed-rate and adjustable-rate mortgages?', a: 'A fixed-rate mortgage maintains the exact same interest rate and monthly payment for the entire term of the loan. An adjustable-rate mortgage (ARM) typically starts with a lower rate for a set period (e.g. 5 years) and then adjusts periodically based on market indexes.' },
      { q: 'How does amortization work in mortgages?', a: 'Mortgage amortization is the process of paying off your loan with regular payments. In the early years of the mortgage, the vast majority of your payment goes toward paying off the interest. Over time, the ratio shifts so that a larger portion goes toward paying off the principal.' },
      { q: 'How can I pay off my mortgage faster?', a: 'You can pay off your mortgage faster by making bi-weekly payments (which results in one extra full payment per year), adding an extra amount directly to the principal each month, or making a lump-sum payment when possible.' }
    ]
  },

  // 2. BMI Calculator
  'bmi-calculator': {
    formula: 'BMI = weight (kg) / [ height (m) ]^2  or  [ weight (lbs) / (height (in))^2 ] * 703',
    formulaExplanation: 'Where: weight is in kilograms or pounds, and height is in meters or inches. The metric system divides weight directly by squared height, whereas the imperial system multiplies the resulting ratio by a scaling factor of 703.',
    example: 'For an individual weighing 70 kilograms (154 lbs) who stands 1.75 meters (5 feet 9 inches) tall:\n\nMetric: BMI = 70 / (1.75 * 1.75) = 70 / 3.0625 = 22.86\nImperial: BMI = [ 154 / (69 * 69) ] * 703 = [ 154 / 4761 ] * 703 = 22.74\nBoth methods indicate a BMI of approximately 22.8, which falls squarely in the healthy range.',
    faqs: [
      { q: 'What are the standard adult BMI categories?', a: 'According to the World Health Organization (WHO), adult BMI classifications are: Underweight (BMI under 18.5), Healthy weight (BMI 18.5 to 24.9), Overweight (BMI 25.0 to 29.9), and Obese (BMI 30.0 or higher).' },
      { q: 'Is BMI an accurate measure of body fat and health?', a: 'BMI is a useful general screening tool but is not a direct measure of body fat percentage. It does not distinguish between muscle mass and fat. For example, athletes or bodybuilders with high muscle mass may be classified as "overweight" or "obese" despite having very low body fat.' },
      { q: 'How does the BMI formula differ for children and teens?', a: 'While children\'s BMI is calculated using the same basic height/weight formula, their results must be plotted on a growth percentile chart that accounts for age and sex, since body fat composition shifts rapidly during developmental growth.' },
      { q: 'What health risks are associated with a high BMI?', a: 'A consistently high BMI (in the obese range) is clinically linked to increased risks of chronic conditions, including cardiovascular disease, type 2 diabetes, high blood pressure, osteoarthritis, obstructive sleep apnea, and certain cancers.' },
      { q: 'How can I lower my BMI safely?', a: 'To reduce your BMI safely, focus on a gradual weight loss of 1 to 2 pounds per week. Achieve this through a balanced, calorie-controlled diet rich in whole foods, coupled with regular physical exercise (at least 150 minutes of moderate activity weekly).' }
    ]
  },

  // 3. Subnet Calculator
  'subnet-calculator': {
    formula: 'Subnets = 2^s  and  Hosts per Subnet = 2^h - 2',
    formulaExplanation: 'Where: s is the number of borrowed subnet bits, and h is the number of remaining host bits. We subtract 2 from the hosts count to account for the reserved Network Address (all host bits 0) and the Broadcast Address (all host bits 1).',
    example: 'For an IP address of 192.168.1.0 with a /26 CIDR mask (instead of the standard Class C /24 mask):\n\nBorrowed bits (s) = 26 - 24 = 2 bits.\nSubnets = 2^2 = 4 subnets.\nRemaining host bits (h) = 32 - 26 = 6 bits.\nHosts per Subnet = 2^6 - 2 = 64 - 2 = 62 usable IP addresses per subnet.',
    faqs: [
      { q: 'What is IP subnetting and why is it used?', a: 'Subnetting is the practice of dividing a single large physical network into multiple smaller, logical subnetworks. It is used to improve network security, manage broadcast traffic, isolate network issues, and conserve valuable IP address space.' },
      { q: 'Why do we subtract 2 from the hosts formula in subnetting?', a: 'We subtract 2 because the very first IP address in a subnet is reserved as the Network ID (used to identify the subnet itself), and the very last IP address is reserved as the Broadcast Address (used to send packets to all hosts in that subnet simultaneously).' },
      { q: 'What is a subnet mask and how does it work?', a: 'A subnet mask is a 32-bit number used to distinguish the network portion of an IP address from the host portion. In binary, "1" bits designate the network address while "0" bits designate the host address.' },
      { q: 'What does CIDR notation mean?', a: 'CIDR stands for Classless Inter-Domain Routing. It is a shorthand notation that represents a subnet mask by counting the number of network-representing "1" bits (e.g. /24 represents a mask of 255.255.255.0, where 24 bits are set to 1).' },
      { q: 'What is a default gateway?', a: 'A default gateway is the router IP address that hosts on a subnet use to communicate with external networks or the internet. It acts as the exit point for any traffic destined outside the local IP range.' }
    ]
  },

  // 4. GST/HST Calculator Canada
  'gst-hst-calculator-canada': {
    formula: 'Total Tax = Price * Tax Rate  and  Total Cost = Price + Total Tax',
    formulaExplanation: 'Where: Tax Rate is determined by the province or territory selected. The tax may consist of Federal GST (5%), Provincial Sales Tax (PST/RST/QST), or a combined Harmonized Sales Tax (HST).',
    example: 'For a purchase of $100 in Ontario (where the combined HST rate is 13%):\n\nTotal HST = $100 * 0.13 = $13.00\nTotal Cost = $100 + $13 = $113.00.\n\nIn British Columbia, where GST is 5% and PST is 7%:\nGST = $100 * 0.05 = $5.00\nPST = $100 * 0.07 = $7.00\nTotal Cost = $100 + $5 + $7 = $112.00.',
    faqs: [
      { q: 'What is the difference between GST, HST, and PST in Canada?', a: 'GST (Goods and Services Tax) is a 5% federal sales tax applied nationwide. PST (Provincial Sales Tax) is a provincial sales tax charged separately in provinces like BC, SK, and MB (and QST in Quebec). HST (Harmonized Sales Tax) is a single, combined tax rate that merges GST and PST in Atlantic provinces and Ontario.' },
      { q: 'Which Canadian provinces use HST?', a: 'The provinces that use Harmonized Sales Tax are Ontario (13% HST), New Brunswick (15% HST), Nova Scotia (15% HST), Prince Edward Island (15% HST), and Newfoundland and Labrador (15% HST).' },
      { q: 'How do you calculate GST/HST backwards from a total price?', a: 'To extract the net price before tax from a tax-inclusive total, divide the total by (1 + Tax Rate). For example, to find the pre-tax price of a $113 item in Ontario (13% HST): $113 / 1.13 = $100 pre-tax, meaning the HST portion is $13.' },
      { q: 'Are any items exempt from GST/HST in Canada?', a: 'Yes! Basic groceries, prescription medications, medical devices, residential rent, and educational services are standard "zero-rated" or exempt goods, meaning merchants do not charge GST/HST on these purchases.' },
      { q: 'What is the GST/HST credit?', a: 'The GST/HST credit is a tax-free quarterly payment from the Canada Revenue Agency (CRA) designed to help low- and modest-income Canadian individuals and families offset all or a portion of the sales taxes they pay.' }
    ]
  },

  // 5. ROI Calculator
  'roi-calculator': {
    formula: 'ROI (%) = [ (Net Profit / Cost of Investment) ] * 100',
    formulaExplanation: 'Where: Net Profit represents the final value of the investment minus the cost of the investment. A positive ROI indicates a gain, while a negative ROI indicates a net loss on the asset.',
    example: 'You buy shares of a stock for $5,000. One year later, you sell the shares for $6,500. You also paid $100 in transaction fees:\n\nGross Return = $6,500\nCost of Investment = $5,000 + $100 = $5,100\nNet Profit = $6,500 - $5,100 = $1,400\nROI = ( $1,400 / $5,100 ) * 100 = 27.45% return.',
    faqs: [
      { q: 'What is Return on Investment (ROI) and why is it important?', a: 'ROI is a fundamental financial metric used to evaluate the efficiency of an investment or compare the profitability of several different investments. It provides a simple, universal percentage showing how much profit was made relative to the amount invested.' },
      { q: 'What are the limitations of standard ROI?', a: 'The primary limitation of standard ROI is that it does not account for the element of time. An investment returning 50% over 5 years is less efficient than one returning 40% in 1 year. To compare investments of different lengths, you should calculate the Annualized ROI.' },
      { q: 'How do you calculate annualized ROI?', a: 'Annualized ROI accounts for the holding period. The formula is: Annualized ROI = [ (1 + ROI_decimal) ^ (1 / years) ] - 1. This converts a multi-year return into a standardized annual growth rate.' },
      { q: 'What is considered a "good" ROI?', a: 'A "good" ROI depends on your asset class, risk tolerance, and market conditions. For example, a standard annual return of 7% to 10% is typical for stock market index funds, while real estate or riskier business investments may target 12% to 15% or higher.' },
      { q: 'Does ROI include taxes and transaction fees?', a: 'To calculate an accurate net ROI, you must subtract all associated costs including brokerage fees, maintenance, interest on loans, and capital gains taxes from your gross profits. Omitting these will result in an artificially high gross ROI.' }
    ]
  },

  // 6. Concrete Calculator
  'concrete-calculator': {
    formula: 'Volume (Cubic Yards) = [ Length (ft) * Width (ft) * Thickness (in) ] / 324',
    formulaExplanation: 'Where: we multiply the area in square feet by the thickness in inches, and divide by 324 (which is 27 cubic feet per cubic yard multiplied by 12 inches per foot) to convert the three dimensions directly into cubic yards.',
    example: 'You plan to pour a concrete patio slab that measures 12 feet long, 10 feet wide, and 4 inches thick:\n\nVolume = (12 * 10 * 4) / 324 = 480 / 324 = 1.48 Cubic Yards.\nAdding a standard 10% wastage margin: 1.48 * 1.10 = 1.63 Cubic Yards total to order.',
    faqs: [
      { q: 'How much concrete volume should I order for wastage?', a: 'It is highly recommended to add a 10% wastage margin to your raw calculations. Slabs are rarely perfectly uniform, ground settling occurs, and some concrete always sticks to the mixer or is spilled during pouring.' },
      { q: 'How many 80-pound concrete bags are in a cubic yard?', a: 'It takes approximately forty-five (45) 80-pound bags of pre-mixed concrete to fill one single cubic yard. For a 60-pound bag, it takes about sixty (60) bags per cubic yard.' },
      { q: 'How thick should a standard concrete driveway or slab be?', a: 'A standard concrete patio or sidewalk slab should be 4 inches thick. For a driveway supporting standard cars and SUVs, a thickness of 4 to 5 inches is recommended, while heavy truck driveways should be 6 inches thick.' },
      { q: 'How long does it take for concrete to cure fully?', a: 'Concrete cures through a chemical reaction called hydration. It typically reaches about 70% of its full structural strength after 7 days, and reaches its standard full cured design strength after 28 days.' },
      { q: 'Why does concrete crack and how do I prevent it?', a: 'Concrete naturally shrinks slightly as it cures, which creates internal tension. To control and prevent random cracks, contractors cut contraction joints (grooves) at regular intervals to guide cracks along clean, hidden lines.' }
    ]
  },

  // 7. Age Calculator
  'age-calculator': {
    formula: 'Age = Target Date - Date of Birth',
    formulaExplanation: 'Calculates the elapsed duration between the two dates, breaking the total difference down dynamically into years, months, weeks, days, hours, and minutes, taking leap years into account.',
    example: 'For an individual born on June 15, 1990, calculating their age on June 15, 2026:\n\nAge = 2026-06-15 - 1990-06-15 = Exactly 36 Years. If calculated on October 15, 2026, their age would be 36 years and 4 months.',
    faqs: [
      { q: 'How does the age calculator handle leap years?', a: 'Our age calculator dynamically adjusts for leap years (which occur every 4 years and add February 29th). It computes the exact elapsed days between dates to ensure day counts are mathematically perfect.' },
      { q: 'Is my age calculated differently in different cultures?', a: 'In most western countries, age is calculated chronologically from birth, starting at 0 years old. In some traditional East Asian systems (such as Korean age), an individual is considered one year old at birth and gains a year on New Year\'s Day.' },
      { q: 'How many days have I been alive?', a: 'You can find the exact number of days you have been alive by selecting your birthday and the current date. The calculator will display the total age broken down into days, weeks, and months.' },
      { q: 'What is a half-birthday?', a: 'A half-birthday occurs exactly six months after your real birthday. For example, if your birthday is on January 15th, your half-birthday falls on July 15th.' },
      { q: 'How many months are between two specific dates?', a: 'To find the exact months between two dates, count the full calendar months elapsed and then calculate the remaining days as a fractional month. This calculator displays this breakdown instantly.' }
    ]
  },

  // 8. Fuel Cost Calculator
  'fuel-cost-calculator': {
    formula: 'Total Fuel Cost = [ Distance (mi or km) / Fuel Efficiency ] * Price per Unit',
    formulaExplanation: 'Where: Distance is divided by your car\'s average fuel efficiency (miles per gallon or liters per 100km) to find the total gallons/liters consumed, which is then multiplied by the fuel price.',
    example: 'You plan a driving road trip of 300 miles. Your vehicle gets an average fuel economy of 30 MPG, and the price of gasoline is $3.50 per gallon:\n\nFuel Consumed = 300 miles / 30 MPG = 10 gallons of gas.\nTotal Fuel Cost = 10 gallons * $3.50 = $35.00 total driving cost.',
    faqs: [
      { q: 'How can I estimate my vehicle\'s average fuel efficiency?', a: 'To estimate efficiency, fill your tank, reset your trip odometer, and drive normally. When you next fill up, record the trip distance and the exact fuel added. Divide the distance by the fuel added (or calculate L/100km) to get your real-world consumption rate.' },
      { q: 'What factors affect my car\'s real-world fuel economy?', a: 'Fuel efficiency is heavily influenced by driving habits (aggressive acceleration and braking), speeding, carrying heavy cargo loads, underinflated tires, excessive idling, and driving in extreme cold weather or stop-and-go city traffic.' },
      { q: 'Is it cheaper to drive or fly for a long trip?', a: 'To compare driving vs flying costs, calculate your total fuel cost, add road trip overheads (hotel stays, meals, tolls, parking), and compare that to the cost of plane tickets. Driving is usually much cheaper for families, while flying can be cheaper for solo travelers.' },
      { q: 'How do highway miles compare to city miles in fuel consumption?', a: 'Highway driving is almost always much more fuel-efficient than city driving because vehicles maintain a steady speed in higher gears, which minimizes engine load. City driving features constant idling and gear shifts that burn fuel rapidly.' },
      { q: 'Does using air conditioning burn more fuel?', a: 'Yes! Running your car\'s air conditioning system draws power from the engine, which can increase fuel consumption by 5% to 20% depending on the vehicle size and exterior temperature.' }
    ]
  },

  // 9. Password Generator
  'password-generator': {
    formula: 'Entropy = L * log2(R)',
    formulaExplanation: 'Where L is the password length, and R is the size of the pool of available characters (e.g. 26 lowercase, 26 uppercase, 10 digits, and 33 special characters). Higher entropy represents a mathematically stronger password that is harder to brute force.',
    example: 'A secure 12-character password using lowercase letters, uppercase letters, and numbers (pool size R = 26 + 26 + 10 = 62 characters):\n\nEntropy = 12 * log2(62) = 12 * 5.954 = 71.45 bits of cryptographic strength.',
    faqs: [
      { q: 'What makes a password truly secure and strong?', a: 'A secure password is long (at least 12-16 characters) and unpredictable. It should combine lowercase letters, uppercase letters, numeric digits, and special symbols, and must never contain personal information, dictionary words, or sequential patterns (like "1234").' },
      { q: 'Are passwords generated in my browser safe from interception?', a: 'Yes! This password generator runs entirely locally inside your web browser using client-side JavaScript. None of the passwords generated are sent over the network or saved to any server, making them 100% private.' },
      { q: 'What is password entropy and why does it matter?', a: 'Password entropy measures the cryptographic unpredictability of a password in bits. A higher entropy means a wider pool of possibilities, making it exponentially harder for automated hacker scripts to crack your password using brute-force attacks.' },
      { q: 'How often should I change my online passwords?', a: 'Security experts now recommend changing passwords only when there is a known data breach or security compromise on an account. Using unique, strong passwords for every account is much safer than changing them frequently.' },
      { q: 'Should I use a password manager?', a: 'Absolutely! A password manager is the safest way to store and organize unique, highly complex passwords for all your online accounts. It encrypts your database with a single master password, so you only have to remember one strong passphrase.' }
    ]
  }
};

// Category fallback metadata templates for all other calculators
const categoryTemplates = {
  'finance-calculators': {
    intro: 'This Finance calculator is a powerful tool designed to help you analyze loans, project compound interest growth, calculate monthly amortization schedules, and plan long-term savings or retirement goals. By inputting accurate financial variables, you can make informed decisions, manage debt, and align your investments with your personal financial timeline.',
    whatItDoes: 'It helps you perform standard interest calculations, divide payments into principal and interest splits, and map out long-term wealth compounding schedules. It allows you to model different financial scenarios (such as increasing your monthly savings, lowering interest rates, or adjusting loan terms) and visualize the direct financial impact immediately.',
    howToUse: [
      'Input the primary values such as principal amount, loan value, or starting balance.',
      'Enter the annual interest rate or rate of return as a percentage.',
      'Specify the time duration or payment term (usually in years or months).',
      'Select any relevant options (such as compounding frequency or additional contributions).',
      'Click the Calculate button to instantly view the calculated results, totals, and schedules.'
    ],
    formula: 'A = P * (1 + r/n)^(nt)',
    formulaExplanation: 'Where: A represents the future value of the investment or loan, P is the starting principal, r is the annual nominal interest rate, n is the number of times interest is compounded per year, and t is the total number of years elapsed.',
    example: 'For a starting investment balance of $10,000 at a 6% annual interest rate, compounded monthly (12 times a year) for 5 years: P = 10,000, r = 0.06, n = 12, t = 5. The total accumulated future value including interest will be: A = 10,000 * (1 + 0.06/12)^(12 * 5) = $13,488.50.',
    faqs: [
      { q: 'How does interest rate affect my overall calculations?', a: 'Even a small 0.5% change in your interest rate can result in thousands of dollars saved or paid over time. Lower interest rates minimize borrow cost, while higher interest rates accelerate compound investment returns.' },
      { q: 'Why is standard compounding frequency so important?', a: 'Compounding frequency determines how often interest is calculated and added back to your balance. The more frequently interest compounds (e.g. daily vs. annually), the faster your principal balance grows over time.' },
      { q: 'Can I use this tool to calculate monthly payments?', a: 'Yes! This finance tool calculates monthly repayment costs, divides payments between principal reduction and interest fees, and displays a complete breakdown.' },
      { q: 'Is it safe to enter my personal financial data?', a: 'Absolutely. All calculators on CalcUni run entirely in your local browser using client-side JavaScript code. No financial information is transmitted to our servers or shared with any third parties.' }
    ]
  },
  'health-calculators': {
    intro: 'This Health and fitness calculator is built to help you track vital wellness metrics, calculate target calorie intake, compute metabolic rates, and understand healthy ranges based on standard physiological formulas. Maintaining awareness of these metrics is key to structuring personal diet, exercise, and long-term health plans.',
    whatItDoes: 'It takes physiological inputs (such as age, gender, height, weight, and activity level) and processes them through peer-reviewed medical and nutritional formulas. The resulting outputs help you evaluate fitness baselines, plan weight management strategies, and target specific athletic performance indices.',
    howToUse: [
      'Enter your current physical measurements (weight, height, age).',
      'Select your biological sex, as calorie and body fat formulas utilize sex-specific coefficients.',
      'Select your typical daily physical activity level (ranging from sedentary to highly active).',
      'Click Calculate to see your custom wellness metrics and healthy category classifications.',
      'Use the results as a reference point for your fitness, dietary, or medical planning.'
    ],
    formula: 'BMR (Mifflin-St Jeor) = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + s',
    formulaExplanation: 'Where s represents a sex-specific constant: +5 for men, and -161 for women. This provides an estimate of your Basal Metabolic Rate (BMR), which represents the calories your body burns at complete rest.',
    example: 'For a 30-year-old female standing 165 cm tall and weighing 60 kg: BMR = (10 * 60) + (6.25 * 165) - (5 * 30) - 161 = 600 + 1031.25 - 150 - 161 = 1,320.25 calories per day required to maintain standard metabolic functions at rest.',
    faqs: [
      { q: 'What is Mifflin-St Jeor vs. Harris-Benedict?', a: 'These are the two most popular formulas used to calculate BMR. The Mifflin-St Jeor formula is newer, clinically proven to be highly accurate in modern studies, and is the standard formula utilized by CalcUni.' },
      { q: 'How does daily activity level affect my metabolic needs?', a: 'To estimate your Total Daily Energy Expenditure (TDEE), your BMR is multiplied by an activity factor (e.g. 1.2 for sedentary, 1.55 for moderate activity). The more active you are, the higher your daily caloric requirements.' },
      { q: 'Are health calculators accurate for clinical diagnosis?', a: 'No. These fitness tools are designed for general education and screening purposes. They do not replace professional medical evaluations, clinical diagnostics, or personalized advice from a registered dietitian or doctor.' },
      { q: 'How do height and weight affect health classifications?', a: 'Height and weight represent the core inputs for body mass index and structural ratios. These metrics provide a standardized statistical estimate of body composition relative to general populations.' }
    ]
  },
  'math-calculators': {
    intro: 'This Math and educational calculator is an essential resource for students, teachers, and professionals looking to perform complex mathematics quickly. It provides direct, highly accurate results for percentages, fractions, averages, GPA scores, and scientific functions, simplifying academic studies and daily arithmetic.',
    whatItDoes: 'It computes exact numerical conversions, solves equations, evaluates percentages, and formats mathematical operations with absolute precision. Rather than just returning an answer, it acts as an educational aid by outlining formulas and displaying clear, step-by-step arithmetic pathways.',
    howToUse: [
      'Input the primary numbers or equations into the designated fields.',
      'Select the specific mathematical operation or calculation mode you require.',
      'Check that inputs are formatted correctly (e.g. decimals, fractions, or negative values).',
      'Click Calculate to see the exact resulting values instantly.',
      'Review the formula box and worked example below the tool to learn the underlying math.'
    ],
    formula: 'Percentage = ( Part / Whole ) * 100',
    formulaExplanation: 'Represents the classic mathematical ratio of a subset relative to a total quantity, converted into a percentage by scaling the resulting fraction by a factor of 100.',
    example: 'To find what percentage 25 is of 125: Part = 25, Whole = 125. Percentage = (25 / 125) * 100 = 0.20 * 100 = 20%. This indicates that 25 represents exactly 20% of 125.',
    faqs: [
      { q: 'How can I convert a fraction into a percentage?', a: 'To convert any fraction to a percentage, simply divide the top number (numerator) by the bottom number (denominator) to get a decimal, then multiply by 100. For example, 3/4 = 0.75, which equals 75%.' },
      { q: 'Does this calculator handle decimals and negative numbers?', a: 'Yes! Our math tools fully support standard integer arithmetic, decimal formats, and negative values. Ensure minus signs are entered correctly.' },
      { q: 'Is this math tool suitable for academic grading and homework?', a: 'Absolutely. It is designed to help students check their homework, assist teachers in grading assignments, and help anyone verify manual math calculations rapidly.' },
      { q: 'How do GPA and course grade calculators estimate scores?', a: 'Grading tools take course percentages or letter grades, multiply them by course credit weights, sum the values, and divide by total credits to output weighted averages.' }
    ]
  },
  'tax-calculators': {
    intro: 'This Tax calculator is a comprehensive planning utility built to estimate sales taxes, provincial assessments, and payroll deductions. Managing tax obligations is crucial for personal budgeting and business invoicing, and this tool provides standard calculations based on active statutory rates.',
    whatItDoes: 'It processes transactional, gross income, or salary figures against current federal and provincial tax schedules. It computes GST, PST, HST, VAT, or payroll deductions (like CPP and EI in Canada) so you can quickly see tax obligations or estimate your net take-home salary.',
    howToUse: [
      'Enter the gross amount (retail price, hourly wage, or annual salary).',
      'Select the province, territory, or country to apply the appropriate tax rates.',
      'Choose the tax direction (calculate tax-exclusive add-on or tax-inclusive deduction).',
      'Click Calculate to view a detailed breakdown of federal tax, provincial tax, and final nets.',
      'Use the calculations as a reference guide for personal budgeting or invoice drafting.'
    ],
    formula: 'Net Salary = Gross Income - (Federal Tax + Provincial Tax + Payroll Contributions)',
    formulaExplanation: 'Where: Federal and Provincial taxes are computed using progressive bracket brackets or flat standard estimates, and payroll contributions include public pension plans and employment insurance.',
    example: 'For a gross bi-weekly wage of $2,000 in Ontario: Federal Tax (approx 15%) = $300, Provincial Tax (approx 8%) = $160, CPP (5.95%) = $119, EI (1.66%) = $33. Total deductions = $612. Take-home Net = $2,000 - $612 = $1,388.',
    faqs: [
      { q: 'Are these tax calculations legally binding for filing?', a: 'No. These tax tools are designed for personal budgeting and informational estimation purposes only. Actual tax liabilities must be computed using official government portals or verified by a licensed CPA.' },
      { q: 'How often are the tax rates updated in this calculator?', a: 'We regularly audit and update the sales tax and income tax rates to reflect current government guidelines and provincial budgets for the active fiscal year.' },
      { q: 'Does this calculator support tax-inclusive pricing?', a: 'Yes! Most of our sales tax tools allow you to calculate backwards from a final tax-inclusive price to extract the original pre-tax value and the tax portion.' },
      { q: 'How does province of residence affect Canadian income tax?', a: 'Canadian income tax is progressive and consists of both Federal and Provincial brackets. Each province sets its own tax rates and brackets, meaning a worker in Alberta pays a different amount of provincial tax than a worker in Quebec.' }
    ]
  },
  'conversion-calculators': {
    intro: 'This Conversion calculator is an ultra-fast, responsive utility built to convert between metric and imperial measurements, international currencies, and digital data storage sizes. Accurate conversion is essential in logistics, academic science, international trade, cooking, and daily communications.',
    whatItDoes: 'It takes an input value in one specific unit and applies precise scientific multipliers or real-time currency exchange indexes to convert it into a target unit. It eliminates the risk of manual conversion mathematical errors and provides immediate results across diverse units.',
    howToUse: [
      'Enter the numerical value you wish to convert in the input field.',
      'Select the original unit of measurement from the dropdown list.',
      'Select the target unit of measurement you wish to convert to.',
      'Click Calculate (or observe instant live updates as you type).',
      'View the converted value alongside standard conversion ratios.'
    ],
    formula: 'Target Value = Source Value * Conversion Multiplier',
    formulaExplanation: 'Where the conversion multiplier is a fixed scientific constant defining the exact ratio of the target unit relative to the source unit (e.g. 1 inch = 2.54 cm).',
    example: 'To convert 10 inches to centimeters (since 1 inch is exactly 2.54 centimeters): Target = 10 * 2.54 = 25.4 cm. To convert back: 25.4 / 2.54 = 10 inches.',
    faqs: [
      { q: 'What is the difference between Metric and Imperial units?', a: 'The Metric system is a decimal-based system used globally (meters, kilograms, liters). The Imperial system is primarily used in the United States and United Kingdom (inches, feet, pounds, gallons). This tool supports seamless conversions between both.' },
      { q: 'How accurate are the currency converter rates?', a: 'Currency conversions are estimated using standard reference exchange rates that are updated periodically. They should be used for informational reference, as retail bank rates will vary slightly.' },
      { q: 'How do I convert temperature between Celsius and Fahrenheit?', a: 'Unlike standard multiplicative units, temperature conversions use an offset. The formula is: °F = (°C * 9/5) + 32, and °C = (°F - 32) * 5/9.' },
      { q: 'What is cm to inches and kg to lbs conversion ratios?', a: '1 centimeter is equal to approximately 0.3937 inches. 1 kilogram is equal to approximately 2.2046 pounds.' }
    ]
  },
  'date-time-calculators': {
    intro: 'This Date and Time calculator is a scheduling and chronological planning tool designed to determine age, count intervals between dates, calculate business days, and total hourly durations. Structuring timelines is vital for project management, timesheet reporting, and landmark scheduling.',
    whatItDoes: 'It processes date-picker inputs and timestamps, counts exact days while adjusting for leap years, and filters out weekend days to provide precise chronological durations. It simplifies timesheet tracking, contract timeline audits, and biological age determinations.',
    howToUse: [
      'Select your starting date or starting time using the picker interface.',
      'Select your ending target date or time.',
      'Adjust options such as excluding weekends or including the end date in calculations.',
      'Click Calculate to see the exact elapsed years, months, weeks, days, or hours.',
      'Use the chronological results for schedules, payroll sheets, or age tracking.'
    ],
    formula: 'Days Elapsed = End Date - Start Date (minus weekends if calculating business days)',
    formulaExplanation: 'Calculates the raw calendar days between two milestones. For business day calculations, Saturday and Sunday dates are filtered out of the resulting set.',
    example: 'To find the number of business days between October 1 and October 15, 2026: The total span is 14 calendar days. There are 2 weekends (4 days total) within this range. Business Days = 14 - 4 = 10 working days.',
    faqs: [
      { q: 'Does the business day calculator exclude statutory holidays?', a: 'Our business days tool excludes standard weekends (Saturdays and Sundays) but does not automatically subtract regional statutory holidays, since holidays vary widely by country, state, and province.' },
      { q: 'How does this tool help optimize featured snippet answers?', a: 'By structuring clear heading tags and providing a concise paragraph summarizing elapsed days, it helps search engines index quick chronological answers directly in search results.' },
      { q: 'Can I use this calculator to track hours worked for payroll?', a: 'Yes! The hours calculator allows you to enter clock-in and clock-out times, subtract unpaid breaks, and sum up total hours worked for daily or weekly timesheets.' },
      { q: 'How is time duration calculated in 24-hour formats?', a: 'The tool converts AM/PM entries or 24-hour timestamps into standard elapsed minutes, sums the total, and displays it in decimal formats (e.g. 8 hours and 30 minutes = 8.5 hours).' }
    ]
  },
  'construction-calculators': {
    intro: 'This Construction and building estimator is a practical planning tool designed for homeowners, DIY enthusiasts, and building contractors. Estimating building materials accurately is essential to control project costs, buy correct supplier quantities, and minimize job-site material waste.',
    whatItDoes: 'It translates structural dimensions (length, width, height, thickness) into volume or area estimations for concrete, roofing shingles, wall paint, flooring tiles, and square footage. It incorporates standard material wastage margins to provide highly realistic purchasing estimations.',
    howToUse: [
      'Measure the dimensions of your construction site (length, width, height, or radius).',
      'Select your measurement units (metric or imperial).',
      'Input structural parameters such as tile size, paint coats, or slab thickness.',
      'Input your desired wastage margin percentage (10% is standard).',
      'Click Calculate to view estimated material counts, volume, and total bundles.'
    ],
    formula: 'Materials Needed = [ Area or Volume / Coverage per Unit ] * (1 + Wastage Margin)',
    formulaExplanation: 'Where: coverage per unit represents standard manufacture specifications (e.g., a gallon of paint covers approx 350 sq ft, and a bundle of shingles covers 33.3 sq ft).',
    example: 'To tile a room measuring 10x12 feet (120 sq ft) using 12x12 inch tiles (1 sq ft per tile): Raw count = 120 / 1 = 120 tiles. Adding a 10% waste factor: 120 * 1.10 = 132 tiles needed to purchase.',
    faqs: [
      { q: 'Why do I need a wastage margin in construction?', a: 'Wastage is critical because tiles must be cut to fit corners, shingles are trimmed at roof edges, paint is absorbed by raw drywall, and concrete can settle or spill. A 10% wastage buffer prevents running out of materials mid-job.' },
      { q: 'What is square footage and how do I calculate it?', a: 'Square footage measures the 2D surface area of a space. For rectangles, it is calculated as: `Length (ft) * Width (ft) = Square Footage`. For irregular rooms, divide the area into smaller rectangles, calculate each, and add them together.' },
      { q: 'How much area does one standard gallon of paint cover?', a: 'A standard gallon of quality wall paint typically covers approximately 350 to 400 square feet of smooth, primed wall surface with a single coat.' },
      { q: 'Can I use these construction estimates for final contractor bidding?', a: 'These tools are excellent planning utilities to check contractor bids and estimate material budgets. However, you should always consult your local contractor or professional supplier for a final physical site audit before ordering materials.' }
    ]
  },
  'business-calculators': {
    intro: 'This Business and commercial calculator is a strategic tool designed for entrepreneurs, retail managers, sales representatives, and financial analysts. Monitoring profitability metrics, setting correct markups, and understanding return ratios is essential to maintaining a solvent, growing business operation.',
    whatItDoes: 'It processes transactional sales data, cost of goods sold (COGS), capital investments, and commission rates to estimate profit margins, markup pricing, break-even volumes, commissions, and Return on Investment (ROI). It provides immediate clarity on financial health and pricing models.',
    howToUse: [
      'Enter the raw financial inputs such as item cost, capital expenses, or sales volume.',
      'Enter the markup percentage, target revenue, or broker commission rate.',
      'Click Calculate to see the calculated profit, margin ratios, break-even unit thresholds, or payouts.',
      'Analyze the results to optimize pricing models, evaluate marketing campaigns, or structure payroll.'
    ],
    formula: 'Gross Profit Margin (%) = [ (Revenue - Cost of Goods Sold) / Revenue ] * 100',
    formulaExplanation: 'Computes the percentage of revenue that remains after covering the direct costs of producing or purchasing the goods sold, indicating direct operational pricing efficiency.',
    example: 'An item costs $50 to purchase, and you sell it for $80: Revenue = $80, COGS = $50. Gross Profit = $80 - $50 = $30. Gross Margin = ($30 / $80) * 100 = 37.5%. Markup on cost = ($30 / $50) * 100 = 60%.',
    faqs: [
      { q: 'What is the difference between Margin and Markup?', a: 'Margin is the profit expressed as a percentage of the selling price (e.g. profit divided by sales). Markup is the profit expressed as a percentage of the cost price (e.g. profit divided by cost). A 50% markup corresponds to a 33.3% profit margin.' },
      { q: 'What does a break-even analysis show?', a: 'A break-even analysis calculates the exact point where total business revenues equal total business costs (fixed + variable). Selling beyond this unit threshold generates net profit, while selling below it results in a net loss.' },
      { q: 'How does sales commission tracking improve broker relations?', a: 'Clear, transparent commission calculations ensure that agents, sales representatives, and brokers are paid accurately according to tiered contract percentages, eliminating pay discrepancies.' },
      { q: 'How can businesses improve their gross profit margin?', a: 'To improve your gross profit margin, you must either increase the retail selling price of your goods, negotiate lower wholesale acquisition costs (COGS) from suppliers, or reduce direct material waste in manufacturing.' }
    ]
  },
  'transportation-calculators': {
    intro: 'This Transportation and travel cost calculator is a practical utility designed for daily commuters, fleet managers, and road-trip travelers. Estimating fuel economy, gas costs, EV charging times, and travel durations helps manage transportation budgets, lower carbon footprints, and plan efficient driving schedules.',
    whatItDoes: 'It calculates trip costs by processing travel distance against fuel efficiency (MPG or L/100km) and fuel prices. It also features converters for EV battery charging times and travel time durations, providing a comprehensive travel log planner.',
    howToUse: [
      'Enter your total planned travel distance in miles or kilometers.',
      'Enter your vehicle\'s average fuel efficiency (or EV battery capacity in kWh).',
      'Input the current retail cost of gasoline per gallon/liter (or local utility electricity rates).',
      'Click Calculate to instantly view estimated trip costs, fuel quantities, or charging times.',
      'Use the data to compare commuting costs, plan road budgets, or evaluate EV efficiency.'
    ],
    formula: 'MPG = Miles Driven / Gallons of Fuel Used',
    formulaExplanation: 'The standard measurement of a vehicle\'s fuel economy in the United States and UK, representing the average distance traveled per gallon of fuel consumed.',
    example: 'You drove 400 miles on a single tank of fuel, and refilling the tank required 16 gallons of gas: MPG = 400 / 16 = 25 Miles Per Gallon.',
    faqs: [
      { q: 'How does an EV charging cost compare to gasoline costs?', a: 'Electric vehicles (EVs) are typically much cheaper to run than gas-powered cars. An EV charging to travel 100 miles using home electricity rates often costs 60% to 75% less than the gasoline required to drive a standard vehicle the same distance.' },
      { q: 'Why does my car get lower fuel efficiency than the manufacturer sticker?', a: 'Manufacturer MPG ratings are obtained in optimized laboratory tests. Real-world fuel economy is lower due to aerodynamic drag at high speeds, cold weather engine friction, running air conditioning, and heavy traffic idling.' },
      { q: 'How does travel time calculator estimate arrival times?', a: 'The travel time tool divides distance by average speed (Duration = Distance / Speed). To get realistic arrival times, you must add buffer stops for rest breaks, refueling, and typical traffic delays.' },
      { q: 'How can I improve my car\'s fuel efficiency?', a: 'You can improve efficiency by keeping your tires properly inflated, driving at steady speeds, minimizing rapid accelerations, removing heavy clutter from the trunk, and keeping your engine regularly serviced.' }
    ]
  },
  'everyday-calculators': {
    intro: 'This Everyday quick-helper calculator is designed to provide immediate answers to common, routine arithmetic questions. Splitting restaurant bills, calculating promotional discounts, planning sleep cycles, generating passwords, or picking random numbers should be fast and simple, and this lightweight tool does exactly that.',
    whatItDoes: 'It performs rapid percentage calculations, runs secure randomized algorithms, and processes human sleep schedules instantly. It features a highly responsive user interface designed for immediate touch interactions on mobile phones.',
    howToUse: [
      'Input your baseline values (total bill cost, items counts, or password length).',
      'Select any modifiers (tip percentage, discount rate, or character inclusions).',
      'Observe the instant mathematical results calculated in real-time.',
      'Copy generated results (like passwords) or share calculated splits among friends.'
    ],
    formula: 'Discounted Price = Original Price * (1 - Discount Percentage)',
    formulaExplanation: 'Determines the final retail price of a product after subtracting a promotional discount rate from the original price tag.',
    example: 'A jacket originally costs $80, and is currently on sale for 25% off: Discounted Price = $80 * (1 - 0.25) = $80 * 0.75 = $60.00. You save exactly $20.',
    faqs: [
      { q: 'How does the sleep calculator plan bedtime?', a: 'The sleep tool is based on standard 90-minute human sleep cycles. Waking up at the end of a cycle (e.g. after 5 or 6 full cycles, representing 7.5 or 9 hours) helps you feel refreshed and prevents groggy waking.' },
      { q: 'Is the random number generator truly random?', a: 'Our random generator utilizes secure browser-based pseudo-random number algorithms (Math.random) that are highly effective for everyday contests, picking winners, or game play.' },
      { q: 'How does the tip calculator handle splitting a bill?', a: 'The tip tool takes the total restaurant bill, adds your chosen tip percentage, and divides the grand total equally by the number of people in your dining party to show exactly what each person owes.' },
      { q: 'Are these everyday tools optimized for fast mobile loading?', a: 'Yes! These tools feature clean, lightweight code and minimal asset weight, ensuring they load instantly even on slow mobile data connections.' }
    ]
  },
  'technology-calculators': {
    intro: 'This Technology and networking calculator is a specialized utility built for software engineers, network administrators, IT professionals, and computer science students. Planning network architecture, converting data representations, and masking subnets requires absolute technical precision.',
    whatItDoes: 'It converts decimal numbers to binary representations, evaluates network address scopes, maps subnets, and converts data storage metrics (MB, GB, TB). It provides clean, developer-friendly outputs suited for system administration and software development.',
    howToUse: [
      'Enter your technical inputs (IP addresses, binary strings, or storage values).',
      'Select your calculation options (subnet CIDR mask, binary bits, or target storage scale).',
      'Click Calculate to see binary grids, subnet host counts, or networking boundaries.',
      'Copy the technical specifications directly for network configuration sheets.'
    ],
    formula: 'Storage Conversion: 1 GB = 1,024 MB  and  1 GiB = 1,024 MiB',
    formulaExplanation: 'Differentiates between standard decimal scales (base 10, where 1 GB = 10^9 bytes) and operating system binary scales (base 2, where 1 GiB = 2^30 bytes).',
    example: 'To convert 5 Gigabytes (GB) to Megabytes (MB): 5 GB * 1,000 = 5,000 MB. To convert 5 Gibibytes (GiB) to Mebibytes (MiB): 5 GiB * 1,024 = 5,120 MiB.',
    faqs: [
      { q: 'What is the difference between GB (Gigabyte) and GiB (Gibibyte)?', a: 'A Gigabyte (GB) is a decimal unit based on power-of-10 (1 GB = 1,000,000,000 bytes), commonly used by hardware manufacturers. A Gibibyte (GiB) is a binary unit based on power-of-2 (1 GiB = 1,073,741,824 bytes), which is how operating systems like Windows calculate storage sizes.' },
      { q: 'How does an IP calculator determine address classes?', a: 'The IP tool checks the first octet of an IPv4 address. Class A ranges from 1-126, Class B ranges from 128-191, Class C ranges from 192-223, Class D (Multicast) ranges from 224-239, and Class E is reserved.' },
      { q: 'What is data bandwidth transfer duration?', a: 'Bandwidth transfer duration measures how long it takes to download or upload a file of a specific size over an internet connection of a set speed (Duration = File Size / Transfer Speed).' },
      { q: 'Why is binary calculation important in computer science?', a: 'Computers utilize binary digits (0 and 1) representing off and on electrical states at the hardware level. All programming, file structures, and network routing are ultimately grounded in binary mathematical logic.' }
    ]
  }
};

/**
 * Returns complete SEO content (HTML) for a calculator page.
 */
function getSEOContentHTML(catKey, slug, calcName, relatedCalculators) {
  // Retrieve custom metadata or use category fallback templates
  let data = customContent[slug];
  const fallback = categoryTemplates[catKey] || categoryTemplates['finance-calculators'];

  if (!data) {
    // Generate intelligent default details matching this specific calculator
    data = {
      formula: fallback.formula,
      formulaExplanation: fallback.formulaExplanation,
      example: fallback.example.replace(/investment/g, slug.replace(/-/g, ' ')),
      faqs: fallback.faqs.map(faq => ({
        q: faq.q.replace(/calculator/g, calcName).replace(/calculations/g, calcName + ' calculations'),
        a: faq.a.replace(/calculator/g, calcName)
      }))
    };
  }

  // Double check that we have 4-6 FAQs
  if (data.faqs.length < 4) {
    data.faqs.push(
      { q: `How does the ${calcName} calculate results?`, a: `The ${calcName} processes your numerical input fields, applies the standard mathematical formula for ${calcName.toLowerCase()} calculations, and provides an instant output. All calculations occur client-side in real-time.` },
      { q: `Is the ${calcName} free to use?`, a: `Yes! The ${calcName} on CalcUni is 100% free, requires no user registration, and does not capture or store any of your private input data.` }
    );
  }

  // Construct Related Calculators HTML
  const relatedHTML = relatedCalculators && relatedCalculators.length > 0 ? `
    <div class="related-calculators-section">
      <h3 class="seo-subtitle">Related Calculators</h3>
      <p class="seo-paragraph">Explore these other helpful tools from our ${fallback.intro.split(' ')[1]} category:</p>
      <div class="related-grid">
        ${relatedCalculators.map(c => `<a class="related-link" href="../${c.slug}/">${c.name}</a>`).join('')}
      </div>
    </div>
  ` : '';

  // Return the full structured SEO content block
  return `
    <section class="calculator-seo-content">
      <h2 class="seo-title">About the ${calcName}</h2>
      <p class="seo-paragraph">${customContent[slug] ? `The ${calcName} is a high-precision online utility engineered to make calculations fast, reliable, and accessible. Whether you are budgeting, auditing records, studying, or planning projects, this tool eliminates manual math errors and outputs immediate results.` : fallback.intro}</p>
      
      <h3 class="seo-subtitle">What the ${calcName} Does</h3>
      <p class="seo-paragraph">${customContent[slug] ? `Our ${calcName} processes your inputs instantly and provides a comprehensive breakdown. By utilizing this online tool, you save time, ensure mathematical accuracy, and can rapidly test different scenarios side-by-side to understand how changes in your variables affect your totals.` : fallback.whatItDoes}</p>
      
      <h3 class="seo-subtitle">How to Use the ${calcName}</h3>
      <ol class="seo-paragraph" style="padding-left: 20px; margin-bottom: 24px;">
        ${(customContent[slug] ? fallback.howToUse : fallback.howToUse).map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
      </ol>
      
      <h3 class="seo-subtitle">The ${calcName} Formula</h3>
      <p class="seo-paragraph">The calculation relies on the following standard formula:</p>
      <div class="formula-box">${data.formula}</div>
      <p class="seo-paragraph">${data.formulaExplanation}</p>
      
      <h3 class="seo-subtitle">Step-by-Step Worked Example</h3>
      <div class="example-box">
        <div class="example-title">Example Calculation</div>
        <p class="seo-paragraph" style="margin-bottom: 0; font-family: monospace; white-space: pre-wrap; font-size: 14px;">${data.example}</p>
      </div>
      
      <h2 class="seo-title" style="margin-top: 40px;">Frequently Asked Questions (FAQs)</h2>
      <div class="faq-accordion">
        ${data.faqs.map((faq, index) => `
          <div class="faq-item">
            <h4 class="faq-question">❓ ${faq.q}</h4>
            <p class="faq-answer">${faq.a}</p>
          </div>
        `).join('')}
      </div>

      ${relatedHTML}
    </section>
  `;
}

/**
 * Returns JSON-LD Schema string for a calculator page.
 */
function getJSONLD(catKey, slug, calcName, canonicalUrl, relatedCalculators) {
  let data = customContent[slug];
  const fallback = categoryTemplates[catKey] || categoryTemplates['finance-calculators'];
  
  if (!data) {
    data = {
      faqs: fallback.faqs,
      formula: fallback.formula,
      formulaExplanation: fallback.formulaExplanation
    };
  }

  // 1. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calcName,
    "description": `Free online ${calcName.toLowerCase()}. Fast, easy, and mobile-friendly tool.`,
    "applicationCategory": catKey === 'finance-calculators' || catKey === 'business-calculators' ? "BusinessApplication" : "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires HTML5 and Javascript enabled",
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 2. BreadcrumbList Schema
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
        "name": fallback.intro.split(' ')[1] + " Calculators",
        "item": `https://calcuni.com/${catKey}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": calcName,
        "item": canonicalUrl
      }
    ]
  };

  // 3. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return `
    <script type="application/ld+json">
      ${JSON.stringify(webAppSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    <script type="application/ld+json">
      ${JSON.stringify(faqSchema, null, 2)}
    </script>
  `;
}

module.exports = {
  customContent,
  getSEOContentHTML,
  getJSONLD
};
