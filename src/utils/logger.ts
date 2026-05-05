/**
 * Structured logging system
 */

import winston from 'winston';
import { LogEntry } from '@/types';
import config from '@/config';

// Custom format for structured logging
const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const logEntry: LogEntry = {
      level: level as LogEntry['level'],
      message,
      timestamp,
      ...meta,
    };
    return JSON.stringify(logEntry);
  })
);

// Simple format for development
const simpleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: config.logging.level,
  format: config.logging.format === 'json' ? customFormat : simpleFormat,
  defaultMeta: {
    service: 'xquads-aios-squads',
    version: process.env.npm_package_version || '2.0.0',
  },
  transports: [
    new winston.transports.Console({
      format: config.logging.format === 'json' ? customFormat : simpleFormat,
    }),
    ...(config.logging.transports.includes('file')
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: customFormat,
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: customFormat,
          }),
        ]
      : []),
  ],
});

// Helper methods for structured logging
export const loggers = {
  error: (message: string, context?: Record<string, unknown>) => {
    logger.error(message, context);
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    logger.warn(message, context);
  },
  info: (message: string, context?: Record<string, unknown>) => {
    logger.info(message, context);
  },
  debug: (message: string, context?: Record<string, unknown>) => {
    logger.debug(message, context);
  },
  // Agent-specific logging
  agent: {
    execution: (agentId: string, command: string, executionTime: number, context?: Record<string, unknown>) => {
      logger.info('Agent execution', {
        agentId,
        command,
        executionTime,
        ...context,
      });
    },
    error: (agentId: string, error: Error, context?: Record<string, unknown>) => {
      logger.error('Agent error', {
        agentId,
        error: error.message,
        stack: error.stack,
        ...context,
      });
    },
  },
  // Squad-specific logging
  squad: {
    activation: (squadId: string, agentIds: string[], context?: Record<string, unknown>) => {
      logger.info('Squad activation', {
        squadId,
        agentIds,
        ...context,
      });
    },
    workflow: {
      start: (workflowId: string, squadId: string, context?: Record<string, unknown>) => {
        logger.info('Workflow started', {
          workflowId,
          squadId,
          ...context,
        });
      },
      complete: (workflowId: string, duration: number, context?: Record<string, unknown>) => {
        logger.info('Workflow completed', {
          workflowId,
          duration,
          ...context,
        });
      },
      error: (workflowId: string, error: Error, context?: Record<string, unknown>) => {
        logger.error('Workflow error', {
          workflowId,
          error: error.message,
          stack: error.stack,
          ...context,
        });
      },
    },
  },
  // System logging
  system: {
    startup: () => {
      logger.info('System startup', {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage(),
      });
    },
    shutdown: () => {
      logger.info('System shutdown');
    },
    health: (health: Record<string, unknown>) => {
      logger.info('Health check', health);
    },
  },
  // Request logging
  request: {
    start: (method: string, url: string, requestId: string, userId?: string) => {
      logger.info('Request started', {
        method,
        url,
        requestId,
        userId,
      });
    },
    complete: (requestId: string, statusCode: number, responseTime: number) => {
      logger.info('Request completed', {
        requestId,
        statusCode,
        responseTime,
      });
    },
    error: (requestId: string, error: Error, statusCode?: number) => {
      logger.error('Request error', {
        requestId,
        error: error.message,
        statusCode,
      });
    },
  },
};

export default logger;
