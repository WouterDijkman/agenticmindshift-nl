'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import SketchCrosshair from '@/components/icons/SketchCrosshair';
import ScorecardReportMockup from '@/components/ScorecardReportMockup';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Split hero: the claim on the left, the thing you actually receive on the
 * right.
 *
 * An earlier version pulled the right column entirely. Two reasons were given
 * and only one of them still holds. The good one was that the sample card
 * carried an invented number — that is why the artefact here is the real
 * report component, which prints "illustrative example, not real data" on its
 * own face and is the same object the reader gets at the end of the flow. The
 * weaker one was that a second rust accent competes with the CTA; measured
 * against what it buys, it does not come close. The first screen was type on
 * flat paper with the right half empty, and the single most valuable thing a
 * landing page can put beside its headline is a picture of the deliverable.
 *
 * This artefact used to sit at scroll 2850, in a showcase section that has
 * been removed. Everything that section explained is legible from the card's
 * own legend, so the page keeps the proof and loses a screen of scrolling.
 */
export default function AnimatedHero() {
  const locale = useLocale();
  const t = useTranslations('homepage.hero');

  // The trust line is authored as "12 minuten · 6 dimensies · …" in every
  // locale; split on the middot so it can be set as a spec strip.
  const facts = t('trust').split('·').map((s) => s.trim()).filter(Boolean);

  return (
    <section
      className="hero-home grain-overlay"
      style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="hero-home-content container-medium"
        style={{
          /* Bottom pad exceeds top so the optical centre sits above the
             geometric one, leaving room for the scroll cue. */
          paddingTop: 'clamp(64px, 7vh, 88px)',
          paddingBottom: 'clamp(88px, 12vh, 132px)',
        }}
      >
        <div className="hero-home-split">
        <div>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
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
            /* 5.6vw was sized for a headline that had the whole container to
               itself. In half the width it wrapped to five lines and pushed
               the button off the fold. Height gets a vote for the same reason
               it does on the Factum hero: on a first screen the short viewport
               is the binding constraint, not the wide one. */
            fontSize: 'clamp(34px, min(4.05vw, 7.4vh), 60px)',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            maxWidth: '14ch',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease }}
        >
          {t('heading')}
        </motion.h1>

        {/* Subkop — held to a short measure under the wide headline */}
        <motion.p
          style={{
            fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '58ch',
            marginBottom: '34px',
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
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.15, ease }}
        >
          <Button href="/scorecard" variant="primary" size="lg">
            {t('cta_primary')}
          </Button>
          <a
            href={`/${locale}/werkwijze`}
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
              paddingInline: '8px',
            }}
          >
            {t('cta_secondary')} <span style={{ color: 'var(--accent-cta-ink)' }}>→</span>
          </a>
        </motion.div>

        {/* Spec strip — the same facts as before, set as a rule-anchored row so
            the full container width carries weight now the visual is gone. */}
        <motion.ul
          className="hero-specs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.35, ease }}
        >
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </motion.ul>
        </div>

        {/* The deliverable, beside the promise rather than 2,850px under it. */}
        <motion.div
          className="hero-home-artefact showcase-mockup-wrap"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
        >
          <ScorecardReportMockup />
        </motion.div>
        </div>
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
