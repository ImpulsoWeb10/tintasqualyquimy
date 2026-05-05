/**
 * Base Agent interface and implementation
 */

import { v4 as uuidv4 } from 'uuid';
import { AgentConfig, AgentRequest, AgentResponse, RequestContext } from '@/types';
import { loggers } from '@/utils/logger';

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected isActive: boolean = false;
  protected executionCount: number = 0;
  protected lastExecution: Date | null = null;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * Get agent configuration
   */
  public getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Get agent ID
   */
  public getId(): string {
    return this.config.id;
  }

  /**
   * Get agent name
   */
  public getName(): string {
    return this.config.name;
  }

  /**
   * Get agent tier
   */
  public getTier(): number {
    return this.config.tier;
  }

  /**
   * Check if agent is active
   */
  public isAgentActive(): boolean {
    return this.isActive;
  }

  /**
   * Activate agent
   */
  public activate(): void {
    this.isActive = true;
    loggers.agent.execution(this.config.id, 'activate', 0, { status: 'activated' });
  }

  /**
   * Deactivate agent
   */
  public deactivate(): void {
    this.isActive = false;
    loggers.agent.execution(this.config.id, 'deactivate', 0, { status: 'deactivated' });
  }

  /**
   * Get execution statistics
   */
  public getStats(): {
    executionCount: number;
    lastExecution: Date | null;
    isActive: boolean;
  } {
    return {
      executionCount: this.executionCount,
      lastExecution: this.lastExecution,
      isActive: this.isActive,
    };
  }

  /**
   * Execute agent command
   */
  public async execute(
    command: string,
    input: Record<string, unknown>,
    context?: RequestContext
  ): Promise<AgentResponse> {
    if (!this.isActive) {
      throw new Error(`Agent ${this.config.id} is not active`);
    }

    const startTime = Date.now();
    const requestId = context?.sessionId || uuidv4();

    try {
      loggers.agent.execution(this.config.id, command, 0, {
        requestId,
        input: this.sanitizeInput(input),
      });

      // Validate command exists
      const agentCommand = this.config.commands.find(cmd => cmd.name === command);
      if (!agentCommand) {
        throw new Error(`Command '${command}' not found for agent ${this.config.id}`);
      }

      // Validate input
      this.validateInput(command, input);

      // Execute the command
      const output = await this.executeCommand(command, input, context);

      const executionTime = Date.now() - startTime;
      this.updateExecutionStats();

      const response: AgentResponse = {
        agentId: this.config.id,
        command,
        output,
        executionTime,
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
          agentTier: this.config.tier,
        },
      };

      loggers.agent.execution(this.config.id, command, executionTime, {
        requestId,
        status: 'success',
      });

      return response;

    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorObj = error instanceof Error ? error : new Error(String(error));

      loggers.agent.error(this.config.id, errorObj, {
        requestId,
        command,
        executionTime,
      });

      throw errorObj;
    }
  }

  /**
   * Abstract method to be implemented by each agent
   */
  protected abstract executeCommand(
    command: string,
    input: Record<string, unknown>,
    context?: RequestContext
  ): Promise<unknown>;

  /**
   * Validate input for command
   */
  protected validateInput(command: string, input: Record<string, unknown>): void {
    const agentCommand = this.config.commands.find(cmd => cmd.name === command);
    if (!agentCommand?.parameters) {
      return; // No validation required
    }

    // Basic validation - can be extended with Zod schemas
    const requiredParams = Object.entries(agentCommand.parameters)
      .filter(([, config]) => (config as any).required)
      .map(([name]) => name);

    for (const param of requiredParams) {
      if (!(param in input)) {
        throw new Error(`Required parameter '${param}' missing for command '${command}'`);
      }
    }
  }

  /**
   * Sanitize input for logging
   */
  private sanitizeInput(input: Record<string, unknown>): Record<string, unknown> {
    const sanitized = { ...input };
    
    // Remove sensitive data
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
    for (const key of sensitiveKeys) {
      if (key in sanitized) {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Update execution statistics
   */
  private updateExecutionStats(): void {
    this.executionCount++;
    this.lastExecution = new Date();
  }

  /**
   * Get agent greeting
   */
  public getGreeting(): string {
    return this.config.persona.profile.communication.greeting;
  }

  /**
   * Check if agent can handle specific context
   */
  public canHandle(context: string): boolean {
    return this.config.whenToUse.toLowerCase().includes(context.toLowerCase());
  }

  /**
   * Get available commands
   */
  public getCommands(): string[] {
    return this.config.commands.map(cmd => cmd.name);
  }

  /**
   * Get command description
   */
  public getCommandDescription(commandName: string): string | undefined {
    const command = this.config.commands.find(cmd => cmd.name === commandName);
    return command?.description;
  }

  /**
   * Get related agents
   */
  public getRelatedAgents(): {
    complementary: string[];
    contrasts: string[];
  } {
    return {
      complementary: this.config.relationships.complementary?.map(rel => rel.agent) || [],
      contrasts: this.config.relationships.contrasts?.map(rel => rel.agent) || [],
    };
  }

  /**
   * Get agent focus areas
   */
  public getFocusAreas(): string[] {
    return this.config.persona.focus.split(',').map(area => area.trim());
  }

  /**
   * Get agent archetype
   */
  public getArchetype(): string {
    return this.config.persona.profile.archetype;
  }

  /**
   * Check if agent is based on real person
   */
  public isRealPerson(): boolean {
    return this.config.persona.profile.realPerson;
  }

  /**
   * Get agent communication style
   */
  public getCommunicationStyle(): {
    tone: string;
    style: string;
  } {
    return {
      tone: this.config.persona.profile.communication.tone,
      style: this.config.persona.profile.communication.style,
    };
  }
}
