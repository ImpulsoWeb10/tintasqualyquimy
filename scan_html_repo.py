import os
import glob
import re
root = r'c:\Users\Rafa Qualy\Desktop\IA-AGENTES'
html = glob.glob(os.path.join(root, '**', '*.html'), recursive=True)
print('HTML files:', len(html))
pat_ga = re.compile(r'G-HFTJ9MRF64')
missing_ga = []
broken_images = set()
for p in html:
    text = open(p, encoding='utf-8', errors='ignore').read()
    if not pat_ga.search(text):
        missing_ga.append(p)
    # find imagem references with simple matching
    for m in re.findall(r"url\([\"']?(imagens/[^\"')]+)[\"']?\)", text, re.I):
        target = os.path.join(os.path.dirname(p), m)
        if not os.path.exists(target):
            broken_images.add((p, m))
    for m in re.findall(r'src=[\"'](imagens/[^\"']+)[\"']', text, re.I):
        target = os.path.join(os.path.dirname(p), m)
        if not os.path.exists(target):
            broken_images.add((p, m))
print('Missing GA count:', len(missing_ga))
for p in missing_ga[:200]:
    print(p)
print('Broken image references:', len(broken_images))
for p, m in sorted(broken_images):
    print(p, m)
