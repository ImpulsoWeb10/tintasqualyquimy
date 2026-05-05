/**
 * Workflow management routes
 */

import { Router, Request, Response } from 'express';
import { AgentRegistry } from '@/core';
import { ApiResponse } from '@/types';
import { asyncHandler, CustomError } from '@/middleware/errorHandler';

const router = Router();
const registry = AgentRegistry.getInstance();

// GET /api/v1/workflows - List all workflows across squads
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { squad } = req.query;
  
  const allWorkflows: Array<{
    name: string;
    description: string;
    version: string;
    squadId: string;
    squadName: string;
  }> = [];

  const squads = squad 
    ? [registry.getSquad(String(squad))].filter(Boolean)
    : registry.getAllSquads();

  for (const squad of squads) {
    const workflows = squad.getWorkflows();
    for (const workflow of workflows) {
      allWorkflows.push({
        name: workflow.name,
        description: workflow.description,
        version: workflow.version,
        squadId: squad.getId(),
        squadName: squad.getName(),
      });
    }
  }

  const response: ApiResponse = {
    success: true,
    data: allWorkflows,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/workflows/:squadId/:workflowName - Get specific workflow
router.get('/:squadId/:workflowName', asyncHandler(async (req: Request, res: Response) => {
  const { squadId, workflowName } = req.params;
  
  const squad = registry.getSquad(squadId);
  if (!squad) {
    throw new CustomError(`Squad ${squadId} not found`, 404);
  }

  const workflow = squad.getWorkflow(workflowName);
  if (!workflow) {
    throw new CustomError(`Workflow ${workflowName} not found in squad ${squadId}`, 404);
  }

  const response: ApiResponse = {
    success: true,
    data: workflow,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/workflows/:squadId/:workflowName/execute - Execute workflow
router.post('/:squadId/:workflowName/execute', asyncHandler(async (req: Request, res: Response) => {
  const { squadId, workflowName } = req.params;
  const { input, context } = req.body;

  const squad = registry.getSquad(squadId);
  if (!squad) {
    throw new CustomError(`Squad ${squadId} not found`, 404);
  }

  const workflow = squad.getWorkflow(workflowName);
  if (!workflow) {
    throw new CustomError(`Workflow ${workflowName} not found in squad ${squadId}`, 404);
  }

  const results = await squad.executeWorkflow(workflowName, input, context);

  const response: ApiResponse = {
    success: true,
    data: {
      workflowName,
      squadId,
      results,
      timestamp: new Date().toISOString(),
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/workflows/:squadId - List workflows for specific squad
router.get('/:squadId', asyncHandler(async (req: Request, res: Response) => {
  const { squadId } = req.params;
  
  const squad = registry.getSquad(squadId);
  if (!squad) {
    throw new CustomError(`Squad ${squadId} not found`, 404);
  }

  const workflows = squad.getWorkflows().map(workflow => ({
    name: workflow.name,
    description: workflow.description,
    version: workflow.version,
    triggers: workflow.triggers,
    stepCount: workflow.steps.length,
  }));

  const response: ApiResponse = {
    success: true,
    data: workflows,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

export { router as workflowRoutes };
