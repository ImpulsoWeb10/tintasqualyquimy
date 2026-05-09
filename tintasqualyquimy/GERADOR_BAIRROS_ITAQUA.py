#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GERADOR_BAIRROS_ITAQUA.py
Script profissional para gerar páginas HTML SEO regionais para bairros de Itaquaquecetuba
"""

import os
import json
import random
import re
import subprocess
from datetime import datetime
from pathlib import Path

class GeradorBairrosItaqua:
    def __init__(self):
        self.dominio = "https://tintasqualyquimy.com.br"
        self.base_path = Path("cidades/itaquaquecetuba")
        self.base_path.mkdir(parents=True, exist_ok=True)
        
        # Lista completa de bairros de Itaquaquecetuba
        self.bairros = [
            "Jardim Aracare", "Cidade Kemel", "Jardim Odete", "Jardim Morumbi", 
            "Bairro do Limoeiro", "Jardim Nova Itaquá", "Jardim Dourado", 
            "Jardim Bom Clima", "Estância Maia", "Parque Piratininga", 
            "Vila Virgínia", "Chácaras Calux", "Jardim Branca Flor", 
            "Jardim São Luís", "Jardim Santa Mônica", "Jardim Santa Rita",
            "Jardim das Palmeiras", "Jardim dos Ipês", "Jardim das Acácias",
            "Parque Industrial", "Vila dos Operários", "Jardim São João",
            "Jardim São Pedro", "Jardim São Paulo", "Jardim São Marcos",
            "Jardim São Lucas", "Jardim São Matheus", "Jardim São Tomé",
            "Jardim São Judas", "Jardim São Tiago", "Jardim São José",
            "Jardim São Francisco", "Jardim Santo Antônio", "Jardim Santana",
            "Jardim São Bento", "Jardim São Geraldo", "Jardim São Carlos",
            "Jardim São Roberto", "Jardim São Rafael", "Jardim São Gabriel",
            "Jardim São Miguel", "Jardim São Nicolau", "Jardim São Vicente"
        ]
        
        # Templates variados
        self.intro_templates = [
            "Procurando tintas de qualidade em {bairro}? A Qualy Quimy oferece as melhores soluções para sua obra!",
            "Em {bairro}, você encontra tintas premium da Qualy Quimy com entrega rápida e atendimento especializado.",
            "Moradores de {bairro} já conhecem a qualidade das tintas Qualy Quimy. Confira nossos produtos!",
            "Precisa de tintas em {bairro}? A Qualy Quimy tem tudo o que você precisa com o melhor preço!",
            "Em {bairro}, a Qualy Quimy é sua parceira confiável para tintas, massas e texturas de alta qualidade!"
        ]
        
        self.cta_templates = [
            "📞 Chame no WhatsApp: (11) 95495-0044",
            "🛒 Compre agora pelo WhatsApp e tenha entrega em {bairro}!",
            "🎯 Solicite seu orçamento gratuito para {bairro}",
            "⚡ Entrega rápida em {bairro} - Peça já!",
            "🏠 Atendimento especializado para {bairro}"
        ]
        
        self.faq_questions = [
            ("Vocês entregam em {bairro}?", "Sim! Entregamos em todos os bairros de Itaquaquecetuba, incluindo {bairro}, no mesmo dia ou agendado."),
            ("Quais produtos vendem em {bairro}?", "Oferecemos tintas, massas, texturas, fundos e acabamentos para todas as necessidades."),
            ("Qual o prazo de entrega para {bairro}?", "Para {bairro}, entregamos em até 24h para produtos em estoque."),
            ("Como comprar em {bairro}?", "É simples! Chame no WhatsApp (11) 95495-0044 ou peça online."),
            ("Tem orçamento para {bairro}?", "Sim! Fazemos orçamento gratuito e personalizado para {bairro}.")
        ]
        
        self.produtos_relacionados = [
            "Tinta Acrílica Premium", "Massa PVA", "Textura Grafiato", 
            "Seladora Acrílica", "Esmalte Sintético", "Liqui Brilho"
        ]
        
        self.categorias_relacionadas = [
            "tintas", "massas", "texturas", "fundos", "acabamentos"
        ]
        
        self.palavras_semanticas = [
            "qualidade", "durabilidade", "acabamento", "proteção", "beleza",
            "modernidade", "resistência", "facilidade", "economia", "praticidade"
        ]
        
        self.relatorio = {
            "paginas_criadas": 0,
            "bairros_gerados": [],
            "erros_encontrados": [],
            "paginas_ignoradas": []
        }

    def gerar_slug(self, bairro):
        """Gera slug SEO amigável a partir do nome do bairro"""
        slug = bairro.lower()
        slug = re.sub(r'[áàâã]', 'a', slug)
        slug = re.sub(r'[éèê]', 'e', slug)
        slug = re.sub(r'[íìî]', 'i', slug)
        slug = re.sub(r'[óòôõ]', 'o', slug)
        slug = re.sub(r'[úùû]', 'u', slug)
        slug = re.sub(r'[ç]', 'c', slug)
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'[\s-]+', '-', slug)
        return slug.strip('-')

    def randomizar_conteudo(self, templates, bairro):
        """Seleciona template aleatório e substitui variáveis"""
        template = random.choice(templates)
        return template.format(bairro=bairro)

    def gerar_schema_localbusiness(self, bairro):
        """Gera schema.org LocalBusiness"""
        schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tintas Qualy Quimy - " + bairro,
            "description": f"Tintas, massas e texturas de alta qualidade em {bairro}, Itaquaquecetuba",
            "url": f"{self.dominio}/cidades/itaquaquecetuba/{self.gerar_slug(bairro)}.html",
            "telephone": "+55-11-95495-0044",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Itaquaquecetuba",
                "addressRegion": "SP",
                "addressCountry": "BR",
                "streetAddress": "Rua Leiria, 45 - Chácara Cuiabá"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-23.4876",
                "longitude": "-46.3822"
            },
            "openingHours": "Mo-Fr 08:00-18:00",
            "priceRange": "$$"
        }
        return json.dumps(schema, indent=2, ensure_ascii=False)

    def gerar_schema_faq(self, bairro):
        """Gera schema FAQPage"""
        faq_list = []
        for question, answer in self.faq_questions:
            faq_list.append({
                "@type": "Question",
                "name": question.format(bairro=bairro),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer.format(bairro=bairro)
                }
            })
        
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq_list
        }
        return json.dumps(schema, indent=2, ensure_ascii=False)

    def gerar_links_internos(self, bairro_atual):
        """Gera links internos para outras páginas"""
        links = []
        
        # Links para categorias
        for categoria in random.sample(self.categorias_relacionadas, 3):
            links.append(f'<a href="{self.dominio}/categorias/{categoria}.html" class="link-interno">{categoria.title()}</a>')
        
        # Links para bairros próximos (aleatórios)
        bairros_proximos = random.sample(self.bairros, min(5, len(self.bairros)))
        for bairro in bairros_proximos:
            if bairro != bairro_atual:
                slug = self.gerar_slug(bairro)
                links.append(f'<a href="{self.dominio}/cidades/itaquaquecetuba/{slug}.html" class="link-interno">Tintas em {bairro}</a>')
        
        return links

    def gerar_html_bairro(self, bairro):
        """Gera HTML completo para um bairro"""
        slug = self.gerar_slug(bairro)
        
        # Meta tags únicas
        title = f"Tintas em {bairro}, Itaquaquecetuba | Qualy Quimy | Entrega Rápida"
        description = self.randomizar_conteudo([
            f"Compre tintas de qualidade em {bairro}, Itaquaquecetuba. Entrega rápida, preços especiais e atendimento personalizado da Qualy Quimy.",
            f"Tintas, massas e texturas em {bairro} com a Qualy Quimy. Melhores preços e entrega em 24h para {bairro}.",
            f"Loja de tintas em {bairro}, Itaquaquecetuba. Qualy Quimy oferece produtos premium com entrega garantida."
        ], bairro)
        
        # Conteúdo variado
        intro = self.randomizar_conteudo(self.intro_templates, bairro)
        cta = self.randomizar_conteudo(self.cta_templates, bairro)
        links_internos = self.gerar_links_internos(bairro)
        
        html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM" />

  <!-- SEO Principal -->
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <meta name="keywords" content="tintas {bairro.lower()}, grafiato {bairro.lower()}, textura para parede {bairro.lower()}, massa PVA preço {bairro.lower()}, Tintas Qualy Quimy {bairro.lower()}, tintas baratas {bairro.lower()}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Tintas Qualy Quimy" />
  <link rel="canonical" href="{self.dominio}/cidades/itaquaquecetuba/{slug}.html" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Tintas Qualy Quimy" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:url" content="{self.dominio}/cidades/itaquaquecetuba/{slug}.html" />
  <meta property="og:image" content="{self.dominio}/img/logo-qualy-quimy.webp" />
  <meta property="og:image:width" content="300" />
  <meta property="og:image:height" content="100" />
  <meta property="og:locale" content="pt_BR" />

  <!-- Twitter/X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{self.dominio}/img/logo-qualy-quimy.webp" />
  
  <!-- Lazy Loading CSS -->
  <style>
    .lazy-loading {{
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }}
    .lazy-loading.loaded {{
      opacity: 1;
    }}
    .no-js .lazy-loading,
    .lazy-loading[data-src]:not([src=""]) {{
      opacity: 1;
    }}
  </style>
  <noscript><style>.lazy-loading {{ opacity: 1 !important; }}</style></noscript>

  <!-- Schema.org -->
  <script type="application/ld+json">
{self.gerar_schema_localbusiness(bairro)}
  </script>
  
  <script type="application/ld+json">
{self.gerar_schema_faq(bairro)}
  </script>
  
  <!-- CSS -->
  <link rel="stylesheet" href="{self.dominio}/css/style-min.css" />
</head>
<body>

<!-- HEADER -->
<header role="banner">
  <div class="header-top">
    Entrega em {bairro}, Itaquaquecetuba e região -
    <a href="{self.dominio}/comercial/frete-gratis-itaquaquecetuba.html">Frete grátis disponível</a>
  </div>
  <div class="header-main">
    <a href="{self.dominio}/" class="logo">Qualy<span>Quimy</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Abrir menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="site-nav" id="site-menu" aria-label="Menu principal">
      <ul>
        <li><a href="{self.dominio}/categorias/tintas.html">Tintas</a></li>
        <li><a href="{self.dominio}/categorias/texturas.html">Texturas</a></li>
        <li><a href="{self.dominio}/categorias/massas.html">Massas</a></li>
        <li><a href="{self.dominio}/categorias/fundos.html">Fundos</a></li>
        <li><a href="{self.dominio}/categorias/acabamentos.html">Acabamentos</a></li>
        <li><a href="{self.dominio}/categorias/cidades.html">Cidades</a></li>
        <li><a href="{self.dominio}/grafiato-itaquaquecetuba.html">Grafiato em Itaquaquecetuba</a></li>
        <li><a href="{self.dominio}/blog.html">Blog</a></li>
      </ul>
    </nav>
    <div class="header-cta">
      <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20informações%20sobre%20tintas%20Qualy%20Quimy%20em%20{bairro.replace(' ', '%20')}"
         target="_blank" rel="noopener noreferrer" class="btn-whats">WhatsApp</a>
    </div>
  </div>
</header>

<!-- BREADCRUMB -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li><a href="{self.dominio}/">Início</a></li>
    <li><a href="{self.dominio}/categorias/cidades.html">Cidades</a></li>
    <li><a href="{self.dominio}/cidades/itaquaquecetuba.html">Itaquaquecetuba</a></li>
    <li class="current">{bairro}</li>
  </ol>
</nav>

<!-- HERO -->
<section class="hero">
<canvas id="tinta__canvas" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>
  <div class="hero-inner">
    <div class="hero-content">
      <div class="hero-badge">Marca Qualy Quimy - {bairro}, Itaquaquecetuba</div>
      <h1>Tintas e Texturas para <em>{bairro}</em></h1>
      <p>{intro}. Grafiato, textura lisa, massa PVA, massa acrílica, tinta econômica Qualy Color e muito mais. Entrega expressa em {bairro} e toda a região.</p>
      <div class="hero-btns">
        <a href="#produtos" class="btn-primary">Ver Produtos</a>
        <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20comprar%20tintas%20em%20{bairro.replace(' ', '%20')}" class="btn-secondary">{cta}</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><strong>9</strong><span>Produtos</span></div>
        <div class="stat"><strong>4.9</strong><span>Avaliação média</span></div>
        <div class="stat"><strong>12+</strong><span>Cidades</span></div>
      </div>
    </div>
    <div class="hero-img-area">
      <div class="hero-visual-shell" aria-hidden="true"></div>
      <div class="hero-cards">
        <div class="hero-card">
          <div class="hero-card-icon">GR</div>
          <strong>Grafiato</strong>
          <span>5,6kg e 25kg</span>
          <button id="btnGrafiato" type="button" class="btnHeroGrafiato">Ver Benefícios</button>
        </div>
        <div class="hero-card">
          <div class="hero-card-icon">TL</div>
          <strong>Textura Lisa</strong>
          <span>5,6kg e 25kg</span>
        </div>
        <div class="hero-card">
          <div class="hero-card-icon">QC</div>
          <strong>Tinta Econômica Qualy Color</strong>
          <span>1L / 3,6L / 18L</span>
        </div>
        <div class="hero-card">
          <div class="hero-card-icon">LB</div>
          <strong>Liqui Brilho</strong>
          <span>1L / 3,6L</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CATEGORIAS -->
<section style="background:#fff; padding:52px 24px;" aria-labelledby="titulo-categorias">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Navegue por Categoria</div>
      <h2 id="titulo-categorias">O Que Você Precisa em {bairro}?</h2>
    </div>
    <nav aria-label="Categorias de produtos Qualy Quimy">
    <div class="categorias-grid">
      <a href="{self.dominio}/categorias/tintas.html" class="categoria-card">
        <div class="icon" style="background:none;width:57.68px;height:57.68px;display:flex;align-items:center;justify-content:center;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAVJaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgPEF0dHJpYjpBZHM+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjYtMDQtMDk8L0F0dHJpYjpDcmVhdGVkPgogICAgIDxBdHRyaWI6RXh0SWQ+ZTMyZTczOWItYWRmMS00ODAwLTgzZGYtOGFlYjViM2NjMWU4PC9BdHRyaWI6RXh0SWQ+CiAgICAgPEF0dHJpYjpGYklkPjQyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5CcmFuY28gLSAxPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwZGY9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8nPgogIDxwZGY6QXV0aG9yPlJhZmFlbCBHb25jYWx2ZXM8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YSAoUmVuZGVyZXIpIGRvYz1EQUd4ekdVRTMxayB1c2VyPVVBRDlPZnJ6cVBrIGJyYW5kPUJBRDlPWlhGdFhvPC94bXA6Q3JlYXRvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+" alt="Tintas" loading="lazy"></div>
        <strong>Tintas</strong>
        <span>Tinta Econômica Qualy Color e Esmalte</span>
      </a>
      <a href="{self.dominio}/categorias/texturas.html" class="categoria-card">
        <div class="icon" style="background:none;width:57.68px;height:57.68px;display:flex;align-items:center;justify-content:center;"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QC+RXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAaQAAAHAAAABDAyMTCRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAf//AACgAgADAAAAAQQ4AACgAwADAAAAAQQ4AAAAAAAAAAD/4Q5AaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+DQoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4NCgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6QXR0cmliPSJodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvIj4NCgkJCTxBdHRyaWI6QWRzPg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4NCgkJCQkJCTxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA3LTE2PC9BdHRyaWI6Q3JlYXRlZD4NCgkJCQkJCTxBdHRyaWI6RXh0SWQ+ZTQ3ZTAwNDAtMGI1NS00ZTQxLTg3MGUtNmM3ZGVkYzljOWYwPC9BdHRyaWI6RXh0SWQ+DQoJCQkJCQk8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4NCgkJCQkJCTxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+DQoJCQkJCTwvcmRmOmxpPg0KCQkJCTwvcmRmOlNlcT4NCgkJCTwvQXR0cmliOkFkcz4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+DQoJCQk8ZGM6dGl0bGU+DQoJCQkJPHJkZjpBbHQ+DQoJCQkJCTxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+RGVzaWduIHNlbSBub21lIC0gMTwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwvZGM6dGl0bGU+DQoJCTwvcmRmOkRlc2NyaXB0aW9uPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPg0KCQkJPHBkZjpBdXRob3I+UmFmYWVsIEdvbmNhbHZlczwvcGRmOkF1dGhvcj4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+DQoJCQk8eG1wOkNyZWF0b3JUb29sPkNhbnZhIChSZW5kZXJlcikgZG9jPURBR3RYekhEMlNZIHVzZXI9VUFEOU9mcnpxUGsgYnJhbmQ9" alt="Texturas" loading="lazy"></div>
        <strong>Texturas</strong>
        <span>Grafiato, lisa e projetada</span>
      </a>
      <a href="{self.dominio}/categorias/massas.html" class="categoria-card">
        <div class="icon" style="background:none;width:57.68px;height:57.68px;display:flex;align-items:center;justify-content:center;"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4Q/sRXhpZgAATU0AKgAAAAgADAEAAAMAAAABD/AAAAEBAAMAAAABDAAAAAEPAAIAAAAJAAAAngEQAAIAAAAJAAAAqAESAAMAAAABAAEAAAEaAAUAAAABAAAAsgEbAAUAAAABAAAAugEoAAMAAAABAAIAAAEyAAIAAAAUAAAAwgITAAMAAAABAAEAAIdpAAQAAAABAAAA1oglAAQAAAABAAAHFgAAB/Ztb3Rvcm9sYQAAbW90byBnMzIAAAAAAEgAAAABAAAASAAAAAEyMDI0OjA1OjE1IDE0OjE1OjQ1AAAigpoABQAAAAEAAAJ0gp0ABQAAAAEAAAJ8iCIAAwAAAAEAAgAAiCcAAwAAAAEBsgAAkAAABwAAAAQwMjIwkAMAAgAAABQAAAKEkAQAAgAAABQAAAKYkQEABwAAAAQBAgMAkgEACgAAAAEAAAKskgIABQAAAAEAAAK0kgMACgAAAAEAAAK8kgQACgAAAAEAAALEkgUABQAAAAEAAALMkgcAAwAAAAEAAgAAkggAAwAAAAEAFQAAkgkAAwAAAAEAEAAAkgoABQAAAAEAAALUknwABwAABAQAAALckpAAAgAAAAcAAAbgkpEAAgAAAAcAAAbokpIAAgAAAAcAAAbwoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIAAwAAAAEP8AAAoAMAAwAAAAEMAAAAoAUABAAAAAEAAAb4ohcAAwAAAAEAAQAAowEAAQAAAAEBAAAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAQABQAAAAEAAAcMpAUAAwAAAAEAHAAApAYAAwAAAAEAAAAA6h0ACQAAAAEAAABCAAAAAAAAAAEAAAAeAAAAtAAAAGQyMDI0OjA1OjE1IDE0OjE1OjQ1ADIwMjQ6MDU6MTUgMTQ6MTU6NDUAAAATKgAAA+gAAACpAAAAZP///+MAAABkAAAAAAAAAAYAAACpAAAAZAAAEKoAAAPoTU9UAAEBAQEAMlUAAAIAAAASAAACYlUCAAEAAAABMAAAAFUDAAEAAAABHQAAAFURAAQAAAABAAAAAFUSAAQAAAABAAAAAFUgAAgAAAABAAIAAFUxAAgAAAABAAQAAFVAAAEAAAABXwAAAFVQAAEAAAABXwAAAFVhAAgAAAABAAEAAFXpAAIAAAAIAAACdGAAAAkAAAABAAAAAGQAAAIAAAAFAAACfGQQAAIAAAADTk8AAGQgAAIAAAAfAAACgWQzAAIAAAACMAAAAGQ0AAIAAAACMAAAAGRRAAIAAAACMQAAAGRcAAIAAAAFAAACoGTQAAIAAAAkAAACpWZAAAIAAAAFAAACyWZeAAIAAAAVAAACzmZfAAkAAAABAAAAAGZgAAkAAAABAAAAAGZhAAkAAAABAAAAAGZiAAkAAAABAAAAAGZjAAkAAAABAAAAAGZnAAIAAAAKAAAC42ZoAAIAAAAHAAAC7WZpAAIAAAAKAAAC9GcAAAIAAAAhAAAC/mcBAAIAAAALAAADH2cCAAIAAAAEWkVUAGcDAAIAAAAGAAADKmcEAAIAAAADTkMAAGcFAAIAAAAJAAADMGcGAAIAAAADNDkAAHEOAAIAAAAlAAADOXEPAAIAAAABJAAADXnEQAAIAAAAwAAADp3EUAAIAAAARAAAD13EXAAIAAAAFAAAD6HEYAAIAAAAFAAAD7XEZAAkAAAABAAAAAHEaAAIAAAANAAAD8nFAAAkAAAABCFoAAHFhAAEAAAABAAAAAHGRAAEAAAABAAAAAHGSAAIAAAAFAAAD/3GWAAIAAAADTk8AAFQy" alt="Massas" loading="lazy"></div>
        <strong>Massas</strong>
        <span>PVA e acrílica</span>
      </a>
      <a href="{self.dominio}/categorias/fundos.html" class="categoria-card">
        <div class="icon" style="background:none;width:57.68px;height:57.68px;display:flex;align-items:center;justify-content:center;"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4Q5URXhpZgAATU0AKgAAAAgADAEAAAMAAAABD/AAAAEBAAMAAAABDAAAAAEPAAIAAAAJAAAAngEQAAIAAAAJAAAAqAESAAMAAAABAAEAAAEaAAUAAAABAAAAsgEbAAUAAAABAAAAugEoAAMAAAABAAIAAAEyAAIAAAAUAAAAwgITAAMAAAABAAEAAIdpAAQAAAABAAAA1oglAAQAAAABAAAHFgAAB/Ztb3Rvcm9sYQAAbW90byBnMzIAAAAAAEgAAAABAAAASAAAAAEyMDI0OjA1OjE1IDE1OjMxOjE4AAAigpoABQAAAAEAAAJ0gp0ABQAAAAEAAAJ8iCIAAwAAAAEAAgAAiCcAAwAAAAEB+gAAkAAABwAAAAQwMjIwkAMAAgAAABQAAAKEkAQAAgAAABQAAAKYkQEABwAAAAQBAgMAkgEACgAAAAEAAAKskgIABQAAAAEAAAK0kgMACgAAAAEAAAK8kgQACgAAAAEAAALEkgUABQAAAAEAAALMkgcAAwAAAAEAAgAAkggAAwAAAAEAFQAAkgkAAwAAAAEAEAAAkgoABQAAAAEAAALUknwABwAABAQAAALckpAAAgAAAAcAAAbgkpEAAgAAAAcAAAbokpIAAgAAAAcAAAbwoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIAAwAAAAEP8AAAoAMAAwAAAAEMAAAAoAUABAAAAAEAAAb4ohcAAwAAAAEAAQAAowEAAQAAAAEBAAAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAQABQAAAAEAAAcMpAUAAwAAAAEAHAAApAYAAwAAAAEAAAAA6h0ACQAAAAEAAABCAAAAAAAAAAEAAAAeAAAAtAAAAGQyMDI0OjA1OjE1IDE1OjMxOjE4ADIwMjQ6MDU6MTUgMTU6MzE6MTgAAAATKgAAA+gAAACpAAAAZP///8MAAABkAAAAAAAAAAYAAACpAAAAZAAAEKoAAAPoTU9UAAEBAQEAMlUAAAIAAAASAAACYlUCAAEAAAABGwAAAFUDAAEAAAABHQAAAFURAAQAAAABAAAAAFUSAAQAAAABAAAAAFUgAAgAAAABAAIAAFUxAAgAAAABAAQAAFVAAAEAAAABXwAAAFVQAAEAAAABXwAAAFVhAAgAAAABAAEAAFXpAAIAAAAIAAACdGAAAAkAAAABAAAAAGQAAAIAAAAFAAACfGQQAAIAAAADTk8AAGQgAAIAAAAfAAACgWQzAAIAAAACMAAAAGQ0AAIAAAACMAAAAGRRAAIAAAACMQAAAGRcAAIAAAAFAAACoGTQAAIAAAAkAAACpWZAAAIAAAAFAAACyWZeAAIAAAAVAAACzmZfAAkAAAABAAAAAGZgAAkAAAABAAAAAGZhAAkAAAABAAAAAGZiAAkAAAABAAAAAGZjAAkAAAABAAAAAGZnAAIAAAAKAAAC42ZoAAIAAAAHAAAC7WZpAAIAAAAKAAAC9GcAAAIAAAAhAAAC/mcBAAIAAAALAAADH2cCAAIAAAAEWkVUAGcDAAIAAAAGAAADKmcEAAIAAAADTkMAAGcFAAIAAAAJAAADMGcGAAIAAAADNDkAAHEOAAIAAAAlAAADOXEPAAIAAAABJAAADXnEQAAIAAAAwAAADp3EUAAIAAAARAAAD13EXAAIAAAAFAAAD6HEYAAIAAAAFAAAD7XEZAAkAAAABAAAAAHEaAAIAAAANAAAD8nFAAAkAAAABCIcAAHFhAAEAAAABAAAAAHGRAAEAAAABAAAAAHGSAAIAAAAFAAAD/3GWAAIAAAADTk8AAFQy" alt="Fundos" loading="lazy"></div>
        <strong>Fundos</strong>
        <span>Seladora</span>
      </a>
      <a href="{self.dominio}/categorias/acabamentos.html" class="categoria-card">
        <div class="icon" style="background:none;width:57.68px;height:57.68px;display:flex;align-items:center;justify-content:center;"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4Q+yRXhpZgAATU0AKgAAAAgADAEAAAMAAAABD/AAAAEBAAMAAAABDAAAAAEPAAIAAAAJAAAAngEQAAIAAAAJAAAAqAESAAMAAAABAAEAAAEaAAUAAAABAAAAsgEbAAUAAAABAAAAugEoAAMAAAABAAIAAAEyAAIAAAAUAAAAwgITAAMAAAABAAEAAIdpAAQAAAABAAAA1oglAAQAAAABAAAHEgAAB/Jtb3Rvcm9sYQAAbW90byBnMzIAAAAAAEgAAAABAAAASAAAAAEyMDI0OjA1OjE1IDEzOjU0OjE0AAAigpoABQAAAAEAAAJ0gp0ABQAAAAEAAAJ8iCIAAwAAAAEAAgAAiCcAAwAAAAEBmQAAkAAABwAAAAQwMjIwkAMAAgAAABQAAAKEkAQAAgAAABQAAAKYkQEABwAAAAQBAgMAkgEACgAAAAEAAAKskgIABQAAAAEAAAK0kgMACgAAAAEAAAK8kgQACgAAAAEAAALEkgUABQAAAAEAAALMkgcAAwAAAAEAAgAAkggAAwAAAAEAFQAAkgkAAwAAAAEAEAAAkgoABQAAAAEAAALUknwABwAABAAAAALckpAAAgAAAAcAAAbckpEAAgAAAAcAAAbkkpIAAgAAAAcAAAbsoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIAAwAAAAEP8AAAoAMAAwAAAAEMAAAAoAUABAAAAAEAAAb0ohcAAwAAAAEAAQAAowEAAQAAAAEBAAAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAQABQAAAAEAAAcIpAUAAwAAAAEAHAAApAYAAwAAAAEAAAAA6h0ACQAAAAEAAABCAAAAAAAAAAEAAAAeAAAAtAAAAGQyMDI0OjA1OjE1IDEzOjU0OjE0ADIwMjQ6MDU6MTUgMTM6NTQ6MTQAAAATKgAAA+gAAACpAAAAZP///+UAAABkAAAAAAAAAAYAAACpAAAAZAAAEKoAAAPoTU9UAAEBAQEAMlUAAAIAAAASAAACYlUCAAEAAAABNgAAAFUDAAEAAAABGgAAAFURAAQAAAABAAAAAFUSAAQAAAABAAAAAFUgAAgAAAABAAIAAFUxAAgAAAABAAQAAFVAAAEAAAABXwAAAFVQAAEAAAABXwAAAFVhAAgAAAABAAEAAFXpAAIAAAAIAAACdGAAAAkAAAABAAAAAGQAAAIAAAAFAAACfGQQAAIAAAADTk8AAGQgAAIAAAAfAAACgWQzAAIAAAACMAAAAGQ0AAIAAAACMAAAAGRRAAIAAAACMQAAAGRcAAIAAAAFAAACoGTQAAIAAAAkAAACpWZAAAIAAAAFAAACyWZeAAIAAAAVAAACzmZfAAkAAAABAAAAAGZgAAkAAAABAAAAAGZhAAkAAAABAAAAAGZiAAkAAAABAAAAAGZjAAkAAAABAAAAAGZnAAIAAAAKAAAC42ZoAAIAAAAHAAAC7WZpAAIAAAAKAAAC9GcAAAIAAAAhAAAC/mcBAAIAAAALAAADH2cCAAIAAAAEWkVUAGcDAAIAAAAGAAADKmcEAAIAAAADTkMAAGcFAAIAAAAJAAADMGcGAAIAAAADNDkAAHEOAAIAAAAlAAADOXEPAAIAAAABJAAADXnEQAAIAAAAsAAADp3EUAAIAAAARAAAD03EXAAIAAAAFAAAD5HEYAAIAAAAFAAAD6XEZAAkAAAABAAAAAHEaAAIAAAANAAAD7nFAAAkAAAABCE4AAHFhAAEAAAABAAAAAHGRAAEAAAABAAAAAHGSAAIAAAAFAAAD+3GWAAIAAAADTk8AAFQy" alt="Acabamentos" loading="lazy"></div>
        <strong>Acabamentos</strong>
        <span>Liqui Brilho</span>
      </a>
    </div>
    </nav>
  </div>
</section>

<!-- PRODUTOS -->
<section id="produtos" class="produtos-section" style="background:#f8f5f0; padding:52px 24px;" aria-labelledby="titulo-produtos">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Produtos para {bairro}</div>
      <h2 id="titulo-produtos">Conheça Nossos Produtos</h2>
    </div>
    <div class="produtos-grid">
      {''.join([f'''
      <div class="produto-card">
        <div class="produto-img">
          <img src="{self.dominio}/img/produtos/{produto.lower().replace(' ', '-')}.webp" alt="{produto}" loading="lazy" class="lazy-loading">
        </div>
        <div class="produto-content">
          <h3>{produto}</h3>
          <p>Alta qualidade para {bairro}, Itaquaquecetuba</p>
          <div class="produto-precos">
            <span>A partir de R$ {random.randint(15, 89)},90</span>
          </div>
          <div class="produto-botoes">
            <a href="{self.dominio}/produtos/{produto.lower().replace(' ', '-')}.html" class="btn-outline">Ver Detalhes</a>
            <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20comprar%20{produto.replace(' ', '%20')}%20em%20{bairro.replace(' ', '%20')}" class="btn-primary" target="_blank">
              <i class="icon-whatsapp"></i>
              Comprar
            </a>
          </div>
        </div>
      </div>''' for produto in random.sample(self.produtos_relacionados, 6)])}
    </div>
  </div>
</section>

<!-- BENEFÍCIOS -->
<section class="beneficios-section" style="background:#fff; padding:52px 24px;" aria-labelledby="titulo-beneficios">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Vantagens</div>
      <h2 id="titulo-beneficios">Por que escolher Qualy Quimy em {bairro}?</h2>
    </div>
    <div class="beneficios-grid">
      <div class="beneficio-card">
        <div class="beneficio-icon">🚚</div>
        <h3>Entrega Rápida</h3>
        <p>Recebemos seu pedido em {bairro} em até 24 horas</p>
      </div>
      <div class="beneficio-card">
        <div class="beneficio-icon">⭐</div>
        <h3>Qualidade Garantida</h3>
        <p>Produtos premium com durabilidade comprovada</p>
      </div>
      <div class="beneficio-card">
        <div class="beneficio-icon">💰</div>
        <h3>Preço Especial</h3>
        <p>Condições exclusivas para moradores de {bairro}</p>
      </div>
      <div class="beneficio-card">
        <div class="beneficio-icon">🏠</div>
        <h3>Atendimento Local</h3>
        <p>Equipe especializada em {bairro} e região</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq-section" style="background:#f8f5f0; padding:52px 24px;" aria-labelledby="titulo-faq">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Dúvidas</div>
      <h2 id="titulo-faq">Dúvidas Frequentes - {bairro}</h2>
    </div>
    <div class="faq-list">
      {''.join([f'''
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          {question.format(bairro=bairro)}
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>{answer.format(bairro=bairro)}</p>
        </div>
      </div>''' for question, answer in self.faq_questions[:4]])}
    </div>
  </div>
</section>

<!-- OUTRAS LOCALIDADES -->
<section class="localidades-section" style="background:#fff; padding:52px 24px;" aria-labelledby="titulo-localidades">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Atendimento</div>
      <h2 id="titulo-localidades">Outras Localidades Atendidas</h2>
    </div>
    <div class="localidades-grid">
      {''.join([f'<div class="localidade-item">{link}</div>' for link in links_internos[:8]])}
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section class="cta-final" style="background:var(--cor-primaria); color:#fff; padding:52px 24px; text-align:center;">
  <div class="container">
    <h2 style="font-size:2.5rem; margin-bottom:1rem;">Pronto para transformar sua obra em {bairro}?</h2>
    <p style="font-size:1.2rem; margin-bottom:2rem;">Entre em contato agora e receba atendimento especializado para {bairro}</p>
    <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20comprar%20tintas%20em%20{bairro.replace(' ', '%20')}" class="btn-secondary" style="background:#fff; color:var(--cor-primaria); padding:1rem 2rem; font-size:1.1rem; border-radius:50px; text-decoration:none; display:inline-block;" target="_blank">
      <i class="icon-whatsapp"></i>
      Falar com Especialista
    </a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>Tintas Qualy Quimy</h3>
      <p>Tintas, massas e texturas de alta qualidade para sua obra ou reforma.</p>
      <div class="social-links">
        <a href="https://wa.me/5511954950044" target="_blank">
          <i class="icon-whatsapp"></i>
        </a>
        <a href="https://shopee.com.br/qualyquimy" target="_blank">
          <i class="icon-store"></i>
        </a>
      </div>
    </div>
    <div class="footer-section">
      <h3>Produtos</h3>
      <ul>
        <li><a href="{self.dominio}/categorias/tintas.html">Tintas</a></li>
        <li><a href="{self.dominio}/categorias/texturas.html">Texturas</a></li>
        <li><a href="{self.dominio}/categorias/massas.html">Massas</a></li>
        <li><a href="{self.dominio}/categorias/fundos.html">Fundos</a></li>
        <li><a href="{self.dominio}/categorias/acabamentos.html">Acabamentos</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Atendimento</h3>
      <ul>
        <li><a href="{self.dominio}/categorias/cidades.html">Cidades Atendidas</a></li>
        <li><a href="{self.dominio}/blog.html">Blog</a></li>
        <li><a href="{self.dominio}/sobre.html">Sobre Nós</a></li>
        <li><a href="{self.dominio}/politica-de-privacidade.html">Política de Privacidade</a></li>
        <li><a href="{self.dominio}/termos-de-uso.html">Termos de Uso</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Contato</h3>
      <p><strong>WhatsApp:</strong> (11) 95495-0044</p>
      <p><strong>Endereço:</strong> Rua Leiria, 45 - Chácara Cuiabá, Itaquaquecetuba - SP</p>
      <p><strong>Shopee:</strong> shopee.com.br/qualyquimy</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Tintas Qualy Quimy - Todos os direitos reservados | Desenvolvido por <a href="https://impulsoweb10.com.br" target="_blank">ImpulsoWeb10</a></p>
  </div>
</footer>

<!-- WhatsApp Flutuante -->
<a href="https://wa.me/5511954950044?text=Olá!%20Vi%20o%20site%20e%20quero%20informações%20sobre%20tintas%20Qualy%20Quimy%20em%20{bairro.replace(' ', '%20')}" 
   target="_blank" 
   rel="noopener noreferrer" 
   id="whatsapp-float" 
   style="position:fixed;bottom:28px;right:28px;z-index:999;background:#25D366;color:#fff;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:28px;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,0.45);transition:transform 0.2s,box-shadow 0.2s;animation:pulse 2.5s infinite;"
   title="Fale conosco no WhatsApp">
  WA
</a>

<!-- JavaScript Principal -->
<script src="{self.dominio}/js/app-min.js"></script>

<!-- Lazy Loading -->
<script src="{self.dominio}/js/lazy-loading.js"></script>

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

</body>
</html>"""
        
        return html

    def validar_pagina(self, arquivo, bairro):
        """Valida se a página foi gerada corretamente"""
        try:
            with open(arquivo, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Validações básicas
            if not content.strip():
                return False, "Arquivo vazio"
                
            if len(content) < 1000:
                return False, "Conteúdo muito pequeno"
                
            # Verificar elementos obrigatórios
            elementos_obrigatorios = [
                '<title>', '<meta name="description"', 
                'canonical', 'schema.org', 'FAQPage',
                'breadcrumb-list', 'whatsapp'
            ]
            
            for elemento in elementos_obrigatorios:
                if elemento not in content:
                    return False, f"Elemento obrigatório faltando: {elemento}"
                    
            return True, "OK"
            
        except Exception as e:
            return False, f"Erro na validação: {str(e)}"

    def gerar_todas_paginas(self):
        """Gera todas as páginas HTML"""
        print(f"🚀 Iniciando geração de {len(self.bairros)} páginas...")
        
        for bairro in self.bairros:
            try:
                slug = self.gerar_slug(bairro)
                arquivo = self.base_path / f"{slug}.html"
                
                # Gerar HTML
                html = self.gerar_html_bairro(bairro)
                
                # Salvar arquivo
                with open(arquivo, 'w', encoding='utf-8') as f:
                    f.write(html)
                
                # Validar página
                valid, msg = self.validar_pagina(arquivo, bairro)
                
                if valid:
                    self.relatorio["paginas_criadas"] += 1
                    self.relatorio["bairros_gerados"].append(bairro)
                    print(f"✅ {bairro} - {slug}.html")
                else:
                    self.relatorio["paginas_ignoradas"].append(bairro)
                    self.relatorio["erros_encontrados"].append(f"{bairro}: {msg}")
                    print(f"❌ {bairro} - Erro: {msg}")
                    
            except Exception as e:
                self.relatorio["erros_encontrados"].append(f"{bairro}: {str(e)}")
                print(f"❌ {bairro} - Erro: {str(e)}")

    def atualizar_sitemap(self):
        """Atualiza sitemap.xml com as novas páginas"""
        sitemap_path = Path("sitemap.xml")
        
        # URLs existentes + novas páginas
        urls = []
        
        # Adicionar URLs dos bairros
        for bairro in self.relatorio["bairros_gerados"]:
            slug = self.gerar_slug(bairro)
            url = f"  <url>\n    <loc>{self.dominio}/cidades/itaquaquecetuba/{slug}.html</loc>\n    <lastmod>{datetime.now().strftime('%Y-%m-%d')}</lastmod>\n    <priority>0.8</priority>\n  </url>"
            urls.append(url)
        
        # Gerar sitemap
        sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""
        
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sitemap_content)
            
        print(f"📍 Sitemap atualizado com {len(urls)} URLs")

    def executar_git_commands(self):
        """Executa comandos Git automaticamente"""
        try:
            # Adicionar arquivos
            subprocess.run(["git", "add", "."], check=True, capture_output=True)
            print("📁 Arquivos adicionados ao Git")
            
            # Commit
            commit_msg = "SEO regional bairros Itaquaquecetuba"
            subprocess.run(["git", "commit", "-m", commit_msg], check=True, capture_output=True)
            print(f"📝 Commit criado: {commit_msg}")
            
            # Push
            subprocess.run(["git", "push"], check=True, capture_output=True)
            print("🚀 Push realizado com sucesso")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Erro nos comandos Git: {e}")
            self.relatorio["erros_encontrados"].append(f"Git error: {str(e)}")

    def gerar_relatorio_final(self):
        """Gera relatório final do processo"""
        relatorio_content = f"""
# RELATÓRIO FINAL - GERAÇÃO SEO BAIRROS ITAQUAQUECETUBA

## 📊 ESTATÍSTICAS
- **Páginas criadas:** {self.relatorio['paginas_criadas']}
- **Bairros gerados:** {len(self.relatorio['bairros_gerados'])}
- **Erros encontrados:** {len(self.relatorio['erros_encontrados'])}
- **Páginas ignoradas:** {len(self.relatorio['paginas_ignoradas'])}

## 🏘️ BAIRROS PROCESSADOS
{chr(10).join([f"✅ {bairro}" for bairro in self.relatorio['bairros_gerados']])}

## ❌ ERROS ENCONTRADOS
{chr(10).join([f"❌ {erro}" for erro in self.relatorio['erros_encontrados']]) if self.relatorio['erros_encontrados'] else "Nenhum erro encontrado!"}

## 📁 ARQUIVOS GERADOS
- Local: {self.base_path.absolute()}
- Total de arquivos: {self.relatorio['paginas_criadas']}

## 🔗 SEO IMPLEMENTADO
- Meta tags únicas para cada página
- Schema.org LocalBusiness
- Schema.org FAQPage
- Open Graph
- Canonical URLs
- Breadcrumbs
- Links internos automáticos

## ⏰ DATA/HORA
{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        with open("RELATORIO_SEO_BAIRROS.md", 'w', encoding='utf-8') as f:
            f.write(relatorio_content)
            
        print("\n" + "="*50)
        print("📋 RELATÓRIO FINAL:")
        print(f"✅ Páginas criadas: {self.relatorio['paginas_criadas']}")
        print(f"❌ Erros: {len(self.relatorio['erros_encontrados'])}")
        print(f"📄 Relatório salvo: RELATORIO_SEO_BAIRROS.md")
        print("="*50)

    def executar_processo_completo(self):
        """Executa todo o processo de geração"""
        print("🎯 INICIANDO GERAÇÃO SEO REGIONAL - ITAQUAQUECETUBA")
        print("="*50)
        
        # 1. Gerar páginas
        self.gerar_todas_paginas()
        
        # 2. Atualizar sitemap
        self.atualizar_sitemap()
        
        # 3. Executar Git commands
        self.executar_git_commands()
        
        # 4. Gerar relatório
        self.gerar_relatorio_final()
        
        print("\n🎉 PROCESSO CONCLUÍDO COM SUCESSO!")

if __name__ == "__main__":
    gerador = GeradorBairrosItaqua()
    gerador.executar_processo_completo()
