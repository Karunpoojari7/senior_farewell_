import type { QuizSubmissionRecord } from '../types';
import { QUIZ_QUESTIONS } from '../config/quizQuestions';

const STORAGE_KEY = 'mca_quiz_submissions_v1';

export const getLocalSubmissions = (): QuizSubmissionRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Error reading local submissions:', err);
    return [];
  }
};

export const saveLocalSubmission = (submission: QuizSubmissionRecord): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalSubmissions();
    const filtered = current.filter((s) => s.id !== submission.id);
    filtered.unshift(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('[Storage] Error saving local submission:', err);
  }
};

export const clearLocalSubmissions = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export const computeLeaderboardFromSubmissions = (
  submissions: QuizSubmissionRecord[]
): {
  totalSubmissions: number;
  awardLeaderboard: {
    [awardId: string]: {
      awardTitle: string;
      counts: { [taggedName: string]: number };
    };
  };
  rawSubmissions: QuizSubmissionRecord[];
} => {
  const awardLeaderboard: {
    [awardId: string]: {
      awardTitle: string;
      counts: { [taggedName: string]: number };
    };
  } = {};

  // Initialize all questions
  QUIZ_QUESTIONS.forEach((q) => {
    awardLeaderboard[q.id] = {
      awardTitle: `${q.emoji} ${q.title}`,
      counts: {},
    };
  });

  // Aggregate counts
  submissions.forEach((sub) => {
    sub.nominations.forEach((nom) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === nom.awardId);
      const title = q ? `${q.emoji} ${q.title}` : nom.awardTitle;

      if (!awardLeaderboard[nom.awardId]) {
        awardLeaderboard[nom.awardId] = {
          awardTitle: title,
          counts: {},
        };
      }

      const cleanName = (nom.taggedName || '').trim();
      if (!cleanName) return;

      // Normalize casing nicely (Title Case or uppercase key for grouping)
      const normalizedKey = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      awardLeaderboard[nom.awardId].counts[normalizedKey] =
        (awardLeaderboard[nom.awardId].counts[normalizedKey] || 0) + 1;
    });
  });

  return {
    totalSubmissions: submissions.length,
    awardLeaderboard,
    rawSubmissions: submissions,
  };
};

export const seedSampleNominations = (): QuizSubmissionRecord[] => {
  const sampleData: QuizSubmissionRecord[] = [
    {
      id: 'quiz_seed_1',
      submittedBy: 'Karun Poojari',
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      nominations: [
        { awardId: 'award-1', awardTitle: '🏆 5 Minutes Away Since 2023', taggedName: 'Sakshi' },
        { awardId: 'award-2', awardTitle: '☕ Chai Is My Operating System', taggedName: 'Gowthami' },
        { awardId: 'award-3', awardTitle: '📱 Online Everywhere Except Class', taggedName: 'Jeevan' },
        { awardId: 'award-4', awardTitle: '😂 Certified Bakchodi Specialist', taggedName: 'Jeevan' },
        { awardId: 'award-5', awardTitle: '🧠 Google, But Make It Human', taggedName: 'Preetham' },
        { awardId: 'award-6', awardTitle: '💻 Ctrl+C Ctrl+V Hall of Fame', taggedName: 'Misba' },
        { awardId: 'award-7', awardTitle: '🎬 Main Character Since Day 1', taggedName: 'Sakshi' },
        { awardId: 'award-8', awardTitle: '🗣️ One Last Thing… (45 Minutes Later)', taggedName: 'Gowthami' },
        { awardId: 'award-9', awardTitle: '💃 Music Started, Dignity Departed', taggedName: 'Jeevan' },
        { awardId: 'award-10', awardTitle: '🎓 Survived MCA Somehow', taggedName: 'All MCA Legends' },
      ],
    },
    {
      id: 'quiz_seed_2',
      submittedBy: 'Preetham',
      submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      nominations: [
        { awardId: 'award-1', awardTitle: '🏆 5 Minutes Away Since 2023', taggedName: 'Sakshi' },
        { awardId: 'award-2', awardTitle: '☕ Chai Is My Operating System', taggedName: 'Gowthami' },
        { awardId: 'award-3', awardTitle: '📱 Online Everywhere Except Class', taggedName: 'Karthik' },
        { awardId: 'award-4', awardTitle: '😂 Certified Bakchodi Specialist', taggedName: 'Jeevan' },
        { awardId: 'award-5', awardTitle: '🧠 Google, But Make It Human', taggedName: 'Karun' },
        { awardId: 'award-6', awardTitle: '💻 Ctrl+C Ctrl+V Hall of Fame', taggedName: 'Naveen' },
        { awardId: 'award-7', awardTitle: '🎬 Main Character Since Day 1', taggedName: 'Ananya' },
        { awardId: 'award-8', awardTitle: '🗣️ One Last Thing… (45 Minutes Later)', taggedName: 'Varun' },
        { awardId: 'award-9', awardTitle: '💃 Music Started, Dignity Departed', taggedName: 'Sakshi' },
        { awardId: 'award-10', awardTitle: '🎓 Survived MCA Somehow', taggedName: 'Batch of 2026' },
      ],
    },
    {
      id: 'quiz_seed_3',
      submittedBy: 'Gowthami',
      submittedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      nominations: [
        { awardId: 'award-1', awardTitle: '🏆 5 Minutes Away Since 2023', taggedName: 'Jeevan' },
        { awardId: 'award-2', awardTitle: '☕ Chai Is My Operating System', taggedName: 'Karun' },
        { awardId: 'award-3', awardTitle: '📱 Online Everywhere Except Class', taggedName: 'Misba' },
        { awardId: 'award-4', awardTitle: '😂 Certified Bakchodi Specialist', taggedName: 'Jeevan' },
        { awardId: 'award-5', awardTitle: '🧠 Google, But Make It Human', taggedName: 'Preetham' },
        { awardId: 'award-6', awardTitle: '💻 Ctrl+C Ctrl+V Hall of Fame', taggedName: 'Misba' },
        { awardId: 'award-7', awardTitle: '🎬 Main Character Since Day 1', taggedName: 'Sakshi' },
        { awardId: 'award-8', awardTitle: '🗣️ One Last Thing… (45 Minutes Later)', taggedName: 'Gowthami' },
        { awardId: 'award-9', awardTitle: '💃 Music Started, Dignity Departed', taggedName: 'Jeevan' },
        { awardId: 'award-10', awardTitle: '🎓 Survived MCA Somehow', taggedName: 'MCA Class of 2026' },
      ],
    }
  ];

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  }
  return sampleData;
};

export const exportToCSV = (submissions: QuizSubmissionRecord[]): void => {
  const { awardLeaderboard } = computeLeaderboardFromSubmissions(submissions);

  const rows: string[][] = [
    ['MCA FAREWELL 2026 - AWARDS NOMINATIONS REPORT'],
    [`Generated At: ${new Date().toLocaleString()}`],
    [`Total Submissions: ${submissions.length}`],
    [],
    ['AWARD CATEGORY', 'NOMINATED CANDIDATE', 'VOTE COUNT', 'RANK'],
  ];

  QUIZ_QUESTIONS.forEach((q) => {
    const data = awardLeaderboard[q.id];
    const counts = data?.counts || {};
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) {
      rows.push([`${q.emoji} ${q.title}`, 'No Nominations', '0', '-']);
    } else {
      sorted.forEach(([name, count], index) => {
        rows.push([
          index === 0 ? `${q.emoji} ${q.title}` : '',
          name,
          count.toString(),
          index === 0 ? '👑 WINNER' : `#${index + 1}`,
        ]);
      });
    }
    rows.push([]);
  });

  // Raw submissions section
  rows.push(['--- DETAILED VOTING LOG ---']);
  rows.push(['Submission ID', 'Submitted By', 'Timestamp', 'Award Title', 'Nominated Name']);
  submissions.forEach((sub) => {
    sub.nominations.forEach((nom) => {
      rows.push([sub.id, sub.submittedBy, sub.submittedAt, nom.awardTitle, nom.taggedName]);
    });
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    rows.map((e) => e.map((val) => `"${(val || '').replace(/"/g, '""')}"`).join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `MCA_Farewell_Awards_Report_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (submissions: QuizSubmissionRecord[]): void => {
  const summary = computeLeaderboardFromSubmissions(submissions);
  const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(summary, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', jsonStr);
  link.setAttribute('download', `MCA_Farewell_Database_Backup_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
