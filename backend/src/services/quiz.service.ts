import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const QUIZ_FILE = path.join(DATA_DIR, 'quiz_nominations.json');

export interface QuizNominationItem {
  awardId: string;
  awardTitle: string;
  taggedName: string;
}

export interface QuizSubmissionRecord {
  id: string;
  submittedBy: string;
  submittedAt: string;
  nominations: QuizNominationItem[];
}

class QuizService {
  private nominations: QuizSubmissionRecord[] = [];

  constructor() {
    this.ensureDataDir();
    this.loadNominations();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadNominations() {
    try {
      if (fs.existsSync(QUIZ_FILE)) {
        const fileData = fs.readFileSync(QUIZ_FILE, 'utf-8');
        this.nominations = JSON.parse(fileData);
      } else {
        this.saveToFile();
      }
    } catch (err) {
      console.warn('[QuizService] Failed to load quiz nominations file, starting fresh:', err);
      this.nominations = [];
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(QUIZ_FILE, JSON.stringify(this.nominations, null, 2), 'utf-8');
    } catch (err) {
      console.error('[QuizService] Failed to save nominations to disk:', err);
    }
  }

  public saveSubmission(submittedBy: string, rawNominations: QuizNominationItem[]): QuizSubmissionRecord {
    const record: QuizSubmissionRecord = {
      id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      submittedBy: submittedBy.trim() || 'Anonymous Senior',
      submittedAt: new Date().toISOString(),
      nominations: rawNominations.map((n) => ({
        awardId: n.awardId,
        awardTitle: n.awardTitle,
        taggedName: n.taggedName.trim(),
      })).filter((n) => n.taggedName.length > 0),
    };

    this.nominations.unshift(record);
    this.saveToFile();
    return record;
  }

  public getAllSubmissions(): QuizSubmissionRecord[] {
    return this.nominations;
  }

  public getSummaryStats() {
    const totalSubmissions = this.nominations.length;
    const awardLeaderboard: { [awardId: string]: { awardTitle: string; counts: { [name: string]: number } } } = {};

    this.nominations.forEach((sub) => {
      sub.nominations.forEach((nom) => {
        if (!awardLeaderboard[nom.awardId]) {
          awardLeaderboard[nom.awardId] = {
            awardTitle: nom.awardTitle,
            counts: {},
          };
        }
        const nameKey = nom.taggedName.toUpperCase();
        awardLeaderboard[nom.awardId].counts[nameKey] = (awardLeaderboard[nom.awardId].counts[nameKey] || 0) + 1;
      });
    });

    return {
      totalSubmissions,
      awardLeaderboard,
      rawSubmissions: this.nominations,
    };
  }
}

export const quizService = new QuizService();
