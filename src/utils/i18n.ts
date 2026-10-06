import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import mr from '../i18n/mr.json';

export type SupportedLanguage = 'en' | 'hi' | 'mr';

export const translations = {
  en,
  hi,
  mr
};

export const defaultLang: SupportedLanguage = 'en';

export const languageNames: Record<SupportedLanguage, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  mr: { name: 'Marathi', nativeName: 'मराठी' }
};

/**
 * Get translation dictionary for language code.
 */
export function getTranslations(lang: SupportedLanguage = defaultLang) {
  return translations[lang] || translations.en;
}
