'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { ReactNode } from 'react';
import i18n, { getStoredLanguage } from '../i18n/config';

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored && i18n.language !== stored) {
      i18n.changeLanguage(stored);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

