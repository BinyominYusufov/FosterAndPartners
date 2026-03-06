import { IMG_EXPERTISE, IMG_MISC } from '@/lib/images';

export interface StudioItem {
  id: string;
  titleKey: string;
  slug: string;
  image: string;
  descriptionKey: string;
  /** Existing route (e.g. /careers/life) or /studio/[slug] for new pages */
  route: string;
}

/**
 * Studio cards for home page.
 * - If a page already exists (careers/life, careers/vacancies), route points there.
 * - If no page exists (about, edi, csr, global), route is /studio/[slug].
 */
export const studioItems: StudioItem[] = [
  {
    id: 'about',
    titleKey: 'about',
    slug: 'about',
    image: IMG_EXPERTISE.studioAbout,
    descriptionKey: 'aboutDesc',
    route: '/studio/about',
  },
  {
    id: 'life',
    titleKey: 'life',
    slug: 'life',
    image: IMG_EXPERTISE.lifeAtFoster,
    descriptionKey: 'lifeDesc',
    route: '/careers/life',
  },
  {
    id: 'vacancies',
    titleKey: 'vacancies',
    slug: 'vacancies',
    image: IMG_MISC.studioVacancies,
    descriptionKey: 'vacanciesDesc',
    route: '/careers/vacancies',
  },
  {
    id: 'edi',
    titleKey: 'edi',
    slug: 'equity-diversity-and-inclusion',
    image: IMG_EXPERTISE.equityDiversity,
    descriptionKey: 'ediDesc',
    route: '/studio/equity-diversity-and-inclusion',
  },
  {
    id: 'csr',
    titleKey: 'csr',
    slug: 'corporate-social-responsibility',
    image: IMG_EXPERTISE.architecture,
    descriptionKey: 'csrDesc',
    route: '/studio/corporate-social-responsibility',
  },
  {
    id: 'global',
    titleKey: 'global',
    slug: 'global-studios',
    image: IMG_EXPERTISE.globalStudio,
    descriptionKey: 'globalDesc',
    route: '/studio/global-studios',
  },
];

export function getStudioItemById(id: string): StudioItem | undefined {
  return studioItems.find((item) => item.id === id);
}

export function getStudioItemBySlug(slug: string): StudioItem | undefined {
  return studioItems.find((item) => item.slug === slug);
}
