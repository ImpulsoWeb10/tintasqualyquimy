import os
import glob
from datetime import datetime
import re

root = os.path.abspath('tintasqualyquimy')
exclude_dirs = ['_dev', 'components', 'node_modules']
html_files = []
for p in glob.glob(os.path.join(root, '**', '*.html'), recursive=True):
    rel = os.path.relpath(p, root).replace(os.sep, '/')
    if any(rel.startswith(d + '/') for d in exclude_dirs):
        continue
    html_files.append((p, rel))
html_files.sort(key=lambda x: x[1])

lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p, rel in html_files:
    if rel == 'index.html':
        loc = 'https://tintasqualyquimy.com.br/'
    else:
        loc = 'https://tintasqualyquimy.com.br/' + rel
    mtime = datetime.utcfromtimestamp(os.path.getmtime(p)).strftime('%Y-%m-%d')
    lines.append('  <url>')
    lines.append(f'    <loc>{loc}</loc>')
    lines.append(f'    <lastmod>{mtime}</lastmod>')
    lines.append('    <priority>0.8</priority>')
    lines.append('  </url>')
lines.append('</urlset>')
with open(os.path.join(root, 'sitemap.xml'), 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n'.join(lines) + '\n')

# fix robots in projects/landing-pages
robots_path = os.path.abspath(os.path.join('projects', 'landing-pages', 'robots.txt'))
if os.path.exists(robots_path):
    text = open(robots_path, encoding='utf-8', errors='ignore').read()
    text = re.sub(r'Sitemap:\s*https?://[^\s]+', 'Sitemap: https://tintasqualyquimy.com.br/sitemap.xml', text)
    open(robots_path, 'w', encoding='utf-8', newline='\n').write(text)

# fix projects landing-pages sitemap
sitemap_path = os.path.abspath(os.path.join('projects', 'landing-pages', 'sitemap.xml'))
if os.path.exists(sitemap_path):
    text = open(sitemap_path, encoding='utf-8', errors='ignore').read()
    text = re.sub(r'https?://[^/]+/', 'https://tintasqualyquimy.com.br/', text)
    open(sitemap_path, 'w', encoding='utf-8', newline='\n').write(text)

print('Generated sitemap.xml with', len(html_files), 'entries')
print('Updated robots and subproject sitemap if present')
