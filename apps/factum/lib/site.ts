export const SITE_URL = 'https://www.factumcapital.eu';
export const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';
export const AM_URL = 'https://www.agenticmindshift.nl';

/** Registered with the Dutch Chamber of Commerce. */
export const KVK = '99495945';

/** Primary header nav — the small set of items every visitor needs. */
export const NAV = [
  { href: '/platform', key: 'platform' },
  { href: '/buyer-proof-sprint', key: 'sprint' },
  { href: '/governance', key: 'governance' },
  { href: '/team', key: 'team' }
] as const;

/**
 * Footer sitemap nav — primary nav plus narrower-audience pages (e.g.
 * Partnerships, which serves referral partners rather than the primary
 * buyer persona) that still deserve a discoverable, lower-emphasis link.
 */
export const FOOTER_NAV = [...NAV, { href: '/partnerships', key: 'partnerships' }] as const;

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português'
};

/**
 * The verticals Final v4 §3.0 names explicitly, in source order and source casing.
 * The document says "among others" and names 30 of the 31 it counts, so this list
 * is presented on the site as a selection, never as the complete taxonomy.
 */
export const VERTICALS = [
  'financial DD',
  'legal DD',
  'tax DD',
  'commercial DD',
  'HR DD',
  'IT DD',
  'ESG DD',
  'operational DD',
  'AI DD',
  'insurance DD',
  'vendor DD',
  'valuation',
  'deal structuring',
  'IC memo',
  'LBO returns modeling',
  'teaser/IM drafting',
  'financing memo',
  'document factory',
  'deal economics',
  'VDD (sell-side vendor DD)',
  'PMI & integration',
  'monthly business review',
  'portfolio health monitoring',
  'IC report',
  'IM screener',
  'IBR',
  'WHOA',
  'boedelonderzoek',
  'portfolio/active monitoring',
  'Exit Readiness'
] as const;

/**
 * Only the per-vertical module counts the source documents actually state.
 * Aligned by index with VERTICALS; null means the source gives no count, and a
 * blank is the honest rendering.
 */
export const VERTICAL_MODULE_COUNTS: readonly (number | null)[] = [
  8, // financial DD
  8, // legal DD
  null, // tax DD
  null, // commercial DD
  null, // HR DD
  null, // IT DD
  null, // ESG DD
  null, // operational DD
  11, // AI DD — the largest single vertical
  null, // insurance DD
  null, // vendor DD
  8, // valuation
  7, // deal structuring
  null, // IC memo
  null, // LBO returns modeling
  null, // teaser/IM drafting
  null, // financing memo
  null, // document factory
  null, // deal economics
  null, // VDD
  null, // PMI & integration
  null, // monthly business review
  7, // portfolio health monitoring
  null, // IC report
  null, // IM screener
  7, // IBR
  7, // WHOA
  null, // boedelonderzoek
  7, // portfolio/active monitoring
  8 // Exit Readiness
];

export const MODULE_COUNT = 241;
export const VERTICAL_COUNT = 31;
export const DISCIPLINE_COUNT = 11;
