# 🚀 COPY CHIEF - Agente de Conteúdo para Tintas Qualy Quimy

## 📖 Descrição

Interface profissional para geração automática de conteúdo de marketing especializado em tintas, criando materiais prontos para Instagram, WhatsApp e Landing Pages com inteligência artificial.

---

## 🎯 Funcionalidades Principais

- ✅ **Geração de conteúdo** para 3 plataformas (Instagram, WhatsApp, Landing Page)
- ✅ **Interface intuitiva** com design profissional
- ✅ **Validação automática** de campos obrigatórios
- ✅ **Cópia automática** com feedback visual
- ✅ **Preview de landing page** em nova aba
- ✅ **Contador de caracteres** para WhatsApp
- ✅ **Design responsivo** para mobile e desktop
- ✅ **Loading states** com animações
- ✅ **Tratamento de erros** amigável

---

## 🚀 Como Usar

### 1. Pré-requisitos
- **Live Server** (extensão do VS Code/Windsurf)
- **Navegador moderno** (Chrome, Firefox, Edge)
- **Conexão com internet** (para API da IA)
- **Chave API Anthropic** (opcional para testes)

### 2. Instalação e Execução

```bash
# Clone o repositório (se necessário)
git clone [URL-do-repositório]

# Navegue até a pasta do agente
cd 07-AGENTES/copy-chief/

# Abra no VS Code ou Windsurf
code .

# Clique com botão direito em index.html
# Selecione "Open with Live Server"
```

### 3. Configuração da API

No arquivo `app.js`, linha 67, configure sua chave:

```javascript
// Substitua pela sua chave real
"x-api-key": "sk-ant-api03-sua-chave-aqui"
```

### 4. Usando o Agente

1. **Preencha os dados do produto:**
   - Nome do Produto
   - Embalagem
   - Rendimento
   - Onde Usar

2. **Selecione os tipos de saída:**
   - 📸 Instagram
   - 💬 WhatsApp
   - 🌐 Landing Page

3. **Clique em "⚡ GERAR CONTEÚDO"**

4. **Copie ou visualize os resultados:**
   - Botão "Copiar" em cada card
   - Botão "👁 VISUALIZAR LANDING PAGE"

---

## 📁 Estrutura de Arquivos

```
07-AGENTES/copy-chief/
├── index.html          # Interface principal do agente
├── style.css           # Estilos profissionais e responsivos
├── app.js              # Lógica JavaScript completa
├── SKILL.md            # Documentação técnica do skill
└── README.md           # Este arquivo de instruções
```

---

## 📝 Campos do Formulário

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **Nome do Produto** | Nome comercial do produto | "Grafiato Texturizado Premium" |
| **Embalagem** | Formato e tamanho | "Balde 25kg" |
| **Rendimento** | Cobertura por aplicação | "300m² por demão" |
| **Onde Usar** | Aplicações recomendadas | "Paredes internas, fachadas, áreas úmidas" |

---

## 📤 Saídas Geradas

### 📸 Instagram
- Legenda completa com gancho de atenção
- Benefícios emocionais e técnicos
- Prova social da marca
- Call-to-action com WhatsApp
- 20 hashtags segmentadas

### 💬 WhatsApp
- Status impactante (máx. 139 caracteres)
- 1-2 emojis estratégicos
- Número WhatsApp incluído
- Contador visual de caracteres

### 🌐 Landing Page
- HTML completo funcional
- SEO otimizado (meta tags, structured data)
- 7 seções profissionais
- Design responsivo com cores da marca
- Botão CTA direto para WhatsApp

---

## 🎨 Design e Cores

**Cores da Marca:**
- Vermelho: `#e63312`
- Bege: `#f5f0e8`
- Preto: `#0f0f0f`

**Fontes:**
- Títulos: `Bebas Neue`
- Corpo: `DM Sans`

---

## 🏢 Dados Fixos da Empresa

```
Empresa: Tintas Qualy Quimy
WhatsApp: (11) 95495-0044
Link WhatsApp: https://wa.me/5511954950044
Endereço: Rua Leiria, 45 — Chácara Cuiabá, Itaquaquecetuba - SP
```

---

## 💡 Exemplos de Uso

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

### Exemplo 3: Selador
```
Nome: Selador Acrílico Universal
Embalagem: Lata 18L
Rendimento: 20m²/L
Onde Usar: Superfícies novas, preparação de paredes, substratos porosos
```

---

## 🔧 Personalização

### Alterar Dados da Marca
Edite o objeto `MARCA` em `app.js`:

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
  --vermelho: #sua-cor-principal;
  --bege: #sua-cor-secundaria;
  --preto: #sua-cor-texto;
}
```

---

## 🛠️ Requisitos Técnicos

- **HTML5** semântico e acessível
- **CSS3** com variáveis e grid/flexbox
- **JavaScript ES6+** vanilla
- **API Fetch** para comunicação com IA
- **Live Server** para evitar CORS
- **Navegadores modernos** (Chrome 70+, Firefox 65+, Edge 79+)

---

## 🚨 Solução de Problemas

### Erro de CORS
- **Causa**: Abrir arquivo diretamente (file://)
- **Solução**: Usar Live Server (http://localhost)

### API não responde
- **Causa**: Chave inválida ou sem internet
- **Solução**: Verificar chave e conexão

### Conteúdo não gera
- **Causa**: Campos obrigatórios vazios
- **Solução**: Preencher todos os campos marcados com *

### Copiar não funciona
- **Causa**: Permissões do navegador
- **Solução**: Selecionar texto manualmente

---

## 📈 Benefícios

- **Economia de tempo**: Geração em segundos
- **Consistência**: Mesmo tom de voz em todos os materiais
- **Profissionalismo**: Conteúdo otimizado para cada plataforma
- **SEO integrado**: Landing pages prontas para Google
- **Flexibilidade**: Escolha quais formatos gerar
- **Facilidade**: Interface intuitiva sem necessidade de treinamento

---

## 🤝 Suporte

Para dúvidas ou suporte:
- 📞 **WhatsApp**: (11) 95495-0044
- 📍 **Presencial**: Rua Leiria, 45 — Itaquaquecetuba - SP
- 🌐 **Online**: Acesse via Live Server

---

## 📄 Licença

Este projeto é propriedade da **Tintas Qualy Quimy** e deve ser utilizado internamente para geração de conteúdo de marketing.

---

**COPY CHIEF** - Seu agente inteligente para conteúdo profissional de tintas! 🎨✨
