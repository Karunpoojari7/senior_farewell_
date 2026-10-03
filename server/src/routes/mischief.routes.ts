import { Router, Request, Response } from 'express';
import { uploadMiddleware } from '../middleware/upload.middleware.js';
import { generationRateLimiter } from '../middleware/rateLimiter.middleware.js';
import { limitService } from '../services/limit.service.js';
import { themeService } from '../services/theme.service.js';
import { aiService, AIServiceError } from '../services/ai.service.js';
import { storageService } from '../services/storage.service.js';
import { BATCH_DETAILS } from '../config/themes.js';

export const mischiefRouter = Router();

/**
 * POST /api/mischief/generate
 * Main endpoint to process photo and generate random farewell caricature
 */
mischiefRouter.post(
  '/generate',
  generationRateLimiter,
  uploadMiddleware.single('photo'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Verify file was provided
      if (!req.file || !req.file.buffer) {
        res.status(400).json({
          success: false,
          code: 'INVALID_IMAGE',
          message: 'Please upload a valid photo (JPG, JPEG, PNG, or WEBP).'
        });
        return;
      }

      // 2. Check Global Generation Limit (100 total generations)
      const slotGranted = limitService.attemptGenerationSlot();
      if (!slotGranted) {
        console.warn(`[QUOTA] ${limitService.getStats().totalGenerations}/100 used (Limit reached)`);
        res.status(429).json({
          success: false,
          code: 'GENERATION_LIMIT_REACHED',
          message: 'The mischief machine is taking a little break 😭 (Event generation quota completed).'
        });
        return;
      }

      const currentStats = limitService.getStats();
      console.log(`[QUOTA] ${currentStats.totalGenerations}/${currentStats.maxLimit} used`);

      // 3. Randomly select one farewell theme
      const selectedTheme = themeService.getRandomTheme();

      // 4. Build AI prompt without exposing it to the client
      const promptData = themeService.buildPrompt(selectedTheme);

      // 5. Send to AI service for caricature transformation
      const generatedArtwork = await aiService.transformPhoto(
        req.file.buffer,
        req.file.mimetype,
        promptData
      );

      // 6. Save generated image temporarily or to cloud storage
      const imageUrl = await storageService.saveGeneratedImage(
        generatedArtwork.imageBuffer,
        generatedArtwork.mimeType
      );

      // 7. Record success in limit service
      limitService.recordSuccess();

      // 8. Return response without leaking internal prompts
      res.status(200).json({
        success: true,
        title: selectedTheme.title,
        caption: selectedTheme.caption,
        imageUrl: imageUrl,
        themeId: selectedTheme.id,
        batchInfo: BATCH_DETAILS
      });
    } catch (err: any) {
      limitService.recordFailure();

      if (err instanceof AIServiceError) {
        res.status(500).json({
          success: false,
          code: err.code,
          message: err.message
        });
        return;
      }

      console.error('[AI] Unhandled generation error:', err);
      res.status(500).json({
        success: false,
        code: 'AI_GENERATION_FAILED',
        message: 'The mischief machine had a senior moment 😭 Please try again.'
      });
    }
  }
);

/**
 * GET /api/mischief/stats
 * Status endpoint to check remaining event quota
 */
mischiefRouter.get('/stats', (req: Request, res: Response) => {
  const stats = limitService.getStats();
  res.json({
    success: true,
    stats: {
      totalGenerations: stats.totalGenerations,
      remainingGenerations: Math.max(0, stats.maxLimit - stats.totalGenerations),
      maxLimit: stats.maxLimit,
      isLimitReached: limitService.isLimitReached(),
      batch: BATCH_DETAILS.batch
    }
  });
});
