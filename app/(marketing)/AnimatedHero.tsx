'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import SketchCrosshair from '@/components/icons/SketchCrosshair';

const ease = [0.22, 1, 0.36, 1] as const;

const HEADING = 'U mist rendement dat er al is — en het kost u meer dan u denkt.';

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <section
      ref={sectionRef}
      className="grain-overlay"
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
      {/* Achtergrond glyph — parallax */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.025 }}
        transition={{ duration: 1.8, delay: 0.1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          y: parallaxY,
          marginTop: '-0.5em',
          fontSize: 'clamp(320px, 38vw, 560px)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--text-primary)',
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
        }}
      >
        PE
      </motion.div>

      {/* Sketch crosshair — decoratief rechtsonder */}
      <motion.div
        aria-hidden="true"
        className="hero-crosshair-deco"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.045 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.8 }}
        style={{
          position: 'absolute',
          right: '80px',
          bottom: '90px',
          pointerEvents: 'none',
        }}
      >
        <SketchCrosshair size={88} color="var(--text-primary)" strokeWidth={0.8} />
      </motion.div>

      {/* Content */}
      <div
        className="container-wide"
        style={{
          paddingTop: 'clamp(96px, 11vh, 128px)',
          paddingBottom: 'clamp(48px, 6vh, 72px)',
        }}
      >
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
            Voor PE-partners, M&A-directors en family offices
          </motion.p>
        </div>

        {/* H1 — single fade-up (per-word stagger removed: caused glued-words
            on this Next 16 / React 19 / framer 12 combo) */}
        <motion.h1
          className="type-display"
          style={{
            fontSize: 'clamp(44px, 6.2vw, 88px)',
            marginBottom: '16px',
            color: 'var(--text-primary)',
            maxWidth: '1000px',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease }}
        >
          {HEADING}
        </motion.h1>

        {/* Subkop */}
        <motion.p
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
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
          Uw deal-team herhaalt vermijdbare fouten, uw maandrapportage maskeert
          onderprestatie, en het risico dat AI de kernactiviteit overneemt staat
          in geen enkel IC-voorstel. De Scorecard maakt het zichtbaar — in twaalf minuten.
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
              Start de Scorecard
            </Button>
            <a
              href="/werkwijze"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
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
              Bekijk de werkwijze <span style={{ color: 'var(--accent-cta)' }}>→</span>
            </a>
          </div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: '0.9375rem',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--text-muted)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            12 minuten · 6 dimensies · geen account nodig · 100% vertrouwelijk
          </p>
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
