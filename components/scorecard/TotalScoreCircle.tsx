'use client';

import { useEffect, useState } from 'react';

interface TotalScoreCircleProps {
  score: number; // 0..75
  max?: number;
  size?: number;
}

export default function TotalScoreCircle({
  score,
  max = 75,
  size = 220,
}: TotalScoreCircleProps) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, score / max));
  const finalOffset = c * (1 - pct);

  // Trigger the transition on mount: start fully unfilled, then animate down
  // to the real offset via CSS transition on stroke-dashoffset (.score-stroke).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(t);
  }, []);

  const currentOffset = mounted ? finalOffset : c;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Score ${score} van ${max}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-elevated)"
          strokeWidth={stroke}
        />
        <circle
          className="score-stroke"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={currentOffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--text-primary)"
          style={{ fontSize: '48px', fontWeight: 600, fontFamily: "'Noto Serif', Georgia, serif" }}
        >
          {score}
        </text>
        <text
          x="50%"
          y="64%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--text-tertiary)"
          style={{ fontSize: '14px', fontFamily: "'Noto Serif', Georgia, serif" }}
        >
          van {max}
        </text>
      </svg>
    </div>
  );
}
