'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SceneCard from '@/components/SceneCard';
import { WERKWIJZE_STEPS } from '@/lib/scenes';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.56, ease } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function WerkwijzeOnboardingSteps() {
  const t = useTranslations('werkwijze');
  const steps = [
    { n: '01', title: t('steps.step_1_title'), body: t('steps.step_1_body') },
    { n: '02', title: t('steps.step_2_title'), body: t('steps.step_2_body') },
    { n: '03', title: t('steps.step_3_title'), body: t('steps.step_3_body') },
  ];

  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '44px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '12px' }}>{t('steps.eyebrow')}</p>
          <h2 className="type-h2" style={{ marginBottom: '12px' }}>{t('steps.heading')}</h2>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '400px' }}>
            {t('steps.subtext')}
          </p>
        </motion.div>

        <motion.div
          className="feature-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((s, i) => (
            <motion.div key={s.n} className="wb-card" variants={itemVariants}>
              <SceneCard id={WERKWIJZE_STEPS[i]} chip={s.n} />
              <div className="wb-card-body">
                <h3 className="wb-card-title">{s.title}</h3>
                <p className="wb-card-text">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
