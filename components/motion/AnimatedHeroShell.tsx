'use client';

/**
 * Generic animated hero shell.
 * 100svh, grain overlay, parallax bg char, CSS-driven content entrance.
 *
 * Note: entrance animations use plain CSS keyframes instead of framer-motion.
 * The framer-motion `initial`+`animate`/`whileInView` pattern proved
 * unreliable on the scorecard layout (Next 16 / React 19 / framer 12 combo) —
 * content stayed at the hidden initial state. CSS animations on mount are
 * bulletproof across layouts.
 *
 * Parallax bg glyph still uses framer-motion because it needs a live scroll
 * motion-value; that path works because it doesn't gate on initial state.
 */

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SketchCrosshair from '@/components/icons/SketchCrosshair';
import { ReactNode, useRef } from 'react';

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

const HERO_ANIM_CSS = `
@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
@keyframes hero-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.hero-anim {
  opacity: 0;
  animation: hero-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-anim-fade {
  opacity: 0;
  animation: hero-fade-in 1.6s ease-out forwards;
}
.hero-anim--eyebrow { animation-delay: 0.05s; }
.hero-anim--h1      { animation-delay: 0.15s; }
.hero-anim--subtext { animation-delay: 0.35s; }
.hero-anim--cta     { animation-delay: 0.55s; }
.hero-anim--bg      { animation-delay: 0.15s; animation-duration: 1.8s; }
.hero-anim--scroll  { animation-delay: 0.9s; animation-duration: 0.6s; }
@media (prefers-reduced-motion: reduce) {
  .hero-anim, .hero-anim-fade {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
`;

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
      <style>{HERO_ANIM_CSS}</style>

      {/* Decorative sketch crosshair — bottom right, very faint */}
      <div
        aria-hidden="true"
        className="hero-crosshair-deco hero-anim-fade hero-anim--bg"
        style={{
          position: 'absolute',
          right: '60px',
          bottom: '80px',
          pointerEvents: 'none',
          userSelect: 'none',
          // final opacity baked into keyframe via CSS var? simpler: lower the
          // strokeWidth/color already gives a faint look; the keyframe goes
          // 0 → 1, so we set the icon's own opacity attr to its target.
          opacity: 0.04,
        }}
      >
        <SketchCrosshair size={96} color="var(--text-primary)" strokeWidth={0.8} />
      </div>

      {/* Decorative background glyph — parallax (kept as motion.div for the
          scroll-linked y value; opacity is static so it always shows) */}
      <motion.div
        aria-hidden="true"
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
          opacity: 0.022,
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
          className="hero-anim hero-anim--eyebrow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '28px',
            justifyContent: centered ? 'center' : undefined,
          }}
        >
          {!centered && (
            <div
              style={{
                width: '32px',
                height: '1.5px',
                background: 'var(--accent-cta)',
                flexShrink: 0,
              }}
            />
          )}
          <p className="eyebrow" style={{ margin: 0 }}>
            {eyebrow}
          </p>
        </div>

        {/* H1 — single fade-up via CSS animation. Per-word stagger was
            removed because it caused glued/overlapping words on this stack
            and CSS animations are bulletproof across layouts. */}
        <h1
          className="type-display hero-anim hero-anim--h1"
          style={{
            marginBottom: '28px',
            color: 'var(--text-primary)',
            maxWidth: centered ? undefined : headingMaxWidth,
            marginInline: centered ? 'auto' : undefined,
          }}
        >
          {heading}
        </h1>

        {/* Subtext */}
        <p
          className="hero-anim hero-anim--subtext"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            maxWidth: centered ? '640px' : '780px',
            marginBottom: children ? '48px' : 0,
            letterSpacing: '-0.005em',
            marginInline: centered ? 'auto' : undefined,
          }}
        >
          {subtext}
        </p>

        {/* Optional extra CTA / stats / badge area */}
        {children && (
          <div className="hero-anim hero-anim--cta">{children}</div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="scroll-indicator hero-anim-fade hero-anim--scroll"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        <SketchCrosshair size={40} color="var(--text-muted)" opacity={0.4} strokeWidth={1.1} />
      </div>
    </section>
  );
}
