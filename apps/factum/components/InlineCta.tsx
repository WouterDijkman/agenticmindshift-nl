import { Button } from '@repo/ui/Button';
import { INTAKE_URL } from '@/lib/site';
import Reveal from './Reveal';

/**
 * A short ask, placed where the reader has just been convinced of something.
 *
 * The homepage runs to roughly sixteen screens on a phone and carried exactly
 * two asks in the body: one at 4% and one at 93%. The sticky header covers the
 * gap in the sense that a button is always reachable, but reachable is not the
 * same as asked — a reader who has just finished the coverage board is at their
 * most persuaded and the page's response was another heading.
 *
 * Deliberately smaller than `CtaBand`. That component closes the page and gets
 * a heading, a paragraph and the guarantee beside it; three of those in the
 * middle of the page would read as three endings. This is one line and one
 * button, and it inherits the section's own left edge so it reads as a beat in
 * the argument rather than an interruption of it.
 *
 * `location` goes into the Plausible event so the four CTA positions — hero,
 * inline, footer band, sticky header — can be told apart. Which one actually
 * does the work is currently unknown.
 */
export default function InlineCta({
  line,
  cta,
  location
}: {
  /** One sentence, picking up the section immediately above it. */
  line: string;
  cta: string;
  /** Plausible event location, e.g. "home-coverage". */
  location: string;
}) {
  return (
    <Reveal className="inline-cta">
      <p className="inline-cta-line">{line}</p>
      <Button
        href={INTAKE_URL}
        magnetic={false}
        className={`plausible-event-name=Intake+CTA plausible-event-location=${location}`}
      >
        {cta}
      </Button>
    </Reveal>
  );
}
