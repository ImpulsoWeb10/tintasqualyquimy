#!/usr/bin/env python3
"""
Inject Google Analytics snippet into all HTML files under the `tintasqualyquimy` folder
that contain the placeholder comment "<!-- Google Analytics -->".

Usage:
  python _dev/inject_ga.py

This script edits files in-place. Make a git commit before running.
"""
import io
import os
import re
from pathlib import Path

GA_SNIPPET = (
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>\n'
    '<script>\n'
    "window.dataLayer = window.dataLayer || [];\n"
    "function gtag(){dataLayer.push(arguments);}\n"
    "gtag('js', new Date());\n"
    "gtag('config', 'G-HFTJ9MRF64', {'anonymize_ip': true});\n"
    '</script>\n'
)


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    if 'G-HFTJ9MRF64' not in text:
        return False

    # Remove all existing GA blocks and replace with a single canonical snippet.
    text = re.sub(
        r'<script[^>]+src="https://www\.googletagmanager\.com/gtag/js\?id=G-HFTJ9MRF64"[^>]*>\s*</script>\s*',
        '',
        text,
        flags=re.I,
    )
    text = re.sub(
        r'<script\b[^>]*>.*?(?:window\.dataLayer|function\s+gtag|gtag\(\s*["\']config["\']\s*,\s*["\']G-HFTJ9MRF64["\']).*?</script>\s*',
        '',
        text,
        flags=re.S | re.I,
    )

    if '<!-- Google Analytics -->' in text:
        text = text.replace('<!-- Google Analytics -->', GA_SNIPPET, 1)
    elif '</head>' in text:
        text = text.replace('</head>', GA_SNIPPET + '</head>', 1)
    else:
        return False

    path.write_text(text, encoding='utf-8')
    return True


def walk_and_fix(root: Path):
    fixed = []
    for p in root.rglob('*.html'):
        try:
            if fix_file(p):
                fixed.append(str(p))
        except Exception as e:
            print(f'ERROR {p}: {e}')
    print(f'Fixed {len(fixed)} files')
    for f in fixed:
        print(f)


if __name__ == '__main__':
    base = Path(__file__).resolve().parent.parent
    site_root = base
    if not site_root.exists():
        print('Could not find tintasqualyquimy folder relative to script')
    else:
        walk_and_fix(site_root)
