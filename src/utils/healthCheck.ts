/**
 * Health check utilities
 */

import { HealthCheck, ServiceHealth } from '@/types';
import { AgentRegistry } from '@/core';
import config from '@/config';

export const healthCheck = async (): Promise<HealthCheck> => {
  const registry = AgentRegistry.getInstance();
  const stats = registry.getStats();
  
  const services: Record<string, ServiceHealth> = {
    registry: {
      status: stats.isInitialized ? 'healthy' : 'unhealthy',
      responseTime: 0,
      lastCheck: new Date().toISOString(),
      details: stats,
    },
    database: await checkDatabase(),
    redis: await checkRedis(),
    cache: await checkCache(),
  };

  const overallStatus = Object.values(services).every(
    service => service.status === 'healthy'
  ) ? 'healthy' : 
  Object.values(services).some(
    service => service.status === 'degraded'
  ) ? 'degraded' : 'unhealthy';

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    services,
    uptime: process.uptime(),
    version: process.env.npm_package_version || '2.0.0',
  };
};

const checkDatabase = async (): Promise<ServiceHealth> => {
  const startTime = Date.now();
  
  try {
    // Add actual database health check here
    // For now, just simulate a healthy connection
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

const checkRedis = async (): Promise<ServiceHealth> => {
  const startTime = Date.now();
  
  try {
    // Add actual Redis health check here
    // For now, just simulate a healthy connection
    await new Promise(resolve => setTimeout(resolve, 5));
    
    return {
      status: 'healthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};

const checkCache = async (): Promise<ServiceHealth> => {
  const startTime = Date.now();
  
  try {
    // Add actual cache health check here
    // For now, just simulate a healthy cache
    await new Promise(resolve => setTimeout(resolve, 2));
    
    return {
      status: config.cache.enabled ? 'healthy' : 'degraded',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: {
        enabled: config.cache.enabled,
        ttl: config.cache.ttl,
        max: config.cache.max,
      },
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      lastCheck: new Date().toISOString(),
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
};
