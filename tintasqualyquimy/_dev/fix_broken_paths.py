import pathlib
from collections import Counter

reps = [
    ('href="../categorias/blog.html"', 'href="/blog/index.html"'),
    ('href="../../categorias/blog.html"', 'href="/blog/index.html"'),
    ('href="../../../categorias/blog.html"', 'href="/blog/index.html"'),
    ('href="categorias/blog.html"', 'href="/blog/index.html"'),
    ('href="../blog.html"', 'href="/blog/index.html"'),
    ('href="../../blog.html"', 'href="/blog/index.html"'),
    ('href="../../../blog.html"', 'href="/blog/index.html"'),
    ('href="blog.html"', 'href="/blog/index.html"'),
    ('href="../avaliacoes.html"', 'href="/index.html#titulo-avaliacoes"'),
    ('href="../../avaliacoes.html"', 'href="/index.html#titulo-avaliacoes"'),
    ('href="../../../avaliacoes.html"', 'href="/index.html#titulo-avaliacoes"'),
    ('href="avaliacoes.html"', 'href="/index.html#titulo-avaliacoes"'),
    ('href="/avaliacoes.html"', 'href="/index.html#titulo-avaliacoes"'),
    ('href="../css/style-min.css"', 'href="/css/style-min.css"'),
    ('href="../../css/style-min.css"', 'href="/css/style-min.css"'),
    ('href="../../../css/style-min.css"', 'href="/css/style-min.css"'),
    ('href="css/style-min.css"', 'href="/css/style-min.css"'),
    ('href="../css/style.css"', 'href="/css/style.css"'),
    ('href="../../css/style.css"', 'href="/css/style.css"'),
    ('href="../../../css/style.css"', 'href="/css/style.css"'),
    ('href="css/style.css"', 'href="/css/style.css"'),
    ('src="js/utils.js"', 'src="/js/utils.js"'),
    ('src="../js/utils.js"', 'src="/js/utils.js"'),
    ('src="../../js/utils.js"', 'src="/js/utils.js"'),
    ('src="../../../js/utils.js"', 'src="/js/utils.js"'),
    ('src="js/lazy-loading.js"', 'src="/js/lazy-loading.js"'),
    ('src="../js/lazy-loading.js"', 'src="/js/lazy-loading.js"'),
    ('src="../../js/lazy-loading.js"', 'src="/js/lazy-loading.js"'),
    ('src="../../../js/lazy-loading.js"', 'src="/js/lazy-loading.js"'),
    ('src="js/main-secure.js"', 'src="/js/main-secure.js"'),
    ('src="../js/main-secure.js"', 'src="/js/main-secure.js"'),
    ('src="../../js/main-secure.js"', 'src="/js/main-secure.js"'),
    ('src="../../../js/main-secure.js"', 'src="/js/main-secure.js"'),
    ('src="js/main-min.js"', 'src="/js/main-min.js"'),
    ('src="../js/main-min.js"', 'src="/js/main-min.js"'),
    ('src="../../js/main-min.js"', 'src="/js/main-min.js"'),
    ('src="../../../js/main-min.js"', 'src="/js/main-min.js"'),
    ('src="js/lazy-loading-min.js"', 'src="/js/lazy-loading-min.js"'),
    ('src="../js/lazy-loading-min.js"', 'src="/js/lazy-loading-min.js"'),
    ('src="../../js/lazy-loading-min.js"', 'src="/js/lazy-loading-min.js"'),
    ('src="../../../js/lazy-loading-min.js"', 'src="/js/lazy-loading-min.js"'),
    ('src="../img/', 'src="/img/'),
    ('src="../../img/', 'src="/img/'),
    ('src="../../../img/', 'src="/img/'),
    ('src="img/', 'src="/img/'),
    ('href="../index.html#', 'href="/index.html#'),
    ('href="../../index.html#', 'href="/index.html#'),
    ('href="../../../index.html#', 'href="/index.html#'),
    ('href="../blog/index.html"', 'href="/blog/index.html"'),
    ('href="../../blog/index.html"', 'href="/blog/index.html"'),
    ('href="../../../blog/index.html"', 'href="/blog/index.html"'),
    ('https://tintasqualyquimy.com.br/categorias/blog.html', 'https://tintasqualyquimy.com.br/blog/index.html'),
    ('https://tintasqualyquimy.com.br/avaliacoes.html', 'https://tintasqualyquimy.com.br/index.html#titulo-avaliacoes'),
]

changed = Counter()
html_files = list(pathlib.Path('.').rglob('*.html'))
for path in html_files:
    if '_dev' in path.parts:
        continue
    text = path.read_text(encoding='utf-8')
    original = text
    for old, new in reps:
        if old in text:
            count = text.count(old)
            if count:
                changed[old] += count
                text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding='utf-8')

print('Files scanned:', len(html_files))
for old, cnt in changed.items():
    print(f'{cnt} replacements for {old}')
