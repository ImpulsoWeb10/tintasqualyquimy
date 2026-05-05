# Xquads AIOS Squads - Professional Edition

**Enterprise-grade AI agents system for Synkra AIOS**

## Overview

Xquads AIOS Squads is a professional, TypeScript-based system for managing specialized AI agents organized into functional squads. This refactored version provides enterprise-grade features including:

- **TypeScript/ES Modules**: Full type safety and modern JavaScript features
- **Modular Architecture**: Clean separation of concerns with core, agents, squads, and workflows
- **Professional Tooling**: ESLint, Prettier, Jest, and comprehensive testing
- **API Gateway**: RESTful API with WebSocket support for real-time interactions
- **Structured Logging**: Winston-based logging with multiple transports
- **Health Monitoring**: Comprehensive health checks and metrics
- **Configuration Management**: Environment-based configuration with validation
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Rate Limiting**: Built-in protection against abuse
- **Documentation**: Auto-generated API documentation

## Quick Start

### Prerequisites

- Node.js 18+
- npm 8+
- Redis (for caching and queues)

### Installation

```bash
# Clone the repository
git clone https://github.com/SynkraAI/xquads-squads.git
cd xquads-squads

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Configuration

```bash
# .env
NODE_ENV=development
PORT=3000
HOST=localhost
LOG_LEVEL=info
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## Architecture

### Core Components

```
src/
|-- core/           # Core system components
|   |-- Agent.ts     # Base agent class
|   |-- Squad.ts     # Squad management
|   |-- AgentRegistry.ts  # Central registry
|   `-- index.ts     # Core exports
|-- agents/         # Agent implementations
|-- squads/         # Squad configurations
|-- workflows/      # Workflow definitions
|-- routes/          # API routes
|-- middleware/      # Express middleware
|-- utils/           # Utility functions
|-- types/           # TypeScript type definitions
|-- config/          # Configuration management
`-- index.ts         # Application entry point
```

### Agent System

Each agent extends the `BaseAgent` class and provides:

- **Persona Definition**: Detailed personality and communication style
- **Core Frameworks**: Specialized knowledge and methodologies  
- **Commands**: Executable actions with input validation
- **Relationships**: Connections to complementary and contrasting agents

### Squad Management

Squads organize agents into functional groups with:

- **Routing Matrix**: Intelligent request routing based on context
- **Workflow Orchestration**: Multi-agent workflow execution
- **Health Monitoring**: Real-time squad status tracking
- **Dynamic Configuration**: Hot-reloadable squad definitions

## API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Agents
- `GET /agents` - List all agents
- `GET /agents/:id` - Get specific agent
- `POST /agents/:id/execute` - Execute agent command
- `GET /agents/:id/commands` - List agent commands
- `POST /agents/:id/activate` - Activate agent
- `POST /agents/:id/deactivate` - Deactivate agent

#### Squads
- `GET /squads` - List all squads
- `GET /squads/:id` - Get specific squad
- `GET /squads/:id/agents` - List squad agents
- `POST /squads/:id/execute` - Execute command in squad
- `POST /squads/:id/activate` - Activate squad
- `POST /squads/:id/deactivate` - Deactivate squad

#### Workflows
- `GET /workflows` - List all workflows
- `GET /workflows/:squadId/:workflowName` - Get specific workflow
- `POST /workflows/:squadId/:workflowName/execute` - Execute workflow
- `GET /workflows/:squadId` - List squad workflows

#### System
- `GET /system/health` - Health check
- `GET /system/stats` - System statistics
- `GET /system/validate` - Validate configuration
- `POST /system/reload` - Reload system
- `GET /system/export` - Export configuration
- `POST /system/shutdown` - Graceful shutdown

### WebSocket Events

Connect to `ws://localhost:3000` for real-time interactions:

- `execute-agent` - Execute agent command
- `execute-workflow` - Execute workflow
- `join-room` - Join room for updates
- `agent-response` - Agent execution response
- `workflow-response` - Workflow execution response

## Development

### Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report

# Code Quality
npm run lint         # ESLint
npm run lint:fix     # Auto-fix linting
npm run format       # Prettier
npm run typecheck    # TypeScript check

# Documentation
npm run docs:generate # Generate API docs
```

### Testing Strategy

- **Unit Tests**: Individual component testing with Jest
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full workflow testing
- **Coverage**: Minimum 80% coverage required

### Code Quality

- **ESLint**: Enforce code standards
- **Prettier**: Consistent code formatting
- **TypeScript**: Full type safety
- **Husky**: Pre-commit hooks

## Deployment

### Docker

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
```

### Production

```bash
# Build application
npm run build

# Start production server
npm start
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `localhost` |
| `LOG_LEVEL` | Logging level | `info` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `CORS_ORIGIN` | CORS origins | `localhost:3000` |
| `RATE_LIMIT_WINDOW` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX` | Rate limit max requests | `100` |

## Monitoring

### Health Checks

The system provides comprehensive health monitoring:

- **Registry Status**: Agent and squad availability
- **Database Connectivity**: Connection health
- **Redis Status**: Cache and queue health
- **Memory Usage**: System resource monitoring
- **Response Times**: Performance metrics

### Metrics

Track system performance with:

- Request counts and response times
- Agent execution statistics
- Error rates and types
- Resource utilization
- Active connections

## Security

### Built-in Protections

- **Rate Limiting**: Prevent abuse with configurable limits
- **Input Validation**: Zod-based request validation
- **CORS**: Cross-origin protection
- **Helmet**: Security headers
- **Error Sanitization**: Prevent information leakage

### Best Practices

- Environment variable encryption
- Regular security updates
- Input sanitization
- Output encoding
- Authentication middleware (add as needed)

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Ensure code quality (lint, format, typecheck)
5. Submit pull request

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/new-agent

# Make changes
# ... edit files ...

# Run tests
npm test

# Check code quality
npm run lint
npm run typecheck

# Commit and push
git add .
git commit -m "feat: add new agent"
git push origin feature/new-agent
```

## License

MIT License - see LICENSE file for details.

## Support

- **Documentation**: [docs.xquads.aios.com](https://docs.xquads.aios.com)
- **Issues**: [GitHub Issues](https://github.com/SynkraAI/xquads-squads/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SynkraAI/xquads-squads/discussions)

---

**Xquads by Synkra** - Professional AI Agents System
