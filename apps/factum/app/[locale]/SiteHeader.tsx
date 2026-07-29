import { getTranslations } from 'next-intl/server';
import Button from '@repo/ui/Button';
import { SketchDueDiligence } from '@repo/ui/SketchIcons';
import { Link } from '@/i18n/navigation';

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';

export default async function SiteHeader() {
  const t = await getTranslations('hero');

  return (
    <header className="site-header">
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBlock: '14px',
        }}
      >
        <Link
          href="/"
          aria-label="Factum Capital"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ color: 'var(--accent-cta)', display: 'inline-flex' }}>
            <SketchDueDiligence size={28} strokeWidth={1.5} />
          </span>
          <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.0625rem' }}>
            FACTUM<span style={{ color: 'var(--accent-cta)' }}>.</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Button href={INTAKE_URL} variant="primary" size="md" external>
            {t('cta_primary')}
          </Button>
        </div>
      </div>
    </header>
  );
}
