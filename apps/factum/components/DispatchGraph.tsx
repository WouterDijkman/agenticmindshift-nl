import type { CSSProperties } from 'react';
import { MODULES, POST_CLOSE_FIRST_WAVE } from '@/lib/site';
import Reveal from './Reveal';

type Wave = { title: string; body: string };

/**
 * The column count that divides `n` exactly and sits closest to `target`.
 *
 * The node grid never wraps unevenly, which means the column count has to be a
 * divisor of the wave's size rather than a round number. Below 1200 the grid
 * aims at four across; a four-module wave takes four, a five-module wave takes
 * five rather than four-and-a-stranded-one, a nine-module wave takes three.
 *
 * This used to be a single hand-written rule for the five-module wave. That
 * held while five was the only size that failed to divide, and it stopped
 * holding the moment the technology module split in two and made wave one nine
 * wide. Computing the divisor means the next such change carries itself.
 *
 * Ties go to the larger count, so a wave stays as wide as it can: at target
 * four, a six-module wave takes three rows of two only if two is genuinely
 * closer, and otherwise takes two rows of three.
 */
function evenColumns(n: number, target: number) {
  let best = 1;
  for (let c = 1; c <= n; c++) {
    if (n % c !== 0) continue;
    if (Math.abs(c - target) <= Math.abs(best - target)) best = c;
  }
  return best;
}

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
  /** The waves in dispatch order, each with the dependency it describes. */
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

  // The widest wave sets the desktop column count for every wave, so the tracks
  // line up down the page and the widest one still lands on a single row. Read
  // off MODULES rather than typed in: it was typed in, as eight, and the module
  // split that made wave one nine wide left the ninth node stranded on its own
  // row at desktop.
  const widest = Math.max(...rows.map((r) => r.nodes.length));

  return (
    <ol className="dispatch" style={{ '--dispatch-cols': widest } as CSSProperties}>
      {rows.map(({ n, wave, nodes }) => (
        <li
          key={n}
          className="dispatch-wave"
          /* The post-close waves do not read the pre-close waves, so their rail
             is dashed rather than solid. Each wave's own body line already says
             so in every locale, which is why the dash needs no legend.
             Thresholded rather than tested against a single wave number: this
             read `n === 5` while five waves existed, and a sixth post-close
             wave would have drawn as part of the diligence run. */
          data-detached={n >= POST_CLOSE_FIRST_WAVE ? 'true' : undefined}
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
              Between 900 and 1199 the grid aims at four across, and each wave
              takes the divisor of its own size nearest to that. A four-module
              wave runs four wide, a five-module wave five, a nine-module wave
              three rows of three. So every wave is one full row or an even
              split of them, never a row with a straggler underneath.
            */}
            <ul
              className="dispatch-nodes"
              style={{ '--cols-mid': evenColumns(nodes.length, 4) } as CSSProperties}
            >
              {nodes.map(({ m, index }, i) => (
                <Reveal
                  as="li"
                  key={m.slug}
                  className="dispatch-node"
                  /* Stepped per node rather than via .stagger, whose ladder
                     stops at five children. The widest wave carries more than
                     that, so everything past the fifth node would otherwise
                     land as one block. */
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
