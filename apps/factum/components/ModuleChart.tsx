import { MODULES } from '@/lib/site';
import Reveal from './Reveal';

/**
 * The module library as a measured chart rather than a list of names.
 *
 * The point of the picture is the spread: the largest module fans out to five
 * times as many sub-agents as the smallest, which is what "pre-scoped per
 * discipline" actually means once it is built. A list of 31 labels cannot show
 * that; a bar per module can, and every bar is a number from the product source.
 *
 * Bars are grouped by dispatch wave, so the chart doubles as the running order.
 */
export default function ModuleChart({
  labels,
  waveLabels,
  agentLabel,
  zdrLabel
}: {
  /** Module names, index-aligned with MODULES. */
  labels: string[];
  /** Five wave names, in dispatch order. */
  waveLabels: string[];
  /** Unit shown once, in the axis line, rather than after all 31 bars. */
  agentLabel: string;
  zdrLabel: string;
}) {
  const max = Math.max(...MODULES.map((m) => m.agents));
  const waves = waveLabels.map((label, i) => {
    const wave = i + 1;
    const indices = MODULES.map((m, index) => ({ m, index })).filter(({ m }) => m.wave === wave);
    return { wave, label, indices };
  });

  return (
    <div className="chart">
      <div className="chart-axis mono">
        <span>{agentLabel}</span>
        <span aria-hidden="true" className="chart-axis-rule" />
        <span>{max}</span>
      </div>

      {waves.map(({ wave, label, indices }) => (
        <section key={wave} className="chart-wave">
          <header className="chart-wave-head">
            <span className="mono chart-wave-num">{String(wave).padStart(2, '0')}</span>
            <h3 className="chart-wave-label">{label}</h3>
            <span className="mono chart-wave-sum">
              {indices.reduce((n, { m }) => n + m.agents, 0)}
            </span>
          </header>

          {/* The cascade is set per row rather than by .stagger, whose ladder
              tops out at five children — a wave of eleven bars needs to keep
              stepping or the last six land together and the growth reads as a
              single block wiping in. */}
          <ol className="chart-rows">
            {indices.map(({ m, index }, row) => (
              <Reveal as="li" key={m.slug} className="chart-row" delay={row * 45}>
                <span className="chart-row-label">
                  {labels[index]}
                  {m.zdr && (
                    <span className="chart-zdr mono" title={zdrLabel}>
                      {zdrLabel}
                    </span>
                  )}
                </span>
                <span className="chart-track" aria-hidden="true">
                  <span
                    className="chart-fill"
                    style={{ '--pct': `${(m.agents / max) * 100}%` } as React.CSSProperties}
                  />
                </span>
                <span className="mono chart-value">{m.agents}</span>
              </Reveal>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
