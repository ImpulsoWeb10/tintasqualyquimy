/**
 * Central registry for managing agents and squads
 */

import { BaseAgent } from './Agent';
import { Squad } from './Squad';
import { AgentConfig, SquadConfig, AgentRequest, AgentResponse } from '@/types';
import { loggers } from '@/utils/logger';

export class AgentRegistry {
  private static instance: AgentRegistry;
  private agents: Map<string, BaseAgent> = new Map();
  private squads: Map<string, Squad> = new Map();
  private isInitialized: boolean = false;

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  /**
   * Register agent
   */
  public registerAgent(agent: BaseAgent): void {
    const agentId = agent.getId();
    
    if (this.agents.has(agentId)) {
      loggers.warn(`Agent ${agentId} already registered, updating...`);
    }

    this.agents.set(agentId, agent);
    loggers.info(`Agent ${agentId} registered successfully`, {
      name: agent.getName(),
      tier: agent.getTier(),
      squad: agent.getConfig().squad,
    });
  }

  /**
   * Register squad
   */
  public registerSquad(squad: Squad): void {
    const squadId = squad.getId();

    if (this.squads.has(squadId)) {
      loggers.warn(`Squad ${squadId} already registered, updating...`);
    }

    this.squads.set(squadId, squad);
    loggers.info(`Squad ${squadId} registered successfully`, {
      name: squad.getName(),
      agents: squad.getStats().totalAgents,
    });
  }

  /**
   * Get agent by ID
   */
  public getAgent(agentId: string): BaseAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get squad by ID
   */
  public getSquad(squadId: string): Squad | undefined {
    return this.squads.get(squadId);
  }

  /**
   * Get all agents
   */
  public getAllAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get all squads
   */
  public getAllSquads(): Squad[] {
    return Array.from(this.squads.values());
  }

  /**
   * Get agents by squad
   */
  public getAgentsBySquad(squadId: string): BaseAgent[] {
    const squad = this.getSquad(squadId);
    return squad ? squad.getAgents() : [];
  }

  /**
   * Get agents by tier
   */
  public getAgentsByTier(tier: number): BaseAgent[] {
    return this.getAllAgents().filter(agent => agent.getTier() === tier);
  }

  /**
   * Search agents by focus area
   */
  public searchAgentsByFocus(query: string): BaseAgent[] {
    const queryLower = query.toLowerCase();
    return this.getAllAgents().filter(agent =>
      agent.getFocusAreas().some(area =>
        area.toLowerCase().includes(queryLower)
      )
    );
  }

  /**
   * Search squads by tags
   */
  public searchSquadsByTag(tag: string): Squad[] {
    return this.getAllSquads().filter(squad => squad.hasTag(tag));
  }

  /**
   * Execute agent command
   */
  public async executeAgentCommand(request: AgentRequest): Promise<AgentResponse> {
    const agent = this.getAgent(request.agentId);
    if (!agent) {
      throw new Error(`Agent ${request.agentId} not found`);
    }

    return agent.execute(request.command, request.input, request.context);
  }

  /**
   * Route request to best agent/squad
   */
  public async routeRequest(request: {
    command: string;
    input: Record<string, unknown>;
    squadId?: string;
    context?: RequestContext;
  }): Promise<AgentResponse> {
    if (request.squadId) {
      const squad = this.getSquad(request.squadId);
      if (!squad) {
        throw new Error(`Squad ${request.squadId} not found`);
      }

      return squad.routeRequest({
        agentId: '', // Will be determined by squad routing
        command: request.command,
        input: request.input,
        context: request.context,
      });
    }

    // Find best agent across all squads
    const capableAgents = this.getAllAgents().filter(agent =>
      agent.canHandle(request.command) && agent.isAgentActive()
    );

    if (capableAgents.length === 0) {
      throw new Error(`No active agent can handle command: ${request.command}`);
    }

    // Prefer higher tier agents
    capableAgents.sort((a, b) => b.getTier() - a.getTier());
    const bestAgent = capableAgents[0];

    return bestAgent.execute(request.command, request.input, request.context);
  }

  /**
   * Activate all agents and squads
   */
  public async activateAll(): Promise<void> {
    loggers.system.startup();

    // Activate squads first
    for (const squad of this.getAllSquads()) {
      squad.activate();
    }

    // Then activate agents
    for (const agent of this.getAllAgents()) {
      agent.activate();
    }

    this.isInitialized = true;
    loggers.info('All agents and squads activated', {
      totalAgents: this.getAllAgents().length,
      totalSquads: this.getAllSquads().length,
    });
  }

  /**
   * Deactivate all agents and squads
   */
  public async deactivateAll(): Promise<void> {
    loggers.system.shutdown();

    // Deactivate agents first
    for (const agent of this.getAllAgents()) {
      agent.deactivate();
    }

    // Then deactivate squads
    for (const squad of this.getAllSquads()) {
      squad.deactivate();
    }

    this.isInitialized = false;
  }

  /**
   * Get registry statistics
   */
  public getStats(): {
    totalAgents: number;
    totalSquads: number;
    activeAgents: number;
    activeSquads: number;
    agentsByTier: Record<number, number>;
    isInitialized: boolean;
  } {
    const agents = this.getAllAgents();
    const squads = this.getAllSquads();
    const activeAgents = agents.filter(agent => agent.isAgentActive());
    const activeSquads = squads.filter(squad => squad.isSquadActive());

    const agentsByTier = agents.reduce((acc, agent) => {
      acc[agent.getTier()] = (acc[agent.getTier()] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalAgents: agents.length,
      totalSquads: squads.length,
      activeAgents: activeAgents.length,
      activeSquads: activeSquads.length,
      agentsByTier,
      isInitialized: this.isInitialized,
    };
  }

  /**
   * Validate registry integrity
   */
  public validate(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check agents
    for (const agent of this.getAllAgents()) {
      const config = agent.getConfig();
      
      // Validate squad exists
      if (!this.squads.has(config.squad)) {
        warnings.push(`Agent ${agent.getId()} references non-existent squad: ${config.squad}`);
      }

      // Validate commands
      if (config.commands.length === 0) {
        warnings.push(`Agent ${agent.getId()} has no commands defined`);
      }
    }

    // Check squads
    for (const squad of this.getAllSquads()) {
      const squadConfig = squad.getConfig();
      
      // Validate required agents
      const requiredAgents = squadConfig.components.agents;
      const availableAgents = squad.getAgents().map(a => a.getId());
      
      const missingAgents = requiredAgents.filter(id => !availableAgents.includes(id));
      if (missingAgents.length > 0) {
        errors.push(`Squad ${squad.getId()} missing required agents: ${missingAgents.join(', ')}`);
      }

      // Validate squad configuration
      if (!squad.validate()) {
        errors.push(`Squad ${squad.getId()} configuration validation failed`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Clear registry (for testing)
   */
  public clear(): void {
    this.agents.clear();
    this.squads.clear();
    this.isInitialized = false;
  }

  /**
   * Export registry state
   */
  public export(): {
    agents: Array<{ id: string; config: AgentConfig; stats: unknown }>;
    squads: Array<{ id: string; config: SquadConfig; stats: unknown }>;
    timestamp: string;
  } {
    return {
      agents: this.getAllAgents().map(agent => ({
        id: agent.getId(),
        config: agent.getConfig(),
        stats: agent.getStats(),
      })),
      squads: this.getAllSquads().map(squad => ({
        id: squad.getId(),
        config: squad.getConfig(),
        stats: squad.getStats(),
      })),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Import registry state
   */
  public async import(state: {
    agents: Array<{ id: string; config: AgentConfig }>;
    squads: Array<{ id: string; config: SquadConfig }>;
  }): Promise<void> {
    // This would need to be implemented based on agent/squad creation
    // For now, just log the import attempt
    loggers.info('Registry import requested', {
      agentCount: state.agents.length,
      squadCount: state.squads.length,
    });
  }
}
