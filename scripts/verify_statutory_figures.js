#!/usr/bin/env node
/**
 * scripts/verify_statutory_figures.js
 *
 * Reads statutory_inventory.json, fetches each figure's source_url,
 * and attempts to verify the stored value is still current.
 *
 * OUTPUT per figure:
 *   MATCH            — value confirmed present; verification_date updated in inventory
 *   MISMATCH         — value not found; a candidate replacement was extracted nearby
 *   COULD_NOT_VERIFY — page unreachable, structure changed, or extraction ambiguous
 *                      Treated as "needs human attention" — never "assume unchanged"
 *
 * HARD RULES:
 *   - NEVER modifies any calculator HTML or JS file
 *   - Only writes to statutory_inventory.json (verification_date on MATCH only)
 *   - Writes verification_report.md summarising all non-MATCH results
 */

'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const INVENTORY_PATH       = path.join(__dirname, '..', 'statutory_inventory.json');
const REPORT_PATH          = path.join(__dirname, '..', 'verification_report.md');
const REQUEST_TIMEOUT_MS   = 20_000;
const BETWEEN_REQUEST_MS   = 2_500; // polite delay between government page fetches

// ─── HTTP fetch with redirect following ──────────────────────────────────────

function fetchUrl(url, maxRedirects = 6) {
  return new Promise((resolve, reject) => {
    const attempt = (currentUrl, remaining) => {
      let parsed;
      try { parsed = new URL(currentUrl); } catch (e) {
        return reject(new Error(`Invalid URL: ${currentUrl}`));
      }

      const lib = parsed.protocol === 'https:' ? https : http;
      const req = lib.get(currentUrl, {
        headers: {
          'User-Agent': 'CalcUni-StatutoryVerifier/1.0 (+https://calcuni.com; statutory-compliance-checker)',
          'Accept':     'text/html,application/xhtml+xml,text/plain',
        },
      }, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          if (remaining <= 0) return reject(new Error(`Too many redirects: ${currentUrl}`));
          const next = new URL(res.headers.location, currentUrl).href;
          return attempt(next, remaining - 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} from ${currentUrl}`));
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => body += chunk);
        res.on('end',  ()    => resolve(body));
        res.on('error', reject);
      });

      req.setTimeout(REQUEST_TIMEOUT_MS, () => {
        req.destroy(new Error(`Timeout (${REQUEST_TIMEOUT_MS}ms) fetching ${currentUrl}`));
      });
      req.on('error', reject);
    };
    attempt(url, maxRedirects);
  });
}

// ─── HTML → plain text ───────────────────────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/\s+/g,    ' ')
    .trim();
}

// ─── Value extraction helpers ─────────────────────────────────────────────────

/**
 * "presence" strategy:
 * Simply checks whether value_formatted appears anywhere in the page text.
 * Best for large dollar amounts like "74,600" or "68,900" that are unique on
 * their respective CRA table pages.
 *
 * Returns { found: true } or { found: false, candidateNear: string|null }
 */
function checkPresence(pageText, figure) {
  const target = figure.value_formatted;

  if (pageText.includes(target)) {
    return { found: true };
  }

  // Value not found — try to extract a candidate value near the label hint
  // so we can include it in the MISMATCH report for human review.
  const candidate = extractCandidateNearLabel(pageText, figure.label_hint, figure.unit);
  return { found: false, candidateNear: candidate };
}

/**
 * "label_context" strategy:
 * Locates label_hint in page text, then searches a 400-char window after it
 * for value_formatted. Falls back to candidate extraction on failure.
 *
 * Used for figures where the numeric value is too short to be unique on its own
 * (e.g. "25", "30", "5.25").
 *
 * Returns { found: true } | { found: false, candidateNear: string|null } | { ambiguous: true }
 */
function checkLabelContext(pageText, figure) {
  const label  = figure.label_hint.toLowerCase();
  const target = figure.value_formatted;
  const text   = pageText.toLowerCase();

  // Collect ALL occurrences of the label hint
  const indices = [];
  let start = 0;
  while (true) {
    const idx = text.indexOf(label, start);
    if (idx === -1) break;
    indices.push(idx);
    start = idx + 1;
  }

  if (indices.length === 0) {
    // Label not found at all — page structure likely changed
    return { found: false, candidateNear: null };
  }

  // Check each occurrence's 400-char window for the expected value
  const WINDOW = 400;
  for (const idx of indices) {
    const snippet = pageText.slice(idx, idx + WINDOW);
    if (snippet.includes(target)) {
      return { found: true };
    }
  }

  // Expected value not found near any label occurrence.
  // Extract a candidate from the first label occurrence's window.
  const firstSnippet = pageText.slice(indices[0], indices[0] + WINDOW);
  const candidate = extractCandidateFromSnippet(firstSnippet, figure.unit);
  return { found: false, candidateNear: candidate };
}

/**
 * Attempts to find a numeric value in page text near a label hint.
 * Used to populate the "candidate" field in MISMATCH results.
 */
function extractCandidateNearLabel(pageText, labelHint, unit) {
  const idx = pageText.toLowerCase().indexOf(labelHint.toLowerCase());
  if (idx === -1) return null;
  const snippet = pageText.slice(idx, idx + 400);
  return extractCandidateFromSnippet(snippet, unit);
}

/**
 * Extracts the first plausible numeric value from a text snippet,
 * based on the unit type of the figure being checked.
 */
function extractCandidateFromSnippet(snippet, unit) {
  if (unit === 'CAD') {
    // Look for dollar-formatted amounts: $74,600 or 74,600
    const m = snippet.match(/\$?\s*([\d]{2,3}(?:,\d{3})+(?:\.\d{1,2})?)/);
    return m ? m[1] : null;
  }
  if (unit === 'percent') {
    // Look for percentage figures like 5.25 or 5.25%
    const m = snippet.match(/\b(\d{1,2}\.\d{1,2})\s*%?/);
    return m ? m[1] : null;
  }
  if (unit === 'years') {
    // Look for small integers like 25, 30
    const m = snippet.match(/\b([1-9]\d?)\s*(?:-?\s*year)/i);
    return m ? m[1] : null;
  }
  return null;
}

// ─── Delay helper ────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Main verification loop ───────────────────────────────────────────────────

async function main() {
  console.log('=== CalcUni Statutory Figure Verifier ===\n');

  // Load inventory
  let inventory;
  try {
    inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'));
  } catch (e) {
    console.error(`FATAL: Could not read ${INVENTORY_PATH}: ${e.message}`);
    process.exit(1);
  }

  const today    = new Date().toISOString().slice(0, 10);
  const results  = [];
  let   modified = false;

  for (const figure of inventory.figures) {
    console.log(`\nChecking: ${figure.key}`);
    console.log(`  Source: ${figure.source_url}`);

    let result;

    try {
      const html      = await fetchUrl(figure.source_url);
      const pageText  = stripHtml(html);
      const strategy  = figure.check_strategy;

      let check;
      if (strategy === 'presence') {
        check = checkPresence(pageText, figure);
      } else if (strategy === 'label_context') {
        check = checkLabelContext(pageText, figure);
      } else {
        // Unknown strategy — flag for human review
        check = { found: false, candidateNear: null, unknownStrategy: true };
      }

      if (check.found) {
        console.log(`  ✓ MATCH — "${figure.value_formatted}" confirmed on page`);
        // Only allowed write: bump verification_date
        figure.verification_date = today;
        modified = true;
        result = { status: 'MATCH', key: figure.key, name: figure.name };
      } else {
        const candidate = check.candidateNear;
        if (candidate && candidate !== figure.value_formatted) {
          console.log(`  ✗ MISMATCH — expected "${figure.value_formatted}", candidate found: "${candidate}"`);
          result = {
            status: 'MISMATCH',
            key: figure.key,
            name: figure.name,
            storedValue: figure.value_formatted,
            candidateValue: candidate,
            sourceUrl: figure.source_url,
          };
        } else {
          console.log(`  ? COULD_NOT_VERIFY — value not located on page`);
          result = {
            status: 'COULD_NOT_VERIFY',
            key: figure.key,
            name: figure.name,
            storedValue: figure.value_formatted,
            reason: check.unknownStrategy
              ? `Unknown check_strategy: "${figure.check_strategy}"`
              : `"${figure.label_hint}" label found but "${figure.value_formatted}" not in nearby text`,
            sourceUrl: figure.source_url,
          };
        }
      }

    } catch (err) {
      console.log(`  ? COULD_NOT_VERIFY — fetch error: ${err.message}`);
      result = {
        status: 'COULD_NOT_VERIFY',
        key: figure.key,
        name: figure.name,
        storedValue: figure.value_formatted,
        reason: `Fetch error: ${err.message}`,
        sourceUrl: figure.source_url,
      };
    }

    results.push(result);

    // Polite delay between government page requests
    await delay(BETWEEN_REQUEST_MS);
  }

  // ── Write updated inventory (verification_date bumps only) ──────────────
  if (modified) {
    inventory.last_updated = today;
    fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
    console.log('\n✓ statutory_inventory.json updated (verification_date fields only)');
  }

  // ── Write verification report ────────────────────────────────────────────
  const mismatches    = results.filter(r => r.status === 'MISMATCH');
  const couldNotVerify = results.filter(r => r.status === 'COULD_NOT_VERIFY');
  const matches       = results.filter(r => r.status === 'MATCH');
  const hasIssues     = mismatches.length > 0 || couldNotVerify.length > 0;

  const reportLines = [];
  reportLines.push(`# Statutory Figure Verification Report`);
  reportLines.push(`**Run date:** ${today}`);
  reportLines.push(`**Total figures checked:** ${results.length}`);
  reportLines.push(`**MATCH:** ${matches.length} | **MISMATCH:** ${mismatches.length} | **COULD NOT VERIFY:** ${couldNotVerify.length}`);
  reportLines.push('');

  if (mismatches.length > 0) {
    reportLines.push('## ⚠️ MISMATCH — Manual Action Required');
    reportLines.push('> These figures were NOT found at their expected value on the source page.');
    reportLines.push('> A candidate replacement value was extracted. A human MUST verify before updating any calculator or inventory entry.');
    reportLines.push('');
    for (const r of mismatches) {
      reportLines.push(`### ${r.key} — ${r.name}`);
      reportLines.push(`- **Stored value:** \`${r.storedValue}\``);
      reportLines.push(`- **Candidate on page:** \`${r.candidateValue}\``);
      reportLines.push(`- **Source:** ${r.sourceUrl}`);
      reportLines.push(`- **Action:** Verify candidate value against source. If confirmed changed, manually update \`statutory_inventory.json\` AND all applicable calculator pages listed for this key.`);
      reportLines.push('');
    }
  }

  if (couldNotVerify.length > 0) {
    reportLines.push('## ❓ COULD NOT VERIFY — Human Review Required');
    reportLines.push('> These figures could not be checked automatically (page unreachable, structure changed, or extraction ambiguous).');
    reportLines.push('> This is NOT treated as "unchanged". A human must visit the source URL and confirm the value manually.');
    reportLines.push('');
    for (const r of couldNotVerify) {
      reportLines.push(`### ${r.key} — ${r.name}`);
      reportLines.push(`- **Stored value:** \`${r.storedValue}\``);
      reportLines.push(`- **Reason:** ${r.reason}`);
      reportLines.push(`- **Source:** ${r.sourceUrl}`);
      reportLines.push(`- **Action:** Visit the source URL manually and confirm the value is still \`${r.storedValue}\`. If confirmed, update \`verification_date\` in \`statutory_inventory.json\` manually.`);
      reportLines.push('');
    }
  }

  if (matches.length > 0) {
    reportLines.push('## ✅ MATCH — No Action Required');
    reportLines.push('`verification_date` has been updated in `statutory_inventory.json` for these entries.');
    reportLines.push('');
    for (const r of matches) {
      reportLines.push(`- **${r.key}** — ${r.name}`);
    }
    reportLines.push('');
  }

  const report = reportLines.join('\n');
  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`\n✓ Report written to ${REPORT_PATH}`);

  // ── Exit code signals to GitHub Actions whether issues need reporting ────
  process.exit(hasIssues ? 1 : 0);
}

main().catch(err => {
  console.error(`FATAL: ${err.message}`);
  process.exit(2);
});
