'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import menu1 from '@/public/1.png';
import menu2 from '@/public/2.png';
import menu3 from '@/public/3.png';
import menu4 from '@/public/4.png';
import menu5 from '@/public/5.png';
import menu6 from '@/public/6.png';
import menu7 from '@/public/7.png';
import menu8 from '@/public/8.png';

const menuItems: { key: string; image: import('next/image').StaticImageData; href: string }[] = [
  { key: 'expertise', image: menu1, href: '/expertise' },
  { key: 'projects', image: menu2, href: '/projects' },
  { key: 'studio', image: menu3, href: '/' },
  { key: 'people', image: menu4, href: '/people' },
  { key: 'news', image: menu5, href: '/news' },
  { key: 'insights', image: menu6, href: '/insights' },
  { key: 'careers', image: menu7, href: '/careers' },
  { key: 'contact', image: menu8, href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(menuItems[0].key);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isHome = pathname === '/';

  useEffect(() => {
    if (menuOpen) {
      const id = requestAnimationFrame(() => setMenuVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setMenuVisible(false);
    }
  }, [menuOpen]);

  const handleCloseMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 700);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = menuItems.find((item) => item.key === hoveredKey) ?? menuItems[0];

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-8 lg:px-12 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isHome ? 'bg-black/30 text-white' : 'bg-black/10 text-neutral-900'}`}
      >
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] hover:opacity-90">
          {t('brand')}
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher />
          <button type="button" aria-label={t('header.search')} className="opacity-80 hover:opacity-100">
            <Search className="h-5 w-5" />
          </button>
          <Button variant="ghost" size="icon" aria-label={t('header.openMenu')} onClick={() => setMenuOpen(true)} className={isHome ? '' : 'text-black hover:bg-black/5'}>
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 overflow-hidden">
          <div
            className="absolute inset-0 flex transition-[clip-path] duration-700 ease-out"
            style={{
              clipPath: menuVisible ? 'circle(150vmax at 100% 0%)' : 'circle(0% at 100% 0%)',
            }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseMenu}
              aria-hidden
            />
            <div className="relative hidden flex-1 overflow-hidden lg:block">
              <Image src={activeItem.image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>
            <div className="relative flex h-full w-full max-w-[520px] flex-col bg-white text-black shadow-2xl">
              <button
                type="button"
                aria-label={t('header.closeMenu')}
                className="absolute right-6 top-6 z-10 text-black/60 hover:text-black"
                onClick={handleCloseMenu}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex min-h-screen flex-col justify-between px-10 py-12">
                <nav className="space-y-1 text-2xl font-light md:text-3xl">
                  {menuItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onMouseEnter={() => setHoveredKey(item.key)}
                      onClick={handleCloseMenu}
                      className={`block w-full py-2 text-left transition-colors ${
                        hoveredKey === item.key ? 'text-black' : 'text-zinc-400 hover:text-black'
                      }`}
                    >
                      {t(`menu.${item.key}`)}
                    </Link>
                  ))}
                </nav>
                <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <Link href="/legal" className="hover:text-zinc-700">
                    {t('footer.legal')}
                  </Link>
                  <span>© {new Date().getFullYear()} {t('brand')}.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
