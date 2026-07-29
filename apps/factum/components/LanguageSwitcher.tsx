'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LOCALE_NAMES } from '@/lib/site';
import { Chevron } from './Icons';

/** Autonyms, never flags — a flag is a country, not a language. */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('a11y');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('changeLanguage')}
        className="nav-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          padding: '4px 0',
          cursor: 'pointer',
          font: 'inherit'
        }}
      >
        <span className="mono" style={{ textTransform: 'uppercase' }}>
          {locale}
        </span>
        <Chevron />
      </button>

      {open && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            right: 0,
            zIndex: 70,
            minWidth: 168,
            listStyle: 'none',
            margin: 0,
            padding: 4,
            background: 'var(--surface-2)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 2
          }}
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <Link
                href={pathname}
                locale={loc}
                onClick={() => setOpen(false)}
                lang={loc}
                hrefLang={loc}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '9px 12px',
                  fontSize: '0.875rem',
                  borderRadius: 2,
                  color: loc === locale ? 'var(--text-display)' : 'var(--text-tertiary)',
                  background: loc === locale ? 'var(--surface-3)' : 'transparent'
                }}
              >
                {LOCALE_NAMES[loc]}
                <span className="mono" style={{ textTransform: 'uppercase', opacity: 0.5 }}>
                  {loc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
