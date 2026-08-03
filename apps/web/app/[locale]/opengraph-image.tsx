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
    tagline: 'Hoeveel rendement laat uw portefeuille liggen? Twaalf minuten, zes dimensies.',
  },
  en: {
    title: 'AI advisory for Private Equity & M&A',
    tagline: 'How much return is your portfolio leaving behind? Twelve minutes, six dimensions.',
  },
  de: {
    title: 'KI-Beratung für Private Equity & M&A',
    tagline: 'Wie viel Rendite lässt Ihr Portfolio liegen? Zwölf Minuten, sechs Dimensionen.',
  },
  es: {
    title: 'Asesoría de IA para Private Equity y M&A',
    tagline: '¿Cuánta rentabilidad deja su cartera sobre la mesa? Doce minutos, seis dimensiones.',
  },
  pt: {
    title: 'Consultoria de IA para Private Equity e M&A',
    tagline: 'Quanto retorno deixa a sua carteira por realizar? Doze minutos, seis dimensões.',
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
