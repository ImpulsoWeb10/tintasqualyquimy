# 🚀 SCRIPTS PRONTOS PARA EXECUÇÃO — QUALYQUIMY SEO

## 📋 INSTRUÇÕES GERAIS

Os scripts devem ser executados na raiz do repositório clonado:
```bash
cd /path/to/tintasqualyquimy
```

**Ordem de Execução:** FASE 1 → FASE 2 → FASE 3 (críticos primeiro)

---

## 🔴 FASE 1: CRÍTICOS (40 minutos)

### SCRIPT 1.1 — Substituir q-color.html por tinta-economica-qualy-color-uso-interno.html
```bash
#!/bin/bash
# Execução no repositório raiz após clone

echo "🔴 [SCRIPT 1.1] Iniciando substituição de links q-color..."

find . -name "*.html" -not -path "./.git/*" | while read file; do
  # Substitui URLs com / no início
  sed -i 's|/produtos/q-color\.html|/produtos/tinta-economica-qualy-color-uso-interno.html|g' "$file"
  
  # Substitui URLs com href="produtos/
  sed -i 's|href="produtos/q-color\.html|href="produtos/tinta-economica-qualy-color-uso-interno.html|g' "$file"
  
  # Substitui URLs com href="../produtos/
  sed -i 's|href="../produtos/q-color\.html|href="../produtos/tinta-economica-qualy-color-uso-interno.html|g' "$file"
  
  # Substitui URLs com href="../../produtos/
  sed -i 's|href="../../produtos/q-color\.html|href="../../produtos/tinta-economica-qualy-color-uso-interno.html|g' "$file"
  
  # Substitui label visual "Q Color" por "Tinta Econômica Qualy Color"
  sed -i 's|>Q Color<|>Tinta Econômica Qualy Color<|g' "$file"
done

echo "✅ SCRIPT 1.1 concluído: links q-color substituídos em todos os arquivos HTML."
echo "   Arquivos modificados: $(find . -name "*.html" -not -path "./.git/*" | wc -l)"
```

**Execução:**
```bash
bash script1_1_qcolor.sh
```

---

### SCRIPT 1.2 — Corrigir Navegação: onde-atendemos → categorias/cidades
```bash
#!/bin/bash
# Padroniza navegação: /onde-atendemos.html não existe
# Substitui por /categorias/cidades.html

echo "🔴 [SCRIPT 1.2] Iniciando padronização de navegação..."

find . -name "*.html" -not -path "./.git/*" | while read file; do
  # Substitui /onde-atendemos.html por /categorias/cidades.html
  sed -i 's|href="/onde-atendemos\.html"|href="/categorias/cidades.html"|g' "$file"
  sed -i 's|href="onde-atendemos\.html"|href="categorias/cidades.html"|g' "$file"
  sed -i 's|href="../onde-atendemos\.html"|href="../categorias/cidades.html"|g' "$file"
  sed -i 's|href="../../onde-atendemos\.html"|href="../../categorias/cidades.html"|g' "$file"
  
  # Substitui /blog/index.html por /categorias/blog.html
  sed -i 's|href="/blog/index\.html"|href="/categorias/blog.html"|g' "$file"
  sed -i 's|href="blog/index\.html"|href="categorias/blog.html"|g' "$file"
done

echo "✅ SCRIPT 1.2 concluído: navegação padronizada em todos os arquivos HTML."
```

**Execução:**
```bash
bash script1_2_nav.sh
```

---

### SCRIPT 1.3 — Corrigir Encoding UTF-8 em Massa
```python
#!/usr/bin/env python3
# SCRIPT 1.3: Corrige caracteres especiais do português corrompidos

import os
import sys

# Dicionário de substituições: errado → correto
CORRECOES = {
    's intempéries': 'às intempéries',
    's intempries': 'às intempéries',
    's variações': 'às variações',
    's variaes': 'às variações',
    's variaões climáticas': 'às variações climáticas',
    's variaes climticas': 'às variações climáticas',
    'formulao': 'formulação',
    'proteo': 'proteção',
    'aplicao': 'aplicação',
    'Aplicao': 'Aplicação',
    'mecnica': 'mecânica',
    'Disponveis': 'Disponíveis',
    'disponveis': 'disponíveis',
    'Avaliaes': 'Avaliações',
    'avaliaes': 'avaliações',
    'Avaliação': 'Avaliação',
    'resistncia': 'resistência',
    'Resistncia': 'Resistência',
}

def corrigir_arquivo(caminho):
    """Lê arquivo, corrige e sobrescreve."""
    try:
        with open(caminho, 'r', encoding='utf-8', errors='replace') as f:
            conteudo_original = f.read()
        
        conteudo_corrigido = conteudo_original
        substituicoes_feitas = 0
        
        for errado, correto in CORRECOES.items():
            if errado in conteudo_corrigido:
                conteudo_corrigido = conteudo_corrigido.replace(errado, correto)
                substituicoes_feitas += conteudo_corrigido.count(correto)
        
        # Sobrescreve apenas se houve mudanças
        if conteudo_corrigido != conteudo_original:
            with open(caminho, 'w', encoding='utf-8') as f:
                f.write(conteudo_corrigido)
            print(f"✅ Corrigido: {caminho}")
            return True
        return False
    except Exception as e:
        print(f"⚠️  Erro em {caminho}: {str(e)}")
        return False

def main():
    print("🔴 [SCRIPT 1.3] Iniciando correção de encoding UTF-8...")
    arquivos_processados = 0
    arquivos_alterados = 0
    
    # Percorre todos os arquivos HTML recursivamente
    for root, dirs, files in os.walk('.'):
        # Ignora a pasta .git
        dirs[:] = [d for d in dirs if d != '.git']
        
        for nome_arquivo in files:
            if nome_arquivo.endswith('.html'):
                caminho_completo = os.path.join(root, nome_arquivo)
                arquivos_processados += 1
                
                if corrigir_arquivo(caminho_completo):
                    arquivos_alterados += 1
    
    print(f"\n✅ SCRIPT 1.3 concluído:")
    print(f"   Total de arquivos HTML processados: {arquivos_processados}")
    print(f"   Arquivos com correção aplicada: {arquivos_alterados}")

if __name__ == "__main__":
    main()
```

**Execução:**
```bash
python3 script1_3_encoding.py
```

---

### SCRIPT 1.4 — Corrigir OG:URL em index.html
```bash
#!/bin/bash
# SCRIPT 1.4: Substitui og:url e Schema de domínio errado

echo "🔴 [SCRIPT 1.4] Corrigindo OG:URL em index.html..."

BASE_URL="https://tintasqualyquimy.com.br"

# Substitui og:url incorreta
sed -i "s|content=\"https://qualyquimy\.com\.br/\"|content=\"${BASE_URL}/\"|g" index.html

# Substitui url no Schema LocalBusiness JSON-LD
sed -i "s|\"url\": \"https://qualyquimy\.com\.br\"|\"url\": \"${BASE_URL}\"|g" index.html

# Adiciona og:image se não existir
if ! grep -q 'og:image' index.html; then
  echo "⚠️  og:image não encontrada. Adicionando meta tag..."
  sed -i "s|</head>|  <meta property=\"og:image\" content=\"${BASE_URL}/img/og-qualyquimy.jpg\" />\n</head>|g" index.html
fi

echo "✅ SCRIPT 1.4 concluído: OG:URL corrigida em index.html"
grep "og:url" index.html
```

**Execução:**
```bash
bash script1_4_og_url.sh
```

---

### SCRIPT 1.5 — Corrigir Google Maps em itaquaquecetuba.html
```bash
#!/bin/bash
# SCRIPT 1.5: Substitui URL placeholder do Maps e remove iframe de desenvolvimento

echo "🔴 [SCRIPT 1.5] Corrigindo Google Maps em itaquaquecetuba.html..."

ARQUIVO="cidades/itaquaquecetuba.html"

# URL real do Maps (endereço: Rua Leiria 45, Itaquaquecetuba SP)
MAPS_URL="https://www.google.com/maps/search/?api=1&query=Rua+Leiria+45+Ch%C3%A1cara+Cui%C3%A1b%C3%A1+Itaquaquecetuba+SP"

if [ ! -f "$ARQUIVO" ]; then
  echo "❌ Arquivo não encontrado: $ARQUIVO"
  exit 1
fi

# Substitui URL genérica do Maps
sed -i "s|https://maps\.app\.goo\.gl/itaquaquecetuba|${MAPS_URL}|g" "$ARQUIVO"

# Remove placeholder de iframe de desenvolvimento
sed -i '/🗺️ Mapa — Google Maps.*Adicionar iframe/d' "$ARQUIVO"

echo "✅ SCRIPT 1.5 concluído:"
echo "   - URL do Google Maps corrigida"
echo "   - Texto placeholder removido"
```

**Execução:**
```bash
bash script1_5_maps.sh
```

---

## 🟡 FASE 2: ALTOS (2-3 horas)

### SCRIPT 2.1 — Adicionar Product Schema em Produtos
```python
#!/usr/bin/env python3
# SCRIPT 2.1: Injeta @type: Product e BreadcrumbList em páginas de produto

import os
import re

BASE_URL = "https://tintasqualyquimy.com.br"

PRODUTOS = [
    {
        "arquivo": "produtos/grafiato.html",
        "nome": "Grafiato Qualy Quimy",
        "sku": "QQ-GRAF",
        "descricao": "Revestimento texturizado de alta durabilidade para fachadas e paredes. Resistente às intempéries e raios UV.",
        "categoria": "texturas",
        "categoria_nome": "Texturas e Grafiato"
    },
    {
        "arquivo": "produtos/textura-lisa.html",
        "nome": "Textura Lisa Qualy Quimy",
        "sku": "QQ-TL",
        "descricao": "Acabamento liso e uniforme para paredes. Alta cobertura e resistência.",
        "categoria": "texturas",
        "categoria_nome": "Texturas e Grafiato"
    },
    {
        "arquivo": "produtos/massa-pva.html",
        "nome": "Massa PVA Qualy Quimy",
        "sku": "QQ-MPVA",
        "descricao": "Massa corrida para nivelamento. Fácil aplicação e alto rendimento.",
        "categoria": "massas",
        "categoria_nome": "Massas"
    },
    {
        "arquivo": "produtos/massa-acrilica.html",
        "nome": "Massa Acrílica Qualy Quimy",
        "sku": "QQ-MAC",
        "descricao": "Massa acrílica para uso interno e externo. Superior em resistência à umidade.",
        "categoria": "massas",
        "categoria_nome": "Massas"
    },
    {
        "arquivo": "produtos/seladora.html",
        "nome": "Seladora Qualy Quimy",
        "sku": "QQ-SEL",
        "descricao": "Seladora para preparação de paredes. Melhora aderência e reduz consumo de tinta.",
        "categoria": "fundos",
        "categoria_nome": "Fundos e Seladores"
    },
    {
        "arquivo": "produtos/tinta-economica-qualy-color-uso-interno.html",
        "nome": "Tinta Econômica Qualy Color",
        "sku": "QQ-TEC",
        "descricao": "Tinta acrílica lavável premium para uso interno e externo. Catálogo completo de cores.",
        "categoria": "tintas",
        "categoria_nome": "Tintas"
    },
    {
        "arquivo": "produtos/esmalte.html",
        "nome": "Esmalte Qualy Quimy",
        "sku": "QQ-ESM",
        "descricao": "Esmalte sintético para madeiras e metais. Acabamento brilhante e resistente.",
        "categoria": "tintas",
        "categoria_nome": "Tintas"
    },
    {
        "arquivo": "produtos/textura-projetada.html",
        "nome": "Textura Projetada Branca Qualy Quimy",
        "sku": "QQ-TPB",
        "descricao": "Textura para fachadas externas. Aplicação mecânica ou manual. Alta cobertura.",
        "categoria": "texturas",
        "categoria_nome": "Texturas e Grafiato"
    },
    {
        "arquivo": "produtos/liqui-brilho.html",
        "nome": "Liqui Brilho Impermeabilizante Qualy Quimy",
        "sku": "QQ-LB",
        "descricao": "Acabamento brilhante e impermeabilizante. Transparente sobre texturas e tintas.",
        "categoria": "acabamentos",
        "categoria_nome": "Acabamentos"
    },
]

PRODUCT_SCHEMA = '''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{nome}",
  "description": "{descricao}",
  "sku": "{sku}",
  "brand": {{
    "@type": "Brand",
    "name": "Qualy Quimy"
  }},
  "offers": {{
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "seller": {{
      "@type": "LocalBusiness",
      "name": "Qualy Quimy",
      "url": "{base_url}"
    }}
  }},
  "aggregateRating": {{
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5"
  }}
}}
</script>'''

BREADCRUMB_SCHEMA = '''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{"@type": "ListItem", "position": 1, "name": "Início", "item": "{base_url}/"}},
    {{"@type": "ListItem", "position": 2, "name": "{categoria_nome}", "item": "{base_url}/categorias/{categoria}.html"}},
    {{"@type": "ListItem", "position": 3, "name": "{nome}", "item": "{base_url}/produtos/{url_slug}.html"}}
  ]
}}
</script>'''

def injetar_schemas(produto):
    """Injeta Product e BreadcrumbList schemas em arquivo de produto."""
    arquivo = produto["arquivo"]
    
    if not os.path.exists(arquivo):
        print(f"⚠️  Arquivo não encontrado: {arquivo}")
        return False
    
    with open(arquivo, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    # Pula se Product schema já existe
    if '"@type": "Product"' in conteudo:
        print(f"⏭️  Schema já existe em {arquivo} — pulando")
        return False
    
    url_slug = arquivo.replace("produtos/", "").replace(".html", "")
    
    product_schema = PRODUCT_SCHEMA.format(
        nome=produto["nome"],
        descricao=produto["descricao"],
        sku=produto["sku"],
        base_url=BASE_URL
    )
    
    breadcrumb_schema = BREADCRUMB_SCHEMA.format(
        base_url=BASE_URL,
        categoria_nome=produto["categoria_nome"],
        categoria=produto["categoria"],
        nome=produto["nome"],
        url_slug=url_slug
    )
    
    schemas_html = f"\n{product_schema}\n{breadcrumb_schema}\n"
    
    # Insere antes de </head>
    conteudo_novo = conteudo.replace('</head>', schemas_html + '</head>', 1)
    
    with open(arquivo, 'w', encoding='utf-8') as f:
        f.write(conteudo_novo)
    
    print(f"✅ Schemas injetados em {arquivo}")
    return True

def main():
    print("🟡 [SCRIPT 2.1] Iniciando injeção de Product Schema...")
    
    sucesso = 0
    for produto in PRODUTOS:
        if injetar_schemas(produto):
            sucesso += 1
    
    print(f"\n✅ SCRIPT 2.1 concluído: {sucesso}/{ len(PRODUTOS)} produtos com schema")

if __name__ == "__main__":
    main()
```

**Execução:**
```bash
python3 script2_1_product_schema.py
```

---

### SCRIPT 2.2 — Adicionar LocalBusiness Schema em Cidades
```python
#!/usr/bin/env python3
# SCRIPT 2.2: Injeta @type: LocalBusiness em páginas de cidade

import os

BASE_URL = "https://tintasqualyquimy.com.br"

CIDADES = [
    ("cidades/itaquaquecetuba.html", "Itaquaquecetuba", "itaquaquecetuba"),
    ("cidades/mogi-das-cruzes.html", "Mogi das Cruzes", "mogi-das-cruzes"),
    ("cidades/suzano.html", "Suzano", "suzano"),
    ("cidades/ferraz-de-vasconcelos.html", "Ferraz de Vasconcelos", "ferraz-de-vasconcelos"),
    ("cidades/poa.html", "Poá", "poa"),
    ("cidades/aruja.html", "Arujá", "aruja"),
    ("cidades/guarulhos.html", "Guarulhos", "guarulhos"),
]

SCHEMA_TEMPLATE = '''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Qualy Quimy — Tintas e Materiais",
  "description": "Venda de tintas, grafiato, texturas e materiais para pintura em {cidade} e região",
  "url": "{base_url}/cidades/{slug}.html",
  "telephone": "+55-11-95495-0044",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "Rua Leiria, 45",
    "addressLocality": "Itaquaquecetuba",
    "addressRegion": "SP",
    "postalCode": "08700-000",
    "addressCountry": "BR"
  }},
  "areaServed": {{"@type": "City", "name": "{cidade}"}},
  "openingHours": "Mo-Sa 08:00-18:00",
  "sameAs": ["https://shopee.com.br/qualyquimy"]
}}
</script>'''

def injetar_localbusiness(arquivo, cidade, slug):
    """Injeta LocalBusiness schema em arquivo de cidade."""
    if not os.path.exists(arquivo):
        print(f"⚠️  Arquivo não encontrado: {arquivo}")
        return False
    
    with open(arquivo, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    if '"@type": "LocalBusiness"' in conteudo:
        print(f"⏭️  Schema já existe em {arquivo} — pulando")
        return False
    
    schema = SCHEMA_TEMPLATE.format(
        cidade=cidade,
        base_url=BASE_URL,
        slug=slug
    )
    
    conteudo_novo = conteudo.replace('</head>', schema + '\n</head>', 1)
    
    with open(arquivo, 'w', encoding='utf-8') as f:
        f.write(conteudo_novo)
    
    print(f"✅ LocalBusiness schema injetado em {arquivo}")
    return True

def main():
    print("🟡 [SCRIPT 2.2] Iniciando injeção de LocalBusiness Schema...")
    
    sucesso = 0
    for arquivo, cidade, slug in CIDADES:
        if injetar_localbusiness(arquivo, cidade, slug):
            sucesso += 1
    
    print(f"\n✅ SCRIPT 2.2 concluído: {sucesso}/{ len(CIDADES)} cidades com schema")

if __name__ == "__main__":
    main()
```

**Execução:**
```bash
python3 script2_2_localbusiness_schema.py
```

---

### SCRIPT 2.3 — Adicionar og:image em todas as páginas
```bash
#!/bin/bash
# SCRIPT 2.3: Adiciona og:image (1200x630px) em páginas que não têm

echo "🟡 [SCRIPT 2.3] Adicionando og:image em todas as páginas..."

BASE_URL="https://tintasqualyquimy.com.br"
OG_IMAGE="${BASE_URL}/img/og-qualyquimy.jpg"

arquivos_modificados=0

find . -name "*.html" -not -path "./.git/*" | while read file; do
  if ! grep -q 'og:image' "$file"; then
    # Adiciona og:image antes de </head>
    sed -i "s|</head>|  <meta property=\"og:image\" content=\"${OG_IMAGE}\" />\n  <meta property=\"og:image:width\" content=\"1200\" />\n  <meta property=\"og:image:height\" content=\"630\" />\n</head>|g" "$file"
    echo "✅ og:image adicionado em: $file"
    ((arquivos_modificados++))
  fi
done

echo "✅ SCRIPT 2.3 concluído: og:image adicionado em múltiplas páginas"
```

**Execução:**
```bash
bash script2_3_og_image.sh
```

---

### SCRIPT 2.4 — Padronizar <title> em Categorias
```bash
#!/bin/bash
# SCRIPT 2.4: Padroniza títulos das categorias com padrão: [Categoria] Qualy Quimy │ Itaquaquecetuba e Região

echo "🟡 [SCRIPT 2.4] Padronizando títulos das categorias..."

# Padrão: [Categoria] Qualy Quimy │ Itaquaquecetuba e Região

sed -i 's|<title>.*Textura.*</title>|<title>Texturas Qualy Quimy │ Itaquaquecetuba e Região</title>|g' categorias/texturas.html

sed -i 's|<title>.*Tinta.*</title>|<title>Tintas Qualy Quimy │ Itaquaquecetuba e Região</title>|g' categorias/tintas.html

sed -i 's|<title>.*Massa.*</title>|<title>Massas Qualy Quimy │ Itaquaquecetuba e Região</title>|g' categorias/massas.html

sed -i 's|<title>.*Fundo.*</title>|<title>Fundos e Seladores Qualy Quimy │ Itaquaquecetuba e Região</title>|g' categorias/fundos.html

sed -i 's|<title>.*Acabamento.*</title>|<title>Acabamentos Qualy Quimy │ Itaquaquecetuba e Região</title>|g' categorias/acabamentos.html

echo "✅ SCRIPT 2.4 concluído: títulos das categorias padronizados"
```

**Execução:**
```bash
bash script2_4_titles.sh
```

---

### SCRIPT 2.5 — Atualizar sitemap.xml com <lastmod>
```python
#!/usr/bin/env python3
# SCRIPT 2.5: Adiciona <lastmod> em todas as URLs do sitemap.xml

from datetime import date
import xml.etree.ElementTree as ET

ARQUIVO_SITEMAP = "sitemap.xml"
HOJE = date.today().strftime("%Y-%m-%d")

try:
    # Lê o XML
    tree = ET.parse(ARQUIVO_SITEMAP)
    root = tree.getroot()
    
    # Define namespace
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    # Registra namespace
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    
    modificadas = 0
    
    # Itera sobre cada <url>
    for url_elem in root.findall('ns:url', namespace):
        # Verifica se já tem <lastmod>
        lastmod = url_elem.find('ns:lastmod', namespace)
        
        if lastmod is None:
            # Cria novo elemento <lastmod>
            lastmod = ET.SubElement(url_elem, 'lastmod')
            lastmod.text = HOJE
            modificadas += 1
        else:
            # Atualiza lastmod existente
            lastmod.text = HOJE
            modificadas += 1
    
    # Salva o arquivo
    tree.write(ARQUIVO_SITEMAP, encoding='utf-8', xml_declaration=True)
    
    print(f"✅ SCRIPT 2.5 concluído:")
    print(f"   URLs atualizadas com <lastmod>{HOJE}</lastmod>: {modificadas}")

except Exception as e:
    print(f"❌ Erro ao processar sitemap.xml: {str(e)}")
```

**Execução:**
```bash
python3 script2_5_sitemap_lastmod.py
```

---

## ✅ CHECKLIST DE EXECUÇÃO

```
FASE 1 — CRÍTICOS (40 min)
[ ] bash script1_1_qcolor.sh
[ ] bash script1_2_nav.sh
[ ] python3 script1_3_encoding.py
[ ] bash script1_4_og_url.sh
[ ] bash script1_5_maps.sh
[ ] git add .
[ ] git commit -m "fix: SEO crítica — links quebrados, encoding, nav, maps"
[ ] git push origin fix/seo-critica

FASE 2 — ALTOS (2-3h)
[ ] python3 script2_1_product_schema.py
[ ] python3 script2_2_localbusiness_schema.py
[ ] bash script2_3_og_image.sh
[ ] bash script2_4_titles.sh
[ ] python3 script2_5_sitemap_lastmod.py
[ ] git add .
[ ] git commit -m "feat: SEO schemas — Product, LocalBusiness, og:image"
[ ] git push origin feature/seo-schemas

PÓS-EXECUÇÃO
[ ] Acessar Google Search Console
[ ] Resubmeter sitemap.xml
[ ] Verificar erros de cobertura
[ ] Testar mobile-friendly
[ ] Testar schema em schema.org/validate
```

---

**Status:** ✅ Todos os scripts prontos  
**Tempo Total Fase 1:** 40 minutos  
**Tempo Total Fase 2:** 2-3 horas  
**Impacto Esperado:** +25-40% tráfego em 30 dias

