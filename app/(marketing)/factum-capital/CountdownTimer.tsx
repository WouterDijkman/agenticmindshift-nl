'use client';

import { useEffect, useState } from 'react';

const LAUNCH_DATE = new Date('2026-07-01T00:00:00+02:00');

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { value: timeLeft.days, label: 'dagen' },
    { value: timeLeft.hours, label: 'uur' },
    { value: timeLeft.minutes, label: 'min' },
    { value: timeLeft.seconds, label: 'sec' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        border: '1px solid var(--border-medium)',
        overflow: 'hidden',
        width: 'fit-content',
      }}
    >
      {units.map((u, i) => (
        <div
          key={u.label}
          style={{
            padding: '10px 18px',
            borderLeft: i > 0 ? '1px solid var(--border-medium)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            minWidth: '56px',
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1,
              tabularNums: 'tabular-nums',
              fontVariantNumeric: 'tabular-nums',
            } as React.CSSProperties}
          >
            {String(u.value).padStart(2, '0')}
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
