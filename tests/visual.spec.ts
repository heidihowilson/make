import { test, expect } from '@playwright/test';

/*
 * Screenshot every docs page — the docs are the design system's rendered
 * spec, so pixel drift here IS design drift. Pages render server-side;
 * the only client-dynamic page (icons/browse) waits for its grid.
 */
const PAGES = [
  '/',
  '/ui',
  '/ui/components/typography',
  '/ui/components/buttons',
  '/ui/components/forms',
  '/ui/components/surfaces',
  '/ui/components/feedback',
  '/ui/components/media',
  '/ui/tokens',
  '/ui/cheatsheet',
  '/icons',
];

/*
 * The mono webfont must be fully applied before pixels are compared —
 * fonts.ready alone can resolve before lazily-triggered weights finish,
 * and the fallback stack's different metrics shift long pages by a line.
 * Force-load every weight we ship, then let layout settle.
 */
async function settled(page: import('@playwright/test').Page) {
  await page.waitForLoadState('networkidle');
  /*
   * Kill the scrollbar: fullPage capture renders beyond the viewport where
   * no scrollbar exists, so content width flips between 1265/1280 mid-shot
   * and long pages rewrap nondeterministically. Constant width = stable
   * pixels. (scrollbar-width is supported in Chromium 121+.)
   */
  await page.addStyleTag({ content: 'html { scrollbar-width: none; }' });
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('400 1rem "JetBrains Mono"'),
      document.fonts.load('600 1rem "JetBrains Mono"'),
      document.fonts.load('700 1rem "JetBrains Mono"'),
    ]);
    await document.fonts.ready;
  });
  await page.evaluate(() => new Promise(requestAnimationFrame));
}

/*
 * Full-page capture without Playwright's beyond-viewport renderer: that
 * renderer produces a slightly different layout than the in-viewport one
 * (36px on long pages, root cause in the engine, direction varies with
 * worker contention), so fullPage screenshots race between two valid
 * layouts. Instead we grow the viewport to the content and take a plain
 * viewport shot — one renderer, one layout, stable pixels. The resize
 * loop settles viewport-unit feedback.
 */
async function fullPageShot(page: import('@playwright/test').Page, name: string) {
  const width = page.viewportSize()!.width;
  for (let i = 0; i < 3; i++) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const current = page.viewportSize()!.height;
    if (current === h) break;
    await page.setViewportSize({ width, height: Math.min(h, 12_000) });
    await page.evaluate(() => new Promise(requestAnimationFrame));
  }
  await expect(page).toHaveScreenshot(name, { fullPage: false });
}

for (const path of PAGES) {
  test(`page ${path}`, async ({ page }) => {
    await page.goto(path);
    await settled(page);
    await fullPageShot(page, `${path.replaceAll('/', '_') || 'home'}.png`);
  });
}

// The browse tool is client-rendered: wait for the default (mk) tab's grid
// to populate before comparing. Viewport-only — the full grid is huge and
// its icon set churns by design; the system chrome around it is what we pin.
test('page /icons/browse', async ({ page }) => {
  await page.goto('/icons/browse');
  await page.waitForSelector('.browse__cell', { timeout: 10_000 });
  await settled(page);
  await expect(page).toHaveScreenshot('_icons_browse.png', { fullPage: false });
});
