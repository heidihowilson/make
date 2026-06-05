import { defineConfig, devices } from '@playwright/test';

/*
 * Visual regression for the design system, keeping DESIGN-LANGUAGE.md's
 * promise: "visual regression runs in both modes." The docs site is the
 * test fixture — every component page screenshotted in light and dark at
 * phone and desktop widths. A token tweak that silently changes rendered
 * pixels fails CI here before it reaches the consumers.
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
      // Mono webfont is self-hosted and deterministic; keep the threshold
      // tight so tonal-step changes (the whole design language) get caught.
      maxDiffPixelRatio: 0.001,
    },
  },
  use: {
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'light-desktop',
      use: { ...devices['Desktop Chrome'], colorScheme: 'light', viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'dark-desktop',
      use: { ...devices['Desktop Chrome'], colorScheme: 'dark', viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'light-mobile',
      use: { ...devices['Desktop Chrome'], colorScheme: 'light', viewport: { width: 390, height: 844 } },
    },
    {
      name: 'dark-mobile',
      use: { ...devices['Desktop Chrome'], colorScheme: 'dark', viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'pnpm --filter docs preview --port 4399',
    port: 4399,
    reuseExistingServer: !process.env.CI,
  },
});
