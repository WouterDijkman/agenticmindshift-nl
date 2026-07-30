import Reveal from './Reveal';

/**
 * A short sequence laid out along a horizontal rail, so the reader sees three
 * beats before reading a word. Collapses to a vertical rail when there is no
 * room to run sideways.
 */
export default function Stepper({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="stepper stagger">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} className="stepper-step">
          <span className="stepper-node" aria-hidden="true">
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
          </span>
          <h3 className="type-h4 stepper-title">{step.title}</h3>
          <p className="type-small">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
