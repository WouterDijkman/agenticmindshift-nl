'use client';

import { Fragment, useMemo, useState, type ReactNode } from 'react';
import {
  DEMO_DOC_COUNT,
  DEMO_DOCS,
  DEMO_DOMAINS,
  DEMO_EXPECTED,
  DEMO_FINDINGS,
  DEMO_TARGET,
  type DemoCalcLine,
  type DemoCopy,
  type DemoDomain,
  type DemoFindingData,
  type DemoRef
} from '@/lib/demoData';
import './AppDemo.css';

/**
 * The review workspace, as a working screen inside the page.
 *
 * Structure copied from the product, not its code (factum/src/components/
 * deals: DomainRail, BeoordeelWerkplek, BevindingKaart, Besluitbalk,
 * AanleverlijstVdr): a top band with the dossier and its stations, a rail of
 * disciplines with counts, the finding in the centre with the six output
 * fields plus its reasoning and calculation, the source passage beside it,
 * and the decision bar under the finding. A "missing documents" view sits in
 * the rail like it does in the app.
 *
 * Why it replaced SpecimenExplorer (21-10-2026): three one-paragraph cards
 * did not show the depth of a real finding, and they sat halfway down the
 * page. This is the first thing under the page header now.
 *
 * Decisions live in component state only. Nothing is stored, sent or
 * remembered; the bar says so.
 */

type Decision =
  | { kind: 'approved' }
  | { kind: 'adjusted'; text: string }
  | { kind: 'investigate'; route: number }
  | { kind: 'rejected'; reason: number };

type Panel = null | 'adjust' | 'investigate' | 'reject';
type View = DemoDomain | 'missing';

const INTL: Record<string, string> = { en: 'en-GB', nl: 'nl-NL', de: 'de-DE', es: 'es-ES', pt: 'pt-PT' };

/** Deterministic line widths for the schematic page. */
const LINES_TOP = [94, 86, 91, 72];
const LINES_BOTTOM = [89, 95, 63];

const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));

export default function AppDemo({ locale, copy }: { locale: string; copy: DemoCopy }) {
  const c = copy.chrome;
  const [view, setView] = useState<View>('financial');
  const [index, setIndex] = useState(0);
  const [panel, setPanel] = useState<Panel>(null);
  const [draft, setDraft] = useState('');
  const [sourceMode, setSourceMode] = useState<'schematic' | 'original'>('schematic');
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const intl = INTL[locale] ?? 'en-GB';
  const fmt = useMemo(() => {
    const eur = new Intl.NumberFormat(intl, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    const pct = new Intl.NumberFormat(intl, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const dec = new Intl.NumberFormat(intl, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const int = new Intl.NumberFormat(intl, { maximumFractionDigits: 0 });
    return (l: DemoCalcLine) =>
      l.u === 'pct' ? pct.format(l.v) : l.u === 'x' ? `${dec.format(l.v)}×` : l.u === 'n' ? int.format(l.v) : eur.format(l.v);
  }, [intl]);

  const byDomain = (d: DemoDomain) => DEMO_FINDINGS.filter((f) => f.domain === d);
  const open = DEMO_FINDINGS.filter((f) => !decisions[f.id]).length;
  const missingCount = DEMO_EXPECTED.filter((e) => !e.files).length;

  const list = view === 'missing' ? [] : byDomain(view);
  const finding = list[Math.min(index, list.length - 1)];

  const go = (v: View, i = 0) => {
    setView(v);
    setIndex(i);
    setPanel(null);
    setSourceMode('schematic');
  };

  const decide = (d: Decision | null) => {
    if (!finding) return;
    setDecisions((prev) => {
      const next = { ...prev };
      if (d) next[finding.id] = d;
      else delete next[finding.id];
      return next;
    });
    setPanel(null);
  };

  const loc = (r: DemoRef, withTotal = false) => {
    const doc = DEMO_DOCS[r.doc];
    const parts: string[] = [];
    if (r.clause) parts.push(r.clause);
    if (r.page) {
      const total = 'pages' in doc ? doc.pages : undefined;
      parts.push(withTotal && total ? fill(c.pageOf, { n: r.page, total }) : fill(c.page, { n: r.page }));
    }
    if (r.sheet) parts.push(fill(c.sheet, { s: r.cell ? `${r.sheet}!${r.cell}` : r.sheet }));
    return parts.join(' · ');
  };

  return (
    <div className="ad">
      <div className="ad-screen" role="region" aria-label={c.screenLabel}>
        {/* Top band: the dossier and the three stations. */}
        <header className="ad-top">
          <div className="ad-top-row">
            <span className="ad-back" aria-hidden="true">
              ← {c.back}
            </span>
            <span className="ad-deal">{DEMO_TARGET}</span>
            <ol className="ad-stations">
              {c.stations.map((s, i) => (
                <li key={s} aria-current={i === 1 ? 'step' : undefined} className={i === 1 ? 'is-on' : undefined}>
                  <span className="ad-mono">{i + 1}.</span> {s}
                </li>
              ))}
            </ol>
            <span className="ad-badge">{c.badge}</span>
          </div>
          <p className="ad-top-sub">
            <span>{fill(c.dealNote, { docs: DEMO_DOC_COUNT })}</span>
            <span className="ad-sep" aria-hidden="true">
              ·
            </span>
            <span aria-live="polite">{open ? fill(c.waiting, { n: open }) : c.decidedAll}</span>
          </p>
        </header>

        <div className={`ad-body${view === 'missing' ? ' is-missing' : ''}`}>
          {/* Rail: chips on a phone, a column on a desk. */}
          <nav className="ad-rail" aria-label={c.railLabel}>
            {DEMO_DOMAINS.map((d) => {
              const items = byDomain(d);
              const left = items.filter((f) => !decisions[f.id]).length;
              const sev = (['critical', 'high', 'medium'] as const)
                .map((s) => [s, items.filter((f) => f.severity === s).length] as const)
                .filter(([, n]) => n > 0);
              return (
                <button
                  key={d}
                  type="button"
                  className={`ad-rail-item${view === d ? ' is-on' : ''}`}
                  aria-current={view === d ? 'true' : undefined}
                  onClick={() => go(d)}
                >
                  <span className={`ad-dot${left ? '' : ' is-done'}`} aria-hidden="true" />
                  <span className="ad-rail-name">{c.domains[d]}</span>
                  <span className="ad-rail-count ad-mono">{items.length}</span>
                  <span className="ad-rail-meta">
                    {sev.map(([s, n]) => `${n} ${c.severity[s].toLowerCase()}`).join(' · ')}
                  </span>
                  <span className="ad-rail-meta">{left ? fill(c.railOpen, { n: left }) : c.railDone}</span>
                </button>
              );
            })}
            <button
              type="button"
              className={`ad-rail-item ad-rail-missing${view === 'missing' ? ' is-on' : ''}`}
              aria-current={view === 'missing' ? 'true' : undefined}
              onClick={() => go('missing')}
            >
              <span className="ad-dot is-gap" aria-hidden="true" />
              <span className="ad-rail-name">{c.missingTab}</span>
              <span className="ad-rail-count ad-mono">{missingCount}</span>
              <span className="ad-rail-meta">{fill(c.missingCount, { n: missingCount })}</span>
            </button>
          </nav>

          {view === 'missing' ? (
            <Missing copy={copy} />
          ) : finding ? (
            <>
              <Card
                key={finding.id}
                f={finding}
                copy={copy}
                count={list.length}
                index={list.indexOf(finding)}
                onIndex={(i) => go(view, i)}
                decision={decisions[finding.id]}
                panel={panel}
                setPanel={(p) => {
                  setPanel(p);
                  if (p === 'adjust') {
                    const d = decisions[finding.id];
                    setDraft(d?.kind === 'adjusted' ? d.text : copy.findings[finding.id].finding);
                  }
                }}
                draft={draft}
                setDraft={setDraft}
                decide={decide}
                fmt={fmt}
                loc={loc}
              />
              <Source
                key={`${finding.id}-src`}
                f={finding}
                copy={copy}
                mode={sourceMode}
                setMode={setSourceMode}
                loc={loc}
              />
            </>
          ) : null}
        </div>
      </div>
      <p className="ad-foot">{c.footnote}</p>
    </div>
  );
}

/** `[n]` in reasoning becomes a numbered reference chip. */
function withRefs(text: string, f: DemoFindingData, loc: (r: DemoRef) => string): ReactNode[] {
  return text.split(/(\[\d+\])/).map((part, i) => {
    const m = /^\[(\d+)\]$/.exec(part);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    const r = f.refs[Number(m[1]) - 1];
    return <RefChip key={i} n={Number(m[1])} title={r ? `${DEMO_DOCS[r.doc].title}, ${loc(r)}` : undefined} />;
  });
}

function RefChip({ n, title }: { n: number; title?: string }) {
  return (
    <span className="ad-ref ad-mono" title={title}>
      {n}
    </span>
  );
}

function Row({ label, children, strong }: { label: string; children: ReactNode; strong?: boolean }) {
  return (
    <div className={`ad-row${strong ? ' is-strong' : ''}`}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Card({
  f,
  copy,
  count,
  index,
  onIndex,
  decision,
  panel,
  setPanel,
  draft,
  setDraft,
  decide,
  fmt,
  loc
}: {
  f: DemoFindingData;
  copy: DemoCopy;
  count: number;
  index: number;
  onIndex: (i: number) => void;
  decision?: Decision;
  panel: Panel;
  setPanel: (p: Panel) => void;
  draft: string;
  setDraft: (s: string) => void;
  decide: (d: Decision | null) => void;
  fmt: (l: DemoCalcLine) => string;
  loc: (r: DemoRef, withTotal?: boolean) => string;
}) {
  const c = copy.chrome;
  const t = copy.findings[f.id];
  const marked = f.source
    .filter((b) => b.mark)
    .map((b) => (b.mark === true ? b.text : b.mark))
    .join(' ');

  const reviewText = !decision
    ? c.review.pending
    : decision.kind === 'approved'
      ? c.review.approved
      : decision.kind === 'adjusted'
        ? c.review.adjusted
        : decision.kind === 'investigate'
          ? fill(c.review.investigate, { route: c.routes[decision.route] })
          : fill(c.review.rejected, { reason: c.reasons[decision.reason] });

  return (
    <article className="ad-card" aria-labelledby={`ad-title-${f.id}`}>
      <div className="ad-card-head">
        <span className="ad-mono ad-id">{f.id}</span>
        <span className={`ad-sev is-${f.severity}`}>{c.severity[f.severity]}</span>
        <span className="ad-pager">
          <button type="button" aria-label={c.prev} disabled={index <= 0} onClick={() => onIndex(index - 1)}>
            ‹
          </button>
          <span className="ad-mono">{fill(c.counter, { i: index + 1, n: count })}</span>
          <button type="button" aria-label={c.next} disabled={index >= count - 1} onClick={() => onIndex(index + 1)}>
            ›
          </button>
        </span>
      </div>

      <h3 id={`ad-title-${f.id}`} className="ad-title">
        {t.title}
      </h3>

      <dl className="ad-rows">
        <Row label={c.fields.module}>{t.area}</Row>
        <Row label={c.fields.finding} strong>
          <span>{decision?.kind === 'adjusted' ? decision.text : t.finding}</span>
          <span className="ad-sub">{DEMO_TARGET}</span>
        </Row>
        <Row label={c.fields.why}>
          <div className="ad-why">
            {(
              [
                [c.fields.observed, t.observed],
                [c.fields.standard, t.standard],
                [c.fields.application, t.application]
              ] as const
            ).map(([k, v]) => (
              <p key={k}>
                <b>{k}:</b> {withRefs(v, f, loc)}
              </p>
            ))}
          </div>
        </Row>
        <Row label={c.fields.excerpt}>
          <q className="ad-quote" lang="de">
            {marked}
          </q>
          <span className="ad-sub">
            {fill(c.excerptMarked, { loc: loc(f.refs[0]) })} · <span className="ad-ok">✓ {c.excerptExact}</span>
          </span>
        </Row>
        <Row label={c.fields.severity}>
          <span className={`ad-sev is-${f.severity}`}>{c.severity[f.severity]}</span>
        </Row>
        {f.calc && t.calc ? (
          <Row label={c.fields.calc}>
            <div className="ad-calc">
              {f.calc.map((block, bi) => (
                <table key={bi} className="ad-calc-block">
                  <tbody>
                    {block.map((line, li) => (
                      <tr key={li} className={line.op === '=' ? 'is-result' : undefined}>
                        <td className="ad-calc-op ad-mono" aria-hidden={line.op ? undefined : true}>
                          {line.op ?? ''}
                        </td>
                        <td className="ad-calc-label">
                          {t.calc![bi][li]}{' '}
                          {line.ref !== undefined
                            ? (Array.isArray(line.ref) ? line.ref : [line.ref]).map((n) => {
                                const r = f.refs[n - 1];
                                return <RefChip key={n} n={n} title={`${DEMO_DOCS[r.doc].title}, ${loc(r)}`} />;
                              })
                            : null}
                        </td>
                        <td className="ad-calc-value ad-mono">{fmt(line)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
              <span className="ad-sub">{c.calcNote}</span>
            </div>
          </Row>
        ) : null}
        <Row label={c.fields.source}>
          <ol className="ad-sources">
            {f.refs.map((r, i) => (
              <li key={i}>
                <RefChip n={i + 1} />
                <span>
                  <span className="ad-src-title">{DEMO_DOCS[r.doc].title}</span>
                  <span className="ad-src-loc">{loc(r)}</span>
                </span>
              </li>
            ))}
          </ol>
        </Row>
        <Row label={c.fields.review}>
          <span className={`ad-review${decision ? ` is-${decision.kind}` : ''}`} aria-live="polite">
            {reviewText}
          </span>
        </Row>
      </dl>

      {/* The decision bar. One word per decision, as in the product. */}
      <div className="ad-bar">
        <div className="ad-bar-buttons" role="group" aria-label={c.fields.review}>
          <button
            type="button"
            className={`ad-btn is-primary${decision?.kind === 'approved' ? ' is-picked' : ''}`}
            aria-pressed={decision?.kind === 'approved'}
            onClick={() => decide({ kind: 'approved' })}
          >
            {c.decisions.approve}
          </button>
          <button
            type="button"
            className={`ad-btn${decision?.kind === 'adjusted' || panel === 'adjust' ? ' is-picked' : ''}`}
            aria-expanded={panel === 'adjust'}
            onClick={() => setPanel(panel === 'adjust' ? null : 'adjust')}
          >
            {c.decisions.adjust}
          </button>
          <button
            type="button"
            className={`ad-btn${decision?.kind === 'investigate' || panel === 'investigate' ? ' is-picked' : ''}`}
            aria-expanded={panel === 'investigate'}
            onClick={() => setPanel(panel === 'investigate' ? null : 'investigate')}
          >
            {c.decisions.investigate}
          </button>
          <button
            type="button"
            className={`ad-btn${decision?.kind === 'rejected' || panel === 'reject' ? ' is-picked' : ''}`}
            aria-expanded={panel === 'reject'}
            onClick={() => setPanel(panel === 'reject' ? null : 'reject')}
          >
            {c.decisions.reject}
          </button>
          {decision ? (
            <button type="button" className="ad-link" onClick={() => decide(null)}>
              {c.undo}
            </button>
          ) : null}
        </div>

        {panel === 'reject' || panel === 'investigate' ? (
          <div className="ad-panel">
            <p className="ad-panel-title">{panel === 'reject' ? c.rejectTitle : c.investigateTitle}</p>
            <div className="ad-choices">
              {(panel === 'reject' ? c.reasons : c.routes).map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className="ad-choice"
                  onClick={() => decide(panel === 'reject' ? { kind: 'rejected', reason: i } : { kind: 'investigate', route: i })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {panel === 'adjust' ? (
          <div className="ad-panel">
            <label className="ad-panel-title" htmlFor={`ad-adjust-${f.id}`}>
              {c.adjustTitle}
            </label>
            <textarea
              id={`ad-adjust-${f.id}`}
              className="ad-textarea"
              rows={4}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="ad-choices">
              <button
                type="button"
                className="ad-btn is-primary"
                disabled={!draft.trim()}
                onClick={() => decide({ kind: 'adjusted', text: draft.trim() })}
              >
                {c.adjustSave}
              </button>
              <button type="button" className="ad-link" onClick={() => setPanel(null)}>
                {c.cancel}
              </button>
            </div>
          </div>
        ) : null}

        <p className="ad-note">{c.demoNote}</p>
      </div>
    </article>
  );
}

function Source({
  f,
  copy,
  mode,
  setMode,
  loc
}: {
  f: DemoFindingData;
  copy: DemoCopy;
  mode: 'schematic' | 'original';
  setMode: (m: 'schematic' | 'original') => void;
  loc: (r: DemoRef, withTotal?: boolean) => string;
}) {
  const c = copy.chrome;
  const ref = f.refs[0];
  const doc = DEMO_DOCS[ref.doc];
  const marked = f.source.filter((b) => b.mark).map((b) => (b.mark === true ? b.text : b.mark));

  return (
    <aside className="ad-source" aria-label={c.sourceLabel}>
      <div className="ad-toggle" role="group" aria-label={c.sourceLabel}>
        {(['schematic', 'original'] as const).map((m) => (
          <button key={m} type="button" aria-pressed={mode === m} className={mode === m ? 'is-on' : undefined} onClick={() => setMode(m)}>
            {m === 'schematic' ? c.schematic : c.original}
          </button>
        ))}
      </div>

      <div className="ad-page">
        <div className="ad-page-head">
          <span className="ad-mono ad-file">{doc.file}</span>
          <span className="ad-mono">{loc(ref, true)}</span>
        </div>
        <p className="ad-page-title" lang="de">
          {doc.title}
        </p>

        {mode === 'schematic' ? (
          <div className="ad-schema">
            <div className="ad-lines" aria-hidden="true">
              {LINES_TOP.map((w, i) => (
                <span key={i} style={{ width: `${w}%` }} />
              ))}
            </div>
            {marked.map((m) => (
              <blockquote key={m} className="ad-mark" lang="de">
                {m}
              </blockquote>
            ))}
            <div className="ad-lines" aria-hidden="true">
              {LINES_BOTTOM.map((w, i) => (
                <span key={i} style={{ width: `${w}%` }} />
              ))}
            </div>
            <p className="ad-hint">{c.sourceHint}</p>
          </div>
        ) : (
          <div className="ad-original" lang="de">
            {f.source.map((b, i) => {
              if (b.h) return <p key={i} className="ad-orig-h">{b.text}</p>;
              if (b.mark === true) return <p key={i}><mark>{b.text}</mark></p>;
              if (typeof b.mark === 'string' && b.text.includes(b.mark)) {
                const [pre, post] = b.text.split(b.mark);
                return (
                  <p key={i}>
                    {pre}
                    <mark>{b.mark}</mark>
                    {post}
                  </p>
                );
              }
              return <p key={i}>{b.text}</p>;
            })}
            {ref.page ? <p className="ad-orig-folio ad-mono">Seite {ref.page}</p> : null}
          </div>
        )}
      </div>
      <p className="ad-lang">{c.docLanguage}</p>
    </aside>
  );
}

function Missing({ copy }: { copy: DemoCopy }) {
  const c = copy.chrome;
  return (
    <section className="ad-missing" aria-labelledby="ad-missing-title">
      <h3 id="ad-missing-title" className="ad-title">
        {c.missingTitle}
      </h3>
      <p className="ad-missing-lead">{c.missingLead}</p>
      <ul className="ad-missing-list">
        {DEMO_EXPECTED.map((e, i) => {
          const item = copy.expected[i];
          const got = Boolean(e.files);
          return (
            <li key={i} className={got ? undefined : 'is-gap'}>
              <span className={`ad-status${got ? ' is-got' : ' is-gap'}`}>{got ? c.received : c.missing}</span>
              <span className="ad-missing-body">
                <span className="ad-missing-label">{item.label}</span>
                {e.files ? (
                  <span className="ad-missing-files ad-mono">
                    {e.files[0]}
                    {e.files.length > 1 ? ` +${e.files.length - 1}` : ''}
                  </span>
                ) : null}
                {item.note ? <span className="ad-sub">{item.note}</span> : null}
              </span>
              <span className="ad-missing-domain">{c.domains[e.domain]}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
