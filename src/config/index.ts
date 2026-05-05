/**
 * Centralized configuration management
 */

import { z } from 'zod';
import { SystemConfig } from '@/types';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('localhost'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX: z.string().transform(Number).default('100'),
  CACHE_TTL: z.string().transform(Number).default('3600000'),
  CACHE_MAX: z.string().transform(Number).default('1000'),
});

const env = envSchema.parse(process.env);

export const config: SystemConfig = {
  server: {
    port: env.PORT,
    host: env.HOST,
    cors: {
      origin: env.CORS_ORIGIN.split(','),
      credentials: true,
    },
    rateLimit: {
      windowMs: env.RATE_LIMIT_WINDOW,
      max: env.RATE_LIMIT_MAX,
    },
  },
  logging: {
    level: env.LOG_LEVEL,
    format: env.NODE_ENV === 'production' ? 'json' : 'simple',
    transports: ['console', 'file'],
  },
  cache: {
    enabled: true,
    ttl: env.CACHE_TTL,
    max: env.CACHE_MAX,
  },
  queues: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
    },
  },
};

export default config;
