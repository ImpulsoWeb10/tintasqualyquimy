# 🚀 COPY CHIEF - Skill de Geração de Conteúdo

## 📋 Descrição do Skill

Agente de IA especializado em geração de conteúdo de marketing para **Tintas Qualy Quimy**, criando materiais profissionais para Instagram, WhatsApp e Landing Pages com base em dados de produtos.

---

## 🏢 DADOS FIXOS DA MARCA (Copie e cole onde necessário)

```
Empresa: Tintas Qualy Quimy
WhatsApp: (11) 95495-0044
Link WhatsApp: https://wa.me/5511954950044
Endereço: Rua Leiria, 45 — Chácara Cuiabá, Itaquaquecetuba - SP
```

---

## 📝 Campos de Entrada

| Campo | Tipo | Obrigatório | Exemplo |
|-------|------|------------|---------|
| Nome do Produto | Text | ✅ | Grafiato Texturizado Premium |
| Embalagem | Text | ✅ | Balde 25kg |
| Rendimento | Text | ✅ | 300m² por demão |
| Onde Usar | Textarea | ✅ | Paredes internas e externas, fachadas, áreas de alto tráfego... |

---

## 📤 Saídas Geradas

### 📸 Instagram
- **Legenda completa** com gancho de atenção
- **Benefícios emocionais** e especificações técnicas
- **Prova social** e autoridade da marca
- **Call-to-action** com WhatsApp e endereço
- **20 hashtags** segmentadas (niche + localização + tendência)

### 💬 WhatsApp
- **Status impactante** com máximo 139 caracteres
- **1-2 emojis estratégicos**
- **Nome do produto** e número WhatsApp
- **Contador de caracteres** com feedback visual

### 🌐 Landing Page
- **HTML completo** funcional e responsivo
- **SEO otimizado** com meta tags e structured data
- **7 seções profissionais**: Hero, Benefícios, Especificações, Onde Usar, Depoimento, CTA, Localização
- **Design mobile-first** com cores da marca
- **Botão CTA** direto para WhatsApp

---

## 🤖 Prompt Base (Para Referência)

```javascript
function montarPrompt(nome, embalagem, rendimento, ondeUsar) {
  return `Você é um copywriter especialista em marketing de tintas e construção civil no Brasil, com domínio em SEO semântico, copywriting persuasivo e marketing digital.

DADOS FIXOS DA EMPRESA (inclua em TODAS as saídas sem exceção):
- Empresa: Tintas Qualy Quimy
- WhatsApp: (11) 95495-0044
- Link WhatsApp: https://wa.me/5511954950044
- Endereço: Rua Leiria, 45 — Chácara Cuiabá, Itaquaquecetuba - SP

PRODUTO A DIVULGAR:
- Nome: ${nome}
- Embalagem: ${embalagem}
- Rendimento: ${rendimento}
- Onde Usar: ${ondeUsar}

INSTRUÇÕES DE GERAÇÃO:
Retorne APENAS um JSON válido, sem markdown, sem texto antes ou depois, sem backticks.

{
  "instagram": "Legenda completa para post no Instagram contendo: 1) Gancho de atenção poderoso na 1ª linha (que para o scroll), 2) Apresentação do produto com benefícios reais e emocionais, 3) Especificações técnicas resumidas (embalagem e rendimento), 4) Prova social ou autoridade da marca, 5) Call-to-action com número WhatsApp e endereço completo, 6) Emojis estratégicos ao longo do texto (moderado, profissional), 7) Ao final: 20 hashtags segmentadas em 3 grupos — nicho (tintas, pintura, construção civil, reforma), localização (Itaquaquecetuba, Grande SP, Zona Leste) e tendência (decoração, casanova, acabamento).",

  "whatsapp": "Status para WhatsApp com MÁXIMO 139 caracteres. Deve ser: impactante, direto ao ponto, conter 1-2 emojis estratégicos, mencionar o nome do produto e incluir o número (11) 95495-0044. Contar os caracteres antes de retornar.",

  "landing_page": "HTML COMPLETO e funcional de uma landing page profissional pronta para publicar. Deve conter obrigatoriamente: (HEAD) DOCTYPE html, meta charset UTF-8, meta viewport, title com palavra-chave + cidade, meta description 150 chars, meta keywords, Open Graph tags og:title/og:description/og:type/og:locale, script JSON-LD schema.org tipo Product com name/description/brand/offers/seller completos; (BODY com CSS inline responsivo usando cores #e63312 vermelho e #f5f0e8 bege) Seção 1-HERO com h1 impactante e subtítulo, Seção 2-BENEFÍCIOS com 4 cards de ícone+texto, Seção 3-ESPECIFICAÇÕES em tabela HTML, Seção 4-ONDE USAR com lista visual, Seção 5-DEPOIMENTO fictício mas realista de cliente, Seção 6-CTA principal com botão grande abrindo link wa.me, Seção 7-LOCALIZAÇÃO com endereço formatado e link Google Maps, Rodapé com todos os dados da empresa. Layout mobile-first, sem dependências externas."
}`;
}
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Live Server** (extensão do VS Code/Windsurf)
- **Navegador moderno** (Chrome, Firefox, Edge)
- **Conexão com internet** (para API da IA)

### Passos
1. Abra a pasta `07-AGENTES/copy-chief/`
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. Aguarde abrir em `http://localhost:5500`
5. Preencha os dados do produto
6. Clique em **"⚡ GERAR CONTEÚDO"**

### Configuração da API
No arquivo `app.js`, linha 67, substitua `"sk-ant-api03-..."` pela sua chave real da API Anthropic Claude.

---

## 🎯 Características Técnicas

- **Vanilla JavaScript** (sem frameworks)
- **CSS separado** com design responsivo
- **Validação de campos** obrigatória
- **Loading states** com spinner animado
- **Tratamento de erros** amigável
- **Copia automática** com feedback visual
- **Preview de landing page** em nova aba
- **Contador de caracteres** para WhatsApp
- **Toast notifications** para feedback

---

## 📊 Exemplos de Uso

### Exemplo 1: Grafiato
```
Nome: Grafiato Texturizado Premium
Embalagem: Balde 25kg
Rendimento: 300m² por demão
Onde Usar: Paredes internas e externas, fachadas, áreas de alto tráfego
```

### Exemplo 2: Massa Acrílica
```
Nome: Massa Acrílica Premium
Embalagem: Galão 3,6L
Rendimento: 15m²/L
Onde Usar: Paredes internas, tetos, superfícies de drywall
```

---

## 🔧 Personalização

### Alterar Dados da Marca
Edite o objeto `MARCA` no arquivo `app.js`:

```javascript
const MARCA = {
  nome: "Sua Empresa",
  whatsapp: "(11) 99999-9999",
  whatsapp_link: "https://wa.me/5511999999999",
  endereco: "Seu Endereço Completo"
};
```

### Alterar Cores
Modifique as variáveis CSS em `style.css`:

```css
:root {
  --vermelho: #sua-cor;
  --bege: #sua-cor;
  --preto: #sua-cor;
}
```

---

## 📈 Benefícios

- **Geração rápida** de conteúdo profissional
- **Consistência** na comunicação da marca
- **SEO otimizado** para landing pages
- **Validação automática** de campos
- **Interface intuitiva** e responsiva
- **Múltiplos formatos** de saída
- **Integração direta** com WhatsApp

---

**COPY CHIEF** - Seu agente inteligente para conteúdo de marketing de tintas! 🎨
