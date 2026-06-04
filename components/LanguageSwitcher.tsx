'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LANG_LABELS: Record<string, string> = {
  nl: 'NL', en: 'EN', de: 'DE', es: 'ES', pt: 'PT',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // returns path WITHOUT locale prefix

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && (
            <span style={{ color: 'var(--border-medium)', fontSize: '0.625rem', paddingInline: '4px', userSelect: 'none' }}>·</span>
          )}
          <button
            onClick={() => switchLocale(loc)}
            style={{
              fontSize: '0.6875rem',
              fontWeight: loc === locale ? 700 : 400,
              letterSpacing: '0.1em',
              color: loc === locale ? 'var(--accent-cta)' : 'var(--text-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              textTransform: 'uppercase',
              lineHeight: 1,
              transition: 'color 150ms ease',
            }}
          >
            {LANG_LABELS[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
