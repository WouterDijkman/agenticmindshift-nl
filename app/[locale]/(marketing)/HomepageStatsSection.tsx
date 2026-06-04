'use client';

import CountUpNumber from '@/components/motion/CountUpNumber';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SketchCrosshair from '@/components/icons/SketchCrosshair';

const STAT_META: { value: number; decimals: number; suffix: string; i: 1 | 2 | 3 }[] = [
  { value: 0.5, decimals: 1, suffix: '×', i: 1 },
  { value: 3, decimals: 0, suffix: '', i: 2 },
  { value: 12, decimals: 0, suffix: '', i: 3 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HomepageStatsSection() {
  const t = useTranslations('homepage.stats');
  return (
    <section style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {STAT_META.map((s, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{
                padding: 'clamp(40px, 5vw, 72px) clamp(28px, 4vw, 56px)',
                borderRight: idx < 2 ? '1px solid var(--border-subtle)' : 'none',
                borderTop: idx === 0 ? '3px solid var(--accent-cta)' : '3px solid var(--border-medium)',
              }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                <div style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '-16px',
                  pointerEvents: 'none',
                  opacity: 0.04,
                }}>
                  <SketchCrosshair size={72} color="var(--text-primary)" strokeWidth={1} />
                </div>
                <p
                  style={{
                                        fontSize: 'clamp(56px, 8vw, 100px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: 'var(--accent-cta)',
                    position: 'relative',
                  }}
                >
                  <CountUpNumber
                    value={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    duration={1100}
                  />
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-ui, 'Inter', system-ui, sans-serif)",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {t(`label_${s.i}`)}
              </p>
              <p
                style={{
                                    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '260px',
                  margin: 0,
                }}
              >
                {t(`sub_${s.i}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
