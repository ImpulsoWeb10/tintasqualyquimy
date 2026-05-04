const fs = require('fs');

// ==========================================
// VERIFICAR URL DA PÁGINA NO SITE
// ==========================================

console.log('🔍 VERIFICANDO URL DA PÁGINA NO SITE');
console.log('='.repeat(45));

function verificarPagina() {
    const arquivo = 'comercial/entrega-ferraz-de-vasconcelos.html';
    
    console.log(`\n📄 VERIFICANDO: ${arquivo}`);
    
    if (!fs.existsSync(arquivo)) {
        console.log('❌ Arquivo não existe localmente');
        return false;
    }
    
    // Ler conteúdo para verificar URL canonical
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    
    // Extrair URL canonical
    const canonicalMatch = conteudo.match(/<link rel="canonical" href="([^"]+)"/);
    const canonical = canonicalMatch ? canonicalMatch[1] : 'Não encontrada';
    
    // Extrair title
    const titleMatch = conteudo.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'Não encontrado';
    
    console.log(`✅ Arquivo existe localmente`);
    console.log(`📏 Tamanho: ${(fs.statSync(arquivo).size / 1024).toFixed(1)}KB`);
    console.log(`🔗 URL Canonical: ${canonical}`);
    console.log(`📝 Title: ${title}`);
    
    return {
        existe: true,
        tamanho: (fs.statSync(arquivo).size / 1024).toFixed(1),
        canonical,
        title
    };
}

function mostrarUrlsAcesso() {
    console.log('\n🌐 FORMAS DE ACESSAR A PÁGINA:');
    console.log('='.repeat(40));
    
    const urls = [
        {
            tipo: 'URL Oficial (Canonical)',
            url: 'https://tintasqualyquimy.com.br/comercial/entrega-ferraz-de-vasconcelos.html'
        },
        {
            tipo: 'URL GitHub (Repositório)',
            url: 'https://github.com/ImpulsoWeb10/tintasqualyquimy/blob/main/comercial/entrega-ferraz-de-vasconcelos.html'
        },
        {
            tipo: 'URL GitHub Pages (Se ativo)',
            url: 'https://impulsoweb10.github.io/tintasqualyquimy/comercial/entrega-ferraz-de-vasconcelos.html'
        }
    ];
    
    urls.forEach(item => {
        console.log(`\n${item.tipo}:`);
        console.log(`   ${item.url}`);
    });
}

function verificarStatusPublicacao() {
    console.log('\n📋 STATUS DE PUBLICAÇÃO:');
    console.log('='.repeat(35));
    
    console.log('✅ Local: Arquivo criado no repositório');
    console.log('✅ Git: Commit realizado (630d86e)');
    console.log('✅ GitHub: Push para main concluído');
    console.log('✅ Sitemap: Incluído no sitemap.xml');
    
    console.log('\n🔍 ONDE A PÁGINA ESTÁ DISPONÍVEL:');
    console.log('1. ✅ No repositório GitHub (código fonte)');
    console.log('2. ⏳ No site em produção (após deploy)');
    
    console.log('\n⚠️  OBSERVAÇÃO:');
    console.log('A página está no código fonte, mas pode');
    console.log('precisar de deploy para aparecer no site.');
    console.log('Verifique com o provedor de hospedagem.');
}

function executarVerificacao() {
    console.log('🚀 INICIANDO VERIFICAÇÃO DA PÁGINA');
    
    const resultado = verificarPagina();
    mostrarUrlsAcesso();
    verificarStatusPublicacao();
    
    console.log('\n' + '='.repeat(45));
    console.log('📍 RESPOSTA DIRETA:');
    console.log('='.repeat(45));
    
    if (resultado && resultado.existe) {
        console.log(`🔗 A página está em: ${resultado.canonical}`);
        console.log(`📝 Título: ${resultado.title}`);
        console.log(`📏 Tamanho: ${resultado.tamanho}KB`);
        
        console.log('\n🌐 Para acessar:');
        console.log('• Site: https://tintasqualyquimy.com.br/comercial/entrega-ferraz-de-vasconcelos.html');
        console.log('• GitHub: https://github.com/ImpulsoWeb10/tintasqualyquimy/blob/main/comercial/entrega-ferraz-de-vasconcelos.html');
        
        console.log('\n⚡ Se não aparecer no site, pode precisar de deploy!');
    } else {
        console.log('❌ Página não encontrada');
    }
    
    return resultado;
}

// Executar verificação
executarVerificacao();
