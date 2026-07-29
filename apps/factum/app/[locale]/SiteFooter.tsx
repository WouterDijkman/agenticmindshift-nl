import { getTranslations } from 'next-intl/server';
import { SketchDueDiligence } from '@repo/ui/SketchIcons';

const AM_URL = 'https://www.agenticmindshift.nl';

export default async function SiteFooter() {
  const t = await getTranslations('fc');
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--accent-primary)', color: 'var(--text-inverse)' }}>
      <div
        className="container-wide"
        style={{ paddingBlock: 'clamp(40px, 6vw, 64px)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(28px, 5vw, 56px)',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--accent-cta)', display: 'inline-flex' }}>
                <SketchDueDiligence size={26} strokeWidth={1.5} />
              </span>
              <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.0625rem' }}>
                FACTUM<span style={{ color: 'var(--accent-cta)' }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(251,248,242,0.6)', lineHeight: 1.65, maxWidth: '280px', margin: 0 }}>
              {t('description.quote')}
            </p>
          </div>

          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(251,248,242,0.4)', marginBottom: '14px' }}>
              Factum Capital
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9375rem', color: 'rgba(251,248,242,0.75)' }}>
              <li>KvK 99495945</li>
              <li>
                <a href={AM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(251,248,242,0.75)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Agentic Mindshift
                </a>
              </li>
              <li>
                <a href="https://cal.com/wwdijkman/intake-call" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(251,248,242,0.75)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  {t('cta.secondary_2')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(251,248,242,0.4)', marginBottom: '14px' }}>
              Disclaimer
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(251,248,242,0.55)', lineHeight: 1.6, margin: 0 }}>
              {t('how_it_works.disclaimer')}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 'clamp(28px, 4vw, 48px)',
            paddingTop: '20px',
            borderTop: '1px solid rgba(251,248,242,0.12)',
            fontSize: '0.8125rem',
            color: 'rgba(251,248,242,0.5)',
          }}
        >
          © {year} Factum Capital
        </div>
      </div>
    </footer>
  );
}
