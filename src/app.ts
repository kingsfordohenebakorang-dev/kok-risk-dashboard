import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { httpLogger } from './middlewares/http-logger';
import { apiRoutes } from './routes/api';
import { logger } from './utils/logger';
import openApiSpec from './docs/openapi.json';

const app = express();

// Trust Proxy (Required for Cloud/Render SSL)
app.enable('trust proxy');

// 1. Infrastructure Trust Boundary
import { trustBoundary, requestIdentifier } from './core/security/middleware';
app.use(trustBoundary);

// 2. Baseline Security Hardening
app.use(helmet());
app.use(cors());

// 3. Request Identity & Global Rate Limits
// (Global generic limit can be added here if needed, but we use specific ones in routes)
app.use(requestIdentifier);

// 4. Body Parsing
app.use(express.json({ limit: '100kb' })); // Limit body size to prevent DoS

// 5. Observability
app.use(httpLogger);

app.use(express.static('public'));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root Redirect
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Documentation UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Documentation Spec Endpoint (Public)
app.get('/api/v1/docs/spec', (req, res) => res.json(openApiSpec));

// 6. - 10. API Routes (Auth, Validation, Biz Logic handled within)
app.use('/api/v1', apiRoutes);



// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled Exception', {
        requestId: (req as any).id,
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });

    res.status(500).json({
        error: 'Internal Server Error',
        requestId: (req as any).id, // Helpful for support
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

export default app;
