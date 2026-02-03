import { Router } from 'express';
import * as IngestController from '../controllers/ingest.controller';
import * as EvaluateController from '../controllers/evaluate.controller';
import * as ExplainController from '../controllers/explain.controller';
import * as SandboxController from '../controllers/sandbox.controller';
import * as AuthController from '../controllers/auth.controller';
import * as ScoreController from '../controllers/score.controller';
import * as WebhookController from '../controllers/webhook.controller';
import * as ComplianceController from '../controllers/compliance.controller';

import { authenticate } from '../middlewares/auth.middleware';
import {
    evaluateLimiter,
    ingestLimiter,
    authLimiter,
    complianceLimiter,
    velocityCheck
} from '../core/security/rate-limiter';
import {
    validateInput,
    IngestSchema,
    EvaluateSchema
} from '../core/security/validation';
import {
    ipAllowList,
    replayProtection
} from '../core/security/middleware';

const router = Router();

// --- Public Routes ---

// Auth with Strict Limiting
router.post('/auth/register', authLimiter, AuthController.register);
router.post('/auth/login', authLimiter, AuthController.login);

// Webhooks (Public but Secured)
// IP Allow List + Replay Protection + Rate Limit
router.post('/webhooks/repayment',
    ipAllowList,
    replayProtection,
    WebhookController.handleRepaymentWebhook
);

// --- Protected Routes (Require Auth) ---
router.use(authenticate);

// 1. Ingestion: High Volume, Validated
router.post('/ingest',
    ingestLimiter,
    validateInput(IngestSchema),
    IngestController.ingestData
);

// 2. Evaluation: Strict Limit + Velocity Check + Validation
router.post('/evaluate',
    evaluateLimiter,
    velocityCheck,
    validateInput(EvaluateSchema),
    EvaluateController.evaluateRisk
);

router.post('/score',
    evaluateLimiter,
    validateInput(EvaluateSchema),
    ScoreController.scoreRisk
);

// 3. Compliance: Very Restricted
router.get('/compliance/report',
    complianceLimiter,
    ComplianceController.getComplianceReport
);

// Standard Endpoints
router.get('/explain', ExplainController.explainDecision);
router.post('/sandbox/reset', SandboxController.resetSandbox);

export const apiRoutes = router;
