import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // 1. Generate Request ID
    const requestId = (req.headers['x-request-id'] as string) || uuidv4();
    (req as any).id = requestId;
    res.setHeader('X-Request-ID', requestId);

    // 2. Log Request Start
    logger.info(`Incoming Request: ${req.method} ${req.url}`, {
        requestId,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent')
    });

    // 3. Capture Response Finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        const level = res.statusCode >= 400 ? 'warn' : 'info'; // Warn on 4xx/5xx

        logger.log(level, `Request Completed: ${res.statusCode}`, {
            requestId,
            method: req.method,
            url: req.url,
            status: res.statusCode,
            durationMs: duration,
        });
    });

    next();
};
