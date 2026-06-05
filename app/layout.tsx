import type { Metadata } from 'next';
import { SUSE } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const suse = SUSE({
  variable: '--font-suse',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Agentic Mindshift — AI-advies voor Nederlandse PE en M&A',
    template: '%s | Agentic Mindshift',
  },
  description:
    'Strategisch AI-partnerschap voor regionale Private Equity, M&A-kantoren en familiebedrijven in de Nederlandse mid-market. Start de Scorecard.',
  metadataBase: new URL('https://www.agenticmindshift.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.agenticmindshift.nl',
    siteName: 'Agentic Mindshift',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Agentic Mindshift — AI-advies voor Nederlandse PE en M&A',
      },
    ],
  },
  // Upgrade to summary_large_image so LinkedIn/X show the OG image preview
  twitter: { card: 'summary_large_image', creator: '@wwdijkman' },
  robots: { index: true, follow: true },
  // NOTE: Do NOT set a global canonical here — each page sets its own via generateMetadata.
  // A blanket canonical here would cause every locale page to claim the same canonical URL.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${suse.variable} h-full antialiased`}>
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
