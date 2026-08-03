'use client';

import { useEffect, useRef, useState, CSSProperties } from 'react';
import { useInView } from 'framer-motion';
import { useLocale } from 'next-intl';

interface Props {
  /** Numeric end value */
  value: number;
  /** Decimal places (Dutch formatting: uses comma) */
  decimals?: number;
  /** Text suffix e.g. "×" or "%" */
  suffix?: string;
  /** Text prefix */
  prefix?: string;
  /** Animation duration ms */
  duration?: number;
  /** Delay before counting starts (ms) */
  delay?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * Counts from 0 to `value` with an ease-out cubic curve, starting when the
 * element enters the viewport. Under prefers-reduced-motion the final value is
 * rendered straight away.
 */
export default function CountUpNumber({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1100,
  delay = 0,
  style,
  className,
}: Props) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(value);
      return;
    }

    const timer = setTimeout(() => {
      const startTime = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(eased * value);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplayed(value);
      };
      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay]);

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayed);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
