import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import GuidePage, { guideMetadata } from '@/components/GuidePage';
import { GUIDE_LOCALES, isGuideLocale } from '@/lib/guideRoutes';

/* en and nl only. de/es/pt are not prerendered and hit notFound() below,
   before any metadata is produced (see lib/guideRoutes.ts). */

export function generateStaticParams() {
  return GUIDE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();
  return guideMetadata('data-room-checklist', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isGuideLocale(locale)) notFound();
  setRequestLocale(locale);
  return <GuidePage slug="data-room-checklist" locale={locale} />;
}
