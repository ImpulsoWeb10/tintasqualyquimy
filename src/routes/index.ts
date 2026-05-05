/**
 * API Routes
 */

import { Router } from 'express';
import { agentRoutes } from './agents';
import { squadRoutes } from './squads';
import { workflowRoutes } from './workflows';
import { systemRoutes } from './system';

const router = Router();

// Mount route modules
router.use('/agents', agentRoutes);
router.use('/squads', squadRoutes);
router.use('/workflows', workflowRoutes);
router.use('/system', systemRoutes);

// API documentation endpoint
router.get('/docs', (req, res) => {
  res.json({
    name: 'Xquads AIOS Squads API',
    version: '2.0.0',
    description: 'Professional AI agents squads system API',
    endpoints: {
      agents: '/api/v1/agents',
      squads: '/api/v1/squads',
      workflows: '/api/v1/workflows',
      system: '/api/v1/system',
    },
    documentation: 'https://docs.xquads.aios.com',
    repository: 'https://github.com/SynkraAI/xquads-squads',
  });
});

export { router as apiRoutes };
