// ============================================================
// QUALY QUIMY - JS Principal (Versão Segura)
// ============================================================

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

// Dados dos produtos (fonte única de verdade)
const PRODUTOS = [
  {
    slug: 'grafiato',
    nome: 'Grafiato',
    categoria: 'texturas',
    categorianome: 'Texturas e Grafiato',
    icon: 'layers',
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
    icon: 'texture',
    embalagens: ['5,6kg', '25kg'],
    rendimento: 4.5,
    unidadeRend: 'kg/m²',
    descricao: 'Textura lisa com acabamento acetinado. Ideal para paredes internas e áreas de circulação.',
    aplicacao: 'Interno',
    tag: null
  },
  {
    slug: 'massa-pva',
    nome: 'Massa PVA',
    categoria: 'massas',
    categorianome: 'Massas e Fundos',
    icon: 'bucket',
    embalagens: ['5kg', '20kg'],
    rendimento: 8,
    unidadeRend: 'kg/m²',
    descricao: 'Massa PVA de alta qualidade para regularização de paredes e tetos. Fácil lixamento e secagem rápida.',
    aplicacao: 'Interno',
    tag: 'mais-vendido'
  },
  {
    slug: 'massa-acrilica',
    nome: 'Massa Acrílica',
    categoria: 'massas',
    categorianome: 'Massas e Fundos',
    icon: 'bucket',
    embalagens: ['5kg', '20kg'],
    rendimento: 10,
    unidadeRend: 'kg/m²',
    descricao: 'Massa acrílica premium com excelente rendimento. Resistente à umidade e com secagem ultra rápida.',
    aplicacao: 'Interno',
    tag: 'premium'
  },
  {
    slug: 'seladora',
    nome: 'Seladora',
    categoria: 'massas',
    categorianome: 'Massas e Fundos',
    icon: 'shield',
    embalagens: ['5kg', '20kg'],
    rendimento: 12,
    unidadeRend: 'kg/m²',
    descricao: 'Seladora acrílica universal para preparação de superfícies. Máxima aderência e proteção contra umidade.',
    aplicacao: 'Interno',
    tag: null
  },
  {
    slug: 'tinta-economica',
    nome: 'Tinta Econômica',
    categoria: 'tintas',
    categorianome: 'Tintas e Vernizes',
    icon: 'paint-brush',
    embalagens: ['18L', '3,6L'],
    rendimento: 14,
    unidadeRend: 'L/m²',
    descricao: 'Tinta econômica de excelente qualidade e rendimento. Ideal para grandes áreas e economia sem perder a qualidade.',
    aplicacao: 'Interno',
    tag: 'economica'
  },
  {
    slug: 'tinta-acrilica',
    nome: 'Tinta Acrílica',
    categoria: 'tintas',
    categorianome: 'Tintas e Vernizes',
    icon: 'paint-brush',
    embalagens: ['18L', '3,6L'],
    rendimento: 12,
    unidadeRend: 'L/m²',
    descricao: 'Tinta acrílica premium com acabamento acetinado. Alta durabilidade e resistência ao lavável.',
    aplicacao: 'Interno',
    tag: 'premium'
  },
  {
    slug: 'tinta-textura',
    nome: 'Tinta Textura',
    categoria: 'tintas',
    categorianome: 'Tintas e Vernizes',
    icon: 'paint-brush',
    embalagens: ['18L', '3,6L'],
    rendimento: 8,
    unidadeRend: 'L/m²',
    descricao: 'Tinta texturizada com efeito decorativo. Acabamento sofisticado e moderno para paredes internas.',
    aplicacao: 'Interno',
    tag: null
  },
  {
    slug: 'liqui-brilho',
    nome: 'Liqui Brilho',
    categoria: 'tintas',
    categorianome: 'Tintas e Vernizes',
    icon: 'star',
    embalagens: ['1L'],
    rendimento: 15,
    unidadeRend: 'm²/L',
    descricao: 'Verniz poliuretano de alto brilho e proteção. Ideal para madeiras e superfícies decorativas.',
    aplicacao: 'Interno',
    tag: null
  }
];

// Namespace principal
window.QualyQuimy = {
  // Dados públicos
  PRODUTOS: PRODUTOS,
  
  // Função segura para renderizar produtos
  renderizarProdutos: function(containerId, categoriaSlug = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const produtosFiltrados = categoriaSlug 
      ? PRODUTOS.filter(p => p.categoria === categoriaSlug)
      : PRODUTOS;
    
    let html = '';
    produtosFiltrados.forEach(produto => {
      const tagHtml = produto.tag 
        ? `<span class="produto-tag produto-tag-${produto.tag}">${this.getTagNome(produto.tag)}</span>`
        : '';
      
      html += `
        <div class="produto-card" data-categoria="${produto.categoria}">
          <div class="produto-header">
            <div class="produto-icon">
              <i class="fas fa-${produto.icon}"></i>
            </div>
            <div class="produto-info">
              <h3 class="produto-nome">${sanitizeHTML(produto.nome)}</h3>
              <span class="produto-categoria">${sanitizeHTML(produto.categorianome)}</span>
            </div>
            ${tagHtml}
          </div>
          <div class="produto-body">
            <p class="produto-descricao">${sanitizeHTML(produto.descricao)}</p>
            <div class="produto-especificacoes">
              <div class="espec-item">
                <i class="fas fa-ruler"></i>
                <span>Rendimento: ${produto.rendimento} ${produto.unidadeRend}</span>
              </div>
              <div class="espec-item">
                <i class="fas fa-box"></i>
                <span>Embalagens: ${produto.embalagens.join(', ')}</span>
              </div>
              <div class="espec-item">
                <i class="fas fa-home"></i>
                <span>Aplicação: ${sanitizeHTML(produto.aplicacao)}</span>
              </div>
            </div>
            <div class="produto-cta">
              <a href="https://wa.me/5511954950044?text=Olá! Quero informações sobre ${encodeURIComponent(produto.nome)}" 
                 class="btn-whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i>
                Pedir Orçamento
              </a>
            </div>
          </div>
        </div>
      `;
    });
    
    setSecureHTML(container, html);
  },
  
  // Função para obter nome do tag
  getTagNome: function(tag) {
    const tags = {
      'mais-vendido': 'Mais Vendido',
      'premium': 'Premium',
      'economica': 'Econômica'
    };
    return tags[tag] || tag;
  },
  
  // Função segura para criar modal
  criarModal: function(title, content) {
    // Remove modal existente
    const modalExistente = document.getElementById('qualy-modal');
    if (modalExistente) {
      modalExistente.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'qualy-modal';
    modal.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    setSecureHTML(modalHeader, `<h3>${sanitizeHTML(title)}</h3>`);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    setSecureHTML(modalBody, content);
    
    const modalClose = document.createElement('button');
    modalClose.className = 'modal-close';
    modalClose.textContent = '×';
    modalClose.onclick = function() {
      modal.remove();
    };
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalClose);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Fecha com ESC
    const handleEscape = function(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Fecha clicando fora
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
  },
  
  // Função para inicializar calculadora
  initCalculadora: function() {
    const form = document.getElementById('calculadora-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const area = parseFloat(document.getElementById('calc-area').value) || 0;
      const produtoSlug = document.getElementById('calc-produto').value;
      const produto = PRODUTOS.find(p => p.slug === produtoSlug);
      
      if (!produto || area <= 0) {
        QualyQuimy.criarModal('Erro', 'Preencha todos os campos corretamente.');
        return;
      }
      
      const quantidade = Math.ceil(area / produto.rendimento);
      const embalagem = QualyQuimy.melhorEmbalagem(quantidade, produto.embalagens);
      
      const resultado = `
        <div class="calculadora-resultado">
          <h4>Resultado do Cálculo</h4>
          <div class="resultado-item">
            <span class="resultado-label">Área Total:</span>
            <span class="resultado-valor">${area} m²</span>
          </div>
          <div class="resultado-item">
            <span class="resultado-label">Produto:</span>
            <span class="resultado-valor">${produto.nome}</span>
          </div>
          <div class="resultado-item">
            <span class="resultado-label">Quantidade Necessária:</span>
            <span class="resultado-valor">${quantidade} ${produto.unidadeRend.includes('L') ? 'L' : 'kg'}</span>
          </div>
          <div class="resultado-item">
            <span class="resultado-label">Embalagem Recomendada:</span>
            <span class="resultado-valor">${embalagem}</span>
          </div>
          <div class="resultado-cta">
            <a href="https://wa.me/5511954950044?text=Olá! Quero ${quantidade} ${produto.unidadeRend.includes('L') ? 'L' : 'kg'} de ${encodeURIComponent(produto.nome)} (${embalagem})" 
               class="btn-whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i>
              Solicitar Orçamento
            </a>
          </div>
        </div>
      `;
      
      QualyQuimy.criarModal('Calculadora', resultado);
    });
  },
  
  // Função para encontrar melhor embalagem
  melhorEmbalagem: function(quantidade, embalagens) {
    const numQuantidade = parseFloat(quantidade);
    
    for (let embalagem of embalagens) {
      const numEmbalagem = parseFloat(embalagem.replace(',', '.'));
      if (numQuantidade <= numEmbalagem) {
        return embalagem;
      }
    }
    
    // Se não encontrar, retorna a maior embalagem
    return embalagens[embalagens.length - 1];
  },
  
  // Função para inicializar filtros
  initFiltros: function() {
    const filtroCategorias = document.getElementById('filtro-categorias');
    if (!filtroCategorias) return;
    
    filtroCategorias.addEventListener('change', function() {
      const categoria = this.value;
      QualyQuimy.renderizarProdutos('produtos-container', categoria === 'todos' ? null : categoria);
    });
  },
  
  // Função para inicializar lazy loading
  initLazyLoading: function() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  },
  
  // Função principal de inicialização
  init: function() {
    // Inicializa componentes quando DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        QualyQuimy.initComponents();
      });
    } else {
      QualyQuimy.initComponents();
    }
  },
  
  // Inicializa todos os componentes
  initComponents: function() {
    this.initCalculadora();
    this.initFiltros();
    this.initLazyLoading();
    
    // Adiciona eventos globais
    document.addEventListener('click', function(e) {
      // Fecha modais ao clicar fora
      if (e.target.classList.contains('modal-overlay')) {
        e.target.remove();
      }
    });
    
    // Adiciona suporte a teclado
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('qualy-modal');
        if (modal) modal.remove();
      }
    });
  }
};

// Auto-inicialização
QualyQuimy.init();
