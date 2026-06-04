// Build-time data builder for the icon browser (/icons/browse).
//
// WHY this exists: the browser must stay fast on a phone, which means we never
// inline thousands of SVGs into HTML. Instead we emit ONE trimmed JSON asset per
// set at build time (names + svg bodies only), fetched client-side per tab on
// demand and served with the site's static gzip. This module is the single
// source of that trimming so the three data endpoints stay identical in shape.
//
// WHY a shared .mjs (not inline per endpoint): the Lucide/Phosphor pinned set
// versions and the mk aliases.json are the source of truth — resolving them in
// one place keeps the docs automatically in sync when a set is bumped or an
// alias is re-pointed, with zero hand-maintained icon lists.

import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { getIconData, iconToSVG } from '@iconify/utils';
import lucide from '@iconify-json/lucide/icons.json' with { type: 'json' };
import ph from '@iconify-json/ph/icons.json' with { type: 'json' };

// Phosphor ships six weights as suffixed variants of every glyph. We browse the
// regular weight only — keeping ~1500 names instead of ~9000 keeps the asset
// sane and the grid scannable. Bold/fill/duotone/thin/light are filtered out;
// the unsuffixed name IS the regular weight.
const PH_WEIGHT_SUFFIX = /-(bold|fill|duotone|thin|light)$/;

// Default viewBox per set — omitted from each icon entry to shave bytes, since
// the overwhelming majority share it. Only outliers carry an explicit `v`.
const LUCIDE_VB = '0 0 24 24';
const PH_VB = '0 0 256 256';

/**
 * Resolve a list of icon names within an Iconify set to trimmed entries.
 * Each entry is { b: <svg body> } plus { v: <viewBox> } only when it differs
 * from the set default. iconToSVG normalizes width/height to 1em, so the body
 * renders at currentColor and font-size with no per-icon attributes shipped.
 */
function trimSet(set, names, defaultViewBox) {
  const icons = {};
  for (const name of names) {
    const data = getIconData(set, name);
    if (!data) continue; // defensive: skip anything the set can't resolve
    const svg = iconToSVG(data);
    const entry = { b: svg.body };
    if (svg.attributes.viewBox !== defaultViewBox) entry.v = svg.attributes.viewBox;
    icons[name] = entry;
  }
  return icons;
}

/** Trimmed Lucide set — primary glyphs only (skip Iconify's name aliases). */
export function buildLucide() {
  const names = Object.keys(lucide.icons);
  return { set: 'lucide', vb: LUCIDE_VB, icons: trimSet(lucide, names, LUCIDE_VB) };
}

/** Trimmed Phosphor set — regular weight only. */
export function buildPhosphor() {
  const names = Object.keys(ph.icons).filter((n) => !PH_WEIGHT_SUFFIX.test(n));
  return { set: 'ph', vb: PH_VB, icons: trimSet(ph, names, PH_VB) };
}

/**
 * Trimmed mk brand-alias set, read from packages/icons/src/aliases.json at
 * build time so the browser tracks the real vocabulary automatically. Each
 * entry also carries the source name and rationale so the alias tab can show
 * "mk--watch -> lucide--eye, because ..." — the package is the documentation.
 *
 * Defensive: if aliases.json is missing mid-phase, we return an empty set
 * rather than failing the build (it will exist by the time the site builds).
 */
export function buildMk() {
  const sets = { lucide, ph };
  // From src/lib/ up to apps/docs/, then to repo packages/icons/src/aliases.json.
  const aliasesPath = fileURLToPath(
    new URL('../../../../packages/icons/src/aliases.json', import.meta.url),
  );

  let aliases = {};
  try {
    aliases = JSON.parse(readFileSync(aliasesPath, 'utf8')).aliases ?? {};
  } catch {
    return { set: 'mk', vb: '0 0 24 24', icons: {} };
  }

  const icons = {};
  for (const [name, def] of Object.entries(aliases)) {
    const [setName, iconName] = String(def.source).split('--');
    const set = sets[setName];
    if (!set) continue;
    const data = getIconData(set, iconName);
    if (!data) continue;
    const svg = iconToSVG(data);
    icons[name] = {
      b: svg.body,
      v: svg.attributes.viewBox,
      src: def.source, // shown beneath the alias so the mapping is legible
      why: def.why, // the rationale ships, per CLAUDE.md
    };
  }
  // viewBoxes vary (lucide 24 vs ph 256), so each mk entry carries its own `v`.
  return { set: 'mk', vb: null, icons };
}

/** JSON Response with long-lived caching — the asset is content-pinned. */
export function jsonResponse(payload) {
  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Pinned set versions => safe to cache hard on the static host/CDN.
      'cache-control': 'public, max-age=3600',
    },
  });
}
