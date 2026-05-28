# Workflow: create-product

## Objetivo
Orquestrar a criação de um produto completo com validação, SEO, copy, landing page e formatos de marketplace e redes sociais.

## Entrada
- `produto`:
  - `nome`
  - `categoria`
  - `ean`
  - `peso`
  - `medidas`
  - `beneficios`
  - `aplicacoes`
  - `palavras_chave`
  - `urls`
  - `marketplaces`
  - `hashtags`

## Passos do fluxo
1. Receber input produto
   - Capturar dados de produto do usuário ou integração.
   - Normalizar campos e formatos.

2. Validar EAN
   - Verificar se o EAN está presente e no formato válido.
   - Validar consistência com regras de código de barras.

3. Consultar Brand DNA
   - Recuperar posicionamento, tom de voz e diretrizes da marca.
   - Ajustar conteúdo ao estilo da marca.

4. Consultar Memory
   - Buscar memórias e dados existentes do produto.
   - Identificar conteúdos relacionados, histórico e variantes.

5. Gerar SEO
   - Criar título SEO, meta description e palavras-chave otimizadas.
   - Definir estrutura de conteúdo, headings e foco semântico.

6. Gerar copy
   - Produzir copy comercial convincente e alinhada ao público.
   - Gerar descrições curtas, médias e longas.

7. Gerar landing page
   - Estruturar landing page com hero, benefícios, provas sociais e CTA.
   - Incluir seções de aplicação, diferenciais e especificações técnicas.

8. Gerar Mercado Livre
   - Gerar título, descrição, bullets e atributos para Mercado Livre.
   - Incluir SEO de marketplace e tags relevantes.

9. Gerar Shopee
   - Gerar título, descrição e detalhes para Shopee.
   - Ajustar formato para o layout e regras da plataforma.

10. Gerar Instagram
    - Criar legenda, sugestões de carrossel/posts e chamadas para ação.
    - Incluir hashtags e temas visuais.

11. Gerar WhatsApp
    - Criar mensagens para vendas, atendimento e follow-up.
    - Incluir respostas rápidas e fluxos de engajamento.

12. Gerar schema
    - Construir schema.org para produto, reviews e oferta.
    - Validar JSON-LD e consistência de dados.

13. Validar qualidade
    - Verificar gramática, coerência, voz de marca e aderência ao briefing.
    - Checar formatos, compliance e boas práticas SEO.

14. Salvar outputs
    - Persistir outputs em storage, CMS ou memória do sistema.
    - Registrar logs e versionamento de conteúdo.

## Saída esperada
- `seo`
- `copy`
- `landing_page`
- `mercado_livre`
- `shopee`
- `instagram`
- `whatsapp`
- `schema`
- `quality_report`
- `storage_reference`
