import { defineConfig, devices } from '@playwright/test';

/*
 * Visual regression for the design system. The docs site is the test
 * fixture — every component page screenshotted at phone and desktop
 * widths. A token tweak that silently changes rendered pixels fails CI
 * here before it reaches the consumers.
 *
 * ONE mode: the Vaudeville language is single-mode by design (the sheet
 * on the stage floor has no dark variant), so the old light/dark matrix
 * is gone.
 *
 * Animations are neutralized two ways: reducedMotion (our global guard
 * collapses transitions/animations) and Playwright's animations:disabled.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      // The four faces are self-hosted and deterministic; keep the
      // threshold tight so palette/rule changes get caught.
      maxDiffPixelRatio: 0.001,
    },
  },
  use: {
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'pnpm --filter docs preview --port 4399',
    port: 4399,
    reuseExistingServer: !process.env.CI,
  },
});
