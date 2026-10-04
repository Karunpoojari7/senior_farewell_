import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { ENV } from './config/environment.js';
import { globalRateLimiter } from './middleware/rateLimiter.middleware.js';
import { mischiefRouter } from './routes/mischief.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const app = express();

// Security headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ENV.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || !ENV.IS_PRODUCTION) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for event testing
      }
    },
    credentials: true,
  })
);

// Parse JSON and form bodies
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));

// Global rate limiting
app.use('/api', globalRateLimiter);

// Serve static generated assets (images)
app.use(express.static(PUBLIC_DIR));

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Senior Mischief Backend',
    timestamp: new Date().toISOString()
  });
});

// Mischief API routes
app.use('/api/mischief', mischiefRouter);

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        code: 'FILE_TOO_LARGE',
        message: 'The uploaded photo is too large. Maximum size is 10 MB.'
      });
      return;
    }
  }

  if (err?.message?.includes('INVALID_MIME_TYPE')) {
    res.status(400).json({
      success: false,
      code: 'INVALID_FILE_TYPE',
      message: err.message
    });
    return;
  }

  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred. Please try again.'
  });
});

// Start listening
const server = app.listen(ENV.PORT, () => {
  console.log(`😈 Senior Mischief Backend running on http://localhost:${ENV.PORT}`);
  console.log(`🎯 Event Quota Limit: ${ENV.MAX_GENERATIONS} generations`);
});

export default app;
