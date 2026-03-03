'use client';

import { useTranslation } from 'react-i18next';

const languages: { code: 'en' | 'ru' | 'tj'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'tj', label: 'TJ' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase">
      {languages.map(({ code, label }) => {
        const isActive = i18n.language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => i18n.changeLanguage(code)}
            className={`transition-colors ${
              isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

