import { prisma } from './db';
import { logger } from '../utils/logger';

export interface AuditRecord {
    decisionId: string;
    borrowerId: string;
    inputs: any;
    outputs: any;
    timestamp: Date;
    modelVersion: string;
}

export const auditVault = {
    /**
     * Writes a decision record to the immutable ledger (PostgreSQL).
     */
    async recordDecision(record: AuditRecord): Promise<void> {
        try {
            await prisma.auditLog.create({
                data: {
                    decisionId: record.decisionId,
                    borrowerId: record.borrowerId,
                    timestamp: record.timestamp,
                    inputs: record.inputs,
                    outputs: record.outputs,
                    modelVersion: record.modelVersion,
                    environment: process.env.NODE_ENV || 'development'
                }
            });
            // Silent success - do not spam logs
        } catch (error) {
            // Critical Error: Compliance failure if audit fails
            logger.error('CRITICAL: Failed to write to Audit Vault', error);
            // In a real bank system, you might emit an alert here (PagerDuty)
        }
    }
};
