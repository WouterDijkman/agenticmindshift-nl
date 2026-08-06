import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Factum Capital';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /* The kicker used to be `home.hero.eyebrow`, which no longer exists — the
     eyebrow was removed from every heading on the site. A share card is a
     different medium from a page, though: it arrives with no surrounding
     context, so one line saying what the company does earns its place above
     the headline. `meta.home.title` is exactly that line and is already
     maintained as the page's own title tag. */
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const meta = await getTranslations({ locale, namespace: 'meta.home' });

  const [newsreader, inter, interBold] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Newsreader-Medium.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Bold.ttf'))
  ]);

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
          padding: '72px 80px',
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
              'radial-gradient(700px 460px at 12% -10%, rgba(132, 78, 88, 0.55), rgba(132, 78, 88, 0) 70%)'
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: '-0.02em'
          }}
        >
          <span style={{ color: '#ffffff' }}>FACTUM</span>
          <span style={{ color: '#f14c1d' }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#c79aa3',
              marginBottom: 28
            }}
          >
            {meta('title')}
          </div>
          <div
            style={{
              fontFamily: 'Newsreader',
              fontSize: 68,
              lineHeight: 1.08,
              color: '#ffffff',
              maxWidth: 940
            }}
          >
            {t('title')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            paddingTop: 26,
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.62)'
          }}
        >
          <span>factumcapital.eu</span>
          <span>Factum Capital, Netherlands</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' }
      ]
    }
  );
}
