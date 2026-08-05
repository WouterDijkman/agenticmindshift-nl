import Reveal from './Reveal';

/**
 * The findings guarantee, immediately under the hero.
 *
 * It used to live inside the Diligence Sprint teaser, which measured at 4,885
 * of the homepage's 8,495 pixels — 58% down, past where most readers stop, and
 * beside no button at all. It is the only real risk reversal on the site, so
 * the placement was backwards: the strongest thing we can say was the thing
 * fewest people reached.
 *
 * Deliberately a band and not a card. A card reads as one more feature tile in
 * a page that already has eight card grids; a full-width rule with one
 * sentence on it reads as a term of business, which is what this is.
 *
 * The condition is not a footnote. An explicit restriction spoken in the same
 * breath as the promise is more believable than the same restriction in
 * smaller type underneath it, and "we carry the risk of being early" is a
 * stronger sentence than anything we would replace it with.
 */
export default function GuaranteeBand({
  label,
  guarantee,
  note
}: {
  label: string;
  guarantee: string;
  note: string;
}) {
  return (
    <section className="seam" style={{ paddingBlock: 'clamp(36px, 5vw, 64px)' }}>
      <div className="container-wide">
        <Reveal className="guarantee-band">
          <span className="eyebrow eyebrow-accent">{label}</span>
          <p className="type-h4 guarantee-band-claim">{guarantee}</p>
          <p className="type-small guarantee-band-note">{note}</p>
        </Reveal>
      </div>
    </section>
  );
}
