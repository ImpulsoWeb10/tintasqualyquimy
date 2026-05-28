# Product Automation Flow — Full Execution

**Versão:** 1.0  
**Data:** 15 de maio de 2026  
**Tipo:** Workflow Automático  
**Escopo:** Disparado quando produto é enviado para sistema

---

## 🚀 GATILHO DE ATIVAÇÃO

**Quando ativar:**
- Novo produto recebido (input manual ou API)
- Request de atualização de produto existente
- Reprocessamento de produto com novas regras

**Input esperado:**
```json
{
  "produto": {
    "nome": "string",
    "ean": "string (13 dígitos)",
    "categoria": "string",
    "tamanho": "string",
    "peso": "string",
    "beneficios": ["string"],
    "aplicacoes": ["string"],
    "palavras_chave": ["string"],
    "urls": ["string"],
    "marketplaces": ["ml", "shopee"],
    "hashtags": ["string"],
    "imagens": ["url"]
  }
}
```

---

## 📚 FASE 1: CONSULTAR AUTOMATICAMENTE

**Arquivos obrigatórios a ler (em ordem):**

1. ✅ `core/company-data.md`
   - Extrai: nome comercial, WhatsApp, cidade, website, SEO local, redes sociais
   - Propósito: Dados base para aplicação seletiva

2. ✅ `core/brand-dna.md`
   - Extrai: tom de voz, missão, valores, diferenciadores, checklist
   - Propósito: Consistência linguística e Brand Consistency

3. ✅ `core/system-master-prompt.md`
   - Extrai: diretrizes globais, padrões de qualidade
   - Propósito: Validação de conformidade geral

4. ✅ `core/channel-rules.md`
   - Extrai: regras por canal (Landing, IG, FB, WA, ML, Shopee)
   - Propósito: Determinar `apply_company_data` flag

5. ✅ `core/master-execution-rules.md`
   - Extrai: hierarquia, matriz de conformidade, red flags
   - Propósito: Governança final

6. ✅ `memories/company.json`
   - Extrai: dados estruturados da empresa
   - Propósito: Aplicação rápida de dados

---

## ⚙️ FASE 2: EXECUTAR WORKFLOW

**Workflow base:** `workflows/create-product.md`

**14 passos internos:**
1. Receber input produto
2. Validar EAN
3. Consultar Brand DNA
4. Consultar Memory
5. Gerar SEO
6. Gerar copy
7. Gerar landing page
8. Gerar Mercado Livre
9. Gerar Shopee
10. Gerar Instagram
11. Gerar WhatsApp
12. Gerar schema
13. Validar qualidade
14. Salvar outputs

---

## 🎨 FASE 3: APLICAÇÕES TÉCNICAS

### SEO Semântico
- **Implementação:**
  - Pesquisa de intenção primária + secundária
  - Análise de topical authority
  - Semantic HTML structure (H1 único, H2 temáticos, H3 de suporte)
  - Rich snippets (schema.org)
- **Validação:** Score mínimo 8/10 em SEO tools

### Brand DNA
- **Implementação:**
  - Tom de voz (profissional, acessível, amigável, prático)
  - Frase de posicionamento
  - Linguagem natural 100% brasileira
  - Benefício > especificação
- **Validação:** Checklist completo do Brand DNA (9/10+)

### SEO Local
- **Implementação:**
  - Cidade + Estado em copy/meta
  - Keywords locais: "em Itaquaquecetuba", "SP", etc
  - Breadcrumb estruturado
  - Local schema.org (Organization)
- **Canais:** Landing, IG, FB, ML, Shopee
- **Exclusão:** WA (contexto local implícito)

### Linguagem Brasileira Natural
- **Implementação:**
  - Português brasileiro coloquial
  - Sem robótica ou formalismo corporativo
  - Emojis apropriados (IG, WA, FB)
  - Gírias/expressões naturais
- **Exemplos:**
  - ❌ "Aplicar camada uniforme utilizando movimento pendular"
  - ✅ "Passe a tinta com rolo em movimentos paralelos"

### Conversão
- **Implementação:**
  - CTAs claros e múltiplos
  - Urgência (promoção 24h, estoque limitado)
  - Social proof (avaliações, testimoniais)
  - Risk reversal (garantia, reembolso)
- **Métricas:** Target mínimo 2.5% conversão

### Mobile First
- **Implementação:**
  - Design responsivo (mobile 320px+)
  - Viewport meta tag
  - Touch-friendly buttons (min 48px)
  - Lazy loading de imagens
  - CSS otimizado (sem JS pesado)
- **Performance:** LCP < 2.5s

---

## 🤖 FASE 4: EXECUTAR AGENTES

**Sequência de agentes (paralelo onde possível):**

### 1. Input Interpreter Agent
- **Tarefa:** Validar e normalizar dados de entrada
- **Output:** Product brief estruturado
- **Validação:** EAN, campos obrigatórios

### 2. SEO Agent
- **Tarefa:** Análise semântica, KW targeting, intenção
- **Output:** SEO brief com H1, meta desc, KW alvo
- **Resultado esperado:** `/[produto]/seo/seo-optimization.md`

### 3. Copy Agent
- **Tarefa:** Gerar short/medium/long copy
- **Output:** Variações de copy por canal
- **Resultado esperado:** `/[produto]/copy/copy-outputs.md`

### 4. Landing Page Agent
- **Tarefa:** Estruturar landing page completa (HTML)
- **Output:** Hero, benefícios, prova social, CTA
- **Resultado esperado:** `/[produto]/landing-page/index.html`

### 5. Marketplace Agent
- **Tarefa:** Gerar títulos, descrições, atributos (ML + Shopee)
- **Output:** Conforme channel-rules.md
- **Resultado esperado:** `/[produto]/marketplace/marketplace-ml-shopee.md`

### 6. Social Media Agent
- **Tarefa:** IG, FB, WA captions, stories, reels, posts
- **Output:** Múltiplas variações + calendário
- **Resultado esperado:** `/[produto]/social-media/social-media-outputs.md`

### 7. FAQ Agent
- **Tarefa:** Gerar 12-15 Q&A baseadas em objetos de compra
- **Output:** Schema FAQPage + HTML accordion
- **Resultado esperado:** `/[produto]/faq/faq-outputs.md`

### 8. Schema Agent
- **Tarefa:** Gerar JSON-LD (Product, FAQPage, Breadcrumb)
- **Output:** Estruturado para Google Rich Snippets
- **Resultado esperado:** `/[produto]/schema/*.json`

### 9. QC Agent
- **Tarefa:** Validar gramática, Brand DNA, conformidade canal
- **Output:** Relatório com scores e red flags
- **Resultado esperado:** `/[produto]/qc-report/qc-report-completo.md`

---

## 📊 FASE 5: GERAR OUTPUTS

**Estrutura de pastas:**
```
outputs/
  [produto]/
    INDEX.md (metadados + resumo)
    seo/
      seo-optimization.md
    copy/
      copy-outputs.md
    landing-page/
      index.html
      style.css
    marketplace/
      marketplace-ml-shopee.md
    social-media/
      social-media-outputs.md
    faq/
      faq-outputs.md
    schema/
      product-schema.json
      faq-schema.json
      breadcrumb-schema.json
    qc-report/
      qc-report-completo.md
```

**Arquivos gerados por canal:**

### Landing Page
- ✅ index.html (completo, responsivo)
- ✅ style.css (otimizado)
- ✅ Hero + benefícios + prova social
- ✅ WhatsApp floating button
- ✅ Schema.org product JSON-LD
- ✅ Company data: Nome, WhatsApp, site, CTA

### Mercado Livre
- ✅ Título (56 caracteres)
- ✅ Descrição (800-1000 palavras)
- ✅ Bullets + atributos
- ✅ Company data: NENHUM
- ✅ Red flags: Sem WhatsApp, sem website

### Shopee
- ✅ Título (71 caracteres)
- ✅ Descrição otimizada (1000 caracteres)
- ✅ Categorização + badges
- ✅ Company data: NENHUM
- ✅ Red flags: Sem WhatsApp, sem website

### Instagram
- ✅ Post caption (3 variações)
- ✅ Carrossel (8 cards)
- ✅ Stories (4 cards)
- ✅ Reel (30 segundos roteiro)
- ✅ Hashtags (primário + secundário + local)
- ✅ Company data: Sim (parcial - só CTA e local)

### Facebook
- ✅ Post principal
- ✅ Comments replies preparadas
- ✅ Facebook Ad copy
- ✅ Company data: Sim (nome, WhatsApp, CTA)

### WhatsApp
- ✅ Mensagens automáticas (chatbot)
- ✅ Broadcast template
- ✅ Follow-up sequence (3 msgs)
- ✅ Company data: Sim (assinatura, links)

### FAQ
- ✅ FAQ Schema.org JSON (13 Q&A)
- ✅ HTML accordion
- ✅ Copy para email/WhatsApp

### Schema.org
- ✅ Product schema completo (rating, reviews, offer)
- ✅ FAQPage estruturado
- ✅ Breadcrumb JSON-LD

### HTML
- ✅ Landing page responsiva
- ✅ Sem JS pesado (performance)
- ✅ Meta tags SEO
- ✅ Open Graph + Twitter Card

---

## ✅ FASE 6: REGRAS DE CONFORMIDADE

### Aplicação Seletiva de Company Data

**Permitido (apply_company_data = true):**
- Landing Page
- Instagram
- Facebook
- WhatsApp

**Proibido (apply_company_data = false):**
- Mercado Livre
- Shopee

**O que aplicar em canais permitidos:**
```
Nome Comercial: "Tintas Qualy Quimy"
WhatsApp: "+55 11 95495-0044"
Website: "https://tintasqualyquimy.com.br"
Cidade: "Itaquaquecetuba, SP"
Assinatura: "Tintas Qualy Quimy — Qualidade profissional que você pode pagar 💚"
CTA: "Clique no link da bio para comprar"
SEO Local: ["Tintas em Itaquaquecetuba", ...]
```

### Red Flags — NÃO FAZER

#### Mercado Livre & Shopee
- ❌ WhatsApp em descrição
- ❌ "Fale conosco no WhatsApp"
- ❌ Links externos (website, Instagram, etc)
- ❌ Redirecionamentos fora da plataforma
- ❌ Menção "Qualy Quimy" como diferencial
- ❌ CTA tipo "Consulte técnico via WhatsApp"

#### Todos os Canais
- ❌ Keyword stuffing (> 2% densidade)
- ❌ Duplicação entre canais (adaptar sempre)
- ❌ H1 múltiplos
- ❌ Meta description > 160 caracteres
- ❌ Linguagem robótica
- ❌ Especificação > benefício
- ❌ Sem CTA claro

### Validação de QC

**Scores mínimos:**
- SEO: 8/10
- Brand DNA: 9/10
- Conformidade canal: 10/10
- Conversão copy: 7/10
- Linguagem: 9/10

**Checklist final:**
- [ ] Linguagem natural e brasileira?
- [ ] CTA claro e conversão focado?
- [ ] Sem keyword stuffing?
- [ ] H1, H2, H3 estruturados?
- [ ] Responde pergunta do usuário?
- [ ] Coerente com Brand DNA?
- [ ] Sem duplicação?
- [ ] Company data aplicado correto por canal?
- [ ] Sem red flags ativas?
- [ ] Mobile-friendly?

---

## 🔄 FLUXO DE EXECUÇÃO COMPLETO

```mermaid
graph TD
    A[Produto Recebido] --> B[Ler Arquivos: Company Data, Brand DNA, etc]
    B --> C{Validar Input}
    C -->|Inválido| D[Rejeitar + Mensagem]
    C -->|Válido| E[Disparar 9 Agentes em Paralelo]
    
    E --> F1[Input Interpreter]
    E --> F2[SEO Agent]
    E --> F3[Copy Agent]
    E --> F4[Landing Page Agent]
    E --> F5[Marketplace Agent]
    E --> F6[Social Media Agent]
    E --> F7[FAQ Agent]
    E --> F8[Schema Agent]
    
    F1 --> G[Aguardar Conclusão dos 8 Agentes]
    F2 --> G
    F3 --> G
    F4 --> G
    F5 --> G
    F6 --> G
    F7 --> G
    F8 --> G
    
    G --> H[QC Agent Valida Todos]
    H --> I{Passou QC?}
    I -->|Não| J[Flag para Revisão Manual]
    I -->|Sim| K[Salvar Outputs em /outputs/[produto]/]
    
    K --> L[Criar INDEX.md]
    L --> M[Notificar Conclusão]
    M --> N[FIM]
    
    J --> O[Corrigir Manualmente]
    O --> M
```

---

## 📋 CHECKLIST PRÉ-EXECUÇÃO

Antes de disparar workflow, confirmar:

- [ ] Produto tem todos os campos obrigatórios?
- [ ] EAN válido (13 dígitos)?
- [ ] Benefícios e aplicações preenchidos?
- [ ] Palavras-chave pesquisadas?
- [ ] Arquivos de consulta existem e atualizados?
- [ ] Permissão para usar dados da empresa (verificar canais)?
- [ ] Storage pronto para outputs (pasta /outputs/)?
- [ ] QC Agent disponível?

---

## 🛠️ TROUBLESHOOTING

**P: "Produto foi enviado mas não aparece em output"**  
R: Verificar se QC falhou. Revisar `/[produto]/qc-report/`. Corrigir red flags e reprocessar.

**P: "WhatsApp aparece no Mercado Livre"**  
R: Bug no Marketplace Agent. Confirmar `apply_company_data = false` foi setado. Regenerar.

**P: "Copy duplicado entre canais"**  
R: Esperado. Copy Agent deve adaptar por canal. Se idêntico, é erro. Revisar Brand DNA + Channel Rules.

**P: "Schema não valida no Google"**  
R: Rodar JSON-LD através de Google's Structured Data Validator. Ajustar campos obrigatórios.

**P: "Performance ruim na landing page"**  
R: Verificar `/landing-page/index.html`. Remover JS desnecessário, otimizar CSS, lazy-load imagens. Target: LCP < 2.5s.

---

## 📊 MÉTRICAS DE SUCESSO

**Por execução de produto:**

| Métrica | Target | Verificação |
|---------|--------|-------------|
| **Produtos processados** | 100% | Sem rejeições |
| **QC Score mínimo** | 8.5/10 | QC Report |
| **Red flags detectadas** | 0 | QC Report |
| **Brand DNA compliance** | 100% | Manual spot-check |
| **Canal compliance** | 100% | Company data aplicado correto |
| **Output files criados** | 8+ | /outputs/[produto]/ |

---

## 🔐 SEGURANÇA & COMPLIANCE

- ✅ Dados sensíveis (WhatsApp) aplicados APENAS em canais permitidos
- ✅ Sem vazamento de dados para marketplaces
- ✅ Auditoria de outputs por QC Agent
- ✅ Versionamento em INDEX.md
- ✅ Logs de execução salvos

---

## 📝 VERSIONAMENTO

| Versão | Data | Mudança |
|--------|------|---------|
| 1.0 | 15/05/2026 | Workflow automático completo com 9 agentes, 6 canais, validação QC |

**Próximas atualizações:**
- [ ] Integração com API de estoque
- [ ] Webhook para notificar fim de execução
- [ ] Dashboard de monitoring
- [ ] Reprocessamento automático em caso de falha
