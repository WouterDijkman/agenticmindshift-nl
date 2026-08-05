import de from '@/messages/de.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import nl from '@/messages/nl.json';
import pt from '@/messages/pt.json';
import { DISCIPLINE_COUNT, MODULE_COUNT, WAVE_COUNT } from './site';

/**
 * Fail the build rather than the page.
 *
 * The roster is stated twice: once as data in `lib/site.ts`, which is where the
 * counts on the page come from, and once as prose in five message files, which
 * is where the names come from. Nothing ties the two together. A module dropped
 * from `MODULES` and left in `shared.modules` ships a dispatch graph whose nodes
 * are labelled one off — every module after the deleted one wears its
 * neighbour's name, silently, in whichever of the five languages nobody
 * happened to open. That is exactly how the roster drifted last time: the
 * modules were cut in the data layer and eight stale names, an "insurance"
 * discipline that no longer exists, and a hardcoded "thirteen disciplines"
 * survived in prose for months.
 *
 * TypeScript cannot catch any of it. The message files are JSON read through
 * `t.raw()`, so their arrays are `unknown` at every call site and the lengths
 * are only known at runtime.
 *
 * The last check is the one that matters commercially. Sub-agent counts are our
 * plumbing, not the client's outcome, and publishing them invites a question we
 * do not want to be answering in the first due-diligence call — how many is a
 * lot, and what happens when the number changes. They came out of the data
 * layer; this stops them coming back through a translation.
 *
 * Server-only, side-effect import from the locale layout. Runs once at build
 * and once per cold start, which is enough.
 */
const CATALOGUE = { nl, en, de, es, pt } as const;

type Shared = {
  modules: unknown[];
  waves: unknown[];
  disciplines: { label: string; pain: string; result: string }[];
};

/**
 * Prose that would put an agent count back on the page. Deliberately broad: it
 * fires on the word in any of the five languages, not on a specific phrasing,
 * because the point is that no translator has to know the rule.
 */
const AGENT_WORD = /\b(sub-?agents?|subagentes?|agenten|agentes)\b/i;

/** Mechanism descriptions that name a single reviewer are fine — they are not counts. */
const ALLOWED = /reviewer-?agent|critic-?agent|agente\s+revisor|agent\s+revisor/i;

for (const [locale, messages] of Object.entries(CATALOGUE)) {
  const shared = (messages as { shared: Shared }).shared;

  if (shared.modules.length !== MODULE_COUNT) {
    throw new Error(
      `messages/${locale}.json: shared.modules has ${shared.modules.length} entries, ` +
        `but MODULES in lib/site.ts has ${MODULE_COUNT}. The dispatch graph pairs them ` +
        `by index, so a mismatch mislabels every module after the gap.`
    );
  }

  if (shared.waves.length !== WAVE_COUNT) {
    throw new Error(
      `messages/${locale}.json: shared.waves has ${shared.waves.length} entries, ` +
        `but WAVE_COUNT in lib/site.ts is ${WAVE_COUNT}.`
    );
  }

  if (shared.disciplines.length !== DISCIPLINE_COUNT) {
    throw new Error(
      `messages/${locale}.json: shared.disciplines has ${shared.disciplines.length} entries, ` +
        `but DISCIPLINES in lib/site.ts has ${DISCIPLINE_COUNT}. DisciplineGrid maps its ` +
        `icons by position.`
    );
  }

  for (const [i, d] of shared.disciplines.entries()) {
    if (!d?.label || !d?.pain || !d?.result) {
      throw new Error(
        `messages/${locale}.json: shared.disciplines[${i}] is missing label, pain or result. ` +
          `Every discipline states the failure first and the finding second; a half-filled ` +
          `entry renders as a name with nothing behind it.`
      );
    }
  }

  const offenders: string[] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === 'string') {
      if (AGENT_WORD.test(node) && !ALLOWED.test(node)) offenders.push(path);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${path}[${i}]`));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [key, child] of Object.entries(node)) walk(child, `${path}.${key}`);
    }
  };
  walk(messages, locale);

  if (offenders.length) {
    throw new Error(
      `messages/${locale}.json talks about sub-agents at: ${offenders.join(', ')}. ` +
        `Describe what the module returns instead — a finding, a document, or an ongoing ` +
        `signal. The count is our plumbing, not the reader's outcome.`
    );
  }
}

export {};
