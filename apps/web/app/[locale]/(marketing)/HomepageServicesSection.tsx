'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import SceneCard from '@/components/SceneCard';
import { HOME_SERVICES } from '@/lib/scenes';

const SERVICES = [1, 2, 3] as const;

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/**
 * The offer, on the page that has to sell it.
 *
 * This section did not exist. The three routes lived only on /werkwijze, so a
 * homepage visitor had to click through to a page called "Werkwijze" to find
 * out what was actually for sale. The price sits on the card rather than
 * behind the link, because a partner who cannot find a number assumes the
 * number is bad.
 */
export default function HomepageServicesSection() {
  const locale = useLocale();
  const t = useTranslations('homepage.services');

  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ marginBottom: '52px', maxWidth: '620px' }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
          <h2 className="type-h2" style={{ marginBottom: '16px' }}>{t('heading')}</h2>
          <p
            style={{
              fontSize: 'clamp(1.0625rem, 1.6vw, 1.125rem)',
              color: 'var(--text-muted)',
              margin: 0,
              maxWidth: '48ch',
              lineHeight: 1.65,
            }}
          >
            {t('subheading')}
          </p>
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
          {SERVICES.map((n, i) => (
            <motion.a
              key={n}
              href={`/${locale}/werkwijze`}
              className="wb-card"
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: '0 22px 44px rgba(11, 31, 58, 0.16)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <SceneCard id={HOME_SERVICES[i]} chip={String(n).padStart(2, '0')} />

              <div className="wb-card-body">
                <p className="wb-card-title">{t(`title_${n}`)}</p>
                <p className="wb-card-text">{t(`body_${n}`)}</p>
                <p className="wb-card-price">
                  {t(`price_${n}`)}
                  <span className="wb-card-price-note">{t(`note_${n}`)}</span>
                </p>
                <span className="wb-card-cta">
                  {t('card_cta')} <span aria-hidden="true">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="reveal"
          style={{
            marginTop: '24px',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {t('foot')}
        </motion.p>
      </div>
    </section>
  );
}
