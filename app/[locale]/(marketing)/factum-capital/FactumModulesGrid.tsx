'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function FactumModulesGrid() {
  const t = useTranslations('factum_capital');
  const launchModules = [
    { n: '01', title: t('modules.m01_title'), body: t('modules.m01_body') },
    { n: '02', title: t('modules.m02_title'), body: t('modules.m02_body') },
    { n: '03', title: t('modules.m03_title'), body: t('modules.m03_body') },
    { n: '04', title: t('modules.m04_title'), body: t('modules.m04_body') },
    { n: '05', title: t('modules.m05_title'), body: t('modules.m05_body') },
    { n: '06', title: t('modules.m06_title'), body: t('modules.m06_body') },
    { n: '07', title: t('modules.m07_title'), body: t('modules.m07_body') },
    { n: '08', title: t('modules.m08_title'), body: t('modules.m08_body') },
    { n: '09', title: t('modules.m09_title'), body: t('modules.m09_body') },
    { n: '10', title: t('modules.m10_title'), body: t('modules.m10_body') },
    { n: '11', title: t('modules.m11_title'), body: t('modules.m11_body') },
    { n: '12', title: t('modules.m12_title'), body: t('modules.m12_body') },
  ];

  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(64px, 9vw, 112px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '56px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('modules.eyebrow')}</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>{t('modules.heading')}</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
            {t('modules.subtext')}
          </p>
        </motion.div>

        <motion.div
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
          viewport={{ once: true, amount: 0.1 }}
        >
          {launchModules.map((m) => (
            <motion.div
              key={m.n}
              className="dim-card"
              variants={itemVariants}
              style={{
                background: 'var(--bg-primary)',
                padding: '28px 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '3px solid transparent',
              }}
              whileHover={{
                borderLeftColor: 'var(--accent-cta)',
                backgroundColor: 'var(--bg-secondary)',
                transition: { duration: 0.18 },
              }}
            >
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--accent-cta)', margin: '0 0 12px' }}>
                {m.n}
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {m.title}
              </p>
              <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {m.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
