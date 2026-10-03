import { create } from 'zustand';
import type { AppStep, GenerationResult } from '../types';
import { FAREWELL_THEMES, BATCH_DETAILS } from '../config/themes';
import { API_ENDPOINTS } from '../config/api.config';

const DEFAULT_MOCK_IMAGE = '/mock-art.svg';

interface MischiefStore {
  step: AppStep;
  seniorName: string;
  selectedFile: File | null;
  previewUrl: string | null;
  isProcessing: boolean;
  result: GenerationResult | null;
  errorMessage: string | null;
  useMock: boolean;
  
  // Actions
  setStep: (step: AppStep) => void;
  setSeniorName: (name: string) => void;
  setSelectedFile: (file: File | null) => void;
  setResult: (result: GenerationResult | null) => void;
  setErrorMessage: (msg: string | null) => void;
  setUseMock: (useMock: boolean) => void;
  resetMischief: () => void;
  processMischief: () => Promise<void>;
}

// User-friendly error message dictionary mapping backend error codes
function mapErrorCodeToMessage(code?: string, fallbackMessage?: string): string {
  switch (code) {
    case 'AI_NOT_CONFIGURED':
      return 'The Mischief Engine is currently being set up by the juniors. Try again in just a moment!';
    case 'AI_RATE_LIMITED':
      return 'Whoa! Many seniors are getting mischiefified simultaneously. Please wait 10 seconds and try again.';
    case 'INVALID_IMAGE':
    case 'INVALID_FILE_TYPE':
      return 'Please upload a clear JPG, PNG, or WEBP photo (up to 10 MB).';
    case 'FILE_TOO_LARGE':
      return 'The photo is too large. Please select a photo smaller than 10 MB.';
    case 'GENERATION_LIMIT_REACHED':
      return 'The mischief machine is taking a little break! All 100 event slots have been minted.';
    case 'AI_GENERATION_FAILED':
    case 'AI_INVALID_RESPONSE':
    default:
      return fallbackMessage || 'The mischief machine had a senior moment 😭 Please try again.';
  }
}

export const useMischiefStore = create<MischiefStore>((set, get) => ({
  step: 'landing',
  seniorName: '',
  selectedFile: null,
  previewUrl: null,
  isProcessing: false,
  result: null,
  errorMessage: null,
  useMock: false,

  setStep: (step) => set({ step }),
  setSeniorName: (seniorName) => set({ seniorName }),

  setSelectedFile: (file) => {
    const prevUrl = get().previewUrl;
    if (prevUrl && prevUrl.startsWith('blob:')) {
      URL.revokeObjectURL(prevUrl);
    }
    
    if (file) {
      const newPreview = URL.createObjectURL(file);
      set({ selectedFile: file, previewUrl: newPreview });
    } else {
      set({ selectedFile: null, previewUrl: null });
    }
  },

  setResult: (result) => set({ result }),
  setErrorMessage: (msg) => set({ errorMessage: msg }),
  setUseMock: (useMock) => set({ useMock }),

  resetMischief: () => {
    const prevUrl = get().previewUrl;
    if (prevUrl && prevUrl.startsWith('blob:')) {
      URL.revokeObjectURL(prevUrl);
    }
    set({
      step: 'upload',
      selectedFile: null,
      previewUrl: null,
      isProcessing: false,
      result: null,
      errorMessage: null
    });
  },

  processMischief: async () => {
    const { selectedFile, previewUrl, useMock } = get();
    if (!selectedFile && !previewUrl) {
      set({ step: 'error', errorMessage: 'No photo selected. Please choose a photo first.' });
      return;
    }

    set({ step: 'processing', isProcessing: true, errorMessage: null });

    // Explicit mock switch
    if (useMock) {
      await simulateMockGeneration(previewUrl || DEFAULT_MOCK_IMAGE);
      return;
    }

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      const response = await fetch(API_ENDPOINTS.GENERATE, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        set({
          step: 'reveal',
          isProcessing: false,
          result: {
            success: true,
            title: data.title,
            caption: data.caption,
            imageUrl: data.imageUrl || previewUrl || DEFAULT_MOCK_IMAGE,
            themeId: data.themeId,
            batchInfo: data.batchInfo || BATCH_DETAILS,
            generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          }
        });
      } else {
        if (data.code === 'GENERATION_LIMIT_REACHED') {
          set({
            step: 'limit_reached',
            isProcessing: false,
            errorMessage: data.message || 'The mischief machine is taking a little break! Generation limit reached.'
          });
        } else {
          const userFriendlyMsg = mapErrorCodeToMessage(data.code, data.message);
          set({
            step: 'error',
            isProcessing: false,
            errorMessage: userFriendlyMsg
          });
        }
      }
    } catch (err) {
      console.warn('[Frontend] Network fetch failed, falling back to local simulation:', err);
      await simulateMockGeneration(previewUrl || DEFAULT_MOCK_IMAGE);
    }
  }
}));

async function simulateMockGeneration(photoPreview: string) {
  // Entertaining 4-second animation duration
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const randomTheme = FAREWELL_THEMES[Math.floor(Math.random() * FAREWELL_THEMES.length)];

  useMischiefStore.setState({
    step: 'reveal',
    isProcessing: false,
    result: {
      success: true,
      title: randomTheme.title,
      caption: randomTheme.caption,
      imageUrl: photoPreview || DEFAULT_MOCK_IMAGE,
      themeId: randomTheme.id,
      batchInfo: BATCH_DETAILS,
      generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  });
}
