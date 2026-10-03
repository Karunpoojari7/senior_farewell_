import { FAREWELL_THEMES, MischiefTheme } from '../config/themes.js';

export interface BuiltPromptResult {
  theme: MischiefTheme;
  systemInstruction: string;
  promptText: string;
}

/**
 * Dedicated prompt builder for Senior Mischief Gemini AI caricature transformation
 */
export function buildMischiefPrompt(theme: MischiefTheme): string {
  return `You are creating an official digital caricature for a university farewell keepsake.

TASK:
Transform the provided senior photograph into a polished, humorous, and celebratory cartoon caricature illustration based on the "${theme.title}" theme.

CORE IDENTITY PRESERVATION REQUIREMENTS:
1. Recognize and preserve the person's unique facial identity, distinctive facial proportions, smile/expression, eye shape, and skin tone.
2. Preserve their hairstyle, facial hair, and glasses (if present in the photo) where practical.
3. The senior MUST instantly recognize themselves in the caricature illustration.
4. Do NOT replace the person with a completely different person or fake celebrity identity.

THEME INTEGRATION:
- Theme: ${theme.title}
- Theme Mood: ${theme.mood}
- Key Accessories to illustrate: ${theme.accessories.join(', ')}
- Environmental Background: ${theme.environment}
- Visual Style: ${theme.visualStyle}

SAFETY & FORMAT CONSTRAINTS:
1. Make the artwork celebratory, positive, and humorous — suitable for a prestigious university farewell.
2. Strictly avoid any offensive, hateful, sexualized, violent, or humiliating depictions.
3. CRITICAL: Do NOT generate text, words, labels, logos, watermarks, titles, or captions anywhere inside the artwork. All typography will be rendered by the application UI.`;
}

class ThemeService {
  /**
   * Randomly selects one theme from the farewell collection
   */
  public getRandomTheme(): MischiefTheme {
    const randomIndex = Math.floor(Math.random() * FAREWELL_THEMES.length);
    return FAREWELL_THEMES[randomIndex];
  }

  /**
   * Gets a specific theme by ID (e.g. 'tech-wizard' for single generation test)
   */
  public getThemeById(id: string): MischiefTheme {
    const found = FAREWELL_THEMES.find((t) => t.id === id);
    return found || FAREWELL_THEMES[0];
  }

  /**
   * Constructs the structured AI prompt based on the selected theme
   */
  public buildPrompt(theme: MischiefTheme): BuiltPromptResult {
    const systemInstruction = `You are a world-class caricature and cartoon artist creating university farewell illustrations. Preserve the subject's recognizable facial identity. Do not render text, words, logos, or watermarks inside images.`;
    const promptText = buildMischiefPrompt(theme);

    return {
      theme,
      systemInstruction,
      promptText
    };
  }
}

export const themeService = new ThemeService();
