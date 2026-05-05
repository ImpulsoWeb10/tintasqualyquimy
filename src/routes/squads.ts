/**
 * Squad management routes
 */

import { Router, Request, Response } from 'express';
import { AgentRegistry } from '@/core';
import { ApiResponse } from '@/types';
import { asyncHandler, CustomError } from '@/middleware/errorHandler';

const router = Router();
const registry = AgentRegistry.getInstance();

// GET /api/v1/squads - List all squads
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { tag } = req.query;
  
  let squads = registry.getAllSquads();
  
  // Filter by tag
  if (tag) {
    squads = squads.filter(squad => squad.hasTag(String(tag)));
  }

  const response: ApiResponse = {
    success: true,
    data: squads.map(squad => ({
      id: squad.getId(),
      name: squad.getName(),
      description: squad.getDescription(),
      version: squad.getVersion(),
      tags: squad.getTags(),
      stats: squad.getStats(),
    })),
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/squads/:id - Get specific squad
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const squad = registry.getSquad(id);

  if (!squad) {
    throw new CustomError(`Squad ${id} not found`, 404);
  }

  const response: ApiResponse = {
    success: true,
    data: {
      config: squad.getConfig(),
      stats: squad.getStats(),
      agents: squad.getAgents().map(agent => ({
        id: agent.getId(),
        name: agent.getName(),
        tier: agent.getTier(),
        isActive: agent.isAgentActive(),
      })),
      workflows: squad.getWorkflows().map(workflow => ({
        name: workflow.name,
        description: workflow.description,
        version: workflow.version,
      })),
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// GET /api/v1/squads/:id/agents - Get squad agents
router.get('/:id/agents', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tier, focus } = req.query;
  
  const squad = registry.getSquad(id);
  if (!squad) {
    throw new CustomError(`Squad ${id} not found`, 404);
  }

  let agents = squad.getAgents();
  
  // Filter by tier
  if (tier) {
    agents = agents.filter(agent => agent.getTier() === Number(tier));
  }
  
  // Filter by focus area
  if (focus) {
    agents = agents.filter(agent => 
      agent.getFocusAreas().some(area => 
        area.toLowerCase().includes(String(focus).toLowerCase())
      )
    );
  }

  const response: ApiResponse = {
    success: true,
    data: agents.map(agent => ({
      id: agent.getId(),
      name: agent.getName(),
      tier: agent.getTier(),
      focus: agent.getFocusAreas(),
      commands: agent.getCommands(),
      isActive: agent.isAgentActive(),
      stats: agent.getStats(),
    })),
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/squads/:id/execute - Execute command in squad
router.post('/:id/execute', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { command, input, context } = req.body;

  const squad = registry.getSquad(id);
  if (!squad) {
    throw new CustomError(`Squad ${id} not found`, 404);
  }

  const response = await squad.routeRequest({
    agentId: '', // Will be determined by squad routing
    command,
    input,
    context,
  });

  const apiResponse: ApiResponse = {
    success: true,
    data: response,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(apiResponse);
}));

// POST /api/v1/squads/:id/activate - Activate squad
router.post('/:id/activate', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const squad = registry.getSquad(id);

  if (!squad) {
    throw new CustomError(`Squad ${id} not found`, 404);
  }

  squad.activate();

  const response: ApiResponse = {
    success: true,
    data: { message: `Squad ${id} activated successfully` },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/squads/:id/deactivate - Deactivate squad
router.post('/:id/deactivate', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const squad = registry.getSquad(id);

  if (!squad) {
    throw new CustomError(`Squad ${id} not found`, 404);
  }

  squad.deactivate();

  const response: ApiResponse = {
    success: true,
    data: { message: `Squad ${id} deactivated successfully` },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

export { router as squadRoutes };
