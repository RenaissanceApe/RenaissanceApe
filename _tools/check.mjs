/* Runs every site check. Exits non-zero if any finds a problem.
 *
 *   node _tools/check.mjs                 # all checks
 *   node _tools/check.mjs --only links    # one check
 *   node _tools/check.mjs --list          # names
 */
import * as htmlStructure from './checks/html-structure.mjs';
import * as links from './checks/links.mjs';
import * as parity from './checks/parity.mjs';
import * as contrast from './checks/contrast.mjs';
import * as sharedLogic from './checks/shared-logic.mjs';
import * as baseCss from './checks/base-css.mjs';

const CHECKS = [htmlStructure, links, parity, contrast, sharedLogic, baseCss];

const argv = process.argv.slice(2);
if (argv.includes('--list')) {
  for (const c of CHECKS) console.log(c.name);
  process.exit(0);
}
const only = argv.includes('--only') ? argv[argv.indexOf('--only') + 1] : null;
const selected = only ? CHECKS.filter(c => c.name === only) : CHECKS;
if (only && !selected.length) {
  console.error(`no such check: ${only}`);
  process.exit(2);
}

const MAX = 25;
let failed = 0;

for (const check of selected) {
  let findings;
  try {
    findings = await check.run();
  } catch (e) {
    console.log(`\x1b[31mERROR\x1b[0m  ${check.title}`);
    console.log(`   ${e.stack.split('\n').slice(0, 3).join('\n   ')}`);
    failed++;
    continue;
  }
  if (!findings.length) {
    console.log(`\x1b[32m  ok\x1b[0m  ${check.title}`);
    continue;
  }
  failed++;
  console.log(`\x1b[31mFAIL\x1b[0m  ${check.title} — ${findings.length} problem${findings.length > 1 ? 's' : ''}`);
  for (const f of findings.slice(0, MAX)) console.log(`   ${f.file}:${f.line}  ${f.message}`);
  if (findings.length > MAX) console.log(`   … and ${findings.length - MAX} more`);
}

console.log(failed ? `\n${failed} of ${selected.length} checks failed` : `\nall ${selected.length} checks passed`);
process.exit(failed ? 1 : 0);
