import { Request, Response } from 'express';
import { z } from 'zod';
import { riskEngineService } from '../services/riskEngine';
import { logger } from '../utils/logger';

const evaluateSchema = z.object({
    borrower_id: z.string(),
    loan_amount: z.number().positive(),
    tenor: z.number().int().positive(),
    monthly_income: z.number().optional(),
    employment_type: z.enum(['SALARIED', 'GIG', 'SME', 'INFORMAL']).optional(),
});

export const evaluateRisk = async (req: Request, res: Response) => {
    try {
        const validation = evaluateSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error: 'Validation Error', details: validation.error.format() });
        }

        const { borrower_id, loan_amount, tenor, monthly_income, employment_type } = validation.data;

        const result = await riskEngineService.evaluate(borrower_id, loan_amount, tenor, monthly_income, employment_type);

        return res.json(result);
    } catch (error) {
        logger.error('Evaluate Error:', error);
        return res.status(500).json({ error: 'Evaluation Failed' });
    }
};
