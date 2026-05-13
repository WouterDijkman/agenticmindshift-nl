'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

const navLinks = [
  { href: '/scorecard', label: 'Scorecard' },
  { href: '/werkwijze', label: 'Werkwijze' },
  { href: '/over', label: 'Over' },
  { href: '/factum-capital', label: 'Factum Capital' },
  { href: '/contact', label: 'Contact' },
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
        background: scrolled ? 'rgba(8, 25, 48, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 200ms ease',
      }}
    >
      <div className="container-extra flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          Agentic Mindshift
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/scorecard" variant="primary" size="md">
            Start de Scorecard
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2"
          style={{
            color: 'var(--text-primary)',
            border: '1px solid var(--border-medium)',
            borderRadius: '4px',
            background: 'transparent',
          }}
        >
          <span className="block w-6 h-0.5 mb-1.5" style={{ background: 'currentColor' }} />
          <span className="block w-6 h-0.5 mb-1.5" style={{ background: 'currentColor' }} />
          <span className="block w-6 h-0.5" style={{ background: 'currentColor' }} />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(8,25,48,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-full p-6 flex flex-col gap-5"
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-subtle)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Menu
              </span>
              <button
                type="button"
                aria-label="Sluit menu"
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  background: 'transparent',
                }}
              >
                Sluit
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base"
                  style={{ color: 'var(--text-secondary)' }}
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
        </div>
      )}
    </header>
  );
}
