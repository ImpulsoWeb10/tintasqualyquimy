import os, glob, re
root = r'c:\Users\Rafa Qualy\Desktop\IA-AGENTES\tintasqualyquimy'
html = [os.path.relpath(p, root).replace('\\','/') for p in glob.glob(os.path.join(root, '**', '*.html'), recursive=True)]
html = [p for p in html if not p.startswith('_dev/')]
html = sorted(html)
mapfile = os.path.join(root, 'sitemap.xml')
text = open(mapfile, encoding='utf-8', errors='ignore').read()
urls = re.findall(r'<loc>([^<]+)</loc>', text)
urls = sorted(urls)
missing=[]
for p in html:
    url = 'https://tintasqualyquimy.com.br/' + p if p != 'index.html' else 'https://tintasqualyquimy.com.br/'
    if url not in urls:
        missing.append(url)
print('HTML pages in site:', len(html))
print('URLs in sitemap:', len(urls))
print('Missing pages:', len(missing))
for x in missing[:200]:
    print(x)
