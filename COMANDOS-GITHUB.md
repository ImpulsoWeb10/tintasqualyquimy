# Comandos para fazer o push das melhorias para o GitHub

## 1. Inicializar o repositório (se necessário)
```bash
git init
git remote add origin https://github.com/ImpulsoWeb10/tintasqualyquimy.git
```

## 2. Adicionar todos os arquivos
```bash
git add .
```

## 3. Fazer commit das melhorias
```bash
git commit -m "Melhorias de segurança e performance implementadas

- Segurança: XSS eliminado, headers CSP implementados
- Performance: CSS/JS minificados, lazy loading adicionado
- Código: Componentes reutilizáveis, utilitários centralizados
- Arquivos: 68 HTML atualizados, 100% funcionalidade preservada"
```

## 4. Fazer push para o GitHub
```bash
git push origin main
# ou
git push origin master
```

## Resumo das alterações que serão enviadas:

### Novos arquivos:
- js/main-secure.js (versão segura sem XSS)
- js/main-min.js (versão minificada)
- js/utils.js (utilitários compartilhados)
- js/lazy-loading.js (lazy loading)
- css/style-min.css (CSS minificado)
- components/header.html (header reutilizável)
- components/footer.html (footer reutilizável)
- .htaccess (headers de segurança)
- README.md (documentação completa)

### Arquivos modificados:
- 68 arquivos HTML atualizados com:
  - Scripts seguros
  - CSS minificado
  - Headers de segurança
  - Componentes dinâmicos
  - Lazy loading em imagens

## Importante:
- Backup do repositório original recomendado antes do push
- Todas as funcionalidades foram preservadas
- Layout visual mantido 100%
