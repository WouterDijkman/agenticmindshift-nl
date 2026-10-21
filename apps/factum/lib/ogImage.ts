import { SITE_URL } from './site';

/**
 * The share card, in one place.
 *
 * Next reads `alt`, `size` and `contentType` as named exports of
 * `app/[locale]/opengraph-image.tsx`, so that file re-exports these rather than
 * declaring its own. The values have to live here because every page also has
 * to restate the image inside its own `openGraph` — see the note in
 * `pageMetadata.ts` for why file-based metadata is not inherited across
 * segments.
 */
export const OG_IMAGE_ALT = 'Factum Capital';
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = 'image/png';

/** Pages with a card of their own: the ones Wouter features on LinkedIn. */
export const OG_CARD_PATHS = ['/platform', '/data-room-checklist', '/due-diligence-timeline', '/when-not-to-use-factum'];

/**
 * The share card for one locale, as an Open Graph image descriptor.
 *
 * Deliberately without the build hash Next appends to the file-based URL
 * (`?f2bb5f1e8194564b`). That hash is cache-busting only; the route resolves
 * without it, and reproducing it here would mean keeping a build artefact in
 * source.
 */
export function getOgImage(locale: string, path = '') {
  return {
    // Pages with their own card (OG_CARD_PATHS) pass their path; the rest
    // share the homepage card.
    url: `${SITE_URL}/${locale}${OG_CARD_PATHS.includes(path) ? path : ''}/opengraph-image`,
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    alt: OG_IMAGE_ALT,
    type: OG_IMAGE_CONTENT_TYPE
  };
}
