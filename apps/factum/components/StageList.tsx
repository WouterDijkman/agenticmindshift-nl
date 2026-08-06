import Reveal from './Reveal';

/**
 * A short list where each row is a label and a consequence, hairline-separated.
 *
 * It exists because of the homepage deal cycle, which was a `Stepper` and was
 * the wrong object twice over. The homepage already spends a stepper on the
 * reader's own three steps two sections further down, so the page made the same
 * visual statement twice inside one scroll; and five items never fit a rail
 * that lays itself out three or four across, so the bottom row came up short at
 * every width measured. A cycle has no end either, and numbering it 01–05 said
 * it did.
 *
 * A row per item is exact at any width, needs no column arithmetic, and reads
 * as a list of situations rather than as a procedure — which is also what
 * /team needs for who is accountable for what.
 */
export default function StageList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="stage-list">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} className="stage-row" delay={i * 50}>
          <h3 className="type-h4 stage-label">{item.title}</h3>
          <p className="type-body">{item.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
