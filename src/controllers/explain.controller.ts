import { Request, Response } from 'express';
import { prisma } from '../data/db';
import { logger } from '../utils/logger';

export const explainDecision = async (req: Request, res: Response) => {
    const { decision_id } = req.query;

    if (!decision_id || typeof decision_id !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid decision_id' });
    }

    try {
        const decision = await prisma.auditLog.findUnique({
            where: { decisionId: decision_id }
        });

        if (!decision) {
            return res.status(404).json({ error: 'Decision not found in Audit Vault' });
        }

        const outputs = decision.outputs as any;
        const inputs = decision.inputs as any;

        return res.json({
            decision_id: decision.decisionId,
            timestamp: decision.timestamp.toISOString(),
            model_version: decision.modelVersion,
            outcome: outputs.approved ? 'APPROVED' : 'REJECTED',
            risk: outputs.risk,
            pricing: outputs.pricing,
            explanation: !outputs.approved && outputs.risk.reasonCodes
                ? `Rejected due to: ${outputs.risk.reasonCodes.join(', ')}`
                : 'Approved based on standard risk criteria.',
            audit_trail: {
                input_snapshot: inputs,
                environment: decision.environment
            }
        });
    } catch (error) {
        logger.error('Explain Error', error);
        return res.status(500).json({ error: 'Failed to retrieve explanation' });
    }
};
