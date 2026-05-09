# Tintas Qualy Quimy

Site institucional e e-commerce da Tintas Qualy Quimy, especializada em tintas, massas e texturas de alta qualidade.

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização com TailwindCSS
- **JavaScript** - Funcionalidades interativas e dinâmicas

### Dependências Externas (CDNs)
- **TailwindCSS**: `https://cdn.tailwindcss.com`
- **Google Fonts**: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`

### Ferramentas de Build
- **clean-css-cli**: Minificação de CSS
- **uglify-js**: Minificação e concatenação de JavaScript
- **Node.js**: Automação do processo de build

## 📁 Estrutura do Projeto

```
tintasqualyquimy/
├── index.html              # Página principal
├── blog.html              # Blog da empresa
├── sobre.html             # Sobre nós
├── politica-de-privacidade.html  # Política de privacidade
├── termos-de-uso.html     # Termos de uso
├── css/                   # Arquivos CSS
│   ├── style.css          # Estilos principais
│   └── style-min.css     # CSS minificado (build)
├── js/                   # Arquivos JavaScript
│   ├── main.js           # Lógica principal
│   ├── utils.js          # Funções utilitárias
│   ├── lazy-loading.js   # Carregamento preguiçoso
│   └── app-min.js       # JS minificado (build)
├── data/                 # Dados dinâmicos
│   └── produtos.json     # Catálogo de produtos
├── components/           # Componentes reutilizáveis
│   ├── header.html       # Cabeçalho
│   └── footer.html       # Rodapé
├── img/                 # Imagens do site
├── categorias/           # Páginas de categorias
├── cidades/             # Páginas de cidades
├── produtos/            # Páginas de produtos
├── dist/                # Arquivos buildados para deploy
├── build.js            # Script de build
├── package.json         # Configuração do projeto
└── README.md           # Documentação
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia um servidor de desenvolvimento local na porta 3000 com os componentes já processados.

### Build
```bash
npm run build
```
Executa o processo completo de build:
1. Minifica CSS
2. Minifica e concatena JavaScript
3. Processa componentes HTML
4. Copia arquivos estáticos para `dist/`

### Build Individual
```bash
npm run build:css      # Minifica CSS
npm run build:js       # Minifica JavaScript
npm run build:components  # Processa componentes HTML
```

## 📋 Funcionalidades Principais

### 🛒 E-commerce
- Catálogo de produtos dinâmico via JSON
- Calculadora de tintas interativa
- Botões de compra via WhatsApp e Shopee
- Lightbox para visualização de embalagens

### 🎨 Design e UX
- Design responsivo para todos os dispositivos
- Navegação consistente em todas as páginas
- Breadcrumbs para melhor navegação
- Lazy loading de imagens
- Menu mobile otimizado

### 🔧 Manutenibilidade
- Componentes reutilizáveis (header/footer)
- Dados externalizados em JSON
- Sistema de build automatizado
- Modo de depuração configurável

## 🐛 Modo de Depuração

Para ativar o modo de depuração:
```javascript
localStorage.setItem('debug', 'true');
```

Para desativar:
```javascript
localStorage.removeItem('debug');
```

O modo de depuração exibe logs detalhados no console para facilitar o desenvolvimento.

## 📱 SEO e Performance

### Otimizações Implementadas
- **SEO**: Meta tags otimizadas, breadcrumbs, estrutura semântica
- **Performance**: Lazy loading, minificação de assets, cache otimizado
- **Acessibilidade**: ARIA labels, navegação por teclado, contraste adequado

### Schema.org
- Structured data para produtos, organização e breadcrumbs
- Melhora visibilidade em mecanismos de busca

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/` prontos para deploy.

### Estrutura de Deploy
- Upload do conteúdo da pasta `dist/`
- Configuração de servidor para servir arquivos estáticos
- Configuração de cache para assets estáticos

## 📞 Contato

- **WhatsApp**: (11) 95495-0044
- **Shopee**: https://shopee.com.br/qualyquimy
- **Endereço**: Rua Leiria, 45 - Chácara Cuiabá, Itaquaquecetuba - SP

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT.

---

**Desenvolvido por ImpulsoWeb10**  
*Especialistas em desenvolvimento web e soluções digitais*
