'use client';

import { useEffect } from 'react';

/**
 * Drives every `.reveal` on the page, plus `.pipeline-stage` on browsers
 * without `animation-timeline: view()`. Each element plays once and is then
 * disarmed permanently — replaying on scroll-back reads cheap.
 *
 * Three ways in, deliberately, because the cost of this component being wrong
 * is a blank page rather than a missing animation:
 *
 *   1. A synchronous pass on mount. IntersectionObserver's first callback is
 *      async and gets queued behind whatever else the main thread is doing; on
 *      a loaded phone that is a visible delay on content that is already on
 *      screen. Measuring rects once costs one layout we are paying for anyway.
 *   2. The observer, at `threshold: 0`. It used to be 0.1, which quietly
 *      assumes every target is shorter than about ten viewports —
 *      intersectionRatio is a fraction of the *target*, so a tall enough
 *      section can never reach 10% and would never appear at all.
 *   3. A throttled scroll/resize pass. If the observer is starved or never
 *      fires, this still gets the content on screen.
 *
 * On top of that, the inline script in the layout releases the hidden state
 * unconditionally after four seconds. We cancel that timer here, which is the
 * signal that this component is alive and has taken over.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = new Set(
      document.querySelectorAll<HTMLElement>('.reveal, .pipeline-stage')
    );
    if (!targets.size) return;

    const failsafe = (window as unknown as { __revealFailsafe?: number })
      .__revealFailsafe;
    if (failsafe) clearTimeout(failsafe);

    const show = (el: HTMLElement) => {
      targets.delete(el);
      el.dataset.shown = 'true';
      el.addEventListener(
        'transitionend',
        () => {
          el.dataset.done = 'true';
        },
        { once: true }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          show(entry.target as HTMLElement);
        }
      },
      // Same 12% bottom inset as the manual pass below: an element starts
      // moving a little before its top edge reaches the bottom of the screen.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 }
    );

    const sweep = () => {
      const limit = window.innerHeight * 0.88;
      for (const el of [...targets]) {
        const box = el.getBoundingClientRect();
        if (box.top < limit && box.bottom > 0) {
          observer.unobserve(el);
          show(el);
        }
      }
      if (!targets.size) stopSweeping();
    };

    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        sweep();
      });
    };
    const stopSweeping = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    targets.forEach((el) => observer.observe(el));
    sweep();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      stopSweeping();
      if (queued) cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
