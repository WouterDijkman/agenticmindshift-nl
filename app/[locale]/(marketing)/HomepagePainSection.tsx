'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { SketchEyeHidden, SketchKnowledge, SketchHourglass } from '@/components/icons/SketchIcons';

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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {PAIN_META.map((p) => (
            <motion.div
              key={p.code}
              variants={itemVariants}
              style={{
                background: 'var(--bg-primary)',
                padding: 'clamp(32px, 4vw, 48px)',
                borderTop: '3px solid transparent',
                transition: 'border-top-color 180ms ease',
              }}
              whileHover={{ borderTopColor: 'var(--accent-cta)' }}
            >
              {/* Icon + big number anchor — visual-first */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px',
                }}
              >
                <div style={{ color: 'var(--accent-cta)', opacity: 0.85 }}>
                  <p.Icon size={52} strokeWidth={1.4} />
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    fontWeight: 600,
                    lineHeight: 1,
                    color: 'var(--accent-cta)',
                    opacity: 0.16,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {p.code}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cta)',
                  marginBottom: '12px',
                  opacity: 0.75,
                }}
              >
                {t(`label_${p.n}`)}
              </p>
              <h3
                style={{
                  fontSize: 'clamp(1.125rem, 1.7vw, 1.375rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  marginBottom: '14px',
                }}
              >
                {t(`title_${p.n}`)}
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {t(`body_${p.n}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
