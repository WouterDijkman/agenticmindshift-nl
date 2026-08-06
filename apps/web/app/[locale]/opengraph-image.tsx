import { ImageResponse } from 'next/og';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from '@/lib/ogImage';

// Next reads these three as named exports of the route file, so they have to be
// declared here — but the values live in lib/ogImage.ts, because every page
// also has to restate the image in its own `openGraph`. See that file for why.
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

const NAVY = '#102C54';
const ORANGE = '#F14C1D';
const CREAM = '#F7F2EB';
const GREY = '#9DB0C4';

type Copy = { title: string; tagline: string };

const COPY: Record<string, Copy> = {
  nl: {
    title: 'AI-advies voor Private Equity & M&A',
    tagline: 'Voor PE-fondsen en M&A-kantoren in de Europese mid-market. Sparring, advies, implementatie.',
  },
  en: {
    title: 'AI advisory for Private Equity & M&A',
    tagline: 'For PE funds and M&A firms in the European mid-market. Sparring, advisory, implementation.',
  },
  de: {
    title: 'KI-Beratung für Private Equity & M&A',
    tagline: 'Für PE-Fonds und M&A-Häuser im europäischen Mid-Market. Sparring, Beratung, Implementierung.',
  },
  es: {
    title: 'Asesoría de IA para Private Equity y M&A',
    tagline: 'Para fondos de PE y firmas de M&A del mid-market europeo. Sparring, asesoramiento, implementación.',
  },
  pt: {
    title: 'Consultoria de IA para Private Equity e M&A',
    tagline: 'Para fundos de PE e escritórios de M&A do mid-market europeu. Sparring, consultoria, implementação.',
  },
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.nl;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: NAVY,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Subtle brand chevron mark, top-right */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            fontSize: 360,
            fontWeight: 800,
            color: 'rgba(241, 76, 29, 0.10)',
            lineHeight: 1,
          }}
        >
          «
        </div>

        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: ORANGE,
          }}
        >
          Agentic Mindshift
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: CREAM,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {copy.title}
          </div>
          <div style={{ fontSize: 34, fontWeight: 400, color: GREY, maxWidth: 900 }}>
            {copy.tagline}
          </div>
        </div>

        <div style={{ fontSize: 26, fontWeight: 500, color: GREY }}>
          agenticmindshift.nl
        </div>
      </div>
    ),
    size,
  );
}
