'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Sketch-crosshair cursor that trails on desktop (pointer: fine).
 * At rest: small crosshair dot. On hover: expands to mini crosshair.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 500, damping: 32, restDelta: 0.01 });
  const y = useSpring(rawY, { stiffness: 500, damping: 32, restDelta: 0.01 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [role="button"], label'));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible || reducedMotion) return null;

  const size = hovering ? 28 : 14;
  const half = size / 2;
  const armLen = hovering ? 8 : 4;
  const color = 'var(--accent-cta)';

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: `-${half}px`,
        translateY: `-${half}px`,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 180ms ease, height 180ms ease',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        style={{ display: 'block', opacity: 0.9 }}
      >
        {/* Outer circle */}
        <circle
          cx={half}
          cy={half}
          r={half - 1}
          stroke={color}
          strokeWidth="1"
          opacity={hovering ? 0.7 : 0.5}
        />
        {/* Cross-hair arms */}
        <line x1={half} y1="0" x2={half} y2={armLen} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1={half} y1={size - armLen} x2={half} y2={size} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1={half} x2={armLen} y2={half} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1={size - armLen} y1={half} x2={size} y2={half} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx={half} cy={half} r={hovering ? 2 : 1.5} fill={color} />
      </svg>
    </motion.div>
  );
}
