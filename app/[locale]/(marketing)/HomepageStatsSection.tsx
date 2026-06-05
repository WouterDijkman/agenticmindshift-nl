'use client';

import CountUpNumber from '@/components/motion/CountUpNumber';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(64px, 8vw, 104px)' }}>
      <div className="container-medium">
        <motion.div
          className="feature-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {STAT_META.map((s, idx) => (
            <motion.div
              key={idx}
              className="feature-card stat-card"
              variants={itemVariants}
            >
              <p className="stat-number">
                <CountUpNumber
                  value={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  duration={1100}
                />
              </p>
              <span className="stat-accent" aria-hidden="true" />
              <p className="feature-kicker stat-label">{t(`label_${s.i}`)}</p>
              <p className="stat-sub">{t(`sub_${s.i}`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
