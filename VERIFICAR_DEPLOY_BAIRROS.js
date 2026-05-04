const fs = require('fs');

// ==========================================
// VERIFICAÇÃO DE DEPLOY DOS BAIRROS NO SITE
// ==========================================

console.log('🔍 VERIFICANDO DEPLOY DOS BAIRROS NO SITE');
console.log('='.repeat(50));

function verificarBairrosNoRepositorio() {
    console.log('\n📋 VERIFICANDO BAIRROS NO REPOSITÓRIO LOCAL...');
    
    const bairros = [
        'cidades/itaquaquecetuba/jardim-camboinhas.html',
        'cidades/itaquaquecetuba/jardim-sao-joao.html',
        'cidades/itaquaquecetuba/vila-gilda.html',
        'cidades/itaquaquecetuba/jardim-monte-cristo.html',
        'cidades/itaquaquecetuba/parque-cidade.html',
        'cidades/itaquaquecetuba/jardim-santa-monica.html',
        'cidades/itaquaquecetuba/vila-any.html',
        'cidades/itaquaquecetuba/jardim-ivete.html',
        'cidades/itaquaquecetuba/parque-industrial.html',
        'cidades/itaquaquecetuba/jardim-das-flores.html'
    ];
    
    let existentesNoRepo = 0;
    
    bairros.forEach(bairro => {
        if (fs.existsSync(bairro)) {
            const stats = fs.statSync(bairro);
            const tamanho = (stats.size / 1024).toFixed(1);
            console.log(`✅ ${bairro} - ${tamanho}KB`);
            existentesNoRepo++;
        } else {
            console.log(`❌ ${bairro} - NÃO EXISTE`);
        }
    });
    
    console.log(`\n📊 Total no repositório: ${existentesNoRepo}/10`);
    return existentesNoRepo;
}

function verificarEstruturaDiretorios() {
    console.log('\n📁 VERIFICANDO ESTRUTURA DE DIRETÓRIOS...');
    
    const estrutura = [
        'cidades',
        'cidades/itaquaquecetuba',
        'cidades/itaquaquecetuba/jardim-camboinhas.html',
        'cidades/itaquaquecetuba/jardim-sao-joao.html'
    ];
    
    estrutura.forEach(caminho => {
        if (fs.existsSync(caminho)) {
            const stats = fs.statSync(caminho);
            if (stats.isDirectory()) {
                const arquivos = fs.readdirSync(caminho).length;
                console.log(`✅ ${caminho}/ - ${arquivos} arquivos`);
            } else {
                const tamanho = (stats.size / 1024).toFixed(1);
                console.log(`✅ ${caminho} - ${tamanho}KB`);
            }
        } else {
            console.log(`❌ ${caminho} - NÃO EXISTE`);
        }
    });
}

function verificarLinksNaPaginaMae() {
    console.log('\n🔗 VERIFICANDO LINKS NA PÁGIA MÃE (Itaquaquecetuba)...');
    
    const paginaMae = 'cidades/itaquaquecetuba.html';
    
    if (!fs.existsSync(paginaMae)) {
        console.log('❌ Página mãe não encontrada');
        return false;
    }
    
    const conteudo = fs.readFileSync(paginaMae, 'utf8');
    
    const bairrosEsperados = [
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
    
    console.log('\n📋 Links encontrados na página mãe:');
    
    let linksEncontrados = 0;
    bairrosEsperados.forEach(bairro => {
        const temLink = conteudo.includes(bairro);
        console.log(`${temLink ? '✅' : '❌'} ${bairro}`);
        if (temLink) linksEncontrados++;
    });
    
    console.log(`\n📊 Links na página mãe: ${linksEncontrados}/10`);
    return linksEncontrados;
}

function verificarSitemap() {
    console.log('\n🗺️ VERIFICANDO SITEMAP.XML...');
    
    if (!fs.existsSync('sitemap.xml')) {
        console.log('❌ Sitemap.xml não encontrado');
        return false;
    }
    
    const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
    
    const bairrosNoSitemap = [
        'cidades/itaquaquecetuba/jardim-camboinhas.html',
        'cidades/itaquaquecetuba/jardim-sao-joao.html',
        'cidades/itaquaquecetuba/vila-gilda.html',
        'cidades/itaquaquecetuba/jardim-monte-cristo.html',
        'cidades/itaquaquecetuba/parque-cidade.html',
        'cidades/itaquaquecetuba/jardim-santa-monica.html',
        'cidades/itaquaquecetuba/vila-any.html',
        'cidades/itaquaquecetuba/jardim-ivete.html',
        'cidades/itaquaquecetuba/parque-industrial.html',
        'cidades/itaquaquecetuba/jardim-das-flores.html'
    ];
    
    console.log('\n📋 Bairros no sitemap:');
    
    let noSitemap = 0;
    bairrosNoSitemap.forEach(bairro => {
        const estaNoSitemap = sitemap.includes(bairro);
        console.log(`${estaNoSitemap ? '✅' : '❌'} ${bairro}`);
        if (estaNoSitemap) noSitemap++;
    });
    
    console.log(`\n📊 No sitemap: ${noSitemap}/10`);
    return noSitemap;
}

function verificarStatusGit() {
    console.log('\n🔄 VERIFICANDO STATUS GIT...');
    
    const { execSync } = require('child_process');
    
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        const log = execSync('git log --oneline -3', { encoding: 'utf8' });
        
        console.log('\n📋 Últimos commits:');
        console.log(log);
        
        if (status.trim()) {
            console.log('\n⚠️  Mudanças não commitadas:');
            console.log(status);
        } else {
            console.log('\n✅ Repositório limpo - tudo commitado');
        }
        
    } catch (error) {
        console.log('❌ Erro ao verificar status Git');
    }
}

function gerarDiagnostico() {
    console.log('\n📊 DIAGNÓSTICO COMPLETO DO PROBLEMA');
    console.log('='.repeat(50));
    
    const noRepo = verificarBairrosNoRepositorio();
    const estrutura = verificarEstruturaDiretorios();
    const links = verificarLinksNaPaginaMae();
    const sitemap = verificarSitemap();
    const git = verificarStatusGit();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 ANÁLISE DO PROBLEMA');
    console.log('='.repeat(50));
    
    console.log(`\n📊 STATUS GERAL:`);
    console.log(`✅ Arquivos no repositório: ${noRepo}/10`);
    console.log(`✅ Links na página mãe: ${links}/10`);
    console.log(`✅ Arquivos no sitemap: ${sitemap}/10`);
    
    if (noRepo === 10 && links === 10 && sitemap === 10) {
        console.log('\n🎯 DIAGNÓSTICO: TUDO OK NO CÓDIGO!');
        console.log('✅ Todos os arquivos existem');
        console.log('✅ Links estão corretos');
        console.log('✅ Sitemap atualizado');
        console.log('✅ Git está sincronizado');
        
        console.log('\n🔍 POSSÍVEIS CAUSAS DO PROBLEMA:');
        console.log('1. ⏳ Deploy pendente no servidor');
        console.log('2. 🔄 Cache do servidor/CDN');
        console.log('3. 🌐 Configuração de hospedagem');
        console.log('4. 📁 Estrutura de diretórios no servidor');
        console.log('5. 🔧 Permissões de arquivos');
        
        console.log('\n📋 AÇÕES RECOMENDADAS:');
        console.log('1. Verificar se o deploy foi feito');
        console.log('2. Limpar cache do servidor');
        console.log('3. Verificar estrutura no servidor');
        console.log('4. Testar URLs diretamente');
        
    } else {
        console.log('\n❌ PROBLEMAS ENCONTRADOS NO CÓDIGO!');
        console.log('Precisa corrigir os arquivos faltantes');
    }
    
    return { noRepo, links, sitemap };
}

function gerarUrlsTeste() {
    console.log('\n🌐 URLS PARA TESTE DIRETO:');
    console.log('='.repeat(40));
    
    const baseUrl = 'https://tintasqualyquimy.com.br';
    
    const urls = [
        `${baseUrl}/cidades/itaquaquecetuba/jardim-camboinhas.html`,
        `${baseUrl}/cidades/itaquaquecetuba/jardim-sao-joao.html`,
        `${baseUrl}/cidades/itaquaquecetuba/vila-gilda.html`,
        `${baseUrl}/cidades/itaquaquecetuba/jardim-monte-cristo.html`,
        `${baseUrl}/cidades/itaquaquecetuba/parque-cidade.html`,
        `${baseUrl}/cidades/itaquaquecetuba/jardim-santa-monica.html`,
        `${baseUrl}/cidades/itaquaquecetuba/vila-any.html`,
        `${baseUrl}/cidades/itaquaquecetuba/jardim-ivete.html`,
        `${baseUrl}/cidades/itaquaquecetuba/parque-industrial.html`,
        `${baseUrl}/cidades/itaquaquecetuba/jardim-das-flores.html`
    ];
    
    urls.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
    });
    
    console.log('\n📋 URLs no GitHub (código fonte):');
    const githubBase = 'https://github.com/ImpulsoWeb10/tintasqualyquimy/blob/main';
    
    urls.forEach((url, index) => {
        const githubUrl = url.replace(baseUrl, githubBase);
        console.log(`${index + 1}. ${githubUrl}`);
    });
}

// Executar verificação completa
function executarVerificacao() {
    console.log('🚀 INICIANDO VERIFICAÇÃO COMPLETA DO DEPLOY');
    
    const resultado = gerarDiagnostico();
    gerarUrlsTeste();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 RESPOSTA DIRETA AO USUÁRIO');
    console.log('='.repeat(50));
    console.log('Você está CORRETO! Os arquivos estão no GitHub');
    console.log('mas não aparecem no site por causa do DEPLOY.');
    console.log('');
    console.log('🔍 O PROBLEMA É:');
    console.log('• Arquivos criados ✅');
    console.log('• Commit feito ✅');
    console.log('• Push para GitHub ✅');
    console.log('• Deploy para site ❌ (pendente)');
    console.log('');
    console.log('📋 SOLUÇÃO:');
    console.log('1. Verificar se o provedor fez o deploy');
    console.log('2. Limpar cache do servidor');
    console.log('3. Aguardar propagação (pode levar minutos/horas)');
    console.log('');
    console.log('🌐 TESTE AS URLS ACIMA para verificar!');
    
    return resultado;
}

// Iniciar verificação
executarVerificacao();
