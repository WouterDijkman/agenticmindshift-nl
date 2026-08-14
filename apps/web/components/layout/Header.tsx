'use client';

import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ease = [0.22, 1, 0.36, 1] as const;

// The Scorecard used to lead this list and own the header button. It was a
// free questionnaire being asked to carry the proposition of a consultancy;
// the header now offers the thing the firm actually wants, which is a
// twenty-minute conversation.
const navLinks = [
  { href: '/werkwijze', labelKey: 'werkwijze', badged: false },
  { href: '/over', labelKey: 'over', badged: false },
  { href: '/contact', labelKey: 'contact', badged: false },
] as const;

const INTAKE_URL = 'https://cal.com/wwdijkman/intake-call';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Scroll lock on the *root* element, not on body. This header is
   * `sticky top-0`, and sticky resolves against the nearest scrollport: give
   * body a non-visible overflow and body becomes that scrollport, with a
   * scrollTop of 0, so the bar is painted at the top of the document rather
   * than the top of the screen. Measured on the sibling site: opening the menu
   * 2200px down moved the header to `top: -2200`. Locking the root keeps the
   * viewport as the scrollport and still stops the page scrolling.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      root.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        height: 'var(--header-h)',
        background: scrolled ? 'rgba(247, 242, 235, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 220ms ease',
      }}
    >
      <div className="container-extra flex h-full items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{ flexShrink: 0 }}
        >
          <Link
            href="/"
            aria-label="Agentic Mindshift — home"
            className="inline-flex items-center min-h-[44px]"
          >
            <Image
              src="/logo.svg"
              alt="Agentic Mindshift"
              width={1500}
              height={487}
              priority
              className="h-9 sm:h-10 w-auto"
            />
          </Link>
        </motion.div>

        <nav
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((l) => {
            const active = pathname === l.href;
            const showUnderline = hovered ? hovered === l.href : active;
            return (
              <div
                key={l.href}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHovered(l.href)}
              >
                <Link
                  href={l.href}
                  className="min-h-[44px] inline-flex items-center gap-2 px-3"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '0.01em',
                    transition: 'color 200ms ease',
                  }}
                >
                  {t(l.labelKey)}
                  {l.badged && (
                    <motion.span
                      animate={{ opacity: [0.55, 0.9, 0.55] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        fontSize: '8px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-cta-ink)',
                        border: '1px solid var(--accent-cta)',
                        padding: '2px 5px',
                        lineHeight: 1,
                      }}
                    >
                      {t('badge_soon')}
                    </motion.span>
                  )}
                </Link>
                {showUnderline && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      left: 12,
                      right: 12,
                      bottom: 6,
                      height: '1.5px',
                      background: 'var(--accent-cta)',
                      borderRadius: '1px',
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button href={INTAKE_URL} variant="primary" size="md" external className="plausible-event-name=Intake+CTA plausible-event-location=header">
            {t('cta')}
          </Button>
        </div>

        {/* Language switcher + hamburger grouped on the right on mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />

        <button
          type="button"
          aria-label={mobileOpen ? t('close_menu') : t('open_menu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center"
          style={{
            color: 'var(--text-primary)',
            border: '1px solid var(--border-medium)',
            borderRadius: '2px',
            background: 'transparent',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'currentColor',
              marginBottom: '5px',
              transition: 'transform 200ms ease, opacity 200ms ease',
              transformOrigin: 'center',
              transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'currentColor',
              marginBottom: '5px',
              transition: 'transform 200ms ease, opacity 200ms ease',
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? 'scaleX(0)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'currentColor',
              transition: 'transform 200ms ease, opacity 200ms ease',
              transformOrigin: 'center',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
            }}
          />
        </button>
        </div>{/* end mobile group */}
      </div>{/* end container-extra */}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden drawer-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={`lg:hidden drawer-panel ${mobileOpen ? 'open' : ''}`}
        // `inert` rather than aria-hidden: the closed drawer stays in the DOM and
        // its links would otherwise still be tab-reachable behind the page.
        inert={!mobileOpen}
        role="dialog"
        aria-label={t('main_menu')}
      >
        <div className="p-6 flex flex-col gap-5 h-full">
          <div className="flex items-center justify-between">
            <Image src="/logo.svg" alt="Agentic Mindshift" width={1500} height={487} className="h-9 w-auto" />
            <button
              type="button"
              aria-label={t('close_menu')}
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] min-w-[44px]"
              style={{
                color: 'var(--text-primary)',
                border: '1px solid var(--border-medium)',
                borderRadius: '2px',
                padding: '6px 12px',
                background: 'transparent',
                fontSize: '0.875rem',
              }}
            >
              {t('close')}
            </button>
          </div>
          <nav className="flex flex-col gap-1 mt-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link min-h-[44px] inline-flex items-center"
                style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}
              >
                {t(l.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <Button href={INTAKE_URL} variant="primary" size="lg" external className="w-full plausible-event-name=Intake+CTA plausible-event-location=header-mobile">
              {t('cta')}
            </Button>
          </div>
        </div>
      </aside>
    </header>
  );
}
