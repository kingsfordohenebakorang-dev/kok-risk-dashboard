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

// Security & Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(express.static('public')); // Serve frontend files

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

// API Routes
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
