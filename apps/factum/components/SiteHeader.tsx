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

  /**
   * Scroll lock while the menu is open — on the *root* element, not on body.
   *
   * `document.body.style.overflow = 'hidden'` is the reflex, and it silently
   * eats this header. `.site-header` is `position: sticky`, which resolves
   * against the nearest scrollport; giving body a non-visible overflow makes
   * body itself a scroll container, so the header re-anchors to a box whose
   * scrollTop is 0 and is drawn at the top of the *document*. Open the menu
   * 2200px down the page and the bar is rendered 2200px above the viewport:
   *
   *   body overflow:hidden   header top = -2200   ** gone
   *   html overflow:hidden   header top =     0   held, and scroll still locked
   *
   * Measured on the live site at 390px, Pixel 7 UA. The reported symptom was
   * "the top bar should be fixed when I press on a link there": you scroll
   * down, tap the hamburger to reach a link, and the bar you just tapped is
   * gone, with page content showing through the overlay's top 68px.
   *
   * Locking the root keeps the viewport as the scrollport, so sticky is
   * unaffected, and `overflow: hidden` on the root still stops the user from
   * scrolling. Restoring to '' hands control back to the stylesheet, which
   * sets `overflow-x: hidden` on html.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      root.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
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
          FACTUM<span>.</span>
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
            <Button href={INTAKE_URL} size="md" magnetic={false} className="text-sm plausible-event-name=Intake+CTA plausible-event-location=header">
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
      </header>

      {/*
        Outside the <header>, deliberately.

        `.site-header[data-scrolled="true"]` sets `backdrop-filter`, and any
        non-`none` filter, backdrop-filter or transform makes an element the
        containing block for its `position: fixed` descendants. So the moment you
        scrolled past 8px, this panel stopped resolving against the viewport and
        started resolving against the 68px-tall header box: `inset: 68px 0 0`
        collapsed to top 68, bottom 68, and the panel was drawn as a 49px sliver
        (0 content + its own 48px of padding) with the links spilling out over the
        page behind it. Measured live at 390px, Pixel 7 UA:

          y=0     header backdrop none    panel 68..844  h=776   full screen
          y=600   header backdrop blur    panel 68..117  h= 49   ** sliver
          y=2200  header backdrop blur    panel 68..117  h= 49   ** sliver

        That is the reported "the dropdown menu doesnt appear in view fully, it
        just comes up partly" — and it only reproduces once the page is scrolled,
        which is why opening the menu at the top of the page always looked right.

        As a sibling the panel resolves against the viewport again at every scroll
        position. It sits below the 68px bar, so it never overlaps it; z-index 59
        keeps the bar (60) on top anyway, so the close button stays reachable.
      */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: '68px 0 0',
            zIndex: 59,
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
            <Button href={INTAKE_URL} size="lg" magnetic={false} className="w-full plausible-event-name=Intake+CTA plausible-event-location=header-mobile">
              {t('cta')}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </>
  );
}
