import { MODULES } from '@/lib/site';
import Reveal from './Reveal';

type Wave = { title: string; body: string };

/**
 * The dispatch graph: the *shape* of a run, not a ranked list of modules.
 *
 * This replaces a 31-row bar chart. The chart answered "how big is each
 * module", which is our fact; the graph answers "what happens when I hand over
 * a data room", which is the reader's question. Eleven modules opening at once,
 * three that have to wait, a synthesis layer that reads across everything, the
 * documents falling out of the end, and a post-close wave on its own clock —
 * that is the argument for the whole platform, and it is a picture, not a
 * paragraph.
 *
 * Every value is derived from `MODULES` in `lib/site.ts`, which is itself
 * generated from the product's module registry. Nothing here is authored: the
 * wave grouping, the per-wave module count, the per-wave sub-agent sum and the
 * relative bar in each node all fall out of that array. If a module moves wave
 * in the product, this diagram moves with it.
 *
 * The fan-out meter is kept per node rather than dropped, because the spread is
 * still the point — the largest module runs ten times the sub-agents of the
 * smallest — but it rides inside the node instead of taking a full row.
 */
export default function DispatchGraph({
  labels,
  waves,
  modulesLabel,
  agentsLabel,
  zdrLabel,
  zdrTitle
}: {
  /** Module names, index-aligned with MODULES. */
  labels: string[];
  /** Five waves in dispatch order, each with the dependency it describes. */
  waves: Wave[];
  /** Unit nouns for the per-wave tally, e.g. "modules" / "sub-agents". */
  modulesLabel: string;
  agentsLabel: string;
  zdrLabel: string;
  zdrTitle: string;
}) {
  const max = Math.max(...MODULES.map((m) => m.agents));

  const rows = waves.map((wave, i) => {
    const n = i + 1;
    const nodes = MODULES.map((m, index) => ({ m, index })).filter(({ m }) => m.wave === n);
    return {
      n,
      wave,
      nodes,
      agents: nodes.reduce((sum, { m }) => sum + m.agents, 0)
    };
  });

  return (
    <ol className="dispatch">
      {rows.map(({ n, wave, nodes, agents }) => (
        <li
          key={n}
          className="dispatch-wave"
          /* Wave 5 is post-close: it does not read the pre-close waves, so its
             rail is dashed rather than solid. The wave's own body line already
             says so in every locale, which is why the dash needs no legend. */
          data-detached={n === 5 ? 'true' : undefined}
        >
          <span className="dispatch-rail" aria-hidden="true" />

          <div className="dispatch-body">
            <Reveal className="dispatch-head">
              <span className="mono dispatch-num">{String(n).padStart(2, '0')}</span>
              <h3 className="dispatch-title">{wave.title}</h3>
              <span className="mono dispatch-tally">
                {nodes.length} {modulesLabel}
                <span aria-hidden="true" className="dispatch-tally-sep">
                  ·
                </span>
                {agents} {agentsLabel}
              </span>
            </Reveal>

            <Reveal delay={60}>
              <p className="dispatch-lead">{wave.body}</p>
            </Reveal>

            <ul className="dispatch-nodes">
              {nodes.map(({ m, index }, i) => (
                <Reveal
                  as="li"
                  key={m.slug}
                  className="dispatch-node"
                  /* Stepped per node rather than via .stagger, whose ladder
                     stops at five children — wave 1 has eleven, and the last
                     six would otherwise land as one block. */
                  delay={110 + i * 40}
                >
                  <span className="dispatch-node-name">
                    {labels[index]}
                    {m.zdr && (
                      <span className="dispatch-node-zdr mono" title={zdrTitle}>
                        {zdrLabel}
                      </span>
                    )}
                  </span>
                  <span className="dispatch-node-foot">
                    <span className="dispatch-node-meter" aria-hidden="true">
                      <span
                        className="dispatch-node-fill"
                        style={{ '--pct': `${(m.agents / max) * 100}%` } as React.CSSProperties}
                      />
                    </span>
                    <span className="mono dispatch-node-count">{m.agents}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
