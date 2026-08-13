import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { AM_URL, FOOTER_NAV, KVK, REFERENCE_NAV } from '@/lib/site';

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
              FACTUM<span>.</span>
            </div>
            <p className="type-small">{t('blurb')}</p>
          </div>

          {/* Three groups of wildly different lengths — six links, two, three.
              Wrapping them leaves a hole on a phone, so `.footer-groups` places
              them explicitly below 700px. Order matters there; see globals.css. */}
          <div className="footer-groups">
            <nav aria-label={t('sitemap')}>
              <span className="eyebrow" style={{ marginBottom: 14 }}>
                {t('sitemap')}
              </span>
              <ul className="footer-links">
                {FOOTER_NAV.map((item) => (
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

            {/* The two long-form pages. They are kept out of the header on
                purpose (see REFERENCE_NAV), so this group is the only
                site-wide link either of them gets. */}
            <nav aria-label={t('reference')}>
              <span className="eyebrow" style={{ marginBottom: 14 }}>
                {t('reference')}
              </span>
              <ul className="footer-links">
                {REFERENCE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="type-small nav-link">
                      {tn(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <span className="eyebrow" style={{ marginBottom: 14 }}>
                {t('company')}
              </span>
              <ul className="footer-links">
                <li>
                  <Link href="/privacy" className="type-small nav-link">
                    {t('privacy')}
                  </Link>
                </li>
                {/* Not a link, so it needs the row height spelled out or it
                    breaks the rhythm of the padded ones next to it. */}
                <li className="type-small mono footer-meta" style={{ color: 'var(--text-quaternary)' }}>
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
