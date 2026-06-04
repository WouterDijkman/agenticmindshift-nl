'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import FactumModulesMockup from '@/components/FactumModulesMockup';

const TRACK_META = [
  { n: '01', key: 'track_1', href: '/scorecard', variant: 'primary' as const },
  { n: '02', key: 'track_2', href: '/factum-capital', variant: 'secondary' as const },
] as const;

export default function HomepageFactumSection() {
  const t = useTranslations('homepage.factum');
  return (
    <section style={{ background: 'var(--bg-secondary)', paddingBlock: 'clamp(80px, 11vw, 136px)' }}>
      <div className="container-medium">
        {/* Heading */}
        <motion.div
          style={{ marginBottom: '56px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow" style={{ marginBottom: '16px' }}>{t('eyebrow')}</p>
          <h2 className="type-h2" style={{ maxWidth: '560px', margin: 0 }}>
            {t('heading')}
          </h2>
        </motion.div>

        {/* Two-track grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '48px',
          }}
        >
          {TRACK_META.map((track, i) => (
            <motion.div
              key={track.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-secondary)',
                padding: 'clamp(36px, 4.5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {/* Tag */}
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-cta)',
                  marginBottom: '24px',
                  opacity: 0.8,
                }}
              >
                {t(`${track.key}_tag`)}
              </p>

              {/* Number */}
              <p
                style={{
                                    fontSize: 'clamp(52px, 6vw, 72px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  color: 'var(--accent-cta)',
                  marginBottom: '28px',
                  opacity: 0.9,
                }}
              >
                {track.n}
              </p>

              {/* Title */}
              <h3
                style={{
                                    fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {t(`${track.key}_title`)}
              </h3>

              {/* Body */}
              <p
                style={{
                                    fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  flexGrow: 1,
                }}
              >
                {t(`${track.key}_body`)}
              </p>

              {/* Detail */}
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.03em',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '20px',
                  marginBottom: '24px',
                }}
              >
                {t(`${track.key}_detail`)}
              </p>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Button href={track.href} variant={track.variant} size="md">
                  {t(`${track.key}_cta`)}
                </Button>
                <p
                  style={{
                                        fontSize: '0.9375rem',
                    fontStyle: 'italic',
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {t(`${track.key}_cta_sub`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform module-grid mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '48px' }}
        >
          <FactumModulesMockup />
        </motion.div>

        {/* Factum platform attribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <Link
            href="/factum-capital"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'border-color 180ms ease, color 180ms ease',
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-cta)',
              }}
            >
              {t('powered_by')}
            </span>
            <span
              style={{
                                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
              }}
            >
              Factum Capital
            </span>
            <span style={{ color: 'var(--accent-cta)', fontSize: '0.875rem' }}>→</span>
          </Link>
          <p
            style={{
                            fontSize: '0.9375rem',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              marginTop: '10px',
            }}
          >
            {t('attribution')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
