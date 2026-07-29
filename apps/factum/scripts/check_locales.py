"""Guard the five message files: key parity, ICU placeholder parity, sentence length.

Missing keys break static generation at build time, and a dropped placeholder
renders a literal {disciplines} on the page, so both are checked against English.
"""

import re
import sys

import messages

PLACEHOLDER = re.compile(r'\{(\w+)\}')


def walk(o, p=''):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from walk(v, f'{p}.{k}')
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk(v, f'{p}[{i}]')
    elif isinstance(o, str):
        yield p.lstrip('.'), o


def sentences(text):
    return [s for s in re.split(r'(?<=[.!?])\s+', text.strip()) if s]


en = dict(walk(messages.load('en')))
failed = False

for locale in messages.LOCALES:
    cur = dict(walk(messages.load(locale)))

    missing = sorted(set(en) - set(cur))
    extra = sorted(set(cur) - set(en))
    drift = [k for k in set(en) & set(cur)
             if set(PLACEHOLDER.findall(en[k])) != set(PLACEHOLDER.findall(cur[k]))]

    words = sum(len(v.split()) for v in cur.values())
    longest = max((len(s.split()), s) for v in cur.values() for s in sentences(v))
    over = sum(1 for v in cur.values() for s in sentences(v) if len(s.split()) > 30)

    ok = not (missing or extra or drift)
    failed |= not ok
    print(f'{locale}: {words:5d} words  longest sentence {longest[0]:2d}w  '
          f'{over} over 30w  {"OK" if ok else "FAIL"}')
    if missing:
        print(f'   missing: {missing[:5]}')
    if extra:
        print(f'   extra:   {extra[:5]}')
    if drift:
        print(f'   placeholder drift: {drift[:5]}')
    if longest[0] > 34:
        print(f'   longest: {longest[1]}')

sys.exit(1 if failed else 0)
