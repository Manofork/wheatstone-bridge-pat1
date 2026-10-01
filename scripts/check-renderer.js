/**
 * Guard rail checks for renderer/index.html.
 * Fails CI if required IDs, PAT defaults, the print bridge or the print stylesheet go missing.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'renderer', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const errors = [];

const requiredIds = [
  'vs', 'r1', 'r2', 'rx', 'tol', 'rs',
  'resetBtn', 'printBtn',
  'tolBreakdown', 'rxRange', 'rsRange', 'rsIdeal', 'answerBanner',
  'decisionRows', 'workedSteps', 'practicalRows', 'signRows'
];

const patDefaults = { vs: '9', r1: '3300', r2: '1800', rx: '2200', tol: '5', rs: '4180' };

for (const id of requiredIds) {
  if (!new RegExp(`id=["']${id}["']`).test(html)) {
    errors.push(`Missing required element id="${id}"`);
  }
}

for (const [id, expected] of Object.entries(patDefaults)) {
  const tag = html.match(new RegExp(`<input[^>]*id=["']${id}["'][^>]*>`));
  if (!tag || !new RegExp(`value=["']${expected}["']`).test(tag[0])) {
    errors.push(`PAT default for #${id} must be ${expected}`);
  }
}

if (!html.includes('window.electronAPI')) errors.push('Electron print bridge (window.electronAPI) not referenced');
if (!/@media\s+print/.test(html)) errors.push('Print stylesheet (@media print) missing');
if (!/MathJax/.test(html)) errors.push('MathJax configuration missing');
if (!/MJ MAAKE/.test(html)) errors.push('Author attribution missing');
if (/\b0\d{2}[\s.-]?\d{3}[\s.-]?\d{4}\b/.test(html)) errors.push('A South African phone number appears; owner decision is email only');

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
console.log(`✔ renderer checks passed (${requiredIds.length} IDs, ${Object.keys(patDefaults).length} defaults)`);
