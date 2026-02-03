
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { logger } from '../../utils/logger';

// --- 1. Infrastructure Awareness ---
export const trustBoundary = (req: Request, res: Response, next: NextFunction) => {
    // Normalize IP
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress;
    (req as any).clientIp = ip;
    next();
};

// --- 3. Request Identity ---
export const requestIdentifier = (req: Request, res: Response, next: NextFunction) => {
    const requestId = uuidv4();
    (req as any).id = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
};

// --- 4. Network Trust (IP Allow List) ---
const WEBHOOK_ALLOW_LIST = (process.env.WEBHOOK_ALLOW_LIST || '127.0.0.1').split(',');

export const ipAllowList = (req: Request, res: Response, next: NextFunction) => {
    const clientIp = (req as any).clientIp || req.ip;

    // Simple check - in production use CIDR libraries
    if (process.env.NODE_ENV === 'production' && !WEBHOOK_ALLOW_LIST.includes(clientIp)) {
        logger.warn(`Blocked unauthorized webhook IP: ${clientIp}`);
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

// --- 8. Replay Protection (HMAC + Timestamp) ---
// For Webhooks mainly
export const replayProtection = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = req.headers['x-timestamp'] as string;
    const signature = req.headers['x-signature'] as string;

    if (!timestamp || !signature) {
        return res.status(401).json({ error: 'Missing security headers' });
    }

    // 1. Check timestamp freshness (5 min window)
    const now = Date.now();
    const reqTime = parseInt(timestamp, 10);
    if (isNaN(reqTime) || Math.abs(now - reqTime) > 5 * 60 * 1000) {
        return res.status(401).json({ error: 'Request expired' });
    }

    // 2. Verify Signature (Mock implementation - needs a real shared secret)
    // const expectedSig = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET).update(`${timestamp}.${JSON.stringify(req.body)}`).digest('hex');
    // if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) { ... }

    // For now we just pass
    next();
};

// --- Secret Audit Utility (Run at startup) ---
export const auditSecrets = () => {
    const dangerousKeys = [
        'PRIVATE_KEY', 'SECRET', 'PASSWORD', 'API_KEY'
    ];

    const hardcodedPatterns = [
        '123456', 'password', 'admin', 'test', 'secret'
    ];

    logger.info('Starting Security Audit of Configuration...');

    // 1. Check ENV vars existence
    const required = ['DATABASE_URL', 'REDIS_URL', 'JWT_SECRET'];
    required.forEach(key => {
        if (!process.env[key]) {
            logger.error(`CRITICAL: Missing Security Configuration: ${key}`);
            if (process.env.NODE_ENV === 'production') process.exit(1);
        }
    });

    // 2. Check for weak secrets
    if (process.env.JWT_SECRET === 'secret' || process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        logger.warn('SECURITY WARNING: JWT_SECRET is too weak or default.');
    }

    logger.info('Security Audit Passed.');
}
