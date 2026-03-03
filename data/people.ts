export type PeopleTitle = 'Senior Partner' | 'Partner' | 'Associate Partner' | 'Associate';
export type PeopleBoard = 'Design' | 'Engineering' | 'Sustainability' | 'Leadership';

import { IMG } from '@/lib/images';

export interface Person {
  id: number;
  nameKey: string;
  title: PeopleTitle;
  board: PeopleBoard;
  image: string;
}

const PEOPLE_IDS = Array.from({ length: 20 }, (_, i) => i + 1);

const PEOPLE_IMAGES = [IMG.people1, IMG.people2, IMG.people3, IMG.people4, IMG.people5, IMG.people6, IMG.people7, IMG.people8, IMG.people9, IMG.people10, IMG.people11, IMG.people12, IMG.people13, IMG.people14, IMG.people15, IMG.people16, IMG.people17, IMG.people18, IMG.people19, IMG.people20] as const;

// Same 20 people in different order per section (so it's not obviously the same set)
export const SECTION_ORDER: Record<string, number[]> = {
  seniorPartners: [1, 5, 9, 13, 17, 2, 6, 10, 14, 18, 3, 7, 11, 15, 19, 4, 8, 12, 16, 20],
  partners: [12, 3, 18, 8, 14, 20, 6, 1, 16, 10, 4, 19, 11, 7, 2, 15, 9, 5, 17, 13],
  associatePartners: [7, 14, 2, 11, 20, 5, 16, 9, 4, 13, 18, 1, 10, 19, 6, 15, 3, 12, 8, 17],
  associates: [20, 8, 15, 4, 11, 17, 6, 13, 2, 19, 10, 7, 16, 1, 14, 9, 18, 5, 12, 3],
};

export const PEOPLE: Person[] = [
  { id: 1, nameKey: 'person1', title: 'Senior Partner', board: 'Design', image: PEOPLE_IMAGES[0] },
  { id: 2, nameKey: 'person2', title: 'Senior Partner', board: 'Engineering', image: PEOPLE_IMAGES[1] },
  { id: 3, nameKey: 'person3', title: 'Senior Partner', board: 'Sustainability', image: PEOPLE_IMAGES[2] },
  { id: 4, nameKey: 'person4', title: 'Senior Partner', board: 'Leadership', image: PEOPLE_IMAGES[3] },
  { id: 5, nameKey: 'person5', title: 'Senior Partner', board: 'Design', image: PEOPLE_IMAGES[4] },
  { id: 6, nameKey: 'person6', title: 'Partner', board: 'Engineering', image: PEOPLE_IMAGES[5] },
  { id: 7, nameKey: 'person7', title: 'Partner', board: 'Sustainability', image: PEOPLE_IMAGES[6] },
  { id: 8, nameKey: 'person8', title: 'Partner', board: 'Leadership', image: PEOPLE_IMAGES[7] },
  { id: 9, nameKey: 'person9', title: 'Partner', board: 'Design', image: PEOPLE_IMAGES[8] },
  { id: 10, nameKey: 'person10', title: 'Partner', board: 'Engineering', image: PEOPLE_IMAGES[9] },
  { id: 11, nameKey: 'person11', title: 'Associate Partner', board: 'Sustainability', image: PEOPLE_IMAGES[10] },
  { id: 12, nameKey: 'person12', title: 'Associate Partner', board: 'Leadership', image: PEOPLE_IMAGES[11] },
  { id: 13, nameKey: 'person13', title: 'Associate Partner', board: 'Design', image: PEOPLE_IMAGES[12] },
  { id: 14, nameKey: 'person14', title: 'Associate Partner', board: 'Engineering', image: PEOPLE_IMAGES[13] },
  { id: 15, nameKey: 'person15', title: 'Associate Partner', board: 'Sustainability', image: PEOPLE_IMAGES[14] },
  { id: 16, nameKey: 'person16', title: 'Associate', board: 'Leadership', image: PEOPLE_IMAGES[15] },
  { id: 17, nameKey: 'person17', title: 'Associate', board: 'Design', image: PEOPLE_IMAGES[16] },
  { id: 18, nameKey: 'person18', title: 'Associate', board: 'Engineering', image: PEOPLE_IMAGES[17] },
  { id: 19, nameKey: 'person19', title: 'Associate', board: 'Sustainability', image: PEOPLE_IMAGES[18] },
  { id: 20, nameKey: 'person20', title: 'Associate', board: 'Leadership', image: PEOPLE_IMAGES[19] },
];

export const PEOPLE_BY_ID = new Map(PEOPLE.map((p) => [p.id, p]));

export const SECTION_KEYS = ['seniorPartners', 'partners', 'associatePartners', 'associates'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export function getPeopleInSectionOrder(sectionKey: SectionKey): Person[] {
  const order = SECTION_ORDER[sectionKey] ?? PEOPLE_IDS;
  return order.map((id) => PEOPLE_BY_ID.get(id)).filter(Boolean) as Person[];
}
