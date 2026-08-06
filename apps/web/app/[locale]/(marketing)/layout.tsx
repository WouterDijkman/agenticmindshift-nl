// Side-effect import: cross-checks lib/scenes.ts against the slot manifest and throws
// at build if a card points at a picture that does not exist, or if a generated slot
// is never placed. Server only — see the note in lib/scenes.ts about why the manifest
// must not reach a client bundle.
import '@/lib/scenes.manifest';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import ScrollProgress from '@/components/motion/ScrollProgress';

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /**
   * The load-bearing one. `<Footer />` below is a server component that calls
   * `getLocale()` and `getTranslations()` without naming a locale, so it asks
   * next-intl for the request locale; if nothing has cached one, next-intl
   * falls back to `headers()` and the entire group renders per-request.
   *
   * The parent `[locale]/layout.tsx` already calls `setRequestLocale`, and that
   * is not enough. next-intl's cache is a plain React `cache()`
   * (`RequestLocaleCache.js`), and an ancestor layout's write is not guaranteed
   * to land before a descendant segment reads it — which is exactly why
   * next-intl tells you to call this in *every* layout and page rather than
   * once at the top. Measured, not assumed: with only the parent's call in
   * place every route still built `ƒ`, and an empty page added to this group
   * built `ƒ` too. Adding this line turned all six routes `●`.
   *
   * So: if a server component that reads the locale is ever added to a layout
   * that does not call this, the site quietly stops being prerendered. The
   * route table is the tell — `ƒ` where there should be `●`.
   */
  setRequestLocale(locale);
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ScrollRevealInit />
    </>
  );
}
