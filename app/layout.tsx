import type { Metadata } from 'next';
import { Noto_Serif } from 'next/font/google';
import './globals.css';

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agenticmindshift.nl';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Agentic Mindshift — AI-advies voor Nederlandse PE en M&A',
    template: '%s | Agentic Mindshift',
  },
  description:
    "AI-advies voor Nederlandse PE- en M&A-firma's. Maak rendementslekken meetbaar via de Portfolio Intelligence Scorecard.",
  applicationName: 'Agentic Mindshift',
  authors: [{ name: 'Wouter Dijkman' }],
  keywords: [
    'AI advies',
    'private equity',
    'M&A',
    'restructuring',
    'portfolio intelligence',
    'Nederland',
    'Agentic Mindshift',
    'Factum Capital',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: siteUrl,
    siteName: 'Agentic Mindshift',
    title: 'Agentic Mindshift — Portfolio Intelligence voor PE en M&A',
    description:
      "Maak blinde vlekken in uw deal-cyclus en MBR-ritme meetbaar. Twaalf minuten, vier pagina's rapport.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Mindshift',
    description: 'Portfolio Intelligence Scorecard voor Nederlandse PE en M&A.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${notoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
