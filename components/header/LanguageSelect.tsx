'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { languages, LANGUAGE_STORAGE_KEY, isSupportedLanguage, getFlagPath } from '@/lib/languages';
import { cn } from '@/lib/utils';

function normalizeLanguageCode(code: string): string {
  if (isSupportedLanguage(code)) return code;
  if (code.startsWith('zh')) return 'cn';
  return 'en';
}

export function LanguageSelect({ isDark = false }: { isDark?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCode = normalizeLanguageCode(i18n.language);
  const current = languages.find((l) => l.code === currentCode) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    }
    setOpen(false);
  };

  return (
    <div className="relative z-[60]" ref={ref}>
      <button
        type="button"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-normal transition-opacity hover:opacity-80',
          isDark
            ? 'text-white/90 hover:text-white'
            : 'text-neutral-500 hover:text-neutral-700'
        )}
      >
        <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-[3px]">
          <Image
            src={getFlagPath(current.flagCountry)}
            alt=""
            fill
            className="object-cover"
            sizes="20px"
            unoptimized
          />
        </span>
        <span className="min-w-[1.25rem]">{current.short}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <div
        role="listbox"
        aria-label="Language options"
        className={cn(
          'absolute right-0 top-full z-[60] mt-1.5 min-w-[160px] rounded-lg border border-neutral-100 bg-white/95 py-1 shadow-lg backdrop-blur-sm transition-all duration-200',
          open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            role="option"
            aria-selected={currentCode === lang.code}
            onClick={() => handleSelect(lang.code)}
            className={cn(
              'flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors',
              'hover:bg-neutral-50',
              currentCode === lang.code ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-600'
            )}
          >
            <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-[3px]">
              <Image
                src={getFlagPath(lang.flagCountry)}
                alt=""
                fill
                className="object-cover"
                sizes="20px"
                unoptimized
              />
            </span>
            <span>{lang.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
