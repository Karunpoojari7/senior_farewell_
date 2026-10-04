export interface MischiefTheme {
  id: string;
  title: string;
  caption: string;
  mood: string;
  accessories: string[];
  environment: string;
  visualStyle: string;
  accentColor?: string;
  badgeEmoji?: string;
}

export type AppStep =
  | 'landing'
  | 'upload'
  | 'processing'
  | 'reveal'
  | 'quiz'
  | 'invitation'
  | 'admin'
  | 'error'
  | 'limit_reached';

export interface GenerationResult {
  success: boolean;
  title: string;
  caption: string;
  imageUrl: string;
  themeId?: string;
  seniorName?: string;
  generatedAt?: string;
  batchInfo?: {
    batch: string;
    department: string;
    university: string;
  };
  code?: string;
  message?: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  emoji: string;
  title: string;
  tagline: string;
}

export interface QuizNominationPayload {
  awardId: string;
  awardTitle: string;
  taggedName: string;
}

export interface QuizSubmissionRecord {
  id: string;
  submittedBy: string;
  submittedAt: string;
  nominations: QuizNominationPayload[];
}
