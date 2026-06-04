import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  const navLinks = [
    { href: '/scorecard', label: tNav('scorecard') },
    { href: '/werkwijze', label: tNav('werkwijze') },
    { href: '/over', label: t('over_wouter') },
    { href: '/factum-capital', label: tNav('factum_capital') },
    { href: '/contact', label: tNav('contact') },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('privacy') },
    { href: '/voorwaarden', label: t('voorwaarden') },
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container-extra" style={{ paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
        <div className="footer-grid">
          {/* Brand block */}
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="Agentic Mindshift"
              width={2448}
              height={1632}
              style={{ height: '52px', width: 'auto', marginBottom: '20px' }}
            />
            <p
              style={{
                                fontSize: '1.0625rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '320px',
              }}
            >
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
              <a
                href="mailto:wouter@agenticmindshift.nl"
                className="footer-pill"
              >
                {t('email_wouter')}
              </a>
              <a
                href="https://www.linkedin.com/in/wwdijkman"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pill"
              >
                {t('linkedin')}
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <p className="footer-heading">{t('navigation')}</p>
            <ul className="footer-list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <p className="footer-heading">{t('legal')}</p>
            <ul className="footer-list">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="footer-cta-card">
            <p className="footer-cta-title">{t('cta_title')}</p>
            <p className="footer-cta-sub">{t('cta_sub')}</p>
            <Link href="/scorecard" className="footer-cta-button">
              {t('start_scorecard')}
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>{t('copyright')}</p>
          <p style={{ margin: 0 }}>{t('tagline_bottom')}</p>
        </div>
      </div>
    </footer>
  );
}
