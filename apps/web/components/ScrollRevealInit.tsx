'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds `.revealed` to every `.reveal` as it enters the viewport.
 *
 * Three ways in, deliberately, because the cost of this component being wrong
 * is a blank page rather than a missing animation:
 *
 *   1. A synchronous pass whenever we (re)observe. IntersectionObserver's
 *      first callback is async and queues behind whatever else the main thread
 *      is doing; on a loaded phone that is a visible delay on content already
 *      on screen.
 *   2. The observer, at `threshold: 0`. It used to be 0.07, which quietly
 *      assumes no target is more than ~14 viewports tall — intersectionRatio
 *      is a fraction of the *target*, so a tall enough section can never reach
 *      7% and would never appear at all.
 *   3. A throttled scroll/resize pass, for the case where the observer is
 *      starved or never fires.
 *
 * A MutationObserver catches elements added after mount (the App Router keeps
 * this component alive across client-side navigation).
 *
 * On top of that, the inline script in the root layout releases the hidden
 * state unconditionally after four seconds. Cancelling that timer here is the
 * signal that this component is alive and has taken over.
 */
export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Honour user preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const failsafe = (window as unknown as { __revealFailsafe?: number })
      .__revealFailsafe;
    if (failsafe) clearTimeout(failsafe);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' }
    );

    // Anything already on screen is revealed straight away rather than waiting
    // for a callback that may be several frames out.
    const sweep = () => {
      const limit = window.innerHeight - 32;
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top < limit && box.bottom > 0) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      });
    };

    // Observe all currently present .reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => obs.observe(el));
      sweep();
    };

    observe();

    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        sweep();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Watch for new .reveal elements added to the DOM (SPA navigation)
    const mutObs = new MutationObserver(() => observe());
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (queued) cancelAnimationFrame(queued);
    };
  }, [pathname]); // re-run on every route change so new elements are caught

  return null;
}
