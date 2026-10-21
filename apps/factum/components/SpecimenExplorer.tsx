'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';

/**
 * The specimen, made clickable: pick a discipline, and the page from the data
 * room on the left and the finding it produced on the right change together.
 *
 * Why (GTM/ops/gemini-boeken-toetsing-2026-10-21.md, "Product-Led Growth"):
 * a prospect should touch the format before talking to anyone. With no client
 * cases to show, three constructed findings on one fictional target are the
 * honest version of that. They are labelled as constructed, and the second
 * one deliberately links to the first, because "finds what links one document
 * to another" is a claim the site makes and a single example cannot show it.
 *
 * Same markup and classes as `Specimen`, so the static and the interactive
 * version cannot drift apart visually. A tablist per WAI-ARIA: arrow keys move
 * between tabs, the panel is labelled by its tab.
 */

/** Deterministic line widths — a random layout would shift between renders. */
const LINES = [96, 88, 92, 74, 90, 84, 96, 61, 88, 93, 79];
const HIGHLIGHT = 6;

export interface SpecimenExample {
  tab: string;
  pageRef: string;
  quote: string;
  /** In row order: module, finding, evidence, severity, document, review. */
  values: string[];
}

export default function SpecimenExplorer({
  tabsLabel,
  pageLabel,
  highlightLabel,
  findingLabel,
  tag,
  rowKeys,
  examples,
  footnote
}: {
  tabsLabel: string;
  pageLabel: string;
  highlightLabel: string;
  findingLabel: string;
  tag: string;
  rowKeys: string[];
  examples: SpecimenExample[];
  footnote: string;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const ex = examples[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + examples.length) % examples.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={tabsLabel} className="specimen-tabs" onKeyDown={onKey}>
        {examples.map((x, i) => (
          <button
            key={x.tab}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="specimen-tab mono"
            onClick={() => setActive(i)}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${base}-tab-${active}`}
        aria-live="polite"
        className="specimen"
      >
        <div className="specimen-page">
          <div className="specimen-page-head">
            <span className="mono">{pageLabel}</span>
            <span className="mono specimen-page-ref">{ex.pageRef}</span>
          </div>

          <div className="specimen-lines">
            {LINES.slice(0, HIGHLIGHT).map((w, i) => (
              <span key={i} className="specimen-line" style={{ width: `${w}%` }} aria-hidden="true" />
            ))}
            {/* Keyed on the tab, so the highlight replays each time the
                finding changes: the eye goes to the passage that backs it. */}
            <blockquote key={active} className="specimen-quote specimen-quote-live type-small">
              {ex.quote}
            </blockquote>
            {LINES.slice(HIGHLIGHT).map((w, i) => (
              <span key={HIGHLIGHT + i} className="specimen-line" style={{ width: `${w}%` }} aria-hidden="true" />
            ))}
          </div>

          <span className="specimen-tag mono">{highlightLabel}</span>
        </div>

        <span className="specimen-tie" aria-hidden="true" />

        <div className="specimen-finding">
          <div className="specimen-finding-head">
            <span className="mono">{findingLabel}</span>
            <span className="mono specimen-badge">{tag}</span>
          </div>
          <dl className="specimen-rows">
            {rowKeys.map((key, i) => (
              <div key={key} className={`specimen-row ${i === 1 ? 'specimen-row-hit' : ''}`}>
                <dt className="schema-key">{key}</dt>
                <dd className="type-small">{ex.values[i]}</dd>
              </div>
            ))}
          </dl>
          <p className="type-small specimen-foot">{footnote}</p>
        </div>
      </div>
    </div>
  );
}
