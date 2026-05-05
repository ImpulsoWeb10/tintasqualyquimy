/**
 * Agent management routes
 */

import { Router, Request, Response } from 'express';
import { AgentRegistry } from '@/core';
import { ApiResponse, AgentRequest } from '@/types';
import { asyncHandler, CustomError } from '@/middleware/errorHandler';
import { validateAgentRequest } from '@/middleware/validation';

const router = Router();
const registry = AgentRegistry.getInstance();

// GET /api/v1/agents - List all agents
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { tier, focus, squad } = req.query;
  
  let agents = registry.getAllAgents();
  
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
  
  // Filter by squad
  if (squad) {
    agents = agents.filter(agent => agent.getConfig().squad === String(squad));
  }

  const response: ApiResponse = {
    success: true,
    data: agents.map(agent => ({
      id: agent.getId(),
      name: agent.getName(),
      tier: agent.getTier(),
      squad: agent.getConfig().squad,
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

// GET /api/v1/agents/:id - Get specific agent
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const agent = registry.getAgent(id);

  if (!agent) {
    throw new CustomError(`Agent ${id} not found`, 404);
  }

  const response: ApiResponse = {
    success: true,
    data: {
      config: agent.getConfig(),
      stats: agent.getStats(),
      greeting: agent.getGreeting(),
      relatedAgents: agent.getRelatedAgents(),
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/agents/:id/execute - Execute agent command
router.post('/:id/execute', validateAgentRequest, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { command, input, context } = req.body as AgentRequest;

  const agent = registry.getAgent(id);
  if (!agent) {
    throw new CustomError(`Agent ${id} not found`, 404);
  }

  const response = await agent.execute(command, input, context);

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

// GET /api/v1/agents/:id/commands - Get agent commands
router.get('/:id/commands', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const agent = registry.getAgent(id);

  if (!agent) {
    throw new CustomError(`Agent ${id} not found`, 404);
  }

  const commands = agent.getCommands().map(cmdName => ({
    name: cmdName,
    description: agent.getCommandDescription(cmdName),
  }));

  const response: ApiResponse = {
    success: true,
    data: commands,
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/agents/:id/activate - Activate agent
router.post('/:id/activate', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const agent = registry.getAgent(id);

  if (!agent) {
    throw new CustomError(`Agent ${id} not found`, 404);
  }

  agent.activate();

  const response: ApiResponse = {
    success: true,
    data: { message: `Agent ${id} activated successfully` },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

// POST /api/v1/agents/:id/deactivate - Deactivate agent
router.post('/:id/deactivate', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const agent = registry.getAgent(id);

  if (!agent) {
    throw new CustomError(`Agent ${id} not found`, 404);
  }

  agent.deactivate();

  const response: ApiResponse = {
    success: true,
    data: { message: `Agent ${id} deactivated successfully` },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.json(response);
}));

export { router as agentRoutes };
