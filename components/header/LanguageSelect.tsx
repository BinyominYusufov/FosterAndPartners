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

export function LanguageSelect() {
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
          'flex items-center gap-2 rounded-full border-2 border-neutral-400 bg-white px-3 py-2 text-sm font-medium text-black transition',
          'hover:bg-neutral-100 hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2'
        )}
      >
        <span className="relative flex h-5 w-7 shrink-0 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
          <Image
            src={getFlagPath(current.flagCountry)}
            alt=""
            fill
            className="object-cover"
            sizes="28px"
            unoptimized
          />
        </span>
        <span className="min-w-[1.5rem] text-left">{current.short}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-black transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <div
        role="listbox"
        aria-label="Language options"
        className={cn(
          'absolute right-0 top-full z-[60] mt-2 min-w-[200px] rounded-lg border-2 border-neutral-300 bg-white py-2 shadow-xl transition-all duration-200',
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
              'flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-black transition-colors',
              'hover:bg-neutral-100',
              currentCode === lang.code && 'bg-neutral-100'
            )}
          >
            <span className="relative flex h-5 w-7 shrink-0 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
              <Image
                src={getFlagPath(lang.flagCountry)}
                alt=""
                fill
                className="object-cover"
                sizes="28px"
                unoptimized
              />
            </span>
            <span>
              {lang.label} ({lang.short})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
