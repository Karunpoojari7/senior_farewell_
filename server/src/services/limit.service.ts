import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from '../config/environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const STATE_FILE = path.join(DATA_DIR, 'generations_counter.json');

interface GenerationStats {
  totalGenerations: number;
  successfulGenerations: number;
  failedGenerations: number;
  maxLimit: number;
  lastUpdated: string;
}

class LimitService {
  private maxGenerations: number = ENV.MAX_GENERATIONS;
  private currentCount: number = 0;
  private successfulCount: number = 0;
  private failedCount: number = 0;

  constructor() {
    this.ensureDataDir();
    this.loadState();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadState() {
    try {
      if (fs.existsSync(STATE_FILE)) {
        const raw = fs.readFileSync(STATE_FILE, 'utf-8');
        const data: GenerationStats = JSON.parse(raw);
        this.currentCount = data.totalGenerations || 0;
        this.successfulCount = data.successfulGenerations || 0;
        this.failedCount = data.failedGenerations || 0;
      } else {
        this.saveState();
      }
    } catch (err) {
      console.error('Error loading generation counter state:', err);
      this.currentCount = 0;
    }
  }

  private saveState() {
    try {
      this.ensureDataDir();
      const data: GenerationStats = {
        totalGenerations: this.currentCount,
        successfulGenerations: this.successfulCount,
        failedGenerations: this.failedCount,
        maxLimit: this.maxGenerations,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting generation counter state:', err);
    }
  }

  /**
   * Checks if generation limit is reached
   */
  public isLimitReached(): boolean {
    return this.currentCount >= this.maxGenerations;
  }

  /**
   * Attempts to reserve a slot. Returns true if slot allowed, false if limit reached.
   */
  public attemptGenerationSlot(): boolean {
    if (this.isLimitReached()) {
      return false;
    }
    this.currentCount += 1;
    this.saveState();
    return true;
  }

  /**
   * Records a successful AI generation
   */
  public recordSuccess() {
    this.successfulCount += 1;
    this.saveState();
  }

  /**
   * Records a failed AI generation
   */
  public recordFailure() {
    this.failedCount += 1;
    this.saveState();
  }

  /**
   * Returns current generation stats
   */
  public getStats(): GenerationStats {
    return {
      totalGenerations: this.currentCount,
      successfulGenerations: this.successfulCount,
      failedGenerations: this.failedCount,
      maxLimit: this.maxGenerations,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const limitService = new LimitService();
