const fs = require('fs');

// ==========================================
// CORREÇÃO CRÍTICA: ROBOTS META TAG
// ==========================================

console.log('🔧 CORRIGINDO ROBOTS META TAG AUSENTE');
console.log('='.repeat(50));

function corrigirRobotsMeta() {
    console.log('\n📄 VERIFICANDO: grafiato-itaquaquecetuba.html');
    
    if (!fs.existsSync('grafiato-itaquaquecetuba.html')) {
        console.log('❌ Arquivo não encontrado');
        return false;
    }
    
    let conteudo = fs.readFileSync('grafiato-itaquaquecetuba.html', 'utf8');
    
    // Verificar se já tem robots meta tag
    if (conteudo.includes('<meta name="robots" content="index, follow">')) {
        console.log('✅ Robots meta tag já existe');
        return true;
    }
    
    // Adicionar robots meta tag após charset
    const charsetRegex = /<meta charset="UTF-8" \/>/;
    const robotsTag = '<meta name="robots" content="index, follow" />\n  ';
    
    if (conteudo.match(charsetRegex)) {
        conteudo = conteudo.replace(charsetRegex, '$&' + robotsTag);
        console.log('✅ Robots meta tag adicionada após charset');
    } else {
        // Se não encontrar charset, adicionar após head
        const headRegex = /<head>/;
        if (conteudo.match(headRegex)) {
            conteudo = conteudo.replace(headRegex, '$&\n  <meta name="robots" content="index, follow" />');
            console.log('✅ Robots meta tag adicionada após <head>');
        }
    }
    
    fs.writeFileSync('grafiato-itaquaquecetuba.html', conteudo, 'utf8');
    console.log('💾 Arquivo salvo com robots meta tag');
    
    return true;
}

// Verificar outras páginas críticas
function verificarOutrasPaginas() {
    console.log('\n📋 VERIFICANDO OUTRAS PÁGINAS CRÍTICAS...');
    
    const paginasCriticas = [
        'index.html',
        'produtos/grafiato.html',
        'categorias/tintas.html',
        'cidades/itaquaquecetuba.html'
    ];
    
    paginasCriticas.forEach(pagina => {
        if (fs.existsSync(pagina)) {
            const conteudo = fs.readFileSync(pagina, 'utf8');
            const temRobots = conteudo.includes('<meta name="robots" content="index, follow">');
            console.log(`${temRobots ? '✅' : '❌'} ${pagina}`);
        } else {
            console.log(`❌ ${pagina} - não encontrada`);
        }
    });
}

// Executar correção
function executarCorrecao() {
    console.log('🚀 INICIANDO CORREÇÃO CRÍTICA');
    
    const sucesso = corrigirRobotsMeta();
    verificarOutrasPaginas();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 CORREÇÃO CONCLUÍDA');
    console.log('='.repeat(50));
    
    if (sucesso) {
        console.log('✅ Robots meta tag adicionada');
        console.log('✅ Página pronta para indexação');
        console.log('✅ Problema crítico resolvido');
    }
    
    return sucesso;
}

// Iniciar correção
executarCorrecao();
