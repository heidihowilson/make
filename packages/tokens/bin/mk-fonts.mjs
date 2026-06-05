#!/usr/bin/env node
/*
 * mk-fonts <dest-dir> — copy the self-hosted JetBrains Mono woff2 files into
 * a consumer's served assets.
 *
 * WHY this exists: fonts.css references its woff2 files with relative URLs.
 * Vite-family bundlers rebase those automatically, but the Tailwind
 * standalone CLI (and any plain-file pipeline) does not — the emitted CSS
 * keeps `./fonts/…`, which 404s. Both early consumers hand-rolled a `cp -r`
 * build step; this bin is that step, blessed: idempotent, loud about what it
 * did, and stable if the font files ever change names.
 *
 *   "fonts": "mk-fonts public/static/fonts"
 */
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const dest = process.argv[2];
if (!dest) {
  console.error('usage: mk-fonts <dest-dir>  (copies the @sethmakes/tokens woff2 files there)');
  process.exit(1);
}

const src = fileURLToPath(new URL('../fonts/', import.meta.url));
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

const copied = readdirSync(dest).filter((f) => f.endsWith('.woff2'));
console.log(`mk-fonts: copied ${copied.length} file(s) to ${join(dest, '')}`);
console.log(
  'mk-fonts: ensure your stylesheet resolves ./fonts/… to this location, or vendor an @font-face override (see @sethmakes/tokens README).'
);
