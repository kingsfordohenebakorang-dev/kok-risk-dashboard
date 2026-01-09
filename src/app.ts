import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { apiRoutes } from './api/routes';
import { logger } from './utils/logger';
import openApiSpec from './docs/openapi.json';

const app = express();

// Trust Proxy (Required for Cloud/Render SSL)
app.enable('trust proxy');

// Security & Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(express.static('public')); // Serve frontend files

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root Redirect
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Documentation Spec Endpoint (Public)
app.get('/v1/docs/spec', (req, res) => res.json(openApiSpec));

// API Routes
app.use('/v1', apiRoutes);



// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

export default app;
