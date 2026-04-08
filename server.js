const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    }
  }
}));

app.post('/gerar', (req, res) => {
  const produto = (req.body.produto || '').toString().trim().toLowerCase();

  if (!produto) {
    return res.json({ erro: true });
  }

  const produtoSlug = produto.replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  if (!produtoSlug) {
    return res.json({ erro: true });
  }

  const base = __dirname;

  const arquivos = [
    { caminho: `01-site/${produtoSlug}-landing.html`, conteudo: `<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${produtoSlug} Landing | Tintas Qualy Quimy</title><meta name="description" content="Pagina de landing para ${produtoSlug} na Tintas Qualy Quimy."><link rel="canonical" href="/01-site/${produtoSlug}-landing.html"><link rel="stylesheet" href="/assets/css/global.css"></head><body><div class="site-shell"><header class="site-header"><h1>${produtoSlug} Landing</h1><p>Conteudo gerado automaticamente pelo painel.</p></header><main class="section card"><h2>Produto ${produtoSlug}</h2><p>Pagina pronta para refinamento comercial.</p></main></div><script src="/assets/js/site.js" defer></script></body></html>` },
    { caminho: `02-seo-google/${produtoSlug}.txt`, conteudo: `Anuncio Google ${produtoSlug}` },
    { caminho: `03-shoppe/${produtoSlug}.html`, conteudo: `<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${produtoSlug} Shopee</title><meta name="description" content="Produto ${produtoSlug} no canal Shopee."><link rel="canonical" href="/03-shoppe/${produtoSlug}.html"><link rel="stylesheet" href="/assets/css/global.css"></head><body><div class="site-shell"><header class="site-header"><h1>${produtoSlug} - Shopee</h1></header><main class="section card"><h2>Descricao rapida</h2><p>Conteudo inicial criado automaticamente.</p></main></div><script src="/assets/js/site.js" defer></script></body></html>` },
    { caminho: `04-mercadolivre/${produtoSlug}.html`, conteudo: `<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${produtoSlug} Mercado Livre</title><meta name="description" content="Produto ${produtoSlug} no canal Mercado Livre."><link rel="canonical" href="/04-mercadolivre/${produtoSlug}.html"><link rel="stylesheet" href="/assets/css/global.css"></head><body><div class="site-shell"><header class="site-header"><h1>${produtoSlug} - Mercado Livre</h1></header><main class="section card"><h2>Descricao rapida</h2><p>Conteudo inicial criado automaticamente.</p></main></div><script src="/assets/js/site.js" defer></script></body></html>` },
    { caminho: `05-whatsaap/${produtoSlug}.txt`, conteudo: `Quero ${produtoSlug}` },
    { caminho: `06-instagram/${produtoSlug}.txt`, conteudo: `Post Instagram ${produtoSlug}` },
    { caminho: `07-tiktok/${produtoSlug}.txt`, conteudo: `Post TikTok ${produtoSlug}` },
    { caminho: `08-facebook-marketplace/${produtoSlug}.txt`, conteudo: `Roteiro anuncio ${produtoSlug}` }
  ];

  arquivos.forEach(a => {
    const fullPath = path.join(base, a.caminho);

    // cria pasta se não existir
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    fs.writeFileSync(fullPath, a.conteudo);
  });

  console.log(`🔥 Gerado: ${produtoSlug}`);

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("🚀 Rodando em http://localhost:3000");
});