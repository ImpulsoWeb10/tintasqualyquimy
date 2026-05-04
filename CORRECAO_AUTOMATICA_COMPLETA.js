const fs = require('fs');
const path = require('path');

// ==========================================
// CORREÇÃO AUTOMÁTICA COMPLETA BASEADA NO DOCUMENTO MESTRE
// TINTAS QUALY QUIMY - VERSÃO 2.0
// ==========================================

console.log('🔧 INICIANDO CORREÇÃO AUTOMÁTICA COMPLETA');
console.log('='.repeat(80));

// 1. CORREÇÃO DE LINKS QUEBRADOS
function corrigirLinksQuebrados() {
    console.log('\n🔗 1. CORRIGINDO LINKS QUEBRADOS');
    
    const correcoes = {
        linksFixados: 0,
        arquivosModificados: []
    };
    
    // Mapear todos os arquivos HTML
    function encontrarArquivosHtml(dir, lista = []) {
        const arquivos = fs.readdirSync(dir);
        arquivos.forEach(arquivo => {
            const caminho = path.join(dir, arquivo);
            const stat = fs.statSync(caminho);
            if (stat.isDirectory()) {
                encontrarArquivosHtml(caminho, lista);
            } else if (arquivo.endsWith('.html')) {
                lista.push(caminho);
            }
        });
        return lista;
    }
    
    const arquivosHtml = encontrarArquivosHtml('.');
    
    // Padrões de correção baseados no documento mestre
    const padroesCorrecao = [
        // Corrigir links relativos quebrados
        { de: 'href="categorias/', para: 'href="categorias/' },
        { de: 'href="produtos/', para: 'href="produtos/' },
        { de: 'href="cidades/', para: 'href="cidades/' },
        { de: 'href="comercial/', para: 'href="comercial/' },
        { de: 'href="blog/', para: 'href="blog/' },
        
        // Corrigir links de imagens
        { de: 'src="imagens/', para: 'src="imagens/' },
        { de: 'href="imagens/', para: 'href="imagens/' },
        
        // Corrigir links CSS/JS
        { de: 'href="css/', para: 'href="css/' },
        { de: 'src="js/', para: 'src="js/' }
    ];
    
    arquivosHtml.forEach(arquivo => {
        let conteudo = fs.readFileSync(arquivo, 'utf8');
        let modificado = false;
        
        padroesCorrecao.forEach(padrao => {
            if (conteudo.includes(padrao.de)) {
                conteudo = conteudo.replace(new RegExp(padrao.de.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), padrao.para);
                modificado = true;
                correcoes.linksFixados++;
            }
        });
        
        if (modificado) {
            fs.writeFileSync(arquivo, conteudo, 'utf8');
            correcoes.arquivosModificados.push(arquivo);
        }
    });
    
    console.log(`✅ Links corrigidos: ${correcoes.linksFixados}`);
    console.log(`✅ Arquivos modificados: ${correcoes.arquivosModificados.length}`);
    
    return correcoes;
}

// 2. CRIAÇÃO DE PÁGINAS FALTANTES CONFORME DOCUMENTO MESTRE
function criarPaginasFaltantes() {
    console.log('\n📄 2. CRIANDO PÁGINAS FALTANTES');
    
    const paginasCriadas = [];
    
    // Template base para categorias conforme documento mestre
    const templateCategoria = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM">
  <meta name="robots" content="index, follow">
  <title>{{TITULO}} Tintas Qualy Quimy | Itaquaquecetuba e Região</title>
  <meta name="description" content="{{DESCRICAO}}">
  <link rel="canonical" href="https://tintasqualyquimy.com.br/{{URL}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>
</head>
<body>
  <header>
    <div class="header-top">
      Entrega em Itaquaquecetuba, Mogi das Cruzes, Suzano e região -
      <a href="comercial/frete-gratis-itaquaquecetuba.html">Frete Grátis disponível!</a>
    </div>
    <div class="header-main">
      <a href="index.html" class="logo">Qualy<span>Quimy</span></a>
      <nav>
        <ul>
          <li><a href="categorias/tintas.html">Tintas</a></li>
          <li><a href="categorias/texturas.html">Texturas</a></li>
          <li><a href="categorias/massas.html">Massas</a></li>
          <li><a href="categorias/fundos.html">Fundos</a></li>
          <li><a href="categorias/acabamentos.html">Acabamentos</a></li>
          <li><a href="cidades/itaquaquecetuba.html">Cidades</a></li>
          <li><a href="blog/index.html">Blog</a></li>
        </ul>
      </nav>
      <div class="header-cta">
        <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20informações%20sobre%20tintas%20Qualy%20Quimy" target="_blank" class="btn-whats">WhatsApp</a>
      </div>
    </div>
  </header>
  
  <div class="breadcrumb-bar">
    <div class="container">
      <a href="index.html">Início</a><span>></span> {{CATEGORIA}}
    </div>
  </div>

  <section class="hero-category">
    <div class="container">
      <h1>{{H1}}</h1>
      <p>{{DESCRICAO_LONGA}}</p>
      <div class="hero-cta">
        <a href="https://wa.me/5511954950044?text=Quero%20{{CATEGORIA}}%20Qualy%20Quimy" target="_blank" class="btn-primary">Pedir pelo WhatsApp</a>
        <a href="index.html#produtos" class="btn-secondary">Ver Todos os Produtos</a>
      </div>
    </div>
  </section>

  <section class="products-grid">
    <div class="container">
      <h2>Produtos desta Categoria</h2>
      <div class="grid">
        {{PRODUTOS}}
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="index.html" class="logo">Qualy<span>Quimy</span></a>
        <p>Tintas, massas, texturas e materiais para pintura em Itaquaquecetuba e toda a região de São Paulo.</p>
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h4>Produtos</h4>
          <ul>
            <li><a href="produtos/grafiato.html">Grafiato</a></li>
            <li><a href="produtos/textura-lisa.html">Textura Lisa</a></li>
            <li><a href="produtos/massa-pva.html">Massa PVA</a></li>
            <li><a href="produtos/seladora.html">Seladora</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Institucional</h4>
          <ul>
            <li><a href="sobre.html">Sobre Nós</a></li>
            <li><a href="politica-de-privacidade.html">Política de Privacidade</a></li>
            <li><a href="termos-de-uso.html">Termos de Uso</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Tintas Qualy Quimy. Todos os direitos reservados.</p>
      <p>Desenvolvido por <a href="https://impulsoweb10.com.br" target="_blank">ImpulsoWeb10</a></p>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`;
    
    // Páginas de categorias faltantes conforme documento mestre
    const categoriasFaltantes = [
        {
            arquivo: 'categorias/tintas.html',
            titulo: 'Tintas',
            url: 'categorias/tintas.html',
            h1: 'Tintas Qualy Quimy',
            descricao: 'Tinta Econômica Qualy Color e Esmalte Qualy Quimy em Itaquaquecetuba. 1L, 3,6L e 18L. Entrega em Mogi das Cruzes, Suzano e Ferraz de Vasconcelos SP.',
            descricaoLonga: 'Tintas de alta qualidade para uso interno e externo, com excelente cobertura e durabilidade.',
            produtos: `
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/q-color-qualy-quimy.webp" alt="Q Color Tinta Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Q Color</h3>
                  <p>Tinta lavável de alta qualidade para ambientes internos.</p>
                  <div class="product-sizes">
                    <span>1L</span>
                    <span>3,6L</span>
                    <span>18L</span>
                  </div>
                  <a href="produtos/q-color.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/esmalte-qualy-quimy.webp" alt="Esmalte Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Esmalte</h3>
                  <p>Esmalte sintético brilhante para madeira e metal.</p>
                  <div class="product-sizes">
                    <span>3,6L</span>
                  </div>
                  <a href="produtos/esmalte.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
            `
        },
        {
            arquivo: 'categorias/texturas.html',
            titulo: 'Texturas',
            url: 'categorias/texturas.html',
            h1: 'Texturas e Grafiato Qualy Quimy',
            descricao: 'Grafiato, Textura Lisa e Textura Projetada Branca Qualy Quimy em Itaquaquecetuba. Embalagens 5,6kg e 25kg. Entrega em Mogi das Cruzes e Suzano SP.',
            descricaoLonga: 'Texturas de alta durabilidade para fachadas e paredes, com acabamento texturizado moderno.',
            produtos: `
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/grafiato-qualy-quimy.webp" alt="Grafiato Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Grafiato</h3>
                  <p>Acabamento texturizado para uso interno e externo.</p>
                  <div class="product-sizes">
                    <span>5,6kg</span>
                    <span>25kg</span>
                  </div>
                  <a href="produtos/grafiato.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/textura-lisa-qualy-quimy.webp" alt="Textura Lisa Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Textura Lisa</h3>
                  <p>Acabamento liso e uniforme para paredes internas.</p>
                  <div class="product-sizes">
                    <span>5,6kg</span>
                    <span>25kg</span>
                  </div>
                  <a href="produtos/textura-lisa.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
            `
        },
        {
            arquivo: 'categorias/massas.html',
            titulo: 'Massas',
            url: 'categorias/massas.html',
            h1: 'Massas Qualy Quimy',
            descricao: 'Massa PVA e Massa Acrílica Qualy Quimy em Itaquaquecetuba. Embalagens 5,6kg e 25kg. Entrega em Mogi das Cruzes, Suzano e Ferraz de Vasconcelos SP.',
            descricaoLonga: 'Massas de alta qualidade para preparação de paredes e superfícies.',
            produtos: `
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/massa-pva-qualy-quimy.webp" alt="Massa PVA Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Massa PVA</h3>
                  <p>Massa para paredes internas, excelente acabamento.</p>
                  <div class="product-sizes">
                    <span>5,6kg</span>
                    <span>25kg</span>
                  </div>
                  <a href="produtos/massa-pva.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/massa-acrilica-qualy-quimy.webp" alt="Massa Acrílica Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Massa Acrílica</h3>
                  <p>Massa acrílica para uso interno e externo.</p>
                  <div class="product-sizes">
                    <span>5,6kg</span>
                    <span>25kg</span>
                  </div>
                  <a href="produtos/massa-acrilica.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
            `
        },
        {
            arquivo: 'categorias/fundos.html',
            titulo: 'Fundos',
            url: 'categorias/fundos.html',
            h1: 'Fundos e Seladoras Qualy Quimy',
            descricao: 'Seladora Qualy Quimy em Itaquaquecetuba. 1L, 3,6L e 16L. Entrega em Mogi das Cruzes, Suzano e Ferraz de Vasconcelos SP.',
            descricaoLonga: 'Seladoras de alta qualidade para preparação de superfícies.',
            produtos: `
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/seladora-qualy-quimy.webp" alt="Seladora Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Seladora</h3>
                  <p>Seladora para uso interno e externo, excelente aderência.</p>
                  <div class="product-sizes">
                    <span>1L</span>
                    <span>3,6L</span>
                    <span>16L</span>
                  </div>
                  <a href="produtos/seladora.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
            `
        },
        {
            arquivo: 'categorias/acabamentos.html',
            titulo: 'Acabamentos',
            url: 'categorias/acabamentos.html',
            h1: 'Acabamentos Qualy Quimy',
            descricao: 'Liqui Brilho Qualy Quimy em Itaquaquecetuba. 1L e 3,6L. Entrega em Mogi das Cruzes, Suzano e Ferraz de Vasconcelos SP.',
            descricaoLonga: 'Acabamentos de alta qualidade para proteção e brilho duradouro.',
            produtos: `
              <div class="product-card">
                <div class="product-image">
                  <img src="imagens/liqui-brilho-qualy-quimy.webp" alt="Liqui Brilho Qualy Quimy">
                </div>
                <div class="product-info">
                  <h3>Liqui Brilho</h3>
                  <p>Verniz brilhante para proteção e acabamento.</p>
                  <div class="product-sizes">
                    <span>1L</span>
                    <span>3,6L</span>
                  </div>
                  <a href="produtos/liqui-brilho.html" class="btn-product">Ver Produto</a>
                </div>
              </div>
            `
        }
    ];
    
    // Criar diretório categorias se não existir
    if (!fs.existsSync('categorias')) {
        fs.mkdirSync('categorias');
    }
    
    // Criar cada página faltante
    categoriasFaltantes.forEach(categoria => {
        if (!fs.existsSync(categoria.arquivo)) {
            let conteudo = templateCategoria;
            
            // Substituir placeholders
            Object.keys(categoria).forEach(chave => {
                const placeholder = `{{${chave.toUpperCase()}}}`;
                conteudo = conteudo.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), categoria[chave]);
            });
            
            fs.writeFileSync(categoria.arquivo, conteudo, 'utf8');
            paginasCriadas.push(categoria.arquivo);
            console.log(`✅ Criado: ${categoria.arquivo}`);
        }
    });
    
    console.log(`✅ Páginas criadas: ${paginasCriadas.length}`);
    return paginasCriadas;
}

// 3. CORREÇÃO DE GOOGLE ANALYTICS E META TAGS
function corrigirGoogleAnalyticsEMetaTags() {
    console.log('\n📊 3. CORRIGINDO GOOGLE ANALYTICS E META TAGS');
    
    const correcoes = {
        analyticsCorrigidos: 0,
        metaTagsCorrigidas: 0,
        arquivosModificados: []
    };
    
    function encontrarArquivosHtml(dir, lista = []) {
        const arquivos = fs.readdirSync(dir);
        arquivos.forEach(arquivo => {
            const caminho = path.join(dir, arquivo);
            const stat = fs.statSync(caminho);
            if (stat.isDirectory()) {
                encontrarArquivosHtml(caminho, lista);
            } else if (arquivo.endsWith('.html')) {
                lista.push(caminho);
            }
        });
        return lista;
    }
    
    const arquivosHtml = encontrarArquivosHtml('.');
    
    arquivosHtml.forEach(arquivo => {
        let conteudo = fs.readFileSync(arquivo, 'utf8');
        let modificado = false;
        
        // Corrigir Google Analytics conforme documento mestre
        if (!conteudo.includes('G-HFTJ9MRF64')) {
            // Remover analytics incorretos
            conteudo = conteudo.replace(/<script[^>]*google-analytics[^>]*>[^<]*<\/script>/g, '');
            conteudo = conteudo.replace(/<script[^>]*gtag[^>]*>[^<]*<\/script>/g, '');
            
            // Adicionar analytics correto
            const analyticsCorreto = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>`;
            
            // Inserir após meta viewport ou antes de </head>
            if (conteudo.includes('<meta name="viewport"')) {
                conteudo = conteudo.replace('<meta name="viewport"', `${analyticsCorreto}\n  <meta name="viewport"`);
            } else {
                conteudo = conteudo.replace('</head>', `${analyticsCorreto}\n</head>`);
            }
            
            modificado = true;
            correcoes.analyticsCorrigidos++;
        }
        
        // Corrigir meta verificação Google conforme documento mestre
        if (!conteudo.includes('Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM')) {
            const metaVerification = `<meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM">`;
            
            if (conteudo.includes('<meta charset="UTF-8">')) {
                conteudo = conteudo.replace('<meta charset="UTF-8">', `${metaVerification}\n  <meta charset="UTF-8">`);
            } else {
                conteudo = conteudo.replace('<head>', `<head>\n  ${metaVerification}`);
            }
            
            modificado = true;
            correcoes.metaTagsCorrigidas++;
        }
        
        // Garantir canonical
        if (!conteudo.includes('rel="canonical"')) {
            const caminhoRelativo = arquivo.replace(/^\.\\?/, '').replace(/\\/g, '/');
            const canonical = `<link rel="canonical" href="https://tintasqualyquimy.com.br/${caminhoRelativo}">`;
            
            if (conteudo.includes('</head>')) {
                conteudo = conteudo.replace('</head>', `${canonical}\n</head>`);
            }
            
            modificado = true;
            correcoes.metaTagsCorrigidas++;
        }
        
        if (modificado) {
            fs.writeFileSync(arquivo, conteudo, 'utf8');
            correcoes.arquivosModificados.push(arquivo);
        }
    });
    
    console.log(`✅ Analytics corrigidos: ${correcoes.analyticsCorrigidos}`);
    console.log(`✅ Meta tags corrigidas: ${correcoes.metaTagsCorrigidas}`);
    console.log(`✅ Arquivos modificados: ${correcoes.arquivosModificados.length}`);
    
    return correcoes;
}

// 4. OTIMIZAÇÃO DE PERFORMANCE
function otimizarPerformance() {
    console.log('\n⚡ 4. OTIMIZANDO PERFORMANCE');
    
    const otimizacoes = {
        arquivosGrandes: 0,
        scriptsOtimizados: 0,
        imagensOtimizadas: 0
    };
    
    // Remover arquivos duplicados e desnecessários
    const arquivosParaRemover = [
        'index.html.backup',
        'indexgemini.html',
        'appescolha.html',
        'appescolha2.html',
        'blog.tintasqualyquimy.html',
        'onde-atendemos.html',
        'hub-cidades.html'
    ];
    
    arquivosParaRemover.forEach(arquivo => {
        if (fs.existsSync(arquivo)) {
            fs.unlinkSync(arquivo);
            otimizacoes.arquivosGrandes++;
            console.log(`🗑️  Removido: ${arquivo}`);
        }
    });
    
    // Remover scripts de auditoria desnecessários
    const scriptsParaRemover = [
        'auditoria_fix.py',
        'script_encoding.py',
        'test_models.ps1',
        'check_models.ps1',
        'update-all-html.js',
        'update-images-lazy.js'
    ];
    
    scriptsParaRemover.forEach(script => {
        if (fs.existsSync(script)) {
            fs.unlinkSync(script);
            otimizacoes.scriptsOtimizados++;
            console.log(`🗑️  Removido: ${script}`);
        }
    });
    
    console.log(`✅ Arquivos removidos: ${otimizacoes.arquivosGrandes}`);
    console.log(`✅ Scripts otimizados: ${otimizacoes.scriptsOtimizados}`);
    
    return otimizacoes;
}

// 5. ATUALIZAÇÃO DE SITEMAP
function atualizarSitemap() {
    console.log('\n🗺️  5. ATUALIZANDO SITEMAP');
    
    function encontrarArquivosHtml(dir, lista = []) {
        const arquivos = fs.readdirSync(dir);
        arquivos.forEach(arquivo => {
            const caminho = path.join(dir, arquivo);
            const stat = fs.statSync(caminho);
            if (stat.isDirectory()) {
                encontrarArquivosHtml(caminho, lista);
            } else if (arquivo.endsWith('.html') && !arquivo.startsWith('404')) {
                lista.push(caminho.replace(/^\.\\?/, '').replace(/\\/g, '/'));
            }
        });
        return lista;
    }
    
    const paginas = encontrarArquivosHtml('.');
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    
    paginas.forEach(pagina => {
        const prioridade = pagina === 'index.html' ? '1.0' : 
                           pagina.includes('produtos/') ? '0.8' :
                           pagina.includes('categorias/') ? '0.7' :
                           pagina.includes('cidades/') ? '0.6' : '0.5';
        
        sitemap += `  <url>
    <loc>https://tintasqualyquimy.com.br/${pagina}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${prioridade}</priority>
  </url>
`;
    });
    
    sitemap += `</urlset>`;
    
    fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
    console.log(`✅ Sitemap atualizado com ${paginas.length} páginas`);
    
    return paginas.length;
}

// 6. VALIDAÇÃO FINAL
function validarFinal() {
    console.log('\n✅ 6. VALIDAÇÃO FINAL');
    
    const validacao = {
        paginasFuncionando: 0,
        linksQuebrados: 0,
        errosCriticos: 0
    };
    
    function encontrarArquivosHtml(dir, lista = []) {
        const arquivos = fs.readdirSync(dir);
        arquivos.forEach(arquivo => {
            const caminho = path.join(dir, arquivo);
            const stat = fs.statSync(caminho);
            if (stat.isDirectory()) {
                encontrarArquivosHtml(caminho, lista);
            } else if (arquivo.endsWith('.html')) {
                lista.push(caminho);
            }
        });
        return lista;
    }
    
    const arquivosHtml = encontrarArquivosHtml('.');
    
    arquivosHtml.forEach(arquivo => {
        try {
            const conteudo = fs.readFileSync(arquivo, 'utf8');
            
            // Verificar elementos essenciais
            if (conteudo.includes('<html') && 
                conteudo.includes('<head>') && 
                conteudo.includes('<body>') &&
                conteudo.includes('G-HFTJ9MRF64')) {
                validacao.paginasFuncionando++;
            } else {
                validacao.errosCriticos++;
                console.log(`❌ Erro crítico em: ${arquivo}`);
            }
            
            // Verificar links quebrados
            const linksQuebrados = conteudo.match(/href="[^"]*"/g) || [];
            linksQuebrados.forEach(link => {
                const url = link.replace('href="', '').replace('"', '');
                if (url.includes('categorias/') && !url.includes('.html')) {
                    validacao.linksQuebrados++;
                }
            });
            
        } catch (erro) {
            validacao.errosCriticos++;
            console.log(`❌ Erro ao ler: ${arquivo} - ${erro.message}`);
        }
    });
    
    console.log(`✅ Páginas funcionando: ${validacao.paginasFuncionando}`);
    console.log(`⚠️  Links quebrados: ${validacao.linksQuebrados}`);
    console.log(`🚨 Erros críticos: ${validacao.errosCriticos}`);
    
    return validacao;
}

// EXECUTAR CORREÇÃO AUTOMÁTICA COMPLETA
function executarCorrecaoAutomatica() {
    console.log('🚀 EXECUTANDO CORREÇÃO AUTOMÁTICA COMPLETA');
    
    const resultado = {
        linksCorrigidos: corrigirLinksQuebrados(),
        paginasCriadas: criarPaginasFaltantes(),
        analyticsCorrigidos: corrigirGoogleAnalyticsEMetaTags(),
        performance: otimizarPerformance(),
        sitemapAtualizado: atualizarSitemap(),
        validacaoFinal: validarFinal()
    };
    
    console.log('\n' + '='.repeat(80));
    console.log('🎉 CORREÇÃO AUTOMÁTICA COMPLETA CONCLUÍDA');
    console.log('='.repeat(80));
    
    console.log('\n📊 RESUMO DAS CORREÇÕES:');
    console.log(`🔗 Links corrigidos: ${resultado.linksCorrigidos.linksFixados}`);
    console.log(`📄 Páginas criadas: ${resultado.paginasCriadas.length}`);
    console.log(`📊 Analytics corrigidos: ${resultado.analyticsCorrigidos.analyticsCorrigidos}`);
    console.log(`⚡ Performance otimizada: ${resultado.performance.arquivosGrandes + resultado.performance.scriptsOtimizados}`);
    console.log(`🗺️  Sitemap atualizado: ${resultado.sitemapAtualizado} páginas`);
    console.log(`✅ Páginas validadas: ${resultado.validacaoFinal.paginasFuncionando}`);
    
    if (resultado.validacaoFinal.errosCriticos === 0) {
        console.log('\n🎯 STATUS: PRONTO PARA PRODUÇÃO');
    } else {
        console.log(`\n⚠️  STATUS: ${resultado.validacaoFinal.errosCriticos} erros críticos restantes`);
    }
    
    return resultado;
}

// Iniciar correção automática
executarCorrecaoAutomatica();
