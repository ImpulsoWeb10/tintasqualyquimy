const fs = require('fs');

// ==========================================
// CORREÇÃO DOS 4 ERROS CRÍTICOS RESTANTES
// ==========================================

console.log('🔧 CORRIGINDO OS 4 ERROS CRÍTICOS RESTANTES');
console.log('='.repeat(60));

// 1. Corrigir comoaplicar/index.html
function corrigirComoaplicarIndex() {
    console.log('\n📄 1. CORRIGINDO: comoaplicar/index.html');
    
    if (!fs.existsSync('comoaplicar/index.html')) {
        console.log('❌ Arquivo não existe');
        return false;
    }
    
    let conteudo = fs.readFileSync('comoaplicar/index.html', 'utf8');
    
    // Verificar se tem estrutura HTML completa
    if (!conteudo.includes('<html') || !conteudo.includes('<head>') || !conteudo.includes('<body>')) {
        // Criar estrutura HTML básica
        const estruturaBasica = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM">
  <meta name="robots" content="index, follow">
  <title>Como Aplicar Tintas Qualy Quimy | Guias e Tutoriais</title>
  <meta name="description" content="Guias completos de como aplicar tintas, grafiato, texturas e massas Qualy Quimy. Tutoriais passo a passo para profissionais e DIY.">
  <link rel="canonical" href="https://tintasqualyquimy.com.br/comoaplicar/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="../css/style.css" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>
</head>
<body>
  <header>
    <div class="header-top">
      Entrega em Itaquaquecetuba, Mogi das Cruzes, Suzano e região -
      <a href="../comercial/frete-gratis-itaquaquecetuba.html">Frete Grátis disponível!</a>
    </div>
    <div class="header-main">
      <a href="../index.html" class="logo">Qualy<span>Quimy</span></a>
      <nav>
        <ul>
          <li><a href="../categorias/tintas.html">Tintas</a></li>
          <li><a href="../categorias/texturas.html">Texturas</a></li>
          <li><a href="../categorias/massas.html">Massas</a></li>
          <li><a href="../categorias/fundos.html">Fundos</a></li>
          <li><a href="../categorias/acabamentos.html">Acabamentos</a></li>
          <li><a href="../cidades/itaquaquecetuba.html">Cidades</a></li>
          <li><a href="../blog/index.html">Blog</a></li>
        </ul>
      </nav>
      <div class="header-cta">
        <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20informações%20sobre%20tintas%20Qualy%20Quimy" target="_blank" class="btn-whats">WhatsApp</a>
      </div>
    </div>
  </header>
  
  <div class="breadcrumb-bar">
    <div class="container">
      <a href="../index.html">Início</a><span>></span> Como Aplicar
    </div>
  </div>

  <section class="hero">
    <div class="container">
      <h1>Como Aplicar Tintas Qualy Quimy</h1>
      <p>Guias completos e tutoriais passo a passo para aplicar nossos produtos como um profissional.</p>
    </div>
  </section>

  <section class="guides-grid">
    <div class="container">
      <h2>Guias de Aplicação</h2>
      <div class="grid">
        <div class="guide-card">
          <div class="guide-icon">
            <img src="../imagens/grafiato-icon.webp" alt="Grafiato">
          </div>
          <h3>Como Aplicar Grafiato</h3>
          <p>Tutorial completo de aplicação de grafiato em paredes e fachadas.</p>
          <a href="grafiato.html" class="btn-guide">Ver Guia</a>
        </div>
        
        <div class="guide-card">
          <div class="guide-icon">
            <img src="../imagens/tinta-icon.webp" alt="Tinta">
          </div>
          <h3>Como Pintar Paredes</h3>
          <p>Guia passo a passo para pintura interna com tintas Qualy Quimy.</p>
          <a href="pintar-paredes.html" class="btn-guide">Ver Guia</a>
        </div>
        
        <div class="guide-card">
          <div class="guide-icon">
            <img src="../imagens/textura-icon.webp" alt="Textura">
          </div>
          <h3>Como Aplicar Texturas</h3>
          <p>Técnicas de aplicação de texturas lisa e projetada.</p>
          <a href="texturas.html" class="btn-guide">Ver Guia</a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <a href="../index.html" class="logo">Qualy<span>Quimy</span></a>
        <p>Tintas, massas, texturas e materiais para pintura em Itaquaquecetuba e toda a região de São Paulo.</p>
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h4>Guias</h4>
          <ul>
            <li><a href="grafiato.html">Grafiato</a></li>
            <li><a href="pintar-paredes.html">Pintar Paredes</a></li>
            <li><a href="texturas.html">Texturas</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Institucional</h4>
          <ul>
            <li><a href="../sobre.html">Sobre Nós</a></li>
            <li><a href="../politica-de-privacidade.html">Política de Privacidade</a></li>
            <li><a href="../termos-de-uso.html">Termos de Uso</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Tintas Qualy Quimy. Todos os direitos reservados.</p>
      <p>Desenvolvido por <a href="https://impulsoweb10.com.br" target="_blank">ImpulsoWeb10</a></p>
    </div>
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>`;
        
        fs.writeFileSync('comoaplicar/index.html', estruturaBasica, 'utf8');
        console.log('✅ Estrutura HTML criada para comoaplicar/index.html');
        return true;
    }
    
    // Adicionar Analytics se não tiver
    if (!conteudo.includes('G-HFTJ9MRF64')) {
        const analytics = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>`;
        
        if (conteudo.includes('</head>')) {
            conteudo = conteudo.replace('</head>', `${analytics}\n</head>`);
        }
        
        fs.writeFileSync('comoaplicar/index.html', conteudo, 'utf8');
        console.log('✅ Analytics adicionado a comoaplicar/index.html');
    }
    
    return true;
}

// 2. Corrigir components/footer.html
function corrigirComponentsFooter() {
    console.log('\n📄 2. CORRIGINDO: components/footer.html');
    
    if (!fs.existsSync('components/footer.html')) {
        console.log('❌ Arquivo não existe');
        return false;
    }
    
    let conteudo = fs.readFileSync('components/footer.html', 'utf8');
    
    // Verificar se é um componente (não página completa)
    if (!conteudo.includes('<footer>')) {
        // Criar componente footer padrão
        const footerPadrao = `<footer>
  <div class="footer-content">
    <div class="footer-brand">
      <a href="index.html" class="logo">Qualy<span>Quimy</span></a>
      <p>Tintas, massas, texturas e materiais para pintura em Itaquaquecetuba e toda a região de São Paulo.</p>
      <div class="contact-info">
        <p><strong>WhatsApp:</strong> (11) 95495-0044</p>
        <p><strong>Endereço:</strong> Rua Leiria, 45 - Chácara Cuiabá, Itaquaquecetuba - SP</p>
      </div>
    </div>
    
    <div class="footer-links">
      <div class="footer-column">
        <h4>Produtos</h4>
        <ul>
          <li><a href="produtos/grafiato.html">Grafiato</a></li>
          <li><a href="produtos/textura-lisa.html">Textura Lisa</a></li>
          <li><a href="produtos/massa-pva.html">Massa PVA</a></li>
          <li><a href="produtos/massa-acrilica.html">Massa Acrílica</a></li>
          <li><a href="produtos/seladora.html">Seladora</a></li>
          <li><a href="produtos/q-color.html">Q Color</a></li>
          <li><a href="produtos/esmalte.html">Esmalte</a></li>
          <li><a href="produtos/liqui-brilho.html">Liqui Brilho</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Categorias</h4>
        <ul>
          <li><a href="categorias/tintas.html">Tintas</a></li>
          <li><a href="categorias/texturas.html">Texturas</a></li>
          <li><a href="categorias/massas.html">Massas</a></li>
          <li><a href="categorias/fundos.html">Fundos</a></li>
          <li><a href="categorias/acabamentos.html">Acabamentos</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Cidades</h4>
        <ul>
          <li><a href="cidades/itaquaquecetuba.html">Itaquaquecetuba</a></li>
          <li><a href="cidades/mogi-das-cruzes.html">Mogi das Cruzes</a></li>
          <li><a href="cidades/suzano.html">Suzano</a></li>
          <li><a href="cidades/ferraz-de-vasconcelos.html">Ferraz de Vasconcelos</a></li>
          <li><a href="cidades/poa.html">Poá</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Institucional</h4>
        <ul>
          <li><a href="sobre.html">Sobre Nós</a></li>
          <li><a href="comercial/frete-gratis-itaquaquecetuba.html">Frete Grátis</a></li>
          <li><a href="blog/index.html">Blog e Dicas</a></li>
          <li><a href="https://cliquetintas-art.github.io/avaliacaoqualyquimy.html/" target="_blank">Avaliações</a></li>
          <li><a href="politica-de-privacidade.html">Política de Privacidade</a></li>
          <li><a href="termos-de-uso.html">Termos de Uso</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; 2024 Tintas Qualy Quimy. Todos os direitos reservados.</p>
      <p>Desenvolvido por <a href="https://impulsoweb10.com.br" target="_blank">ImpulsoWeb10</a></p>
    </div>
  </div>
</footer>`;
        
        fs.writeFileSync('components/footer.html', footerPadrao, 'utf8');
        console.log('✅ Componente footer criado');
        return true;
    }
    
    return true;
}

// 3. Corrigir components/header.html
function corrigirComponentsHeader() {
    console.log('\n📄 3. CORRIGINDO: components/header.html');
    
    if (!fs.existsSync('components/header.html')) {
        console.log('❌ Arquivo não existe');
        return false;
    }
    
    let conteudo = fs.readFileSync('components/header.html', 'utf8');
    
    // Verificar se é um componente (não página completa)
    if (!conteudo.includes('<header>')) {
        // Criar componente header padrão
        const headerPadrao = `<header>
  <div class="header-top">
    <div class="container">
      <p>Entrega em Itaquaquecetuba, Mogi das Cruzes, Suzano e região -</p>
      <a href="comercial/frete-gratis-itaquaquecetuba.html" class="frete-destaque">Frete Grátis disponível!</a>
    </div>
  </div>
  
  <div class="header-main">
    <div class="container">
      <a href="index.html" class="logo">Qualy<span>Quimy</span></a>
      
      <nav class="main-nav">
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
        <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20informações%20sobre%20tintas%20Qualy%20Quimy" target="_blank" class="btn-whatsapp">
          <i class="whatsapp-icon"></i>
          WhatsApp
        </a>
      </div>
      
      <button class="mobile-menu-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
  
  <nav class="mobile-nav">
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
</header>`;
        
        fs.writeFileSync('components/header.html', headerPadrao, 'utf8');
        console.log('✅ Componente header criado');
        return true;
    }
    
    return true;
}

// 4. Corrigir grafiato-itaquaquecetuba.html (página protegida)
function corrigirGrafiatoItaquaquecetuba() {
    console.log('\n📄 4. CORRIGINDO: grafiato-itaquaquecetuba.html (PÁGINA PROTEGIDA)');
    
    if (!fs.existsSync('grafiato-itaquaquecetuba.html')) {
        console.log('❌ Arquivo não existe');
        return false;
    }
    
    let conteudo = fs.readFileSync('grafiato-itaquaquecetuba.html', 'utf8');
    
    // Verificar elementos essenciais sem modificar o conteúdo
    let precisaCorrigir = false;
    
    if (!conteudo.includes('G-HFTJ9MRF64')) {
        // Adicionar Analytics sem modificar o resto
        const analytics = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>`;
        
        if (conteudo.includes('</head>')) {
            conteudo = conteudo.replace('</head>', `${analytics}\n</head>`);
            precisaCorrigir = true;
        }
    }
    
    if (!conteudo.includes('Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM')) {
        const metaVerification = `<meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM">`;
        
        if (conteudo.includes('<head>')) {
            conteudo = conteudo.replace('<head>', `<head>\n  ${metaVerification}`);
            precisaCorrigir = true;
        }
    }
    
    if (precisaCorrigir) {
        fs.writeFileSync('grafiato-itaquaquecetuba.html', conteudo, 'utf8');
        console.log('✅ Analytics e meta verification adicionados (sem modificar conteúdo)');
    } else {
        console.log('✅ Página já está correta');
    }
    
    return true;
}

// Executar correções
function executarCorrecoesCriticas() {
    console.log('🚀 EXECUTANDO CORREÇÕES DOS ERROS CRÍTICOS');
    
    const resultados = {
        comoaplicar: corrigirComoaplicarIndex(),
        footer: corrigirComponentsFooter(),
        header: corrigirComponentsHeader(),
        grafiato: corrigirGrafiatoItaquaquecetuba()
    };
    
    const corrigidos = Object.values(resultados).filter(r => r).length;
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 CORREÇÕES CRÍTICAS CONCLUÍDAS');
    console.log('='.repeat(60));
    console.log(`✅ Arquivos corrigidos: ${corrigidos}/4`);
    
    if (corrigidos === 4) {
        console.log('🎯 STATUS: TODOS OS ERROS CRÍTICOS CORRIGIDOS');
    } else {
        console.log(`⚠️  STATUS: ${4 - corrigidos} erros restantes`);
    }
    
    return resultados;
}

// Iniciar correções
executirCorrecoesCriticas();
