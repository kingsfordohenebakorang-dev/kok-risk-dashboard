import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

// --- 1. RBAC DEFINITIONS ---
export enum UserRole {
    ADMIN = 'ADMIN',       // Can Config System, View Keys
    OFFICER = 'OFFICER',   // Can Approve Loans, View Reports
    VIEWER = 'VIEWER',     // Read Only
    SYSTEM = 'SYSTEM'      // API Bots
}

export interface UserContext {
    id: string;
    role: UserRole;
    orgId: string;
}

// Mock Database of Valid API Keys (In prod, use Redis/DB)
const VALID_API_KEYS: Record<string, UserContext> = {
    'sk_test_mock_KOKRisk29012SecureKey99': { id: 'sys_001', role: UserRole.SYSTEM, orgId: 'org_gh_ecobank' }
};

// --- 2. MIDDLEWARE: AUTHORIZATION & API KEYS ---

/**
 * Validates API Key or JWT Role
 */
export const authorize = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        // A. Check API Key (Machine-to-Machine) (Rule 2)
        const apiKey = req.headers['x-api-key'] as string;
        if (apiKey) {
            const systemUser = VALID_API_KEYS[apiKey];
            if (systemUser) {
                // @ts-ignore
                req.user = systemUser;
                logger.info(`[AUTH] API Access Granted to ${systemUser.orgId}`);
                return next();
            } else {
                logger.warn(`[AUTH] Invalid API Key attempt: ${apiKey.substring(0, 8)}...`);
                return res.status(401).json({ error: 'Invalid API Key' });
            }
        }

        // B. Check JWT User (Human) (Rule 1)
        // @ts-ignore
        const user = req.user as UserContext; // Puppet populated by auth.middleware

        if (!user) {
            return res.status(401).json({ error: 'Authentication Required' });
        }

        if (!allowedRoles.includes(user.role)) {
            logger.warn(`[AUTH] Access Denied. User ${user.id} is ${user.role}, required: ${allowedRoles.join('|')}`);
            return res.status(403).json({ error: 'Insufficient Permissions' });
        }

        next();
    };
};
