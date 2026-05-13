'use client';

import { useEffect, useState } from 'react';
import { Dimension, dimensionLabels } from '@/lib/questions';

interface DimensionBarsProps {
  scores: Record<Dimension, number>; // 0..100
  weakest?: string[];
}

const order: Dimension[] = [
  'DealVelocity',
  'PortfolioIntelligence',
  'BiasDetection',
  'AIReadiness',
  'CapacityEngineering',
  'KnowledgeRetention',
];

export default function DimensionBars({ scores, weakest = [] }: DimensionBarsProps) {
  // After mount, the .dim-bar elements transition from width 0 to their
  // final pct over 800ms with a 100ms stagger via inline animation-delay.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(t);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {order.map((dim, idx) => {
        const label = dimensionLabels[dim];
        const val = scores[dim] ?? 0;
        const isWeak = weakest.includes(label);
        const targetPct = `${Math.max(0, Math.min(100, val))}%`;
        return (
          <div key={dim}>
            <div className="flex justify-between items-baseline mb-2">
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </span>
              <span
                className="text-sm"
                style={{ color: isWeak ? 'var(--status-warning)' : 'var(--text-tertiary)' }}
              >
                {val} / 100{isWeak ? ' (aandachtspunt)' : ''}
              </span>
            </div>
            <div
              style={{
                height: '8px',
                width: '100%',
                background: 'var(--bg-elevated)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                className="dim-bar"
                style={{
                  height: '100%',
                  width: mounted ? targetPct : '0%',
                  background: isWeak ? 'var(--status-warning)' : 'var(--accent-primary)',
                  transitionDelay: `${idx * 100}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
