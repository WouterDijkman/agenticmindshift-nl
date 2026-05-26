'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  amount?: number;
}

/**
 * Drop-in replacement for .reveal className.
 * Fades and slides up when the element enters the viewport.
 */
export default function MotionSection({
  children,
  delay = 0,
  className,
  style,
  amount = 0.12,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.68, delay, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
