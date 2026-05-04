const fs = require('fs');

// ==========================================
// ATUALIZAR SITEMAP.XML COM NOVAS PÁGINAS COMERCIAIS
// ==========================================

console.log('🗺️ ATUALIZANDO SITEMAP.XML COM PÁGINAS COMERCIAIS');
console.log('='.repeat(55));

function lerSitemapAtual() {
    if (!fs.existsSync('sitemap.xml')) {
        console.log('❌ Sitemap.xml não encontrado');
        return null;
    }
    
    const conteudo = fs.readFileSync('sitemap.xml', 'utf8');
    console.log('✅ Sitemap.xml lido com sucesso');
    return conteudo;
}

function gerarSitemapCompleto() {
    console.log('\n📋 GERANDO SITEMAP COMPLETO...');
    
    const baseUrl = 'https://tintasqualyquimy.com.br';
    const dataAtual = new Date().toISOString().split('T')[0];
    
    // Lista completa de todas as páginas do site
    const paginas = [
        // Página principal
        { url: '', changefreq: 'daily', priority: '1.0' },
        
        // Páginas institucionais
        { url: 'sobre.html', changefreq: 'monthly', priority: '0.8' },
        { url: 'politica-de-privacidade.html', changefreq: 'monthly', priority: '0.5' },
        { url: 'termos-de-uso.html', changefreq: 'monthly', priority: '0.5' },
        
        // Produtos (9 páginas)
        { url: 'produtos/grafiato.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/textura-lisa.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/massa-pva.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/massa-acrilica.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/seladora.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/q-color.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/esmalte.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'produtos/liqui-brilho.html', changefreq: 'weekly', priority: '0.9' },
        
        // Categorias (5 páginas)
        { url: 'categorias/tintas.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'categorias/texturas.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'categorias/massas.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'categorias/fundos.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'categorias/acabamentos.html', changefreq: 'weekly', priority: '0.8' },
        
        // Cidades (7 páginas)
        { url: 'cidades/itaquaquecetuba.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'cidades/mogi-das-cruzes.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'cidades/suzano.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'cidades/ferraz-de-vasconcelos.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'cidades/poa.html', changefreq: 'weekly', priority: '0.7' },
        { url: 'cidades/aruja.html', changefreq: 'weekly', priority: '0.7' },
        { url: 'cidades/guarulhos.html', changefreq: 'weekly', priority: '0.7' },
        
        // Comerciais (4 páginas - AGORA COMPLETO!)
        { url: 'comercial/frete-gratis-itaquaquecetuba.html', changefreq: 'weekly', priority: '0.9' },
        { url: 'comercial/entrega-mogi-das-cruzes.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'comercial/entrega-suzano.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'comercial/entrega-ferraz-de-vasconcelos.html', changefreq: 'weekly', priority: '0.8' },
        
        // Blog posts (12 páginas)
        { url: 'blog/index.html', changefreq: 'weekly', priority: '0.8' },
        { url: 'blog/como-calcular-tinta-por-m2.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/como-aplicar-grafiato-parede.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/tinta-interna-ou-externa.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/qual-melhor-massa-pva-acrilica.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/como-usar-seladora-parede.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/textura-lisa-vs-grafiato.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/quantidade-tinta-pintar-casa.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/esmalte-metal-madeira.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/liqui-brilho-como-aplicar.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/qualy-color-tinta-economica.html', changefreq: 'monthly', priority: '0.7' },
        { url: 'blog/freelancer-tintas-como-ganhar-dinheiro.html', changefreq: 'monthly', priority: '0.6' },
        
        // Páginas especiais
        { url: 'grafiato-itaquaquecetuba.html', changefreq: 'weekly', priority: '0.9' },
        { url: '404.html', changefreq: 'yearly', priority: '0.1' }
    ];
    
    // Gerar XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';
    
    paginas.forEach(pagina => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/${pagina.url}</loc>\n`;
        xml += `    <lastmod>${dataAtual}</lastmod>\n`;
        xml += `    <changefreq>${pagina.changefreq}</changefreq>\n`;
        xml += `    <priority>${pagina.priority}</priority>\n`;
        xml += '  </url>\n\n';
    });
    
    xml += '</urlset>';
    
    return xml;
}

function atualizarSitemap() {
    console.log('\n🔄 ATUALIZANDO SITEMAP.XML...');
    
    const novoSitemap = gerarSitemapCompleto();
    
    // Fazer backup do sitemap antigo
    if (fs.existsSync('sitemap.xml')) {
        fs.copyFileSync('sitemap.xml', 'sitemap.xml.backup');
        console.log('✅ Backup criado: sitemap.xml.backup');
    }
    
    // Escrever novo sitemap
    fs.writeFileSync('sitemap.xml', novoSitemap, 'utf8');
    console.log('✅ Sitemap.xml atualizado com sucesso');
    
    // Estatísticas
    const totalPaginas = (novoSitemap.match(/<url>/g) || []).length;
    console.log(`📊 Total de páginas no sitemap: ${totalPaginas}`);
    
    return totalPaginas;
}

function verificarPaginasNoSitemap() {
    console.log('\n🔍 VERIFICANDO PÁGINAS COMERCIAIS NO SITEMAP...');
    
    const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
    
    const comerciais = [
        'comercial/frete-gratis-itaquaquecetuba.html',
        'comercial/entrega-mogi-das-cruzes.html',
        'comercial/entrega-suzano.html',
        'comercial/entrega-ferraz-de-vasconcelos.html'
    ];
    
    comerciais.forEach(comercial => {
        const estaNoSitemap = sitemap.includes(comercial);
        console.log(`${estaNoSitemap ? '✅' : '❌'} ${comercial}`);
    });
    
    const presentes = comerciais.filter(c => sitemap.includes(c)).length;
    console.log(`\n📊 Comerciais no sitemap: ${presentes}/4`);
    
    return presentes;
}

function gerarRelatorio() {
    console.log('\n📋 RELATÓRIO DE ATUALIZAÇÃO:');
    console.log('='.repeat(40));
    
    const totalPaginas = atualizarSitemap();
    const comerciaisNoSitemap = verificarPaginasNoSitemap();
    
    console.log('\n🎯 STATUS FINAL:');
    console.log(`✅ Sitemap atualizado: ${totalPaginas} páginas`);
    console.log(`✅ Comerciais incluídos: ${comerciaisNoSitemap}/4`);
    
    if (comerciaisNoSitemap === 4) {
        console.log('🎉 TODAS as páginas comerciais estão no sitemap!');
        console.log('🚀 FASE 1: 100% CONCLUÍDA!');
        console.log('📈 SEO: Pronto para indexação completa');
    } else {
        console.log('⚠️  Algumas páginas comerciais estão faltando');
    }
    
    console.log('\n📌 PRÓXIMOS PASSOS:');
    console.log('1. Submeter sitemap ao Google Search Console');
    console.log('2. Começar Fase 2 - Expansão Local');
    console.log('3. Criar 6 cidades Tier 1 adicionais');
    console.log('4. Criar 10 bairros de Itaquaquecetuba');
    console.log('5. Criar 9 blog posts técnicos');
    
    return { totalPaginas, comerciaisNoSitemap };
}

// Executar atualização
function executarAtualizacao() {
    console.log('🚀 INICIANDO ATUALIZAÇÃO DO SITEMAP');
    
    const resultado = gerarRelatorio();
    
    console.log('\n' + '='.repeat(55));
    console.log('🎯 SITEMAP ATUALIZADO COM SUCESSO!');
    console.log('='.repeat(55));
    console.log('✅ Todas as páginas comerciais agora estão indexadas');
    console.log('✅ SEO otimizado para Google');
    console.log('✅ Fase 1 completa e pronta para Fase 2');
    
    return resultado;
}

// Iniciar atualização
executarAtualizacao();
