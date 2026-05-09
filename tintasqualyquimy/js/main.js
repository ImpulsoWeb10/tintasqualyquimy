// ============================================================
// QUALY QUIMY - JS Principal (Versão Segura)
// ============================================================

// Configuração global de debug
window.QualyQuimy = window.QualyQuimy || {};
window.QualyQuimy.debugMode = localStorage.getItem('debug') === 'true';

// Função de log condicional
window.QualyQuimy.log = function(message) {
  if (window.QualyQuimy.debugMode) {
    console.log('[DEBUG]', message);
  }
};

// Função de sanitização para prevenir XSS
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Função segura para criar elementos com conteúdo
function setSecureHTML(element, content) {
  if (typeof content === 'string') {
    // Para conteúdo simples, usa textContent
    if (!content.includes('<')) {
      element.textContent = content;
      return;
    }
    // Para HTML complexo, cria elementos manualmente
    const temp = document.createElement('div');
    temp.innerHTML = content;
    // Move nós filhos de forma segura
    while (temp.firstChild) {
      element.appendChild(temp.firstChild);
    }
  } else {
    element.appendChild(content);
  }
}

// Carregar produtos dinamicamente do JSON
let PRODUTOS = [];

// Função para carregar produtos do arquivo JSON
async function carregarProdutos() {
  try {
    const response = await fetch('../data/produtos.json');
    PRODUTOS = await response.json();
    console.log('Produtos carregados:', PRODUTOS.length, 'itens');
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    // Em caso de erro, mantém array vazio e mostra mensagem
    PRODUTOS = [];
    console.error('Não foi possível carregar produtos. Verifique o arquivo data/produtos.json');
  }
}

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

// SVG Icons como strings seguras
const SVG_ICONES = {
  palette: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 1.8-1.8c0-.7-.4-1.3-.9-1.7a1.9 1.9 0 0 1 1.2-3.4H17a4 4 0 0 0 0-8h-5Z"></path><path d="M7.5 10.5h.01"></path><path d="M12 7.5h.01"></path><path d="M16.5 10.5h.01"></path></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"></path><path d="m4 12 8 4.5 8-4.5"></path><path d="m4 16.5 8 4.5 8-4.5"></path></svg>',
  bucket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12"></path><path d="m8 7 1.4 11.2a2 2 0 0 0 2 1.8h1.2a2 2 0 0 0 2-1.8L16 7"></path><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"></path></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v6c0 4.2 2.7 8.1 7 9 4.3-.9 7-4.8 7-9V6l-7-3Z"></path><path d="m9.5 12 1.7 1.7 3.3-3.4"></path></svg>',
  sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8L12 3Z"></path><path d="m19 14 1 2.5L22.5 18 20 19l-1 2.5-1-2.5L15.5 18 18 16.5 19 14Z"></path></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9v12"></path><path d="M14 9h3l4 4v2a2 2 0 0 1-2 2h-1"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="17.5" cy="17.5" r="1.5"></circle></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"></path><circle cx="12" cy="10" r="2.4"></circle></svg>'
};

function criarCardIcon(nome) {
  const el = document.createElement('span');
  el.className = 'card-icon';
  setSecureHTML(el, SVG_ICONES[nome] || SVG_ICONES.palette);
  return el;
}

function obterIconePorTexto(texto) {
  const valor = (texto || '').toLowerCase();

  if (valor.includes('grafiato') || valor.includes('textura')) return 'layers';
  if (valor.includes('massa')) return 'bucket';
  if (valor.includes('seladora') || valor.includes('fundo')) return 'shield';
  if (valor.includes('liqui brilho') || valor.includes('acabamento')) return 'sparkle';
  if (valor.includes('esmalte') || valor.includes('tinta') || valor.includes('q color')) return 'palette';
  if (valor.includes('expressa')) return 'truck';
  if (valor.includes('final de semana')) return 'clock';
  if (valor.includes('programado')) return 'calendar';
  if (valor.includes('frete')) return 'truck';

  return 'pin';
}

function iniciarIconesCards() {
  document.querySelectorAll('.hero-card').forEach((card) => {
    const alvo = card.querySelector('.hero-card-icon');
    const titulo = card.querySelector('strong')?.textContent || '';
    if (!alvo) return;
    alvo.classList.add('card-icon');
    setSecureHTML(alvo, SVG_ICONES[obterIconePorTexto(titulo)]);
  });

  document.querySelectorAll('.categoria-card').forEach((card) => {
    const alvo = card.querySelector('.icon');
    const titulo = card.querySelector('strong')?.textContent || card.textContent;
    if (!alvo) return;
    alvo.classList.add('card-icon');
    setSecureHTML(alvo, SVG_ICONES[obterIconePorTexto(titulo)]);
  });

  document.querySelectorAll('.frete-card').forEach((card) => {
    const alvo = card.querySelector('.icon');
    const titulo = card.querySelector('h3')?.textContent || card.textContent;
    if (!alvo) return;
    alvo.classList.add('card-icon');
    setSecureHTML(alvo, SVG_ICONES[obterIconePorTexto(titulo)]);
  });

  document.querySelectorAll('.cidade-card').forEach((card) => {
    if (card.querySelector('.card-label')) return;
    const texto = card.textContent.trim();
    card.textContent = '';
    const wrapper = document.createElement('span');
    wrapper.className = 'card-label';
    wrapper.appendChild(criarCardIcon('pin'));
    const label = document.createElement('span');
    label.textContent = texto;
    wrapper.appendChild(label);
    card.appendChild(wrapper);
  });

  document.querySelectorAll('.produto-card').forEach((card) => {
    if (card.querySelector('.produto-info .card-icon')) return;
    const info = card.querySelector('.produto-info');
    const titulo = card.querySelector('.produto-info h3')?.textContent || card.textContent;
    if (!info) return;
    info.insertBefore(criarCardIcon(obterIconePorTexto(titulo)), info.firstElementChild);
  });
}

// ========== CALCULADORA ==========
function calcularTinta() {
  const area = parseFloat(document.getElementById('area')?.value || 0);
  const slug = document.getElementById('produto-calc')?.value;
  const demaos = parseInt(document.getElementById('demao')?.value || 2);
  const resultado = document.getElementById('resultado-calc');
  const hint = document.getElementById('calc-hint');

  if (!area || area <= 0 || !slug) {
    atualizarEstadoCalculadora();
    if (hint) {
      hint.textContent = 'Preencha uma metragem válida e selecione um produto para calcular.';
      hint.classList.remove('is-ready');
    }
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
    // Limpa o conteúdo anterior de forma segura
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
    
    // Cria elementos de forma segura
    const h3 = document.createElement('h3');
    h3.textContent = 'Resultado do cálculo';
    resultado.appendChild(h3);
    
    const p1 = document.createElement('p');
    p1.innerHTML = `<strong>Produto:</strong> ${sanitizeHTML(produto.nome)} - Qualy Quimy`;
    resultado.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.innerHTML = `<strong>Área:</strong> ${area} m² × ${demaos} demão(s)`;
    resultado.appendChild(p2);
    
    const div = document.createElement('div');
    div.className = 'numero';
    div.textContent = `${quantidade} ${unidade}`;
    resultado.appendChild(div);
    
    const p3 = document.createElement('p');
    p3.style.cssText = 'color:var(--cor-cinza);margin-top:8px';
    p3.innerHTML = `Embalagem recomendada: <strong>${sanitizeHTML(embalagem)}</strong>`;
    resultado.appendChild(p3);
    
    const p4 = document.createElement('p');
    p4.style.cssText = 'margin-top:16px';
    const a = document.createElement('a');
    a.href = `https://wa.me/5511954950044?text=Quero%20comprar%20${encodeURIComponent(produto.nome)}%20-%20${quantidade}${unidade}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'btn-primary';
    a.style.cssText = 'display:inline-block;margin-top:8px';
    a.textContent = 'Pedir pelo WhatsApp';
    p4.appendChild(a);
    resultado.appendChild(p4);
    
    resultado.classList.add('ativo');
  }

  if (hint) {
    hint.textContent = 'Estimativa pronta. Se quiser, use o botão abaixo para pedir pelo WhatsApp.';
    hint.classList.add('is-ready');
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

// ========== LIGHTBOX EMBALAGENS ==========
const EMB_IMAGENS = {
  '1L':    'pote-1l.jpg',
  '3,6L':  'galao-3-6l.jpg',
  '5,6kg': 'galao-5-6kg.jpg',
  '16L':   'balde-16l.jpg',
  '18L':   'tinta-economica-lata-18l.png',
  '25kg':  'barrica-25kg.jpg'
};

function getImgBase() {
  const link = document.querySelector('link[href*="style.css"]');
  const href = link ? link.getAttribute('href') : 'css/style.css';
  return href.replace('css/style.css', 'imagens/');
}

function criarLightbox() {
  if (document.getElementById('emb-lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'emb-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  
  // Cria conteúdo de forma segura
  const closeBtn = document.createElement('button');
  closeBtn.id = 'emb-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Fechar');
  closeBtn.textContent = '×';
  lb.appendChild(closeBtn);
  
  const img = document.createElement('img');
  img.id = 'emb-lightbox-img';
  img.src = '';
  img.alt = 'Embalagem';
  lb.appendChild(img);
  
  document.body.appendChild(lb);
  document.getElementById('emb-lightbox-close').addEventListener('click', fecharLightbox);
  lb.addEventListener('click', function(e) { if (e.target === lb) fecharLightbox(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') fecharLightbox(); });
}

function abrirLightbox(src) {
  criarLightbox();
  document.getElementById('emb-lightbox-img').src = src;
  document.getElementById('emb-lightbox').classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  const lb = document.getElementById('emb-lightbox');
  if (lb) lb.classList.remove('ativo');
  document.body.style.overflow = '';
}

function iniciarBadgesClickaveis() {
  const base = getImgBase();
  document.querySelectorAll('.emb-badge').forEach(badge => {
    const tamanho = badge.textContent.trim();
    const imgFile = EMB_IMAGENS[tamanho];
    if (!imgFile) return;
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      abrirLightbox(base + imgFile);
    });
  });
}

function atualizarEstadoCalculadora() {
  const areaInput = document.getElementById('area');
  const produtoSelect = document.getElementById('produto-calc');
  const btnCalc = document.getElementById('btn-calcular');
  const resultado = document.getElementById('resultado-calc');
  const hint = document.getElementById('calc-hint');
  const box = document.querySelector('.calculadora-box');

  if (!areaInput || !produtoSelect || !btnCalc || !box) return;

  const area = parseFloat(areaInput.value || '0');
  const areaValida = Number.isFinite(area) && area > 0;
  const produtoValido = Boolean(produtoSelect.value);
  const pronto = areaValida && produtoValido;

  btnCalc.disabled = !pronto;
  box.classList.toggle('is-valid', pronto);
  areaInput.closest('.calc-field')?.classList.toggle('is-invalid', !areaValida && areaInput.value !== '');
  produtoSelect.closest('.calc-field')?.classList.toggle('is-invalid', !produtoValido && produtoSelect.value === '');

  if (!pronto && resultado) {
    resultado.classList.remove('ativo');
    // Limpa de forma segura
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }

  if (hint) {
    if (pronto) {
      hint.textContent = 'Tudo certo. Agora você já pode calcular a quantidade ideal.';
      hint.classList.add('is-ready');
    } else {
      hint.textContent = 'Selecione um produto e informe a metragem para liberar o cálculo.';
      hint.classList.remove('is-ready');
    }
  }
}

function iniciarMenuMobile() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
}

// ========== WHATSAPP FLOAT ==========
function criarWhatsFloat() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/5511954950044?text=Olá!%20Vi%20o%20site%20e%20quero%20informações%20sobre%20tintas%20Qualy%20Quimy';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.id = 'whats-float';
  btn.textContent = 'WA';
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

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', async () => {
  // Carregar produtos dinamicamente antes de inicializar componentes
  await carregarProdutos();
  
  criarWhatsFloat();
  // Verificar se os elementos existem antes de usá-los
  if (document.getElementById('produto-calc')) {
    popularProdutosCalc();
    iniciarBadgesClickaveis();
  }
  
  if (document.querySelector('.icon-icon')) {
    iniciarIconesCards();
  }
  
  if (document.querySelector('.menu-toggle')) {
    iniciarMenuMobile();
  }
  
  if (document.getElementById('btn-calcular')) {
    atualizarEstadoCalculadora();
    const btnCalc = document.getElementById('btn-calcular');
    if (btnCalc) btnCalc.addEventListener('click', calcularTinta);

    const areaInput = document.getElementById('area');
    const produtoSelect = document.getElementById('produto-calc');
    const demaoSelect = document.getElementById('demao');

    [areaInput, produtoSelect, demaoSelect].forEach((element) => {
      element?.addEventListener('input', atualizarEstadoCalculadora);
      element?.addEventListener('change', atualizarEstadoCalculadora);
    });
  }
});
