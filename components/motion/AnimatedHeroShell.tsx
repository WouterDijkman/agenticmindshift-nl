'use client';

/**
 * Generic animated hero shell.
 * 100svh, grain overlay, animated bg char + staggered content entrance.
 * Imported by server-component pages; content passed as children.
 */

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SketchCrosshair from '@/components/icons/SketchCrosshair';
import { ReactNode, useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Decorative background glyph (e.g. "04", "W", "FC") */
  bgChar: string;
  bgCharSize?: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  /** Optional extra content below subtext (CTA, stats strip …) */
  children?: ReactNode;
  containerClass?: string;
  headingMaxWidth?: string;
  centered?: boolean;
}

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function AnimatedHeroShell({
  bgChar,
  bgCharSize = 'clamp(240px, 32vw, 480px)',
  eyebrow,
  heading,
  subtext,
  children,
  containerClass = 'container-medium',
  headingMaxWidth = '800px',
  centered = false,
}: Props) {
  const words = heading.split(' ');
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
      {/* Decorative sketch crosshair — bottom right, very faint */}
      <motion.div
        aria-hidden="true"
        className="hero-crosshair-deco"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.6 }}
        style={{
          position: 'absolute',
          right: '60px',
          bottom: '80px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <SketchCrosshair size={96} color="var(--text-primary)" strokeWidth={0.8} />
      </motion.div>

      {/* Decorative background glyph — parallax */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.022 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          y: parallaxY,
          marginTop: '-0.5em',
          fontSize: bgCharSize,
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--text-primary)',
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
        }}
      >
        {bgChar}
      </motion.div>

      <div
        className={containerClass}
        style={{
          paddingTop: 'clamp(120px, 20vh, 200px)',
          paddingBottom: 'clamp(80px, 10vh, 120px)',
          textAlign: centered ? 'center' : undefined,
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '28px',
            justifyContent: centered ? 'center' : undefined,
          }}
        >
          {!centered && (
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
          )}
          <motion.p
            className="eyebrow"
            style={{ margin: 0 }}
            initial={{ opacity: 0, x: centered ? 0 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: centered ? 0.15 : 0.38, ease }}
          >
            {eyebrow}
          </motion.p>
        </div>

        {/* H1 — word-by-word stagger */}
        <motion.h1
          className="type-display"
          style={{
            marginBottom: '28px',
            color: 'var(--text-primary)',
            maxWidth: centered ? undefined : headingMaxWidth,
            marginInline: centered ? 'auto' : undefined,
          }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.065, delayChildren: 0.5 } },
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={WORD_VARIANTS}
              style={{ display: 'inline-block', marginRight: '0.27em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.375rem, 2.6vw, 2rem)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            maxWidth: centered ? '640px' : '780px',
            marginBottom: children ? '48px' : 0,
            letterSpacing: '-0.005em',
            marginInline: centered ? 'auto' : undefined,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 1.05, ease }}
        >
          {subtext}
        </motion.p>

        {/* Optional extra CTA / stats / badge area */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease }}
          >
            {children}
          </motion.div>
        )}
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
        <SketchCrosshair size={40} color="var(--text-muted)" opacity={0.40} strokeWidth={1.1} />
      </motion.div>
    </section>
  );
}
