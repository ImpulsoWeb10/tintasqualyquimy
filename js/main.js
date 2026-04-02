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
    slug: 'q-color',
    nome: 'Q Color',
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

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  criarWhatsFloat();
  popularProdutosCalc();
  // Listener calculadora
  const btnCalc = document.getElementById('btn-calcular');
  if (btnCalc) btnCalc.addEventListener('click', calcularTinta);
});
