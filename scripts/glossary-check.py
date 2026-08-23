#!/usr/bin/env python3
"""Flags glossary violations in every locale of both apps. See GLOSSARY.md."""
import json, io, re, sys, collections

# (pattern, applies-to-locales, what to use instead)
BAD = [
 (r'dataroom',                    'nl en de es pt', 'data room'),
 (r'Datenr(a|ä)um\w*',            'de',             'Data Room'),
 (r'gegevensruimte',              'nl',             'data room'),
 (r'sala de datos|sala de dados', 'es pt',          'data room'),
 (r'datagap\w*',                  'nl en de es pt', 'data gap'),
 (r'Datenlücke\w*',               'de',             'data gap'),
 (r'brecha de datos|lacuna de dados|hueco de datos', 'es pt', 'data gap'),
 (r'Zielgesellschaft\w*',         'de',             'Target'),
 (r'doelvennootschap\w*|doelonderneming\w*', 'nl',   'target'),
 (r'sociedad objetivo|empresa objetivo|sociedade-alvo|empresa-alvo', 'es pt', 'target'),
 (r'zorgvuldigheidsonderzoek|boekenonderzoek', 'nl', 'due diligence'),
 (r'Sorgfaltsprüfung\w*',         'de',             'Due Diligence'),
 (r'diligencia debida',           'es pt',          'due diligence'),
 (r'Vertraulichkeitsvereinbarung\w*', 'de',         'NDA'),
 (r'acuerdo de confidencialidad', 'es',             'NDA'),
 (r'acordo de confidencialidade', 'pt',             'NDA'),
 (r'geheimhoudingsovereenkomst',  'nl',             'NDA'),
 (r'Abschluss(?!prüf)',           'de',             'Closing'),
 (r'\breads\b',                   'nl de es pt',    'ronde/Durchgang/pasada/passagem'),
 (r'\bdeliverables?\b',           'nl de es pt',    'oplevering'),
 (r'\binsights?\b|\blearnings?\b','nl de es pt',    'gewoon woord'),
 # Em-streepjes staan hier consistent in alle vijf de talen als bestaande
 # huisstijl (`Output contract — every finding…`). Dat is een keuze, geen fout,
 # dus die regel staat uit. Zet hem aan als de huisstijl verandert.
 (r"(?<=[a-zA-Z])'(?=[a-zA-Z])",  'nl en de es pt', 'typografische apostrof ’'),
]

def walk(o, p=''):
    if isinstance(o, dict):
        for k, v in o.items(): yield from walk(v, f'{p}.{k}')
    elif isinstance(o, list):
        for i, v in enumerate(o): yield from walk(v, f'{p}[{i}]')
    elif isinstance(o, str): yield p, o

total = 0
for app in ['factum', 'web']:
    for loc in ['nl', 'en', 'de', 'es', 'pt']:
        path = f'apps/{app}/messages/{loc}.json'
        try: data = json.load(io.open(path, encoding='utf8'))
        except FileNotFoundError: continue
        hits = collections.Counter()
        where = collections.defaultdict(list)
        for key, val in walk(data):
            for pat, locs, fix in BAD:
                if loc not in locs.split(): continue
                for m in re.finditer(pat, val, 0 if loc=='de' else re.I):
                    hits[(pat, fix)] += 1
                    if len(where[(pat, fix)]) < 3: where[(pat, fix)].append(f'{key} :: …{val[max(0,m.start()-30):m.start()+40]}…')
        if hits:
            print(f'\n── {app}/{loc} ' + '─' * 46)
            for (pat, fix), n in hits.most_common():
                print(f'  {n:>4}×  {pat}   →  {fix}')
                for w in where[(pat, fix)]: print(f'          {w}')
            total += sum(hits.values())
print(f'\nTOTAAL: {total} overtredingen')
sys.exit(1 if total else 0)
