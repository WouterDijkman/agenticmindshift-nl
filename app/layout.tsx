import type { Metadata } from 'next';
import { Noto_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Agentic Mindshift — Portfolio Intelligence voor Nederlandse PE en M&A',
    template: '%s | Agentic Mindshift',
  },
  description:
    'Strategisch AI-partnerschap voor regionale Private Equity, M&A-boutiques en familiebedrijven in de Nederlandse lower-mid market. Start de Portfolio Intelligence Scorecard.',
  metadataBase: new URL('https://www.agenticmindshift.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.agenticmindshift.nl',
    siteName: 'Agentic Mindshift',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@wwdijkman' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.agenticmindshift.nl' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${notoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          defer
          data-domain="agenticmindshift.nl"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
