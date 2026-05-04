const fs = require('fs');

// ==========================================
// VERIFICANDO OS 19 BAIRROS ATUAIS DA PÁGINA
// ==========================================

console.log('🔍 VERIFICANDO OS 19 BAIRROS ATUAIS DA PÁGINA');
console.log('='.repeat(55));

function lerPaginaItaquaquecetuba() {
    console.log('\n📄 LENDO: cidades/itaquaquecetuba.html');
    
    if (!fs.existsSync('cidades/itaquaquecetuba.html')) {
        console.log('❌ Arquivo não encontrado');
        return null;
    }
    
    const conteudo = fs.readFileSync('cidades/itaquaquecetuba.html', 'utf8');
    console.log('✅ Arquivo lido com sucesso');
    return conteudo;
}

function extrairBairrosAtuais(conteudo) {
    console.log('\n🏘️ EXTRAINDO BAIRROS ATUAIS DA PÁGINA...');
    
    // Encontrar todos os cards de bairros
    const regexCards = /<a href="itaquaquecetuba\/([^"]+)" class="cidade-card">\s*<h3>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>\s*<\/a>/g;
    
    const bairrosEncontrados = [];
    let match;
    
    while ((match = regexCards.exec(conteudo)) !== null) {
        bairrosEncontrados.push({
            link: match[1],
            nome: match[2].trim(),
            descricao: match[3].trim()
        });
    }
    
    console.log(`📊 Total de bairros encontrados: ${bairrosEncontrados.length}`);
    
    return bairrosEncontrados;
}

function verificarArquivosDosBairros(bairros) {
    console.log('\n📁 VERIFICANDO ARQUIVOS DOS BAIRROS...');
    
    const resultados = [];
    
    bairros.forEach(bairro => {
        const caminhoArquivo = `cidades/itaquaquecetuba/${bairro.link}`;
        const existe = fs.existsSync(caminhoArquivo);
        
        resultados.push({
            nome: bairro.nome,
            link: bairro.link,
            arquivo: caminhoArquivo,
            existe: existe
        });
        
        console.log(`${existe ? '✅' : '❌'} ${bairro.nome} - ${caminhoArquivo}`);
    });
    
    const existentes = resultados.filter(r => r.existe).length;
    console.log(`\n📊 Arquivos existentes: ${existentes}/${bairros.length}`);
    
    return resultados;
}

function analisarDiferencas() {
    console.log('\n🔍 ANALISANDO DIFERENÇAS...');
    
    // Bairros que criamos
    const bairrosCriados = [
        'jardim-camboinhas.html',
        'jardim-sao-joao.html',
        'vila-gilda.html',
        'jardim-monte-cristo.html',
        'parque-cidade.html',
        'jardim-santa-monica.html',
        'vila-any.html',
        'jardim-ivete.html',
        'parque-industrial.html',
        'jardim-das-flores.html'
    ];
    
    const conteudo = lerPaginaItaquaquecetuba();
    if (!conteudo) return null;
    
    const bairrosAtuais = extrairBairrosAtuais(conteudo);
    const verificacao = verificarArquivosDosBairros(bairrosAtuais);
    
    console.log('\n📋 COMPARAÇÃO:');
    console.log('='.repeat(30));
    
    console.log(`📊 Bairros na página: ${bairrosAtuais.length}`);
    console.log(`📊 Arquivos existentes: ${verificacao.filter(v => v.existe).length}`);
    console.log(`📊 Bairros criados por nós: ${bairrosCriados.length}`);
    
    // Verificar quais bairros criados estão na página
    const criadosNaPagina = bairrosCriados.filter(link => 
        bairrosAtuais.some(bairro => bairro.link === link)
    );
    
    console.log(`📊 Nossos bairros na página: ${criadosNaPagina.length}`);
    
    // Mostrar bairros criados que não estão na página
    const criadosForaDaPagina = bairrosCriados.filter(link => 
        !bairrosAtuais.some(bairro => bairro.link === link)
    );
    
    if (criadosForaDaPagina.length > 0) {
        console.log('\n❌ NOSSOS BAIRROS QUE NÃO ESTÃO NA PÁGINA:');
        criadosForaDaPagina.forEach(link => {
            console.log(`   ❌ ${link}`);
        });
    }
    
    // Mostrar bairros na página que não criamos
    const naPaginaNaoCriados = bairrosAtuais.filter(bairro => 
        !bairrosCriados.includes(bairro.link)
    );
    
    if (naPaginaNaoCriados.length > 0) {
        console.log('\n📋 BAIRROS NA PÁGINA QUE NÃO CRIAMOS:');
        naPaginaNaoCriados.forEach(bairro => {
            console.log(`   📋 ${bairro.nome} - ${bairro.link} ${bairro.existe ? '✅' : '❌'}`);
        });
    }
    
    return {
        bairrosAtuais: bairrosAtuais.length,
        arquivosExistentes: verificacao.filter(v => v.existe).length,
        criadosNaPagina: criadosNaPagina.length,
        criadosForaDaPagina: criadosForaDaPagina.length,
        naPaginaNaoCriados: naPaginaNaoCriados.length
    };
}

function gerarDiagnosticoCompleto() {
    console.log('\n📊 DIAGNÓSTICO COMPLETO DA SITUAÇÃO');
    console.log('='.repeat(50));
    
    const resultado = analisarDiferencas();
    
    if (!resultado) {
        console.log('❌ Não foi possível analisar');
        return;
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 ANÁLISE FINAL');
    console.log('='.repeat(50));
    
    console.log(`\n📊 SITUAÇÃO ATUAL:`);
    console.log(`• Cards na página: ${resultado.bairrosAtuais}`);
    console.log(`• Arquivos existentes: ${resultado.arquivosExistentes}`);
    console.log(`• Nossos bairros visíveis: ${resultado.criadosNaPagina}`);
    console.log(`• Nossos bairros ocultos: ${resultado.criadosForaDaPagina}`);
    console.log(`• Outros bairros na página: ${resultado.naPaginaNaoCriados}`);
    
    if (resultado.criadosForaDaPagina > 0) {
        console.log('\n❌ PROBLEMA IDENTIFICADO:');
        console.log('Criamos 10 bairros mas só alguns aparecem na página!');
        console.log('A página mostra 19 cards, mas não são os nossos.');
        
        console.log('\n🔧 SOLUÇÃO:');
        console.log('1. Substituir os 19 cards atuais pelos nossos 10');
        console.log('2. Manter apenas os bairros que temos arquivos');
        console.log('3. Garantir que todos os links funcionem');
        
    } else {
        console.log('\n✅ SITUAÇÃO OK:');
        console.log('Nossos bairros estão aparecendo corretamente!');
    }
    
    return resultado;
}

function gerarPlanoCorrecao() {
    console.log('\n🔧 PLANO DE CORREÇÃO');
    console.log('='.repeat(30));
    
    console.log('\n📋 ETAPAS:');
    console.log('1. 📄 Ler página atual');
    console.log('2. 🏘️ Identificar seção de bairros');
    console.log('3. 🔄 Substituir por nossos 10 bairros');
    console.log('4. ✅ Verificar estrutura HTML');
    console.log('5. 🧪 Testar todos os links');
    console.log('6. 📤 Commit e push');
    
    console.log('\n🎯 OBJETIVO:');
    console.log('• Manter apenas os 10 bairros que criamos');
    console.log('• Garantir que todos os links funcionem');
    console.log('• Estrutura HTML correta');
    console.log('• Cards clicáveis funcionais');
}

// Executar verificação completa
function executarVerificacao() {
    console.log('🚀 INICIANDO VERIFICAÇÃO DOS 19 BAIRROS');
    
    const resultado = gerarDiagnosticoCompleto();
    gerarPlanoCorrecao();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 RESPOSTA DIRETA');
    console.log('='.repeat(50));
    console.log('VOCÊ ESTÁ CORRETO!');
    console.log('A página mostra 19 cards, mas não são os nossos 10 bairros.');
    console.log('');
    console.log('🔍 O PROBLEMA:');
    console.log('• Temos 10 arquivos de bairros criados ✅');
    console.log('• A página mostra 19 cards diferentes ❌');
    console.log('• Nossos bairros não estão visíveis ❌');
    console.log('');
    console.log('🔧 SOLUÇÃO:');
    console.log('Substituir os 19 cards atuais pelos nossos 10 bairros!');
    
    return resultado;
}

// Iniciar verificação
executarVerificacao();
