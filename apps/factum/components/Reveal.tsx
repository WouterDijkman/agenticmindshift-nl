import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Reveals are selective by design — not every section gets one. The element is
 * fully laid out at all times; only opacity and transform change, so nothing
 * here contributes to CLS.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay,
  className = '',
  style
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  // Left unset, the delay is inherited from an ancestor `.stagger`. Writing it
  // inline unconditionally would outrank that rule and flatten every sequence.
  return (
    <Tag
      className={`reveal ${className}`}
      style={
        (delay === undefined ? style : { ...style, '--reveal-delay': `${delay}ms` }) as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
