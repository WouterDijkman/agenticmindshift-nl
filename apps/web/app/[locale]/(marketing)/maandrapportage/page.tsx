import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import GuidePage, { guideMetadata } from '@/components/GuidePage';
import { GUIDE_LOCALES, isGuideLocale } from '@/lib/guideRoutes';

/* All five locales (lib/guideRoutes.ts). The guard below stays as a
   safety net for a locale that has no copy yet. No
   `dynamicParams = false`: see the note in app/[locale]/layout.tsx. */

export function generateStaticParams() {
  return GUIDE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();
  return guideMetadata('maandrapportage', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();
  // Static rendering: see the note in app/[locale]/layout.tsx.
  setRequestLocale(locale);
  return <GuidePage slug="maandrapportage" locale={locale} />;
}
