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
  },
  twitter: { card: 'summary', creator: '@wwdijkman' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.agenticmindshift.nl' },
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
