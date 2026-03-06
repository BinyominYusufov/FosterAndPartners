/** Country code for local flag image in /flags/{code}.svg */
export const languages = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧', flagCountry: 'gb' },
  { code: 'ru', label: 'Russian', short: 'RU', flag: '🇷🇺', flagCountry: 'ru' },
  { code: 'tj', label: 'Tajik', short: 'TJ', flag: '🇹🇯', flagCountry: 'tj' },
  { code: 'cn', label: 'Chinese', short: 'CN', flag: '🇨🇳', flagCountry: 'cn' },
] as const;

/** Path to local flag image (in public/flags). Always use this so flags load without external CDN. */
export function getFlagPath(countryCode: string): string {
  return `/flags/${countryCode}.svg`;
}

export type Language = (typeof languages)[number];

export const LANGUAGE_STORAGE_KEY = 'language';

export function getStoredLanguageKey(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
}

export const languageCodes = languages.map((l) => l.code);
export const isSupportedLanguage = (code: string): code is Language['code'] =>
  languageCodes.includes(code as Language['code']);
