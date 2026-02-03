import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';

const PORT = config.PORT || 10000;

import { auditSecrets } from './core/security/middleware';

// Perform security audit before starting
auditSecrets();

app.listen(PORT, () => {
    logger.info(`🚀 Risk & Insurance API running on port ${PORT}`);
    logger.info(`Environment: ${config.NODE_ENV}`);
});
