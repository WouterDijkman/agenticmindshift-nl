/**
 * Animated chevron-down indicator anchored at the bottom of the hero.
 * Pure decorative — aria-hidden, no interactive behaviour.
 */
export default function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      className="scroll-indicator"
      style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
