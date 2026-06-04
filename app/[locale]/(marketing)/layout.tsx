import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import ScrollRevealInit from '@/components/ScrollRevealInit';
import ScrollProgress from '@/components/motion/ScrollProgress';
import CustomCursor from '@/components/motion/CustomCursor';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
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
