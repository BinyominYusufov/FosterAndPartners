'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en/common.json';
import ru from '../public/locales/ru/common.json';
import tj from '../public/locales/tj/common.json';
import cn from '../public/locales/cn/common.json';
import enProjects from '../public/locales/en/projects.json';
import ruProjects from '../public/locales/ru/projects.json';
import tjProjects from '../public/locales/tj/projects.json';
import cnProjects from '../public/locales/cn/projects.json';
import enPeople from '../public/locales/en/people.json';
import ruPeople from '../public/locales/ru/people.json';
import tjPeople from '../public/locales/tj/people.json';
import cnPeople from '../public/locales/cn/people.json';
import enNews from '../public/locales/en/news.json';
import ruNews from '../public/locales/ru/news.json';
import tjNews from '../public/locales/tj/news.json';
import cnNews from '../public/locales/cn/news.json';
import enInsights from '../public/locales/en/insights.json';
import ruInsights from '../public/locales/ru/insights.json';
import tjInsights from '../public/locales/tj/insights.json';
import cnInsights from '../public/locales/cn/insights.json';
import { LANGUAGE_STORAGE_KEY, isSupportedLanguage } from '@/lib/languages';

export const LANG_STORAGE_KEY = LANGUAGE_STORAGE_KEY;
export const SUPPORTED_LANGS = ['en', 'ru', 'tj', 'cn'] as const;

export function getStoredLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  return stored && isSupportedLanguage(stored) ? stored : 'en';
}

const resources = {
  en: {
    translation: { ...en, projects: enProjects, people: enPeople, news: enNews, insights: enInsights },
    news: enNews,
    insights: enInsights,
  },
  ru: {
    translation: { ...ru, projects: ruProjects, people: ruPeople, news: ruNews, insights: ruInsights },
    news: ruNews,
    insights: ruInsights,
  },
  tj: {
    translation: { ...tj, projects: tjProjects, people: tjPeople, news: tjNews, insights: tjInsights },
    news: tjNews,
    insights: tjInsights,
  },
  cn: {
    translation: { ...cn, projects: cnProjects, people: cnPeople, news: cnNews, insights: cnInsights },
    news: cnNews,
    insights: cnInsights,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    defaultNS: 'translation',
    ns: ['translation', 'news', 'insights'],
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGS],
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
    saveMissing: false,
  });
  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANG_STORAGE_KEY, lng);
    }
  });
}

export default i18n;
