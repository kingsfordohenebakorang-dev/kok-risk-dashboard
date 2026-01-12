import { logger } from '../../utils/logger';

interface WebhookJob {
    id: string;
    url: string;
    payload: any;
    attempts: number;
    nextRetry: number; // Timestamp
}

const MAX_RETRIES = 5;

export class WebhookService {
    private static queue: WebhookJob[] = [];

    // --- 6. EVENT SYSTEM & RETRY LOGIC ---
    public static async dispatch(url: string, payload: any) {
        const job: WebhookJob = {
            id: `evt_${Date.now()}`,
            url,
            payload,
            attempts: 0,
            nextRetry: Date.now()
        };
        this.processJob(job);
    }

    private static async processJob(job: WebhookJob) {
        try {
            logger.info(`[WEBHOOK] Sending event to ${job.url} (Attempt ${job.attempts + 1})`);

            // Simulate HTTP Request
            const success = Math.random() > 0.3; // 30% chance of failure to test retries

            if (!success) throw new Error('Network Timeout');

            logger.info(`[WEBHOOK] Success ${job.id}`);

        } catch (err: any) {
            job.attempts++;
            if (job.attempts >= MAX_RETRIES) {
                logger.error(`[WEBHOOK] FAILED PERMANENTLY ${job.id} after ${MAX_RETRIES} attempts.`);
                return; // Drop from queue (Dead Letter Queue logic goes here)
            }

            // Exponential Backoff: 1s, 2s, 4s, 8s, 16s
            const delay = Math.pow(2, job.attempts) * 1000;
            job.nextRetry = Date.now() + delay;

            logger.warn(`[WEBHOOK] Failed. Retrying in ${delay}ms...`);
            setTimeout(() => this.processJob(job), delay);
        }
    }
}
