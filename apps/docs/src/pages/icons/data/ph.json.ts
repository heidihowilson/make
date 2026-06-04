// Static build-time endpoint -> /icons/data/ph.json
// Trimmed Phosphor set, regular weight only. Fetched once when the Phosphor tab
// is first opened, then cached in memory.
import type { APIRoute } from 'astro';
import { buildPhosphor, jsonResponse } from '../../../lib/icon-browse-data.mjs';

export const prerender = true;

export const GET: APIRoute = () => jsonResponse(buildPhosphor());
