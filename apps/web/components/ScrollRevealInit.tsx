'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mounts a single IntersectionObserver that watches all `.reveal` elements
 * and adds the `.revealed` class once they enter the viewport.
 *
 * Uses a MutationObserver to catch elements added after initial mount
 * (client-side navigation in the App Router layout keeps this component alive).
 */
export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Honour user preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
    );

    // Observe all currently present .reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => obs.observe(el));
    };

    observe();

    // Watch for new .reveal elements added to the DOM (SPA navigation)
    const mutObs = new MutationObserver(() => observe());
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
    };
  }, [pathname]); // re-run on every route change so new elements are caught

  return null;
}
