'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

/**
 * Drives every `.reveal` on the page, plus `.pipeline-stage` on browsers
 * without `animation-timeline: view()`. Each element plays once and is then
 * disarmed permanently — replaying on scroll-back reads cheap.
 *
 * The dependency array is the load-bearing part. This component lives in the
 * locale layout, so it does not remount when you tap a link. It used to run
 * its effect once, with `[]`, which meant that after any in-app navigation the
 * incoming page's reveals were never observed by anyone — and because the
 * hidden state stays armed, every one of them sat at opacity 0 for good. Tap
 * "Platform" in the mobile menu and 111 of 141 text blocks were invisible;
 * reload the same URL and it was fine, which is exactly why this survived so
 * long: every test we had used a direct page load. Hence `pathname` in the
 * deps, and a MutationObserver for anything that arrives later still.
 *
 * Beyond that, three ways in, because the cost of being wrong here is a blank
 * page rather than a missing animation:
 *
 *   1. A synchronous pass whenever we (re)observe. IntersectionObserver's first
 *      callback is async and gets queued behind whatever else the main thread
 *      is doing; on a loaded phone that is a visible delay on content already
 *      on screen. Measuring rects costs one layout we are paying for anyway.
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
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const failsafe = (window as unknown as { __revealFailsafe?: number })
      .__revealFailsafe;
    if (failsafe) clearTimeout(failsafe);

    const targets = new Set<HTMLElement>();

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
    };

    // Picks up everything not already played — on mount, on route change, and
    // on any DOM insertion. Re-observing an element the observer already knows
    // about is a no-op, so this is safe to call as often as it likes.
    const collect = () => {
      const found = document.querySelectorAll<HTMLElement>(
        '.reveal:not([data-shown]), .pipeline-stage:not([data-shown])'
      );
      for (const el of found) {
        targets.add(el);
        observer.observe(el);
      }
      sweep();
    };

    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        sweep();
      });
    };

    collect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Streamed-in or lazily rendered nodes, and the brief window during a
    // client-side navigation where the new tree lands before this effect
    // re-runs.
    let pending = 0;
    const mutations = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        collect();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (queued) cancelAnimationFrame(queued);
      if (pending) cancelAnimationFrame(pending);
    };
  }, [pathname]);

  return null;
}
