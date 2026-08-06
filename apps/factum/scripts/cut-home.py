#!/usr/bin/env python3
"""
Cut the homepage copy, in all five locales at once.

The homepage rendered 1,416 words. Most of the reference set ships a homepage
between 190 (Vercel) and 914 (Rogo); Hebbia, the closest match in tone, ships
544. The cut here is structural rather than editorial — whole blocks leave
because they belong to another page, not because their sentences were bad:

  * `sprint`            deleted. It was a heading, a lead and a link. The link
                        now hangs off the cycle section, which is about the
                        same engagement.
  * `problem.points`    4 -> 2. "Whoever finds it first" and "You find out
                        after closing" restate the first two with different
                        nouns, and a four-up grid was the shape this page used
                        three separate times.
  * `success.points`    3 -> 2. The third ("every finding traces to its
                        source") is what the Specimen section now shows rather
                        than asserts.
  * `cycle.stages`      bodies cut to one clause each. Five two-sentence
                        paragraphs was the single heaviest block on the page.
  * `cycle.note`,
    `cycle.ctaLine`     deleted. Two CTAs and a jurisdiction footnote inside
                        one section, on a page that already has three CTAs.
  * `reframe.body`      deleted; the quote it explained is now a full-bleed
                        band, and a band with a paragraph under it is not a
                        band.
  * every `.eyebrow`    deleted — nine here, thirty-seven on the other pages.
                        See the comment on SectionHeader in components/Section.tsx.

New keys: `specimen.title` / `specimen.lead` (Specimen moved here from
/platform) and `reframe.attr` (the label under the band).

Translations are written out per locale rather than derived. Every locale keeps
its own register — the Dutch is not a gloss of the English, and where a
sentence was only shortened, the shortened form is the locale's own sentence
with a clause removed rather than a retranslation.

Run once, from apps/factum:  python3 scripts/cut-home.py
Idempotent: re-running on already-cut files is a no-op.
"""

import collections
import json
import pathlib

LOCALES = ('en', 'nl', 'de', 'es', 'pt')
MESSAGES = pathlib.Path(__file__).resolve().parent.parent / 'messages'

# ---------------------------------------------------------------------------
# Replacement strings, per locale. A key absent here keeps its existing value.
# ---------------------------------------------------------------------------

HERO_LEAD = {
    # The middle sentence ("Whatever it skipped is still in there") is said
    # again, better, by problem.points[0]. Two claims in a hero, not three.
    'en': 'Diligence samples the data room and reports in weeks. Factum reads all of it in days, with the source passage behind every finding.',
    'nl': 'Due diligence neemt een steekproef en rapporteert na weken. Factum leest alles, in dagen, met de bronpassage achter elke bevinding.',
    'de': 'Due Diligence zieht eine Stichprobe und berichtet nach Wochen. Factum liest alles, in Tagen, mit der Quellpassage hinter jedem Befund.',
    'es': 'La due diligence toma una muestra y entrega el informe semanas después. Factum lo lee todo, en días, con el pasaje de origen detrás de cada hallazgo.',
    'pt': 'A due diligence tira uma amostra e reporta ao fim de semanas. A Factum lê tudo, em dias, com a passagem de origem por trás de cada constatação.',
}

PROBLEM_SAMPLE_BODY = {
    # "because the timetable allows a fraction" is the same fact as the first
    # half of the sentence, stated as its cause.
    'en': 'Traditional diligence reads a fraction of the room. The rest is still in there.',
    'nl': 'Klassiek boekenonderzoek leest een fractie van de dataroom. De rest zit er nog steeds in.',
    'de': 'Klassische Due Diligence liest einen Bruchteil des Datenraums. Der Rest liegt weiter darin.',
    'es': 'La diligencia tradicional lee una fracción del data room. El resto sigue ahí dentro.',
    'pt': 'A diligência tradicional lê uma fração da data room. O resto continua lá dentro.',
}

GUIDE_LEAD = {
    # The institutional provenance is the whole of /team. Here it is one line.
    'en': 'A banker’s read on risk. An engineer’s discipline for systems that can’t fail quietly.',
    'nl': 'De blik van een bankier op risico. De discipline van een engineer voor systemen die niet stilletjes mogen falen.',
    'de': 'Der Blick eines Bankers auf Risiko. Die Disziplin eines Ingenieurs für Systeme, die nicht leise versagen dürfen.',
    'es': 'La lectura de riesgo de un banquero. La disciplina de un ingeniero para sistemas que no pueden fallar en silencio.',
    'pt': 'A leitura de risco de um banqueiro. A disciplina de um engenheiro para sistemas que não podem falhar em silêncio.',
}

COVERAGE_LEAD = {
    # No number in the copy: the discipline list is data, and a hardcoded
    # "ten" is a claim that goes stale the moment the list changes.
    'en': 'Every discipline, one pass. What one of them finds is on the table for the next.',
    'nl': 'Elke discipline, één pass. Wat de één vindt, ligt bij de volgende op tafel.',
    'de': 'Jede Disziplin, ein Durchgang. Was die eine findet, liegt bei der nächsten auf dem Tisch.',
    'es': 'Todas las disciplinas, una pasada. Lo que encuentra una queda sobre la mesa para la siguiente.',
    'pt': 'Todas as disciplinas, uma passagem. O que uma encontra fica em cima da mesa para a seguinte.',
}

CYCLE_BODIES = {
    'en': [
        'Findings land while they can still move price and structure.',
        'The lender reads it anyway. Give them a base that is already sourced.',
        'Covenant headroom and KPI drift, plus the levers a risk list never looks for.',
        'Run the buyer’s pass on your own side first, while there is time to fix it.',
        'Going concern, creditor position and covenant headroom, while there is still something to choose.',
    ],
    'nl': [
        'Bevindingen landen terwijl ze prijs en structuur nog kunnen bewegen.',
        'De financier leest hem toch. Geef hem een basis die al onderbouwd is.',
        'Convenantruimte en KPI-drift, plus de hefbomen waar een risicolijst nooit naar kijkt.',
        'Draai de slag van de koper eerst aan uw eigen kant, nu er nog tijd is.',
        'Continuïteit, crediteurenpositie en convenantruimte, terwijl er nog te kiezen valt.',
    ],
    'de': [
        'Befunde landen, solange sie Preis und Struktur noch bewegen können.',
        'Der Kreditgeber prüft ohnehin. Geben Sie ihm eine bereits belegte Basis.',
        'Covenant-Spielraum und KPI-Drift, plus die Hebel, nach denen eine Risikoliste nie sucht.',
        'Fahren Sie den Durchgang des Käufers zuerst auf Ihrer Seite, solange noch Zeit bleibt.',
        'Fortführung, Gläubigerposition und Covenant-Spielraum, solange noch zu wählen ist.',
    ],
    'es': [
        'Los hallazgos llegan cuando aún pueden mover precio y estructura.',
        'El financiador lo lee igualmente. Dele una base ya soportada.',
        'Margen de covenants y desviación de KPI, más las palancas que una lista de riesgos nunca busca.',
        'Pase la revisión del comprador primero por su lado, mientras hay tiempo de corregir.',
        'Empresa en funcionamiento, posición de acreedores y margen de covenants, mientras queda algo que elegir.',
    ],
    'pt': [
        'As constatações chegam enquanto ainda podem mover preço e estrutura.',
        'O financiador lê à mesma. Dê-lhe uma base já suportada.',
        'Folga nos covenants e desvio de KPI, mais as alavancas que uma lista de riscos nunca procura.',
        'Faça a passagem do comprador primeiro do seu lado, enquanto há tempo para corrigir.',
        'Continuidade, posição dos credores e folga nos covenants, enquanto ainda há por onde escolher.',
    ],
}

CYCLE_LINK = {
    'en': 'What the Diligence Sprint covers',
    'nl': 'Wat de Diligence Sprint omvat',
    'de': 'Was der Diligence Sprint umfasst',
    'es': 'Qué cubre el Diligence Sprint',
    'pt': 'O que abrange o Diligence Sprint',
}

REFRAME_ATTR = {
    'en': 'Why a second pass',
    'nl': 'Waarom een tweede lezing',
    'de': 'Warum ein zweiter Durchgang',
    'es': 'Por qué una segunda pasada',
    'pt': 'Porquê uma segunda passagem',
}

SPECIMEN_TITLE = {
    'en': 'One finding, and the clause it came from',
    'nl': 'Eén bevinding, en de clausule waar hij vandaan komt',
    'de': 'Ein Befund, und die Klausel, aus der er stammt',
    'es': 'Un hallazgo, y la cláusula de la que sale',
    'pt': 'Uma constatação, e a cláusula de onde vem',
}

SPECIMEN_LEAD = {
    # The footnote inside the component already says no client document
    # appears. This says the same thing before the reader has to look for it.
    'en': 'Constructed on a fictional target. The shape is the real one.',
    'nl': 'Opgesteld op een fictieve target. De vorm is de echte.',
    'de': 'Konstruiert an einem fiktiven Target. Die Form ist die echte.',
    'es': 'Construido sobre un target ficticio. La forma es la real.',
    'pt': 'Construído sobre um target fictício. A forma é a real.',
}

SUCCESS_KNOW_BODY = {
    'en': 'The buyer’s advisers run this pass anyway. This time you saw it first.',
    'nl': 'De adviseurs van de koper doorlopen deze analyse toch. Deze keer zag u het eerst.',
    'de': 'Die Berater des Käufers führen diese Prüfung ohnehin durch. Diesmal haben Sie es zuerst gesehen.',
    'es': 'Los asesores del comprador harán esta pasada de todos modos. Esta vez usted la vio primero.',
    'pt': 'Os assessores do comprador fazem esta passagem de qualquer forma. Desta vez, viu-a primeiro.',
}

PLAN_NDA_BODY = {
    # "You scope the mandate" is true and is also step one of the call above.
    'en': 'An NDA before a single document moves. Access runs under a DPA, in the EU, with zero retention.',
    'nl': 'Een NDA voordat er één document beweegt. Toegang loopt onder een verwerkersovereenkomst, in de EU, met zero retention.',
    'de': 'Ein NDA, bevor sich ein einziges Dokument bewegt. Der Zugang läuft unter einem AV-Vertrag, in der EU, mit Zero Retention.',
    'es': 'Un NDA antes de que se mueva un solo documento. El acceso corre bajo un DPA, en la UE, con retención cero.',
    'pt': 'Um NDA antes de um único documento se mover. O acesso corre ao abrigo de um DPA, na UE, com retenção zero.',
}

# Render order, which is also the order the file now reads in.
HOME_ORDER = (
    'hero', 'problem', 'reframe', 'guide', 'specimen',
    'pipeline', 'trust', 'coverage', 'cycle', 'success', 'plan', 'cta',
)


def cut(home, loc):
    """Return the new `home` namespace for one locale."""
    out = collections.OrderedDict()

    hero = collections.OrderedDict(home['hero'])
    hero.pop('eyebrow', None)
    hero['lead'] = HERO_LEAD[loc]
    out['hero'] = hero

    problem = collections.OrderedDict(home['problem'])
    problem.pop('eyebrow', None)
    pts = problem['points']
    # Indices 0 and 2 — "working from a sample" and "one discipline is not
    # diligence". 1 and 3 are the same two arguments told again.
    keep = [collections.OrderedDict(pts[0]), collections.OrderedDict(pts[2])] if len(pts) == 4 else [
        collections.OrderedDict(p) for p in pts
    ]
    keep[0]['body'] = PROBLEM_SAMPLE_BODY[loc]
    problem['points'] = keep
    out['problem'] = problem

    out['reframe'] = collections.OrderedDict(attr=REFRAME_ATTR[loc])

    guide = collections.OrderedDict(home['guide'])
    guide.pop('eyebrow', None)
    guide['lead'] = GUIDE_LEAD[loc]
    out['guide'] = guide

    out['specimen'] = collections.OrderedDict(
        title=SPECIMEN_TITLE[loc], lead=SPECIMEN_LEAD[loc]
    )

    pipeline = collections.OrderedDict(home['pipeline'])
    pipeline.pop('eyebrow', None)
    out['pipeline'] = pipeline

    trust = collections.OrderedDict(home['trust'])
    trust.pop('eyebrow', None)
    out['trust'] = trust

    coverage = collections.OrderedDict(home['coverage'])
    coverage.pop('eyebrow', None)
    coverage['lead'] = COVERAGE_LEAD[loc]
    out['coverage'] = coverage

    cycle = collections.OrderedDict(home['cycle'])
    cycle.pop('eyebrow', None)
    cycle.pop('note', None)
    cycle.pop('ctaLine', None)
    stages = [collections.OrderedDict(s) for s in cycle['stages']]
    for stage, body in zip(stages, CYCLE_BODIES[loc]):
        stage['body'] = body
    cycle['stages'] = stages
    cycle['link'] = CYCLE_LINK[loc]
    out['cycle'] = cycle

    success = collections.OrderedDict(home['success'])
    success.pop('eyebrow', None)
    success.pop('link', None)
    spts = [collections.OrderedDict(p) for p in success['points'][:2]]
    spts[1]['body'] = SUCCESS_KNOW_BODY[loc]
    success['points'] = spts
    out['success'] = success

    plan = collections.OrderedDict(home['plan'])
    plan.pop('eyebrow', None)
    steps = [collections.OrderedDict(s) for s in plan['steps']]
    steps[1]['body'] = PLAN_NDA_BODY[loc]
    plan['steps'] = steps
    out['plan'] = plan

    out['cta'] = collections.OrderedDict(home['cta'])

    assert list(out) == list(HOME_ORDER), list(out)
    return out


def words(o):
    if isinstance(o, dict):
        return sum(words(v) for v in o.values())
    if isinstance(o, list):
        return sum(words(v) for v in o)
    return len(str(o).split())


def main():
    for loc in LOCALES:
        path = MESSAGES / f'{loc}.json'
        raw = path.read_text(encoding='utf-8')
        data = json.loads(raw, object_pairs_hook=collections.OrderedDict)

        # The file must round-trip byte-for-byte before we touch it, or the
        # diff will be full of formatting noise nobody can review.
        assert json.dumps(data, ensure_ascii=False, indent=2) + '\n' == raw, f'{loc}: not canonical'

        before = words(data['home'])
        data['home'] = cut(data['home'], loc)
        after = words(data['home'])

        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'{loc}: home {before} -> {after} words')


if __name__ == '__main__':
    main()
