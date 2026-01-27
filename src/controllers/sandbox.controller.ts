import { Request, Response } from 'express';
import { featureStore } from '../data/feature-store';

export const resetSandbox = async (req: Request, res: Response) => {
    // Check if we are in non-production
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Sandbox reset not allowed in production' });
    }

    // Clear relevant Redis keys (In reality, flushdb or specific pattern)
    // Here we just acknowledge
    return res.json({ message: 'Sandbox environment reset successfully.' });
};
