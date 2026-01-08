import { logger } from '../utils/logger';

export interface FinancialEvent {
    source: 'TELCO' | 'REMITTANCE' | 'GIG_PLATFORM';
    timestamp: Date;
    amount: number;
    currency: string;
    metadata: Record<string, any>;
}

export interface DataSourceAdapter {
    name: string;
    fetchHistory(userId: string, range: string): Promise<FinancialEvent[]>;
    calculateStabilityScore(events: FinancialEvent[]): number; // 0-100
}

// 1. Telco Adapter (Mobile Money & Airtime)
export class TelcoAdapter implements DataSourceAdapter {
    name = 'MTN_GHANA_OPENAPI';

    async fetchHistory(userId: string): Promise<FinancialEvent[]> {
        // Integration stub for Mobile Money API
        logger.info(`Fetching telco data for ${userId}`);
        return [
            { source: 'TELCO', timestamp: new Date(), amount: 50, currency: 'GHS', metadata: { type: 'AIRTIME_TOPUP' } },
            { source: 'TELCO', timestamp: new Date(), amount: 1200, currency: 'GHS', metadata: { type: 'MOMO_CASH_IN' } },
        ];
    }

    calculateStabilityScore(events: FinancialEvent[]): number {
        // Logic: Consistent airtime top-ups correlate with repayment stability
        const topups = events.filter(e => e.metadata.type === 'AIRTIME_TOPUP');
        return Math.min(topups.length * 10, 100);
    }
}

// 2. Gig Adapter (Uber/Bolt)
export class GigEconomyAdapter implements DataSourceAdapter {
    name = 'UBER_DRIVER_API';

    async fetchHistory(userId: string): Promise<FinancialEvent[]> {
        logger.info(`Fetching gig data for ${userId}`);
        return [
            { source: 'GIG_PLATFORM', timestamp: new Date(), amount: 450, currency: 'GHS', metadata: { type: 'WEEKLY_PAYOUT' } }
        ];
    }

    calculateStabilityScore(events: FinancialEvent[]): number {
        // Logic: Variance in weekly payouts. Lower variance = Higher score.
        return 85;
    }
}
