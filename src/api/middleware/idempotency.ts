import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

// In-Memory Cache for Demo (Use Redis in Production)
const IDEMPOTENCY_CACHE = new Map<string, any>();

// --- 8. IDEMPOTENCY KEYS ---
export const checkIdempotency = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers['idempotency-key'] as string;

    if (!key) return next();

    // Check if key exists
    if (IDEMPOTENCY_CACHE.has(key)) {
        logger.info(`[IDEMPOTENCY] Replaying cached response for Key: ${key}`);
        const cached = IDEMPOTENCY_CACHE.get(key);
        return res.status(cached.status).json(cached.body);
    }

    // Intercept Response.send to cache the result for next time
    const originalSend = res.json;
    // @ts-ignore
    res.json = (body) => {
        IDEMPOTENCY_CACHE.set(key, {
            status: res.statusCode,
            body: body
        });
        return originalSend.call(res, body);
    };

    next();
};
