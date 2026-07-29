'use client';

import { useTranslations } from 'next-intl';

interface ProgressBarProps {
  current: number; // 1..15
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const t = useTranslations('scorecard.navigation');
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        <span>{t('progress_label', { current, total })}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div
        style={{
          height: '4px',
          width: '100%',
          background: 'var(--bg-elevated)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--accent-primary)',
            transition: 'width 250ms ease',
          }}
        />
      </div>
    </div>
  );
}
