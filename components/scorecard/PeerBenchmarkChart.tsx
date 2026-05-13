'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Dimension, dimensionLabels } from '@/lib/questions';

interface PeerBenchmarkChartProps {
  scores: Record<Dimension, number>; // 0..100
}

// Synthetic peer-median values per dimension (illustrative benchmark).
const peerMedians: Record<Dimension, number> = {
  DealVelocity: 52,
  PortfolioIntelligence: 47,
  BiasDetection: 41,
  AIReadiness: 38,
  CapacityEngineering: 55,
  KnowledgeRetention: 44,
};

const order: Dimension[] = [
  'DealVelocity',
  'PortfolioIntelligence',
  'BiasDetection',
  'AIReadiness',
  'CapacityEngineering',
  'KnowledgeRetention',
];

export default function PeerBenchmarkChart({ scores }: PeerBenchmarkChartProps) {
  const data = order.map((dim) => ({
    dimension: dimensionLabels[dim],
    delta: (scores[dim] ?? 0) - peerMedians[dim],
    self: scores[dim] ?? 0,
    peer: peerMedians[dim],
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
              const p = item?.payload as { self: number; peer: number; delta: number } | undefined;
              if (!p || Number.isNaN(n)) return [String(value), 'Delta'];
              return [
                `${n > 0 ? '+' : ''}${n} (u: ${p.self}, peers: ${p.peer})`,
                'Verschil t.o.v. peer-mediaan',
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
        Vergelijking met synthetische peer-mediaan (op basis van Nederlandse PE/M&amp;A-data).
      </p>
    </div>
  );
}
