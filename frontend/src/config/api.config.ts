export const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('mischief_backend_url');
    if (custom && custom.trim().length > 0) {
      return custom.trim().replace(/\/+$/, '');
    }
  }
  return (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
};

export const setCustomApiBaseUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    if (url && url.trim().length > 0) {
      localStorage.setItem('mischief_backend_url', url.trim().replace(/\/+$/, ''));
    } else {
      localStorage.removeItem('mischief_backend_url');
    }
  }
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  get GENERATE() {
    return `${getApiBaseUrl()}/api/mischief/generate`;
  },
  get STATS() {
    return `${getApiBaseUrl()}/api/mischief/stats`;
  },
  get HEALTH() {
    return `${getApiBaseUrl()}/health`;
  },
  get QUIZ() {
    return `${getApiBaseUrl()}/api/mischief/quiz`;
  },
  get ADMIN_NOMINATIONS() {
    return `${getApiBaseUrl()}/api/mischief/admin/nominations`;
  },
};

