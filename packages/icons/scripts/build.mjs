#!/usr/bin/env node
// Build dist/mk.json — the `mk` brand-alias Iconify set.
//
// WHY a generated set rather than hand-authored SVG: the glyphs ARE Lucide/Phosphor
// icons; aliases.json is the only thing a human curates ("watch means an eye"). We
// resolve those source icons to their bodies at build time and freeze them into one
// IconifyJSON set with prefix `mk`. Consumers then reference `mk--watch` exactly like
// `lucide--check`. Re-skinning a brand meaning = edit aliases.json + rebuild; the
// pinned source-set versions make the output reproducible.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { getIconData, quicklyValidateIconSet } from '@iconify/utils';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, '..');

// Pinned source sets. Add a set here only when aliases.json starts referencing it,
// and pin the matching @iconify-json/* version in package.json.
const SOURCE_SETS = {
  lucide: require('@iconify-json/lucide/icons.json'),
  ph: require('@iconify-json/ph/icons.json'),
};

const aliasesDoc = JSON.parse(
  readFileSync(join(pkgRoot, 'src', 'aliases.json'), 'utf8')
);
const aliases = aliasesDoc.aliases;

const icons = {};
const errors = [];

for (const [mkName, entry] of Object.entries(aliases)) {
  const source = entry.source;
  const sep = source.indexOf('--');
  if (sep === -1) {
    errors.push(`${mkName}: source "${source}" must be "<set>--<name>"`);
    continue;
  }
  const setPrefix = source.slice(0, sep);
  const iconName = source.slice(sep + 2);
  const set = SOURCE_SETS[setPrefix];
  if (!set) {
    errors.push(
      `${mkName}: unknown source set "${setPrefix}" (add it to SOURCE_SETS + pin @iconify-json/${setPrefix})`
    );
    continue;
  }
  // getIconData resolves aliases, inherited transforms, and default dimensions.
  const data = getIconData(set, iconName);
  if (!data) {
    errors.push(`${mkName}: "${source}" not found in @iconify-json/${setPrefix}`);
    continue;
  }
  // Store the fully-resolved icon. Width/height fall back to the set defaults so
  // the emitted set is self-contained (no reliance on the source set at runtime).
  icons[mkName] = {
    body: data.body,
    width: data.width ?? set.width ?? 24,
    height: data.height ?? set.height ?? 24,
  };
}

if (errors.length) {
  console.error('Alias resolution failed:\n  ' + errors.join('\n  '));
  process.exit(1);
}

const mkSet = {
  prefix: 'mk',
  // info makes the set discoverable/well-formed for Iconify tooling.
  info: {
    name: 'sethmakes brand aliases',
    author: { name: 'sethmakes', url: 'https://github.com/heidihowilson/make' },
    license: { title: 'MIT', spdx: 'MIT' },
    total: Object.keys(icons).length,
  },
  icons,
  // 24x24 is the Lucide/Phosphor grid; declaring it set-wide lets per-icon entries
  // omit matching dimensions and keeps mask viewBoxes correct.
  width: 24,
  height: 24,
  lastModified: Math.floor(Date.now() / 1000),
};

// Validate against Iconify's schema before writing — a malformed set silently breaks
// the Tailwind plugin's from-json() loader and the CLI.
const validated = quicklyValidateIconSet(mkSet);
if (!validated) {
  console.error('Generated mk.json failed Iconify validation.');
  process.exit(1);
}

const distDir = join(pkgRoot, 'dist');
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'mk.json'), JSON.stringify(mkSet) + '\n');

console.log(
  `Built dist/mk.json — ${Object.keys(icons).length} icons (prefix "mk"), validated OK.`
);
