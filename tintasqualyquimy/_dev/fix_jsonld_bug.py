import pathlib
import re

root = pathlib.Path('.')
html_files = sorted(root.rglob('*.html'))
modified = []

for path in html_files:
    if '_dev' in path.parts:
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    if '<script type="application/ld+json">' not in text:
        continue
    if '<script type="application/ld+json">\n  <link rel="preconnect"' not in text:
        continue

    original = text
    text = text.replace('<script type="application/ld+json">\n', '', 1)
    pattern = re.compile(r'</script>\s*(\{\s*"@context"[\s\S]*?\})\s*</script>', re.MULTILINE)
    def repl(match):
        return '</script>\n<script type="application/ld+json">' + match.group(1) + '</script>'
    text, count = pattern.subn(repl, text, count=1)
    if count == 0:
        continue
    if text != original:
        path.write_text(text, encoding='utf-8')
        modified.append(path)

print('Files fixed:', len(modified))
for p in modified:
    print(p)
