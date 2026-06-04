'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import {
  SketchSpeed,
  SketchPortfolio,
  SketchScale,
  SketchChip,
  SketchGear,
  SketchKnowledge,
} from '@/components/icons/SketchIcons';
import DimensionRadar from '@/components/DimensionRadar';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const DIMENSION_META: { n: string; i: 1 | 2 | 3 | 4 | 5 | 6; Icon: SketchIconComponent }[] = [
  { n: '01', i: 1, Icon: SketchSpeed },
  { n: '02', i: 2, Icon: SketchPortfolio },
  { n: '03', i: 3, Icon: SketchScale },
  { n: '04', i: 4, Icon: SketchChip },
  { n: '05', i: 5, Icon: SketchGear },
  { n: '06', i: 6, Icon: SketchKnowledge },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageDimensionsSection() {
  const t = useTranslations('homepage.dimensions');
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <motion.div
          className="dim-header-grid"
          style={{ marginBottom: '64px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
            <h2 className="type-h2" style={{ marginBottom: '16px' }}>{t('heading')}</h2>
            <p style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.125rem)', color: 'var(--text-muted)', margin: 0, maxWidth: '440px', lineHeight: 1.65 }}>
              {t('subheading')}
            </p>
          </div>
          <div className="dim-radar-wrap">
            <DimensionRadar />
            <div className="dim-radar-legend">
              <span className="dim-radar-legend-item">
                <span className="dim-radar-swatch" style={{ background: 'var(--accent-cta)' }} />
                {t('legend_example')}
              </span>
              <span className="dim-radar-legend-item">
                <span className="dim-radar-swatch dim-radar-swatch--peer" />
                {t('legend_peer')}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dim-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {DIMENSION_META.map((d) => (
            <motion.div
              key={d.n}
              className="dim-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-secondary)',
                padding: '40px 32px 44px',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '3px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => { window.location.href = '/scorecard'; }}
              whileHover={{
                borderLeftColor: 'var(--accent-cta)',
                backgroundColor: 'var(--bg-primary)',
                x: 2,
                transition: { duration: 0.2 },
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '0 0 14px',
                  color: 'var(--accent-cta)',
                }}
              >
                <div style={{ opacity: 0.82 }}>
                  <d.Icon size={36} strokeWidth={1.4} />
                </div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    color: 'var(--accent-cta)',
                    margin: 0,
                  }}
                >
                  {d.n}
                </p>
              </div>
              <p
                style={{
                                    fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 14px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                {t(`title_${d.i}`)}
              </p>
              <p
                style={{
                                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                }}
              >
                {t(`body_${d.i}`)}
              </p>
              <p
                className="dim-card-cta"
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--accent-cta)',
                  margin: '16px 0 0',
                  fontWeight: 600,
                  opacity: 0,
                  transition: 'opacity 200ms ease',
                  letterSpacing: '0.02em',
                }}
              >
                {t('card_cta')}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
