import rateLimit from 'express-rate-limit';

// Global API rate limiter to protect event server
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    code: 'TOO_MANY_REQUESTS',
    message: 'Too many requests. Please slow down and try again shortly.'
  }
});

// Stricter rate limiter for AI generation endpoint (10 requests per 5 minutes per IP)
export const generationRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    code: 'GENERATION_RATE_LIMITED',
    message: 'Hold on! You are generating mischief too quickly. Please wait a moment.'
  }
});
