/**
 * Squad management system
 */

import { BaseAgent } from './Agent';
import { SquadConfig, AgentRequest, AgentResponse, WorkflowConfig } from '@/types';
import { loggers } from '@/utils/logger';

export class Squad {
  private config: SquadConfig;
  private agents: Map<string, BaseAgent> = new Map();
  private isActive: boolean = false;
  private workflows: Map<string, WorkflowConfig> = new Map();

  constructor(config: SquadConfig) {
    this.config = config;
  }

  /**
   * Get squad configuration
   */
  public getConfig(): SquadConfig {
    return { ...this.config };
  }

  /**
   * Get squad ID
   */
  public getId(): string {
    return this.config.name;
  }

  /**
   * Get squad name
   */
  public getName(): string {
    return this.config.shortTitle;
  }

  /**
   * Add agent to squad
   */
  public addAgent(agent: BaseAgent): void {
    if (agent.getTier() > 3) {
      throw new Error(`Agent tier ${agent.getTier()} too high for squad ${this.getId()}`);
    }

    this.agents.set(agent.getId(), agent);
    loggers.squad.activation(this.getId(), [agent.getId()], { action: 'agent_added' });
  }

  /**
   * Remove agent from squad
   */
  public removeAgent(agentId: string): boolean {
    const removed = this.agents.delete(agentId);
    if (removed) {
      loggers.squad.activation(this.getId(), [agentId], { action: 'agent_removed' });
    }
    return removed;
  }

  /**
   * Get agent by ID
   */
  public getAgent(agentId: string): BaseAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all agents in squad
   */
  public getAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get agents by tier
   */
  public getAgentsByTier(tier: number): BaseAgent[] {
    return this.getAgents().filter(agent => agent.getTier() === tier);
  }

  /**
   * Get agents by focus area
   */
  public getAgentsByFocus(focus: string): BaseAgent[] {
    return this.getAgents().filter(agent => 
      agent.getFocusAreas().some(area => 
        area.toLowerCase().includes(focus.toLowerCase())
      )
    );
  }

  /**
   * Activate squad
   */
  public activate(): void {
    this.isActive = true;
    this.agents.forEach(agent => agent.activate());
    loggers.squad.activation(this.getId(), this.getAgentIds(), { status: 'activated' });
  }

  /**
   * Deactivate squad
   */
  public deactivate(): void {
    this.isActive = false;
    this.agents.forEach(agent => agent.deactivate());
    loggers.squad.activation(this.getId(), this.getAgentIds(), { status: 'deactivated' });
  }

  /**
   * Check if squad is active
   */
  public isSquadActive(): boolean {
    return this.isActive;
  }

  /**
   * Get squad statistics
   */
  public getStats(): {
    totalAgents: number;
    activeAgents: number;
    agentsByTier: Record<number, number>;
    isActive: boolean;
  } {
    const agents = this.getAgents();
    const activeAgents = agents.filter(agent => agent.isAgentActive());
    const agentsByTier = agents.reduce((acc, agent) => {
      acc[agent.getTier()] = (acc[agent.getTier()] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalAgents: agents.length,
      activeAgents: activeAgents.length,
      agentsByTier,
      isActive: this.isActive,
    };
  }

  /**
   * Route request to appropriate agent based on context
   */
  public async routeRequest(request: AgentRequest): Promise<AgentResponse> {
    if (!this.isActive) {
      throw new Error(`Squad ${this.getId()} is not active`);
    }

    const agentId = this.findBestAgent(request.command, request.input);
    const agent = this.getAgent(agentId);

    if (!agent) {
      throw new Error(`No suitable agent found for command: ${request.command}`);
    }

    return agent.execute(request.command, request.input, request.context);
  }

  /**
   * Find best agent for command based on routing matrix
   */
  private findBestAgent(command: string, input: Record<string, unknown>): string {
    if (!this.config.routingMatrix) {
      // Fallback to first available agent
      const agents = this.getAgents();
      if (agents.length === 0) {
        throw new Error('No agents available in squad');
      }
      return agents[0].getId();
    }

    // Search routing matrix for matching triggers
    for (const [context, routing] of Object.entries(this.config.routingMatrix)) {
      const triggers = routing.triggers.map(trigger => trigger.toLowerCase());
      const commandLower = command.toLowerCase();
      const inputLower = JSON.stringify(input).toLowerCase();

      if (triggers.some(trigger => 
        commandLower.includes(trigger) || inputLower.includes(trigger)
      )) {
        const primaryAgent = this.getAgent(routing.primary);
        if (primaryAgent && primaryAgent.isAgentActive()) {
          return routing.primary;
        }

        const secondaryAgent = this.getAgent(routing.secondary);
        if (secondaryAgent && secondaryAgent.isAgentActive()) {
          return routing.secondary;
        }
      }
    }

    // Fallback to agent that can handle the context
    const capableAgents = this.getAgents().filter(agent => 
      agent.canHandle(command)
    );

    if (capableAgents.length > 0) {
      return capableAgents[0].getId();
    }

    // Final fallback
    const agents = this.getAgents();
    if (agents.length === 0) {
      throw new Error('No agents available in squad');
    }
    return agents[0].getId();
  }

  /**
   * Add workflow to squad
   */
  public addWorkflow(workflow: WorkflowConfig): void {
    this.workflows.set(workflow.name, workflow);
  }

  /**
   * Get workflow by name
   */
  public getWorkflow(name: string): WorkflowConfig | undefined {
    return this.workflows.get(name);
  }

  /**
   * Get all workflows
   */
  public getWorkflows(): WorkflowConfig[] {
    return Array.from(this.workflows.values());
  }

  /**
   * Execute workflow
   */
  public async executeWorkflow(
    workflowName: string,
    input: Record<string, unknown>,
    context?: RequestContext
  ): Promise<Record<string, unknown>> {
    const workflow = this.getWorkflow(workflowName);
    if (!workflow) {
      throw new Error(`Workflow '${workflowName}' not found`);
    }

    const startTime = Date.now();
    loggers.squad.workflow.start(workflowName, this.getId(), { input });

    try {
      const results = await this.executeWorkflowSteps(workflow, input, context);
      const duration = Date.now() - startTime;

      loggers.squad.workflow.complete(workflowName, duration, { results });
      return results;

    } catch (error) {
      const duration = Date.now() - startTime;
      const errorObj = error instanceof Error ? error : new Error(String(error));

      loggers.squad.workflow.error(workflowName, errorObj, { duration });
      throw errorObj;
    }
  }

  /**
   * Execute workflow steps
   */
  private async executeWorkflowSteps(
    workflow: WorkflowConfig,
    input: Record<string, unknown>,
    context?: RequestContext
  ): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};
    const contextData = { ...input };

    for (const step of workflow.steps) {
      const agent = this.getAgent(step.agent);
      if (!agent) {
        throw new Error(`Agent '${step.agent}' not found for step '${step.id}'`);
      }

      const stepInput = { ...step.input, ...contextData };
      const response = await agent.execute(step.task, stepInput, context);

      if (step.output) {
        results[step.output] = response.output;
        contextData[step.output] = response.output;
      }

      // Handle parallel execution
      if (step.parallel && step.next) {
        const parallelPromises = step.next.map(async (nextStepId) => {
          const nextStep = workflow.steps.find(s => s.id === nextStepId);
          if (!nextStep) {
            throw new Error(`Parallel step '${nextStepId}' not found`);
          }

          const nextAgent = this.getAgent(nextStep.agent);
          if (!nextAgent) {
            throw new Error(`Agent '${nextStep.agent}' not found for parallel step`);
          }

          return nextAgent.execute(nextStep.task, { ...nextStep.input, ...contextData }, context);
        });

        const parallelResults = await Promise.all(parallelPromises);
        parallelResults.forEach((result, index) => {
          if (step.next && step.next[index]) {
            results[step.next[index]] = result.output;
          }
        });
      }
    }

    return results;
  }

  /**
   * Get agent IDs
   */
  private getAgentIds(): string[] {
    return this.getAgents().map(agent => agent.getId());
  }

  /**
   * Get squad tags
   */
  public getTags(): string[] {
    return [...this.config.tags];
  }

  /**
   * Check if squad has specific tag
   */
  public hasTag(tag: string): boolean {
    return this.config.tags.includes(tag);
  }

  /**
   * Get squad description
   */
  public getDescription(): string {
    return this.config.description;
  }

  /**
   * Get squad version
   */
  public getVersion(): string {
    return this.config.version;
  }

  /**
   * Get squad author
   */
  public getAuthor(): string {
    return this.config.author;
  }

  /**
   * Validate squad configuration
   */
  public validate(): boolean {
    const requiredAgents = this.config.components.agents;
    const availableAgents = this.getAgentIds();

    const missingAgents = requiredAgents.filter(id => !availableAgents.includes(id));
    if (missingAgents.length > 0) {
      loggers.squad.activation(this.getId(), missingAgents, { 
        status: 'validation_error',
        missing: 'agents'
      });
      return false;
    }

    return true;
  }
}
