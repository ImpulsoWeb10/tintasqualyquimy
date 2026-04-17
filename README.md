# Tintas Qualy Quimy - Site Institucional

Site estático responsivo para a empresa Qualy Quimy, especializada em tintas e texturas de alta qualidade.

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com TailwindCSS e CSS customizado
- **JavaScript Vanilla** - Funcionalidades interativas
- **Schema.org** - Dados estruturados para SEO
- **WebP** - Formato otimizado de imagens

## Estrutura do Projeto

```
tintasqualyquimy/
|
|--- index.html              # Página principal
|--- css/
|    |--- style.css          # Estilos principais
|    |--- style-min.css      # Versão minificada
|
|--- js/
|    |--- main.js            # Funcionalidades principais
|    |--- main-secure.js     # Versão segura (sem XSS)
|    |--- main-min.js        # Versão minificada
|    |--- utils.js           # Utilitários compartilhados
|    |--- lazy-loading.js    # Lazy loading de imagens
|
|--- components/
|    |--- header.html        # Header reutilizável
|    |--- footer.html        # Footer reutilizável
|
|--- produtos/               # Páginas de produtos
|--- categorias/             # Páginas de categorias
|--- cidades/                # Páginas de localização
|--- blog/                   # Artigos do blog
|--- comercial/              # Páginas comerciais
|
|--- assets/
|    |--- imagens/           # Imagens do site
|
|--- .htaccess               # Configurações de segurança
|--- robots.txt              # Diretrizes para crawlers
|--- sitemap.xml             # Mapa do site
|
```

## Funcionalidades Principais

### 1. Sistema de Produtos
- Catálogo completo de produtos
- Filtros por categoria
- Páginas individuais com detalhes
- Calculadora de quantidade

### 2. Calculadora Inteligente
- Cálculo automático de quantidade
- Sugestão de embalagens ideais
- Integração com WhatsApp

### 3. Sistema de Localização
- Páginas para cidades atendidas
- Informações de entrega
- Filtros por região

### 4. SEO Otimizado
- Meta tags completas
- Schema.org para produtos
- Sitemap.xml dinâmico
- URLs amigáveis

## Melhorias de Segurança Implementadas

### 1. Prevenção XSS
- Substituição de `innerHTML` por `textContent`
- Função `sanitizeHTML()` para conteúdo dinâmico
- Validação de entrada de formulários

### 2. Headers de Segurança
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

### 3. Proteção Adicional
- HTTPS obrigatório em produção
- Validação de formulários do lado do cliente
- Sanitização de dados do usuário

## Performance

### 1. Otimizações Implementadas
- Lazy loading de imagens
- Arquivos CSS/JS minificados
- Cache de recursos via .htaccess
- Compressão GZIP

### 2. Métricas
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## Componentes Reutilizáveis

### Header Component
```html
<!-- Inclua em qualquer página -->
<div id="header-container"></div>
<script>
fetch('components/header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  });
</script>
```

### Footer Component
```html
<!-- Inclua em qualquer página -->
<div id="footer-container"></div>
<script>
fetch('components/footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
  });
</script>
```

## Utilitários JavaScript

### Namespace QualyQuimy
```javascript
// Sanitização segura
QualyQuimy.sanitize(string);

// Formatação de moeda
QualyQuimy.formatCurrency(123.45);

// Envio WhatsApp
QualyQuimy.sendWhatsApp('Mensagem');

// Smooth scroll
QualyQuimy.smoothScroll('#elemento');

// Validação de formulário
QualyQuimy.validateForm(form);
```

## Configuração do Ambiente

### 1. Servidor Web
- Apache (recomendado) ou Nginx
- PHP não necessário (site estático)
- Suporte a .htaccess (Apache)

### 2. Dependências
- Nenhuma dependência de servidor
- CDN para TailwindCSS
- Google Fonts para tipografia

### 3. Build Process
```bash
# Minificar CSS (opcional)
npx clean-css-cli -o css/style-min.css css/style.css

# Minificar JS (opcional)
npx uglify-js js/main.js -o js/main-min.js
```

## Deploy

### 1. Hospedagem Compartilhada
1. Upload dos arquivos para pasta public_html
2. Configurar .htaccess
3. Verificar permissões de arquivos

### 2. GitHub Pages
1. Fazer push do repositório
2. Configurar GitHub Pages
3. Ativar domínio personalizado (se necessário)

### 3. Vercel/Netlify
1. Conectar repositório
2. Configurar build settings
3. Deploy automático

## Manutenção

### 1. Conteúdo
- Atualizar produtos em `js/main.js`
- Modificar preços e informações
- Adicionar novas categorias

### 2. SEO
- Monitorar Google Search Console
- Atualizar sitemap.xml
- Analisar métricas de performance

### 3. Segurança
- Atualizar headers CSP se necessário
- Monitorar logs de segurança
- Manter dependências atualizadas

## Troubleshooting

### Problemas Comuns

1. **Imagens não carregam**
   - Verificar caminhos em assets/imagens/
   - Confirmar formato WebP suportado

2. **Calculadora não funciona**
   - Verificar console para erros JavaScript
   - Confirmar IDs dos elementos

3. **Menu mobile não abre**
   - Verificar se utils.js está carregado
   - Confirmar classes CSS

### Debug Mode
```javascript
// Ativar logs detalhados
localStorage.setItem('debug', 'true');
```

## Contato

- **Desenvolvedor**: ImpulsoWeb10
- **Email**: contato@tintasqualyquimy.com.br
- **Telefone**: (11) 4643-2301
- **WhatsApp**: (11) 95495-0044

## Licença

Este projeto é propriedade da Qualy Quimy. Todos os direitos reservados.

---

**Última atualização**: Abril 2026
**Versão**: 2.0.0
**Status**: Produção
