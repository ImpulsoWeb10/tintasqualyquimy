/**
 * Core type definitions for Xquads AIOS Squads System
 */

export interface AgentConfig {
  id: string;
  name: string;
  title: string;
  icon: string;
  tier: number;
  squad: string;
  subGroup?: string;
  whenToUse: string;
  persona: Persona;
  coreFrameworks: Record<string, Framework>;
  commands: AgentCommand[];
  relationships: AgentRelationships;
}

export interface Persona {
  role: string;
  identity: string;
  style: string;
  focus: string;
  profile: PersonaProfile;
}

export interface PersonaProfile {
  archetype: string;
  realPerson: boolean;
  born?: string;
  communication: {
    tone: string;
    style: string;
    greeting: string;
  };
}

export interface Framework {
  name: string;
  description: string;
  structure?: Record<string, unknown>;
  principles?: string[];
  keyInsight?: string;
}

export interface AgentCommand {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export interface AgentRelationships {
  complementary?: Array<{
    agent: string;
    context: string;
  }>;
  contrasts?: Array<{
    agent: string;
    context: string;
  }>;
}

export interface SquadConfig {
  name: string;
  version: string;
  shortTitle: string;
  description: string;
  author: string;
  license: string;
  slashPrefix: string;
  aios: {
    minVersion: string;
    type: string;
  };
  tags: string[];
  components: {
    agents: string[];
    tasks: string[];
    workflows: string[];
    checklists: string[];
  };
  config: {
    extends: string;
  };
  routingMatrix?: Record<string, RoutingEntry>;
}

export interface RoutingEntry {
  primary: string;
  secondary: string;
  triggers: string[];
}

export interface TaskConfig {
  name: string;
  description: string;
  input: TaskInput;
  output: TaskOutput;
  steps: TaskStep[];
  validation?: ValidationRule[];
}

export interface TaskInput {
  type: string;
  required: string[];
  optional?: string[];
  schema?: Record<string, unknown>;
}

export interface TaskOutput {
  type: string;
  format: string;
  schema?: Record<string, unknown>;
}

export interface TaskStep {
  id: string;
  name: string;
  description: string;
  agent?: string;
  action: string;
  dependencies?: string[];
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
}

export interface WorkflowConfig {
  name: string;
  description: string;
  version: string;
  triggers: WorkflowTrigger[];
  steps: WorkflowStep[];
  errorHandler?: ErrorHandler;
}

export interface WorkflowTrigger {
  type: string;
  condition: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  agent: string;
  task: string;
  input: Record<string, unknown>;
  output?: string;
  next?: string[];
  parallel?: boolean;
}

export interface ErrorHandler {
  retry: number;
  fallback: string;
  notify: string[];
}

export interface SystemConfig {
  server: {
    port: number;
    host: string;
    cors: {
      origin: string[];
      credentials: boolean;
    };
    rateLimit: {
      windowMs: number;
      max: number;
    };
  };
  logging: {
    level: string;
    format: string;
    transports: string[];
  };
  cache: {
    enabled: boolean;
    ttl: number;
    max: number;
  };
  queues: {
    redis: {
      host: string;
      port: number;
      password?: string;
    };
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface AgentRequest {
  agentId: string;
  command: string;
  input: Record<string, unknown>;
  context?: RequestContext;
}

export interface RequestContext {
  userId?: string;
  sessionId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AgentResponse {
  agentId: string;
  command: string;
  output: unknown;
  executionTime: number;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: Record<string, ServiceHealth>;
  uptime: number;
  version: string;
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  lastCheck: string;
  details?: Record<string, unknown>;
}

export interface QueueJob {
  id: string;
  name: string;
  data: Record<string, unknown>;
  opts: {
    attempts?: number;
    delay?: number;
    removeOnComplete?: number;
    removeOnFail?: number;
  };
}

export interface CacheEntry<T = unknown> {
  key: string;
  value: T;
  ttl: number;
  timestamp: number;
}

export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  requestId?: string;
  userId?: string;
  agentId?: string;
  squadId?: string;
}

export interface Metrics {
  requests: {
    total: number;
    success: number;
    error: number;
    averageResponseTime: number;
  };
  agents: {
    total: number;
    active: number;
    averageExecutionTime: number;
  };
  squads: {
    total: number;
    active: number;
  };
  system: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
  };
}
