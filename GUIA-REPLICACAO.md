# QUALY QUIMY — GUIA DE REPLICAÇÃO E ESCALABILIDADE
## Como criar centenas de páginas mantendo padrão SEO

---

## ESTRUTURA DE PASTAS FINAL

```
qualyquimy.com.br/
├── index.html                          ← HOME
├── sitemap.xml
├── robots.txt
├── sobre.html
├── onde-atendemos.html
├── politica-de-privacidade.html
├── termos-de-uso.html
│
├── css/
│   └── style.css                       ← CSS único compartilhado
│
├── js/
│   └── main.js                         ← JS único compartilhado
│
├── imagens/
│   ├── grafiato-5kg.webp
│   ├── grafiato-25kg.webp
│   ├── textura-lisa-5kg.webp
│   ├── textura-lisa-25kg.webp
│   ├── massa-pva-5kg.webp
│   ├── massa-pva-25kg.webp
│   ├── massa-acrilica-5kg.webp
│   ├── massa-acrilica-25kg.webp
│   ├── seladora-1l.webp
│   ├── seladora-36l.webp
│   ├── seladora-16l.webp
│   ├── q-color-1l.webp
│   ├── q-color-36l.webp
│   ├── q-color-18l.webp
│   ├── esmalte-36l.webp
│   ├── textura-projetada-25kg.webp
│   ├── liqui-brilho-1l.webp
│   └── liqui-brilho-36l.webp
│
├── categorias/
│   ├── tintas.html                     ← Q Color, Esmalte
│   ├── texturas.html                   ← Grafiato, Textura Lisa, Projetada
│   ├── massas.html                     ← Massa PVA, Massa Acrílica
│   ├── fundos.html                     ← Seladora
│   └── acabamentos.html                ← Liqui Brilho
│
├── produtos/
│   ├── grafiato.html
│   ├── textura-lisa.html
│   ├── massa-pva.html
│   ├── massa-acrilica.html
│   ├── seladora.html
│   ├── q-color.html                    ← MODELO COMPLETO CRIADO
│   ├── esmalte.html
│   ├── textura-projetada.html
│   └── liqui-brilho.html
│
├── comercial/
│   ├── frete-gratis-itaquaquecetuba.html
│   ├── entrega-expressa-regional.html
│   ├── frete-gratis-final-de-semana.html
│   └── entrega-dia-programado.html
│
├── cidades/
│   ├── itaquaquecetuba.html            ← MODELO COMPLETO CRIADO
│   ├── mogi-das-cruzes.html
│   ├── suzano.html
│   ├── ferraz-de-vasconcelos.html
│   ├── poa.html
│   ├── aruja.html
│   ├── guarulhos.html
│   ├── guaianases.html
│   ├── itaim-paulista.html
│   ├── sao-miguel-paulista.html
│   ├── cidade-tiradentes.html
│   ├── lajeado.html
│   └── itaquaquecetuba/               ← SUBPASTAS DE BAIRROS
│       ├── jardim-morumbi.html
│       ├── bairro-do-limoeiro.html
│       ├── jardim-nova-itaqua.html
│       ├── jardim-dourado.html
│       ├── jardim-bom-clima.html
│       ├── estancia-maia.html
│       ├── parque-piratininga.html
│       ├── vila-virginia.html
│       ├── chacaras-calux.html
│       └── jardim-branca-flor.html
│
└── blog/
    ├── index.html
    ├── grafiato-o-que-e-como-aplicar.html
    ├── diferenca-massa-pva-massa-acrilica.html
    ├── como-calcular-tinta-por-m2.html
    ├── seladora-quando-usar.html
    ├── textura-lisa-vs-grafiato.html
    ├── esmalte-para-madeira-e-metal.html
    ├── textura-projetada-fachadas.html
    ├── liqui-brilho-impermeabilizante.html
    └── q-color-tinta-lavavel.html
```

---

## COMO REPLICAR PÁGINAS DE CIDADE

### Variáveis para trocar (Find & Replace):

| Variável | Exemplo — Itaquaquecetuba | Exemplo — Suzano |
|---|---|---|
| `{CIDADE}` | Itaquaquecetuba | Suzano |
| `{CIDADE_SLUG}` | itaquaquecetuba | suzano |
| `{MSG_WHATS}` | Quero%20tintas%20em%20Itaquaquecetuba | Quero%20tintas%20em%20Suzano |
| `{BAIRROS}` | Jardim Morumbi, Limoeiro... | Centro, Jd. Paulista... |
| `{CIDADES_VIZINHAS}` | Mogi, Suzano... | Mogi, Ribeirão Pires... |

### Processo (5 minutos por página):
1. Copiar `cidades/itaquaquecetuba.html`
2. Renomear para `cidades/[slug-cidade].html`
3. Fazer Find & Replace nas 5 variáveis acima
4. Atualizar o `<title>`, `<meta description>` e `<canonical>`
5. Atualizar o Schema JSON-LD com a cidade correta
6. Adicionar no `sitemap.xml`

---

## COMO REPLICAR PÁGINAS DE PRODUTO

### Variáveis para trocar:

| Variável | Exemplo — Q Color | Exemplo — Grafiato |
|---|---|---|
| `{PRODUTO}` | Q Color | Grafiato |
| `{PRODUTO_SLUG}` | q-color | grafiato |
| `{CATEGORIA}` | Tintas | Texturas e Grafiato |
| `{CATEGORIA_SLUG}` | tintas | texturas |
| `{RENDIMENTO}` | 11 m²/L | 4,5 kg/m² |
| `{EMBALAGENS}` | 1L / 3,6L / 18L | 5,6kg / 25kg |
| `{DESCRICAO}` | Tinta acrílica... | Acabamento texturizado... |

---

## PADRÃO SEO OBRIGATÓRIO — TODAS AS PÁGINAS

### `<title>` — Formato:
- Produto: `[Produto] — [Marca] | Comprar em [Cidade] e Região`
- Cidade: `Tintas em [Cidade] | Qualy Quimy — Entrega Rápida`
- Bairro: `Tintas em [Bairro], [Cidade] | Qualy Quimy`
- Categoria: `[Categoria] Qualy Quimy | Comprar em Itaquaquecetuba`

### `<meta description>` — Formato (155 chars):
- Incluir: nome do produto, marca, cidades-chave, embalagens, CTA (WhatsApp/Shopee)

### `<canonical>` — URL canônica:
- Sempre usar URL completa com https://

### Schema JSON-LD:
- Home e cidades: `LocalBusiness`
- Produtos: `Product` com `AggregateRating`
- Blog: `Article` com `datePublished`

---

## SISTEMA DE IMAGENS — PADRÃO SEO

### Nomenclatura de arquivos:
```
[produto]-[tamanho]-qualy-quimy.webp
Exemplos:
  grafiato-25kg-qualy-quimy.webp
  q-color-18l-qualy-quimy.webp
  seladora-16l-qualy-quimy.webp
```

### Atributo ALT — Padrão:
```
alt="[Produto] [Tamanho] Qualy Quimy — [Cidade principal]"
Exemplos:
  alt="Grafiato 25kg Qualy Quimy — Itaquaquecetuba SP"
  alt="Q Color 18 Litros Qualy Quimy — Tinta Acrílica"
```

### Formato:
- Usar **WebP** sempre (menor tamanho, melhor performance)
- Tamanho máximo: 150kb por imagem
- Dimensões produto: 800x800px
- Dimensões hero: 1200x600px

---

## MALHA DE LINKS INTERNOS — REGRA DE OURO

```
HOME
 └── → Categorias (5)
      └── → Produtos (9)
           └── → Cidades (12+)
                └── → Bairros (60+)
                     └── → Blog (9+)
                          └── → Páginas Comerciais (4)
                               └── → WhatsApp / Shopee
```

### Em cada página de produto, linkar para:
- Categoria pai
- 2-3 produtos relacionados (ex: Seladora → Massa PVA → Q Color)
- 5 cidades principais
- 1 artigo de blog relacionado
- Página de frete

### Em cada página de cidade, linkar para:
- Todos os 9 produtos
- Bairros da cidade
- 5 cidades vizinhas
- Página de frete grátis

### Em cada página de bairro, linkar para:
- Cidade pai
- 3 produtos mais buscados
- WhatsApp direto

---

## CONFIGURAÇÕES GLOBAIS OBRIGATÓRIAS

Inserir em **TODAS** as páginas HTML no `<head>`:

```html
<!-- Verificação Google -->
<meta name="google-site-verification" content="Xz_2AAmdPmp8Z-4dD1Ji-ZoX2YU2kUZovEK9f03HgBM" />

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFTJ9MRF64"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HFTJ9MRF64');
</script>
```

---

## CONTADOR DE PÁGINAS — META 12 MESES

| Tipo | Qtd | Status |
|---|---|---|
| Home | 1 | ✅ Criada |
| Categorias | 5 | 🔄 Criar |
| Produtos | 9 | 🔄 Q Color criado (8 restantes) |
| Páginas Comerciais | 4 | 🔄 Criar |
| Cidades Tier 1 | 6 | 🔄 Itaquaquecetuba criada (5 restantes) |
| Cidades Tier 2 | 6 | 🔄 Criar |
| Bairros Itaquaquecetuba | 10 | 🔄 Criar |
| Bairros outras cidades | 50 | 🔄 Expandir |
| Blog | 9 | 🔄 Criar |
| **TOTAL** | **100+** | **2 páginas completas criadas** |
