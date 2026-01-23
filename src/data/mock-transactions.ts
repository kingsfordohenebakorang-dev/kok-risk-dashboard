
import { Transaction } from '../core/risk-engine/types';

export const MockTransactionService = {
    getHistory: (borrowerId: string, scenario: 'GOOD' | 'BAD_GAMBLER' | 'BAD_DEBT_STACKER' = 'GOOD'): Transaction[] => {
        const now = new Date();
        const txs: Transaction[] = [];

        // Helper to add days
        const addDays = (d: Date, days: number) => new Date(d.getTime() + (days * 86400000));

        if (scenario === 'BAD_GAMBLER') {
            // Generates frequent betting checks
            for (let i = 0; i < 30; i++) {
                txs.push({
                    id: `tx_bet_${i}`,
                    timestamp: addDays(now, -i),
                    amount: 50,
                    currency: 'GHS',
                    description: i % 2 === 0 ? 'TRF TO SPORTYBET' : 'BETWAY DEPOSIT',
                    type: 'DEBIT',
                    source: 'MOMO',
                    provider: 'MTN',
                    balanceAfter: 100 - (i * 2) // low balance
                });
            }
        }

        else if (scenario === 'BAD_DEBT_STACKER') {
            // Loan repayments to multiple lenders
            txs.push({ id: 'ln1', timestamp: addDays(now, -5), amount: 500, currency: 'GHS', description: 'REPAYMENT TO FIDO', type: 'DEBIT', source: 'MOMO', provider: 'MTN', balanceAfter: 200 });
            txs.push({ id: 'ln2', timestamp: addDays(now, -2), amount: 300, currency: 'GHS', description: 'PAYMENT TO QUICKLOAN', type: 'DEBIT', source: 'MOMO', provider: 'MTN', balanceAfter: 50 });
            txs.push({ id: 'inc1', timestamp: addDays(now, -1), amount: 1000, currency: 'GHS', description: 'LOAN DISBURSEMENT FAIRMONEY', type: 'CREDIT', source: 'MOMO', provider: 'MTN', balanceAfter: 1050 });
        }

        else {
            // Good behavior: Regular income, utility payments
            // Salary
            txs.push({ id: 'sal1', timestamp: addDays(now, -30), amount: 3000, currency: 'GHS', description: 'SALARY PAYMENT', type: 'CREDIT', source: 'BANK', provider: 'ECOBANK', balanceAfter: 3500 });
            txs.push({ id: 'sal2', timestamp: addDays(now, -1), amount: 3000, currency: 'GHS', description: 'SALARY PAYMENT', type: 'CREDIT', source: 'BANK', provider: 'ECOBANK', balanceAfter: 4000 });

            // Utilities
            txs.push({ id: 'util1', timestamp: addDays(now, -15), amount: 200, currency: 'GHS', description: 'ECG PREPAID', type: 'DEBIT', source: 'MOMO', provider: 'MTN', balanceAfter: 2800 });
            txs.push({ id: 'util2', timestamp: addDays(now, -45), amount: 200, currency: 'GHS', description: 'GWCL WATER BILL', type: 'DEBIT', source: 'MOMO', provider: 'MTN', balanceAfter: 2800 });
            txs.push({ id: 'util3', timestamp: addDays(now, -75), amount: 200, currency: 'GHS', description: 'ECG POSTPAID', type: 'DEBIT', source: 'MOMO', provider: 'MTN', balanceAfter: 2800 });
        }

        return txs;
    }
};
