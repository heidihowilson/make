// @ts-check
import { defineConfig } from 'astro/config';

// site/base come from the Pages deploy workflow via env vars. Locally both are
// unset, so site stays undefined and base defaults to '/' — dev is unaffected.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
});
