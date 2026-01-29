/**
 * Alternative Data Module
 * Analyzes Employment Type & Sector Stability
 */

export interface AltDataInput {
    employmentType: 'SALARIED' | 'SME' | 'GIG' | 'INFORMAL' | 'GOVT';
    sector?: string;
}

export class AlternativeDataModule {
    evaluate(input: AltDataInput): { score: number; multiplier: number } {
        let score = 50; // Base score
        let multiplier = 1.0;

        switch (input.employmentType) {
            case 'GOVT': // High Stability
                score = 95;
                multiplier = 0.85;
                break;
            case 'SALARIED':
                score = 90;
                multiplier = 0.9; // Low Risk Multiplier
                break;
            case 'SME':
                score = 75;
                multiplier = 1.1;
                break;
            case 'GIG':
                score = 60;
                multiplier = 1.25;
                break;
            case 'INFORMAL':
                score = 45;
                multiplier = 1.4; // High Risk Multiplier
                break;
            default:
                score = 50;
        }

        return { score, multiplier };
    }
}
