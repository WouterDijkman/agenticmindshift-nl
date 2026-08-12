#!/usr/bin/env python3
"""Fail if a page calls `t('key')` on a string that contains an ICU placeholder
without passing the arguments to fill it.

This exists because of a real production bug. `/platform` rendered

    {modules} pre-scoped modules, in a fixed dependency order …

as the first line of the page, in all five locales, for as long as the page
existed. The call was `t('header.lead')` where the sibling line was
`t('header.title', n)` — one missing argument object. ICU does not throw on a
placeholder it cannot fill; it leaves the braces standing and renders on. So
nothing failed: the build was green, the type checker was happy, and a route
sweep that asserts "page returns 200 and the title is right" says nothing at
all, because the damage is in the lead paragraph.

The check is static on purpose — no build, no server, no network. It reads the
page sources and the source-locale message file and compares what each call
asks for against what that string actually needs.

Scope and honest limits:

  - `t.raw(...)` is skipped. It bypasses ICU entirely and hands back the string
    with braces intact; pages that use it interpolate in TSX instead.
  - Only the source locale is read. The five locales are key-identical by
    construction, and a placeholder name is not translated.
  - Arguments are matched by presence, not by name. `t('x', n)` passes even if
    `n` lacks the key — `n` is a shared object built once per page, so a
    name-level check would need to resolve the spread. Presence catches the
    bug that actually happens, which is forgetting the argument entirely.

Run from the repo root:  python3 scripts/check-placeholders.py
Exit code 1 on any finding, so it can gate a commit or a deploy.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# app directory -> source locale. Factum authors in English, apps/web in Dutch.
APPS = [('apps/factum', 'en'), ('apps/web', 'nl')]

# The namespace each handle is bound to, read off the call that made it. Both
# next-intl shapes appear in this repo: `getTranslations('platform')` and
# `getTranslations({ locale, namespace: 'meta' })`. Namespaces can be dotted —
# `getTranslations('homepage.faqItems')` binds a handle partway down the tree.
BIND = re.compile(
    r"const (\w+) = await getTranslations\(\s*(?:"
    r"'([\w.]+)'"
    r"|\{[^}]*namespace:\s*'([\w.]+)'[^}]*\}"
    r")\s*\)")

# A translation call, with whatever follows the key up to the closing paren.
# Deliberately not a full parser: the second group only has to tell us whether
# an argument was passed, and `[^()]*` plus an optional one-level `(...)` covers
# every call shape in this codebase.
CALL = re.compile(
    r"\b(\w+)(\.raw)?\(\s*([`'\"])([^`'\"]*)\3\s*(,\s*(?:[^()]|\([^()]*\))*)?\)")

PLACEHOLDER = re.compile(r"\{([a-zA-Z][a-zA-Z0-9_]*)\}")


def candidates(data, path):
    """Every string a key path can resolve to.

    Pages build repeated blocks with a template literal — `t(f'waves.steps.
    ${i}.body')`. The index is not knowable statically, so `${…}` becomes a
    wildcard and every element of that list is checked. One item needing an
    argument is enough to require it.
    """
    parts = re.sub(r"\$\{[^}]*\}", '\x00', path).split('.')
    nodes = [data]
    for part in parts:
        nxt = []
        for node in nodes:
            if part == '\x00':
                if isinstance(node, list):
                    nxt.extend(node)
                elif isinstance(node, dict):
                    nxt.extend(node.values())
            elif isinstance(node, list) and part.isdigit() and int(part) < len(node):
                nxt.append(node[int(part)])
            elif isinstance(node, dict) and part in node:
                nxt.append(node[part])
        nodes = nxt
    return [n for n in nodes if isinstance(n, str)]


def scan(app_dir, locale):
    app = ROOT / app_dir
    data = json.loads((app / 'messages' / '{}.json'.format(locale)).read_text(encoding='utf-8'))
    findings = []

    sources = []
    for sub in ('app', 'components'):
        if (app / sub).is_dir():
            sources += sorted((app / sub).rglob('*.tsx'))

    for path in sources:
        src = path.read_text(encoding='utf-8')
        handles = {m[0]: m[1] or m[2] for m in BIND.findall(src)}
        if not handles:
            continue

        for m in CALL.finditer(src):
            handle, raw, key, args = m.group(1), m.group(2), m.group(4), m.group(5)
            if handle not in handles or raw:
                continue
            if args and args.strip(' ,'):
                continue  # something was passed; good enough

            for text in candidates(data, '{}.{}'.format(handles[handle], key)):
                names = sorted(set(PLACEHOLDER.findall(text)))
                if names:
                    line = src[:m.start()].count('\n') + 1
                    findings.append((
                        '{}:{}'.format(path.relative_to(ROOT), line),
                        "{}('{}')".format(handle, key),
                        ', '.join('{' + n + '}' for n in names),
                        text[:80] + ('…' if len(text) > 80 else '')))
                    break

    return findings


def main():
    findings = []
    for app_dir, locale in APPS:
        found = scan(app_dir, locale)
        print('{:14} against messages/{}.json — {}'.format(
            app_dir, locale,
            '{} finding(s)'.format(len(found)) if found else 'clean'))
        findings += found

    if not findings:
        print('\nok — no translation call is missing the arguments its string needs')
        return 0

    print('\n{} call(s) will render a literal placeholder to the page:\n'.format(len(findings)))
    for where, call, names, text in findings:
        print('  {}\n    {} needs {}\n    "{}"\n'.format(where, call, names, text))
    print("Pass the argument object, e.g. t('header.lead', n).")
    return 1


if __name__ == '__main__':
    sys.exit(main())
