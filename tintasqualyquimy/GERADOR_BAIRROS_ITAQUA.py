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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <link rel="canonical" href="{self.dominio}/cidades/itaquaquecetuba/{slug}.html">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:url" content="{self.dominio}/cidades/itaquaquecetuba/{slug}.html">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Tintas Qualy Quimy">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
{self.gerar_schema_localbusiness(bairro)}
    </script>
    
    <script type="application/ld+json">
{self.gerar_schema_faq(bairro)}
    </script>
    
    <link rel="stylesheet" href="{self.dominio}/css/style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="{self.dominio}/">
                        <img src="{self.dominio}/img/logo-qualy-quimy.webp" alt="Tintas Qualy Quimy">
                    </a>
                </div>
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="{self.dominio}/">Início</a></li>
                        <li><a href="{self.dominio}/categorias/tintas.html">Tintas</a></li>
                        <li><a href="{self.dominio}/categorias/texturas.html">Texturas</a></li>
                        <li><a href="{self.dominio}/categorias/massas.html">Massas</a></li>
                        <li><a href="{self.dominio}/categorias/fundos.html">Fundos</a></li>
                        <li><a href="{self.dominio}/categorias/acabamentos.html">Acabamentos</a></li>
                        <li><a href="{self.dominio}/categorias/cidades.html">Cidades</a></li>
                        <li><a href="{self.dominio}/blog.html">Blog</a></li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <a href="https://wa.me/5511954950044?text=Olá!%20Tenho%20interesse%20nos%20produtos%20Qualy%20Quimy" class="btn-whatsapp" target="_blank">
                        <i class="icon-whatsapp"></i>
                        (11) 95495-0044
                    </a>
                </div>
            </div>
        </div>
    </header>

    <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
            <li><a href="{self.dominio}/">Início</a></li>
            <li><a href="{self.dominio}/categorias/cidades.html">Cidades</a></li>
            <li><a href="{self.dominio}/cidades/itaquaquecetuba.html">Itaquaquecetuba</a></li>
            <li class="current">{bairro}</li>
        </ol>
    </nav>

    <main class="main-content">
        <div class="container">
            <section class="hero-section">
                <h1>Tintas em {bairro}, Itaquaquecetuba</h1>
                <p class="hero-description">{intro}</p>
                <div class="hero-cta">
                    <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20comprar%20tintas%20em%20{bairro.replace(' ', '%20')}" class="btn-primary" target="_blank">
                        {cta}
                    </a>
                </div>
            </section>

            <section class="products-section">
                <h2>Produtos Disponíveis em {bairro}</h2>
                <div class="products-grid">
                    {''.join([f'<div class="product-card"><h3>{produto}</h3><p>Alta qualidade para {bairro}</p><a href="https://wa.me/5511954950044?text=Quero%20{produto.replace(' ', '%20')}%20em%20{bairro.replace(' ', '%20')}" class="btn-outline" target="_blank">Pedir agora</a></div>' for produto in random.sample(self.produtos_relacionados, 4)])}
                </div>
            </section>

            <section class="benefits-section">
                <h2>Por que escolher Qualy Quimy em {bairro}?</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <h3>Entenda Rápida</h3>
                        <p>Recebemos seu pedido em {bairro} em até 24 horas</p>
                    </div>
                    <div class="benefit-card">
                        <h3>Qualidade Garantida</h3>
                        <p>Produtos premium com durabilidade comprovada</p>
                    </div>
                    <div class="benefit-card">
                        <h3>Preço Especial</h3>
                        <p>Condições exclusivas para moradores de {bairro}</p>
                    </div>
                </div>
            </section>

            <section class="faq-section">
                <h2>Dúvidas Frequentes - {bairro}</h2>
                <div class="faq-list">
                    {''.join([f'<div class="faq-item"><h3>{question.format(bairro=bairro)}</h3><p>{answer.format(bairro=bairro)}</p></div>' for question, answer in self.faq_questions[:3]])}
                </div>
            </section>

            <section class="links-section">
                <h2>Outras Localidades Atendidas</h2>
                <div class="links-grid">
                    {''.join([f'<div class="link-item">{link}</div>' for link in links_internos[:6]])}
                </div>
            </section>
        </div>
    </main>

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

    <script>
        // WhatsApp flutuante
        document.addEventListener('DOMContentLoaded', function() {{
            const btn = document.createElement('a');
            btn.href = 'https://wa.me/5511954950044?text=Olá!%20Vi%20o%20site%20e%20quero%20informações%20sobre%20tintas%20Qualy%20Quimy';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.id = 'whats-float';
            btn.textContent = 'WA';
            btn.title = 'Fale conosco no WhatsApp';
            btn.style.cssText = `
                position:fixed;bottom:28px;right:28px;z-index:999;
                background:#25D366;color:#fff;border-radius:50%;
                width:60px;height:60px;display:flex;align-items:center;
                justify-content:center;font-size:28px;text-decoration:none;
                box-shadow:0 4px 20px rgba(37,211,102,0.45);
                transition:transform 0.2s,box-shadow 0.2s;
                animation:pulse 2.5s infinite;
            `;
            document.body.appendChild(btn);
        }});
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
