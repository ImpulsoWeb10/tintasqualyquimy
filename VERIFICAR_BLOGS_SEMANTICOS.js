const fs = require('fs');

// ==========================================
// VERIFICANDO BLOGS EXISTENTES VS 9 ESPERADOS
// ==========================================

console.log('📝 VERIFICANDO BLOGS EXISTENTES VS 9 ESPERADOS');
console.log('='.repeat(55));

function verificarPastaBlog() {
    console.log('\n📁 VERIFICANDO PASTA BLOG...');
    
    if (!fs.existsSync('blog')) {
        console.log('❌ Pasta blog não encontrada');
        return [];
    }
    
    const arquivos = fs.readdirSync('blog');
    const htmlFiles = arquivos.filter(arquivo => arquivo.endsWith('.html'));
    
    console.log(`✅ Pasta blog encontrada`);
    console.log(`📊 Arquivos HTML: ${htmlFiles.length}`);
    
    return htmlFiles;
}

function verificarBlogsExistentes() {
    console.log('\n📄 VERIFICANDO BLOGS EXISTENTES...');
    
    const htmlFiles = verificarPastaBlog();
    
    console.log('\n📋 Lista de blogs encontrados:');
    
    const blogsExistentes = [];
    
    htmlFiles.forEach((arquivo, index) => {
        const caminho = `blog/${arquivo}`;
        const stats = fs.statSync(caminho);
        const tamanho = (stats.size / 1024).toFixed(1);
        
        console.log(`${index + 1}. ✅ ${arquivo} - ${tamanho}KB`);
        blogsExistentes.push(arquivo);
    });
    
    console.log(`\n📊 Total de blogs existentes: ${blogsExistentes.length}`);
    return blogsExistentes;
}

function verificarBlogsEsperados() {
    console.log('\n🎯 VERIFICANDO BLOGS ESPERADOS (Documento Mestre)...');
    
    // Blogs esperados conforme Documento Mestre
    const blogsEsperados = [
        'como-calcular-tinta-por-m2.html',
        'como-aplicar-grafiato-parede.html',
        'tinta-interna-ou-externa.html',
        'qual-melhor-massa-pva-acrilica.html',
        'como-usar-seladora-parede.html',
        'textura-lisa-vs-grafiato.html',
        'quantidade-tinta-pintar-casa.html',
        'esmalte-metal-madeira.html',
        'liqui-brilho-como-aplicar.html',
        'qualy-color-tinta-economica.html',
        'freelancer-tintas-como-ganhar-dinheiro.html',
        'index.html' // página principal do blog
    ];
    
    console.log('\n📋 Blogs esperados (12):');
    blogsEsperados.forEach((blog, index) => {
        console.log(`${index + 1}. 📝 ${blog}`);
    });
    
    console.log(`\n📊 Total de blogs esperados: ${blogsEsperados.length}`);
    return blogsEsperados;
}

function analisarDiferencas() {
    console.log('\n🔍 ANALISANDO DIFERENÇAS...');
    
    const existentes = verificarBlogsExistentes();
    const esperados = verificarBlogsEsperados();
    
    console.log('\n📋 COMPARAÇÃO:');
    console.log('='.repeat(30));
    console.log(`📊 Blogs existentes: ${existentes.length}`);
    console.log(`📊 Blogs esperados: ${esperados.length}`);
    
    // Verificar quais blogs esperados existem
    const existentesEsperados = esperados.filter(blog => existentes.includes(blog));
    const faltantes = esperados.filter(blog => !existentes.includes(blog));
    const extras = existentes.filter(blog => !esperados.includes(blog));
    
    console.log(`📊 Blogs esperados que existem: ${existentesEsperados.length}`);
    console.log(`📊 Blogs faltando: ${faltantes.length}`);
    console.log(`📊 Blogs extras: ${extras.length}`);
    
    if (faltantes.length > 0) {
        console.log('\n❌ BLOGS FALTANDO:');
        faltantes.forEach((blog, index) => {
            console.log(`${index + 1}. ❌ ${blog}`);
        });
    }
    
    if (extras.length > 0) {
        console.log('\n📋 BLOGS EXTRAS (não esperados):');
        extras.forEach((blog, index) => {
            console.log(`${index + 1}. 📋 ${blog}`);
        });
    }
    
    return {
        existentes: existentes.length,
        esperados: esperados.length,
        faltantes: faltantes.length,
        listaFaltantes: faltantes,
        extras: extras.length,
        listaExtras: extras
    };
}

function verificarSEOsemantico() {
    console.log('\n🔍 VERIFICANDO SEO SEMÂNTICO DOS BLOGS...');
    
    const htmlFiles = verificarPastaBlog();
    
    console.log('\n📋 Análise SEO Semântico:');
    
    const resultados = [];
    
    htmlFiles.forEach(arquivo => {
        const caminho = `blog/${arquivo}`;
        
        try {
            const conteudo = fs.readFileSync(caminho, 'utf8');
            
            // Verificar elementos SEO semânticos
            const temTitle = conteudo.includes('<title>');
            const temMetaDescription = conteudo.includes('name="description"');
            const temH1 = conteudo.includes('<h1>');
            const temCanonical = conteudo.includes('rel="canonical"');
            const temSchema = conteudo.includes('application/ld+json');
            const temGA4 = conteudo.includes('G-HFTJ9MRF64');
            
            const seoScore = [temTitle, temMetaDescription, temH1, temCanonical, temSchema, temGA4].filter(Boolean).length;
            
            console.log(`\n📄 ${arquivo}:`);
            console.log(`  Title: ${temTitle ? '✅' : '❌'}`);
            console.log(`  Meta Description: ${temMetaDescription ? '✅' : '❌'}`);
            console.log(`  H1: ${temH1 ? '✅' : '❌'}`);
            console.log(`  Canonical: ${temCanonical ? '✅' : '❌'}`);
            console.log(`  Schema: ${temSchema ? '✅' : '❌'}`);
            console.log(`  GA4: ${temGA4 ? '✅' : '❌'}`);
            console.log(`  📊 SEO Score: ${seoScore}/6`);
            
            resultados.push({
                arquivo,
                seoScore,
                elementos: { temTitle, temMetaDescription, temH1, temCanonical, temSchema, temGA4 }
            });
            
        } catch (error) {
            console.log(`❌ Erro ao ler ${arquivo}: ${error.message}`);
        }
    });
    
    // Calcular média SEO
    const mediaSEO = resultados.reduce((sum, r) => sum + r.seoScore, 0) / resultados.length;
    console.log(`\n📊 Média SEO Score: ${mediaSEO.toFixed(1)}/6`);
    
    return resultados;
}

function gerarPlanoCriacaoBlogs() {
    console.log('\n🔧 PLANO PARA CRIAR BLOGS FALTANTES');
    console.log('='.repeat(45));
    
    const analise = analisarDiferencas();
    const seo = verificarSEOsemantico();
    
    console.log('\n📋 SITUAÇÃO ATUAL:');
    console.log(`• Blogs existentes: ${analise.existentes}`);
    console.log(`• Blogs esperados: ${analise.esperados}`);
    console.log(`• Blogs faltando: ${analise.faltantes}`);
    console.log(`• SEO médio: ${(seo.reduce((sum, r) => sum + r.seoScore, 0) / seo.length).toFixed(1)}/6`);
    
    if (analise.faltantes > 0) {
        console.log('\n🔧 AÇÃO NECESSÁRIA:');
        console.log('1. 📝 Criar blogs faltantes');
        console.log('2. 🔍 Implementar SEO semântico completo');
        console.log('3. 📊 Verificar estrutura HTML');
        console.log('4. 🧪 Testar todos os links');
        console.log('5. 📤 Commit e push');
        
        console.log('\n📋 BLOGS QUE PRECISAM SER CRIADOS:');
        analise.listaFaltantes.forEach((blog, index) => {
            console.log(`${index + 1}. 📝 ${blog}`);
        });
        
        console.log('\n🎯 RESULTADO ESPERADO:');
        console.log('• Total de blogs: 12');
        console.log('• SEO semântico: 6/6 em todos');
        console.log('• Autoridade de conteúdo completa');
        console.log('• Ranking técnico fortalecido');
        
    } else {
        console.log('\n✅ TODOS OS BLOGS JÁ EXISTEM!');
        console.log('Verificando apenas SEO semântico...');
    }
    
    return analise;
}

function gerarRelatorioFinal() {
    console.log('\n📊 RELATÓRIO FINAL DOS BLOGS');
    console.log('='.repeat(35));
    
    const analise = gerarPlanoCriacaoBlogs();
    
    console.log('\n' + '='.repeat(55));
    console.log('🎯 RESPOSTA DIRETA AO USUÁRIO');
    console.log('='.repeat(55));
    
    if (analise.faltantes > 0) {
        console.log('VOCÊ ESTÁ CORRETO!');
        console.log('');
        console.log(`📊 Situação atual:`);
        console.log(`• Blogs existentes: ${analise.existentes}`);
        console.log(`• Blogs esperados: ${analise.esperados}`);
        console.log(`• Blogs faltando: ${analise.faltantes}`);
        console.log('');
        console.log('❌ PROBLEMA:');
        console.log('Faltam blogs para completar o documento mestre');
        console.log('');
        console.log('🔧 SOLUÇÃO:');
        console.log('Criar os blogs faltantes com SEO semântico completo');
        
    } else {
        console.log('ANÁLISE COMPLETA DOS BLOGS');
        console.log('');
        console.log(`📊 Blogs encontrados: ${analise.existentes}`);
        console.log(`📊 Status: Todos esperados presentes`);
        console.log('');
        console.log('🔍 FOCO: SEO Semântico');
    }
    
    return analise;
}

// Executar verificação completa
function executarVerificacao() {
    console.log('🚀 INICIANDO VERIFICAÇÃO COMPLETA DOS BLOGS');
    console.log('Foco: SEO Semântico + Completude');
    
    const resultado = gerarRelatorioFinal();
    
    return resultado;
}

// Iniciar verificação
executarVerificacao();
