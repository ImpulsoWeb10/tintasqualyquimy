# Master Execution Rules — Qualy Quimy

**Versão:** 1.0  
**Data:** 15 de maio de 2026  
**Classificação:** Core Strategy Document  
**Escopo:** Todas as execuções de workflow, conteúdo e produto

---

## 🎯 OBJETIVO

Consolidar as regras mestras que governam TODA execução de conteúdo, workflow e produto na Qualy Quimy. Garante consistência, compliance e automação inteligente de dados da empresa.

---

## 📋 HIERARQUIA DE APLICAÇÃO

### Nível 1: Brand DNA (Obrigatório — Todos os Canais)
**Deve-se SEMPRE aplicar:**
- Tom de voz: Profissional, acessível, amigável, prático
- Missão, valores e diferenciação
- Regras globais de comunicação (H1, H2, H3, meta descriptions, sem linguagem robótica)
- Checklist de validação (linguagem, CTA, keyword density, estrutura SEO)
- Arquétipo de marca: Criador + Cuidador

**Não negociável:** Jamais viole o tom de voz ou os valores fundamentais.

---

### Nível 2: Channel Rules (Aplicação Seletiva)
**Cada canal tem regras específicas de dados de empresa:**

| Canal | Company Data | Contato | Restrições |
|-------|--------------|---------|-----------|
| **Landing Page** | ✅ SIM | ✅ WhatsApp, site | Nenhuma |
| **Instagram** | ✅ SIM | ✅ WhatsApp, hashtags locais | Nenhuma |
| **Facebook** | ✅ SIM | ✅ WhatsApp | Nenhuma |
| **WhatsApp** | ✅ SIM | ✅ Assinatura empresa | Nenhuma |
| **Mercado Livre** | ❌ NÃO | ❌ PROIBIDO | Sem WhatsApp, sem links externos |
| **Shopee** | ❌ NÃO | ❌ PROIBIDO | Sem WhatsApp, sem links externos |

**Aplicação automática:**
- Se canal está em ✅: Incluir nome empresa, WhatsApp, cidade, SEO local, CTA padrão
- Se canal está em ❌: Remover TODOS dados de empresa e contato externo

---

### Nível 3: Company Data (Quando Permitido)
**Dados a aplicar automaticamente (apenas canais ✅):**

```json
{
  "nome_comercial": "Tintas Qualy Quimy",
  "website": "https://tintasqualyquimy.com.br",
  "whatsapp": "+55 11 95495-0044",
  "cidade": "Itaquaquecetuba, SP",
  "estado": "São Paulo",
  "pais": "Brasil",
  "horario_atendimento": "Segunda a sexta, 08:00 às 17:30",
  "redes_sociais": {
    "instagram": "https://www.instagram.com/tintasqualyquimy/",
    "facebook": "https://www.facebook.com/profile.php?id=61576746898501"
  },
  "cta_padrao": "Clique no link da bio para comprar",
  "assinatura_padrao": "Tintas Qualy Quimy — Qualidade profissional que você pode pagar 💚",
  "seo_local": ["Tintas em Itaquaquecetuba", "Massas e texturas em Itaquaquecetuba", "Grafiato, projetada, arenato em Itaquaquecetuba"]
}
```

**Regra de inserção:**
- Landing Page: Nome, WhatsApp, site, CTA, assinatura
- Instagram/Facebook: Nome, WhatsApp, CTA, hashtags locais
- WhatsApp: Assinatura empresa, links site, CTA
- Mercado Livre/Shopee: NENHUM dados acima

---

## ⚙️ WORKFLOW EXECUTION RULES

### Passo 1: Input Produto
- ✅ Capturar dados do produto (nome, categoria, benefícios, aplicações, KW)
- ✅ Normalizar EAN, peso, medidas

### Passo 2: Validação de Canal
- ❓ Identificar canal alvo (Landing, IG, FB, WA, ML, Shopee)
- 📋 Consultar `channel-rules.md` para verificar se aceita company data
- 📌 Marcar flag: `apply_company_data = true/false`

### Passo 3: Aplicar Brand DNA
- ✅ Aplicar tom de voz do `brand-dna.md`
- ✅ Garantir H1 único, H2 temáticos, H3 de suporte
- ✅ Meta description 155-160 caracteres
- ✅ Sem keyword stuffing (máx 1-2%)
- ✅ Sem linguagem robótica
- ✅ Foco em benefício, não especificação
- ✅ Checklist de validação completo

### Passo 4: Gerar Conteúdo Base
- 📝 Criar copy comercial (short, medium, long)
- 📝 Estruturar landing page (hero, benefícios, prova social, CTA)
- 📝 Adaptar para marketplace (título otimizado, bullets, atributos)
- 📱 Criar legendas para redes sociais
- 💬 Preparar mensagens WhatsApp

### Passo 5: Aplicar Company Data (Se Permitido)
- ✅ Se `apply_company_data = true`: Inserir todos dados de empresa
  - Nome comercial em seções de prova social
  - WhatsApp como CTA principal ou secundário
  - Website em footer ou links finais
  - Cidade em SEO local
  - Assinatura em WhatsApp
- ❌ Se `apply_company_data = false`: Remover QUALQUER referência a:
  - Nome "Qualy Quimy" (manter genérico ou remover)
  - WhatsApp da empresa
  - Links externos
  - Redirecionamentos fora da plataforma

### Passo 6: Gerar Schema.org
- 📊 Product schema com rating, reviews, offer
- 📊 FAQPage com Q&A estruturado
- 📊 Breadcrumb para navegação
- ✅ Validar JSON-LD

### Passo 7: Quality Assurance
- ✅ Verificar gramática e coerência
- ✅ Validar aderência ao Brand DNA
- ✅ Checar compliance de canal (company data aplicado correto)
- ✅ Confirmar ausência de duplicação
- ✅ Score mínimo SEO: 8/10
- ✅ Score Brand DNA: 9/10

### Passo 8: Salvar Outputs
- 💾 Organizar por canal em pasta estruturada
- 📂 Estrutura: `/outputs/[produto]/[canal]/`
- 📋 Criar INDEX.md com metadados
- 🔖 Registrar versionamento

---

## 🚫 RED FLAGS — O QUE NUNCA FAZER

### Mercado Livre & Shopee
- ❌ Inserir WhatsApp ou referência a "fale conosco no WhatsApp"
- ❌ Colocar links para site externo ou redirecionamentos
- ❌ Mencionar "Qualy Quimy" como diferencial da marca
- ❌ Instruir cliente a sair da plataforma para mais informações
- ❌ Copiar/colar texto de Landing Page sem remover company data

### Todos os Canais
- ❌ Violação do tom de voz (robótico, formal demais, genérico)
- ❌ Keyword stuffing (repetição forçada de palavras-chave)
- ❌ Conteúdo duplicado entre canais (adaptar sempre)
- ❌ H1 múltiplos em uma página
- ❌ Meta description > 160 caracteres ou < 120
- ❌ Exageros ou promessas infundadas
- ❌ Sem CTA claro

---

## ✅ CHECKLIST PRÉ-EXECUÇÃO

Antes de gerar conteúdo, responder:

- [ ] **Canal identificado?** Landing / IG / FB / WA / ML / Shopee
- [ ] **Company data permitido?** Consultar `channel-rules.md`
- [ ] **Brand DNA consultado?** Tone, missão, valores confirmados
- [ ] **Produto briefado?** Nome, benefícios, KW, aplicações
- [ ] **SEO planejado?** H1, meta desc, KW alvo definidos
- [ ] **Red flags revisadas?** Nenhuma violação esperada
- [ ] **Equipe pronta?** (se workflow manual)

---

## 📊 MATRIZ DE CONFORMIDADE

| Aspecto | Landing | IG | FB | WA | ML | Shopee |
|---------|---------|----|----|----|----|--------|
| **Brand DNA** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Tone of Voice** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Nome Empresa** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **WhatsApp** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Website Link** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **CTA Externo** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **SEO Local** | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| **Hashtags Locais** | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ |

---

## 🔄 APLICAÇÃO EM WORKFLOW

### Exemplo: Criar produto "X" para Mercado Livre

1. **Ler** `brand-dna.md`, `company-data.md`, `channel-rules.md`
2. **Identificar** canal = Mercado Livre → `apply_company_data = false`
3. **Gerar** título SEO, descrição, bullets
   - ✅ Aplicar Brand DNA (tom, linguagem)
   - ❌ NÃO incluir WhatsApp
   - ❌ NÃO incluir website
   - ❌ NÃO mencionar "Qualy Quimy"
4. **Validar** com QC Report
5. **Salvar** em `/outputs/[produto]/marketplace/`

### Exemplo: Criar mesmo produto para Landing Page

1. **Ler** `brand-dna.md`, `company-data.md`, `channel-rules.md`
2. **Identificar** canal = Landing Page → `apply_company_data = true`
3. **Gerar** hero, benefícios, prova social, landing
   - ✅ Aplicar Brand DNA
   - ✅ Incluir WhatsApp
   - ✅ Incluir website
   - ✅ Incluir "Tintas Qualy Quimy"
4. **Validar** com QC Report
5. **Salvar** em `/outputs/[produto]/landing-page/`

---

## 🛠️ TROUBLESHOOTING

**P: "Preciso colocar WhatsApp em Mercado Livre"**  
R: Não. Veja `channel-rules.md` — é proibido. Se cliente insiste, escale.

**P: "Como adaptar Landing para Shopee?"**  
R: Copie o conteúdo, remova WhatsApp, site e "Qualy Quimy", mantenha Brand DNA. Resultado: descrição genérica mas alinhada à voz da marca.

**P: "E se o produto não tiver suficientes dados?"**  
R: Sugerir dados fictícios realistas para demo, ou pedir briefing completo antes de prosseguir.

**P: "Quem aprova as regras?"**  
R: CEO/CMO Qualy Quimy. Mudanças requerem update aqui + notificação time.

---

## 📝 VERSIONAMENTO

| Versão | Data | Mudança |
|--------|------|---------|
| 1.0 | 15/05/2026 | Inicial com 6 canais + hierarquia Brand DNA / Channel Rules / Company Data |

**Próximas atualizações:**
- [ ] Integração com CMS
- [ ] Automação de compliance checker
- [ ] Dashboard de conformidade por canal
