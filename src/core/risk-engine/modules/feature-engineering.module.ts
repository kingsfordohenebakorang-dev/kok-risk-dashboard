
import { NormalizedTransaction, RiskFeatures } from '../types';

export class FeatureEngineeringModule {

    /**
     * Runs all Analyzers on the normalized transaction history.
     */
    extractFeatures(transactions: NormalizedTransaction[]): RiskFeatures {
        // Sort by date asc
        const sorted = [...transactions].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

        return {
            zeroBalanceDays: this.calculateZeroBalanceDays(sorted),
            lenderOverlapCount: this.calculateLenderOverlap(sorted),
            gamblingVelocity: this.calculateGamblingVelocity(sorted),
            balanceVolatility: this.calculateVolatility(sorted),
            burnRate: this.calculateBurnRate(sorted),
            incomeFrequency: this.calculateIncomeFrequency(sorted),
            networkHubScore: this.calculateNetworkHubScore(sorted),
            debtStackingDetected: this.detectDebtStacking(sorted),
            utilityRegularityScore: this.calculateUtilityRegularity(sorted)
        };
    }

    // --- Analyzers ---

    private calculateZeroBalanceDays(txs: NormalizedTransaction[]): number {
        // Count days where balance dipped near zero (< 10 GHS equivalent)
        // Note: Requires running balance if not provided, but we'll infer from context or assumption
        // Assuming we are provided a stream of transactions, we might not have daily snapshots.
        // We will approximate this by checking days where the LAST transaction had low balance (if available)
        // Or if we don't have balanceAfter, we rely on "failed debit" markers?
        // For this implementation, we'll assume `balanceAfter` is populated or we reconstruct it.

        let zeroDays = 0;
        let currentBalance = 0; // fallback if needed
        const LOW_BALANCE_THRESHOLD = 10;

        // Naive day grouping
        const dayMap = new Map<string, number>(); // date -> endOfDayBalance

        txs.forEach(tx => {
            currentBalance = tx.balanceAfter ?? (currentBalance + (tx.type === 'CREDIT' ? tx.amount : -tx.amount));
            const dayKey = tx.timestamp.toISOString().split('T')[0];
            dayMap.set(dayKey, currentBalance);
        });

        dayMap.forEach((balance) => {
            if (balance < LOW_BALANCE_THRESHOLD) zeroDays++;
        });

        return zeroDays;
    }

    private calculateLenderOverlap(txs: NormalizedTransaction[]): number {
        // Count unique loan providers
        const loanTxs = txs.filter(t => t.normalizedCategory === 'LOAN_REPAYMENT');
        const providers = new Set(loanTxs.map(t => t.description)); // naive
        return providers.size;
    }

    private detectDebtStacking(txs: NormalizedTransaction[]): boolean {
        // Check for loan repayment immediately following a loan disbursement (or income) from another provider
        // Or essentially, paying Peter to pay Paul.
        // Simplification: Do we see repayments to multiple lenders within a short window?

        const lenders = this.calculateLenderOverlap(txs);
        return lenders > 1; // Basic heuristic
    }

    private calculateGamblingVelocity(txs: NormalizedTransaction[]): number {
        // Count gambling txs in last 30 days
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

        const recentGambling = txs.filter(t =>
            t.normalizedCategory === 'GAMBLING' &&
            t.type === 'DEBIT' &&
            t.timestamp > thirtyDaysAgo
        );

        return recentGambling.length;
    }

    private calculateVolatility(txs: NormalizedTransaction[]): number {
        // Standard deviation of daily closing balances
        const dayBalances: number[] = [];
        let currentBalance = 0;

        txs.forEach(tx => {
            currentBalance = tx.balanceAfter ?? (currentBalance + (tx.type === 'CREDIT' ? tx.amount : -tx.amount));
            // simplified: push every transaction balance? No, should be daily.
            // Let's just take the variance of the transaction amounts for now as a proxy for activity volatility.
            // Or better: std dev of the balance.
        });

        // Reconstruct daily balances properly
        const dayMap = new Map<string, number>();
        let running = 0;
        txs.forEach(tx => {
            running = tx.balanceAfter ?? (running + (tx.type === 'CREDIT' ? tx.amount : -tx.amount));
            dayMap.set(tx.timestamp.toISOString().split('T')[0], running);
        });

        const values = Array.from(dayMap.values());
        if (values.length < 2) return 0;

        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
        const stdev = Math.sqrt(variance);

        return mean === 0 ? 0 : stdev / mean; // Return Coefficient of Variation
    }

    private calculateBurnRate(txs: NormalizedTransaction[]): number {
        // "How fast the user spends their primary deposit"
        // Find major deposits (> 500), then check balance 48h later.

        let burnSpeedSum = 0;
        let count = 0;

        for (let i = 0; i < txs.length; i++) {
            const tx = txs[i];
            if (tx.type === 'CREDIT' && tx.normalizedCategory === 'INCOME') {
                const depositAmount = tx.amount;
                const depositTime = tx.timestamp.getTime();
                // Look for balance 48h later
                const future = txs.find(t => t.timestamp.getTime() > depositTime + (48 * 3600 * 1000));

                if (future && future.balanceAfter) {
                    const remaining = future.balanceAfter;
                    const burnt = depositAmount - remaining; // Rough appx
                    // if balance dropped significantly
                    const burnRatio = 1 - (remaining / depositAmount);
                    if (depositAmount > 0) {
                        burnSpeedSum += Math.max(0, burnRatio);
                        count++;
                    }
                }
            }
        }

        return count === 0 ? 0 : burnSpeedSum / count; // Avg % burnt in 48h
    }

    private calculateIncomeFrequency(txs: NormalizedTransaction[]): number {
        // Avg days between INCOME transactions
        const incomes = txs.filter(t => t.normalizedCategory === 'INCOME').sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        if (incomes.length < 2) return 0;

        let totalDiff = 0;
        for (let i = 1; i < incomes.length; i++) {
            const diffTime = Math.abs(incomes[i].timestamp.getTime() - incomes[i - 1].timestamp.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalDiff += diffDays;
        }

        return totalDiff / (incomes.length - 1);
    }

    private calculateNetworkHubScore(txs: NormalizedTransaction[]): number {
        // Inward vs Outward unique parties
        // Placeholder implementation
        return 0.5;
    }

    private calculateUtilityRegularity(txs: NormalizedTransaction[]): number {
        // Count utility payments
        return txs.filter(t => t.normalizedCategory === 'UTILITIES').length;
    }
}
