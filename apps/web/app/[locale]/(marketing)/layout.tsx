// Side-effect import: cross-checks lib/scenes.ts against the slot manifest and throws
// at build if a card points at a picture that does not exist, or if a generated slot
// is never placed. Server only — see the note in lib/scenes.ts about why the manifest
// must not reach a client bundle.
import '@/lib/scenes.manifest';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import ScrollProgress from '@/components/motion/ScrollProgress';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
