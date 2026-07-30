import Reveal from './Reveal';

/**
 * The machine-to-human handoff drawn as a track rather than listed as steps.
 * The boundary is the point of the section, so it is a labelled break in the
 * rail: everything above it ran unattended, everything below it did not.
 */
export default function HandoffTrack({
  steps,
  humanFrom,
  machineLabel,
  humanLabel
}: {
  steps: string[];
  /** Index of the first step a person performs. */
  humanFrom: number;
  machineLabel: string;
  humanLabel: string;
}) {
  return (
    <ol className="track stagger">
      {steps.map((step, i) => {
        const human = i >= humanFrom;
        return (
          <Reveal
            as="li"
            key={step}
            className={`track-step ${human ? 'track-step-human' : ''}`}
          >
            {(i === 0 || i === humanFrom) && (
              <span className="track-zone">{human ? humanLabel : machineLabel}</span>
            )}
            <span className="track-node" aria-hidden="true" />
            <span className="mono track-num">{String(i + 1).padStart(2, '0')}</span>
            <p className="type-body track-text">{step}</p>
          </Reveal>
        );
      })}
    </ol>
  );
}
