import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from '@/lib/ogImage';
import { renderOgCard } from '@/lib/ogCard';

// Next reads these three as named exports of the route file, so they have to be
// declared here — but the values live in lib/ogImage.ts, because every page
// also has to restate the image in its own `openGraph`. See that file for why.
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = OG_IMAGE_ALT;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /* The kicker used to be `home.hero.eyebrow`, which no longer exists — the
     eyebrow was removed from every heading on the site. A share card is a
     different medium from a page, though: it arrives with no surrounding
     context, so one line saying what the company does earns its place above
     the headline. `meta.home.title` is exactly that line and is already
     maintained as the page's own title tag. */
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const meta = await getTranslations({ locale, namespace: 'meta.home' });

  return renderOgCard({ kicker: meta('title'), title: t('title') });
}
