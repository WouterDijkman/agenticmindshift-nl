'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

interface Props {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
}

/**
 * Wraps a list of children and staggers their entrance animation.
 * Each child should NOT have its own initial/animate props —
 * they inherit from this parent via variants.
 */
export default function MotionStagger({
  children,
  stagger = 0.08,
  delay = 0,
  className,
  style,
  amount = 0.1,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
