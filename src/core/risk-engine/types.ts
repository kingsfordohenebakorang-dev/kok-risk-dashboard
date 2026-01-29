
export interface Transaction {
    id: string;
    timestamp: Date;
    amount: number;
    currency: string;
    description: string;
    type: 'DEBIT' | 'CREDIT';
    balanceAfter?: number;
    source: 'MOMO' | 'BANK';
    provider: string; // e.g., 'MTN', 'ECOBANK'
    metadata?: Record<string, any>;
}

export interface NormalizedTransaction extends Transaction {
    normalizedCategory: string; // e.g., 'GAMBLING', 'LOAN_REPAYMENT', 'UTILITIES'
    stdTimestamp: string;
    amountUsdEquiv: number;
}

export interface RiskFeatures {
    zeroBalanceDays: number;
    lenderOverlapCount: number;
    gamblingVelocity: number;
    balanceVolatility: number;
    burnRate: number;
    incomeFrequency: number;
    networkHubScore: number;
    debtStackingDetected: boolean;
    utilityRegularityScore: number;
}

export interface RiskEngineInput {
    borrowerId: string;
    amount: number;
    tenor: number;
    income: number;
    employmentType: 'SALARIED' | 'SME' | 'GIG' | 'INFORMAL' | 'GOVT';
    bureauScore?: number;
    transactions: Transaction[]; // Raw transactions
}

export interface DecisionPacket {
    decisionId: string;
    approved: boolean;
    score: number;
    grade: string;
    probabilityOfDefault: number;
    pricing: {
        interestRate: number;
        maxLoanAmount: number;
        currency: string;
    };
    riskFactors: {
        factor: string;
        impact: 'HIGH' | 'MEDIUM' | 'LOW';
        description: string;
    }[];
    features: RiskFeatures;
    timestamp: Date;
}
