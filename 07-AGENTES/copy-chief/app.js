// ────────────────────────────────────────────────────────────────
// COPY CHIEF - Agente de Conteúdo para Tintas Qualy Quimy
// ────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────
// DADOS FIXOS DA MARCA (nunca alterar)
// ─────────────────────────────────────────
const MARCA = {
  nome: "Tintas Qualy Quimy",
  whatsapp: "(11) 95495-0044",
  whatsapp_link: "https://wa.me/5511954950044",
  endereco: "Rua Leiria, 45 — Chácara Cuiabá, Itaquaquecetuba - SP"
};

// ─────────────────────────────────────────
// ESTADO DOS TIPOS DE SAÍDA SELECIONADOS
// ─────────────────────────────────────────
let tiposAtivos = new Set(['instagram', 'whatsapp', 'landing_page']);

// ─────────────────────────────────────────
// Toggle dos botões de tipo de saída
// ─────────────────────────────────────────
function toggleTipo(btn) {
  const tipo = btn.dataset.tipo;
  // Garante que pelo menos 1 tipo esteja sempre selecionado
  if (tiposAtivos.has(tipo) && tiposAtivos.size === 1) return;
  tiposAtivos.has(tipo) ? tiposAtivos.delete(tipo) : tiposAtivos.add(tipo);
  btn.classList.toggle('ativo');
}

// ─────────────────────────────────────────
// VALIDAÇÃO DOS CAMPOS DO FORMULÁRIO
// ─────────────────────────────────────────
function validarCampos(nome, embalagem, rendimento, ondeUsar) {
  const erros = [];
  if (!nome)       erros.push('Nome do Produto');
  if (!embalagem)  erros.push('Embalagem');
  if (!rendimento) erros.push('Rendimento');
  if (!ondeUsar)   erros.push('Onde Usar');
  return erros;
}

// ─────────────────────────────────────────
// MONTAGEM DO PROMPT PARA A API
// ─────────────────────────────────────────
function montarPrompt(nome, embalagem, rendimento, ondeUsar) {
  return `Você é um copywriter especialista em marketing de tintas e construção civil no Brasil, com domínio em SEO semântico, copywriting persuasivo e marketing digital.

DADOS FIXOS DA EMPRESA (inclua em TODAS as saídas sem exceção):
- Empresa: ${MARCA.nome}
- WhatsApp: ${MARCA.whatsapp}
- Link WhatsApp: ${MARCA.whatsapp_link}
- Endereço: ${MARCA.endereco}

PRODUTO A DIVULGAR:
- Nome: ${nome}
- Embalagem: ${embalagem}
- Rendimento: ${rendimento}
- Onde Usar: ${ondeUsar}

INSTRUÇÕES DE GERAÇÃO:
Retorne APENAS um JSON válido, sem markdown, sem texto antes ou depois, sem backticks.

{
  "instagram": "Legenda completa para post no Instagram contendo: 1) Gancho de atenção poderoso na 1ª linha (que para o scroll), 2) Apresentação do produto com benefícios reais e emocionais, 3) Especificações técnicas resumidas (embalagem e rendimento), 4) Prova social ou autoridade da marca, 5) Call-to-action com número WhatsApp e endereço completo, 6) Emojis estratégicos ao longo do texto (moderado, profissional), 7) Ao final: 20 hashtags segmentadas em 3 grupos — nicho (tintas, pintura, construção civil, reforma), localização (Itaquaquecetuba, Grande SP, Zona Leste) e tendência (decoração, casanova, acabamento).",

  "whatsapp": "Status para WhatsApp com MÁXIMO 139 caracteres. Deve ser: impactante, direto ao ponto, conter 1-2 emojis estratégicos, mencionar o nome do produto e incluir o número (11) 95495-0044. Contar os caracteres antes de retornar.",

  "landing_page": "HTML COMPLETO e funcional de uma landing page profissional pronta para publicar. Deve conter obrigatoriamente: (HEAD) DOCTYPE html, meta charset UTF-8, meta viewport, title com palavra-chave + cidade, meta description 150 chars, meta keywords, Open Graph tags og:title/og:description/og:type/og:locale, script JSON-LD schema.org tipo Product com name/description/brand/offers/seller completos; (BODY com CSS inline responsivo usando cores #e63312 vermelho e #f5f0e8 bege) Seção 1-HERO com h1 impactante e subtítulo, Seção 2-BENEFÍCIOS com 4 cards de ícone+texto, Seção 3-ESPECIFICAÇÕES em tabela HTML, Seção 4-ONDE USAR com lista visual, Seção 5-DEPOIMENTO fictício mas realista de cliente, Seção 6-CTA principal com botão grande abrindo link wa.me, Seção 7-LOCALIZAÇÃO com endereço formatado e link Google Maps, Rodapé com todos os dados da empresa. Layout mobile-first, sem dependências externas."
}`;
}

// ─────────────────────────────────────────
// CHAMADA À API DA ANTHROPIC
// ─────────────────────────────────────────
async function chamarAPI(prompt) {
  const resposta = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-api-key": "sk-ant-api03-demo-key" // Chave de API necessária
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.error?.message || `Erro HTTP ${resposta.status}`);
  }

  const dados = await resposta.json();
  const textoRaw = dados.content.map(b => b.text || '').join('');

  // Remove possíveis backticks de markdown antes do parse
  const textoLimpo = textoRaw.replace(/```json|```/gi, '').trim();

  try {
    return JSON.parse(textoLimpo);
  } catch {
    throw new Error('A IA retornou um formato inesperado. Tente novamente.');
  }
}

// ─────────────────────────────────────────
// ESTADO DE LOADING
// ─────────────────────────────────────────
function setLoading(ativo) {
  const btn = document.getElementById('btn-gerar');
  const spinner = document.getElementById('spinner');
  const btnTexto = document.getElementById('btn-texto');
  btn.disabled = ativo;
  spinner.style.display = ativo ? 'inline-block' : 'none';
  btnTexto.textContent = ativo ? 'GERANDO...' : '⚡ GERAR CONTEÚDO';
}

// ─────────────────────────────────────────
// RENDERIZAÇÃO DOS RESULTADOS
// ─────────────────────────────────────────
function renderizarResultados(resultado) {
  const area = document.getElementById('output-area');
  area.innerHTML = '';

  // Card Instagram
  if (resultado.instagram && tiposAtivos.has('instagram')) {
    area.appendChild(criarCard({
      tipo: 'instagram',
      titulo: '📸 Post Instagram',
      conteudo: resultado.instagram,
      corHeader: 'linear-gradient(135deg, #833ab4, #e1306c, #fcb045)'
    }));
  }

  // Card WhatsApp
  if (resultado.whatsapp && tiposAtivos.has('whatsapp')) {
    const chars = resultado.whatsapp.length;
    const badgeClass = chars <= 139 ? 'badge-ok' : chars <= 160 ? 'badge-aviso' : 'badge-erro';
    area.appendChild(criarCard({
      tipo: 'whatsapp',
      titulo: `💬 Status WhatsApp <span class="${badgeClass}">${chars} chars</span>`,
      conteudo: resultado.whatsapp,
      corHeader: '#25d366'
    }));
  }

  // Card Landing Page
  if (resultado.landing_page && tiposAtivos.has('landing_page')) {
    const card = criarCard({
      tipo: 'landing_page',
      titulo: '🌐 Landing Page HTML',
      conteudo: resultado.landing_page,
      corHeader: '#e63312',
      isCode: true
    });
    // Botão de visualizar
    const btnVisualizar = document.createElement('button');
    btnVisualizar.className = 'btn-visualizar';
    btnVisualizar.textContent = '👁 VISUALIZAR LANDING PAGE';
    btnVisualizar.onclick = () => {
      const win = window.open('', '_blank');
      win.document.write(resultado.landing_page);
      win.document.close();
    };
    card.appendChild(btnVisualizar);
    area.appendChild(card);
  }
}

// ─────────────────────────────────────────
// CRIAÇÃO DE CARD DE RESULTADO
// ─────────────────────────────────────────
function criarCard({ tipo, titulo, conteudo, corHeader, isCode = false }) {
  const card = document.createElement('div');
  card.className = 'output-card';
  const idConteudo = `conteudo-${tipo}`;
  card.innerHTML = `
    <div class="card-header" style="background: ${corHeader};">
      <h3>${titulo}</h3>
      <button class="btn-copiar" onclick="copiarTexto(this, '${idConteudo}')">Copiar</button>
    </div>
    <div class="card-conteudo ${isCode ? 'card-codigo' : ''}" id="${idConteudo}">${escapeHtml(conteudo)}</div>
  `;
  return card;
}

// ─────────────────────────────────────────
// COPIAR TEXTO COM FEEDBACK VISUAL
// ─────────────────────────────────────────
async function copiarTexto(btn, id) {
  const texto = document.getElementById(id)?.innerText || '';
  try {
    await navigator.clipboard.writeText(texto);
    btn.textContent = '✅ Copiado!';
    exibirToast('Texto copiado com sucesso!');
    setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
  } catch {
    alert('Não foi possível copiar automaticamente. Selecione o texto manualmente.');
  }
}

// ─────────────────────────────────────────
// TOAST DE NOTIFICAÇÃO
// ─────────────────────────────────────────
function exibirToast(mensagem) {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.classList.add('visivel');
  setTimeout(() => toast.classList.remove('visivel'), 3000);
}

// ─────────────────────────────────────────
// ESCAPE DE HTML (segurança)
// ─────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────
// FUNÇÃO PRINCIPAL — GERAR CONTEÚDO
// ─────────────────────────────────────────
async function gerarConteudo() {
  // Coleta dos campos
  const nome      = document.getElementById('nome').value.trim();
  const embalagem = document.getElementById('embalagem').value.trim();
  const rendimento= document.getElementById('rendimento').value.trim();
  const ondeUsar  = document.getElementById('onde_usar').value.trim();

  // Validação
  const erros = validarCampos(nome, embalagem, rendimento, ondeUsar);
  if (erros.length > 0) {
    alert(`Preencha os campos obrigatórios:\n• ${erros.join('\n• ')}`);
    return;
  }

  // Inicia loading
  setLoading(true);
  document.getElementById('output-area').innerHTML = `
    <div class="placeholder-loading">
      <p>⚙️ Gerando conteúdo profissional com IA...</p>
    </div>`;

  try {
    const prompt = montarPrompt(nome, embalagem, rendimento, ondeUsar);
    const resultado = await chamarAPI(prompt);
    renderizarResultados(resultado);
  } catch (erro) {
    document.getElementById('output-area').innerHTML = `
      <div class="erro-msg">
        ❌ <strong>Erro:</strong> ${erro.message}<br>
        <small>Verifique sua conexão, configure sua chave API e tente novamente. Certifique-se de rodar via Live Server.</small>
      </div>`;
  } finally {
    setLoading(false);
  }
}

// ─────────────────────────────────────────
// INICIALIZAÇÃO DOS EVENTOS
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Evento do botão principal
  document.getElementById('btn-gerar').addEventListener('click', gerarConteudo);
  
  // Eventos dos toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      toggleTipo(this);
    });
  });
  
  // Evento Enter no formulário
  document.getElementById('form-produto').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      gerarConteudo();
    }
  });
  
  // Foco automático no primeiro campo
  document.getElementById('nome').focus();
});
