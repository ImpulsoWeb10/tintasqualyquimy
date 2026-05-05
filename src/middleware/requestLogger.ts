/**
 * Request logging middleware
 */

import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { loggers } from '@/utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Generate unique request ID
  const requestId = req.headers['x-request-id'] as string || uuidv4();
  req.headers['x-request-id'] = requestId;

  // Log request start
  loggers.request.start(req.method, req.url, requestId, req.headers['user-id'] as string);

  // Capture response
  const originalSend = res.send;
  let startTime = Date.now();

  res.send = function (body) {
    const responseTime = Date.now() - startTime;
    loggers.request.complete(requestId, res.statusCode, responseTime);
    return originalSend.call(this, body);
  };

  // Handle response finish
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    loggers.request.complete(requestId, res.statusCode, responseTime);
  });

  next();
};
