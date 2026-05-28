import os, glob, re
import json
root = r'c:\Users\Rafa Qualy\Desktop\IA-AGENTES'
html_files = glob.glob(os.path.join(root, '**', '*.html'), recursive=True)
official='tintasqualyquimy.com.br'
issues=[]
missing_ga=[]
for p in html_files:
    text = open(p, encoding='utf-8', errors='ignore').read()
    has_ga = 'G-HFTJ9MRF64' in text
    if not has_ga:
        missing_ga.append(p)
    canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', text, re.I)
    og = re.search(r'<meta[^>]+property=["\']og:url["\'][^>]*content=["\']([^"\']+)["\']', text, re.I)
    schema_urls = re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', text, re.I | re.S)
    jsonurls=[]
    for body in schema_urls:
        for url in re.findall(r'"url"\s*:\s*"([^"]+)"', body):
            jsonurls.append(url)
    if canon and og and canon.group(1) != og.group(1):
        issues.append((p, 'canonical-og mismatch', canon.group(1), og.group(1)))
    if canon and official not in canon.group(1):
        issues.append((p, 'canonical domain wrong', canon.group(1)))
    if og and official not in og.group(1):
        issues.append((p, 'og domain wrong', og.group(1)))
    for url in jsonurls:
        if official not in url:
            issues.append((p, 'jsonld url wrong', url))
print('HTML files:', len(html_files))
print('Missing GA:', len(missing_ga))
for p in missing_ga:
    print('MISSING_GA', p)
print('Issues:', len(issues))
for i in issues[:500]:
    print(*i)
