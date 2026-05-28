from pathlib import Path
import re
root = Path('.')
html_files = [p for p in root.rglob('*.html') if 'node_modules' not in str(p) and 'dist' not in str(p) and '.git' not in str(p)]
print(f'HTML_COUNT={len(html_files)}')
old_domain_rx = re.compile(r'https://(?:www\.)?qualyquimy\.com\.br', re.I)
bad_domain_rx = re.compile(r'https://(?:www\.)?tintasqualyquimy\.tintasqualyquimy\.com\.br', re.I)
old_og_rx = re.compile(r'<meta[^>]+property=["\']og:url["\'][^>]*content=["\']https://(?:www\.)?qualyquimy\.com\.br', re.I)
old_page_rx = re.compile(r'https://(?:www\.)?qualyquimy\.com\.br(/[^"\s]*)?', re.I)
missing = []
bad_domain = []
bad_og = []
missing_utf8 = []
noindex = []
tailwind = []
style_css = []
for p in sorted(html_files):
    text = p.read_text('utf-8', errors='ignore')
    if not re.search(r'<link[^>]+rel=["\']canonical["\']', text, re.I):
        missing.append(str(p))
    if bad_domain_rx.search(text):
        bad_domain.append(str(p))
    if old_domain_rx.search(text):
        # ignore shop.qualyquimy.com.br and only count internal qualyquimy domain
        if 'shop.qualyquimy.com.br' not in text:
            bad_domain.append(str(p))
    if old_og_rx.search(text):
        bad_og.append(str(p))
    if 'charset="UTF-8"' not in text and 'charset="utf-8"' not in text and 'charset=UTF-8' not in text and 'charset=utf-8' not in text:
        missing_utf8.append(str(p))
    if re.search(r'name=["\']robots["\'][^>]*content=["\'][^"\']*noindex', text, re.I):
        noindex.append(str(p))
    if 'cdn.tailwindcss.com' in text:
        tailwind.append(str(p))
    if 'href="/css/style.css"' in text or "href='/css/style.css'" in text:
        style_css.append(str(p))
print('MISSING_CANONICAL', len(missing))
print('\n'.join(missing[:50]))
print('BAD_DOMAIN', len(set(bad_domain)))
print('\n'.join(sorted(set(bad_domain))[:50]))
print('BAD_OG_URL', len(bad_og))
print('\n'.join(bad_og[:50]))
print('MISSING_UTF8', len(missing_utf8))
print('NOINDEX', len(noindex))
print('TAILWIND', len(tailwind))
print('STYLE_CSS', len(style_css))
