#!/usr/bin/env python3
"""Emit the Dutch site copy as a plain readable document — text only.

The sibling script `dump-content.py` writes the same copy with every key path,
every editing rule and every dead-copy warning attached. That is the right
document for mapping an edit back to the code and the wrong one for actually
reading and rewriting the site, which is what this is for. No keys, no tables,
no instructions: the words on the page, in the order a visitor meets them.

Placeholders are filled in with the real numbers, so `{modules}` reads as 22.
They go back to placeholders when this comes home — never type a count into a
message file, or it goes stale the next time the roster moves.

Run from apps/factum:  python3 scripts/dump-nl.py
"""
import importlib.util
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'CONTENT-NL.md'

# Reuse the render-order reader rather than keeping a second copy of it that
# drifts. The filename has a hyphen, so it cannot be imported by name.
_spec = importlib.util.spec_from_file_location(
    'dump_content', Path(__file__).with_name('dump-content.py'))
_dump = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_dump)

PAGES = _dump.PAGES
META_KEY = _dump.META_KEY

# Keys that are a button or a link, not prose.
ACTIONS = {'cta', 'button', 'link', 'secondary', 'more', 'moreLabel'}
# Keys that are a heading for whatever follows.
HEADS = {'title', 'q'}


def numbers():
    """The values ICU injects, read from lib/site.ts so they cannot drift."""
    site = (ROOT / 'lib' / 'site.ts').read_text(encoding='utf-8')
    lit = dict(re.findall(r"export const ([A-Z_]+)\s*=\s*([0-9.]+|'[^']*')", site))
    mods = re.findall(r"\{ slug: '([a-z-]+)', wave: (\d+), kind: '(\w+)'(, zdr: true)? \}", site)
    zdr = sum(1 for m in mods if m[3])
    waves = [sum(1 for m in mods if int(m[1]) == w + 1) for w in range(int(lit['WAVE_COUNT']))]
    n = {
        'modules': len(mods),
        'waves': int(lit['WAVE_COUNT']),
        'disciplines': len(re.findall(
            r"'[a-z-]+'", re.search(r"DISCIPLINES = \[(.*?)\]", site, re.S).group(1))),
        'blocks': int(lit['HARD_BLOCK_COUNT']),
        'zdr': zdr,
        'other': len(mods) - zdr,
        'first': waves[0],
        'date': lit['GROUNDING_AUDIT_DATE'].strip("'"),
        'rate': lit['GROUNDING_RATE'],
        'remainder': '{:.1f}'.format(100 - float(lit['GROUNDING_RATE'])),
        'kvk': lit['KVK'].strip("'"),
        # The footer fills these two itself rather than from lib/site.ts.
        'number': lit['KVK'].strip("'"),
        'year': date.today().year,
        'full': int(lit['COVERAGE_FULL']),
        'partial': int(lit['COVERAGE_PARTIAL']),
        'dimensions': int(lit['COVERAGE_DIMENSIONS']),
    }
    n.update({'w{}'.format(i + 1): v for i, v in enumerate(waves)})
    return n


def fill(text, n):
    """Resolve `{placeholder}` and drop the ICU apostrophe escaping."""
    out = re.sub(r"\{(\w+)\}", lambda m: str(n.get(m.group(1), m.group(0))), text)
    return out.replace("''", "'")


def render(node, n, out, depth=0):
    """Write a message subtree as prose. Order follows the JSON, which is the
    order it was authored and — for these files — the order it renders."""
    if isinstance(node, str):
        out.append(fill(node, n))
        out.append('')
        return

    if isinstance(node, list):
        # A list of plain strings is a bulleted list; a list of objects is a
        # run of blocks, each with its own little heading.
        if all(isinstance(v, str) for v in node):
            for v in node:
                out.append('- ' + fill(v, n))
            out.append('')
        else:
            for v in node:
                render(v, n, out, depth + 1)
            out.append('')
        return

    # A flat block of short strings is a menu, not prose — the navigation and
    # the footer links. Set as a list, or the page turns into one word a line.
    vals = list(node.values())
    if len(vals) >= 5 and all(isinstance(v, str) and len(v) < 60 for v in vals):
        for v in vals:
            out.append('- ' + fill(v, n))
        out.append('')
        return

    # One row of a CV. Three keys on three lines reads as three fragments.
    if set(node) == {'org', 'role', 'period'}:
        out.append('- {} — {}, {}'.format(node['org'], node['role'], node['period']))
        return

    # `label` heads a card in some blocks and is a two-word caption in others.
    # Tell them apart by whether anything else in the block is prose.
    heads = set(HEADS)
    if 'label' in node and any(isinstance(v, str) and len(v) > 60 for v in vals):
        heads.add('label')
    # On a person, `title` is the job and `name` is the person. The person is
    # the heading; without this the CV reads "Oprichter, Factum / Wouter".
    if 'name' in node:
        heads = (heads - {'title'}) | {'name'}

    items = list(node.items())
    # Whatever heads the block goes first, even if the JSON keys it later.
    items.sort(key=lambda kv: 0 if kv[0] in heads else 1)

    for key, value in items:
        if isinstance(value, str):
            text = fill(value, n)
            if key in heads:
                out.append('{} {}'.format('#' * min(3 + depth, 4), text))
                out.append('')
            elif key in ACTIONS:
                out.append('→ {}'.format(text))
                out.append('')
            elif key.endswith('Label') or key.endswith('Line'):
                # A one- or two-word UI label. Set in italics, or it reads as a
                # sentence fragment dropped into the middle of the page.
                out.append('*{}*'.format(text))
                out.append('')
            else:
                out.append(text)
                out.append('')
        else:
            # A list is not a level of its own — its items are. Counting both
            # pushes every card title two heading levels down.
            render(value, n, out, depth + (0 if isinstance(value, list) else 1))


def main():
    data = json.loads((ROOT / 'messages' / 'nl.json').read_text(encoding='utf-8'))
    n = numbers()

    out = ['# Factum Capital — sitetekst', '']
    out.append('Alles wat er op factumcapital.eu staat, in leesvolgorde.'
               ' Schrijf er vrij overheen.')
    out.append('')

    for route, page_file, ns, name in PAGES:
        own, _ = _dump.render_order(page_file, ns)
        own = [k for k in own if k in data[ns]]

        out.append('---')
        out.append('')
        out.append('## {}  ({})'.format(name, route))
        out.append('')

        for sec in own:
            render(data[ns][sec], n, out)

        mk = META_KEY.get(route)
        if mk and mk in data.get('meta', {}):
            m = data['meta'][mk]
            out.append('*Google-resultaat:* **{}** — {}'.format(
                fill(m.get('title', ''), n), fill(m.get('description', ''), n)))
            out.append('')

    out.append('---')
    out.append('')
    out.append('## Blokken die op meer dan één pagina staan')
    out.append('')
    out.append('Deze tekst staat op meerdere pagina\'s. Eén keer aanpassen'
               ' verandert hem overal.')
    out.append('')
    for key in data['shared']:
        render(data['shared'][key], n, out)

    out.append('---')
    out.append('')
    out.append('## Menu en footer')
    out.append('')
    render(data['nav'], n, out)
    render(data['footer'], n, out)

    # Collapse runs of blank lines the recursion leaves behind.
    text = re.sub(r'\n{3,}', '\n\n', '\n'.join(out))
    OUT.write_text(text, encoding='utf-8')
    print('wrote {} ({:,} bytes, {:,} words)'.format(
        OUT.relative_to(ROOT), OUT.stat().st_size, len(text.split())))


if __name__ == '__main__':
    main()
