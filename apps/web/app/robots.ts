import { MetadataRoute } from 'next';

/**
 * Robots configuration — 2026 AI crawler strategy.
 *
 * Key distinction: "search/citation bots" vs "training bots".
 *   - Search/citation bots index content and cite it in AI answers → ALLOW
 *   - Training bots only harvest data for model training → BLOCK
 *
 * Reference: https://capston.ai/robots-txt-for-ai-bots/
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── AI search & citation bots — allow full access ──────────────────
      // These index the site and cite it in ChatGPT / Perplexity / Claude answers
      { userAgent: 'OAI-SearchBot', allow: '/' },       // ChatGPT search
      { userAgent: 'ChatGPT-User', allow: '/' },         // ChatGPT browsing
      { userAgent: 'Claude-SearchBot', allow: '/' },     // Claude search
      { userAgent: 'Claude-Web', allow: '/' },           // Claude browsing
      { userAgent: 'PerplexityBot', allow: '/' },        // Perplexity index
      { userAgent: 'Perplexity-User', allow: '/' },      // Perplexity browsing
      { userAgent: 'cohere-ai', allow: '/' },
      // ── AI training bots — block (no citation benefit) ──────────────────
      { userAgent: 'GPTBot', disallow: '/' },            // OpenAI training
      { userAgent: 'ClaudeBot', disallow: '/' },         // Anthropic training
      { userAgent: 'Google-Extended', disallow: '/' },   // Google AI training
      { userAgent: 'CCBot', disallow: '/' },             // Common Crawl training
      { userAgent: 'Applebot-Extended', disallow: '/' }, // Apple AI training
      { userAgent: 'anthropic-ai', disallow: '/' },      // Anthropic generic training
      // ── All other crawlers (Googlebot, Bingbot, etc.) — full access ─────
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://www.agenticmindshift.nl/sitemap.xml',
  };
}
