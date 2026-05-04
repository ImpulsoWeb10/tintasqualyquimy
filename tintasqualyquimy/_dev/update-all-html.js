// Script para atualizar todos os arquivos HTML automaticamente
const fs = require('fs');
const path = require('path');

// Template para scripts otimizados
const optimizedScripts = `
<!-- Scripts Otimizados -->
<script src="js/utils.js"></script>
<script src="js/lazy-loading.js"></script>
<script src="js/main-secure.js"></script>

<!-- Componentes Dinâmicos -->
<script>
// Carregar componentes reutilizáveis
document.addEventListener('DOMContentLoaded', function() {
  // Header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    fetch('components/header.html')
      .then(response => response.text())
      .then(html => {
        headerContainer.innerHTML = html;
      })
      .catch(error => console.error('Erro ao carregar header:', error));
  }
  
  // Footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    fetch('components/footer.html')
      .then(response => response.text())
      .then(html => {
        footerContainer.innerHTML = html;
      })
      .catch(error => console.error('Erro ao carregar footer:', error));
  }
});
</script>`;

// Template para security headers
const securityHeaders = `
  <!-- Security Headers Meta -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me;">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">`;

// Template para CSS e fonts
const cssAndFonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link href="css/style-min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>`;

function updateHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Adicionar CSS minificado e fonts se não existir
    if (!content.includes('style-min.css')) {
      // Encontrar posição após viewport meta
      const viewportIndex = content.indexOf('<meta name="viewport"');
      if (viewportIndex !== -1) {
        const endOfViewport = content.indexOf('">', viewportIndex) + 2;
        content = content.slice(0, endOfViewport) + cssAndFonts + content.slice(endOfViewport);
      }
    }
    
    // Adicionar security headers se não existir
    if (!content.includes('X-Frame-Options')) {
      // Encontrar posição final do head
      const headEndIndex = content.indexOf('</head>');
      if (headEndIndex !== -1) {
        content = content.slice(0, headEndIndex) + securityHeaders + content.slice(headEndIndex);
      }
    }
    
    // Remover script main.js antigo
    content = content.replace(/<script src="[^"]*main\.js"><\/script>/g, '');
    
    // Adicionar scripts otimizados antes de </body>
    const bodyEndIndex = content.indexOf('</body>');
    if (bodyEndIndex !== -1 && !content.includes('utils.js')) {
      content = content.slice(0, bodyEndIndex) + optimizedScripts + content.slice(bodyEndIndex);
    }
    
    // Salvar arquivo atualizado
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Atualizado: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar ${filePath}:`, error.message);
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

console.log(`Encontrados ${htmlFiles.length} arquivos HTML para atualizar...`);

let successCount = 0;
let failCount = 0;

for (const file of htmlFiles) {
  if (updateHtmlFile(file)) {
    successCount++;
  } else {
    failCount++;
  }
}

console.log(`\nResumo:`);
console.log(`- Arquivos atualizados com sucesso: ${successCount}`);
console.log(`- Falhas: ${failCount}`);
console.log(`\nProcesso concluído!`);
