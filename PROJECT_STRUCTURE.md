# Estrutura do Projeto - Organização Profissional

## Visão Geral

Este projeto foi reorganizado seguindo boas práticas de desenvolvimento para facilitar manutenção, escalabilidade e colaboração.

## Estrutura de Diretórios

```
IA-AGENTES/
|
|-- .env.example                    # Variáveis de ambiente exemplo
|-- .eslintrc.json                  # Configuração ESLint
|-- .gitignore                       # Arquivos ignorados pelo Git
|-- .prettierrc                      # Configuração Prettier
|-- package.json                     # Dependências e scripts
|-- tsconfig.json                    # Configuração TypeScript
|
|-- README.md                        # Documentação principal
|-- README-PROFESSIONAL.md           # Documentação profissional
|-- PROJECT_STRUCTURE.md             # Este arquivo
|
|-- src/                             # Sistema principal (TypeScript)
|   |-- core/                        # Classes base (Agent, Squad, Registry)
|   |-- types/                       # Definições TypeScript
|   |-- config/                      # Configuração centralizada
|   |-- utils/                       # Utilitários (logger, health check)
|   |-- middleware/                  # Middleware Express
|   |-- routes/                      # Rotas da API
|   |-- agents/                      # Implementações de agentes
|   |-- squads/                      # Configurações de squads
|   |-- workflows/                   # Definições de workflows
|   |-- tasks/                       # Tasks executáveis
|   `-- index.ts                     # Entry point da aplicação
|
|-- projects/                        # Projetos e aplicações
|   |-- xquads-squads/               # Sistema de squads IA
|   |   |-- advisory-board/          # Squad de conselheiros
|   |   |-- brand-squad/             # Squad de branding
|   |   |-- c-level-squad/           # Squad executivo
|   |   |-- claude-code-mastery/     # Squad Claude Code
|   |   |-- copy-squad/              # Squad copywriting
|   |   |-- cybersecurity/           # Squad segurança
|   |   |-- data-squad/              # Squad analytics
|   |   |-- design-squad/            # Squad design
|   |   |-- hormozi-squad/           # Squad negócios
|   |   |-- movement/                # Squad movimentos
|   |   |-- storytelling/            # Squad narrativa
|   |   `-- traffic-masters/         # Squad tráfego
|   |
|   |-- marketing-automation/        # Sistema de marketing
|   |   |-- 00-SISTEMA/              # Sistema central
|   |   |-- 01-SHOPPE/               # Automação Shopee
|   |   |-- 02-LANDING/              # Landing pages
|   |   |-- 03-WHATSAPP/             # Automação WhatsApp
|   |   |-- 04-SOCIAL/               # Redes sociais
|   |   |-- 05-SEO/                  # SEO automatizado
|   |   |-- 06-PRODUTOS/             # Gestão produtos
|   |   `-- 07-AGENTES/              # Agentes de marketing
|   |
|   |-- landing-pages/               # Landing pages otimizadas
|   |   |-- landing-page-grafiato.html
|   |   `-- painel-master.html
|   |
|   `-- legacy-systems/              # Sistemas legados
|       |-- tintasqualyquimy/        # E-commerce tintas
|       |-- mercado-livre/           # Automação ML
|       `-- OpenClaude/             # Sistema Claude
|
|-- docs/                            # Documentação
|   |-- api/                         # Documentação API
|   |-- guides/                      # Guias de uso
|   `-- architecture/                # Arquitetura do sistema
|
|-- tests/                           # Testes
|   |-- unit/                        # Testes unitários
|   |-- integration/                 # Testes integração
|   `-- e2e/                         # Testes end-to-end
|
|-- tools/                           # Ferramentas e scripts
|   |-- scripts/                     # Scripts de automação
|   `-- generators/                  # Geradores de código
|
|-- assets/                          # Recursos estáticos
|   |-- images/                      # Imagens e gráficos
|   `-- templates/                   # Templates e modelos
|
|-- docker/                          # Configurações Docker
|
`-- .next/                          # Build Next.js (se aplicável)
```

## Organização por Categoria

### 1. **Sistema Principal** (`src/`)
- **Core**: Classes fundamentais do sistema
- **Types**: Definições TypeScript para type safety
- **Config**: Gerenciamento de configuração
- **Utils**: Funções utilitárias reutilizáveis
- **Middleware**: Middleware Express para API
- **Routes**: Endpoints da API REST
- **Agents/Workflows**: Implementações específicas

### 2. **Projetos** (`projects/`)
- **xquads-squads**: Sistema de agentes IA especializados
- **marketing-automation**: Automação de marketing digital
- **landing-pages**: Páginas de conversão otimizadas
- **legacy-systems**: Sistemas antigos em manutenção

### 3. **Documentação** (`docs/`)
- **API**: Documentação técnica dos endpoints
- **Guides**: Tutoriais e guias de uso
- **Architecture**: Documentação arquitetural

### 4. **Qualidade** (`tests/`)
- **Unit**: Testes de unidades isoladas
- **Integration**: Testes de integração entre módulos
- **E2E**: Testes de fluxo completo

### 5. **Ferramentas** (`tools/`)
- **Scripts**: Automação de tarefas repetitivas
- **Generators**: Geradores de código e templates

### 6. **Recursos** (`assets/`)
- **Images**: Imagens, ícones, gráficos
- **Templates**: Modelos reutilizáveis

## Boas Práticas Implementadas

### **Separação de Responsabilidades**
- Cada diretório tem propósito claro
- Módulos independentes e coesos
- Interface bem definida entre componentes

### **Versionamento**
- Git para controle de versões
- Branches por feature/fix
- Commits semânticos

### **Qualidade de Código**
- TypeScript para type safety
- ESLint para padronização
- Prettier para formatação
- Testes automatizados

### **Documentação**
- README em cada módulo importante
- Documentação de API
- Guias de uso e arquitetura

### **Configuração**
- Variáveis de ambiente
- Configurações centralizadas
- Diferentes ambientes (dev/prod/test)

## Fluxo de Trabalho

### **Desenvolvimento**
1. Criar branch para feature/fix
2. Desenvolver no diretório apropriado
3. Escrever testes
4. Documentar mudanças
5. Abrir Pull Request

### **Deploy**
1. Build do projeto
2. Testes automatizados
3. Deploy em ambiente de staging
4. Validação
5. Deploy em produção

### **Manutenção**
1. Monitoramento de erros
2. Atualização de dependências
3. Refatoração quando necessário
4. Documentação atualizada

## Próximos Passos

1. **Mover arquivos restantes** para diretórios apropriados
2. **Criar scripts** de automação
3. **Implementar CI/CD** pipeline
4. **Documentar APIs** com Swagger
5. **Criar guias** de desenvolvimento

## Convenções de Nomenclatura

- **Diretórios**: kebab-case (ex: marketing-automation)
- **Arquivos**: kebab-case (ex: landing-page-grafiato.html)
- **Classes**: PascalCase (ex: AgentRegistry)
- **Funções**: camelCase (ex: executeCommand)
- **Constantes**: UPPER_SNAKE_CASE (ex: API_BASE_URL)

Esta estrutura garante escalabilidade, manutenibilidade e colaboração eficiente entre desenvolvedores.
