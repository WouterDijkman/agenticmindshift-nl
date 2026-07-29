'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

/**
 * Short teaser, not a third retelling of the Factum Capital pitch. The full
 * pitch already lives on factumcapital.eu (the platform's own site) and on
 * /factum-capital (this site's teaser page for it). This section only needs
 * to point people there — it used to duplicate both with a two-track pricing
 * grid and a module mockup, plus a "wachtlijst" CTA for a waitlist that no
 * longer exists now that Factum Capital has shipped.
 */
export default function HomepageFactumSection() {
  const t = useTranslations('homepage.factum');
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(56px, 7vw, 80px)' }}>
      <div className="container-medium">
        <motion.div
          style={{ maxWidth: '640px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
          <h2 className="type-h2" style={{ margin: '0 0 20px', maxWidth: '560px' }}>
            {t('heading')}
          </h2>
          <p style={{ fontSize: 'clamp(1.0625rem, 1.6vw, 1.1875rem)', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 28px' }}>
            {t('body')}
          </p>
          <Button href="/factum-capital" variant="secondary" size="md">
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
