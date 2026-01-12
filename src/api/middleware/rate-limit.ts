import rateLimit from 'express-rate-limit';

// --- 5. RATE LIMITING (Rule 5) ---

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too Many Requests",
        message: "You have exceeded the API rate limit. Please try again in 15 minutes."
    }
});

// Stricter limit for Authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 failed login attempts
    message: {
        error: "Account Locked",
        message: "Too many login attempts. Please contact security."
    }
});
