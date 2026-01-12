import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../utils/logger';

// --- 7. STRUCTURED LOGGING & TRACING ---
export const requestTracer = (req: Request, res: Response, next: NextFunction) => {
    // 1. Generate or Capture Request ID
    const requestId = (req.headers['x-request-id'] as string) || uuidv4();

    // 2. Attach to Request Context
    // @ts-ignore
    req.id = requestId;

    // 3. Attach to Response Header (so client can reference it in support tickets)
    res.setHeader('X-Request-ID', requestId);

    logger.info(`[REQ] ${req.method} ${req.url} - ID: ${requestId}`);

    next();
};
