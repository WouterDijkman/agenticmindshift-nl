#!/usr/bin/env python3
"""
Cut the inner-page copy, in all five locales at once. Companion to
`cut-home.py`, which did the same job for the `home` namespace.

Three kinds of deletion, none of them editorial:

  1. **Every remaining `.eyebrow`.** Thirty-seven of them, one above almost
     every heading on the site. Five of the eight reference sites measured
     (Linear, Vercel, Cursor, Resend, Rogo) ship none at all. See the comment
     on `SectionHeader` in components/Section.tsx for the argument. Two are
     kept and are not section eyebrows: `contact.documents.eyebrow`, which is
     a field label inside a note, and `contact.agenda.label`, which was never
     called one.

  2. **Blocks that moved or were said twice.**
     * `platform.anatomy` — `Specimen` now sits on the homepage. /platform
       keeps the mechanism; the homepage keeps the output.
     * `sprint.guarantee` — the same promise the CtaBand at the foot of that
       page and the header footnote at the top of it already make. Three
       statements of one guarantee in one scroll reads as insistence.
     * `sprint.reframe.body` — the paragraph under the quote restated the
       quote. The quote is now a full-bleed band, and a band with an
       explanation under it is not a band.
     * `home.hero.secondary` — the link said "see what a finding looks like"
       and pointed at /platform, which is no longer where the finding is. The
       shared `links.platform` label replaces it at the call site.

  3. **Leads that restated their own heading.** Nine of them, listed under
     LEADS below with the heading they sat under. This is the only genuinely
     editorial part of the file, and each replacement is written per locale
     rather than translated from the English.

New key: `sprint.reframe.attr`, the label under the new band.

Run once, from apps/factum:  python3 scripts/cut-pages.py
Idempotent: re-running on already-cut files is a no-op.
"""

import collections
import json
import pathlib

LOCALES = ('en', 'nl', 'de', 'es', 'pt')
MESSAGES = pathlib.Path(__file__).resolve().parent.parent / 'messages'

# `namespace.path` of every eyebrow to keep. Everything else called `eyebrow`
# goes.
KEEP_EYEBROWS = {'contact.documents.eyebrow'}

# Whole blocks and single keys to delete, by dotted path.
DROP = (
    'home.hero.secondary',
    'platform.anatomy',
    'sprint.guarantee',
    'sprint.reframe.body',
)

# ---------------------------------------------------------------------------
# Replacement leads. Each entry is `dotted.path` -> {locale: string}.
#
# The pattern being fixed: an h2 states a claim, and the lead under it states
# the same claim again in longer words before the reader reaches the thing that
# proves it. Vercel and Hebbia — the two tightest sites in the reference set —
# run 6 to 61 words between an h2 and its first visual. These were running 30
# to 45 words each, saying nothing the heading had not said.
# ---------------------------------------------------------------------------

LEADS = {
    # "How one module runs" — the five stages are drawn immediately below.
    'platform.pipeline.lead': {
        'en': 'Five stages. The same five, every time, whether or not anyone is watching.',
        'nl': 'Vijf stappen. Elke keer dezelfde vijf, of er nu iemand meekijkt of niet.',
        'de': 'Fünf Stufen. Jedes Mal dieselben fünf, ob jemand zusieht oder nicht.',
        'es': 'Cinco etapas. Las mismas cinco cada vez, mire alguien o no.',
        'pt': 'Cinco etapas. As mesmas cinco de cada vez, esteja alguém a ver ou não.',
    },
    # "Four checks before a finding is allowed out" — the stack is right there.
    'platform.grounding.lead': {
        'en': 'A claim has to survive all four. One failure sends it back.',
        'nl': 'Een claim moet alle vier overleven. Eén fout stuurt hem terug.',
        'de': 'Eine Aussage muss alle vier überstehen. Ein Fehler schickt sie zurück.',
        'es': 'Una afirmación tiene que superar las cuatro. Un fallo la devuelve.',
        'pt': 'Uma afirmação tem de sobreviver às quatro. Uma falha devolve-a.',
    },
    # The bento of counted figures. The numbers speak; the lead was throat-clearing.
    'platform.scale.lead': {
        'en': 'What is actually built, counted.',
        'nl': 'Wat er daadwerkelijk staat, geteld.',
        'de': 'Was tatsächlich gebaut ist, gezählt.',
        'es': 'Lo que está realmente construido, contado.',
        'pt': 'O que está efetivamente construído, contado.',
    },
    # The four governance cards follow immediately and each names its mechanism.
    'governance.data.lead': {
        'en': 'Four mechanisms. None of them is a certification.',
        'nl': 'Vier mechanismen. Geen daarvan is een certificering.',
        'de': 'Vier Mechanismen. Keiner davon ist eine Zertifizierung.',
        'es': 'Cuatro mecanismos. Ninguno es una certificación.',
        'pt': 'Quatro mecanismos. Nenhum deles é uma certificação.',
    },
    # The numbered list of gate conditions is directly beside it.
    'governance.gate.lead': {
        'en': 'A named person approves every output. These are the conditions that force it.',
        'nl': 'Een met naam genoemd persoon keurt elke output goed. Dit zijn de condities die dat afdwingen.',
        'de': 'Eine namentlich genannte Person gibt jedes Ergebnis frei. Dies sind die Bedingungen, die das erzwingen.',
        'es': 'Una persona con nombre aprueba cada salida. Estas son las condiciones que lo obligan.',
        'pt': 'Uma pessoa identificada aprova cada resultado. Estas são as condições que o obrigam.',
    },
    # The ten disciplines are listed underneath, each with its own line.
    'sprint.disciplines.lead': {
        'en': 'Each one is a scoped pass with its own question and its own output.',
        'nl': 'Elk is een afgebakende slag met een eigen vraag en een eigen uitkomst.',
        'de': 'Jede ist ein abgegrenzter Durchgang mit eigener Frage und eigenem Ergebnis.',
        'es': 'Cada una es una pasada acotada con su propia pregunta y su propio resultado.',
        'pt': 'Cada uma é uma passagem delimitada com a sua própria pergunta e o seu próprio resultado.',
    },
    # The three formats are cards with images below.
    'sprint.delivery.lead': {
        'en': 'Three formats, running side by side from day one.',
        'nl': 'Drie vormen, vanaf dag één naast elkaar.',
        'de': 'Drei Formate, ab Tag eins nebeneinander.',
        'es': 'Tres formatos, en paralelo desde el primer día.',
        'pt': 'Três formatos, lado a lado desde o primeiro dia.',
    },
    # Two cards. The lead listed what the cards list.
    'sprint.inputs.lead': {
        'en': 'Two things, and neither of them is a workshop.',
        'nl': 'Twee dingen, en geen van beide is een workshop.',
        'de': 'Zwei Dinge, und keines davon ist ein Workshop.',
        'es': 'Dos cosas, y ninguna es un taller.',
        'pt': 'Duas coisas, e nenhuma delas é um workshop.',
    },
    # Four profile cards, each naming a kind of firm.
    'partnerships.who.lead': {
        'en': 'Described by the shape of the firm, never by name.',
        'nl': 'Beschreven naar het type kantoor, nooit bij naam.',
        'de': 'Beschrieben nach Art der Firma, nie namentlich.',
        'es': 'Descritas por el tipo de firma, nunca por su nombre.',
        'pt': 'Descritas pelo tipo de firma, nunca pelo nome.',
    },
}

SPRINT_REFRAME_ATTR = {
    'en': 'Why a second pass',
    'nl': 'Waarom een tweede lezing',
    'de': 'Warum ein zweiter Durchgang',
    'es': 'Por qué una segunda pasada',
    'pt': 'Porquê uma segunda passagem',
}


def walk_drop_eyebrows(node, path):
    """Delete every `eyebrow` key except the ones in KEEP_EYEBROWS."""
    if isinstance(node, dict):
        for key in list(node):
            child = f'{path}.{key}' if path else key
            if key == 'eyebrow' and child not in KEEP_EYEBROWS:
                del node[key]
            else:
                walk_drop_eyebrows(node[key], child)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            walk_drop_eyebrows(item, f'{path}.{i}')


def drop(data, dotted):
    parts = dotted.split('.')
    node = data
    for part in parts[:-1]:
        node = node.get(part)
        if node is None:
            return
    node.pop(parts[-1], None)


def put(data, dotted, value):
    parts = dotted.split('.')
    node = data
    for part in parts[:-1]:
        node = node[part]
    node[parts[-1]] = value


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
        assert json.dumps(data, ensure_ascii=False, indent=2) + '\n' == raw, f'{loc}: not canonical'

        before = words(data)

        walk_drop_eyebrows(data, '')
        for dotted in DROP:
            drop(data, dotted)
        for dotted, per_locale in LEADS.items():
            put(data, dotted, per_locale[loc])
        put(data, 'sprint.reframe.attr', SPRINT_REFRAME_ATTR[loc])

        after = words(data)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'{loc}: bundle {before} -> {after} words')


if __name__ == '__main__':
    main()
