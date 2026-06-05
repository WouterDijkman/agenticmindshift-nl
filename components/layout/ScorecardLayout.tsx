import { Link } from '@/i18n/navigation';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface ScorecardLayoutProps {
  children: ReactNode;
}

export default async function ScorecardLayout({ children }: ScorecardLayoutProps) {
  const t = await getTranslations('scorecard');
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(8, 25, 48, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container-extra flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-base sm:text-lg font-semibold"
            style={{ color: 'var(--text-inverse)' }}
          >
            Agentic Mindshift
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher tone="onDark" />
            <Link
              href="/"
              className="text-sm"
              style={{ color: 'rgba(247, 242, 235, 0.7)' }}
            >
              {t('close_scorecard')}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
