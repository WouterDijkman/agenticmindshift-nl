type Stage = {
  title: string;
  body: string;
  note?: string;
};

/**
 * Scroll-linked *state*, not decoration: each stage lights as it arrives and
 * dims again behind you, which is what the pipeline actually does. Driven by
 * CSS `animation-timeline: view()`; RevealObserver covers browsers without it.
 */
export default function Pipeline({ stages }: { stages: Stage[] }) {
  return (
    <ol className="pipeline" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {stages.map((stage, i) => (
        <li key={stage.title} className="pipeline-stage">
          <div className="pipeline-marker">
            <span className="pipeline-dot" />
            <span className="pipeline-rail" />
          </div>
          <div>
            <span className="pipeline-index" style={{ display: 'block', marginBottom: 8 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="type-h4" style={{ marginBottom: 8 }}>
              {stage.title}
            </h3>
            <p className="type-body measure">{stage.body}</p>
            {stage.note && (
              <p className="type-small measure" style={{ marginTop: 10, color: 'var(--text-quaternary)' }}>
                {stage.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
