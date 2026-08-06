'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { factumUrl } from '@/lib/factum';

/**
 * One banner, pointing out.
 *
 * Factum Capital used to be told three times: a teaser section on the
 * homepage, a full /factum-capital page on this site with its own hero,
 * countdown and CTA block, and the platform's own site at factumcapital.eu.
 * The middle one was a second product page for a product that already has
 * one, and it drifted — it was still advertising 31 modules and a
 * four-moment cycle months after the roster was cut to 22 across five.
 *
 * The teaser page is gone and /factum-capital now redirects to the real site.
 * This is the only place either page mentions Factum, and it is a signpost
 * rather than a pitch: name, one sentence, and the address.
 *
 * The link is external and deliberately full-width dark, so it reads as
 * leaving this site rather than as another internal section.
 *
 * `rel` carries `noopener` but no longer `noreferrer`. This is a link between
 * two properties we own, and stripping the Referer header meant Factum's
 * analytics recorded every arrival from here as direct traffic — hiding the
 * one referral path either site has.
 */
export default function FactumBanner() {
  const locale = useLocale();
  const t = useTranslations('factum_banner');

  return (
    <section
      className="grain-overlay"
      data-surface="dark"
      style={{
        background: 'var(--surface-dark)',
        paddingBlock: 'clamp(52px, 6.5vw, 76px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-medium">
        <motion.a
          href={factumUrl(locale)}
          target="_blank"
          rel="noopener"
          className="factum-banner plausible-event-name=Factum+Outbound plausible-event-location=banner"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="factum-banner-text">
            <span className="eyebrow factum-banner-eyebrow">{t('eyebrow')}</span>
            <span className="factum-banner-heading">{t('heading')}</span>
            <span className="factum-banner-body">{t('body')}</span>
          </span>
          <span className="factum-banner-cta">
            {t('cta')} <span aria-hidden="true">↗</span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
