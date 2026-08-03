'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useLocale, useTranslations } from 'next-intl';
import { Dimension } from '@/lib/questions';
import { sectionTranslations } from '@/lib/questions.locales';
import { REFERENCE_LEVELS } from '@/lib/scoring';

interface ReferenceLevelChartProps {
  scores: Record<Dimension, number>; // 0..100
}

const order: Dimension[] = [
  'DealVelocity',
  'PortfolioIntelligence',
  'BiasDetection',
  'AIReadiness',
  'CapacityEngineering',
  'KnowledgeRetention',
];

export default function ReferenceLevelChart({ scores }: ReferenceLevelChartProps) {
  const locale = useLocale();
  const tR = useTranslations('scorecard.rapport');
  const dims = (sectionTranslations[locale] ?? sectionTranslations['nl']).dimensions;

  const data = order.map((dim) => ({
    dimension: dims[dim] ?? dim,
    delta: (scores[dim] ?? 0) - REFERENCE_LEVELS[dim],
    self: scores[dim] ?? 0,
    reference: REFERENCE_LEVELS[dim],
  }));

  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[-60, 60]}
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="dimension"
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
            width={160}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
            }}
            formatter={(value, _name, item) => {
              const n = typeof value === 'number' ? value : Number(value);
              const p = item?.payload as { self: number; reference: number; delta: number } | undefined;
              if (!p || Number.isNaN(n)) return [String(value), 'Delta'];
              return [
                `${n > 0 ? '+' : ''}${n} (${p.self} / ${p.reference})`,
                tR('reference_tooltip_label'),
              ];
            }}
          />
          <Bar dataKey="delta">
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={entry.delta >= 0 ? 'var(--status-success)' : 'var(--accent-cta)'}
              />
            ))}
            <LabelList
              dataKey="delta"
              position="right"
              formatter={(v: unknown) => {
                const n = typeof v === 'number' ? v : Number(v);
                if (Number.isNaN(n)) return '';
                return `${n > 0 ? '+' : ''}${n}`;
              }}
              style={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
        {tR('reference_footer')}
      </p>
    </div>
  );
}
