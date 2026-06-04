'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const navLinks = [
  { href: '/scorecard', label: 'Scorecard', badge: null },
  { href: '/werkwijze', label: 'Werkwijze', badge: null },
  { href: '/over', label: 'Over', badge: null },
  { href: '/factum-capital', label: 'Factum Capital', badge: 'juli' },
  { href: '/contact', label: 'Contact', badge: null },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? 'rgba(247, 242, 235, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 220ms ease',
      }}
    >
      <div className="container-extra flex items-center justify-between" style={{ paddingBlock: '14px' }}>
        {/* Logo */}
        <Link
          href="/"
          aria-label="Agentic Mindshift — home"
          className="inline-flex items-center min-h-[44px]"
          style={{ flexShrink: 0 }}
        >
          <Image
            src="/logo.png"
            alt="Agentic Mindshift"
            width={2448}
            height={1632}
            priority
            style={{ height: '66px', width: 'auto' }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link min-h-[44px] inline-flex items-center gap-2"
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.01em',
              }}
            >
              {l.label}
              {l.badge && (
                <span
                  style={{
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-cta)',
                    border: '1px solid var(--accent-cta)',
                    padding: '2px 5px',
                    lineHeight: 1,
                    opacity: 0.75,
                  }}
                >
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button href="/scorecard" variant="primary" size="md">
            Start de Scorecard
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center"
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
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden drawer-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={`lg:hidden drawer-panel ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Hoofdmenu"
      >
        <div className="p-6 flex flex-col gap-5 h-full">
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="Agentic Mindshift" width={2448} height={1632} style={{ height: '48px', width: 'auto' }} />
            <button
              type="button"
              aria-label="Sluit menu"
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
              Sluit
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
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button href="/scorecard" variant="primary" size="lg" className="w-full">
              Start de Scorecard
            </Button>
          </div>
        </div>
      </aside>
    </header>
  );
}
