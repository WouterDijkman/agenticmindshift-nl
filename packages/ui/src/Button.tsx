'use client';

import Link from 'next/link';
import {
  ButtonHTMLAttributes,
  ReactNode,
  useRef,
  MouseEvent,
} from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Cursor-following primary button. Defaults on for backwards compatibility. */
  magnetic?: boolean;
}

interface ButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: undefined;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed';

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-lg min-h-[48px]',
};

function variantStyle(variant: Variant): React.CSSProperties {
  if (variant === 'primary') {
    return {
      // -strong lets a theme darken the fill enough to reach AA against its label
      // without moving the brand accent used decoratively elsewhere.
      background: 'var(--accent-cta-strong, var(--accent-cta))',
      // Light themes keep white; dark themes that fail contrast on the CTA fill
      // set --accent-cta-text to a dark ink instead.
      color: 'var(--accent-cta-text, #ffffff)',
      border: '1px solid var(--accent-cta-strong, var(--accent-cta))',
      borderRadius: 'var(--radius-btn, 4px)',
    };
  }
  return {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    borderRadius: '4px',
  };
}

const SPRING = { stiffness: 280, damping: 18 };
const STRENGTH = 0.32;

/** Magnetic wrapper — only on primary variant, pointer:fine, no-reduced-motion */
function MagneticWrapper({
  children,
  fullWidth = false,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING);
  const y = useSpring(my, SPRING);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * STRENGTH);
    my.set((e.clientY - rect.top - rect.height / 2) * STRENGTH);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        display: fullWidth ? 'block' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
      }}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    magnetic = true,
  } = props;
  const style = variantStyle(variant);
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClass} ${className}`;
  const isPrimary = variant === 'primary' && magnetic;

  if ('href' in props && props.href) {
    const isExternal = props.external || /^https?:\/\//.test(props.href);
    const inner = isExternal ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
        {children}
      </a>
    ) : (
      <Link href={props.href} className={classes} style={style}>
        {children}
      </Link>
    );
    const isFullWidth = className.includes('w-full');
    return isPrimary ? <MagneticWrapper fullWidth={isFullWidth}>{inner}</MagneticWrapper> : inner;
  }

  const { variant: _v, size: _s, children: _c, className: _cn, magnetic: _m, ...rest } =
    props as ButtonProps;
  void _v; void _s; void _c; void _cn; void _m;

  const isFullWidth = className.includes('w-full');
  const inner = (
    <button className={classes} style={style} {...rest}>
      {children}
    </button>
  );
  return isPrimary ? <MagneticWrapper fullWidth={isFullWidth}>{inner}</MagneticWrapper> : inner;
}

export default Button;
