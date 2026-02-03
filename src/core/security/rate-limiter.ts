
import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('error', (err) => logger.error('Redis Client Error', err));

interface RateLimitOptions {
    windowMs: number;
    max: number;
    keyPrefix: string;
    message?: string;
}

/**
 * Distributed Rate Limiter using Redis (Fixed Window Counter)
 * 
 * Design Choice:
 * We use Redis to store the request counts because the application is likely to be load-balanced
 * across multiple instances. Local memory limits would reset on deployment and wouldn't sync across nodes.
 * 
 * We use a simple key-value structure with TTL for the window.
 * Automation: INCR key -> if 1, EXPIRE key window.
 */
export const createRateLimiter = (options: RateLimitOptions) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Flexible Key Generation: IP + specific identifiers
            // We favor X-Forwarded-For for load balancers
            const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip;
            const apiKey = (req.headers['x-api-key'] as string) || 'public';
            const tenantId = (req.headers['x-tenant-id'] as string) || 'unknown';

            // Construct a composite key based on the prefix strategy
            // For evaluate: strictly per key + institution
            // For others: maybe just IP
            let key = `ratelimit:${options.keyPrefix}:${ip}`;

            if (options.keyPrefix === 'evaluate') {
                key = `ratelimit:${options.keyPrefix}:${apiKey}:${tenantId}`;
            } else if (options.keyPrefix === 'ingest') {
                key = `ratelimit:${options.keyPrefix}:${tenantId}`;
            }

            const current = await redis.incr(key);

            // If this is the first request, set the expiry
            if (current === 1) {
                await redis.expire(key, Math.ceil(options.windowMs / 1000));
            }

            // Set standard RateLimit headers
            res.setHeader('X-RateLimit-Limit', options.max);
            res.setHeader('X-RateLimit-Remaining', Math.max(0, options.max - current));
            res.setHeader('X-RateLimit-Reset', Date.now() + options.windowMs);

            if (current > options.max) {
                logger.warn(`Rate Limit Exceeded: ${key}`, { ip, path: req.path });

                // Extra Credit: Risk Intelligence
                // If they exceed by 2x, flag as an anomaly
                if (current > options.max * 2) {
                    await redis.publish('risk-events', JSON.stringify({
                        type: 'VELOCITY_ANOMALY',
                        source: ip,
                        endpoint: options.keyPrefix,
                        timestamp: new Date()
                    }));
                }

                return res.status(429).json({
                    error: 'Too Many Requests',
                    message: options.message || 'Rate limit exceeded, please retry later.',
                    retryAfter: Math.ceil(options.windowMs / 1000)
                });
            }

            next();
        } catch (error) {
            logger.error('Rate Limiter Error', error);
            // Fail open principle for infrastructure issues, or fail closed?
            // For a risk engine, maybe fail closed if strict, but let's fail open to keep business running
            next();
        }
    };
};


// Specific Limiters

export const evaluateLimiter = createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 reqs per minute per API Key
    keyPrefix: 'evaluate',
    message: 'Evaluation quota exceeded. Please optimize your batch size.'
});

export const ingestLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 1000, // High volume for ingestion
    keyPrefix: 'ingest',
    message: 'Ingestion pipeline saturated.'
});

export const complianceLimiter = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Strict compliance reporting limit
    keyPrefix: 'compliance',
    message: 'Compliance report generation limit reached.'
});

export const authLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 5, // 5 attempts
    keyPrefix: 'auth',
    message: 'Too many auth attempts'
});

// Anomaly Detection for "Velocity" - rapid checks on same borrower
// This is a custom check, not just standard rate limiting
export const velocityCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const borrowerId = req.body.borrower_id || req.body.national_id;
        if (!borrowerId) return next();

        const key = `velocity:borrower:${borrowerId}`;
        const count = await redis.incr(key);

        if (count === 1) {
            await redis.expire(key, 300); // 5 minute window
        }

        if (count > 10) { // More than 10 checks on same person in 5 mins is suspicious
            logger.warn('Velocity Anomaly Detected', { borrowerId });
            // Shadow mode: don't block, but tag execution
            (req as any).riskSignals = (req as any).riskSignals || [];
            (req as any).riskSignals.push('VELOCITY_HIGH_BORROWER');
        }

        next();
    } catch (e) {
        next();
    }
}
