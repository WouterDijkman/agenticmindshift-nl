import { Link } from '@/i18n/navigation';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

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
            style={{ color: 'var(--text-primary)' }}
          >
            Agentic Mindshift
          </Link>
          <Link
            href="/"
            className="text-sm"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {t('close_scorecard')}
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
