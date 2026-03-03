export type NewsType =
  | 'Exhibitions'
  | 'Learning for Children'
  | 'Projects'
  | 'Research'
  | 'Awards'
  | 'Sustainability'
  | 'Culture'
  | 'Urban Design'
  | 'Technology';

import { IMG_NEWS } from '@/lib/images';

export interface NewsArticle {
  id: string;
  slug: string;
  type: NewsType;
  date: string; // ISO YYYY-MM-DD
  readTimeMinutes: number;
  image: string;
  titleKey: string;
  summaryKey: string;
  bodyKey: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  { id: '1', slug: 'living-tech-gallery-hong-kong', type: 'Exhibitions', date: '2026-02-10', readTimeMinutes: 3, image: IMG_NEWS[0], titleKey: 'article1Title', summaryKey: 'article1Summary', bodyKey: 'article1Body' },
  { id: '2', slug: 'bloomberg-hq-sustainability', type: 'Sustainability', date: '2026-02-08', readTimeMinutes: 4, image: IMG_NEWS[1], titleKey: 'article2Title', summaryKey: 'article2Summary', bodyKey: 'article2Body' },
  { id: '3', slug: 'apple-park-ten-years', type: 'Projects', date: '2026-02-05', readTimeMinutes: 5, image: IMG_NEWS[2], titleKey: 'article3Title', summaryKey: 'article3Summary', bodyKey: 'article3Body' },
  { id: '4', slug: 'millau-viaduct-anniversary', type: 'Projects', date: '2026-02-01', readTimeMinutes: 4, image: IMG_NEWS[3], titleKey: 'article4Title', summaryKey: 'article4Summary', bodyKey: 'article4Body' },
  { id: '5', slug: 'children-architecture-workshop', type: 'Learning for Children', date: '2026-01-28', readTimeMinutes: 2, image: IMG_NEWS[4], titleKey: 'article5Title', summaryKey: 'article5Summary', bodyKey: 'article5Body' },
  { id: '6', slug: 'masdar-city-phase-two', type: 'Urban Design', date: '2026-01-25', readTimeMinutes: 5, image: IMG_NEWS[5], titleKey: 'article6Title', summaryKey: 'article6Summary', bodyKey: 'article6Body' },
  { id: '7', slug: 'riba-award-winners', type: 'Awards', date: '2026-01-20', readTimeMinutes: 3, image: IMG_NEWS[6], titleKey: 'article7Title', summaryKey: 'article7Summary', bodyKey: 'article7Body' },
  { id: '8', slug: 'digital-fabrication-lab', type: 'Technology', date: '2026-01-15', readTimeMinutes: 4, image: IMG_NEWS[7], titleKey: 'article8Title', summaryKey: 'article8Summary', bodyKey: 'article8Body' },
  { id: '9', slug: 'reichstag-dome-restoration', type: 'Culture', date: '2026-01-10', readTimeMinutes: 4, image: IMG_NEWS[8], titleKey: 'article9Title', summaryKey: 'article9Summary', bodyKey: 'article9Body' },
  { id: '10', slug: 'comcast-center-philadelphia', type: 'Projects', date: '2026-01-05', readTimeMinutes: 3, image: IMG_NEWS[9], titleKey: 'article10Title', summaryKey: 'article10Summary', bodyKey: 'article10Body' },
  { id: '11', slug: 'lusail-stadium-legacy', type: 'Projects', date: '2025-12-20', readTimeMinutes: 5, image: IMG_NEWS[10], titleKey: 'article11Title', summaryKey: 'article11Summary', bodyKey: 'article11Body' },
  { id: '12', slug: 'battersea-power-station-open', type: 'Projects', date: '2025-12-15', readTimeMinutes: 4, image: IMG_NEWS[11], titleKey: 'article12Title', summaryKey: 'article12Summary', bodyKey: 'article12Body' },
  { id: '13', slug: 'hk-airport-expansion', type: 'Projects', date: '2025-12-10', readTimeMinutes: 4, image: IMG_NEWS[12], titleKey: 'article13Title', summaryKey: 'article13Summary', bodyKey: 'article13Body' },
  { id: '14', slug: 'sainsbury-centre-anniversary', type: 'Culture', date: '2025-12-05', readTimeMinutes: 3, image: IMG_NEWS[13], titleKey: 'article14Title', summaryKey: 'article14Summary', bodyKey: 'article14Body' },
  { id: '15', slug: 'net-zero-research', type: 'Research', date: '2025-11-28', readTimeMinutes: 5, image: IMG_NEWS[14], titleKey: 'article15Title', summaryKey: 'article15Summary', bodyKey: 'article15Body' },
  { id: '16', slug: 'school-design-competition', type: 'Learning for Children', date: '2025-11-20', readTimeMinutes: 2, image: IMG_NEWS[15], titleKey: 'article16Title', summaryKey: 'article16Summary', bodyKey: 'article16Body' },
  { id: '17', slug: 'space-house-restoration', type: 'Projects', date: '2025-11-15', readTimeMinutes: 3, image: IMG_NEWS[16], titleKey: 'article17Title', summaryKey: 'article17Summary', bodyKey: 'article17Body' },
  { id: '18', slug: 'willis-building-heritage', type: 'Culture', date: '2025-11-10', readTimeMinutes: 4, image: IMG_NEWS[17], titleKey: 'article18Title', summaryKey: 'article18Summary', bodyKey: 'article18Body' },
  { id: '19', slug: 'beijing-airport-terminal', type: 'Projects', date: '2025-11-05', readTimeMinutes: 4, image: IMG_NEWS[18], titleKey: 'article19Title', summaryKey: 'article19Summary', bodyKey: 'article19Body' },
  { id: '20', slug: 'zayed-museum-opening', type: 'Culture', date: '2025-10-30', readTimeMinutes: 4, image: IMG_NEWS[19], titleKey: 'article20Title', summaryKey: 'article20Summary', bodyKey: 'article20Body' },
  { id: '21', slug: 'riverside-south-masterplan', type: 'Urban Design', date: '2025-10-25', readTimeMinutes: 5, image: IMG_NEWS[20], titleKey: 'article21Title', summaryKey: 'article21Summary', bodyKey: 'article21Body' },
  { id: '22', slug: 'wtc-tower-two', type: 'Projects', date: '2025-10-20', readTimeMinutes: 4, image: IMG_NEWS[21], titleKey: 'article22Title', summaryKey: 'article22Summary', bodyKey: 'article22Body' },
  { id: '23', slug: 'songdo-ibd-update', type: 'Urban Design', date: '2025-10-15', readTimeMinutes: 5, image: IMG_NEWS[22], titleKey: 'article23Title', summaryKey: 'article23Summary', bodyKey: 'article23Body' },
  { id: '24', slug: 'carre-art-nimes', type: 'Culture', date: '2025-10-10', readTimeMinutes: 3, image: IMG_NEWS[23], titleKey: 'article24Title', summaryKey: 'article24Summary', bodyKey: 'article24Body' },
  { id: '25', slug: 'young-architects-programme', type: 'Learning for Children', date: '2025-10-05', readTimeMinutes: 3, image: IMG_NEWS[24], titleKey: 'article25Title', summaryKey: 'article25Summary', bodyKey: 'article25Body' },
  { id: '26', slug: 'biophilic-design-study', type: 'Research', date: '2025-09-28', readTimeMinutes: 4, image: IMG_NEWS[25], titleKey: 'article26Title', summaryKey: 'article26Summary', bodyKey: 'article26Body' },
  { id: '27', slug: 'aia-honor-award', type: 'Awards', date: '2025-09-20', readTimeMinutes: 2, image: IMG_NEWS[26], titleKey: 'article27Title', summaryKey: 'article27Summary', bodyKey: 'article27Body' },
  { id: '28', slug: 'carbon-neutral-offices', type: 'Sustainability', date: '2025-09-15', readTimeMinutes: 5, image: IMG_NEWS[27], titleKey: 'article28Title', summaryKey: 'article28Summary', bodyKey: 'article28Body' },
  { id: '29', slug: 'parametric-facades', type: 'Technology', date: '2025-09-10', readTimeMinutes: 4, image: IMG_NEWS[28], titleKey: 'article29Title', summaryKey: 'article29Summary', bodyKey: 'article29Body' },
  { id: '30', slug: 'workplace-wellbeing-report', type: 'Research', date: '2025-09-05', readTimeMinutes: 3, image: IMG_NEWS[29], titleKey: 'article30Title', summaryKey: 'article30Summary', bodyKey: 'article30Body' },
];

export const NEWS_BY_SLUG = new Map(NEWS_ARTICLES.map((a) => [a.slug, a]));
export const NEWS_TYPES: NewsType[] = ['Exhibitions', 'Learning for Children', 'Projects', 'Research', 'Awards', 'Sustainability', 'Culture', 'Urban Design', 'Technology'];
