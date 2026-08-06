import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Same policy as agenticmindshift.nl, and for the same reason — see the long
 * note in `apps/web/app/robots.ts`.
 *
 * This file used to be a bare `*: allow`, which is not the neutral choice it
 * looks like. A wildcard allow says nothing about the named agents, and the
 * named agents are the ones that decide whether Factum can appear in a ChatGPT
 * or Perplexity answer at all. Spelling them out costs nothing and makes the
 * policy reviewable rather than implicit.
 *
 * Retrieval bots are allowed outright. Google-Extended, CCBot and
 * Applebot-Extended are allowed because Factum's problem is obscurity, not
 * leakage: the company is pre-launch, has no third-party coverage, and no
 * model has any reason to know it exists. GPTBot and ClaudeBot are blocked to
 * match apps/web, which is a preference, not evidence.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Retrieval and citation bots — allow ────────────────────────────
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      // ── Corpus bots we want to be in, for entity awareness ─────────────
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // ── Pure training crawlers — blocked by preference ─────────────────
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      // ── Googlebot, Bingbot and everything else ─────────────────────────
      { userAgent: '*', allow: '/' }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
