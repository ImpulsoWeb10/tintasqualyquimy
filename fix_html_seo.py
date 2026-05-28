import os
import glob
import re

official = 'tintasqualyquimy.com.br'
GA_SNIPPET = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HFTJ9MRF64');
</script>'''

def normalize_url(url):
    if not url:
        return url
    # preserve schema and path, replace domain only for non-schema URLs
    if url.startswith('http://') or url.startswith('https://'):
        m = re.match(r'^(https?://)([^/]+)(/.*)?$', url)
        if m:
            scheme, domain, path = m.group(1), m.group(2), m.group(3) or ''
            if domain.lower() != official and 'schema.org' not in domain and 'google.com' not in domain:
                return scheme + official + path
    return url


def fix_jsonld(body):
    def repl(m):
        full = m.group(0)
        url = m.group(1)
        if url.startswith('https://') or url.startswith('http://'):
            if 'schema.org' in url or 'google.com' in url:
                return full
            new = normalize_url(url)
            return full.replace(url, new)
        return full
    return re.sub(r'"(https?://[^"\n]+)"', repl, body)


html_files = glob.glob(os.path.join('**', '*.html'), recursive=True)
modified = []
for p in html_files:
    if any(seg in p.replace('/', os.sep) for seg in [os.sep + 'node_modules' + os.sep, os.sep + '_dev' + os.sep, os.sep + 'components' + os.sep]):
        continue
    text = open(p, encoding='utf-8', errors='ignore').read()
    orig = text
    # canonical
    canon_match = re.search(r'(<link[^>]*rel=["\']canonical["\'][^>]*href=["\'])([^"\']+)(["\'][^>]*>)', text, re.I)
    og_match = re.search(r'(<meta[^>]*property=["\']og:url["\'][^>]*content=["\'])([^"\']+)(["\'][^>]*>)', text, re.I)
    canon_url = canon_match.group(2) if canon_match else None
    og_url = og_match.group(2) if og_match else None
    if canon_match:
        new_canon = normalize_url(canon_url)
        if new_canon != canon_url:
            text = text[:canon_match.start(2)] + new_canon + text[canon_match.end(2):]
            canon_url = new_canon
    if og_match:
        new_og = normalize_url(og_url)
        if new_og != og_url:
            text = text[:og_match.start(2)] + new_og + text[og_match.end(2):]
            og_url = new_og
    if canon_url and og_url and canon_url != og_url:
        text = text[:og_match.start(2)] + canon_url + text[og_match.end(2):]
        og_url = canon_url
    if canon_url and not og_match:
        insert = f'    <meta property="og:url" content="{canon_url}" />\n'
        text = text.replace(canon_match.group(0) + '\n', canon_match.group(0) + '\n' + insert, 1)
    if og_url and not canon_match:
        insert = f'    <link rel="canonical" href="{og_url}" />\n'
        text = text.replace(og_match.group(0) + '\n', insert + og_match.group(0) + '\n', 1)
    # GA
    if 'G-HFTJ9MRF64' not in text and re.search(r'<head[^>]*>', text, re.I) and re.search(r'</head>', text, re.I):
        text = re.sub(r'(?i)(</head>)', GA_SNIPPET + '\n\1', text, count=1)
    # JSON-LD
    def jsonld_repl(m):
        body = m.group(1)
        fixed = fix_jsonld(body)
        return m.group(0).replace(body, fixed)
    text = re.sub(r'(<script[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)', lambda m: m.group(1) + fix_jsonld(m.group(2)) + m.group(3), text, flags=re.I|re.S)

    if text != orig:
        open(p, 'w', encoding='utf-8', newline='\n').write(text)
        modified.append(p)

print('Modified files:', len(modified))
for m in modified:
    print(m)
