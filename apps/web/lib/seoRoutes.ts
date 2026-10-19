// Public 200 routes and historical entry points. Consumed by proxy and checks.
// No report IDs or private questionnaire results are redirected to marketing.
export const PUBLIC_PATHS = [
  "/",
  "/werkwijze",
  "/over",
  "/contact",
  "/privacy",
  "/voorwaarden",
  "/im-en-teasers",
  "/maandrapportage",
  "/dealstukken-en-ai"
] as const;
export const LEGACY_PATHS: Readonly<Record<string, string>> = {
  "/factum-capital": "https://www.factumcapital.eu/{locale}",
  "/scorecard": "/werkwijze",
  // Old service pages from before the rebuild; Search Console still reported
  // them as 404 on 19-10-2026. The routes they described live on /werkwijze.
  "/services/geborgde-kwaliteit-en-rust": "/werkwijze",
  "/services/strategische-ruimte": "/werkwijze",
  "/services/roi-schaalbaarheid": "/werkwijze"
};

// Actual content/metadata revision; update when public content changes.
// Do not use build time as a content modification date.
export const CONTENT_LAST_MODIFIED = '2026-10-18';
