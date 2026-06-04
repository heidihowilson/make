// Static build-time endpoint -> /icons/data/mk.json
// The mk brand aliases, read from packages/icons/src/aliases.json at build time
// so the browser stays in sync automatically. Tiny (~32 entries) — carries the
// source name and rationale alongside each glyph.
import type { APIRoute } from 'astro';
import { buildMk, jsonResponse } from '../../../lib/icon-browse-data.mjs';

export const prerender = true;

export const GET: APIRoute = () => jsonResponse(buildMk());
