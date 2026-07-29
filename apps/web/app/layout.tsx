import type { Metadata, Viewport } from 'next';
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
    default: 'Agentic Mindshift — AI-advies voor Europese PE en M&A',
    template: '%s | Agentic Mindshift',
  },
  description:
    'Strategisch AI-partnerschap voor regionale Private Equity, M&A-kantoren en familiebedrijven in de Europese mid-market. Start de Scorecard.',
  metadataBase: new URL('https://www.agenticmindshift.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.agenticmindshift.nl',
    siteName: 'Agentic Mindshift',
    // OG image is provided by the file-based app/[locale]/opengraph-image.tsx (dynamic, branded).
  },
  // Upgrade to summary_large_image so LinkedIn/X show the OG image preview
  twitter: { card: 'summary_large_image', creator: '@wwdijkman' },
  robots: { index: true, follow: true },
  // NOTE: Do NOT set a global canonical here — each page sets its own via generateMetadata.
  // A blanket canonical here would cause every locale page to claim the same canonical URL.
};

// Site is light-only by design — prevents browsers auto-darkening form inputs/scrollbars.
export const viewport: Viewport = {
  colorScheme: 'light',
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
