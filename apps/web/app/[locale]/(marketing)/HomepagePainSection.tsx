'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { SketchEyeHidden, SketchKnowledge, SketchHourglass } from '@/components/icons/SketchIcons';
import CardVisual from '@/components/CardVisual';

type SketchIconComponent = ComponentType<{ size?: number; color?: string; opacity?: number; strokeWidth?: number }>;

const PAIN_META: { code: string; n: 1 | 2 | 3; Icon: SketchIconComponent }[] = [
  { code: '01', n: 1, Icon: SketchEyeHidden },
  { code: '02', n: 2, Icon: SketchKnowledge },
  { code: '03', n: 3, Icon: SketchHourglass },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HomepagePainSection() {
  const t = useTranslations('homepage.pain');
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '52px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
          <h2 className="type-h2" style={{ maxWidth: '560px', margin: 0 }}>
            {t('heading')}
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: 'var(--text-muted)', margin: 0, marginTop: '16px', maxWidth: '460px', lineHeight: 1.65, fontStyle: 'italic' }}>
            {t('subheading')}
          </p>
        </motion.div>

        <motion.div
          className="feature-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PAIN_META.map((p) => (
            <motion.div key={p.code} className="wb-card" variants={itemVariants}>
              <CardVisual index={p.n + 10} Icon={p.Icon} chip={p.code} />
              <div className="wb-card-body">
                <p className="feature-kicker" style={{ marginBottom: '10px' }}>
                  {t(`label_${p.n}`)}
                </p>
                <h3 className="wb-card-title">{t(`title_${p.n}`)}</h3>
                <p className="wb-card-text">{t(`body_${p.n}`)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
