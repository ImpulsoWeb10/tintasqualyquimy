import os
import re
import pathlib
import xml.etree.ElementTree as ET

root = pathlib.Path('.')
html_files = sorted([p for p in root.rglob('*.html') if 'node_modules' not in str(p) and '.git' not in str(p)])
print(f'HTML files: {len(html_files)}')

link_re = re.compile(r'href=(?:"([^"]*)"|\'([^\']*)\')|src=(?:"([^"]*)"|\'([^\']*)\')', re.I)

broken = []
for p in html_files:
    text = p.read_text(encoding='utf-8', errors='ignore')
    for m in link_re.finditer(text):
        href = next((g for g in m.groups() if g), None)
        if not href:
            continue
        if href.startswith(('http://', 'https://', 'mailto:', 'tel:', '//', 'javascript:', 'data:', '#')):
            continue
        target = (p.parent / href).resolve()
        if target.is_file():
            continue
        q = href.split('?')[0].split('#')[0]
        if q == '' or q.endswith('/'):
            maybe = (p.parent / q / 'index.html').resolve()
            if maybe.is_file():
                continue
        if str(target).startswith(str(root.resolve())):
            rel = os.path.relpath(target, root)
            broken.append((str(p), href, rel, str(target)))

print('Broken internal references:')
for b in broken[:100]:
    print(b)
print('Total broken refs:', len(broken))

# Aggregate unique broken targets for pattern diagnosis
unique = {}
for p, href, rel, target in broken:
    unique.setdefault(href, 0)
    unique[href] += 1
print('\nUnique broken href patterns:')
for href, count in sorted(unique.items(), key=lambda x: (-x[1], x[0]))[:80]:
    print(f'{count:4d}  {href}')

sitemap = root / 'sitemap.xml'
if sitemap.exists():
    tree = ET.parse(sitemap)
    urls = [el.text.strip() for el in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc') if el.text]
    print('Sitemap URLs:', len(urls))
    missing = []
    for u in urls:
        if u.startswith('https://tintasqualyquimy.com.br/'):
            path = u.replace('https://tintasqualyquimy.com.br/', '')
            if path == '':
                path = 'index.html'
            if path.endswith('/'):
                path = path + 'index.html'
            f = root / path
            if not f.exists():
                missing.append((u, path))
    print('Missing sitemap entries:', len(missing))
    for m in missing[:50]:
        print(m)
else:
    print('No sitemap.xml found')
