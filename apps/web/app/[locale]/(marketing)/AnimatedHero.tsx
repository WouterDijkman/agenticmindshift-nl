'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import SketchCrosshair from '@/components/icons/SketchCrosshair';
import HeroDataViz from '@/components/HeroDataViz';

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimatedHero() {
  const t = useTranslations('homepage.hero');

  return (
    <section
      className="hero-home grain-overlay"
      style={{
        background: 'var(--bg-primary)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Content */}
      <div
        className="hero-home-content container-medium hero-home-grid"
        style={{
          paddingTop: 'clamp(96px, 11vh, 128px)',
          paddingBottom: 'clamp(48px, 6vh, 72px)',
        }}
      >
       <div className="hero-home-copy">
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              width: '32px',
              height: '1.5px',
              background: 'var(--accent-cta)',
              flexShrink: 0,
              transformOrigin: 'left center',
            }}
          />
          <motion.p
            className="eyebrow"
            style={{ margin: 0 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.38, ease }}
          >
            {t('eyebrow')}
          </motion.p>
        </div>

        {/* H1 — single fade-up (per-word stagger removed: caused glued-words
            on this Next 16 / React 19 / framer 12 combo) */}
        <motion.h1
          className="type-display"
          style={{
            fontSize: 'clamp(32px, 4.4vw, 56px)',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            maxWidth: '900px',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease }}
        >
          {t('heading')}
        </motion.h1>

        {/* Subkop */}
        <motion.p
          style={{
                        fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            marginBottom: '32px',
            letterSpacing: '-0.005em',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.95, ease }}
        >
          {t('subtext')}
        </motion.p>

        {/* CTA */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.15, ease }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Button href="/scorecard" variant="primary" size="lg">
              {t('cta_primary')}
            </Button>
            <a
              href="/werkwijze"
              style={{
                                fontSize: '1.0625rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                paddingBlock: '8px',
              }}
            >
              {t('cta_secondary')} <span style={{ color: 'var(--accent-cta)' }}>→</span>
            </a>
          </div>
          <p
            style={{
                            fontSize: '0.9375rem',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--text-muted)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {t('trust')}
          </p>
        </motion.div>
       </div>

       {/* Data visual */}
       <motion.div
         className="hero-home-visual"
         initial={{ opacity: 0, y: 24 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.35, ease }}
       >
         <HeroDataViz />
       </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.65, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
        className="scroll-indicator"
      >
        <SketchCrosshair size={34} color="var(--text-muted)" opacity={0.35} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
