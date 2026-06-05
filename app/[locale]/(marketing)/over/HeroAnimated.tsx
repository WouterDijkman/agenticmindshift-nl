'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

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
        minHeight: '100svh',
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
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
              style={{ display: 'inline-block', marginRight: '0.27em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Role badge */}
        <motion.p
          style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-cta)',
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
