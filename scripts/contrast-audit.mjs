/*
 * WCAG 2.1 contrast audit for @sethmakes/tokens.
 *
 * Self-contained: implements oklch -> linear sRGB -> sRGB conversion and the
 * WCAG relative-luminance / contrast-ratio formulas. No external deps.
 *
 * The semantic color pairs below are HARDCODED from packages/tokens/index.css.
 * Each semantic token is a light-dark() pair; we resolve both sides through
 * the primitive ramps. Keep this in sync with the tokens file by hand.
 */

// ---------------------------------------------------------------------------
// Primitives (oklch: [L 0..1, C, H]) — mirror of packages/tokens/index.css
// ---------------------------------------------------------------------------
const P = {
  // achromatic gray ramp (chroma 0)
  'gray-0': [1.0, 0, 0],
  'gray-50': [0.985, 0, 0],
  'gray-100': [0.97, 0, 0],
  'gray-150': [0.945, 0, 0],
  'gray-200': [0.91, 0, 0],
  'gray-300': [0.85, 0, 0],
  'gray-400': [0.73, 0, 0],
  'gray-500': [0.6, 0, 0],
  'gray-600': [0.49, 0, 0],
  'gray-700': [0.4, 0, 0],
  'gray-800': [0.3, 0, 0],
  'gray-850': [0.25, 0, 0],
  'gray-900': [0.21, 0, 0],
  'gray-950': [0.16, 0, 0],
  'gray-1000': [0.12, 0, 0],

  // moss (hue 150, muted)
  'moss-100': [0.94, 0.04, 150],
  'moss-200': [0.86, 0.08, 150],
  'moss-300': [0.82, 0.11, 150],
  'moss-400': [0.75, 0.1, 150],
  'moss-500': [0.6, 0.09, 150],
  'moss-600': [0.48, 0.08, 150],
  'moss-700': [0.42, 0.08, 150],
  'moss-800': [0.38, 0.07, 150],
  'moss-900': [0.27, 0.05, 150],

  // status hues
  'green-400': [0.72, 0.14, 155],
  'green-500': [0.5, 0.15, 155],
  'green-900': [0.3, 0.07, 155],
  'green-100': [0.94, 0.06, 155],
  'amber-400': [0.82, 0.14, 85],
  'amber-500': [0.52, 0.15, 85],
  'amber-900': [0.32, 0.07, 85],
  'amber-100': [0.95, 0.07, 85],
  'red-400': [0.66, 0.2, 25],
  'red-500': [0.52, 0.22, 25],
  'red-900': [0.27, 0.09, 25],
  'red-100': [0.94, 0.04, 25],
};

// ---------------------------------------------------------------------------
// Semantic tokens as light/dark primitive references
// ---------------------------------------------------------------------------
const SEM = {
  bg: ['gray-100', 'gray-950'],
  'surface-1': ['gray-0', 'gray-900'],
  'surface-2': ['gray-150', 'gray-850'],
  'surface-3': ['gray-200', 'gray-800'],
  field: ['gray-150', 'gray-850'],
  text: ['gray-900', 'gray-100'],
  'text-muted': ['gray-600', 'gray-400'],
  'text-faint': ['gray-400', 'gray-600'],
  accent: ['moss-600', 'moss-400'],
  'accent-hover': ['moss-700', 'moss-300'],
  'accent-contrast': ['gray-50', 'gray-1000'],
  'accent-subtle': ['moss-100', 'moss-900'],
  'on-accent-subtle': ['moss-800', 'moss-200'],
  success: ['green-500', 'green-400'],
  'success-subtle': ['green-100', 'green-900'],
  warning: ['amber-500', 'amber-400'],
  'warning-subtle': ['amber-100', 'amber-900'],
  danger: ['red-500', 'red-400'],
  'danger-subtle': ['red-100', 'red-900'],
};

function sem(name, mode) {
  const ref = SEM[name][mode === 'light' ? 0 : 1];
  return P[ref];
}

// ---------------------------------------------------------------------------
// Color math: oklch -> oklab -> linear sRGB -> gamma sRGB
// ---------------------------------------------------------------------------
function oklchToLinearSrgb([L, C, Hdeg]) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function gammaEncode(c) {
  const cl = Math.min(1, Math.max(0, c));
  return cl <= 0.0031308 ? 12.92 * cl : 1.055 * cl ** (1 / 2.4) - 0.055;
}

function oklchToSrgb(oklch) {
  return oklchToLinearSrgb(oklch).map(gammaEncode);
}

// WCAG relative luminance from linear sRGB (clamped to gamut)
function relLuminance([L, C, H]) {
  const lin = oklchToLinearSrgb([L, C, H]).map((c) => Math.min(1, Math.max(0, c)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(fg, bg) {
  const l1 = relLuminance(fg);
  const l2 = relLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function hex(oklch) {
  const [r, g, b] = oklchToSrgb(oklch).map((c) => Math.round(c * 255));
  const h = (n) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

// deltaE-ish lightness/chroma separation note for non-WCAG checks
function deltaL(a, b) {
  return Math.abs(a[0] - b[0]);
}

// ---------------------------------------------------------------------------
// Audit pairs.  req: minimum ratio, or null for note-only (decorative / non-text).
// ---------------------------------------------------------------------------
const PAIRS = [
  ['text', 'bg', 4.5],
  ['text', 'surface-1', 4.5],
  ['text', 'surface-2', 4.5],
  ['text', 'surface-3', 4.5],
  ['text-muted', 'bg', 4.5],
  ['text-muted', 'surface-1', 4.5],
  ['text-muted', 'surface-2', 4.5],
  ['text-muted', 'surface-3', 4.5],
  ['text-faint', 'bg', null], // decorative / placeholder, not body text
  ['accent-contrast', 'accent', 4.5], // button label on filled accent
  ['accent', 'bg', 4.5], // link text on page bg
  ['accent', 'surface-1', 4.5],
  ['on-accent-subtle', 'accent-subtle', 4.5], // badge text
  ['success', 'success-subtle', 4.5],
  ['success', 'bg', 4.5],
  ['warning', 'warning-subtle', 4.5],
  ['warning', 'bg', 4.5],
  ['danger', 'danger-subtle', 4.5],
  ['danger', 'bg', 4.5],
];

// NOTE (WCAG 1.4.11 non-text contrast, 3:1): the unchecked checkbox/radio
// affordance is an inset ring in `text-muted`. Its worst-case background is
// `surface-1` (a card), already audited above at 4.5:1 / 7.41:1 — comfortably
// past the 3:1 the ring needs. No separate row required.

const SEPARATIONS = [
  // non-WCAG distinguishability notes
  ['field', 'surface-1', 'field vs surface-1 (filled input legibility)'],
];

function pad(s, n) {
  s = String(s);
  return s.length >= n ? s : s + ' '.repeat(n - s.length);
}

function run() {
  let anyFail = false;
  for (const mode of ['light', 'dark']) {
    console.log(`\n=== ${mode.toUpperCase()} MODE ===`);
    console.log(
      pad('fg', 18) + pad('bg', 16) + pad('ratio', 9) + pad('req', 6) + 'result'
    );
    console.log('-'.repeat(60));
    for (const [fg, bg, req] of PAIRS) {
      const r = contrast(sem(fg, mode), sem(bg, mode));
      const ratio = r.toFixed(2);
      let result;
      if (req === null) {
        result = 'note (decorative)';
      } else if (r >= req) {
        result = 'PASS';
      } else {
        result = 'FAIL';
        anyFail = true;
      }
      console.log(
        pad(fg, 18) +
          pad(bg, 16) +
          pad(ratio + ':1', 9) +
          pad(req === null ? '-' : req, 6) +
          result
      );
    }
    console.log('\n  separations (non-WCAG, note only):');
    for (const [a, b, label] of SEPARATIONS) {
      const dl = deltaL(sem(a, mode), sem(b, mode));
      const cr = contrast(sem(a, mode), sem(b, mode));
      console.log(
        `  ${label}: ΔL=${dl.toFixed(3)} oklch-L, ratio ${cr.toFixed(2)}:1`
      );
    }
    // accent vs success chroma separation reminder
    const accent = sem('accent', mode);
    const success = sem('success', mode);
    console.log(
      `  accent vs success chroma: ${accent[1].toFixed(3)} vs ${success[1].toFixed(3)} (success should be ~2x)`
    );
  }

  console.log('\n' + (anyFail ? 'RESULT: FAILURES present' : 'RESULT: all required pairs PASS'));
  if (process.argv.includes('--hex')) {
    console.log('\n--- resolved hex (light / dark) ---');
    for (const name of Object.keys(SEM)) {
      console.log(
        pad(name, 18) + hex(sem(name, 'light')) + '  /  ' + hex(sem(name, 'dark'))
      );
    }
  }
  process.exitCode = anyFail ? 1 : 0;
}

run();
