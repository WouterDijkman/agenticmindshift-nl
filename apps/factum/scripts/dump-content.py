#!/usr/bin/env python3
"""Emit the entire site copy as one editable markdown document.

Ordered the way a visitor meets it, not the way the JSON happens to be keyed —
`platform` stores `scale` second and renders it seventh, and `governance` stores
`cta` sixth and renders it last. Render order is read out of each page.tsx by
scanning the source for `t(...)` / `t.raw(...)` calls in file order, so this
document reorders itself when a section moves rather than going quietly stale.

Every string carries its key path. That is the whole point: it is what lets an
edit in this file be mapped back to `messages/*.json` without guessing.

Run from apps/factum:  python3 scripts/dump-content.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MESSAGES = ROOT / 'messages' / 'en.json'
OUT = ROOT / 'CONTENT.md'

# route -> (page file, namespace, human name)
PAGES = [
    ('/',                  'app/[locale]/page.tsx',                  'home',         'Homepage'),
    ('/platform',          'app/[locale]/platform/page.tsx',         'platform',     'Platform'),
    ('/diligence-sprint',  'app/[locale]/diligence-sprint/page.tsx', 'sprint',       'Diligence sprint'),
    ('/method',            'app/[locale]/method/page.tsx',           'method',       'The method'),
    ('/limits-of-ai',      'app/[locale]/limits-of-ai/page.tsx',     'aiLimits',     'Limits of AI'),
    ('/governance',        'app/[locale]/governance/page.tsx',       'governance',   'Governance'),
    ('/partnerships',      'app/[locale]/partnerships/page.tsx',     'partnerships', 'Partnerships'),
    ('/team',              'app/[locale]/team/page.tsx',             'team',         'Team'),
    ('/contact',           'app/[locale]/contact/page.tsx',          'contact',      'Contact'),
    ('/privacy',           'app/[locale]/privacy/page.tsx',          'privacy',      'Privacy'),
]

# meta.<key> per route, as passed to pageMetadata()
META_KEY = {
    '/': 'home', '/platform': 'platform', '/diligence-sprint': 'sprint',
    '/method': 'method', '/limits-of-ai': 'aiLimits', '/governance': 'governance',
    '/partnerships': 'partnerships', '/team': 'team', '/contact': 'contact',
    '/privacy': 'privacy',
}

CALL = re.compile(r"\b(t|s)(?:\.raw)?\(\s*[`'\"]([a-zA-Z0-9_.]+)")
# The component's own `return (`, i.e. the start of the JSX. `generateMetadata`
# above it returns a call, not a parenthesised tree, so the last match wins.
RETURN = re.compile(r"\n  return \(")
# `const people = t.raw('people') …` — a section pulled out of the JSX into a
# local above it. Naively scanning the whole file in source order puts those
# sections first, which is exactly wrong: they are hoisted for readability and
# render wherever the variable is used.
LOCAL = re.compile(r"\n  const (\w+) =")


def render_order(page_file, namespace):
    """Section keys in the order the page actually renders them.

    Returns (own_sections, shared_sections). A `t(...)` call is page copy; an
    `s(...)` call reaches into `shared`, which several pages draw on — worth
    flagging, because editing one of those changes more than one page.

    Order is taken from the JSX only. Sections prepared in a local above the
    JSX are placed where that local is first used, so `platform.scale` lands
    seventh where the reader meets it rather than first where it is declared.
    """
    src = (ROOT / page_file).read_text(encoding='utf-8')

    cuts = list(RETURN.finditer(src))
    head_src, jsx = (src[:cuts[-1].start()], src[cuts[-1].start():]) if cuts else ('', src)

    # local variable -> the sections it carries
    locals_ = {}
    marks = list(LOCAL.finditer(head_src))
    for j, m in enumerate(marks):
        body = head_src[m.end():marks[j + 1].start() if j + 1 < len(marks) else len(head_src)]
        found = [(fn, p.split('.')[0]) for fn, p in CALL.findall(body)]
        if found:
            locals_[m.group(1)] = found

    own, shared = [], []

    def add(fn, head):
        bucket = own if fn == 't' else shared
        if head not in bucket:
            bucket.append(head)

    # A local is only a use when it stands alone as an identifier. Without the
    # guards, `limits` matches inside the string "/limits-of-ai" a few lines
    # above its real use and drags the whole section to the top of the page.
    token = re.compile(
        r"\b(?:t|s)(?:\.raw)?\(\s*[`'\"][a-zA-Z0-9_.]+"
        + (r"|(?<![\w/.'\"-])(?:" + '|'.join(map(re.escape, locals_)) + r")(?![\w-])"
           if locals_ else ''))
    for m in token.finditer(jsx):
        text = m.group(0)
        hit = CALL.match(text)
        if hit:
            add(hit.group(1), hit.group(2).split('.')[0])
        else:
            for fn, head in locals_.get(text, []):
                add(fn, head)

    # Anything only ever touched above the JSX still belongs in the document;
    # park it at the end rather than silently dropping the copy.
    for fn, path in CALL.findall(head_src):
        add(fn, path.split('.')[0])

    return own, shared


def walk(node, prefix):
    """Flatten to (keypath, text) pairs, arrays included, order preserved."""
    if isinstance(node, str):
        yield prefix, node
    elif isinstance(node, dict):
        for k, v in node.items():
            yield from walk(v, '{}.{}'.format(prefix, k) if prefix else k)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk(v, '{}.{}'.format(prefix, i))


def emit(lines, node, prefix):
    for key, text in walk(node, prefix):
        lines.append('**`{}`**'.format(key))
        lines.append(text)
        lines.append('')


def words(node):
    return sum(len(t.split()) for _, t in walk(node, ''))


def main():
    data = json.loads(MESSAGES.read_text(encoding='utf-8'))
    site = (ROOT / 'lib' / 'site.ts').read_text(encoding='utf-8')

    # The numbers that get injected into {placeholders}, straight from source.
    consts = dict(re.findall(r"export const ([A-Z_]+)\s*=\s*([0-9.]+|'[^']*')", site))

    # Most counts are derived in TypeScript (`MODULES.filter(...).length`), so
    # the literal scan above leaves them blank. Re-derive them from the same
    # roster rather than typing them in here — a hand-typed 22 in this script is
    # the exact failure mode the constants exist to prevent.
    mods = re.findall(r"\{ slug: '([a-z-]+)', wave: (\d+), kind: '(\w+)'(, zdr: true)? \}", site)
    waves = [str(sum(1 for m in mods if int(m[1]) == w + 1))
             for w in range(int(consts.get('WAVE_COUNT', 0) or 0))]
    consts.update({
        'MODULE_COUNT': str(len(mods)),
        'ZDR_MODULE_COUNT': str(sum(1 for m in mods if m[3])),
        'DISCIPLINE_COUNT': str(len(re.findall(
            r"'[a-z-]+'", re.search(r"DISCIPLINES = \[(.*?)\]", site, re.S).group(1)))),
        'WAVE_SIZES': ' / '.join(waves),
        'WAVE_SIZES[0]': waves[0] if waves else '—',
        'GROUNDING_REMAINDER': '{:.1f}'.format(100 - float(consts.get('GROUNDING_RATE', 100))),
    })
    consts['MODULE_COUNT - ZDR_MODULE_COUNT'] = str(
        len(mods) - sum(1 for m in mods if m[3]))

    L = []
    A = L.append

    A('# Factum Capital — volledige site-inhoud')
    A('')
    A('Brontaal **Engels**. Dit is de volledige tekst van factumcapital.eu:'
      ' {} strings over {} pagina\'s.'.format(
          sum(1 for _ in walk(data, '')), len(PAGES)))
    A('')
    A('> **Gegenereerd bestand.** Gemaakt met `scripts/dump-content.py`.'
      ' Bewerk deze md vrij — ik zet de wijzigingen daarna terug in'
      ' `messages/en.json` en draag ze over naar nl/de/es/pt.'
      ' Draai het script opnieuw om te resynchroniseren.')
    A('')

    A('## Hoe je dit bewerkt')
    A('')
    A('- **De sleutel boven elke regel (`home.hero.title`) is de koppeling'
      ' naar de code. Laat die staan.** Verander alleen de tekst eronder.')
    A('- **Volgorde = leesvolgorde op de pagina**, niet de volgorde in het'
      ' JSON-bestand. Secties verplaatsen doe je niet hier maar in de'
      ' page-component; zeg het en ik doe het.')
    A('- **`{iets}` tussen accolades is een getal dat uit de code komt**,'
      ' niet uit de tekst. Laat het staan waar je het wilt zien. Zie de'
      ' getallenlijst onderaan voor de actuele waarden.')
    A('- **Rechte apostrof `\'` is verboden.** ICU leest hem als escape en eet'
      ' dan stilletjes de placeholder erachter op. Gebruik altijd `’`.')
    A('- **Secties gemarkeerd als GEDEELD staan op meerdere pagina\'s.**'
      ' Eén bewerking werkt overal door. Dat is bewust: het voorkomt dat twee'
      ' pagina\'s uit elkaar gaan lopen.')
    A('- **Nieuwe tekst mag langer of korter.** Als een lijst een item méér of'
      ' minder krijgt, zeg dat er expliciet bij — sommige lijsten hebben een'
      ' build-controle op hun lengte (9 disciplines, 22 modules, 5 waves).')
    A('')

    A('## Wat hier NIET in staat')
    A('')
    A('- **Tekst in afbeeldingen: die is er niet.** Alle 15 beelden zijn'
      ' abstracte macrofoto\'s zonder letters, en ze staan bewust op'
      ' `alt=""` omdat ze decoratief zijn. Er valt dus niets aan te'
      ' schrijven. Wil je bijschriften onder de beelden, dan is dat nieuwe'
      ' copy en nieuwe code.')
    A('- **Grafieken en diagrammen bevatten wél tekst, en die staat hier wel'
      ' in** — labels van het dispatch-diagram, de vergelijkingsmatrix en de'
      ' bevindingsschema-tabel zitten onder `shared.chart`,'
      ' `platform.alternatives` en `shared.schema`.')
    A('- **De ja/nee-oordelen in de vergelijkingsmatrix staan in de code**'
      ' (`app/[locale]/platform/page.tsx`, `MATRIX`), niet in de tekst. Dat is'
      ' opzet: het zijn claims over wat we wel en niet kunnen, identiek in elke'
      ' taal, en een vertaler mag een "nee" niet per ongeluk in een "ja"'
      ' veranderen. Wil je er een wijzigen, zeg welke rij en welke kolom.')
    A('- **nl/de/es/pt.** Die zijn inhoudelijk gelijkwaardig maar niet'
      ' woordelijk gelijk. Als dit document klaar is draag ik de wijzigingen'
      ' over.')
    A('')

    # ---- overview ----------------------------------------------------
    # The complaint that started this document was "almost every page except
    # the homepage is completely empty". This table is that complaint in
    # numbers, so the rewrite can start with the thinnest pages.
    A('## Hoeveel tekst staat er nu per pagina')
    A('')
    A('Alleen eigen tekst van de pagina — gedeelde blokken en navigatie niet'
      ' meegeteld, want die staan overal. Ter ijking: een pagina die als'
      ' volwaardig leest heeft grofweg 700–1200 woorden.')
    A('')
    A('| pagina | route | woorden | secties |')
    A('| --- | --- | ---: | ---: |')
    for route, page_file, ns, name in PAGES:
        own, _ = render_order(page_file, ns)
        own = [k for k in own if k in data[ns]]
        w = words(data[ns])
        flag = ' ⚠️' if w < 550 else ''
        A('| {} | `{}` | {}{} | {} |'.format(name, route, w, flag, len(own)))
    A('')
    A('⚠️ = dun. Dat is niet per se fout — /contact hoort kort te zijn — maar'
      ' /team, /partnerships en /diligence-sprint dragen wel gewicht en hebben'
      ' minder tekst dan de homepage.')
    A('')

    A('---')
    A('')

    # ---- site chrome -------------------------------------------------
    A('## 0. Site-breed (staat op elke pagina)')
    A('')
    A('_Navigatie, footer, en de blokken die meerdere pagina\'s delen._')
    A('')
    A('### Navigatie  `nav`')
    A('')
    emit(L, data['nav'], 'nav')
    A('### Footer  `footer`')
    A('')
    emit(L, data['footer'], 'footer')
    A('### Toegankelijkheidslabels  `a11y`')
    A('')
    emit(L, data['a11y'], 'a11y')
    A('### 404-pagina  `notFound`')
    A('')
    emit(L, data['notFound'], 'notFound')

    A('---')
    A('')

    # ---- shared blocks -----------------------------------------------
    A('## 1. Gedeelde blokken  `shared`')
    A('')
    A('**Let op: elk blok hieronder verschijnt op meer dan één pagina.**'
      ' Eén bewerking werkt overal door.')
    A('')
    for key in data['shared']:
        note = {
            'disciplines': 'De negen disciplines. Build faalt bij een ander aantal dan 9,'
                           ' en de volgorde is vast — de iconen worden op positie gekoppeld.',
            'modules': 'De 22 modulenamen. Build faalt bij een ander aantal dan 22.',
            'waves': 'De vijf waves. Build faalt bij een ander aantal dan 5.',
            'schema': 'Het bevindingsschema, getoond op de homepage en /platform.',
            'specimen': 'Het uitgewerkte voorbeeld van één bevinding, op de homepage.',
            'guarantee': 'De garantie, herhaald naast elke CTA-knop.',
            'links': 'Terugkerende linkteksten tussen pagina\'s.',
            'reframe': 'De openingszin, gedeeld door homepage en /diligence-sprint zodat'
                       ' ze niet uit elkaar lopen.',
            'chart': 'Labels in het dispatch-diagram op /platform.',
            'governancePoints': 'Staat op zowel de homepage als /governance.',
            'ctaProof': 'Het zinnetje onder elke CTA-knop.',
        }.get(key)
        A('### `shared.{}`{}'.format(key, '  — GEDEELD' if True else ''))
        A('')
        if note:
            A('_{}_'.format(note))
            A('')
        emit(L, data['shared'][key], 'shared.' + key)

    A('---')
    A('')

    # ---- pages -------------------------------------------------------
    for i, (route, page_file, ns, name) in enumerate(PAGES, start=2):
        own, shared = render_order(page_file, ns)
        own = [k for k in own if k in data[ns]]

        A('## {}. {} — `{}`'.format(i, name, route))
        A('')
        A('_{} woorden. Secties in leesvolgorde._'.format(words(data[ns])))
        A('')

        mk = META_KEY.get(route)
        if mk and mk in data.get('meta', {}):
            A('### Zoekresultaat (browsertitel + Google-omschrijving)')
            A('')
            A('_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem'
              ' onder de 43 tekens of de build klaagt._')
            A('')
            emit(L, data['meta'][mk], 'meta.' + mk)

        for sec in own:
            A('### `{}.{}`'.format(ns, sec))
            A('')
            emit(L, data[ns][sec], '{}.{}'.format(ns, sec))

        # Sections present in the file but never rendered = dead copy.
        unused = [k for k in data[ns] if k not in own]
        if unused:
            A('> **Ongebruikt op deze pagina:** `{}`. Staat wel in het'
              ' message-bestand maar wordt nergens gerenderd — dus dode tekst,'
              ' tenzij ik iets mis. Zeg het als het weg mag.'.format(
                  '`, `'.join(unused)))
            A('')

        if shared:
            A('> **Gebruikt ook deze gedeelde blokken:** `shared.{}`.'
              ' Zie sectie 1.'.format('`, `shared.'.join(shared)))
            A('')

        A('---')
        A('')

    # ---- numbers -----------------------------------------------------
    A('## Getallen die de code invult')
    A('')
    A('Deze verschijnen als `{iets}` in de tekst hierboven. Ze staan in'
      ' `lib/site.ts` en worden uit de echte lijsten afgeleid, zodat een'
      ' wijziging aan de moduleroster automatisch elke zin bijwerkt.'
      ' **Typ ze niet als cijfer in de tekst** — dan lopen ze stil uit de pas.')
    A('')
    A('| placeholder | nu | bron |')
    A('| --- | --- | --- |')
    rows = [
        ('{modules}', 'MODULE_COUNT', 'aantal modules in MODULES'),
        ('{waves}', 'WAVE_COUNT', 'aantal waves'),
        ('{disciplines}', 'DISCIPLINE_COUNT', 'aantal disciplines'),
        ('{blocks}', 'HARD_BLOCK_COUNT', 'harde blokkeerklassen'),
        ('{zdr}', 'ZDR_MODULE_COUNT', 'modules met zero retention'),
        ('{date}', 'GROUNDING_AUDIT_DATE', 'datum van de groundingmeting'),
        ('{remainder}', 'GROUNDING_REMAINDER', '100 min de groundingscore'),
        ('{kvk}', 'KVK', 'KvK-nummer'),
        ('{w1}..{w5}', 'WAVE_SIZES', 'modules per wave, afgeleid'),
        ('{first}', 'WAVE_SIZES[0]', 'modules in wave 1'),
        ('{other}', 'MODULE_COUNT - ZDR_MODULE_COUNT', 'afgeleid'),
    ]
    for ph, const, src_desc in rows:
        val = consts.get(const, '—').strip("'")
        A('| `{}` | {} | {} (`{}`) |'.format(ph, val, src_desc, const))
    A('')
    A('Verder vast in de code: groundingscore **{}%** (gemeten {},'
      ' interne telling), dekking **{} van {}** diligence-dimensies volledig,'
      ' **{}** gedeeltelijk.'.format(
          consts.get('GROUNDING_RATE', '?'),
          consts.get('GROUNDING_AUDIT_DATE', '?').strip("'"),
          consts.get('COVERAGE_FULL', '?'), consts.get('COVERAGE_DIMENSIONS', '?'),
          consts.get('COVERAGE_PARTIAL', '?')))
    A('')

    OUT.write_text('\n'.join(L), encoding='utf-8')
    print('wrote {} ({:,} bytes)'.format(OUT.relative_to(ROOT), OUT.stat().st_size))


if __name__ == '__main__':
    main()
