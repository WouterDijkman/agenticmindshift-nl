'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@repo/ui/Button';
import { Link, usePathname } from '@/i18n/navigation';
import { INTAKE_URL, NAV } from '@/lib/site';
import LanguageSwitcher from './LanguageSwitcher';

export default function SiteHeader() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          height: 68
        }}
      >
        <Link href="/" className="wordmark" aria-label="Factum Capital">
          Factum<span>.</span>
        </Link>

        <nav
          aria-label={t('primary')}
          className="nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: 28 }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="nav-desktop">
            <LanguageSwitcher />
          </div>
          <div className="nav-desktop">
            <Button href={INTAKE_URL} size="md" magnetic={false} className="text-sm">
              {t('cta')}
            </Button>
          </div>
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t(menuOpen ? 'closeMenu' : 'openMenu')}
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--hairline-strong)',
              borderRadius: 2,
              color: 'var(--text-display)',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              {menuOpen ? (
                <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
              ) : (
                <path d="M2 4.5h12M2 11.5h12" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: '68px 0 0',
            background: 'var(--surface-0)',
            borderTop: '1px solid var(--hairline)',
            padding: '8px clamp(20px, 5vw, 56px) 40px',
            overflowY: 'auto'
          }}
        >
          <nav aria-label={t('primary')} style={{ display: 'grid' }}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hairline-bottom"
                style={{
                  padding: '18px 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  color: pathname === item.href ? 'var(--text-display)' : 'var(--text-secondary)'
                }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Button href={INTAKE_URL} size="lg" magnetic={false} className="w-full">
              {t('cta')}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
