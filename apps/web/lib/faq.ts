export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Stable order of the homepage FAQ accordion. Question + answer text live in
// the message catalogue under `homepage.faqItems` (keys `<id>_q` / `<id>_a`).
//
// Order is deliberate: what it is, then what it costs. Those two are the
// reason anyone opens an FAQ, and burying the price under four process
// questions reads as a dodge.
//
// Was seven. Three went because the page now answers them before the reader
// gets here: 'wie' and 'voor-wie' are the guide section and the hero subline,
// and 'factum' is the banner directly above. An FAQ that re-answers the page
// is length pretending to be helpfulness.
//
// 'dd' (12-11-2026) answers the one question this site cannot: the due
// diligence itself. It routes to Factum Capital, a separate platform, so the
// reader with a deal in hand leaves for the right page (audit
// GTM/ops/geo-seo-audit-2026-11-12.md §5.4). Last, because it is the exit.
export const faqItemIds = ['wat', 'investering', 'anders', 'start', 'dd'] as const;

export type FaqItemId = (typeof faqItemIds)[number];

/**
 * Build the localized FAQ items from a next-intl translator scoped to
 * `homepage.faqItems`. Used both for the visible accordion and for FAQ JSON-LD.
 */
export function getLocalizedFaqItems(t: (key: string) => string): FaqItem[] {
  return faqItemIds.map((id) => ({
    id,
    question: t(`${id}_q`),
    answer: t(`${id}_a`),
  }));
}
