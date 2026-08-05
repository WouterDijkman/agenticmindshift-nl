import { Check } from './Icons';

/**
 * The findings guarantee, directly under the button.
 *
 * It used to render as a bare paragraph in `--text-quaternary` at 14px — the
 * lightest text colour in the system, the one reserved for caveats, source
 * notes and the things a reader is meant to skim past. The strongest sentence
 * on the site was set in the typeface of a disclaimer, four pixels under the
 * only button, and every page repeated the mistake.
 *
 * So it is a bordered strip with an accent rule and a mark, not a footnote. The
 * point is not decoration: risk reversal only works if the reader registers
 * that a promise was made, and at quaternary grey most of them were reading it
 * as small print about pre-launch status.
 *
 * The condition stays inside the same sentence rather than being demoted to a
 * second line. A restriction spoken in the same breath as the promise is more
 * believable than the same restriction in smaller type underneath it.
 */
export default function CtaProof({ children }: { children: string }) {
  return (
    <p className="cta-proof">
      <span className="cta-proof-mark" aria-hidden="true">
        <Check size={12} />
      </span>
      {children}
    </p>
  );
}
