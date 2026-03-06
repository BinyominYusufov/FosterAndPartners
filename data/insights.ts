import { IMG_INSIGHTS, IMG_NEWS, IMG_PROJECTS } from '@/lib/images';

export const INSIGHTS_CARDS = [
  {
    key: 'plusJournal',
    titleKey: 'plusJournal',
    descriptionKey: 'plusJournalDesc',
    href: '/insights/plus-journal',
    image: IMG_INSIGHTS.plusJournal,
  },
  {
    key: 'publications',
    titleKey: 'publications',
    descriptionKey: 'publicationsDesc',
    href: '/insights/publications',
    image: IMG_INSIGHTS.publications,
  },
] as const;

// Plus Journal: 30 articles (slug, date, readTime, image, titleKey, summaryKey, bodyKey)
export interface PlusJournalArticle {
  id: string;
  slug: string;
  date: string;
  readTimeMinutes: number;
  authorsKey: string;
  image: string;
  titleKey: string;
  summaryKey: string;
  bodyKey: string;
}

export const PLUS_JOURNAL_ARTICLES: PlusJournalArticle[] = [
  { id: '1', slug: 'architecture-of-atmosphere-football-stadiums', date: '2025-10-14', readTimeMinutes: 15, authorsKey: 'authors1', image: IMG_NEWS[0], titleKey: 'pj1Title', summaryKey: 'pj1Summary', bodyKey: 'pj1Body' },
  { id: '2', slug: 'future-of-tall-buildings', date: '2025-10-10', readTimeMinutes: 12, authorsKey: 'authors2', image: IMG_NEWS[1], titleKey: 'pj2Title', summaryKey: 'pj2Summary', bodyKey: 'pj2Body' },
  { id: '3', slug: 'biophilic-design-workplace', date: '2025-10-05', readTimeMinutes: 8, authorsKey: 'authors3', image: IMG_NEWS[2], titleKey: 'pj3Title', summaryKey: 'pj3Summary', bodyKey: 'pj3Body' },
  { id: '4', slug: 'sustainable-materials-innovation', date: '2025-09-28', readTimeMinutes: 10, authorsKey: 'authors4', image: IMG_NEWS[3], titleKey: 'pj4Title', summaryKey: 'pj4Summary', bodyKey: 'pj4Body' },
  { id: '5', slug: 'urban-mobility-next-generation', date: '2025-09-22', readTimeMinutes: 11, authorsKey: 'authors5', image: IMG_NEWS[4], titleKey: 'pj5Title', summaryKey: 'pj5Summary', bodyKey: 'pj5Body' },
  { id: '6', slug: 'digital-twin-construction', date: '2025-09-15', readTimeMinutes: 9, authorsKey: 'authors6', image: IMG_NEWS[5], titleKey: 'pj6Title', summaryKey: 'pj6Summary', bodyKey: 'pj6Body' },
  { id: '7', slug: 'cultural-heritage-adaptation', date: '2025-09-10', readTimeMinutes: 14, authorsKey: 'authors7', image: IMG_NEWS[6], titleKey: 'pj7Title', summaryKey: 'pj7Summary', bodyKey: 'pj7Body' },
  { id: '8', slug: 'net-zero-airports', date: '2025-09-05', readTimeMinutes: 13, authorsKey: 'authors8', image: IMG_NEWS[7], titleKey: 'pj8Title', summaryKey: 'pj8Summary', bodyKey: 'pj8Body' },
  { id: '9', slug: 'residential-density-quality', date: '2025-08-28', readTimeMinutes: 10, authorsKey: 'authors9', image: IMG_NEWS[8], titleKey: 'pj9Title', summaryKey: 'pj9Summary', bodyKey: 'pj9Body' },
  { id: '10', slug: 'light-structure-innovation', date: '2025-08-20', readTimeMinutes: 8, authorsKey: 'authors10', image: IMG_NEWS[9], titleKey: 'pj10Title', summaryKey: 'pj10Summary', bodyKey: 'pj10Body' },
  { id: '11', slug: 'masterplanning-climate-resilience', date: '2025-08-15', readTimeMinutes: 15, authorsKey: 'authors11', image: IMG_NEWS[10], titleKey: 'pj11Title', summaryKey: 'pj11Summary', bodyKey: 'pj11Body' },
  { id: '12', slug: 'museum-experience-design', date: '2025-08-10', readTimeMinutes: 9, authorsKey: 'authors12', image: IMG_NEWS[11], titleKey: 'pj12Title', summaryKey: 'pj12Summary', bodyKey: 'pj12Body' },
  { id: '13', slug: 'workplace-post-pandemic', date: '2025-08-05', readTimeMinutes: 11, authorsKey: 'authors13', image: IMG_NEWS[12], titleKey: 'pj13Title', summaryKey: 'pj13Summary', bodyKey: 'pj13Body' },
  { id: '14', slug: 'parametric-facades-performance', date: '2025-07-28', readTimeMinutes: 10, authorsKey: 'authors14', image: IMG_NEWS[13], titleKey: 'pj14Title', summaryKey: 'pj14Summary', bodyKey: 'pj14Body' },
  { id: '15', slug: 'infrastructure-urban-connectivity', date: '2025-07-22', readTimeMinutes: 12, authorsKey: 'authors15', image: IMG_NEWS[14], titleKey: 'pj15Title', summaryKey: 'pj15Summary', bodyKey: 'pj15Body' },
  { id: '16', slug: 'circular-economy-buildings', date: '2025-07-15', readTimeMinutes: 14, authorsKey: 'authors16', image: IMG_NEWS[15], titleKey: 'pj16Title', summaryKey: 'pj16Summary', bodyKey: 'pj16Body' },
  { id: '17', slug: 'healthcare-design-wellbeing', date: '2025-07-10', readTimeMinutes: 9, authorsKey: 'authors17', image: IMG_NEWS[16], titleKey: 'pj17Title', summaryKey: 'pj17Summary', bodyKey: 'pj17Body' },
  { id: '18', slug: 'smart-cities-data', date: '2025-07-05', readTimeMinutes: 11, authorsKey: 'authors18', image: IMG_NEWS[17], titleKey: 'pj18Title', summaryKey: 'pj18Summary', bodyKey: 'pj18Body' },
  { id: '19', slug: 'adaptive-reuse-heritage', date: '2025-06-28', readTimeMinutes: 13, authorsKey: 'authors19', image: IMG_NEWS[18], titleKey: 'pj19Title', summaryKey: 'pj19Summary', bodyKey: 'pj19Body' },
  { id: '20', slug: 'transport-hub-design', date: '2025-06-20', readTimeMinutes: 10, authorsKey: 'authors20', image: IMG_NEWS[19], titleKey: 'pj20Title', summaryKey: 'pj20Summary', bodyKey: 'pj20Body' },
  { id: '21', slug: 'landscape-architecture-urban', date: '2025-06-15', readTimeMinutes: 8, authorsKey: 'authors21', image: IMG_NEWS[20], titleKey: 'pj21Title', summaryKey: 'pj21Summary', bodyKey: 'pj21Body' },
  { id: '22', slug: 'mass-timber-construction', date: '2025-06-10', readTimeMinutes: 12, authorsKey: 'authors22', image: IMG_NEWS[21], titleKey: 'pj22Title', summaryKey: 'pj22Summary', bodyKey: 'pj22Body' },
  { id: '23', slug: 'acoustic-design-public-spaces', date: '2025-06-05', readTimeMinutes: 9, authorsKey: 'authors23', image: IMG_NEWS[22], titleKey: 'pj23Title', summaryKey: 'pj23Summary', bodyKey: 'pj23Body' },
  { id: '24', slug: 'vertical-gardens-sustainability', date: '2025-05-28', readTimeMinutes: 10, authorsKey: 'authors24', image: IMG_NEWS[23], titleKey: 'pj24Title', summaryKey: 'pj24Summary', bodyKey: 'pj24Body' },
  { id: '25', slug: 'modular-housing-solutions', date: '2025-05-22', readTimeMinutes: 11, authorsKey: 'authors25', image: IMG_NEWS[24], titleKey: 'pj25Title', summaryKey: 'pj25Summary', bodyKey: 'pj25Body' },
  { id: '26', slug: 'civic-space-democracy', date: '2025-05-15', readTimeMinutes: 14, authorsKey: 'authors26', image: IMG_NEWS[25], titleKey: 'pj26Title', summaryKey: 'pj26Summary', bodyKey: 'pj26Body' },
  { id: '27', slug: 'lighting-design-architecture', date: '2025-05-10', readTimeMinutes: 8, authorsKey: 'authors27', image: IMG_NEWS[26], titleKey: 'pj27Title', summaryKey: 'pj27Summary', bodyKey: 'pj27Body' },
  { id: '28', slug: 'waterfront-development', date: '2025-05-05', readTimeMinutes: 13, authorsKey: 'authors28', image: IMG_NEWS[27], titleKey: 'pj28Title', summaryKey: 'pj28Summary', bodyKey: 'pj28Body' },
  { id: '29', slug: 'education-campus-design', date: '2025-04-28', readTimeMinutes: 10, authorsKey: 'authors29', image: IMG_NEWS[28], titleKey: 'pj29Title', summaryKey: 'pj29Summary', bodyKey: 'pj29Body' },
  { id: '30', slug: 'innovation-labs-research', date: '2025-04-20', readTimeMinutes: 9, authorsKey: 'authors30', image: IMG_NEWS[29], titleKey: 'pj30Title', summaryKey: 'pj30Summary', bodyKey: 'pj30Body' },
];

export const PLUS_JOURNAL_BY_SLUG = new Map(PLUS_JOURNAL_ARTICLES.map((a) => [a.slug, a]));

// Publications: title, details (year - publisher), image, no detail page
export interface Publication {
  id: string;
  titleKey: string;
  year: string;
  publisherKey: string;
  image: string;
  buyUrl?: string;
}

export const PUBLICATIONS: Publication[] = [
  { id: '1', titleKey: 'pub1Title', year: '2024', publisherKey: 'publisherDetail', image: IMG_PROJECTS[0] },
  { id: '2', titleKey: 'pub2Title', year: '2023', publisherKey: 'publisherTaschen', image: IMG_PROJECTS[1] },
  { id: '3', titleKey: 'pub3Title', year: '2023', publisherKey: 'publisherTaschen', image: IMG_PROJECTS[2] },
  { id: '4', titleKey: 'pub4Title', year: '2022', publisherKey: 'publisherTaschen', image: IMG_PROJECTS[3] },
  { id: '5', titleKey: 'pub5Title', year: '2021', publisherKey: 'publisherPhaidon', image: IMG_PROJECTS[4] },
  { id: '6', titleKey: 'pub6Title', year: '2020', publisherKey: 'publisherPhaidon', image: IMG_PROJECTS[5] },
  { id: '7', titleKey: 'pub7Title', year: '2019', publisherKey: 'publisherTaschen', image: IMG_PROJECTS[6] },
  { id: '8', titleKey: 'pub8Title', year: '2018', publisherKey: 'publisherDetail', image: IMG_PROJECTS[7] },
  { id: '9', titleKey: 'pub9Title', year: '2017', publisherKey: 'publisherPhaidon', image: IMG_PROJECTS[8] },
  { id: '10', titleKey: 'pub10Title', year: '2016', publisherKey: 'publisherTaschen', image: IMG_PROJECTS[9] },
];
