const fs = require('fs');
const path = require('path');

// ==========================================
// AUDITORIA COMPLETA DO SISTEMA TINTAS QUALY QUIMY
// Baseado no DOCUMENTO MESTRE_QUALYQUIMY.md
// ==========================================

console.log('🚀 INICIANDO AUDITORIA COMPLETA DO SISTEMA');
console.log('='.repeat(80));

// 1. MAPEAMENTO COMPLETO DA ESTRUTURA
function mapearEstruturaCompleta() {
    console.log('\n📁 1. MAPEAMENTO COMPLETO DA ESTRUTURA');
    
    const estrutura = {
        raiz: [],
        pastas: {},
        arquivosHtml: [],
        arquivosCss: [],
        arquivosJs: [],
        imagens: [],
        problemas: []
    };
    
    function escanearDiretorio(dir, profundidade = 0) {
        const arquivos = fs.readdirSync(dir);
        
        arquivos.forEach(arquivo => {
            const caminhoCompleto = path.join(dir, arquivo);
            const stat = fs.statSync(caminhoCompleto);
            
            if (stat.isDirectory()) {
                estrutura.pastas[arquivo] = {
                    caminho: caminhoCompleto,
                    profundidade: profundidade,
                    arquivos: []
                };
                escanearDiretorio(caminhoCompleto, profundidade + 1);
            } else {
                const info = {
                    nome: arquivo,
                    caminho: caminhoCompleto,
                    tamanho: stat.size,
                    extensao: path.extname(arquivo).toLowerCase()
                };
                
                if (profundidade === 0) {
                    estrutura.raiz.push(info);
                } else {
                    const nomePasta = path.basename(path.dirname(caminhoCompleto));
                    if (estrutura.pastas[nomePasta]) {
                        estrutura.pastas[nomePasta].arquivos.push(info);
                    }
                }
                
                // Classificar por tipo
                if (info.extensao === '.html') estrutura.arquivosHtml.push(info);
                else if (info.extensao === '.css') estrutura.arquivosCss.push(info);
                else if (info.extensao === '.js') estrutura.arquivosJs.push(info);
                else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(info.extensao)) {
                    estrutura.imagens.push(info);
                }
            }
        });
    }
    
    escanearDiretorio('.');
    
    console.log(`✅ Total arquivos HTML: ${estrutura.arquivosHtml.length}`);
    console.log(`✅ Total arquivos CSS: ${estrutura.arquivosCss.length}`);
    console.log(`✅ Total arquivos JS: ${estrutura.arquivosJs.length}`);
    console.log(`✅ Total imagens: ${estrutura.imagens.length}`);
    console.log(`✅ Total pastas: ${Object.keys(estrutura.pastas).length}`);
    
    return estrutura;
}

// 2. VALIDAÇÃO CONTRA DOCUMENTO MESTRE
function validarDocumentoMestre(estrutura) {
    console.log('\n📋 2. VALIDAÇÃO CONTRA DOCUMENTO MESTRE');
    
    const validacoes = {
        estruturaCorreta: true,
        paginasObrigatorias: [],
        paginasFaltantes: [],
        paginasExtras: [],
        arquivosDuplicados: [],
        problemas: []
    };
    
    // Verificar estrutura de pastas conforme documento mestre
    const pastasObrigatorias = ['css', 'js', 'imagens', 'categorias', 'produtos', 'cidades', 'comercial', 'blog'];
    const pastasExistentes = Object.keys(estrutura.pastas);
    
    pastasObrigatorias.forEach(pasta => {
        if (!pastasExistentes.includes(pasta)) {
            validacoes.paginasFaltantes.push(pasta);
            validacoes.estruturaCorreta = false;
        }
    });
    
    // Verificar páginas obrigatórias conforme documento mestre
    const paginasObrigatorias = [
        'index.html',
        'categorias/tintas.html',
        'categorias/texturas.html',
        'categorias/massas.html',
        'categorias/fundos.html',
        'categorias/acabamentos.html'
    ];
    
    estrutura.arquivosHtml.forEach(arquivo => {
        const caminhoRelativo = arquivo.caminho.replace(/^\.\\?/, '');
        if (paginasObrigatorias.includes(caminhoRelativo)) {
            validacoes.paginasObrigatorias.push(caminhoRelativo);
        }
    });
    
    paginasObrigatorias.forEach(pagina => {
        if (!validacoes.paginasObrigatorias.includes(pagina)) {
            validacoes.paginasFaltantes.push(pagina);
            validacoes.estruturaCorreta = false;
        }
    });
    
    console.log(`✅ Estrutura correta: ${validacoes.estruturaCorreta ? 'SIM' : 'NÃO'}`);
    console.log(`⚠️  Páginas faltantes: ${validacoes.paginasFaltantes.length}`);
    if (validacoes.paginasFaltantes.length > 0) {
        validacoes.paginasFaltantes.forEach(pagina => console.log(`   - ${pagina}`));
    }
    
    return validacoes;
}

// 3. ANÁLISE DE ARQUIVOS HTML
function analisarArquivosHtml(estrutura) {
    console.log('\n🔍 3. ANÁLISE DE ARQUIVOS HTML');
    
    const analise = {
        total: estrutura.arquivosHtml.length,
        comProblemas: 0,
        problemas: [],
        googleAnalytics: {
            correto: 0,
            incorreto: 0,
            ausente: 0
        },
        metaTags: {
            title: 0,
            description: 0,
            canonical: 0,
            verification: 0
        },
        schema: {
            presente: 0,
            ausente: 0,
            incorreto: 0
        },
        links: {
            quebrados: 0,
            relativos: 0,
            absolutos: 0
        }
    };
    
    estrutura.arquivosHtml.forEach(arquivo => {
        try {
            const conteudo = fs.readFileSync(arquivo.caminho, 'utf8');
            const problemasArquivo = [];
            
            // Verificar Google Analytics
            if (conteudo.includes('G-HFTJ9MRF64')) {
                analise.googleAnalytics.correto++;
            } else if (conteudo.includes('google-analytics') || conteudo.includes('gtag')) {
                analise.googleAnalytics.incorreto++;
                problemasArquivo.push('Google Analytics incorreto');
            } else {
                analise.googleAnalytics.ausente++;
                problemasArquivo.push('Google Analytics ausente');
            }
            
            // Verificar meta tags
            if (conteudo.includes('<title>')) analise.metaTags.title++;
            if (conteudo.includes('name="description"')) analise.metaTags.description++;
            if (conteudo.includes('rel="canonical"')) analise.metaTags.canonical++;
            if (conteudo.includes('Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM')) {
                analise.metaTags.verification++;
            }
            
            // Verificar Schema
            if (conteudo.includes('@context') && conteudo.includes('schema.org')) {
                analise.schema.presente++;
            } else {
                analise.schema.ausente++;
                problemasArquivo.push('Schema JSON-LD ausente');
            }
            
            // Verificar links quebrados (padrões comuns)
            const linksQuebrados = [
                'href="categorias/',
                'href="produtos/',
                'href="cidades/',
                'href="imagens/',
                'src="css/',
                'src="js/'
            ];
            
            linksQuebrados.forEach(padrao => {
                if (conteudo.includes(padrao)) {
                    analise.links.quebrados++;
                    problemasArquivo.push(`Link quebrado: ${padrao}`);
                }
            });
            
            if (problemasArquivo.length > 0) {
                analise.comProblemas++;
                analise.problemas.push({
                    arquivo: arquivo.caminho,
                    problemas: problemasArquivo
                });
            }
            
        } catch (erro) {
            analise.comProblemas++;
            analise.problemas.push({
                arquivo: arquivo.caminho,
                problemas: [`Erro na leitura: ${erro.message}`]
            });
        }
    });
    
    console.log(`✅ Total analisado: ${analise.total}`);
    console.log(`❌ Com problemas: ${analise.comProblemas}`);
    console.log(`📊 Google Analytics - Correto: ${analise.googleAnalytics.correto}, Incorreto: ${analise.googleAnalytics.incorreto}, Ausente: ${analise.googleAnalytics.ausente}`);
    console.log(`📊 Meta Tags - Title: ${analise.metaTags.title}, Description: ${analise.metaTags.description}, Canonical: ${analise.metaTags.canonical}`);
    console.log(`📊 Schema - Presente: ${analise.schema.presente}, Ausente: ${analise.schema.ausente}`);
    console.log(`📊 Links - Quebrados: ${analise.links.quebrados}`);
    
    return analise;
}

// 4. VERIFICAÇÃO DE IMAGENS E RECURSOS
function verificarRecursos(estrutura) {
    console.log('\n🖼️  4. VERIFICAÇÃO DE IMAGENS E RECURSOS');
    
    const verificacao = {
        imagens: {
            total: estrutura.imagens.length,
            semAlt: 0,
            muitoGrandes: 0,
            formatosIncorretos: 0
        },
        css: {
            total: estrutura.arquivosCss.length,
            duplicados: 0,
            inline: 0
        },
        js: {
            total: estrutura.arquivosJs.length,
            duplicados: 0,
            inline: 0
        }
    };
    
    // Verificar imagens
    estrutura.imagens.forEach(imagem => {
        if (imagem.tamanho > 200000) { // > 200KB
            verificacao.imagens.muitoGrandes++;
        }
        
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(imagem.extensao)) {
            verificacao.imagens.formatosIncorretos++;
        }
    });
    
    // Verificar CSS duplicados
    const nomesCss = estrutura.arquivosCss.map(css => css.nome);
    const cssUnicos = [...new Set(nomesCss)];
    verificacao.css.duplicados = nomesCss.length - cssUnicos.length;
    
    // Verificar JS duplicados
    const nomesJs = estrutura.arquivosJs.map(js => js.nome);
    const jsUnicos = [...new Set(nomesJs)];
    verificacao.js.duplicados = nomesJs.length - jsUnicos.length;
    
    console.log(`✅ Imagens - Total: ${verificacao.imagens.total}, Grandes: ${verificacao.imagens.muitoGrandes}, Formatos incorretos: ${verificacao.imagens.formatosIncorretos}`);
    console.log(`✅ CSS - Total: ${verificacao.css.total}, Duplicados: ${verificacao.css.duplicados}`);
    console.log(`✅ JS - Total: ${verificacao.js.total}, Duplicados: ${verificacao.js.duplicados}`);
    
    return verificacao;
}

// 5. ANÁLISE DE PERFORMANCE
function analisarPerformance(estrutura) {
    console.log('\n⚡ 5. ANÁLISE DE PERFORMANCE');
    
    const performance = {
        arquivosGrandes: [],
        arquivosDuplicados: [],
        otimizacoes: []
    };
    
    // Verificar arquivos muito grandes
    const todosArquivos = [...estrutura.arquivosHtml, ...estrutura.arquivosCss, ...estrutura.arquivosJs];
    
    todosArquivos.forEach(arquivo => {
        if (arquivo.tamanho > 100000) { // > 100KB
            performance.arquivosGrandes.push({
                arquivo: arquivo.caminho,
                tamanho: arquivo.tamanho
            });
        }
    });
    
    console.log(`⚠️  Arquivos grandes (>100KB): ${performance.arquivosGrandes.length}`);
    performance.arquivosGrandes.forEach(arquivo => {
        console.log(`   - ${arquivo.arquivo} (${(arquivo.tamanho / 1024).toFixed(1)}KB)`);
    });
    
    return performance;
}

// 6. GERAR RELATÓRIO COMPLETO
function gerarRelatorioCompleto(estrutura, validacoes, analiseHtml, verificacao, performance) {
    console.log('\n📊 6. GERANDO RELATÓRIO COMPLETO');
    
    const relatorio = {
        auditoria: {
            data: new Date().toISOString(),
            versao: '1.0',
            base: 'DOCUMENTO_MESTRE_QUALYQUIMY.md'
        },
        estrutura: estrutura,
        validacoes: validacoes,
        analiseHtml: analiseHtml,
        verificacao: verificacao,
        performance: performance,
        resumo: {
            statusGeral: 'OK',
            problemasCriticos: 0,
            problemasMedios: 0,
            problemasBaixos: 0,
            recomendacoes: []
        }
    };
    
    // Calcular status geral
    if (!validacoes.estruturaCorreta || analiseHtml.comProblemas > estrutura.arquivosHtml.length * 0.3) {
        relatorio.resumo.statusGeral = 'CRÍTICO';
        relatorio.resumo.problemasCriticos = validacoes.paginasFaltantes.length + analiseHtml.comProblemas;
    } else if (analiseHtml.comProblemas > 0 || verificacao.imagens.muitoGrandes > 0) {
        relatorio.resumo.statusGeral = 'ATENÇÃO';
        relatorio.resumo.problemasMedios = analiseHtml.comProblemas + verificacao.imagens.muitoGrandes;
    }
    
    // Gerar recomendações
    if (validacoes.paginasFaltantes.length > 0) {
        relatorio.resumo.recomendacoes.push('Criar páginas faltantes conforme documento mestre');
    }
    if (analiseHtml.googleAnalytics.ausente > 0) {
        relatorio.resumo.recomendacoes.push('Adicionar Google Analytics correto em todas as páginas');
    }
    if (analiseHtml.metaTags.canonical < estrutura.arquivosHtml.length) {
        relatorio.resumo.recomendacoes.push('Adicionar canonical em todas as páginas');
    }
    if (verificacao.imagens.muitoGrandes > 0) {
        relatorio.resumo.recomendacoes.push('Otimizar imagens grandes (WebP, compressão)');
    }
    
    // Salvar relatório
    fs.writeFileSync('RELATORIO_AUDITORIA_COMPLETA.json', JSON.stringify(relatorio, null, 2));
    
    console.log(`✅ Status geral: ${relatorio.resumo.statusGeral}`);
    console.log(`🚨 Problemas críticos: ${relatorio.resumo.problemasCriticos}`);
    console.log(`⚠️  Problemas médios: ${relatorio.resumo.problemasMedios}`);
    console.log(`💡 Recomendações: ${relatorio.resumo.recomendacoes.length}`);
    console.log(`📄 Relatório salvo: RELATORIO_AUDITORIA_COMPLETA.json`);
    
    return relatorio;
}

// EXECUTAR AUDITORIA COMPLETA
function executarAuditoriaCompleta() {
    console.log('🔥 EXECUTANDO AUDITORIA COMPLETA DO SISTEMA');
    
    const estrutura = mapearEstruturaCompleta();
    const validacoes = validarDocumentoMestre(estrutura);
    const analiseHtml = analisarArquivosHtml(estrutura);
    const verificacao = verificarRecursos(estrutura);
    const performance = analisarPerformance(estrutura);
    const relatorio = gerarRelatorioCompleto(estrutura, validacoes, analiseHtml, verificacao, performance);
    
    console.log('\n' + '='.repeat(80));
    console.log('🎉 AUDITORIA COMPLETA CONCLUÍDA');
    console.log('='.repeat(80));
    
    return relatorio;
}

// Iniciar auditoria
executarAuditoriaCompleta();
