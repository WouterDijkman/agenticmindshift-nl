import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { AM_URL, KVK, NAV } from '@/lib/site';

export default async function SiteFooter() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-top" style={{ paddingBlock: 'clamp(48px, 6vw, 72px)' }}>
      <div className="container-wide">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(32px, 6vw, 96px)',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <div className="wordmark" style={{ marginBottom: 14 }}>
              Factum<span>.</span>
            </div>
            <p className="type-small">{t('blurb')}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 5vw, 72px)' }}>
            <nav aria-label={t('sitemap')}>
              <span className="eyebrow" style={{ marginBottom: 14 }}>
                {t('sitemap')}
              </span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 9 }}>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="type-small nav-link">
                      {tn(item.key)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="type-small nav-link">
                    {tn('contact')}
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <span className="eyebrow" style={{ marginBottom: 14 }}>
                {t('company')}
              </span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 9 }}>
                <li>
                  <Link href="/privacy" className="type-small nav-link">
                    {t('privacy')}
                  </Link>
                </li>
                <li className="type-small mono" style={{ color: 'var(--text-quaternary)' }}>
                  {t('kvk', { number: KVK })}
                </li>
                <li>
                  <a
                    href={AM_URL}
                    className="type-small nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agentic Mindshift
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          className="type-small hairline-top"
          style={{ marginTop: 48, paddingTop: 24, color: 'var(--text-quaternary)' }}
        >
          {t('copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
