const fs = require('fs');

// ==========================================
// CRIAÇÃO DAS 3 PÁGINAS COMERCIAIS FALTANTES
// ==========================================

console.log('🚀 CRIANDO 3 PÁGINAS COMERCIAIS FALTANTES');
console.log('='.repeat(50));

function criarPaginaComercial(cidade, arquivo) {
    console.log(`\n📄 CRIANDO: ${arquivo}`);
    
    const template = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM">
  <meta name="robots" content="index, follow">
  <title>Entrega de Tintas em ${cidade} | Frete Rápido Tintas Qualy Quimy</title>
  <meta name="description" content="Entrega rápida de tintas, massas, texturas e grafiato em ${cidade}. Frete expresso para toda região. Compre online com entrega no mesmo dia. WhatsApp (11) 95495-0044.">
  <meta name="keywords" content="entrega tintas ${cidade}, frete tintas ${cidade}, tintas ${cidade}, massas ${cidade}, grafiato ${cidade}, Qualy Quimy ${cidade}">
  <link rel="canonical" href="https://tintasqualyquimy.com.br/${arquivo}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Tintas Qualy Quimy">
  <meta property="og:title" content="Entrega de Tintas em ${cidade} | Tintas Qualy Quimy">
  <meta property="og:description" content="Entrega rápida de tintas, massas e texturas em ${cidade}. Frete expresso para toda região.">
  <meta property="og:url" content="https://tintasqualyquimy.com.br/${arquivo}">
  <meta property="og:image" content="https://tintasqualyquimy.com.br/imagens/og-qualyquimy.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="pt_BR">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Entrega de Tintas em ${cidade} | Tintas Qualy Quimy">
  <meta name="twitter:description" content="Entrega rápida de tintas, massas e texturas em ${cidade}. Frete expresso.">
  <meta name="twitter:image" content="https://tintasqualyquimy.com.br/imagens/og-qualyquimy.jpg">

  <!-- GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HFTJ9MRF64');</script>

  <!-- CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="../css/style.css" rel="stylesheet">
</head>
<body>
  <header>
    <div class="header-top">
      <div class="container">
        <p>Entrega em ${cidade} e região -</p>
        <a href="frete-gratis-itaquaquecetuba.html" class="frete-destaque">Frete Grátis em Itaquaquecetuba!</a>
      </div>
    </div>
    <div class="header-main">
      <div class="container">
        <a href="../index.html" class="logo">Qualy<span>Quimy</span></a>
        <nav class="main-nav">
          <ul>
            <li><a href="../categorias/tintas.html">Tintas</a></li>
            <li><a href="../categorias/texturas.html">Texturas</a></li>
            <li><a href="../categorias/massas.html">Massas</a></li>
            <li><a href="../categorias/fundos.html">Fundos</a></li>
            <li><a href="../categorias/acabamentos.html">Acabamentos</a></li>
            <li><a href="../cidades/${cidade.toLowerCase().replace(' ', '-')}.html">${cidade}</a></li>
            <li><a href="../blog/index.html">Blog</a></li>
          </ul>
        </nav>
        <div class="header-cta">
          <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20informações%20sobre%20entrega%20em%20${cidade}" target="_blank" class="btn-whatsapp">
            <i class="whatsapp-icon"></i>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </nav>
</header>

<div class="breadcrumb-bar">
  <div class="container">
    <a href="../index.html">Início</a><span>></span><a href="frete-gratis-itaquaquecetuba.html">Entregas</a><span>></span> ${cidade}
  </div>
</div>

<section class="hero">
  <div class="container">
    <h1>Entrega de Tintas em ${cidade}</h1>
    <p>Frete rápido e seguro para toda ${cidade}. Entregamos tintas, massas, texturas, grafiato e todos os materiais para pintura que você precisa.</p>
    <div class="hero-cta">
      <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20fazer%20um%20pedido%20para%20entrega%20em%20${cidade}" target="_blank" class="btn-primary">Pedir pelo WhatsApp</a>
      <a href="tel:+5511954950044" class="btn-secondary">Ligar Agora</a>
    </div>
  </div>
</section>

<section class="delivery-info">
  <div class="container">
    <h2>Informações de Entrega para ${cidade}</h2>
    <div class="delivery-grid">
      <div class="delivery-card">
        <div class="delivery-icon">🚚</div>
        <h3>Prazo de Entrega</h3>
        <p>Entrega em até 24 horas úteis para ${cidade}. Pedidos confirmados antes das 14h saem no mesmo dia.</p>
      </div>
      <div class="delivery-card">
        <div class="delivery-icon">💰</div>
        <h3>Valores de Frete</h3>
        <p>Frete calculado por região. Bairros centrais têm valores especiais. Consulte condições.</p>
      </div>
      <div class="delivery-card">
        <div class="delivery-icon">📦</div>
        <h3>Produtos Disponíveis</h3>
        <p>Todos os 9 produtos Qualy Quimy: Grafiato, Textura Lisa, Massas, Seladora, Q Color, Esmalte e mais.</p>
      </div>
      <div class="delivery-card">
        <div class="delivery-icon">🏠</div>
        <h3>Área de Cobertura</h3>
        <p>Atendemos todos os bairros de ${cidade} com entrega domiciliar e comercial.</p>
      </div>
    </div>
  </div>
</section>

<section class="products-delivery">
  <div class="container">
    <h2>Produtos com Entrega em ${cidade}</h2>
    <div class="products-grid">
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/grafiato-25kg-qualy-quimy.webp" alt="Grafiato 25kg Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Grafiato</h3>
          <p>5,6kg e 25kg • Interno e Externo • Antimofo</p>
          <a href="../produtos/grafiato.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/textura-lisa-25kg-qualy-quimy.webp" alt="Textura Lisa 25kg Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Textura Lisa</h3>
          <p>5,6kg e 25kg • Interno e Externo • Alta Durabilidade</p>
          <a href="../produtos/textura-lisa.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/massa-pva-25kg-qualy-quimy.webp" alt="Massa PVA 25kg Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Massa PVA</h3>
          <p>5,6kg e 25kg • Uso Interno • Acabamento Perfeito</p>
          <a href="../produtos/massa-pva.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/massa-acrilica-25kg-qualy-quimy.webp" alt="Massa Acrílica 25kg Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Massa Acrílica</h3>
          <p>5,6kg e 25kg • Interno e Externo • Flexibilidade</p>
          <a href="../produtos/massa-acrilica.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/seladora-18l-qualy-quimy.webp" alt="Seladora 18L Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Seladora</h3>
          <p>1L, 3,6L, 16L • Fundo Preparador • Máxima Aderência</p>
          <a href="../produtos/seladora.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/q-color-18l-qualy-quimy.webp" alt="Q Color 18L Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Q Color</h3>
          <p>1L, 3,6L, 18L • Tinta Econômica • Alto Rendimento</p>
          <a href="../produtos/q-color.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/esmalte-1l-qualy-quimy.webp" alt="Esmalte 1L Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Esmalte</h3>
          <p>1L • Metal e Madeira • Acabamento Duradouro</p>
          <a href="../produtos/esmalte.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
      <div class="product-card">
        <div class="product-image">
          <img src="../imagens/liqui-brilho-1l-qualy-quimy.webp" alt="Liqui Brilho 1L Tintas Qualy Quimy ${cidade}">
        </div>
        <div class="product-info">
          <h3>Liqui Brilho</h3>
          <p>1L • Verniz Protetor • Brilho Intenso</p>
          <a href="../produtos/liqui-brilho.html" class="btn-link">Ver Produto</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="how-to-order">
  <div class="container">
    <h2>Como Pedir para Entrega em ${cidade}</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <h3>Escolha os Produtos</h3>
        <p>Navegue pelo catálogo e escolha os produtos que precisa para sua obra ou projeto.</p>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <h3>Contate pelo WhatsApp</h3>
        <p>Envie seu pedido pelo WhatsApp (11) 95495-0044 com produtos e quantidade desejada.</p>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <h3>Confirme o Endereço</h3>
        <p>Informe seu endereço em ${cidade} para cálculo do frete e confirmação do prazo.</p>
      </div>
      <div class="step">
        <div class="step-number">4</div>
        <h3>Receba seu Pedido</h3>
        <p>Receba seus produtos no endereço informado dentro do prazo combinado.</p>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>Peça Agora para Entrega em ${cidade}</h2>
    <p>Atendimento rápido, produtos de qualidade e entrega segura para toda a região.</p>
    <div class="cta-buttons">
      <a href="https://wa.me/5511954950044?text=Olá!%20Quero%20fazer%20um%20pedido%20para%20entrega%20em%20${cidade}" target="_blank" class="btn-whatsapp-large">
        <i class="whatsapp-icon"></i>
        Pedir pelo WhatsApp
      </a>
      <a href="tel:+5511954950044" class="btn-phone-large">
        <i class="phone-icon"></i>
        (11) 95495-0044
      </a>
    </div>
  </div>
</section>

<section class="other-deliveries">
  <div class="container">
    <h2>Entregas em Outras Cidades</h2>
    <div class="cities-grid">
      <div class="city-card">
        <a href="frete-gratis-itaquaquecetuba.html">
          <h3>Itaquaquecetuba</h3>
          <p>Frete Grátis disponível</p>
        </a>
      </div>
      <div class="city-card">
        <a href="entrega-mogi-das-cruzes.html">
          <h3>Mogi das Cruzes</h3>
          <p>Entrega em 24h</p>
        </a>
      </div>
      <div class="city-card">
        <a href="entrega-suzano.html">
          <h3>Suzano</h3>
          <p>Entrega Expressa</p>
        </a>
      </div>
      <div class="city-card">
        <a href="entrega-ferraz-de-vasconcelos.html">
          <h3>Ferraz de Vasconcelos</h3>
          <p>Entrega Rápida</p>
        </a>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-content">
    <div class="footer-brand">
      <a href="../index.html" class="logo">Qualy<span>Quimy</span></a>
      <p>Tintas, massas, texturas e materiais para pintura em ${cidade} e toda a região de São Paulo.</p>
      <div class="contact-info">
        <p><strong>WhatsApp:</strong> (11) 95495-0044</p>
        <p><strong>Endereço:</strong> Rua Leiria, 45 - Chácara Cuiabá, Itaquaquecetuba - SP</p>
      </div>
    </div>
    
    <div class="footer-links">
      <div class="footer-column">
        <h4>Produtos</h4>
        <ul>
          <li><a href="../produtos/grafiato.html">Grafiato</a></li>
          <li><a href="../produtos/textura-lisa.html">Textura Lisa</a></li>
          <li><a href="../produtos/massa-pva.html">Massa PVA</a></li>
          <li><a href="../produtos/massa-acrilica.html">Massa Acrílica</a></li>
          <li><a href="../produtos/seladora.html">Seladora</a></li>
          <li><a href="../produtos/q-color.html">Q Color</a></li>
          <li><a href="../produtos/esmalte.html">Esmalte</a></li>
          <li><a href="../produtos/liqui-brilho.html">Liqui Brilho</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Categorias</h4>
        <ul>
          <li><a href="../categorias/tintas.html">Tintas</a></li>
          <li><a href="../categorias/texturas.html">Texturas</a></li>
          <li><a href="../categorias/massas.html">Massas</a></li>
          <li><a href="../categorias/fundos.html">Fundos</a></li>
          <li><a href="../categorias/acabamentos.html">Acabamentos</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Cidades</h4>
        <ul>
          <li><a href="../cidades/itaquaquecetuba.html">Itaquaquecetuba</a></li>
          <li><a href="../cidades/mogi-das-cruzes.html">Mogi das Cruzes</a></li>
          <li><a href="../cidades/suzano.html">Suzano</a></li>
          <li><a href="../cidades/ferraz-de-vasconcelos.html">Ferraz de Vasconcelos</a></li>
          <li><a href="../cidades/poa.html">Poá</a></li>
          <li><a href="../cidades/aruja.html">Arujá</a></li>
          <li><a href="../cidades/guarulhos.html">Guarulhos</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h4>Institucional</h4>
        <ul>
          <li><a href="../sobre.html">Sobre Nós</a></li>
          <li><a href="frete-gratis-itaquaquecetuba.html">Frete Grátis</a></li>
          <li><a href="../blog/index.html">Blog e Dicas</a></li>
          <li><a href="https://cliquetintas-art.github.io/avaliacaoqualyquimy.html/" target="_blank">Avaliações</a></li>
          <li><a href="../politica-de-privacidade.html">Política de Privacidade</a></li>
          <li><a href="../termos-de-uso.html">Termos de Uso</a></li>
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
</footer>

<!-- Schema: LocalBusiness -->
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"LocalBusiness",
  "@id":"https://tintasqualyquimy.com.br/#empresa",
  "name":"Tintas Qualy Quimy – Tintas e Materiais para Pintura",
  "url":"https://tintasqualyquimy.com.br/",
  "telephone":"+55-11-95495-0044",
  "image":"https://tintasqualyquimy.com.br/imagens/og-qualyquimy.jpg",
  "address":{
    "@type":"PostalAddress",
    "streetAddress":"R. Leiria, 45 - Chácara Cuiabá",
    "addressLocality":"Itaquaquecetuba",
    "addressRegion":"SP",
    "postalCode":"08587-100",
    "addressCountry":"BR"
  },
  "geo":{"@type":"GeoCoordinates","latitude":"-23.4869","longitude":"-46.3481"},
  "areaServed":"${cidade}",
  "openingHoursSpecification":[
    {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"18:00"},
    {"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:00","closes":"13:00"}
  ],
  "sameAs":["https://wa.me/5511954950044","https://shopee.com.br/qualyquimy"],
  "priceRange":"$$",
  "description":"Entrega rápida de tintas, massas, texturas e grafiato em ${cidade}. Frete expresso para toda região."
}
</script>

<script src="../js/main.js"></script>
</body>
</html>`;

    // Criar diretório se não existir
    if (!fs.existsSync('comercial')) {
        fs.mkdirSync('comercial', { recursive: true });
    }
    
    // Escrever arquivo
    fs.writeFileSync(arquivo, template, 'utf8');
    console.log(`✅ ${arquivo} criado com sucesso`);
    
    return true;
}

function criarTodasAsPaginas() {
    console.log('🚀 INICIANDO CRIAÇÃO DAS 3 PÁGINAS COMERCIAIS');
    
    const paginas = [
        { cidade: 'Mogi das Cruzes', arquivo: 'comercial/entrega-mogi-das-cruzes.html' },
        { cidade: 'Suzano', arquivo: 'comercial/entrega-suzano.html' },
        { cidade: 'Ferraz de Vasconcelos', arquivo: 'comercial/entrega-ferraz-de-vasconcelos.html' }
    ];
    
    let criadas = 0;
    
    paginas.forEach(pagina => {
        if (criarPaginaComercial(pagina.cidade, pagina.arquivo)) {
            criadas++;
        }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 CRIAÇÃO CONCLUÍDA');
    console.log('='.repeat(50));
    console.log(`✅ Páginas criadas: ${criadas}/3`);
    
    if (criadas === 3) {
        console.log('🎯 FASE 1: 100% CONCLUÍDA!');
        console.log('🚀 PRONTO PARA FASE 2 - EXPANSÃO LOCAL');
    }
    
    return criadas;
}

// Verificar se já existem
function verificarExistente() {
    console.log('\n🔍 VERIFICANDO SE PÁGINAS JÁ EXISTEM...');
    
    const paginas = [
        'comercial/entrega-mogi-das-cruzes.html',
        'comercial/entrega-suzano.html',
        'comercial/entrega-ferraz-de-vasconcelos.html'
    ];
    
    paginas.forEach(pagina => {
        if (fs.existsSync(pagina)) {
            console.log(`⚠️  ${pagina} - JÁ EXISTE`);
        } else {
            console.log(`❌ ${pagina} - PRECISA CRIAR`);
        }
    });
}

// Executar criação
function executarCriacao() {
    verificarExistente();
    const resultado = criarTodasAsPaginas();
    
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Atualizar sitemap.xml com novas páginas');
    console.log('2. Começar Fase 2 - Expansão Local');
    console.log('3. Criar 6 cidades Tier 1 adicionais');
    console.log('4. Criar 10 bairros de Itaquaquecetuba');
    console.log('5. Criar 9 blog posts técnicos');
    
    return resultado;
}

// Iniciar criação
executarCriacao();
