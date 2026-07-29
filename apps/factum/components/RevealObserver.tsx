'use client';

import { useEffect } from 'react';

/**
 * Single observer for every `.reveal` on the page. Each element plays once and
 * is then disarmed permanently — replaying on scroll-back reads cheap, and a
 * live `will-change` on dozens of nodes is a real cost.
 *
 * Also drives `.pipeline-stage` on browsers without `animation-timeline: view()`.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll<HTMLElement>('.reveal, .pipeline-stage');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = 'true';
          observer.unobserve(el);
          el.addEventListener(
            'transitionend',
            () => {
              el.dataset.done = 'true';
            },
            { once: true }
          );
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
