import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Allow API Key for legacy/service-to-service calls
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === config.API_KEY) {
        return next();
    }

    // Check for Bearer Token (User Login)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Missing Bearer Token or API Key' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid Token' });
    }
};
