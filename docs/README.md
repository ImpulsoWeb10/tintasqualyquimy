# Documentação do Projeto Xquads AIOS Squads

## Visão Geral

Esta documentação cobre todos os aspectos do sistema Xquads AIOS Squads, desde a arquitetura até o uso diário.

## Estrutura da Documentação

### [API Reference](./api/)
- **Endpoints**: Documentação completa da REST API
- **WebSocket**: Eventos e mensagens em tempo real
- **Authentication**: Como autenticar e autorizar
- **Error Handling**: Códigos de erro e soluções

### [Guides](./guides/)
- **Getting Started**: Guia rápido para novos desenvolvedores
- **Agent Development**: Como criar novos agentes
- **Squad Configuration**: Configurar squads personalizados
- **Deployment**: Como fazer deploy em produção
- **Troubleshooting**: Problemas comuns e soluções

### [Architecture](./architecture/)
- **System Design**: Arquitetura geral do sistema
- **Data Flow**: Como os dados fluem entre componentes
- **Security**: Medidas de segurança implementadas
- **Performance**: Otimizações e melhores práticas

## Começando

### Pré-requisitos
- Node.js 18+
- npm 8+
- Redis (opcional, para cache)
- Git

### Instalação Rápida
```bash
# Clone o repositório
git clone https://github.com/SynkraAI/xquads-squads.git
cd xquads-squads

# Execute o setup
chmod +x tools/scripts/setup.sh
./tools/scripts/setup.sh

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração
Copie `.env.example` para `.env` e configure:
- `PORT`: Porta do servidor (padrão: 3000)
- `REDIS_HOST`: Host do Redis (padrão: localhost)
- `LOG_LEVEL`: Nível de log (info, debug, error)

## Conceitos Chave

### **Agents**
Agentes são entidades de IA especializadas com:
- **Persona**: Personalidade e estilo de comunicação
- **Frameworks**: Conhecimento especializado
- **Commands**: Ações executáveis
- **Relationships**: Conexões com outros agentes

### **Squads**
Squads organizam agentes em grupos funcionais:
- **Routing Matrix**: Direcionamento inteligente de requisições
- **Workflows**: Orquestração multi-agente
- **Health Monitoring**: Status em tempo real

### **Workflows**
Workflows definem processos automatizados:
- **Steps**: Sequência de tarefas
- **Parallel Execution**: Execução concorrente
- **Error Handling**: Tratamento de falhas

## API Overview

### Endpoints Principais
```
GET    /api/v1/agents           # Listar agentes
POST   /api/v1/agents/:id/execute # Executar agente
GET    /api/v1/squads           # Listar squads
POST   /api/v1/squads/:id/execute # Executar em squad
GET    /api/v1/workflows        # Listar workflows
GET    /api/v1/system/health    # Health check
```

### WebSocket Events
```javascript
// Conectar ao WebSocket
const socket = io('ws://localhost:3000');

// Executar agente
socket.emit('execute-agent', {
  agentId: 'ray-dalio',
  command: 'principles',
  input: { situation: 'business decision' }
});

// Receber resposta
socket.on('agent-response', (response) => {
  console.log('Agent response:', response);
});
```

## Exemplos de Uso

### Criar um Novo Agente
```typescript
import { BaseAgent } from '@/core';

class CustomAgent extends BaseAgent {
  protected async executeCommand(
    command: string,
    input: Record<string, unknown>
  ): Promise<unknown> {
    switch (command) {
      case 'analyze':
        return this.analyzeData(input);
      default:
        throw new Error(`Command ${command} not found`);
    }
  }

  private analyzeData(data: Record<string, unknown>) {
    // Lógica de análise
    return { analysis: 'completed', result: data };
  }
}
```

### Configurar um Squad
```yaml
name: custom-squad
version: "1.0.0"
description: "Squad personalizado para análise"
components:
  agents:
    - custom-agent.md
  workflows:
    - analysis-workflow.yaml
routingMatrix:
  analysis:
    primary: custom-agent
    triggers: ["analyze", "process", "evaluate"]
```

## Monitoramento

### Health Checks
```bash
# Verificar saúde do sistema
curl http://localhost:3000/api/v1/system/health

# Verificar estatísticas
curl http://localhost:3000/api/v1/system/stats
```

### Logs
```bash
# Verificar logs em tempo real
tail -f logs/combined.log

# Verificar apenas erros
tail -f logs/error.log
```

## Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
# Script de deploy
./tools/scripts/deploy.sh production

# Ou manualmente
npm run build
npm start
```

## Contribuição

1. Fork do repositório
2. Criar branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adicionar nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Pull Request

## Suporte

- **Issues**: [GitHub Issues](https://github.com/SynkraAI/xquads-squads/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SynkraAI/xquads-squads/discussions)
- **Email**: contato@xquads.aios.com

## Licença

MIT License - veja arquivo LICENSE para detalhes.
