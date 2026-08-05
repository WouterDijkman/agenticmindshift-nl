import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { getAlternates } from '@/lib/hreflang';
import { organizationSchema } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealObserver from '@/components/RevealObserver';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#081930'
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('home.title'),
      template: '%s — Factum Capital'
    },
    description: t('home.description'),
    alternates: getAlternates('', locale),
    openGraph: {
      type: 'website',
      siteName: 'Factum Capital',
      locale,
      url: `${SITE_URL}/${locale}`
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'a11y' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema(locale, meta('home.description')))
          }}
        />
        {/* .reveal starts at opacity 0 and is armed by JS; without it the page is blank below the fold. */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <a href="#main" className="skip-link">
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <RevealObserver />
        </NextIntlClientProvider>
        {/*
          No consent banner, deliberately. The ePrivacy consent rule is about
          reading from or writing to the visitor's device; Plausible does
          neither — no cookie, no fingerprint, no cross-site identifier, no
          personal data leaving the EU. A site that sells data governance
          should not open with a banner asking permission it does not need.

          `outbound-links` counts every click to an external host, which is how
          intake bookings on cal.com get measured; `tagged-events` reads the
          `plausible-event-*` classes on the CTAs.
        */}
        <Script
          defer
          data-domain="factumcapital.eu"
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
