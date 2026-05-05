/**
 * Xquads AIOS Squads System - Main Entry Point
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import rateLimit from 'express-rate-limit';

import { AgentRegistry } from '@/core';
import { loggers } from '@/utils/logger';
import config from '@/config';
import { apiRoutes } from '@/routes';
import { errorHandler } from '@/middleware/errorHandler';
import { requestLogger } from '@/middleware/requestLogger';
import { healthCheck } from '@/utils/healthCheck';

class XquadsServer {
  private app: express.Application;
  private server: any;
  private io: SocketIOServer;
  private registry: AgentRegistry;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: config.server.cors.origin,
        credentials: config.server.cors.credentials,
      },
    });
    this.registry = AgentRegistry.getInstance();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
    this.setupErrorHandling();
  }

  /**
   * Setup Express middleware
   */
  private setupMiddleware(): void {
    // Security
    this.app.use(helmet());
    this.app.use(cors(config.server.cors));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.server.rateLimit.windowMs,
      max: config.server.rateLimit.max,
      message: 'Too many requests from this IP, please try again later.',
    });
    this.app.use(limiter);

    // Logging
    this.app.use(morgan('combined'));
    this.app.use(requestLogger);

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  /**
   * Setup API routes
   */
  private setupRoutes(): void {
    // Health check
    this.app.get('/health', async (req, res) => {
      try {
        const health = await healthCheck();
        res.json(health);
      } catch (error) {
        res.status(503).json({
          status: 'unhealthy',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });

    // API routes
    this.app.use('/api/v1', apiRoutes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        name: 'Xquads AIOS Squads System',
        version: '2.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: '/health',
          api: '/api/v1',
          docs: '/api/v1/docs',
        },
      });
    });

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Endpoint not found',
        },
      });
    });
  }

  /**
   * Setup WebSocket handlers
   */
  private setupWebSocket(): void {
    this.io.on('connection', (socket) => {
      loggers.info('WebSocket client connected', { socketId: socket.id });

      // Join room for real-time updates
      socket.on('join-room', (room: string) => {
        socket.join(room);
        loggers.info('Client joined room', { socketId: socket.id, room });
      });

      // Handle agent execution requests
      socket.on('execute-agent', async (data) => {
        try {
          const response = await this.registry.executeAgentCommand(data);
          socket.emit('agent-response', response);
        } catch (error) {
          socket.emit('agent-error', {
            error: error instanceof Error ? error.message : 'Unknown error',
            requestId: data.requestId,
          });
        }
      });

      // Handle workflow execution requests
      socket.on('execute-workflow', async (data) => {
        try {
          const squad = this.registry.getSquad(data.squadId);
          if (!squad) {
            throw new Error(`Squad ${data.squadId} not found`);
          }

          const results = await squad.executeWorkflow(
            data.workflowName,
            data.input,
            data.context
          );

          socket.emit('workflow-response', {
            results,
            requestId: data.requestId,
          });
        } catch (error) {
          socket.emit('workflow-error', {
            error: error instanceof Error ? error.message : 'Unknown error',
            requestId: data.requestId,
          });
        }
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        loggers.info('WebSocket client disconnected', { socketId: socket.id });
      });
    });
  }

  /**
   * Setup error handling
   */
  private setupErrorHandling(): void {
    this.app.use(errorHandler);

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      loggers.error('Unhandled Rejection', {
        reason: reason instanceof Error ? reason.message : reason,
        promise: promise.toString(),
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      loggers.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => this.gracefulShutdown());
    process.on('SIGINT', () => this.gracefulShutdown());
  }

  /**
   * Initialize and start the server
   */
  public async start(): Promise<void> {
    try {
      // Initialize registry
      await this.initializeRegistry();

      // Start server
      this.server.listen(config.server.port, config.server.host, () => {
        loggers.system.startup();
        loggers.info('Server started successfully', {
          host: config.server.host,
          port: config.server.port,
          env: process.env.NODE_ENV,
        });
      });

    } catch (error) {
      loggers.error('Failed to start server', {
        error: error instanceof Error ? error.message : error,
      });
      process.exit(1);
    }
  }

  /**
   * Initialize agent registry with squads and agents
   */
  private async initializeRegistry(): Promise<void> {
    // This would load squads and agents from configuration files
    // For now, we'll just activate the registry
    await this.registry.activateAll();

    // Validate registry
    const validation = this.registry.validate();
    if (!validation.isValid) {
      loggers.error('Registry validation failed', {
        errors: validation.errors,
        warnings: validation.warnings,
      });
      throw new Error('Registry validation failed');
    }

    if (validation.warnings.length > 0) {
      loggers.warn('Registry validation warnings', {
        warnings: validation.warnings,
      });
    }

    loggers.info('Registry initialized successfully', this.registry.getStats());
  }

  /**
   * Graceful shutdown
   */
  private async gracefulShutdown(): Promise<void> {
    loggers.system.shutdown();

    // Close HTTP server
    this.server.close(() => {
      loggers.info('HTTP server closed');
    });

    // Close WebSocket connections
    this.io.close(() => {
      loggers.info('WebSocket server closed');
    });

    // Deactivate registry
    await this.registry.deactivateAll();

    process.exit(0);
  }
}

// Start the server
const server = new XquadsServer();
server.start().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

export default XquadsServer;
