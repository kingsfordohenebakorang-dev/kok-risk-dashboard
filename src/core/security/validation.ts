
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

// --- Validation Middleware Factory ---
export const validateInput = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate Body, Query, and Params if present in schema
            // We usually validate request body mainly
            const result = schema.safeParse(req.body);

            if (!result.success) {
                // Log the detailed error internaly
                logger.warn('Input Validation Failed', {
                    path: req.path,
                    errors: result.error.errors
                });

                // Return sanitized error
                return res.status(400).json({
                    error: 'Invalid Request',
                    message: 'Input validation failed. Please check your data format.',
                    // In dev, we might show more, but for "Secure", we keep it vague
                    details: process.env.NODE_ENV === 'development' ? result.error.errors : undefined
                });
            }

            // Replace body with parsed data (strips unknown keys if strictly defined)
            req.body = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
};

// --- ISO Currency Validator ---
const CurrencyCode = z.string().length(3).regex(/^[A-Z]{3}$/);

// --- Schemas ---

// 1. Ingest Schema
export const IngestSchema = z.object({
    transaction_id: z.string().uuid(), // Prevent SQLi by enforcing UUID
    amount: z.number().positive().max(1000000000), // Hard limit on amount (1B)
    currency: CurrencyCode,
    timestamp: z.string().datetime(), // ISO 8601
    description: z.string().max(255).regex(/^[a-zA-Z0-9\s\-_.,]+$/), // Strict allow-list regex
    customer_id: z.string().min(5).max(50),
    merchant_category_code: z.string().regex(/^\d{4}$/).optional()
}).strict(); // Reject unknown fields

// 2. Evaluate Schema
export const EvaluateSchema = z.object({
    national_id: z.string().regex(/^[A-Z0-9-]{5,20}$/), // Generic ID format
    loan_amount: z.number().positive().max(50000), // Max loan cap for auto-decision
    tenure_days: z.number().int().min(1).max(365),
    employment_status: z.enum(['employed', 'self_employed', 'unemployed', 'student']),
    income_verified: z.boolean(),
    // Risk Engine specific fields
    consent_token: z.string().min(20) // Proof of user consent
}).strict();

// 3. Webhook Response Schema (for validation of incoming hooks if needed)
export const WebhookPayloadSchema = z.object({
    event_type: z.enum(['repayment.success', 'repayment.failed']),
    payload: z.object({
        loan_id: z.string().uuid(),
        amount: z.number(),
        timestamp: z.number()
    }),
    signature: z.string()
});
