import { AffordabilityModule } from './modules/affordability.module';
import { AlternativeDataModule } from './modules/alternative-data.module';
import { NormalizationModule } from './modules/normalization.module';
import { FeatureEngineeringModule } from './modules/feature-engineering.module';
import { ModelInferenceModule } from './modules/model-inference.module';
import { RiskEngineInput, DecisionPacket, RiskFeatures } from './types';
import { logger } from '../../utils/logger';

export { RiskEngineInput, DecisionPacket };

export class RiskEngineOrchestrator {
    private affordability = new AffordabilityModule();
    private altData = new AlternativeDataModule();
    private normalization = new NormalizationModule();
    private features = new FeatureEngineeringModule();
    private inference = new ModelInferenceModule();

    public async evaluate(input: RiskEngineInput): Promise<DecisionPacket> {
        logger.info(`Risk Engine: Evaluating ${input.borrowerId}`);

        // 1. Data Ingestion & Normalization (ETL)
        // Convert raw MoMo/Bank transactions into Common Data Model
        const normalizedTxs = this.normalization.process(input.transactions || []);

        // 2. Feature Engineering
        // Calculate Behavioral Predictors (Zero-Balance, Burn Rate, etc.)
        const riskFeatures = this.features.extractFeatures(normalizedTxs);

        // 3. Run Traditional Modules (Legacy/Baseline support)
        const affordResult = this.affordability.evaluate({
            monthlyIncome: input.income,
            loanAmount: input.amount,
            tenorDays: input.tenor
        });
        const altResult = this.altData.evaluate({
            employmentType: input.employmentType
        });

        // 4. Model Inference (Classification & Regression)
        const anomalyDetected = await this.inference.detectAnomalies(riskFeatures);
        let pd = await this.inference.predictProbabilityOfDefault(riskFeatures);

        // Adjust PD based on legacy modules if needed (Ensemble effect)
        // If affordability is bad, PD goes up.
        if (affordResult.dti > 0.5) pd += 0.1;

        const { maxAmount, interestRate } = await this.inference.predictLoanTerms(pd, input.amount, input.income);

        // 5. Decision Rules
        const score = Math.floor((1 - pd) * 100);
        let approved = (score > 50) && (affordResult.dti < 0.60) && (!anomalyDetected);

        let grade = 'F';
        if (score >= 80) grade = 'A';
        else if (score >= 70) grade = 'B';
        else if (score >= 60) grade = 'C';
        else if (score >= 50) grade = 'D';

        const decisionId = `dec_${new Date().getTime()}_${input.borrowerId.substring(0, 4)}`;

        return {
            decisionId,
            approved,
            score,
            grade,
            probabilityOfDefault: pd,
            pricing: {
                interestRate,
                maxLoanAmount: maxAmount,
                currency: 'GHS'
            },
            riskFactors: this.generateRiskFactors(riskFeatures, anomalyDetected),
            features: riskFeatures,
            timestamp: new Date()
        };
    }

    private generateRiskFactors(features: RiskFeatures, anomaly: boolean): any[] {
        const factors = [];
        if (anomaly) factors.push({ factor: 'ANOMALY_DETECTED', impact: 'HIGH', description: 'Suspicious transaction pattern detected (Loan Grooming).' });
        if (features.zeroBalanceDays > 5) factors.push({ factor: 'LIQUIDITY_STRESS', impact: 'HIGH', description: 'Frequent zero-balance days.' });
        if (features.debtStackingDetected) factors.push({ factor: 'DEBT_STACKING', impact: 'HIGH', description: 'Multiple concurrent lenders detected.' });
        if (features.gamblingVelocity > 5) factors.push({ factor: 'GAMBLING_RISK', impact: 'MEDIUM', description: 'High frequency betting activity.' });
        return factors;
    }
}

export const riskEngine = new RiskEngineOrchestrator();
