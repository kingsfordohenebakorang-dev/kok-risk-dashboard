import { Request, Response } from 'express';
import { z } from 'zod';
import { riskEngineService } from '../services/riskEngine';
import { logger } from '../utils/logger';

const scoreSchema = z.object({
    borrower_id: z.string(),
    loan_amount: z.number().positive(),
    tenor: z.number().int().positive(),
    monthly_income: z.number().optional(),
    employment_type: z.enum(['SALARIED', 'GIG', 'SME', 'INFORMAL']).optional(),
});

export const scoreRisk = async (req: Request, res: Response) => {
    try {
        const validation = scoreSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: 'Validation Error', details: validation.error.format() });
        }

        const model = req.query.model as string || 'kok_v1';
        const { borrower_id, loan_amount, tenor, monthly_income, employment_type } = validation.data;

        logger.info(`Score Request`, { model, borrower_id });

        const result = await riskEngineService.evaluate(
            borrower_id,
            loan_amount,
            tenor,
            monthly_income,
            employment_type,
            model // Pass the model version
        );

        return res.json({
            model_used: model,
            ...result
        });
    } catch (error) {
        logger.error('Score Error:', error);
        return res.status(500).json({ error: 'Scoring Failed' });
    }
};
