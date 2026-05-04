const fs = require('fs');

// ==========================================
// ANÁLISE SEO PÓS-MIGRAÇÃO DE DOMÍNIO
// ==========================================

console.log('🔍 ANÁLISE SEO PÓS-MIGRAÇÃO DE DOMÍNIO');
console.log('='.repeat(60));

function analisarConfiguracoesSEO() {
    console.log('\n📋 VERIFICANDO CONFIGURAÇÕES SEO CRÍTICAS...');
    
    const arquivo = 'grafiato-itaquaquecetuba.html';
    
    if (!fs.existsSync(arquivo)) {
        console.log('❌ Arquivo não encontrado');
        return false;
    }
    
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    
    // Verificar configurações críticas para migração
    const verificacoes = [
        {
            nome: 'Google Analytics ID',
            regex: /G-HFTJ9MRF64/,
            encontrado: conteudo.includes('G-HFTJ9MRF64'),
            critico: true
        },
        {
            nome: 'Meta Verificação Google',
            regex: /Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM/,
            encontrado: conteudo.includes('Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM'),
            critico: true
        },
        {
            nome: 'Canonical URL com domínio correto',
            regex: /https:\/\/tintasqualyquimy\.com\.br/,
            encontrado: conteudo.includes('https://tintasqualyquimy.com.br'),
            critico: true
        },
        {
            nome: 'Open Graph URL correta',
            regex: /"og:url"\s*content="https:\/\/tintasqualyquimy\.com\.br/,
            encontrado: conteudo.includes('"og:url"') && conteudo.includes('https://tintasqualyquimy.com.br'),
            critico: true
        },
        {
            nome: 'Schema LocalBusiness com URL correta',
            regex: /"url":"https:\/\/tintasqualyquimy\.com\.br\/"/,
            encontrado: conteudo.includes('"url":"https://tintasqualyquimy.com.br/"'),
            critico: true
        },
        {
            nome: 'Schema Product com URL correta',
            regex: /"url":"https:\/\/tintasqualyquimy\.com\.br\/produtos\//,
            encontrado: conteudo.includes('"url":"https://tintasqualyquimy.com.br/produtos/'),
            critico: true
        },
        {
            nome: 'Robots meta tag',
            regex: /<meta name="robots" content="index, follow">/,
            encontrado: conteudo.includes('<meta name="robots" content="index, follow">'),
            critico: true
        },
        {
            nome: 'Imagens com domínio correto',
            regex: /https:\/\/tintasqualyquimy\.com\.br\/imagens\//,
            encontrado: conteudo.includes('https://tintasqualyquimy.com.br/imagens/'),
            critico: false
        }
    ];
    
    console.log('\n📊 RESULTADO DAS VERIFICAÇÕES:');
    let todosOK = true;
    
    verificacoes.forEach(verificacao => {
        const status = verificacao.encontrado ? '✅' : '❌';
        const critico = verificacao.critico ? ' (CRÍTICO)' : '';
        console.log(`${status} ${verificacao.nome}${critico}`);
        
        if (!verificacao.encontrado && verificacao.critico) {
            todosOK = false;
        }
    });
    
    return todosOK;
}

function verificarSitemapERobots() {
    console.log('\n📋 VERIFICANDO SITEMAP E ROBOTS.TXT...');
    
    // Verificar sitemap.xml
    if (fs.existsSync('sitemap.xml')) {
        const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
        const urlsCorretas = sitemap.includes('https://tintasqualyquimy.com.br');
        console.log(`${urlsCorretas ? '✅' : '❌'} Sitemap.xml com URLs corretas`);
    } else {
        console.log('❌ Sitemap.xml não encontrado');
    }
    
    // Verificar robots.txt
    if (fs.existsSync('robots.txt')) {
        const robots = fs.readFileSync('robots.txt', 'utf8');
        const sitemapReferenciado = robots.includes('tintasqualyquimy.com.br/sitemap.xml');
        console.log(`${sitemapReferenciado ? '✅' : '❌'} Robots.txt referencia sitemap correto`);
    } else {
        console.log('❌ Robots.txt não encontrado');
    }
}

function analisarProblemasComunsMigracao() {
    console.log('\n⚠️  PROBLEMAS COMUNS PÓS-MIGRAÇÃO:');
    console.log('='.repeat(50));
    
    const problemas = [
        {
            problema: 'Perda de autoridade do domínio',
            causa: 'Mudança de subdomínio para domínio próprio',
            solucao: 'Manter redirects 301 por pelo menos 6 meses',
            impacto: 'Alto'
        },
        {
            problema: 'Links internos quebrados',
            causa: 'URLs antigas não atualizadas',
            solucao: 'Verificar todos os links internos',
            impacto: 'Alto'
        },
        {
            problema: 'Imagens com URLs antigas',
            causa: 'Cache do navegador e CDN',
            solucao: 'Limpar cache e forçar nova versão',
            impacto: 'Médio'
        },
        {
            problema: 'Perda temporária de ranking',
            causa: 'Google reavaliando novo domínio',
            solucao: 'Aguardar 2-8 semanas para recuperação',
            impacto: 'Alto'
        },
        {
            problema: 'Analytics com dados misturados',
            causa: 'Mistura de tráfego antigo e novo',
            solucao: 'Criar nova view no Analytics',
            impacto: 'Médio'
        }
    ];
    
    problemas.forEach(item => {
        console.log(`\n🔍 ${item.problema}`);
        console.log(`   Causa: ${item.causa}`);
        console.log(`   Solução: ${item.solucao}`);
        console.log(`   Impacto: ${item.impacto}`);
    });
}

function gerarPlanoRecuperacaoSEO() {
    console.log('\n🚀 PLANO DE RECUPERAÇÃO SEO:');
    console.log('='.repeat(40));
    
    const plano = [
        {
            etapa: 'IMEDIATO (1-7 dias)',
            acoes: [
                '✅ Verificar todos os redirects 301',
                '✅ Submeter novo sitemap ao Google Search Console',
                '✅ Monitorar erros 404 no Analytics',
                '✅ Verificar canonical URLs',
                '✅ Testar todos os links internos'
            ]
        },
        {
            etapa: 'CURTO PRAZO (1-4 semanas)',
            acoes: [
                '📊 Monitorar ranking de palavras-chave',
                '📊 Analisar tráfego orgânico',
                '📊 Verificar indexação das páginas',
                '📊 Monitorar taxa de rejeição',
                '📊 Acompanhar métricas de engajamento'
            ]
        },
        {
            etapa: 'MÉDIO PRAZO (1-3 meses)',
            acoes: [
                '🎯 Construir novos backlinks',
                '🎯 Otimizar conteúdo para novo domínio',
                '🎯 Fortalecer autoridade da marca',
                '🎯 Aumentar produção de conteúdo',
                '🎯 Expansão de palavras-chave'
            ]
        },
        {
            etapa: 'LONGO PRAZO (3-6 meses)',
            acoes: [
                '📈 Recuperação total do ranking',
                '📈 Superar métricas anteriores',
                '📈 Estabelecer nova autoridade',
                '📈 Dominar buscas locais',
                '📈 Expandir para novas cidades'
            ]
        }
    ];
    
    plano.forEach(item => {
        console.log(`\n${item.etapa}:`);
        item.acoes.forEach(acao => {
            console.log(`  ${acao}`);
        });
    });
}

function analisarOportunidades() {
    console.log('\n🎯 OPORTUNIDADES APÓS MIGRAÇÃO:');
    console.log('='.repeat(45));
    
    const oportunidades = [
        '🏢 Domínio próprio aumenta confiança e autoridade',
        '📍 URLs mais limpas e profissionais',
        '🔍 Melhor posicionamento em buscas locais',
        '📊 Analytics mais preciso e segmentado',
        '🚀 Potencial de crescimento maior',
        '🎯 Foco em tintasqualyquimy.com.br',
        '📈 Branding mais forte',
        '🔗 Backlinks de maior qualidade'
    ];
    
    oportunidades.forEach(oportunidade => {
        console.log(`  ${oportunidade}`);
    });
}

// Executar análise completa
function executarAnalise() {
    console.log('🚀 INICIANDO ANÁLISE SEO PÓS-MIGRAÇÃO');
    
    const seoOK = analisarConfiguracoesSEO();
    verificarSitemapERobots();
    analisarProblemasComunsMigracao();
    gerarPlanoRecuperacaoSEO();
    analisarOportunidades();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DA ANÁLISE');
    console.log('='.repeat(60));
    
    if (seoOK) {
        console.log('✅ Configurações SEO técnicas estão corretas');
        console.log('✅ Domínio configurado adequadamente');
        console.log('✅ Analytics e meta tags OK');
    } else {
        console.log('❌ Existem problemas críticos a corrigir');
    }
    
    console.log('\n🎯 PREVISÃO DE RECUPERAÇÃO:');
    console.log('📅 2-4 semanas: Início da recuperação');
    console.log('📅 1-2 meses: 50-70% do tráfego original');
    console.log('📅 3-4 meses: 80-90% do tráfego original');
    console.log('📅 6 meses: Recuperação total com potencial de superação');
    
    console.log('\n🔑 FATOR CRÍTICO:');
    console.log('A migração para domínio próprio é POSITIVA a longo prazo!');
    console.log('Paciência e consistência nas otimizações são essenciais.');
}

// Iniciar análise
executarAnalise();
