import { featureStore } from '../data/feature-store';
import { auditVault } from '../data/audit-vault';
import { calculateExpectedLoss, RiskInput, RiskOutput } from './risk-models';
import { ModelRegistry } from '../config/registry';
import { calculatePremium, PricingOutput } from './pricing';
import { logger } from '../utils/logger';
import crypto from 'crypto';

interface EvaluationResult {
    decisionId: string;
    risk: RiskOutput;
    pricing: PricingOutput;
    approved: boolean;
    reasonCodes: string[];
}

export class DecisionEngine {
    async evaluate(
        borrowerId: string,
        amount: number,
        tenor: number,
        monthlyIncome?: number,
        employmentType?: 'SALARIED' | 'GIG' | 'SME' | 'INFORMAL'
    ): Promise<EvaluationResult> {
        const decisionId = crypto.randomUUID();
        logger.info(`Starting evaluation for ${borrowerId}`, { decisionId });

        // 1. Fetch Features (Simulated/Mocked logic if not in Redis)
        let creditScore = 650; // Default fallback
        let volatility = 0.05;

        const cachedFeatures = await featureStore.get(`borrower:${borrowerId}`);
        if (cachedFeatures) {
            const data = JSON.parse(cachedFeatures);
            creditScore = data.creditScore;
            volatility = data.inflowVolatility;
        }

        // 2. Run Risk Models
        const riskInput: RiskInput = {
            creditScore,
            inflowVolatility: volatility,
            loanAmount: amount,
            tenor,
            monthlyIncome,
            employmentType
        };

        const riskMetrics = calculateExpectedLoss(riskInput);

        // 3. Pricing
        const pricing = calculatePremium({
            expectedLoss: riskMetrics.el,
            loanAmount: amount,
            currency: 'GHS',
        });

        // 4. Decision Logic (Thresholds)
        const approved = riskMetrics.pd < 0.20; // Reject if PD > 20%
        const reasonCodes = [];
        if (!approved) reasonCodes.push('RC001: PROBABILITY_OF_DEFAULT_TOO_HIGH');

        // 5. Audit Log (Async)
        // We fire and forget the audit log to ensure low latency on the response
        auditVault.recordDecision({
            decisionId,
            borrowerId,
            inputs: riskInput,
            outputs: { risk: riskMetrics, pricing, approved },
            timestamp: new Date()
        }).catch(err => logger.error('Audit Vault Failure', err));

        // 6. Shadow Mode (Async)
        if (ModelRegistry.features.enableShadowMode) {
            this.runShadowEvaluation(borrowerId, amount, tenor, riskInput).catch(err =>
                logger.error('Shadow Mode Failure', err)
            );
        }

        return {
            decisionId,
            risk: riskMetrics,
            pricing,
            approved,
            reasonCodes,
        };
    }

    /**
     * Runs the "Challenger" model in the background to compare performance.
     * This does NOT affect the customer's decision.
     */
    private async runShadowEvaluation(borrowerId: string, amount: number, tenor: number, input: RiskInput) {
        // In a real scenario, this would load a different set of rules/models
        // For demo, we simulate a slightly more aggressive model (v1.1)

        // Simulate v1.1 Logic: Lower risk loading
        const shadowRisk = { ...input }; // Deep clone if needed
        const shadowMetrics = calculateExpectedLoss(shadowRisk);

        // Different pricing logic for shadow model
        const shadowPricing = calculatePremium({
            expectedLoss: shadowMetrics.el,
            loanAmount: amount,
            currency: 'GHS',
        });

        logger.info('Shadow Mode Comparison', {
            model: ModelRegistry.shadowModelId,
            originalPremium: calculatePremium({ expectedLoss: shadowMetrics.el, loanAmount: amount, currency: 'GHS' }).premium,
            shadowPremium: shadowPricing.premium
        });
    }
}

export const decisionEngine = new DecisionEngine();
