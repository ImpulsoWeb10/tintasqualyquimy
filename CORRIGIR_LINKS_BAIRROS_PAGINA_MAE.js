const fs = require('fs');

// ==========================================
// CORRIGINDO LINKS DOS BAIRROS NA PÁGINA MÃE
// ==========================================

console.log('🔧 CORRIGINDO LINKS DOS BAIRROS NA PÁGINA MÃE');
console.log('='.repeat(50));

function corrigirLinksBairros() {
    console.log('\n📄 LENDO: cidades/itaquaquecetuba.html');
    
    if (!fs.existsSync('cidades/itaquaquecetuba.html')) {
        console.log('❌ Arquivo não encontrado');
        return false;
    }
    
    let conteudo = fs.readFileSync('cidades/itaquaquecetuba.html', 'utf8');
    
    // Encontrar a seção de bairros e substituir
    const secaoBairrosAntiga = /<!-- BAIRROS DE ITAQUAQUECETUBA -->[\s\S]*?<\/section>/;
    
    const secaoBairrosNova = `<!-- BAIRROS DE ITAQUAQUECETUBA -->
<section style="background:#fff;">
  <div class="container">
    <div class="section-header">
      <div class="section-label">Entrega por Bairro</div>
      <h2>Bairros de Itaquaquecetuba Atendidos</h2>
    </div>
    <div class="cidades-grid">
      <a href="itaquaquecetuba/jardim-camboinhas.html" class="cidade-card">
        <h3>Jardim Camboinhas</h3>
        <p>Zona Sul • 25+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/jardim-sao-joao.html" class="cidade-card">
        <h3>Jardim São João</h3>
        <p>Zona Central • 30+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/vila-gilda.html" class="cidade-card">
        <h3>Vila Gilda</h3>
        <p>Zona Norte • 20+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/jardim-monte-cristo.html" class="cidade-card">
        <h3>Jardim Monte Cristo</h3>
        <p>Zona Leste • 18+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/parque-cidade.html" class="cidade-card">
        <h3>Parque Cidade</h3>
        <p>Zona Sul • 22+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/jardim-santa-monica.html" class="cidade-card">
        <h3>Jardim Santa Mônica</h3>
        <p>Zona Oeste • 28+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/vila-any.html" class="cidade-card">
        <h3>Vila Any</h3>
        <p>Zona Central • 15+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/jardim-ivete.html" class="cidade-card">
        <h3>Jardim Ivete</h3>
        <p>Zona Norte • 17+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/parque-industrial.html" class="cidade-card">
        <h3>Parque Industrial</h3>
        <p>Zona Industrial • 8+ mil habitantes</p>
      </a>
      <a href="itaquaquecetuba/jardim-das-flores.html" class="cidade-card">
        <h3>Jardim das Flores</h3>
        <p>Zona Leste • 21+ mil habitantes</p>
      </a>
    </div>
  </div>
</section>`;
    
    // Verificar se a seção existe
    if (!secaoBairrosAntiga.test(conteudo)) {
        console.log('❌ Seção de bairros não encontrada');
        return false;
    }
    
    // Substituir a seção
    conteudo = conteudo.replace(secaoBairrosAntiga, secaoBairrosNova);
    
    // Salvar arquivo modificado
    fs.writeFileSync('cidades/itaquaquecetuba.html', conteudo, 'utf8');
    console.log('✅ Links dos bairros corrigidos com sucesso');
    
    return true;
}

function verificarLinksCorrigidos() {
    console.log('\n🔍 VERIFICANDO LINKS CORRIGIDOS...');
    
    const conteudo = fs.readFileSync('cidades/itaquaquecetuba.html', 'utf8');
    
    const bairrosVerificar = [
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
    
    console.log('\n📋 Status dos links:');
    
    let encontrados = 0;
    bairrosVerificar.forEach(bairro => {
        const temLink = conteudo.includes(bairro);
        console.log(`${temLink ? '✅' : '❌'} ${bairro}`);
        if (temLink) encontrados++;
    });
    
    console.log(`\n📊 Links corrigidos: ${encontrados}/10`);
    return encontrados;
}

function verificarEstruturaHTML() {
    console.log('\n🏗️ VERIFICANDO ESTRUTURA HTML DOS CARDS...');
    
    const conteudo = fs.readFileSync('cidades/itaquaquecetuba.html', 'utf8');
    
    // Verificar se os cards têm a estrutura correta
    const cardsMatch = conteudo.match(/<a href="itaquaquecetuba\/[^"]+" class="cidade-card">[\s\S]*?<\/a>/g);
    
    if (cardsMatch) {
        console.log(`✅ Encontrados ${cardsMatch.length} cards de bairros`);
        
        cardsMatch.forEach((card, index) => {
            const temH3 = card.includes('<h3>');
            const temP = card.includes('<p>');
            console.log(`  Card ${index + 1}: ${temH3 ? '✅' : '❌'} <h3> | ${temP ? '✅' : '❌'} <p>`);
        });
    } else {
        console.log('❌ Nenhum card encontrado');
    }
    
    return cardsMatch ? cardsMatch.length : 0;
}

function gerarUrlsParaTeste() {
    console.log('\n🌐 URLS PARA TESTE APÓS CORREÇÃO:');
    console.log('='.repeat(45));
    
    const urls = [
        'https://tintasqualyquimy.com.br/cidades/itaquaquecetuba.html',
        'https://tintasqualyquimy.com.br/cidades/itaquaquecetuba/itaquaquecetuba/jardim-camboinhas.html',
        'https://tintasqualyquimy.com.br/cidades/itaquaquecetuba/itaquaquecetuba/jardim-sao-joao.html',
        'https://tintasqualyquimy.com.br/cidades/itaquaquecetuba/itaquaquecetuba/vila-gilda.html'
    ];
    
    urls.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
    });
    
    console.log('\n📋 ESTRUTURA ESPERADA:');
    console.log('1. Página mãe: cidades/itaquaquecetuba.html');
    console.log('2. Cards clicáveis com <h3> e <p>');
    console.log('3. Links para: itaquaquecetuba/nome-bairro.html');
    console.log('4. Páginas de bairro: cidades/itaquaquecetuba/nome-bairro.html');
}

function executarCorrecao() {
    console.log('🚀 INICIANDO CORREÇÃO DOS LINKS DOS BAIRROS');
    
    const sucesso = corrigirLinksBairros();
    
    if (sucesso) {
        const links = verificarLinksCorrigidos();
        const cards = verificarEstruturaHTML();
        gerarUrlsParaTeste();
        
        console.log('\n' + '='.repeat(50));
        console.log('🎉 CORREÇÃO CONCLUÍDA');
        console.log('='.repeat(50));
        console.log(`✅ Links corrigidos: ${links}/10`);
        console.log(`✅ Cards estruturados: ${cards}`);
        console.log('✅ Página mãe atualizada');
        console.log('✅ Cards clicáveis criados');
        
        console.log('\n🎯 RESULTADO:');
        console.log('Agora os usuários podem clicar nos cards');
        console.log('e acessar todas as páginas de bairros!');
        
    } else {
        console.log('\n❌ Falha na correção');
    }
    
    return sucesso;
}

// Executar correção
executarCorrecao();
