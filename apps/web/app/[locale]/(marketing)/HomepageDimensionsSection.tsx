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
import CardVisual from '@/components/CardVisual';

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
          className="wb-card-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 2.4vw, 28px)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {DIMENSION_META.map((d) => (
            <motion.a
              key={d.n}
              href="/scorecard"
              className="wb-card"
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: '0 22px 44px rgba(11, 31, 58, 0.16)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <CardVisual index={d.i} Icon={d.Icon} chip={d.n} />

              <div className="wb-card-body">
                <p className="wb-card-title">{t(`title_${d.i}`)}</p>
                <p className="wb-card-text">{t(`body_${d.i}`)}</p>
                <span className="wb-card-cta">
                  {t('card_cta')} <span aria-hidden="true">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
