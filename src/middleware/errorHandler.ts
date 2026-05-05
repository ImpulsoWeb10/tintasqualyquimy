/**
 * Global error handling middleware
 */

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';
import { loggers } from '@/utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode = 500, message } = error;

  // Log error
  loggers.request.error(req.headers['x-request-id'] as string, error, statusCode);

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
  }

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorDetails = isDevelopment ? {
    stack: error.stack,
    name: error.name,
    ...error,
  } : undefined;

  const response: ApiResponse = {
    success: false,
    error: {
      code: error.name || 'INTERNAL_ERROR',
      message: isDevelopment ? error.message : message,
      details: errorDetails,
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] as string,
      version: '2.0.0',
    },
  };

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
