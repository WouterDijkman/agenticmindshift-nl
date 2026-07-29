import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@repo/ui/Button';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  const locale = await getLocale();

  return (
    <section
      className="grain-overlay"
      style={{ position: 'relative', overflow: 'hidden', paddingBlock: 'clamp(88px, 12vw, 168px)' }}
    >
      <span
        className="glow"
        style={{
          width: 640,
          height: 320,
          left: '-8%',
          top: '-20%',
          background: 'var(--wine-soft)'
        }}
      />
      <div className="container-medium" style={{ position: 'relative' }}>
        <span className="mono" style={{ color: 'var(--wine-text)' }}>
          404
        </span>
        <h1 className="type-display" style={{ marginTop: 18, maxWidth: '16ch' }}>
          {t('title')}
        </h1>
        <p className="type-lead measure" style={{ marginTop: 22 }}>
          {t('body')}
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button href={`/${locale}`} size="lg" magnetic={false}>
            {t('home')}
          </Button>
          <Link href="/platform" className="link-quiet">
            {t('platform')}
          </Link>
        </div>
      </div>
    </section>
  );
}
