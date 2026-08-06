import type { Metadata, Viewport } from 'next';
import { SUSE, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import MotionProvider from '@/components/motion/MotionProvider';
import { BASE } from '@/lib/hreflang';
import { sharedOpenGraph } from '@/lib/pageMetadata';
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
      // Shared with every page through lib/pageMetadata.ts. Next merges
      // `openGraph` shallowly and replaces duplicate keys wholesale, so a page
      // that defines one cannot inherit half of this — it has to restate all of
      // it, which it does by calling the same function. One implementation, so
      // the layout and the pages cannot drift apart.
      ...sharedOpenGraph(locale, t('site_name')),
      // Correct for the locale root, and a fallback for anything below it that
      // does not call pageMetadata(). This was once the only `openGraph` in the
      // app, which is exactly how all five interior pages came to advertise the
      // homepage as their og:url.
      url: `${BASE}/${locale}`,
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

  /**
   * Opts this segment into static rendering, and covers the `getMessages()`
   * call just below.
   *
   * next-intl resolves the current locale through `getRequestLocale()`, which
   * reads a React-cached value if one has been set and otherwise falls back to
   * `headers()` — see `RequestLocale.js` in the package. `headers()` is a
   * dynamic API, so that fallback alone drags a segment into per-request
   * rendering no matter what `generateStaticParams` says. That is what used to
   * happen across this whole app: all six routes built `ƒ` and every response
   * carried `Cache-Control: private, no-cache, no-store`, so no crawler hit and
   * no repeat visit was ever served from the edge.
   *
   * This call is necessary but *not* sufficient, which is the counter-intuitive
   * part: the same line is needed in `(marketing)/layout.tsx` and in every
   * page, because next-intl's cache is a plain React `cache()` and an ancestor
   * layout's write is not guaranteed to land before a descendant segment reads
   * it. See the longer note in `(marketing)/layout.tsx` for the measurement.
   *
   * The locale is validated immediately above, so nothing unvalidated reaches
   * the cache.
   */
  setRequestLocale(locale);

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
