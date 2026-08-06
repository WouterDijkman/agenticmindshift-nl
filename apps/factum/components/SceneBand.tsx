import type { SceneId } from '@/lib/scenes';
import SceneMedia from './SceneMedia';

/**
 * One photograph, full width, with a line of type sitting on it.
 *
 * The site owns nineteen macro stills and, until this component existed, every
 * one of them was rendered at a third of the viewport inside a card. The whole
 * reason to shoot macro is the falloff and the grain, and neither survives at
 * 340px. Hebbia gives a `video--full` band a section of its own; this is the
 * still-image version of the same move, and the only place on the site where
 * an image is the section rather than a decoration inside one. Used twice —
 * once on the homepage, once on /diligence-sprint — under the same sentence
 * and deliberately never the same photograph. See HOME_BAND and SPRINT_BAND.
 *
 * Deliberately not a hero: the copy is one sentence, there is no button, and
 * the band is short enough that it reads as a breath between two arguments
 * rather than as a page break. Its job is rhythm. A page that is nothing but
 * type on flat navy from the hero to the footer is the thing being fixed.
 *
 * The scrim is heavier than the card treatment because text sits on it here.
 * `.scene-band .scene-scrim` in globals.css replaces the card gradient with a
 * left-hand wash plus a bottom one, and the type is white on top of it, so
 * contrast is measured against the darkest part of the grade, not the average.
 */
export default function SceneBand({
  id,
  line,
  attribution
}: {
  /** Scene to show. Must not already appear on the same page — lib/scenes.ts enforces that. */
  id: SceneId;
  /** One sentence. If it needs two, it belongs in a section, not here. */
  line: string;
  /** Optional small label under the line, e.g. a source or a caveat. */
  attribution?: string;
}) {
  return (
    <section className="scene-band">
      <SceneMedia id={id} className="scene-band-media" sizes="100vw" />
      <div className="container-wide scene-band-inner">
        <p className="scene-band-line">{line}</p>
        {attribution && <span className="scene-band-attr mono">{attribution}</span>}
      </div>
    </section>
  );
}
