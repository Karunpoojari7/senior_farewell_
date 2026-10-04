export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  GENERATE: `${API_BASE_URL}/api/mischief/generate`,
  STATS: `${API_BASE_URL}/api/mischief/stats`,
  HEALTH: `${API_BASE_URL}/health`,
  QUIZ: `${API_BASE_URL}/api/mischief/quiz`,
  ADMIN_NOMINATIONS: `${API_BASE_URL}/api/mischief/admin/nominations`,
};
