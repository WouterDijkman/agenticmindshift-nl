// Public 200 routes and historical entry points. Consumed by proxy and checks.
// No report IDs or private questionnaire results are redirected to marketing.
export const PUBLIC_PATHS = [
  "/",
  "/platform",
  "/diligence-sprint",
  "/pre-sale",
  "/governance",
  "/limits-of-ai",
  "/team",
  "/contact",
  "/privacy",
  // The decision pages (lib/guideRoutes.ts), in all five locales.
  "/data-room-checklist",
  "/due-diligence-timeline",
  "/when-not-to-use-factum",
  "/ai-due-diligence-vs-data-room-ai"
] as const;
export const LEGACY_PATHS: Readonly<Record<string, string>> = {
  "/buyer-proof-sprint": "/diligence-sprint",
  "/method": "/platform",
  "/partnerships": "/pre-sale"
};

// Significant content revisions, not the build clock. The unchanged pages
// retain the source catalog revision from git (9b8b568, 2026-10-13).
export function contentLastModified(path: string, locale: string): string {
  if (path === '/ai-due-diligence-vs-data-room-ai') return '2026-11-08';
  if (['/data-room-checklist', '/due-diligence-timeline', '/when-not-to-use-factum'].includes(path)) return '2026-10-21';
  if (['/platform', '/diligence-sprint', '/pre-sale', '/contact', '/privacy'].includes(path)) return '2026-10-18';
  if (path === '/team' && locale === 'pt') return '2026-10-18';
  return '2026-10-13';
}
