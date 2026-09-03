/* Check 6 — base.css is current.
 *
 * Wraps the existing extractor in report-only mode. base.css is generated and
 * committed by hand, so a page edited in the web UI can drift from it with
 * nothing noticing. This is what notices.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { root } from './lib.mjs';

export const name = 'base-css';
export const title = 'base.css is current (no extractable duplication)';

export function run() {
  /* Resolve the extractor next to this file, and run it from _tools/ so Node
     can find postcss there. Which site it inspects is set by SITE_ROOT, not
     by cwd — that separation is what lets the self-test fixture it. */
  const tools = path.resolve(import.meta.dirname, '..');
  const script = path.join(tools, 'extract-base-css.mjs');
  let stdout = '';
  try {
    stdout = execFileSync(process.execPath, [script, '--check'],
      { cwd: tools, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, SITE_ROOT: root() } });
  } catch (e) {
    return [{ file: '_tools/extract-base-css.mjs', line: 1,
      message: `extractor failed: ${(e.stderr || e.message).toString().trim().split('\n')[0]}` }];
  }
  // The extractor prints a stable `EXTRACTABLE: <n>` line for this check.
  const m = stdout.match(/^EXTRACTABLE:\s*(\d+)$/m);
  if (!m)
    return [{ file: '_tools/extract-base-css.mjs', line: 1,
      message: 'extractor produced no EXTRACTABLE line — its output format changed' }];
  const n = parseInt(m[1], 10);
  if (n === 0) return [];
  const sels = (stdout.match(/^still extractable:\n([\s\S]*?)^\(/m)?.[1] || '')
    .split('\n').map(x => x.trim()).filter(Boolean);
  return [{ file: 'base.css', line: 1,
    message: `${n} shared rule${n > 1 ? 's' : ''} still inline in page <style> blocks` +
             (sels.length ? ` (${sels.join(', ')})` : '') +
             ' — see _tools/extract-base-css.mjs --check' }];
}
