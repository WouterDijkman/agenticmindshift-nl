import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from '@/lib/ogImage';
import { renderOgCard } from '@/lib/ogCard';

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = OG_IMAGE_ALT;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: 'meta.home' });
  const t = await getTranslations({ locale, namespace: 'platform.header' });
  return renderOgCard({ kicker: meta('title'), title: t('title') });
}
