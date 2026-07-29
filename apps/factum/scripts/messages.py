"""Load and save messages/*.json without disturbing their hand-authored layout.

The files carry two formatting conventions a plain json.dumps destroys: a blank
line before every top-level namespace, and the team history entries compacted
onto one line each. Both are restored on write, so a load/save round-trip on an
untouched file produces a byte-identical result.
"""

import json
import re
from pathlib import Path

LOCALES = ['en', 'nl', 'de', 'es', 'pt']
MESSAGES = Path(__file__).resolve().parent.parent / 'messages'

_HISTORY_ENTRY = re.compile(
    r'\{\s*\n\s*"org": (".*?"),\s*\n\s*"role": (".*?"),\s*\n\s*"period": (".*?")\s*\n\s*\}',
    re.S
)


def load(locale):
    return json.loads((MESSAGES / f'{locale}.json').read_text(encoding='utf-8'))


def dumps(data):
    text = json.dumps(data, indent=2, ensure_ascii=False)
    text = _HISTORY_ENTRY.sub(r'{ "org": \1, "role": \2, "period": \3 }', text)

    lines = text.split('\n')
    out = []
    for i, line in enumerate(lines):
        if i > 1 and re.match(r'^  "', line):
            out.append('')
        out.append(line)
    return '\n'.join(out) + '\n'


def save(locale, data):
    (MESSAGES / f'{locale}.json').write_text(dumps(data), encoding='utf-8')


if __name__ == '__main__':
    for loc in LOCALES:
        raw = (MESSAGES / f'{loc}.json').read_text(encoding='utf-8')
        print(loc, 'lossless' if raw == dumps(load(loc)) else 'DIFFERS')
