const fs = require('fs');
const path = require('path');

// Função para ler arquivo HTML
function readHTMLFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Erro ao ler arquivo ${filePath}:`, error);
        return '';
    }
}

// Função para substituir componentes no HTML
function replaceComponents(htmlContent, componentName, componentContent) {
    const placeholder = `<!-- ${componentName} -->`;
    const endPlaceholder = `<!-- /${componentName} -->`;
    
    // Encontra o início e fim do placeholder
    const startIndex = htmlContent.indexOf(placeholder);
    const endIndex = htmlContent.indexOf(endPlaceholder);
    
    if (startIndex !== -1 && endIndex !== -1) {
        // Substitui o conteúdo entre os placeholders
        const before = htmlContent.substring(0, startIndex);
        const after = htmlContent.substring(endIndex + endPlaceholder.length);
        return before + componentContent + after;
    }
    
    return htmlContent;
}

// Processa todos os arquivos HTML no diretório atual
function processHTMLFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let htmlContent = readHTMLFile(filePath);
            
            if (htmlContent) {
                // Lê os componentes
                const headerContent = readHTMLFile(path.join(dir, 'components', 'header.html'));
                const footerContent = readHTMLFile(path.join(dir, 'components', 'footer.html'));
                
                // Substitui os componentes
                if (headerContent) {
                    htmlContent = replaceComponents(htmlContent, 'HEADER', headerContent);
                }
                
                if (footerContent) {
                    htmlContent = replaceComponents(htmlContent, 'FOOTER', footerContent);
                }
                
                // Remove scripts de fetch antigos
                htmlContent = htmlContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
                
                // Salva o arquivo processado
                fs.writeFileSync(filePath, htmlContent, 'utf8');
                console.log(`✅ Processado: ${file}`);
            }
        }
    });
}

// Cria diretório dist se não existir
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Cria subdiretórios necessários
['css', 'js', 'img', 'data', 'categorias', 'cidades', 'produtos'].forEach(dir => {
    const dirPath = path.join(distDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// Copia arquivos estáticos para dist
function copyStaticFiles(src, dest) {
    const files = fs.readdirSync(src);
    
    files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        
        if (fs.statSync(srcPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyStaticFiles(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Processa os arquivos HTML
console.log('🚀 Iniciando build...');
processHTMLFiles(__dirname);

// Copia arquivos estáticos
console.log('📁 Copiando arquivos estáticos...');
['css', 'js', 'img', 'data', 'blog.html'].forEach(dir => {
    const srcDir = path.join(__dirname, dir);
    const destDir = path.join(distDir, dir);
    
    if (fs.existsSync(srcDir)) {
        copyStaticFiles(srcDir, destDir);
        console.log(`✅ Copiado: ${dir}/`);
    }
});

console.log('✅ Build concluído com sucesso!');
console.log('📂 Arquivos gerados em: ./dist/');
