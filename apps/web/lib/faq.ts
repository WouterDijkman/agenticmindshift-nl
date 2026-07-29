export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Stable order of the homepage FAQ accordion. Question + answer text live in
// the message catalogue under `homepage.faqItems` (keys `<id>_q` / `<id>_a`).
// The 'wie' item additionally renders a link to /over — handled in page.tsx
// via the `homepage.faqItems.wie_link` key.
export const faqItemIds = [
  'duur',
  'voor-wie',
  'vertrouwelijk',
  'onderbouwing',
  'wie',
  'sales-pitch',
  'investering',
  'voorbeeld',
] as const;

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
