'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Linkedin,
  Globe,
  Youtube,
  Share2,
  MessageCircle,
  ArrowUpToLine,
} from 'lucide-react';

const footerNavKeys = ['projects', 'expertise', 'studio', 'news', 'careers', 'contact'] as const;

const socialLinks = [
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Share2, label: 'Share' },
  { href: '#', icon: Globe, label: 'Website' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  { href: '#', icon: MessageCircle, label: 'Contact' },
];

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-dashed border-white/20 bg-[#0f0f0f] px-6 py-12 md:px-8 lg:px-12">
      {/* Top row: Brand + Nav | Social + Back to top */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold text-white md:text-2xl">
            {t('brand')}
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNavKeys.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="text-sm text-white/90 transition-colors hover:text-white"
              >
                {t(`menu.${key}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-white transition-colors hover:text-white/80"
          >
            {t('footer.backToTop')}
            <ArrowUpToLine className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legal row */}
      <div className="mt-10 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-end">
        <Link href="/legal" className="text-sm text-white/70 hover:text-white">
          {t('footer.legal')}
        </Link>
        <span className="hidden text-white/40 lg:inline">|</span>
        <span className="text-sm text-white/70">
          © {new Date().getFullYear()} {t('brand')}. {t('footer.rights')}
        </span>
      </div>
    </footer>
  );
}
