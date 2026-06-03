'use client';

import { motion } from 'framer-motion';

type Row = {
  label: string;
  amount: string;
  value: number; // relative width 0–1
  tone: 'navy' | 'rust' | 'muted';
  note?: string;
};

const ROWS: Row[] = [
  {
    label: 'Eén gemiste correctie op de overnameprijs',
    amount: '€2.500.000',
    value: 1,
    tone: 'navy',
    note: '0,5× op een €5M EBITDA-target',
  },
  {
    label: 'AI Due Diligence — per deal',
    amount: '€10.000',
    value: 0.04,
    tone: 'rust',
    note: 'dekt de correctie 250×',
  },
  {
    label: 'De Scorecard',
    amount: 'Gratis',
    value: 0.012,
    tone: 'muted',
    note: '12 minuten · geen account',
  },
];

const fillFor = (tone: Row['tone']) =>
  tone === 'navy'
    ? 'var(--text-primary)'
    : tone === 'rust'
      ? 'var(--accent-cta)'
      : 'var(--text-muted)';

export default function CostAnchorVisual() {
  return (
    <motion.div
      className="cost-anchor"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="cost-anchor-title">De rekensom</p>
      <div className="cost-anchor-rows">
        {ROWS.map((r, i) => (
          <div key={r.label} className="cost-anchor-row">
            <div className="cost-anchor-head">
              <span className="cost-anchor-label">{r.label}</span>
              <span
                className="cost-anchor-amount"
                style={{ color: r.tone === 'rust' ? 'var(--accent-cta)' : 'var(--text-primary)' }}
              >
                {r.amount}
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
            {r.note && <span className="cost-anchor-note">{r.note}</span>}
          </div>
        ))}
      </div>
      <p className="cost-anchor-foot">
        Bedragen op schaal weergegeven. De meting kost een fractie van wat één blinde vlek kost.
      </p>
    </motion.div>
  );
}
