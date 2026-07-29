'use client';

import { useEffect } from 'react';

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 * Without this the `.reveal` base rule keeps content at opacity:0, so the
 * observer is what actually makes the page visible. Elements already in view
 * on mount are revealed immediately; anything failing (no IO support) is
 * revealed as a fallback so content is never stuck hidden.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (nodes.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
