'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

const LANG_LABELS: Record<string, string> = {
  nl: 'NL',
  en: 'EN',
  de: 'DE',
  es: 'ES',
  pt: 'PT',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.replace(/^\/(nl|en|de|es|pt)/, '') || '/';
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          style={{
            fontSize: '0.6875rem',
            fontWeight: loc === locale ? 700 : 400,
            letterSpacing: '0.1em',
            color: loc === locale ? 'var(--accent-cta)' : 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 2px',
            textTransform: 'uppercase',
          }}
        >
          {LANG_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
