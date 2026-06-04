'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';

export default function HomepageShowcaseSection() {
  const t = useTranslations('homepage.showcase');
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(72px, 10vw, 120px)' }}>
      <div className="container-medium">
        <div className="showcase-grid">
          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
            <h2 className="type-h2" style={{ marginBottom: '20px', maxWidth: '460px' }}>
              {t('heading')}
            </h2>
            <p
              style={{
                                fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '440px',
                marginBottom: '28px',
              }}
            >
              {t('body')}
            </p>

            <ul className="showcase-checklist">
              {[t('check_1'), t('check_2'), t('check_3')].map((item) => (
                <li key={item}>
                  <span aria-hidden="true" className="showcase-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '32px' }}>
              <Button href="/scorecard" variant="primary" size="lg">
                {t('cta')}
              </Button>
            </div>
          </motion.div>

          {/* ── Right: report mockup ── */}
          <motion.div
            className="showcase-mockup-wrap"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <ScorecardReportMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
