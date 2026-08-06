import { MODULES } from '@/lib/site';
import Reveal from './Reveal';

type Wave = { title: string; body: string };

/**
 * The dispatch graph: the *shape* of a run, not a ranked list of modules.
 *
 * This replaces a bar chart ranked by size. The chart answered "how big is each
 * module", which is our fact; the graph answers "what happens when I hand over
 * a data room", which is the reader's question. A first wave opening at once,
 * two modules that have to wait, a synthesis layer that reads across
 * everything, the documents falling out of the end, and a post-close wave on
 * its own clock — that is the argument for the whole platform, and it is a
 * picture, not a paragraph.
 *
 * Every value is derived from `MODULES` in `lib/site.ts`, which is itself
 * generated from the product's module registry. Nothing here is authored: the
 * wave grouping and the per-wave module count both fall out of that array. If a
 * module moves wave in the product, this diagram moves with it.
 *
 * Each node used to carry a fan-out meter and a sub-agent count. Both are gone.
 * The meter ranked modules by how many agents they spawn, which is a fact about
 * our implementation that a reader cannot check, cannot use, and would be wrong
 * about within a quarter. In its place each node says which of the three things
 * it hands back — a finding, a document, or a running watch — because that is
 * what decides whether the reader gets it during diligence or after closing.
 */
export default function DispatchGraph({
  labels,
  waves,
  modulesLabel,
  kindLabels,
  zdrLabel,
  zdrTitle
}: {
  /** Module names, index-aligned with MODULES. */
  labels: string[];
  /** Five waves in dispatch order, each with the dependency it describes. */
  waves: Wave[];
  /** Unit noun for the per-wave tally, e.g. "modules". */
  modulesLabel: string;
  /** One short noun per module kind: what this module hands back. */
  kindLabels: Record<'analysis' | 'deliverable' | 'monitoring', string>;
  zdrLabel: string;
  zdrTitle: string;
}) {
  const rows = waves.map((wave, i) => {
    const n = i + 1;
    const nodes = MODULES.map((m, index) => ({ m, index })).filter(({ m }) => m.wave === n);
    return { n, wave, nodes };
  });

  return (
    <ol className="dispatch">
      {rows.map(({ n, wave, nodes }) => (
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
              </span>
            </Reveal>

            <Reveal delay={60}>
              <p className="dispatch-lead">{wave.body}</p>
            </Reveal>

            {/*
              The wave's own size, handed to the stylesheet. Between 900 and
              1199 the node grid runs four columns, which divides every wave but
              the five-module one — and that one drew four nodes with a fifth
              stranded alone underneath, which reads as a wrap rather than as a
              batch. `.dispatch-nodes[data-n="5"]` gets five columns in that
              band, so every wave is either one full row or an even split of
              them.
            */}
            <ul className="dispatch-nodes" data-n={nodes.length}>
              {nodes.map(({ m, index }, i) => (
                <Reveal
                  as="li"
                  key={m.slug}
                  className="dispatch-node"
                  /* Stepped per node rather than via .stagger, whose ladder
                     stops at five children — wave 1 has nine, and the last
                     four would otherwise land as one block. */
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
                    <span className="mono dispatch-node-kind" data-kind={m.kind}>
                      {kindLabels[m.kind]}
                    </span>
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
