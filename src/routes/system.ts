/**
 * System management routes
 */

import { Router, Request, Response } from 'express';
import { AgentRegistry } from '@/core';
import { ApiResponse, Metrics } from '@/types';
import { asyncHandler } from '@/middleware/errorHandler';
import { healthCheck } from '@/utils/healthCheck';

const router = Router();
const registry = AgentRegistry.getInstance();

// GET /api/v1/system/health - System health check
router.get('/health', asyncHandler(async (req: Request, res: Response) => {
  const health = await healthCheck();
  
  const response: ApiResponse = {
    success: health.status === 'healthy',
    data: health,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.status(health.status === 'healthy' ? 200 : 503).json(response);
}));

// GET /api/v1/system/stats - System statistics
router.get('/stats', asyncHandler(async (req: Request, res: Response) => {
  const registryStats = registry.getStats();
  
  const metrics: Metrics = {
    requests: {
      total: 0, // Would be tracked in a real implementation
      success: 0,
      error: 0,
      averageResponseTime: 0,
    },
    agents: {
      total: registryStats.totalAgents,
      active: registryStats.activeAgents,
      averageExecutionTime: 0, // Would be calculated from actual executions
    },
    squads: {
      total: registryStats.totalSquads,
      active: registryStats.activeSquads,
    },
    system: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed,
      cpuUsage: process.cpuUsage().user,
    },
  };

  const response: ApiResponse = {
    success: true,
    data: metrics,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/system/validate - Validate system configuration
router.get('/validate', asyncHandler(async (req: Request, res: Response) => {
  const validation = registry.validate();
  
  const response: ApiResponse = {
    success: validation.isValid,
    data: validation,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/system/reload - Reload system configuration
router.post('/reload', asyncHandler(async (req: Request, res: Response) => {
  // Deactivate all
  await registry.deactivateAll();
  
  // Clear registry
  registry.clear();
  
  // Reinitialize (would load from config files in real implementation)
  await registry.activateAll();

  const response: ApiResponse = {
    success: true,
    data: { message: 'System reloaded successfully' },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/system/export - Export system configuration
router.get('/export', asyncHandler(async (req: Request, res: Response) => {
  const exportData = registry.export();
  
  const response: ApiResponse = {
    success: true,
    data: exportData,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/system/shutdown - Graceful shutdown
router.post('/shutdown', asyncHandler(async (req: Request, res: Response) => {
  await registry.deactivateAll();

  const response: ApiResponse = {
    success: true,
    data: { message: 'System shutdown initiated' },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
  
  // Graceful shutdown after response
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}));

export { router as systemRoutes };
