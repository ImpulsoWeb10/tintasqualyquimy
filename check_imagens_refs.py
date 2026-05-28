import os
import glob
import re
root = r'c:\Users\Rafa Qualy\Desktop\IA-AGENTES'
html_files = glob.glob(os.path.join(root, '**', '*.html'), recursive=True)
refs = []
for p in html_files:
    text = open(p, encoding='utf-8', errors='ignore').read()
    for m in re.findall(r"url\([\"']?(imagens/[^\"')]+)[\"']?\)", text, re.I):
        refs.append((p, m))
    for m in re.findall(r"src=[\"'](imagens/[^\"']+)[\"']", text, re.I):
        refs.append((p, m))
    for m in re.findall(r"data-src=[\"'](imagens/[^\"']+)[\"']", text, re.I):
        refs.append((p, m))

print('Total imagem refs:', len(refs))
broken = []
for p,m in refs:
    target = os.path.normpath(os.path.join(os.path.dirname(p), m))
    if not os.path.exists(target):
        broken.append((p, m, target))
print('Broken image refs:', len(broken))
for p,m,t in broken[:200]:
    print(p, m, t)
