
import { RiskFeatures, DecisionPacket } from '../types';

/**
 * Interface for the Machine Learning Model Stack.
 * In a real deployment, this would likely wrap gRPC or HTTP calls to a Python service serving XGBoost/LSTM models.
 * Here, we implement the logic based on the user's "Behavioral Scoring Matrix" description.
 */
export class ModelInferenceModule {

    /**
     * The Classifier (XGBoost Proxy)
     * Returns Probability of Default (PD) -> 0..1
     */
    async predictProbabilityOfDefault(features: RiskFeatures): Promise<number> {
        // Heuristic fallback mimicking an ML model's weights

        let score = 0; // Log-odds or raw score

        // 1. Liquidity & Stability (Higher is better, so we subtract from risk)
        // MDB / Volatility
        // High volatility increases risk
        score += (features.balanceVolatility * 0.1);

        // 2. Negative Triggers (Increases Risk)
        if (features.zeroBalanceDays > 5) score += 0.2;
        if (features.zeroBalanceDays > 10) score += 0.3;

        if (features.gamblingVelocity > 3) score += 0.15;
        if (features.gamblingVelocity > 10) score += 0.40; // High correlation

        if (features.debtStackingDetected) score += 0.25;

        // 3. Character Proxies (Reduces Risk)
        if (features.utilityRegularityScore > 2) score -= 0.1;
        if (features.incomeFrequency > 25 && features.incomeFrequency < 35) score -= 0.15; // Monthly salary-like

        // Base risk
        score += 0.2;

        // Clamp to 0..1
        return Math.min(Math.max(score, 0.01), 0.99);
    }

    /**
     * The Regressor (Linear/Ridge Proxy)
     * Determines limit and pricing.
     */
    async predictLoanTerms(pd: number, requestedAmount: number, income: number) {
        // Simple regression logic

        // 1. Loan Limit
        // If PD is high, limit is low.
        // Cap at 33% (approx 1/3) of income * duration? Or just multiplier of income.
        // Let's say max loan is 50% of monthly income check.

        const riskFactor = (1 - pd);
        const maxLimit = income * 0.5 * riskFactor * 2; // e.g. 5000 * 0.5 * 0.9 * 2 = 4500

        // 2. Pricing (Risk-Based)
        // Base rate 25% APR
        // Add risk premium
        const baseRate = 0.25;
        const riskPremium = pd * 0.5; // If 10% PD -> +5% rate
        const finalRate = baseRate + riskPremium;

        return {
            maxAmount: Math.floor(maxLimit),
            interestRate: parseFloat(finalRate.toFixed(4))
        };
    }

    /**
     * Fraud Detection (Isolation Forest Proxy)
     */
    async detectAnomalies(features: RiskFeatures): Promise<boolean> {
        // Detect "Loan Grooming"
        // e.g., huge inward transfers just before application logic
        // For now, check if Burn Rate is suspiciously high (cashing out immediately)
        if (features.burnRate > 0.95) return true;
        return false;
    }
}
