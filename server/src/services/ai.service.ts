import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/environment.js';
import { BuiltPromptResult } from './theme.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const MOCK_ART_PATH = path.join(PUBLIC_DIR, 'mock-art.svg');

export type AIErrorCode =
  | 'AI_NOT_CONFIGURED'
  | 'AI_RATE_LIMITED'
  | 'AI_GENERATION_FAILED'
  | 'AI_INVALID_RESPONSE'
  | 'GENERATION_LIMIT_REACHED'
  | 'INVALID_IMAGE';

export class AIServiceError extends Error {
  public code: AIErrorCode;
  constructor(code: AIErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'AIServiceError';
  }
}

export interface GeneratedArtworkOutput {
  imageBuffer: Buffer;
  mimeType: string;
  isMock: boolean;
}

class AIService {
  private aiClient: GoogleGenAI | null = null;

  constructor() {
    if (ENV.GEMINI_API_KEY) {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
      } catch (err) {
        console.warn('[AI] Warning: Failed to initialize GoogleGenAI client:', err);
      }
    }
  }

  /**
   * Main caricature transformation orchestrator
   */
  public async transformPhoto(
    inputBuffer: Buffer,
    inputMimeType: string,
    promptData: BuiltPromptResult
  ): Promise<GeneratedArtworkOutput> {
    // 1. Check if Mock Mode is active
    if (ENV.MOCK_AI) {
      console.log('[AI] Mock generation started');
      console.log(`[AI] Theme selected: ${promptData.theme.title}`);
      
      const mockResult = await this.getMockArtwork(inputBuffer, inputMimeType);
      console.log('[AI] Generation completed (Mock)');
      return mockResult;
    }

    // 2. Real AI Generation Pipeline Preparation
    if (!ENV.GEMINI_API_KEY || !this.aiClient) {
      console.error('[AI] Gemini API Key is missing while MOCK_AI=false');
      throw new AIServiceError(
        'AI_NOT_CONFIGURED',
        'AI service is not configured. Please verify GEMINI_API_KEY.'
      );
    }

    console.log(`[AI] Generation started with model: ${ENV.GEMINI_MODEL}`);
    console.log(`[AI] Theme selected: ${promptData.theme.title}`);

    try {
      // Call Gemini model for image-to-image caricature generation
      // Prepared for Gemini 3.1 Flash Image model:
      const response = await this.aiClient.models.generateContent({
        model: ENV.GEMINI_MODEL,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: promptData.promptText
              },
              {
                inlineData: {
                  data: inputBuffer.toString('base64'),
                  mimeType: inputMimeType
                }
              }
            ]
          }
        ]
      });

      // Extract generated image from candidates
      const candidate = response.candidates?.[0];
      const parts = candidate?.content?.parts;

      if (parts && parts.length > 0) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            const generatedBuffer = Buffer.from(part.inlineData.data, 'base64');
            console.log('[AI] Generation completed (Real AI)');
            return {
              imageBuffer: generatedBuffer,
              mimeType: part.inlineData.mimeType || 'image/png',
              isMock: false
            };
          }
        }
      }

      // If model returned text only or unexpected payload
      console.warn('[AI] Gemini response did not contain inline image part');
      throw new AIServiceError(
        'AI_INVALID_RESPONSE',
        'AI provider returned an unexpected response format.'
      );
    } catch (error: any) {
      if (error instanceof AIServiceError) {
        throw error;
      }

      const errMsg = error?.message || String(error);
      console.error('[AI] Gemini generation failure:', errMsg);

      if (errMsg.includes('429') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('rate')) {
        throw new AIServiceError(
          'AI_RATE_LIMITED',
          'AI provider rate limit reached. Please wait a moment.'
        );
      }

      throw new AIServiceError(
        'AI_GENERATION_FAILED',
        'AI image generation failed. Please try again.'
      );
    }
  }

  /**
   * Retrieves reliable mock artwork buffer for local development
   */
  private async getMockArtwork(
    inputBuffer: Buffer,
    inputMimeType: string
  ): Promise<GeneratedArtworkOutput> {
    try {
      if (fs.existsSync(MOCK_ART_PATH)) {
        const svgBuffer = await fs.promises.readFile(MOCK_ART_PATH);
        return {
          imageBuffer: svgBuffer,
          mimeType: 'image/svg+xml',
          isMock: true
        };
      }
    } catch (err) {
      console.warn('[AI] Could not read mock-art.svg, using input buffer fallback:', err);
    }

    return {
      imageBuffer: inputBuffer,
      mimeType: inputMimeType,
      isMock: true
    };
  }
}

export const aiService = new AIService();
