const fs = require('fs');

// ==========================================
// CORREÇÃO DE LINKS DOS PRODUTOS NA PÁGINA GRAFIATO
// Conforme solicitado: corrigir apenas os links dos produtos
// ==========================================

console.log('🔧 CORRIGINDO LINKS DOS PRODUTOS NA PÁGINA GRAFIATO');
console.log('='.repeat(70));

// Mapeamento correto dos produtos conforme documento mestre
const produtosCorretos = {
    'Grafiato': 'produtos/grafiato.html',
    'Textura Lisa': 'produtos/textura-lisa.html', 
    'Massa PVA': 'produtos/massa-pva.html',
    'Massa Acrílica': 'produtos/massa-acrilica.html',
    'Seladora': 'produtos/seladora.html',
    'Tinta Econômica': 'produtos/q-color.html', // Q Color é a Tinta Econômica
    'Esmalte': 'produtos/esmalte.html',
    'Liqui Brilho': 'produtos/liqui-brilho.html'
};

function corrigirLinksProdutos() {
    console.log('\n📄 LENDO ARQUIVO: grafiato-itaquaquecetuba.html');
    
    if (!fs.existsSync('grafiato-itaquaquecetuba.html')) {
        console.log('❌ Arquivo não encontrado');
        return false;
    }
    
    let conteudo = fs.readFileSync('grafiato-itaquaquecetuba.html', 'utf8');
    let modificacoes = 0;
    
    console.log('\n🔍 PROCURANDO LINKS PARA CORRIGIR...');
    
    // Corrigir links específicos encontrados no arquivo
    const correcoes = [
        // Links na seção de aplicação
        {
            de: /href="seladora\.html"/g,
            para: 'href="produtos/seladora.html"',
            descricao: 'Seladora'
        },
        {
            de: /href="liqui-brilho\.html"/g, 
            para: 'href="produtos/liqui-brilho.html"',
            descricao: 'Liqui Brilho'
        },
        
        // Links no footer
        {
            de: /href="grafiato\.html"/g,
            para: 'href="produtos/grafiato.html"',
            descricao: 'Grafiato (footer)'
        },
        {
            de: /href="textura-lisa\.html"/g,
            para: 'href="produtos/textura-lisa.html"',
            descricao: 'Textura Lisa (footer)'
        },
        {
            de: /href="massa-pva\.html"/g,
            para: 'href="produtos/massa-pva.html"',
            descricao: 'Massa PVA (footer)'
        },
        {
            de: /href="massa-acrilica\.html"/g,
            para: 'href="produtos/massa-acrilica.html"',
            descricao: 'Massa Acrílica (footer)'
        },
        {
            de: /href="seladora\.html"/g,
            para: 'href="produtos/seladora.html"',
            descricao: 'Seladora (footer)'
        },
        {
            de: /href="tinta-economica-qualy-color-uso-interno\.html"/g,
            para: 'href="produtos/q-color.html"',
            descricao: 'Tinta Econômica (footer)'
        },
        {
            de: /href="esmalte\.html"/g,
            para: 'href="produtos/esmalte.html"',
            descricao: 'Esmalte (footer)'
        },
        {
            de: /href="liqui-brilho\.html"/g,
            para: 'href="produtos/liqui-brilho.html"',
            descricao: 'Liqui Brilho (footer)'
        }
    ];
    
    // Aplicar correções
    correcoes.forEach(correcao => {
        const ocorrencias = conteudo.match(correcao.de);
        if (ocorrencias) {
            console.log(`🔧 Corrigindo: ${correcao.descricao} (${ocorrencias.length} ocorrências)`);
            conteudo = conteudo.replace(correcao.de, correcao.para);
            modificacoes += ocorrencias.length;
        }
    });
    
    // Verificar se todos os produtos estão linkados corretamente
    console.log('\n✅ VERIFICANDO TODOS OS PRODUTOS...');
    Object.entries(produtosCorretos).forEach(([produto, link]) => {
        if (conteudo.includes(link)) {
            console.log(`✅ ${produto}: ${link} ✓`);
        } else {
            console.log(`⚠️  ${produto}: ${link} - não encontrado no arquivo`);
        }
    });
    
    // Salvar arquivo modificado
    if (modificacoes > 0) {
        fs.writeFileSync('grafiato-itaquaquecetuba.html', conteudo, 'utf8');
        console.log(`\n💾 Arquivo salvo com ${modificacoes} correções`);
    } else {
        console.log('\n💾 Nenhuma correção necessária');
    }
    
    return modificacoes;
}

// Verificar se as páginas de produtos existem
function verificarPaginasProdutos() {
    console.log('\n📋 VERIFICANDO SE AS PÁGINAS DE PRODUTOS EXISTEM...');
    
    Object.entries(produtosCorretos).forEach(([produto, link]) => {
        if (fs.existsSync(link)) {
            console.log(`✅ ${produto}: ${link} - EXISTE`);
        } else {
            console.log(`❌ ${produto}: ${link} - NÃO EXISTE (404)`);
        }
    });
}

// Executar correções
function executarCorrecao() {
    console.log('🚀 INICIANDO CORREÇÃO DE LINKS DOS PRODUTOS');
    
    const modificacoes = corrigirLinksProdutos();
    verificarPaginasProdutos();
    
    console.log('\n' + '='.repeat(70));
    console.log('🎉 CORREÇÃO DE LINKS CONCLUÍDA');
    console.log('='.repeat(70));
    console.log(`📊 Total de correções: ${modificacoes}`);
    console.log('📍 Apenas os links dos produtos foram corrigidos');
    console.log('🚫 Nenhum outro conteúdo foi alterado');
    
    return modificacoes;
}

// Iniciar correção
executarCorrecao();
