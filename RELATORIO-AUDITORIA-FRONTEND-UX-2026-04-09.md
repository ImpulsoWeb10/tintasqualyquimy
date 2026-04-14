# Relatório de Auditoria Frontend e UX - Qualy Quimy

**Data:** 9 de abril de 2026  
**Site auditado:** tintasqualyquimy.impulsoweb10.com.br  
**Escopo:** interface pública da pasta `tintasqualyquimy` com foco em home, páginas comerciais, categorias, cidades e componentes compartilhados.

---

## 1. Análise de Viabilidade

O site tem base estrutural aproveitável: há um design system inicial em CSS, navegação consistente entre as páginas e blocos comerciais bem definidos para hero, produtos, provas sociais, entregas e cidades. A auditoria é plenamente executável sem reescrever o projeto.

**Melhoria técnica imediata recomendada:** centralizar a correção de encoding e a padronização dos componentes globais antes de qualquer refinamento visual. Isso reduz retrabalho, elimina ruído textual e cria base segura para ajustes responsivos e de acabamento.

---

## 2. Blueprint Arquitetural

### Estrutura auditada

- `index.html` como hub principal da experiência.
- `css/style.css` como folha global do sistema visual.
- `js/main.js` como camada de comportamento do site.
- `categorias/`, `cidades/`, `comercial/`, `produtos/` como grupos de páginas derivadas do mesmo padrão estrutural.

### Design system atual identificado

**Paleta-base**

- Primária: `#D62B2B`
- Secundária: `#1A1A2E`
- Acento: `#F4A000`
- Fundo claro: `#F8F5F0`
- Texto base: `#1A1A2E`

**Tipografia**

- Títulos: `Barlow Condensed`
- Corpo: `Lato`

**Padrão de componentes existente**

- Header sticky com faixa promocional
- Hero com CTAs duplos e bloco de estatísticas
- Grids de categorias, produtos, frete e cidades
- Blocos de prova social e footer em múltiplas colunas

---

## 3. Resumo Executivo

O site tem bons ossos: estrutura clara, conteúdo bem organizado e CTAs corretos. O problema mais urgente é sistêmico: ainda existem sinais consistentes de encoding quebrado, emojis não renderizados e caracteres inválidos em pontos críticos da interface. Isso degrada percepção de qualidade, confiança e leitura, especialmente na home e nas páginas comerciais.

Os **9 bugs de alta prioridade** são corrigíveis em uma única sessão técnica focada. A sequência recomendada de execução é:

1. Corrigir charset e encoding em todo o projeto.
2. Remover apóstrofos e caracteres inválidos em botões, ícones e estatísticas.
3. Implementar navegação mobile com menu hamburger.
4. Padronizar cards com altura uniforme e CTA ancorado no rodapé do card.
5. Adicionar dimensões explícitas ou containers estáveis para mídia e elementos visuais que geram layout shift.

Depois disso, a introdução de variáveis CSS globais e pequenos refinamentos visuais acelera todas as melhorias restantes.

---

## 4. Achados de Alta Prioridade

### 4.1 Tipografia - caracteres corrompidos em todo o site

**Sintoma:** textos como `Regio`, `Grtis`, `Avaliaes`, `Econmica` e nomes de cidades aparecem sem acentuação correta ou com substituições incorretas.  
**Impacto:** quebra credibilidade, afeta leitura e sinaliza baixa qualidade para usuários e motores de busca.  
**Direção de correção:** validar UTF-8 na origem, confirmar `<meta charset="UTF-8">` em todas as páginas, revisar pipeline de salvamento dos arquivos e recodificar arquivos ainda contaminados.

### 4.2 Conteúdo - emojis sem renderização exibidos como texto literal

**Sintoma:** placeholders como `?`, `?Y'?`, `?Yss`, `?s?` aparecem no lugar de ícones ou emojis.  
**Impacto:** gera ruído visual, reduz clareza das CTAs e transmite sensação de site quebrado.  
**Direção de correção:** remover dependência de emoji textual para UI crítica e substituir por SVG inline, pseudo-elementos controlados ou texto puro.

### 4.3 CSS - botão “Frete Grátis” no hero com caractere inválido

**Sintoma:** o CTA secundário da home exibe texto com caractere espúrio no final.  
**Impacto:** compromete o principal bloco comercial acima da dobra.  
**Direção de correção:** limpar o conteúdo textual do link, revisar a origem dos caracteres especiais e normalizar todos os CTAs promocionais equivalentes nas páginas comerciais.

### 4.4 Hierarquia - H1 partido em duas linhas com ênfase inconsistente

**Sintoma:** o H1 principal quebra no meio da frase e usa `<em>` de forma visualmente irregular.  
**Impacto:** prejudica escaneabilidade, equilíbrio do hero e hierarquia editorial.  
**Direção de correção:** reescrever o H1 com uma quebra intencional, preservar unidade semântica da frase e substituir o itálico por destaque de cor ou peso visual coerente.

### 4.5 Cards - grid de produtos sem altura uniforme em cenários móveis

**Sintoma:** descrições com tamanhos diferentes fazem os cards perderem alinhamento entre CTA e conteúdo.  
**Impacto:** o grid quebra visualmente e dificulta comparação entre produtos.  
**Direção de correção:** manter `display: flex` em coluna, garantir `flex: 1` na área de conteúdo e aplicar `margin-top: auto` ou altura mínima consistente no CTA.

### 4.6 Responsividade - navegação mobile sem menu hamburger

**Sintoma:** a navegação principal permanece horizontal em larguras pequenas e tende a transbordar da tela.  
**Impacto:** navegação ruim em mobile, perda de cliques e risco de abandono.  
**Direção de correção:** criar botão hamburger acessível, painel colapsável, estado aberto/fechado com `aria-expanded` e bloqueio de overflow lateral.

### 4.7 CSS - estatística “4.9” do hero com caractere inválido

**Sintoma:** o número aparece como `4.9?`.  
**Impacto:** contamina uma prova social crítica e reforça a percepção de erro sistêmico.  
**Direção de correção:** normalizar o conteúdo textual e separar visualmente nota e símbolo gráfico quando necessário.

### 4.8 Performance - imagens sem width/height explícitos ou container estável

**Sintoma:** o layout usa blocos com `background-image` e áreas visuais sem reserva estável de proporção em vários trechos.  
**Impacto:** aumenta CLS, especialmente no hero, cards e blocos comerciais.  
**Direção de correção:** sempre que houver `<img>`, declarar `width` e `height`; quando a mídia for background, usar `aspect-ratio`, `min-height` e skeleton visual para segurar o layout.

### 4.9 CSS - calculadora sem validação visual e selects sem tratamento de estado

**Sintoma:** a calculadora usa selects padrão e o resultado não comunica erro, sucesso ou ausência de preenchimento com clareza.  
**Impacto:** baixa confiança na ferramenta e menor conversão de uso.  
**Direção de correção:** estilizar campos, estados de foco/erro/sucesso, mensagens inline e CTA desabilitado até inputs válidos.

---

## 5. Achados de Prioridade Média

### 5.1 Tipografia - subtítulos sem padrão consistente

**Sintoma:** alguns blocos usam H2 forte, outros parecem texto decorativo sem mesma cadência visual.  
**Impacto:** a página perde ritmo e consistência entre seções.  
**Direção de correção:** definir escala tipográfica para `section-label`, `h2`, subtítulo e texto de apoio.

### 5.2 Cards - categorias com ícones quebrados ou vazios

**Sintoma:** áreas reservadas para ícones aparecem vazias ou com caracteres inválidos.  
**Impacto:** o card parece incompleto e o alinhamento perde propósito visual.  
**Direção de correção:** usar SVGs padronizados com tamanho fixo e alinhamento consistente.

### 5.3 CSS - cards de envio com gaps irregulares

**Sintoma:** a grade de frete e entrega não sustenta uma malha visual homogênea.  
**Impacto:** desequilíbrio perceptível em desktop e empilhamento pouco elegante em telas menores.  
**Direção de correção:** padronizar alturas mínimas, espaçamento interno e distribuição da malha 2x2.

### 5.4 Hierarquia - seção SEO muito densa e pouco legível

**Sintoma:** o bloco final de texto tem densidade alta e pouca diferenciação visual.  
**Impacto:** conteúdo útil fica invisível na prática, apesar de presente no HTML.  
**Direção de correção:** quebrar em subtítulos curtos, listas curtas ou dois blocos, com largura de leitura controlada.

### 5.5 CSS - footer em três ou quatro colunas colapsa mal no mobile

**Sintoma:** a malha do rodapé depende de grid largo e pode sofrer quebra ruim em dispositivos menores.  
**Impacto:** links institucionais e de produto perdem legibilidade e tocabilidade.  
**Direção de correção:** reordenar colunas, reduzir densidade por bloco e empilhar seções em um fluxo mais previsível no breakpoint mobile.

### 5.6 Performance/Segurança - links externos sem `rel="noopener"`

**Sintoma:** vários links com `target="_blank"` para WhatsApp, Shopee, Maps e avaliações não usam `rel="noopener"`.  
**Impacto:** risco evitável de segurança e má prática de performance/comportamento.  
**Direção de correção:** aplicar `rel="noopener noreferrer"` a todos os links externos abertos em nova aba.

### 5.7 Tipografia/UI - seção de cidades sem espaçamento uniforme e hover pouco trabalhado

**Sintoma:** as pills de cidades têm aparência funcional, mas ainda pouco refinada.  
**Impacto:** a seção parece mais utilitária do que comercial.  
**Direção de correção:** equalizar paddings, reforçar estados de hover e ajustar contraste/variação visual da cidade em destaque.

---

## 6. Melhorias Visuais Recomendadas

### 6.1 Hero - adicionar `aspect-ratio` fixo e skeleton loader

Eleva percepção de estabilidade visual e profissionalismo acima da dobra.

### 6.2 Botão flutuante de WhatsApp - adicionar animação de pulso discreta

Ajuda a chamar atenção para o principal canal de conversão sem poluir a interface.

### 6.3 Cards de produto - destacar item “mais vendido” com badge mais forte

Melhora orientação de escolha e cria ancoragem comercial no catálogo.

### 6.4 CSS global - consolidar variáveis de spacing, radius, shadow e tipografia

É a melhoria com maior efeito multiplicador para consistência visual e velocidade de manutenção.

### 6.5 Prova social - usar estrelas SVG reais no score 4.9

Substitui caracteres frágeis por um elemento robusto, consistente e visualmente mais confiável.

### 6.6 Navegação interna - adicionar smooth scroll e transições de estado

Melhora a sensação de acabamento sem exigir refatoração estrutural pesada.

---

## 7. Evidências Técnicas Observadas

Durante a validação manual do código atual, os seguintes padrões foram confirmados:

- Home com textos corrompidos, CTA com caractere inválido e estatística `4.9?`.
- Navegação principal sem mecanismo mobile dedicado.
- Links externos com `target="_blank"` sem `rel="noopener noreferrer"` em diversas páginas.
- Vários componentes dependentes de texto/emoji como ícone.
- Blocos visuais importantes ainda dependem de estrutura suscetível a layout shift e inconsistência de altura.

---

## 8. Ordem Recomendada de Implementação

### Fase 1 - Higiene estrutural

1. Encoding e caracteres inválidos.
2. Limpeza textual de CTAs, labels e estatísticas.
3. Substituição de emojis por SVGs ou ícones controlados.

### Fase 2 - Layout e mobile

1. Header com menu hamburger acessível.
2. Grid de produtos, categorias, frete e footer com regras mobile-first.
3. Calculadora com estados de interação e feedback.

### Fase 3 - Performance e acabamento

1. Estabilização visual contra CLS.
2. Ajuste de links externos com `rel` correto.
3. Consolidação de variáveis globais, animações e melhorias de prova social.

---

## 9. Checklist de Qualidade

- Validar home, categorias, cidades e páginas comerciais em viewport de 320px, 768px e 1440px.
- Confirmar ausência de caracteres quebrados em títulos, CTAs, breadcrumbs e footer.
- Verificar se o menu mobile abre, fecha, recebe foco e não causa overflow horizontal.
- Testar alinhamento dos cards com descrições curtas e longas.
- Confirmar que todos os links externos com nova aba usam `rel="noopener noreferrer"`.
- Medir CLS e inspeção visual acima da dobra antes e depois dos ajustes.

---

## 10. Conclusão

O principal problema do site não é falta de estrutura, e sim falta de saneamento visual e textual na camada final da interface. A prioridade correta não é redesenhar tudo: é estabilizar encoding, remover ruídos visuais críticos, corrigir navegação mobile e só então elevar acabamento.

Com essa ordem, o site pode sair de uma base funcional porém inconsistente para uma presença comercial muito mais sólida em uma única frente de trabalho bem organizada.