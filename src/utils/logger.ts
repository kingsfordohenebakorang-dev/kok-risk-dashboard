import winston from 'winston';

const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }),
];

// Only enable file logging if NOT in production (avoids Vercel read-only FS errors)
// Also ensures we don't crash if 'logs' folder is missing
if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    );
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'risk-insurance-api' },
    transports: transports,
});
