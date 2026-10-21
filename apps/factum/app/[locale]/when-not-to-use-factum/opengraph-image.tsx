import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from '@/lib/ogImage';
import { renderOgCard } from '@/lib/ogCard';
import { getGuide } from '@/lib/guides';
import { GUIDE_LOCALES, isGuideLocale } from '@/lib/guideRoutes';

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = OG_IMAGE_ALT;

export function generateStaticParams() {
  return GUIDE_LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();
  const meta = await getTranslations({ locale, namespace: 'meta.home' });
  return renderOgCard({ kicker: meta('title'), title: getGuide('when-not-to-use-factum', locale).h1 });
}
