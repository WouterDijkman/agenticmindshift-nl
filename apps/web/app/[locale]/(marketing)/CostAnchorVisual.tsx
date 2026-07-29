'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Row = {
  key: 'row_1' | 'row_2' | 'row_3';
  value: number; // relative width 0–1
  tone: 'navy' | 'rust' | 'muted';
};

const ROWS: Row[] = [
  { key: 'row_1', value: 1, tone: 'navy' },
  { key: 'row_2', value: 0.04, tone: 'rust' },
  { key: 'row_3', value: 0.012, tone: 'muted' },
];

const fillFor = (tone: Row['tone']) =>
  tone === 'navy'
    ? 'var(--text-primary)'
    : tone === 'rust'
      ? 'var(--accent-cta)'
      : 'var(--text-muted)';

export default function CostAnchorVisual() {
  const t = useTranslations('homepage.costAnchor');
  return (
    <motion.div
      className="cost-anchor"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="cost-anchor-title">{t('title')}</p>
      <div className="cost-anchor-rows">
        {ROWS.map((r, i) => (
          <div key={r.key} className="cost-anchor-row">
            <div className="cost-anchor-head">
              <span className="cost-anchor-label">{t(`${r.key}_label`)}</span>
              <span
                className="cost-anchor-amount"
                style={{ color: r.tone === 'rust' ? 'var(--accent-cta-ink)' : 'var(--text-primary)' }}
              >
                {t(`${r.key}_amount`)}
              </span>
            </div>
            <div className="cost-anchor-track">
              <motion.div
                className="cost-anchor-fill"
                style={{ background: fillFor(r.tone) }}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(r.value * 100, 0.8)}%` }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="cost-anchor-note">{t(`${r.key}_note`)}</span>
          </div>
        ))}
      </div>
      <p className="cost-anchor-foot">
        {t('foot')}
      </p>
    </motion.div>
  );
}
