import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Factum Capital — De Intelligence Machine voor M&A en restructuring',
    template: '%s | Factum Capital',
  },
  description:
    'AI-gedreven due diligence en portfolio-intelligence voor M&A en restructuring. Forensische snelheid, 100% dataroom-dekking, uw oordeel.',
  metadataBase: new URL('https://www.factumcapital.eu'),
  openGraph: {
    type: 'website',
    siteName: 'Factum Capital',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
