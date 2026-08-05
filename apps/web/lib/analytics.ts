type EventProps = Record<string, string | number | boolean>;

type PlausibleFn = ((event: string, options?: { props?: EventProps }) => void) & {
  q?: unknown[];
};

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Funnel events that a click handler cannot express: reaching the first
 * question, finishing all fifteen, asking for the written report. Clicks
 * themselves are tagged in the markup instead — see the layout.
 *
 * The script is deferred, so an event fired from a mount effect can arrive
 * first. Plausible drains `plausible.q` when it loads, so the queue is planted
 * here rather than in a script tag that would be racing the same hydration.
 */
export function track(event: string, props?: EventProps) {
  if (typeof window === 'undefined') return;

  if (!window.plausible) {
    const queued: PlausibleFn = (...args) => {
      (queued.q ??= []).push(args);
    };
    window.plausible = queued;
  }

  window.plausible(event, props ? { props } : undefined);
}

const fired = new Set<string>();

/**
 * At most once per page load. The scorecard is re-enterable — a reader can
 * come back to the result page from the report, and React remounts the route
 * on its own — so a per-component guard still inflates the funnel.
 */
export function trackOnce(event: string, props?: EventProps) {
  if (fired.has(event)) return;
  fired.add(event);
  track(event, props);
}
