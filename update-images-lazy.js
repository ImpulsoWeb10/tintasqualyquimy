// Script para implementar lazy loading em todas as imagens existentes
const fs = require('fs');
const path = require('path');

function updateImagesInHtml(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Encontrar todas as tags img e adicionar lazy loading
    const imgRegex = /<img([^>]*?)>/gi;
    
    content = content.replace(imgRegex, (match, attributes) => {
      // Verificar se já tem lazy loading
      if (attributes.includes('data-src') || attributes.includes('loading="lazy"')) {
        return match;
      }
      
      // Extrair src
      const srcMatch = attributes.match(/src\s*=\s*["']([^"']+)["']/i);
      if (!srcMatch) return match;
      
      const src = srcMatch[1];
      
      // Pular imagens base64, SVGs ou externas (CDN)
      if (src.startsWith('data:') || src.startsWith('http') || src.endsWith('.svg')) {
        return match;
      }
      
      // Converter para lazy loading
      let newAttributes = attributes.replace(/src\s*=\s*["'][^"']+["']/i, `data-src="${src}"`);
      
      // Adicionar classes de lazy loading
      if (!newAttributes.includes('class=')) {
        newAttributes += ` class="lazy-loading"`;
      } else {
        newAttributes = newAttributes.replace(/class\s*=\s*["']([^"']*)["']/i, (match, className) => {
          if (!className.includes('lazy-loading')) {
            return `class="${className} lazy-loading"`;
          }
          return match;
        });
      }
      
      // Adicionar placeholder se não tiver alt
      if (!newAttributes.includes('alt=')) {
        newAttributes += ` alt="Imagem"`;
      }
      
      hasChanges = true;
      return `<img${newAttributes}>`;
    });
    
    // Adicionar CSS para lazy loading se não existir
    if (hasChanges && !content.includes('.lazy-loading')) {
      const lazyCSS = `
<style>
.lazy-loading {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.lazy-loading.loaded {
  opacity: 1;
}
</style>`;
      
      // Adicionar após <head> ou antes de </head>
      const headEndIndex = content.indexOf('</head>');
      if (headEndIndex !== -1) {
        content = content.slice(0, headEndIndex) + lazyCSS + content.slice(headEndIndex);
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Imagens atualizadas: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Erro ao atualizar imagens em ${filePath}:`, error.message);
    return false;
  }
}

// Encontrar todos os arquivos HTML
function findHtmlFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Executar atualização
const projectDir = __dirname;
const htmlFiles = findHtmlFiles(projectDir);

console.log(`Processando ${htmlFiles.length} arquivos HTML para lazy loading de imagens...`);

let successCount = 0;
let failCount = 0;
let imageCount = 0;

for (const file of htmlFiles) {
  if (updateImagesInHtml(file)) {
    successCount++;
    imageCount++;
  } else {
    failCount++;
  }
}

console.log(`\nResumo:`);
console.log(`- Arquivos atualizados com lazy loading: ${successCount}`);
console.log(`- Arquivos sem imagens para atualizar: ${failCount}`);
console.log(`- Total de imagens convertidas: ${imageCount}`);
console.log(`\nProcesso de lazy loading concluído!`);
