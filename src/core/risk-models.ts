/**
 * Actuarial Logic & Calculations
 * Core mathematical models for Credit Risk.
 */

export interface RiskInput {
    creditScore: number;
    inflowVolatility: number;
    loanAmount: number;
    tenor: number; // in months/days
    monthlyIncome?: number; // New Actuarial Input
    employmentType?: 'SALARIED' | 'GIG' | 'SME' | 'INFORMAL' | 'GOVT'; // New Actuarial Input
}

export interface RiskOutput {
    pd: number;
    lgd: number;
    ead: number;
    el: number;
}

export function calculateExpectedLoss(input: RiskInput): RiskOutput {
    const pd = calculatePD(input);
    const lgd = calculateLGD(input.loanAmount);
    const ead = input.loanAmount;

    const el = pd * lgd * ead;

    return { pd, lgd, ead, el };
}

function calculatePD(input: RiskInput): number {
    // 1. Base Probability from Credit Score (Logistic: Higher score = Lower PD)
    // Score 300 -> PD ~88%
    // Score 650 -> PD ~18%
    // Score 850 -> PD ~2%
    let pd = 1 / (1 + Math.exp((input.creditScore - 600) / 100));

    // 2. Volatility Penalty (0-100%)
    pd = pd * (1 + input.inflowVolatility);

    // 3. Actuarial Adjustments (New)
    if (input.monthlyIncome && input.monthlyIncome > 0) {
        // Debt-to-Income impact
        // Assuming tenor is days, roughly convert to months for DTI
        const months = Math.max(input.tenor / 30, 1);
        const monthlyInstallment = input.loanAmount / months;
        const dti = monthlyInstallment / input.monthlyIncome;

        if (dti > 0.5) pd *= 1.5; // High Risk if DTI > 50%
        if (dti < 0.2) pd *= 0.8; // Low Risk reward
    }

    if (input.employmentType) {
        const multipliers = {
            'SALARIED': 0.9,
            'SME': 1.1,
            'GIG': 1.2,
            'INFORMAL': 1.3,
            'GOVT': 0.85
        };
        pd *= (multipliers[input.employmentType] || 1.0);
    }

    return Math.min(Math.max(pd, 0.01), 0.99);
}

function calculateLGD(amount: number): number {
    // Standard fixed LGD for unsecured lending often around 45-80%
    // Here we use 0.5 (50%) as a baseline
    return 0.50;
}
