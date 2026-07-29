'use client';

import { useLocale, useTranslations } from 'next-intl';
import { sectionTranslations } from '@/lib/questions.locales';

// Six dimensions, values 0–1. Matches the illustrative report mockup.
const AXES: { key: string; value: number; reference: number }[] = [
  { key: 'DealVelocity', value: 0.58, reference: 0.7 },
  { key: 'PortfolioIntelligence', value: 0.74, reference: 0.68 },
  { key: 'BiasDetection', value: 0.63, reference: 0.66 },
  { key: 'AIReadiness', value: 0.39, reference: 0.64 },
  { key: 'CapacityEngineering', value: 0.71, reference: 0.67 },
  { key: 'KnowledgeRetention', value: 0.46, reference: 0.65 },
];

const CX = 180;
const CY = 180;
const R = 120;
const N = AXES.length;

function point(i: number, radius: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function polygon(values: number[]) {
  return values
    .map((v, i) => {
      const p = point(i, R * v);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(' ');
}

export default function DimensionRadar() {
  const locale = useLocale();
  const t = useTranslations('homepage.dimensions');
  const dims = (sectionTranslations[locale] ?? sectionTranslations['nl']).dimensions;
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox="-72 -8 504 376"
      role="img"
      aria-label={t('radar_aria_label')}
      style={{ width: '100%', height: 'auto', maxWidth: '460px' }}
    >
      {/* concentric grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygon(AXES.map(() => ring))}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={1}
        />
      ))}

      {/* spokes */}
      {AXES.map((_, i) => {
        const p = point(i, R);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="var(--border-subtle)"
            strokeWidth={1}
          />
        );
      })}

      {/* reference-level polygon — navy, dashed outline */}
      <polygon
        points={polygon(AXES.map((a) => a.reference))}
        fill="none"
        stroke="var(--text-primary)"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />

      {/* your profile — rust, filled */}
      <polygon
        points={polygon(AXES.map((a) => a.value))}
        fill="var(--accent-cta)"
        fillOpacity={0.14}
        stroke="var(--accent-cta)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* value vertices */}
      {AXES.map((a, i) => {
        const p = point(i, R * a.value);
        return <circle key={i} cx={p.x} cy={p.y} r={3.2} fill="var(--accent-cta)" />;
      })}

      {/* axis labels */}
      {AXES.map((a, i) => {
        const p = point(i, R + 24);
        const isRight = p.x > CX + 4;
        const isLeft = p.x < CX - 4;
        const anchor = isRight ? 'start' : isLeft ? 'end' : 'middle';
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={11}
            fontWeight={600}
            fontFamily="var(--font-ui)"
            fill="var(--text-muted)"
          >
            {dims[a.key] ?? a.key}
          </text>
        );
      })}
    </svg>
  );
}
