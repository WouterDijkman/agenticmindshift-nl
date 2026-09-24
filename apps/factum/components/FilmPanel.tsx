/**
 * The 45-second film "What is due diligence for?", in the brand treatment.
 *
 * A plain <video>: no autoplay (it has narration), controls on, poster from
 * the film's own first scene, preload limited to metadata so the page does not
 * pull 4 MB for a visitor who never presses play. The example on screen is a
 * constructed one on a fictional target and the film says so itself; the note
 * under the player repeats it in text, which is the same rule the specimen on
 * the homepage follows (source-copy.md).
 *
 * Portrait 4:5 because the same file runs in the LinkedIn feed; on desktop it
 * sits beside the text at a fixed width rather than stretching to the column.
 */
export default function FilmPanel({
  title,
  lead,
  note,
  src,
  poster
}: {
  title: string;
  lead: string;
  note: string;
  src: string;
  poster: string;
}) {
  return (
    <div className="split-grid" style={{ alignItems: 'center' }}>
      <div>
        <h2 className="type-h2" style={{ marginBottom: 14 }}>
          {title}
        </h2>
        <p className="type-lead" style={{ maxWidth: '52ch' }}>
          {lead}
        </p>
        <p
          className="type-small"
          style={{ marginTop: 22, color: 'var(--text-quaternary)', maxWidth: '52ch' }}
        >
          {note}
        </p>
      </div>
      <div style={{ maxWidth: 420, width: '100%', justifySelf: 'end' }}>
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
          aria-label={title}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '4 / 5',
            background: 'var(--surface-0)',
            border: '1px solid var(--hairline)',
            borderRadius: 2
          }}
        />
      </div>
    </div>
  );
}
