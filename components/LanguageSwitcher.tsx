'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';

const LANG_LABELS: Record<string, string> = {
  nl: 'NL', en: 'EN', de: 'DE', es: 'ES', pt: 'PT',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // path WITHOUT locale prefix
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Taal kiezen"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          color: 'var(--text-secondary)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 2px',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {LANG_LABELS[locale]}
        <svg
          width="9"
          height="9"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 180ms ease',
            opacity: 0.6,
          }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: '64px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            padding: '4px',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={loc === locale}
              onClick={() => switchLocale(loc)}
              style={{
                fontSize: '0.75rem',
                fontWeight: loc === locale ? 700 : 400,
                letterSpacing: '0.08em',
                color: loc === locale ? 'var(--accent-cta)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                textAlign: 'left',
                textTransform: 'uppercase',
                lineHeight: 1,
                transition: 'color 150ms ease, background 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (loc !== locale) e.currentTarget.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              {LANG_LABELS[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
