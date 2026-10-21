import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OG_IMAGE_SIZE } from './ogImage';

/**
 * The share card, drawn once for every page that has one.
 *
 * Everything sits inside a centred safe zone of about 860 × 470. LinkedIn's
 * Featured cards and several chat apps crop the 1200 × 630 image to a
 * narrower ratio around its centre; the first version ran its text to 80 px
 * from the left edge, and on Wouter's profile (21-10-2026) the card read
 * "CTUM." and "ue diligence on the whole ata room". With 170 px of side
 * margin and the type a step smaller, that crop now only removes background.
 */
export async function renderOgCard({ kicker, title }: { kicker: string; title: string }) {
  const [newsreader, inter, interBold] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Newsreader-Medium.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Bold.ttf'))
  ]);

  // Long guide questions get a smaller size so they stay on three lines.
  const titleSize = title.length > 60 ? 50 : title.length > 42 ? 58 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#081930',
          padding: '80px 170px',
          fontFamily: 'Inter'
        }}
      >
        {/* satori has no filter: blur(), so the hero glow is a radial gradient. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage:
              'radial-gradient(700px 460px at 30% -10%, rgba(132, 78, 88, 0.55), rgba(132, 78, 88, 0) 70%)'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'baseline', fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#ffffff' }}>FACTUM</span>
          <span style={{ color: '#f14c1d' }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#c79aa3',
              marginBottom: 24
            }}
          >
            {kicker}
          </div>
          <div style={{ fontFamily: 'Newsreader', fontSize: titleSize, lineHeight: 1.08, color: '#ffffff', maxWidth: 860 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            paddingTop: 22,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.62)'
          }}
        >
          <span>factumcapital.eu</span>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' }
      ]
    }
  );
}
