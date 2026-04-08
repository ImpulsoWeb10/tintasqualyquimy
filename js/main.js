// ============================================================
// QUALY QUIMY — JS Principal
// ============================================================

// Dados dos produtos (fonte única de verdade)
const PRODUTOS = [
  {
    slug: 'grafiato',
    nome: 'Grafiato',
    categoria: 'texturas',
    categorianome: 'Texturas e Grafiato',
    icon: '🧱',
    embalagens: ['5,6kg', '25kg'],
    rendimento: 4.5,
    unidadeRend: 'kg/m²',
    descricao: 'Acabamento texturizado para fachadas e paredes internas. Alta durabilidade e resistência às intempéries.',
    aplicacao: 'Interno e Externo',
    tag: null
  },
  {
    slug: 'textura-lisa',
    nome: 'Textura Lisa',
    categoria: 'texturas',
    categorianome: 'Texturas e Grafiato',
    icon: '🏠',
    embalagens: ['5,6kg', '25kg'],
    rendimento: 3.1,
    unidadeRend: 'kg/m²',
    descricao: 'Textura lisa de alta qualidade para paredes internas e externas. Acabamento uniforme e elegante.',
    aplicacao: 'Interno e Externo',
    tag: null
  },
  {
    slug: 'massa-pva',
    nome: 'Massa PVA',
    categoria: 'massas',
    categorianome: 'Massas',
    icon: '🪣',
    embalagens: ['5,6kg', '25kg'],
    rendimento: 1.0,
    unidadeRend: 'kg/m²',
    descricao: 'Massa corrida PVA para nivelamento e acabamento de paredes internas. Fácil de aplicar e lixar.',
    aplicacao: 'Somente Interno',
    tag: null
  },
  {
    slug: 'massa-acrilica',
    nome: 'Massa Acrílica',
    categoria: 'massas',
    categorianome: 'Massas',
    icon: '🪣',
    embalagens: ['5,6kg', '25kg'],
    rendimento: 1.0,
    unidadeRend: 'kg/m²',
    descricao: 'Massa acrílica para uso interno e externo. Superior à PVA em resistência à umidade e durabilidade.',
    aplicacao: 'Interno e Externo',
    tag: null
  },
  {
    slug: 'seladora',
    nome: 'Seladora',
    categoria: 'fundos',
    categorianome: 'Fundos e Seladores',
    icon: '🔧',
    embalagens: ['1L', '3,6L', '16L'],
    rendimento: 8.0,
    unidadeRend: 'm²/L',
    descricao: 'Seladora acrílica para preparação de paredes novas. Melhora a aderência e uniformiza a absorção.',
    aplicacao: 'Interno e Externo',
    tag: null
  },
  {
    slug: 'tinta-economica-qualy-color-uso-interno',
    nome: 'Tinta Econômica Qualy Color',
    categoria: 'tintas',
    categorianome: 'Tintas',
    icon: '🎨',
    embalagens: ['1L', '3,6L', '18L'],
    rendimento: 11.0,
    unidadeRend: 'm²/L',
    descricao: 'Tinta acrílica premium lavável para uso interno e externo. Catálogo completo de cores disponível.',
    aplicacao: 'Interno e Externo',
    tag: 'MAIS VENDIDA'
  },
  {
    slug: 'esmalte',
    nome: 'Esmalte',
    categoria: 'tintas',
    categorianome: 'Tintas',
    icon: '🎨',
    embalagens: ['3,6L'],
    rendimento: 12.0,
    unidadeRend: 'm²/L',
    descricao: 'Esmalte sintético de alta resistência para madeiras, metais e superfícies diversas. Acabamento brilhante e duradouro.',
    aplicacao: 'Madeira e Metal',
    tag: null
  },
  {
    slug: 'textura-projetada',
    nome: 'Textura Projetada Branca',
    categoria: 'texturas',
    categorianome: 'Texturas e Grafiato',
    icon: '🏗️',
    embalagens: ['25kg'],
    rendimento: 3.1,
    unidadeRend: 'kg/m²',
    descricao: 'Textura projetada branca para fachadas e paredes externas. Aplicação por projeção mecânica ou manual.',
    aplicacao: 'Interno e Externo',
    tag: null
  },
  {
    slug: 'liqui-brilho',
    nome: 'Liqui Brilho',
    categoria: 'acabamentos',
    categorianome: 'Acabamentos e Vernizes',
    icon: '✨',
    embalagens: ['1L', '3,6L'],
    rendimento: 8.0,
    unidadeRend: 'm²/L',
    descricao: 'Acabamento com brilho e impermeabilização. Transparente, ideal sobre texturas, grafiato e pinturas.',
    aplicacao: 'Interno e Externo',
    tag: 'NOVIDADE'
  }
];

const CIDADES = [
  { slug: 'itaquaquecetuba', nome: 'Itaquaquecetuba', uf: 'SP', destaque: true },
  { slug: 'mogi-das-cruzes', nome: 'Mogi das Cruzes', uf: 'SP' },
  { slug: 'suzano', nome: 'Suzano', uf: 'SP' },
  { slug: 'ferraz-de-vasconcelos', nome: 'Ferraz de Vasconcelos', uf: 'SP' },
  { slug: 'poa', nome: 'Poá', uf: 'SP' },
  { slug: 'aruja', nome: 'Arujá', uf: 'SP' },
  { slug: 'guarulhos', nome: 'Guarulhos', uf: 'SP' },
  { slug: 'guaianases', nome: 'Guaianases', uf: 'SP' },
  { slug: 'itaim-paulista', nome: 'Itaim Paulista', uf: 'SP' },
  { slug: 'sao-miguel-paulista', nome: 'São Miguel Paulista', uf: 'SP' },
  { slug: 'cidade-tiradentes', nome: 'Cidade Tiradentes', uf: 'SP' },
  { slug: 'lajeado', nome: 'Lajeado', uf: 'SP' }
];

// ========== CALCULADORA ==========
function calcularTinta() {
  const area = parseFloat(document.getElementById('area')?.value || 0);
  const slug = document.getElementById('produto-calc')?.value;
  const demaos = parseInt(document.getElementById('demao')?.value || 2);
  const resultado = document.getElementById('resultado-calc');

  if (!area || area <= 0 || !slug) {
    alert('Preencha a área e selecione o produto.');
    return;
  }

  const produto = PRODUTOS.find(p => p.slug === slug);
  if (!produto) return;

  const areaTotalComDemaos = area * demaos;
  let quantidade, unidade, embalagem;

  if (produto.unidadeRend === 'm²/L') {
    quantidade = (areaTotalComDemaos / produto.rendimento).toFixed(2);
    unidade = 'litros';
    embalagem = quantidade > 10 ? '18L ou 16L' : quantidade > 3 ? '3,6L' : '1L';
  } else {
    quantidade = (areaTotalComDemaos * produto.rendimento).toFixed(2);
    unidade = 'kg';
    embalagem = quantidade > 20 ? '25kg' : '5,6kg';
  }

  if (resultado) {
    resultado.innerHTML = `
      <h3>📦 Resultado do Cálculo</h3>
      <p><strong>Produto:</strong> ${produto.nome} — Qualy Quimy</p>
      <p><strong>Área:</strong> ${area} m² × ${demaos} demão(s)</p>
      <div class="numero">${quantidade} ${unidade}</div>
      <p style="color:var(--cor-cinza);margin-top:8px">Embalagem recomendada: <strong>${embalagem}</strong></p>
      <p style="margin-top:16px">
        <a href="https://wa.me/5511954950044?text=Quero%20comprar%20${produto.nome}%20-%20${quantidade}${unidade}" 
           target="_blank" class="btn-primary" style="display:inline-block;margin-top:8px">
          💬 Pedir pelo WhatsApp
        </a>
      </p>
    `;
    resultado.classList.add('ativo');
  }
}

// ========== POPULAR SELECTS DA CALCULADORA ==========
function popularProdutosCalc() {
  const sel = document.getElementById('produto-calc');
  if (!sel) return;
  PRODUTOS.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.slug;
    opt.textContent = `${p.nome} (rend.: ${p.rendimento} ${p.unidadeRend})`;
    sel.appendChild(opt);
  });
}

// ========== WHATSAPP FLOAT ==========
function criarWhatsFloat() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/5511954950044?text=Olá!%20Vi%20o%20site%20e%20quero%20informações%20sobre%20tintas%20Qualy%20Quimy';
  btn.target = '_blank';
  btn.id = 'whats-float';
  btn.innerHTML = '💬';
  btn.title = 'Fale conosco no WhatsApp';
  btn.style.cssText = `
    position:fixed;bottom:28px;right:28px;z-index:999;
    background:#25D366;color:#fff;border-radius:50%;
    width:60px;height:60px;display:flex;align-items:center;
    justify-content:center;font-size:28px;text-decoration:none;
    box-shadow:0 4px 20px rgba(37,211,102,0.45);
    transition:transform 0.2s,box-shadow 0.2s;
    animation:pulse 2.5s infinite;
  `;
  document.body.appendChild(btn);
  btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.12)'; });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'scale(1)'; });

  const style = document.createElement('style');
  style.textContent = `@keyframes pulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.45)}50%{box-shadow:0 4px 32px rgba(37,211,102,0.75)}}`;
  document.head.appendChild(style);
}

// ========== ICONES SVG AUTOMATICOS PARA CARDS ==========
function iconeSvgPorTema(tema) {
  const fill = 'currentColor';
  const icons = {
    tinta: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M7 3h10v2h2v4h-2v2h-2v2h-2v2h-2v2H9v-2H7v-2H5v-2H3V9h2V7h2V5h2V3zm2 2v2h6V5H9zm-2 4v2h2V9H7zm10 0v2h2V9h-2zM9 11v2h6v-2H9zm-2 4v2h2v-2H7zm8 0v2h2v-2h-2z"/></svg>`,
    textura: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/><circle cx="7" cy="7" r="1" fill="${fill}"/><circle cx="12" cy="12" r="1" fill="${fill}"/><circle cx="17" cy="17" r="1" fill="${fill}"/></svg>`,
    massa: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M3 14l8-8 10 10-8 5L3 14zm8.4-5.6L7.6 12.2l5.7 4.2 4.8-2.4-6.7-5.6z"/></svg>`,
    fundo: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M5 4h14v3H5V4zm2 4h10l2 12H5L7 8zm3 3v6h2v-6h-2zm4 0v6h2v-6h-2z"/></svg>`,
    brilho: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M12 2l2.1 5.4L20 9l-5.9 1.6L12 16l-2.1-5.4L4 9l5.9-1.6L12 2zm7 12l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7L19 14zM5 14l.9 2.3L8 17l-2.1.7L5 20l-.9-2.3L2 17l2.1-.7L5 14z"/></svg>`,
    cidade: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="${fill}" d="M12 2a7 7 0 0 1 7 7c0 5.3-7 13-7 13S5 14.3 5 9a7 7 0 0 1 7-7zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5z"/></svg>`,
    entrega: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M3 6h11v9H3V6zm11 3h3l4 3v3h-7V9zm-7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`,
    expressa: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>`,
    agenda: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm11 8H6v10h12V10z"/></svg>`,
    oferta: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="${fill}" d="M3 12l9-9 9 9-9 9-9-9zm6-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`,
    blog: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="${fill}" d="M5 4h14v16H5V4zm2 3v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h6v-2H7z"/></svg>`
  };
  return icons[tema] || icons.blog;
}

function detectarTemaCard(texto) {
  const t = (texto || '').toLowerCase();
  if (t.includes('entrega expressa') || t.includes('expressa')) return 'expressa';
  if (t.includes('dia programado') || t.includes('agend')) return 'agenda';
  if (t.includes('frete') || t.includes('entrega')) return 'entrega';
  if (t.includes('liqui brilho') || t.includes('verniz') || t.includes('acabamento') || t.includes('impermeabil')) return 'brilho';
  if (t.includes('seladora') || t.includes('fundo')) return 'fundo';
  if (t.includes('massa')) return 'massa';
  if (t.includes('grafiato') || t.includes('textura')) return 'textura';
  if (t.includes('tinta') || t.includes('q color') || t.includes('esmalte')) return 'tinta';
  if (t.includes('cidade') || t.includes('bairro') || t.includes('itaqua') || t.includes('suzano') || t.includes('mogi')) return 'cidade';
  return 'blog';
}

function criarNoIcone(tema, extraClass) {
  const span = document.createElement('span');
  span.className = 'qq-card-svg ' + (extraClass || '');
  span.innerHTML = iconeSvgPorTema(tema);
  span.setAttribute('aria-hidden', 'true');
  return span;
}

function aplicarIconesCards() {
  // Cards de produto: icone no topo (produto-img)
  document.querySelectorAll('.produto-card').forEach(card => {
    const img = card.querySelector('.produto-img');
    if (!img || img.querySelector('.qq-card-svg')) return;

    const titulo = card.querySelector('h3')?.textContent || '';
    const categoria = card.querySelector('.produto-categoria')?.textContent || '';
    const desc = card.querySelector('p')?.textContent || '';
    const tema = detectarTemaCard(`${categoria} ${titulo} ${desc}`);

    if ((img.textContent || '').trim().length <= 2 || (img.textContent || '').includes('?')) {
      img.textContent = '';
    }
    const node = criarNoIcone(tema, 'qq-card-svg-top');
    img.prepend(node);
  });

  // Cards de cidade: icone antes do titulo
  document.querySelectorAll('.cidade-card').forEach(card => {
    if (card.querySelector('.qq-card-svg')) return;
    const node = criarNoIcone('cidade', 'qq-card-svg-inline');
    card.prepend(node);
    card.classList.add('qq-card-has-inline-icon');
  });

  // Cards de frete/comercial: substituir/usar bloco .icon no topo
  document.querySelectorAll('.frete-card').forEach(card => {
    const titulo = card.querySelector('h3')?.textContent || '';
    const desc = card.querySelector('p')?.textContent || '';
    const tema = detectarTemaCard(`${titulo} ${desc}`);

    let iconWrap = card.querySelector('.icon');
    if (!iconWrap) {
      iconWrap = document.createElement('div');
      iconWrap.className = 'icon';
      card.prepend(iconWrap);
    }
    if (!iconWrap.querySelector('.qq-card-svg')) {
      iconWrap.textContent = '';
      iconWrap.appendChild(criarNoIcone(tema, 'qq-card-svg-frete'));
    }
  });

  // Hero cards: icone no topo mantendo proporcao existente
  document.querySelectorAll('.hero-card').forEach(card => {
    let iconWrap = card.querySelector('.hero-card-icon');
    const t = card.querySelector('strong')?.textContent || card.textContent || '';
    const tema = detectarTemaCard(t);
    if (!iconWrap) {
      iconWrap = document.createElement('div');
      iconWrap.className = 'hero-card-icon';
      card.prepend(iconWrap);
    }
    if (!iconWrap.querySelector('.qq-card-svg')) {
      iconWrap.textContent = '';
      iconWrap.appendChild(criarNoIcone(tema, 'qq-card-svg-hero'));
    }
  });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  criarWhatsFloat();
  popularProdutosCalc();
  aplicarIconesCards();
  // Listener calculadora
  const btnCalc = document.getElementById('btn-calcular');
  if (btnCalc) btnCalc.addEventListener('click', calcularTinta);
});
