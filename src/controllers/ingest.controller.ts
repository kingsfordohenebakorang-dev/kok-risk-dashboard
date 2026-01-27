import { Request, Response } from 'express';
import { z } from 'zod';
import { featureStore } from '../data/feature-store';
import { logger } from '../utils/logger';

// Schema for transaction ingestion
const ingestSchema = z.object({
    partner_id: z.string(),
    transaction_data: z.array(z.object({
        borrower_id: z.string(),
        amount: z.number(),
        timestamp: z.string(),
        type: z.enum(['credit', 'debit']),
    })),
});

export const ingestData = async (req: Request, res: Response) => {
    try {
        const validation = ingestSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ error: 'Validation Error', details: validation.error.format() });
        }

        const { transaction_data } = validation.data;

        // Async processing to avoid blocking main thread (Event loop)
        processTransactions(transaction_data).catch(err => logger.error('Async Ingest Error', err));

        return res.status(202).json({ message: 'Ingestion accepted', count: transaction_data.length });
    } catch (error) {
        logger.error('Ingest Error:', error);
        return res.status(500).json({ error: 'Ingest Failed' });
    }
};

import { prisma } from '../data/db'; // Import DB client

async function processTransactions(transactions: any[]) {
    // Simple aggregation logic: Calculate scores and save to Redis
    const borrowerGroups: Record<string, any[]> = {};

    transactions.forEach(tx => {
        if (!borrowerGroups[tx.borrower_id]) borrowerGroups[tx.borrower_id] = [];
        borrowerGroups[tx.borrower_id].push(tx);
    });

    for (const [id, txs] of Object.entries(borrowerGroups)) {
        // 1. Calculate Features
        const inflows = txs
            .filter(t => t.type === 'credit')
            .map(t => t.amount);

        // Default credit score logic (simplified)
        const baseScore = 500;
        const volumeBonus = Math.min(inflows.length * 10, 200); // More txs = better score
        const creditScore = baseScore + volumeBonus;

        // Calculate Inflow Volatility (Standard Deviation / Mean)
        let volatility = 0.50; // Default high risk
        if (inflows.length > 1) {
            const mean = inflows.reduce((a, b) => a + b, 0) / inflows.length;
            const variance = inflows.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / inflows.length;
            const stdDev = Math.sqrt(variance);
            volatility = mean > 0 ? +(stdDev / mean).toFixed(4) : 0.99;
        }

        const features = {
            updatedAt: new Date().toISOString(),
            creditScore,
            inflowVolatility: volatility,
            transactionCount: txs.length
        };

        logger.info(`Updating features for ${id}`, features);

        // 2. Update Hot Store (Redis) - Critical for Low Latency
        await featureStore.set(`borrower:${id}`, JSON.stringify(features));

        // 3. Update Cold Store (Postgres) - Critical for Durability
        try {
            await prisma.borrowerFeatures.upsert({
                where: { borrowerId: id },
                update: {
                    creditScore,
                    inflowVolatility: volatility,
                    lastUpdated: new Date(),
                    metadata: features as any // storage
                },
                create: {
                    borrowerId: id,
                    creditScore,
                    inflowVolatility: volatility,
                    metadata: features as any
                }
            });
        } catch (dbErr) {
            logger.error(`Failed to persist features for ${id} to DB`, dbErr);
        }
    }
}
