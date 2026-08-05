import type { Metadata, Viewport } from 'next';
import { SUSE, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import MotionProvider from '@/components/motion/MotionProvider';
import { BASE, LOCALES, OG_LOCALES } from '@/lib/hreflang';
import { notFound } from 'next/navigation';
import '../globals.css';

const suse = SUSE({
  variable: '--font-suse',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

// Headings only. Fraunces ships SOFT and WONK axes; both default to 0, which is
// the sober cut — the swashy variant would undercut a due-diligence brand.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('site_title'),
      template: `%s | ${t('site_name')}`,
    },
    description: t('site_description'),
    metadataBase: new URL(BASE),
    openGraph: {
      type: 'website',
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      url: `${BASE}/${locale}`,
      siteName: t('site_name'),
      // OG image is provided by the file-based app/[locale]/opengraph-image.tsx (dynamic, branded).
    },
    // Upgrade to summary_large_image so LinkedIn/X show the OG image preview
    twitter: { card: 'summary_large_image', creator: '@wwdijkman' },
    robots: { index: true, follow: true },
    // NOTE: Do NOT set a global canonical here — each page sets its own via generateMetadata.
    // A blanket canonical here would cause every locale page to claim the same canonical URL.
  };
}

// Site is light-only by design — prevents browsers auto-darkening form inputs/scrollbars.
export const viewport: Viewport = {
  colorScheme: 'light',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${suse.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        {/*
          No consent banner, deliberately. The ePrivacy consent rule is about
          reading from or writing to the visitor's device; Plausible does
          neither — no cookie, no fingerprint, no cross-site identifier, no
          personal data leaving the EU. Nothing to consent to, so asking would
          be theatre.

          Two extensions on the bundle: `outbound-links` counts every click to
          an external host, which is how intake bookings on cal.com get
          measured; `tagged-events` reads the `plausible-event-*` classes on
          the CTAs. The scorecard funnel itself is fired from
          `lib/analytics.ts`, which queues until this script lands.
        */}
        <Script
          defer
          data-domain="agenticmindshift.nl"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
