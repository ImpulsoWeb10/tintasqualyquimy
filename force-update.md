# Forçar Atualização no GitHub Pages

## Problema Possível:
1. Cache do GitHub Pages (até 10 minutos)
2. Branch principal diferente (main vs master)
3. Configuração do GitHub Pages

## Soluções:

### 1. Forçar atualização de cache
```bash
# Adicionar arquivo .nojekyll para forçar rebuild
echo "" > .nojekyll
git add .nojekyll
git commit -m "Force GitHub Pages rebuild"
git push origin master
```

### 2. Verificar branch principal
```bash
# Verificar se existe branch main
git ls-remote --heads origin main
```

### 3. Mudar para branch main (se existir)
```bash
git checkout -b main
git push origin main
```

### 4. Verificar configuração do GitHub Pages
- Ir ao repositório no GitHub
- Settings > Pages
- Verificar qual branch está configurado para deploy

### 5. Limpar cache manualmente
- Adicionar query string à URL: ?v=123456
- Usar hard refresh: Ctrl+F5
