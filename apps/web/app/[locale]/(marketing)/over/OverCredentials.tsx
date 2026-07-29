'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function OverCredentials() {
  const t = useTranslations('over');
  const CREDS = [
    { value: t('credentials.cred_1_value'), label: t('credentials.cred_1_label'), sub: t('credentials.cred_1_sub') },
    { value: t('credentials.cred_2_value'), label: t('credentials.cred_2_label'), sub: t('credentials.cred_2_sub') },
    { value: t('credentials.cred_3_value'), label: t('credentials.cred_3_label'), sub: t('credentials.cred_3_sub') },
    { value: t('credentials.cred_4_value'), label: t('credentials.cred_4_label'), sub: t('credentials.cred_4_sub') },
  ];

  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container-medium">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '40px' }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('credentials.eyebrow')}</p>
          <h2 className="type-h2" style={{ margin: 0, maxWidth: '520px' }}>
            {t('credentials.heading')}
          </h2>
        </motion.div>

        <motion.div
          className="cred-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {CREDS.map((c) => (
            <motion.div key={c.label} className="cred-card" variants={item}>
              <p className="cred-value">{c.value}</p>
              <p className="cred-label">{c.label}</p>
              <p className="cred-sub">{c.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
