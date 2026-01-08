import { prisma } from '../data/db';
import { blockchainService } from './blockchain.service';
import { logger } from '../utils/logger';

export class ParametricEngine {
    /**
     * Evaluates if a policy needs an automatic payout based on new external data.
     * @param borrowerId 
     * @param daysPastDue 
     */
    async checkTrigger(borrowerId: string, daysPastDue: number) {
        logger.info(`Parametric Engine: Evaluating trigger for ${borrowerId} (DPD: ${daysPastDue})`);

        // 1. Definition of "Default Event"
        const TRIGGER_THRESHOLD_DAYS = 30;

        if (daysPastDue > TRIGGER_THRESHOLD_DAYS) {
            // 2. Fetch Active Policy
            // In a real app, query a Policy table. Here we mock it.
            const policyId = `pol_${borrowerId}_${new Date().getFullYear()}`;

            // 3. Trigger Blockchain Payout
            try {
                const txHash = await blockchainService.triggerPayout({
                    policyId,
                    condition: 'DEFAULT_EVENT',
                    evidence: `sha256:repayment_missed_${daysPastDue}_days`
                });

                // 4. Log the Compliance Event
                await this.logPayoutEvent(borrowerId, policyId, txHash);

                return { triggered: true, txHash };
            } catch (error) {
                logger.error('Parametric Payout Failed', error);
                throw error;
            }
        }

        return { triggered: false, message: 'Threshold not met' };
    }

    private async logPayoutEvent(borrowerId: string, policyId: string, txHash: string) {
        // Audit log persist
        await prisma.auditLog.create({
            data: {
                decisionId: `claim_${Date.now()}`,
                borrowerId,
                timestamp: new Date(),
                inputs: { triggerType: 'PARAMETRIC_DEFAULT' },
                outputs: { payout: true, txHash, policyId },
                modelVersion: 'oracle-v1',
                environment: process.env.NODE_ENV || 'production'
            }
        });
    }
}

export const parametricEngine = new ParametricEngine();
