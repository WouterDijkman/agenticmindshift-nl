'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Fragment, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;
const WORDS = 'Wouter Dijkman'.split(' ');

export default function HeroAnimated() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });
  const t = useTranslations('over');

  return (
    <section
      ref={sectionRef}
      className="hero-full grain-overlay"
      style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.028 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: '-40px',
          top: '50%',
          y: parallaxY,
          marginTop: '-0.5em',
          fontSize: 'clamp(240px, 32vw, 480px)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--text-primary)',
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          userSelect: 'none',
                  }}
      >
        W
      </motion.div>

      <div
        className="hero-full-content container-medium"
        style={{
          paddingTop: 'clamp(90px, 14vh, 150px)',
          paddingBottom: 'clamp(70px, 10vh, 120px)',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}>
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
            {t('hero.eyebrow')}
          </motion.p>
        </div>

        {/* H1 word-by-word */}
        <motion.h1
          className="type-display"
          style={{ marginBottom: '16px', color: 'var(--text-primary)', maxWidth: '720px' }}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
        >
          {WORDS.map((word, i) => (
            // The space must be a real text node between the spans — an inline-block
            // margin looks the same but makes the heading read as "WouterDijkman".
            <Fragment key={i}>
              {i > 0 && ' '}
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                }}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            </Fragment>
          ))}
        </motion.h1>

        {/* Role badge */}
        <motion.p
          style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-cta-ink)',
            marginBottom: '28px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.85, ease }}
        >
          {t('hero.role')}
        </motion.p>

        {/* Subtext */}
        <motion.p
          style={{
            fontSize: '1.1875rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 1.05, ease }}
        >
          {t('hero.subtext')}
        </motion.p>

        {/* A whole first screen about a person, with no way to talk to him.
            The only action on this page sat below four sections of biography,
            which is exactly backwards: someone who reads a founder page is
            already most of the way to booking. The call leads here rather
            than the Scorecard — this page argues from the man, not the
            method. Same strings as the closing band, deliberately: a second
            wording for the same action reads as a second offer. */}
        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginTop: '34px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease }}
        >
          <Button href="https://cal.com/wwdijkman/intake-call" variant="primary" size="lg" external className="plausible-event-name=Intake+CTA plausible-event-location=about-hero">
            {t('contact_cta.cta2')}
          </Button>
          <Button href="/scorecard" variant="secondary" size="lg" className="plausible-event-name=Scorecard+CTA plausible-event-location=about-hero">
            {t('contact_cta.cta1')}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-muted)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
