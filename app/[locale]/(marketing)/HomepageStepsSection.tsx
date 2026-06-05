'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { SketchClipboard, SketchReport, SketchArrow } from '@/components/icons/SketchIcons';
import CardVisual from '@/components/CardVisual';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const STEP_META: { n: '01' | '02' | '03'; i: 1 | 2 | 3; Icon: SketchIconComponent }[] = [
  { n: '01', i: 1, Icon: SketchClipboard },
  { n: '02', i: 2, Icon: SketchReport },
  { n: '03', i: 3, Icon: SketchArrow },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HomepageStepsSection() {
  const t = useTranslations('homepage.steps');
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '64px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
          <h2 className="type-h2" style={{ margin: 0, maxWidth: '480px' }}>
            {t('heading')}
          </h2>
        </motion.div>

        <motion.div
          className="feature-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEP_META.map((s) => (
            <motion.div key={s.n} className="wb-card" variants={itemVariants}>
              <CardVisual index={s.i + 22} Icon={s.Icon} chip={s.n} scene="chart" />
              <div className="wb-card-body">
                <h3 className="wb-card-title">{t(`title_${s.i}`)}</h3>
                <p className="wb-card-text">{t(`body_${s.i}`)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
