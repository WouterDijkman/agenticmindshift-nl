import { ImageResponse } from 'next/og';

export const alt = 'Agentic Mindshift — AI advisory for PE & M&A';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAVY = '#102C54';
const ORANGE = '#F14C1D';
const CREAM = '#F7F2EB';
const GREY = '#9DB0C4';

type Copy = { title: string; tagline: string };

const COPY: Record<string, Copy> = {
  nl: {
    title: 'AI-advies voor Private Equity & M&A',
    tagline: 'Meet uw AI-rendement op zes dimensies — in twaalf minuten.',
  },
  en: {
    title: 'AI advisory for Private Equity & M&A',
    tagline: 'Measure your AI return across six dimensions — in twelve minutes.',
  },
  de: {
    title: 'KI-Beratung für Private Equity & M&A',
    tagline: 'Messen Sie Ihre KI-Rendite über sechs Dimensionen — in zwölf Minuten.',
  },
  es: {
    title: 'Asesoría de IA para Private Equity y M&A',
    tagline: 'Mida su retorno de IA en seis dimensiones — en doce minutos.',
  },
  pt: {
    title: 'Consultoria de IA para Private Equity e M&A',
    tagline: 'Meça o seu retorno de IA em seis dimensões — em doze minutos.',
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
