
import { Transaction, NormalizedTransaction } from '../types';

export class NormalizationModule {

    /**
     * Entry point for the ETL Pipeline.
     * Takes raw transactions and converts them into the Common Data Model (CDM).
     */
    process(transactions: Transaction[]): NormalizedTransaction[] {
        return transactions.map(tx => this.enrichAndNormalize(tx));
    }

    private enrichAndNormalize(tx: Transaction): NormalizedTransaction {
        const category = this.classifyTransaction(tx);

        return {
            ...tx,
            normalizedCategory: category,
            stdTimestamp: tx.timestamp.toISOString(),
            amountUsdEquiv: this.convertToUsd(tx.amount, tx.currency)
        };
    }

    /**
     * "NLP" / Regex based classification (Simulated for this implementation)
     */
    private classifyTransaction(tx: Transaction): string {
        const desc = tx.description.toLowerCase();

        if (desc.match(/(bet|sporty|betway|1xbet|supabet)/)) return 'GAMBLING';
        if (desc.match(/(loan|fido|quickloan|fairmoney|lending)/)) return 'LOAN_REPAYMENT';
        if (desc.match(/(mtn|airtime|vodafone|bundle)/)) return 'AIRTIME';
        if (desc.match(/(ecg|water|utility|bill)/)) return 'UTILITIES';
        if (desc.match(/(salary|wages|payment|deposit)/)) return 'INCOME';
        if (desc.match(/(school|tuition|fees)/)) return 'EDUCATION';

        return 'GENERAL';
    }

    private convertToUsd(amount: number, currency: string): number {
        // Simplified static conversion for now. 
        // In prod this would hit an FX service.
        const RATES: Record<string, number> = {
            'GHS': 0.065,
            'USD': 1.0,
            'NGN': 0.00064
        };
        return amount * (RATES[currency] || 0.065);
    }
}
