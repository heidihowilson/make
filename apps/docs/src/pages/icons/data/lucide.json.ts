// Static build-time endpoint -> /icons/data/lucide.json
// Trimmed Lucide set (names + svg bodies). Fetched once by the browse page when
// the Lucide tab is first opened, then cached in memory. ~500KB raw, ~80KB gzip.
import type { APIRoute } from 'astro';
import { buildLucide, jsonResponse } from '../../../lib/icon-browse-data.mjs';

export const prerender = true;

export const GET: APIRoute = () => jsonResponse(buildLucide());
