/**
 * Request validation middleware
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomError } from './errorHandler';

// Agent request validation schema
const agentRequestSchema = z.object({
  command: z.string().min(1, 'Command is required'),
  input: z.record(z.unknown()),
  context: z.object({
    userId: z.string().optional(),
    sessionId: z.string(),
    timestamp: z.string(),
    metadata: z.record(z.unknown()).optional(),
  }).optional(),
});

export const validateAgentRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    agentRequestSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      throw new CustomError(`Validation failed: ${errorMessages.join(', ')}`, 400);
    }
    next(error);
  }
};

// Squad request validation schema
const squadRequestSchema = z.object({
  command: z.string().min(1, 'Command is required'),
  input: z.record(z.unknown()),
  context: z.object({
    userId: z.string().optional(),
    sessionId: z.string(),
    timestamp: z.string(),
    metadata: z.record(z.unknown()).optional(),
  }).optional(),
});

export const validateSquadRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    squadRequestSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      throw new CustomError(`Validation failed: ${errorMessages.join(', ')}`, 400);
    }
    next(error);
  }
};

// Workflow execution validation schema
const workflowExecutionSchema = z.object({
  input: z.record(z.unknown()),
  context: z.object({
    userId: z.string().optional(),
    sessionId: z.string(),
    timestamp: z.string(),
    metadata: z.record(z.unknown()).optional(),
  }).optional(),
});

export const validateWorkflowExecution = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    workflowExecutionSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);
      throw new CustomError(`Validation failed: ${errorMessages.join(', ')}`, 400);
    }
    next(error);
  }
};
