import { riskEngineService } from '../src/services/riskEngine';
import { riskEngine } from '../src/core/risk-engine/orchestrator';
import { auditVault } from '../src/data/audit-vault';
import { logger } from '../src/utils/logger';

// Mock dependencies
jest.mock('../src/core/risk-engine/orchestrator', () => ({
    riskEngine: {
        evaluate: jest.fn()
    }
}));

jest.mock('../src/data/audit-vault', () => ({
    auditVault: {
        recordDecision: jest.fn().mockResolvedValue(true)
    }
}));

jest.mock('../src/utils/logger');

describe('RiskEngineService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should approve a low-risk borrower', async () => {
        // Mock RiskEngine response
        (riskEngine.evaluate as jest.Mock).mockResolvedValue({
            decisionId: 'mock-decision-id',
            approved: true,
            score: 85,
            grade: 'A',
            probabilityOfDefault: 0.05,
            pricing: {
                interestRate: 0.12,
                maxLoanAmount: 5000,
                currency: 'GHS'
            },
            riskFactors: [],
            features: {
                zeroBalanceDays: 0,
                debtStackingDetected: false,
                gamblingVelocity: 0
            },
            timestamp: new Date()
        });

        const result = await riskEngineService.evaluate('user-123', 1000, 30, 5000, 'SALARIED');

        expect(result.approved).toBe(true);
        expect(result.risk.pd).toBe(0.05);

        // tech premium = 120 * 0.65 = 78
        // ops cost = 120 * 0.15 = 18
        // inflation = 120 * 0.20 = 24
        // total = 120
        expect(result.pricing.premium).toBeCloseTo(120);
        expect(result.reasonCodes).toHaveLength(0);

        expect(auditVault.recordDecision).toHaveBeenCalledTimes(1);
    });

    test('should reject a high-risk borrower', async () => {
        // Mock RiskEngine response
        (riskEngine.evaluate as jest.Mock).mockResolvedValue({
            decisionId: 'mock-decision-id-2',
            approved: false,
            score: 45,
            grade: 'F',
            probabilityOfDefault: 0.40,
            pricing: {
                interestRate: 0.35,
                maxLoanAmount: 0,
                currency: 'GHS'
            },
            riskFactors: [
                { factor: 'LIQUIDITY_STRESS', impact: 'HIGH', description: 'Frequent zero-balance days.' }
            ],
            features: {
                zeroBalanceDays: 10,
                debtStackingDetected: false,
                gamblingVelocity: 0
            },
            timestamp: new Date()
        });

        const result = await riskEngineService.evaluate('user-bad', 1000, 30, 1000, 'INFORMAL');

        expect(result.approved).toBe(false);
        expect(result.reasonCodes).toContain('RISK: LIQUIDITY_STRESS - Frequent zero-balance days.');
        expect(result.reasonCodes).toContain('RC001: SCORE_TOO_LOW');

        expect(auditVault.recordDecision).toHaveBeenCalledTimes(1);
    });

    test('should handle audit vault failures explicitly without crashing', async () => {
        // Mock RiskEngine response
        (riskEngine.evaluate as jest.Mock).mockResolvedValue({
            decisionId: 'mock-decision-id',
            approved: true,
            score: 85,
            grade: 'A',
            probabilityOfDefault: 0.05,
            pricing: {
                interestRate: 0.12,
                maxLoanAmount: 5000,
                currency: 'GHS'
            },
            riskFactors: [],
            features: {},
            timestamp: new Date()
        });

        (auditVault.recordDecision as jest.Mock).mockRejectedValue(new Error('DB Connection Failed'));

        const result = await riskEngineService.evaluate('user-123', 1000, 30);

        // Should still return result even if audit fails
        expect(result.approved).toBe(true);
        // Logger should be called with error
        expect(logger.error).toHaveBeenCalledWith('Audit Vault Failure', expect.any(Error));
    });
});
