import { Request, Response } from 'express';
import { z } from 'zod';
import { parametricEngine } from '../core/parametric-engine';
import { logger } from '../utils/logger';

const repaymentEventSchema = z.object({
    borrower_id: z.string(),
    loan_id: z.string(),
    days_past_due: z.number().int(),
    event_type: z.enum(['MISSED_PAYMENT', 'REPAYMENT']),
});

export const handleRepaymentWebhook = async (req: Request, res: Response) => {
    try {
        const validation = repaymentEventSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json(validation.error.format());
        }

        const { borrower_id, days_past_due } = validation.data;

        if (days_past_due > 0) {
            // Check if this triggers a parametric payout
            const result = await parametricEngine.checkTrigger(borrower_id, days_past_due);

            if (result.triggered) {
                return res.status(200).json({
                    status: 'PAYOUT_INITIATED',
                    txHash: result.txHash,
                    message: 'Parametric Insurance Triggered Successfully'
                });
            }
        }

        return res.status(200).json({ status: 'PROCESSED', message: 'No trigger conditions met' });

    } catch (error) {
        logger.error('Webhook Error', error);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
};
