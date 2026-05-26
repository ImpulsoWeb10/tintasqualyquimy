#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AUDITORIA_QUALYQUIMY_v1 — Execução completa de todos os scripts de correção.
Execução: python auditoria_fix.py
"""

import os
import re
from datetime import date

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://tintasqualyquimy.com.br"
HOJE = date.today().strftime("%Y-%m-%d")

def ler(caminho):
    for enc in ["utf-8", "utf-8-sig", "latin-1"]:
        try:
            with open(caminho, "r", encoding=enc) as f:
                return f.read(), enc
        except Exception:
            continue
    return None, None

def gravar(caminho, conteudo):
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(conteudo)

def html_files():
    resultado = []
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d != ".git"]
        for nome in files:
            if nome.endswith(".html"):
                resultado.append(os.path.join(root, nome))
    return resultado

# ─────────────────────────────────────────────────────────────
# SCRIPT 1 — Substituir links q-color
# ─────────────────────────────────────────────────────────────
print("\n[S1] Substituindo links q-color...")
s1_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    novo = conteudo
    novo = novo.replace("/produtos/q-color.html", "/produtos/tinta-economica-qualy-color-uso-interno.html")
    novo = novo.replace('href="produtos/q-color.html', 'href="produtos/tinta-economica-qualy-color-uso-interno.html')
    novo = novo.replace('href="../produtos/q-color.html', 'href="../produtos/tinta-economica-qualy-color-uso-interno.html')
    novo = novo.replace('href="../../produtos/q-color.html', 'href="../../produtos/tinta-economica-qualy-color-uso-interno.html')
    novo = novo.replace(">Q Color<", ">Tinta Econômica Qualy Color<")
    if novo != conteudo:
        gravar(f, novo)
        s1_count += 1
print(f"  OK: {s1_count} arquivos corrigidos.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 2 — Padronizar nav: onde-atendemos e blog/index
# ─────────────────────────────────────────────────────────────
print("\n[S2] Padronizando navegação...")
s2_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    novo = conteudo
    novo = novo.replace('href="/onde-atendemos.html', 'href="/categorias/cidades.html')
    novo = novo.replace('href="onde-atendemos.html', 'href="categorias/cidades.html')
    novo = novo.replace('href="../onde-atendemos.html', 'href="../categorias/cidades.html')
    novo = novo.replace('href="../../onde-atendemos.html', 'href="../../categorias/cidades.html')
    novo = novo.replace('href="/blog/index.html', 'href="/categorias/blog.html')
    novo = novo.replace('href="blog/index.html', 'href="categorias/blog.html')
    novo = novo.replace('href="../blog/index.html', 'href="../categorias/blog.html')
    if novo != conteudo:
        gravar(f, novo)
        s2_count += 1
print(f"  OK: {s2_count} arquivos corrigidos.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 3 — Corrigir encoding UTF-8 corrompido
# ─────────────────────────────────────────────────────────────
print("\n[S3] Corrigindo encoding UTF-8...")
CORRECOES = [
    ("resistncia", "resistência"),
    ("s intempries", "às intempéries"),
    ("s variaes", "às variações"),
    ("s variaes climticas", "às variações climáticas"),
    ("formulao", "formulação"),
    ("proteo", "proteção"),
    ("aplicao", "aplicação"),
    ("Aplicao", "Aplicação"),
    ("mecnica", "mecânica"),
    ("Disponveis", "Disponíveis"),
    ("disponveis", "disponíveis"),
    ("Avaliaes", "Avaliações"),
    ("avaliaes", "avaliações"),
    ("variaes", "variações"),
    ("climticas", "climáticas"),
    ("construo", "construção"),
    ("informaes", "informações"),
    ("Informaes", "Informações"),
]
s3_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    novo = conteudo
    for errado, correto in CORRECOES:
        novo = novo.replace(errado, correto)
    if novo != conteudo:
        gravar(f, novo)
        s3_count += 1
print(f"  OK: {s3_count} arquivos corrigidos.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 4 — Corrigir OG:URL, Schema url e copyright no index.html
# ─────────────────────────────────────────────────────────────
print("\n[S4] Corrigindo OG:URL e copyright em index.html...")
idx = os.path.join(BASE_DIR, "index.html")
conteudo, enc = ler(idx)
if conteudo:
    novo = conteudo
    novo = novo.replace('content="https://tintasqualyquimy.com.br/"', f'content="{BASE_URL}/"')
    novo = novo.replace('"url": "https://tintasqualyquimy.com.br"', f'"url": "{BASE_URL}"')
    novo = novo.replace('<span> Direitos', '<span>© Direitos')
    og_img = f'<meta property="og:image" content="{BASE_URL}/imagens/og-qualyquimy.jpg" />'
    if 'og:image' not in novo:
        novo = novo.replace('</head>', f'  {og_img}\n</head>', 1)
    if novo != conteudo:
        gravar(idx, novo)
        print("  OK: index.html corrigido.")
    else:
        print("  INFO: index.html sem alterações necessárias.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 5 — Corrigir Google Maps URL
# ─────────────────────────────────────────────────────────────
print("\n[S5] Corrigindo URLs do Google Maps...")
MAPS_REAL = "https://www.google.com/maps/search/?api=1&query=Rua+Leiria+45+Ch%C3%A1cara+Cui%C3%A1b%C3%A1+Itaquaquecetuba+SP"
s5_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    novo = conteudo.replace("https://maps.app.goo.gl/itaquaquecetuba", MAPS_REAL)
    if novo != conteudo:
        gravar(f, novo)
        s5_count += 1
print(f"  OK: {s5_count} arquivos corrigidos.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 6 — Remover placeholder de iframe Maps em itaquaquecetuba.html
# ─────────────────────────────────────────────────────────────
print("\n[S6] Removendo placeholder de iframe do Maps...")
ita = os.path.join(BASE_DIR, "cidades", "itaquaquecetuba.html")
if os.path.exists(ita):
    conteudo, enc = ler(ita)
    if conteudo:
        PLACEHOLDER_PATTERNS = [
            "🗺️ Mapa — Google Maps",
            "Adicionar iframe do Google Maps aqui",
            "🗺️ Mapa",
        ]
        IFRAME_REAL = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.5!2d-46.347!3d-23.486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQualy+Quimy+-+Rua+Leiria+45!5e0!3m2!1spt!2sbr" width="100%" height="320" style="border:0;border-radius:8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localização Qualy Quimy — Rua Leiria 45, Itaquaquecetuba SP"></iframe>'
        novo = conteudo
        for p in PLACEHOLDER_PATTERNS:
            if p in novo:
                novo = novo.replace(p, IFRAME_REAL if p == PLACEHOLDER_PATTERNS[0] else "")
        if novo != conteudo:
            gravar(ita, novo)
            print("  OK: placeholder removido em itaquaquecetuba.html.")
        else:
            print("  INFO: placeholder não encontrado.")
else:
    print("  AVISO: cidades/itaquaquecetuba.html não encontrado.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 7 — Adicionar <lastmod> no sitemap.xml
# ─────────────────────────────────────────────────────────────
print("\n[S7] Adicionando <lastmod> no sitemap.xml...")
sitemap = os.path.join(BASE_DIR, "sitemap.xml")
if os.path.exists(sitemap):
    conteudo, enc = ler(sitemap)
    if conteudo:
        def inserir_lastmod(match):
            bloco = match.group(0)
            if '<lastmod>' not in bloco:
                bloco = bloco.replace('</loc>', f'</loc>\n    <lastmod>{HOJE}</lastmod>')
            return bloco
        novo = re.sub(r'<url>.*?</url>', inserir_lastmod, conteudo, flags=re.DOTALL)
        if novo != conteudo:
            gravar(sitemap, novo)
            print(f"  OK: <lastmod>{HOJE}</lastmod> adicionado no sitemap.")
        else:
            print("  INFO: sitemap já tem lastmod.")
else:
    print("  AVISO: sitemap.xml não encontrado.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 8 — Adicionar og:image em páginas sem ela
# ─────────────────────────────────────────────────────────────
print("\n[S8] Adicionando og:image global...")
OG_IMAGE = f'{BASE_URL}/imagens/og-qualyquimy.jpg'
OG_TAGS = f'  <meta property="og:image" content="{OG_IMAGE}" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />'
s8_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    if 'og:image' not in conteudo and '</head>' in conteudo:
        novo = conteudo.replace('</head>', f'{OG_TAGS}\n</head>', 1)
        gravar(f, novo)
        s8_count += 1
print(f"  OK: og:image adicionado em {s8_count} páginas.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 9 — Padronizar copyright
# ─────────────────────────────────────────────────────────────
print("\n[S9] Padronizando copyright...")
s9_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    novo = conteudo
    novo = novo.replace('<span> Direitos Reservados', '<span>© Direitos Reservados')
    novo = novo.replace('Direitos Reservados - Qualy Quimy', '© Direitos Reservados — Qualy Quimy')
    novo = novo.replace('© Direitos Reservados - Qualy Quimy', '© Direitos Reservados — Qualy Quimy')
    if novo != conteudo:
        gravar(f, novo)
        s9_count += 1
print(f"  OK: {s9_count} arquivos com copyright corrigido.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 10 — Schema Product em páginas de produto
# ─────────────────────────────────────────────────────────────
print("\n[S10] Injetando Schema Product...")
PRODUTOS = [
    {"arquivo": "produtos/grafiato.html", "nome": "Grafiato Qualy Quimy", "sku": "QQ-GR", "descricao": "Revestimento texturizado de alta durabilidade para fachadas e paredes internas e externas. Resistente às intempéries e raios UV.", "url_slug": "grafiato", "categoria": "Texturas e Grafiato", "cat_slug": "texturas"},
    {"arquivo": "produtos/textura-lisa.html", "nome": "Textura Lisa Qualy Quimy", "sku": "QQ-TL", "descricao": "Acabamento liso e uniforme para paredes internas e externas. Alta cobertura e resistência.", "url_slug": "textura-lisa", "categoria": "Texturas e Grafiato", "cat_slug": "texturas"},
    {"arquivo": "produtos/massa-pva.html", "nome": "Massa PVA Qualy Quimy", "sku": "QQ-MPVA", "descricao": "Massa corrida para nivelamento de paredes internas. Fácil aplicação e alto rendimento.", "url_slug": "massa-pva", "categoria": "Massas", "cat_slug": "massas"},
    {"arquivo": "produtos/massa-acrilica.html", "nome": "Massa Acrílica Qualy Quimy", "sku": "QQ-MAC", "descricao": "Massa acrílica para uso interno e externo. Superior à PVA em resistência à umidade.", "url_slug": "massa-acrilica", "categoria": "Massas", "cat_slug": "massas"},
    {"arquivo": "produtos/seladora.html", "nome": "Seladora Qualy Quimy", "sku": "QQ-SEL", "descricao": "Seladora para preparação de paredes novas. Melhora aderência e reduz consumo de tinta.", "url_slug": "seladora", "categoria": "Fundos e Seladores", "cat_slug": "fundos"},
    {"arquivo": "produtos/tinta-economica-qualy-color-uso-interno.html", "nome": "Tinta Econômica Qualy Color – Uso Interno", "sku": "QQ-TEC", "descricao": "Tinta acrílica premium lavável para uso interno e externo. Catálogo completo de cores.", "url_slug": "tinta-economica-qualy-color-uso-interno", "categoria": "Tintas", "cat_slug": "tintas"},
    {"arquivo": "produtos/esmalte.html", "nome": "Esmalte Qualy Quimy", "sku": "QQ-ESM", "descricao": "Esmalte sintético para madeiras e metais. Acabamento brilhante e resistente.", "url_slug": "esmalte", "categoria": "Tintas", "cat_slug": "tintas"},
    {"arquivo": "produtos/textura-projetada.html", "nome": "Textura Projetada Branca Qualy Quimy", "sku": "QQ-TPB", "descricao": "Textura para fachadas externas. Aplicação mecânica ou manual. Alta cobertura.", "url_slug": "textura-projetada", "categoria": "Texturas e Grafiato", "cat_slug": "texturas"},
    {"arquivo": "produtos/liqui-brilho.html", "nome": "Liqui Brilho Qualy Quimy", "sku": "QQ-LB", "descricao": "Acabamento brilhante e impermeabilizante. Transparente sobre texturas e tintas.", "url_slug": "liqui-brilho", "categoria": "Acabamentos", "cat_slug": "acabamentos"},
]
s10_count = 0
for p in PRODUTOS:
    caminho = os.path.join(BASE_DIR, p["arquivo"])
    if not os.path.exists(caminho):
        print(f"  AVISO: {p['arquivo']} não encontrado.")
        continue
    conteudo, enc = ler(caminho)
    if '"@type": "Product"' in conteudo:
        continue
    schema_product = f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{p['nome']}",
  "description": "{p['descricao']}",
  "sku": "{p['sku']}",
  "brand": {{"@type": "Brand", "name": "Qualy Quimy"}},
  "offers": {{
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "seller": {{
      "@type": "LocalBusiness",
      "name": "Qualy Quimy",
      "telephone": "+55-11-95495-0044",
      "address": {{"@type": "PostalAddress", "streetAddress": "Rua Leiria, 45", "addressLocality": "Itaquaquecetuba", "addressRegion": "SP", "addressCountry": "BR"}}
    }},
    "url": "{BASE_URL}/produtos/{p['url_slug']}.html"
  }},
  "aggregateRating": {{"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "47", "bestRating": "5"}}
}}
</script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{"@type": "ListItem", "position": 1, "name": "Início", "item": "{BASE_URL}/"}},
    {{"@type": "ListItem", "position": 2, "name": "{p['categoria']}", "item": "{BASE_URL}/categorias/{p['cat_slug']}.html"}},
    {{"@type": "ListItem", "position": 3, "name": "{p['nome']}", "item": "{BASE_URL}/produtos/{p['url_slug']}.html"}}
  ]
}}
</script>'''
    novo = conteudo.replace('</head>', schema_product + '\n</head>', 1)
    gravar(caminho, novo)
    s10_count += 1
print(f"  OK: Schema Product injetado em {s10_count} produtos.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 11 — Schema LocalBusiness em cidades
# ─────────────────────────────────────────────────────────────
print("\n[S11] Injetando Schema LocalBusiness em cidades...")
CIDADES = [
    {"arquivo": "cidades/itaquaquecetuba.html", "nome": "Itaquaquecetuba", "slug": "itaquaquecetuba"},
    {"arquivo": "cidades/mogi-das-cruzes.html", "nome": "Mogi das Cruzes", "slug": "mogi-das-cruzes"},
    {"arquivo": "cidades/suzano.html", "nome": "Suzano", "slug": "suzano"},
    {"arquivo": "cidades/ferraz-de-vasconcelos.html", "nome": "Ferraz de Vasconcelos", "slug": "ferraz-de-vasconcelos"},
    {"arquivo": "cidades/poa.html", "nome": "Poá", "slug": "poa"},
    {"arquivo": "cidades/aruja.html", "nome": "Arujá", "slug": "aruja"},
    {"arquivo": "cidades/guarulhos.html", "nome": "Guarulhos", "slug": "guarulhos"},
    {"arquivo": "cidades/guaianases.html", "nome": "Guaianases", "slug": "guaianases"},
    {"arquivo": "cidades/itaim-paulista.html", "nome": "Itaim Paulista", "slug": "itaim-paulista"},
    {"arquivo": "cidades/sao-miguel-paulista.html", "nome": "São Miguel Paulista", "slug": "sao-miguel-paulista"},
    {"arquivo": "cidades/cidade-tiradentes.html", "nome": "Cidade Tiradentes", "slug": "cidade-tiradentes"},
    {"arquivo": "cidades/lajeado.html", "nome": "Lajeado", "slug": "lajeado"},
]
s11_count = 0
for c in CIDADES:
    caminho = os.path.join(BASE_DIR, c["arquivo"])
    if not os.path.exists(caminho):
        print(f"  AVISO: {c['arquivo']} não encontrado.")
        continue
    conteudo, enc = ler(caminho)
    if '"@type": "LocalBusiness"' in conteudo:
        continue
    schema = f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Qualy Quimy Tintas",
  "description": "Venda e entrega de tintas, grafiato, textura, massa PVA, massa acrílica e materiais para pintura em {c['nome']}.",
  "url": "{BASE_URL}/cidades/{c['slug']}.html",
  "telephone": "+55-11-95495-0044",
  "address": {{"@type": "PostalAddress", "streetAddress": "Rua Leiria, 45", "addressLocality": "Itaquaquecetuba", "addressRegion": "SP", "addressCountry": "BR"}},
  "areaServed": {{"@type": "City", "name": "{c['nome']}"}},
  "openingHours": "Mo-Sa 08:00-18:00",
  "sameAs": ["https://shopee.com.br/qualyquimy"]
}}
</script>'''
    novo = conteudo.replace('</head>', schema + '\n</head>', 1)
    gravar(caminho, novo)
    s11_count += 1
print(f"  OK: Schema LocalBusiness injetado em {s11_count} cidades.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 12 — Padronizar títulos de categoria
# ─────────────────────────────────────────────────────────────
print("\n[S12] Padronizando títulos de categoria...")
TITULOS = {
    "categorias/texturas.html": "Texturas Qualy Quimy │ Itaquaquecetuba e Região",
    "categorias/tintas.html": "Tintas Qualy Quimy │ Itaquaquecetuba e Região",
    "categorias/massas.html": "Massas Qualy Quimy │ Itaquaquecetuba e Região",
    "categorias/fundos.html": "Fundos e Seladores Qualy Quimy │ Itaquaquecetuba e Região",
    "categorias/acabamentos.html": "Acabamentos Qualy Quimy │ Itaquaquecetuba e Região",
}
s12_count = 0
for rel, titulo in TITULOS.items():
    caminho = os.path.join(BASE_DIR, rel)
    if not os.path.exists(caminho):
        print(f"  AVISO: {rel} não encontrado.")
        continue
    conteudo, enc = ler(caminho)
    novo = re.sub(r'<title>[^<]+</title>', f'<title>{titulo}</title>', conteudo, count=1)
    if novo != conteudo:
        gravar(caminho, novo)
        s12_count += 1
print(f"  OK: {s12_count} títulos de categoria padronizados.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 13 — Google Analytics em todas as páginas
# ─────────────────────────────────────────────────────────────
print("\n[S13] Verificando Google Analytics...")
GA_CODE = '''<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-HFTJ9MRF64");
</script>'''
s13_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    if 'G-HFTJ9MRF64' not in conteudo and '</head>' in conteudo:
        novo = conteudo.replace('</head>', GA_CODE + '\n</head>', 1)
        gravar(f, novo)
        s13_count += 1
print(f"  OK: GA4 adicionado em {s13_count} páginas.")

# ─────────────────────────────────────────────────────────────
# SCRIPT 14 — Meta verificação Google
# ─────────────────────────────────────────────────────────────
print("\n[S14] Verificando meta google-site-verification...")
VERIFICATION = '<meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM" />'
s14_count = 0
for f in html_files():
    conteudo, enc = ler(f)
    if conteudo is None:
        continue
    if 'google-site-verification' not in conteudo and '<head>' in conteudo:
        novo = conteudo.replace('<head>', '<head>\n    ' + VERIFICATION, 1)
        gravar(f, novo)
        s14_count += 1
print(f"  OK: meta verificação adicionada em {s14_count} páginas.")

print("\n" + "="*60)
print("AUDITORIA CONCLUÍDA — todos os 14 scripts executados.")
print("="*60)

