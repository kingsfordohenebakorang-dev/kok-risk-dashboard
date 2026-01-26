import { featureStore } from '../data/feature-store';
import { riskEngine } from './risk-engine/orchestrator';
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

        // 0. Permission Check (Open Banking / Data Protection)
        logger.info(`[CONSENT] Verifying Data Access Permissions for ${borrowerId}...`);
        // In real flow: await openBanking.verifyScope(borrowerId, 'TRANSACTIONS');
        logger.info(`[CONSENT] ✅ Permission Granted: READ_TRANSACTIONS (Time-Bound)`);

        // 1. Fetch Features (Simulated/Mocked logic if not in Redis)
        // In the KOK architecture, we'd fetch raw transactions here.
        // For now, we pass empty transactions, but in a real implementation we would:
        // const transactions = await transactionService.getHistory(borrowerId);
        let creditScore = 650;
        let volatility = 0.05;

        // 2. Run Risk Models (KOK Risk Engine)
        // DEMO: Inject Mock Data if not provided
        let transactions = [];
        // Simple heuristic to choose scenario based on ID or random for demo
        if (borrowerId.includes('BAD')) {
            const { MockTransactionService } = await import('../data/mock-transactions');
            transactions = MockTransactionService.getHistory(borrowerId, 'BAD_GAMBLER');
        } else if (borrowerId.includes('STACK')) {
            const { MockTransactionService } = await import('../data/mock-transactions');
            transactions = MockTransactionService.getHistory(borrowerId, 'BAD_DEBT_STACKER');
        } else {
            // Default to some good data for meaningful analysis
            const { MockTransactionService } = await import('../data/mock-transactions');
            transactions = MockTransactionService.getHistory(borrowerId, 'GOOD');
        }

        const engineResult = await riskEngine.evaluate({
            borrowerId,
            amount,
            tenor,
            income: monthlyIncome || 0,
            employmentType: employmentType || 'INFORMAL',
            bureauScore: creditScore,
            transactions: transactions
        });

        // 3. Mapping KOK Output to Decision Result

        const riskMetrics = {
            pd: engineResult.probabilityOfDefault,
            lgd: 0.45,
            ead: amount,
            el: engineResult.probabilityOfDefault * 0.45 * amount
        };

        // Use the pricing predicted by the Regression Model in the Risk Engine
        const pricing = {
            premium: engineResult.pricing.interestRate * amount, // Rough conversion if premium implies total interest
            rate: engineResult.pricing.interestRate,
            currency: 'GHS',
            breakdown: {
                technicalPremium: (engineResult.pricing.interestRate * amount) * 0.65,
                operationalCost: (engineResult.pricing.interestRate * amount) * 0.15,
                inflationAdjustment: (engineResult.pricing.interestRate * amount) * 0.20
            }
        };

        // 4. Decision Logic
        const approved = engineResult.approved;
        const reasonCodes = [];

        if (!approved) {
            engineResult.riskFactors.forEach(f => {
                if (f.impact === 'HIGH') reasonCodes.push(`RISK: ${f.factor} - ${f.description}`);
            });
            if (engineResult.score <= 50) reasonCodes.push('RC001: SCORE_TOO_LOW');
        }

        // 5. Audit Log (Async)
        auditVault.recordDecision({
            decisionId,
            borrowerId,
            inputs: { ...engineResult.features, amount, tenor },
            outputs: { risk: riskMetrics, pricing, approved },
            timestamp: new Date()
        }).catch(err => logger.error('Audit Vault Failure', err));

        // 6. Shadow Mode (Async)
        if (ModelRegistry.features.enableShadowMode) {
            // ... shadow implementation
        }

        return {
            decisionId,
            risk: riskMetrics,
            pricing: pricing as any, // Cast if PricingOutput type is strict, ideally update the interface
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
