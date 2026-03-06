/**
 * All image paths (public folder). Use these constants everywhere so paths stay in sync.
 * Files must exist in myapp/public/
 */
const base = '' as const;

// People (banner, cards, person photos)
export const IMG = {
  people: `${base}/people.jpg`,
  peopleAll: `${base}/people-all.jpg`,
  peopleTeams: `${base}/people-teams.jpg`,
  peopleBanner: `${base}/people-banner.png`,
  // Person 1–20 (note: person 6 file is peopl6.jpg)
  people1: `${base}/people1.jpg`,
  people2: `${base}/people2.jpg`,
  people3: `${base}/people3.jpg`,
  people4: `${base}/people4.jpg`,
  people5: `${base}/people5.jpg`,
  people6: `${base}/peopl6.jpg`,
  people7: `${base}/people7.jpg`,
  people8: `${base}/people8.jpg`,
  people9: `${base}/people9.jpg`,
  people10: `${base}/people10.jpg`,
  people11: `${base}/people11.jpg`,
  people12: `${base}/people12.jpg`,
  people13: `${base}/people13.jpg`,
  people14: `${base}/people14.jpg`,
  people15: `${base}/people15.jpg`,
  people16: `${base}/people16.jpg`,
  people17: `${base}/people17.jpg`,
  people18: `${base}/people18.jpg`,
  people19: `${base}/people19.jpg`,
  people20: `${base}/people20.jpg`,
} as const;

// Projects p1–p24
export const IMG_PROJECTS = [
  `${base}/p1.jpg`, `${base}/p2.jpg`, `${base}/p3.jpg`, `${base}/p4.jpg`, `${base}/p5.jpg`,
  `${base}/p6.jpg`, `${base}/p7.jpg`, `${base}/p8.jpg`, `${base}/p9.jpg`, `${base}/p10.jpg`,
  `${base}/p11.jpg`, `${base}/p12.jpg`, `${base}/p13.jpg`, `${base}/p14.jpg`, `${base}/p15.jpg`,
  `${base}/p16.jpg`, `${base}/p17.jpg`, `${base}/p18.jpg`, `${base}/p19.jpg`, `${base}/p20.jpg`,
  `${base}/p21.jpg`, `${base}/p22.jpg`, `${base}/p23.jpg`, `${base}/p24.jpg`,
] as const;

// News (news1–10, then p1–15, then hero/expertise)
export const IMG_NEWS = [
  `${base}/news1.jpg`, `${base}/news2.jpg`, `${base}/news3.jpg`, `${base}/news4.png`, `${base}/news5.jpg`,
  `${base}/news6.jpg`, `${base}/news7.jpg`, `${base}/news8.jpg`, `${base}/news9.jpg`, `${base}/news10.jpg`,
  `${base}/p1.jpg`, `${base}/p2.jpg`, `${base}/p3.jpg`, `${base}/p4.jpg`, `${base}/p5.jpg`,
  `${base}/p6.jpg`, `${base}/p7.jpg`, `${base}/p8.jpg`, `${base}/p9.jpg`, `${base}/p10.jpg`,
  `${base}/p11.jpg`, `${base}/p12.jpg`, `${base}/p13.jpg`, `${base}/p14.jpg`, `${base}/p15.jpg`,
  `${base}/hero-main.png`, `${base}/hero-main2.png`, `${base}/expertise-interior.png`, `${base}/climate.jpg`, `${base}/interiors.png`,
] as const;

// Teams / expertise
export const IMG_EXPERTISE = {
  expertiseBanner: `${base}/expertise-banner2.png`,
  expertiseInterior: `${base}/expertise-interior.png`,
  climate: `${base}/climate.jpg`,
  enginering: `${base}/enginering.png`,
  technology: `${base}/technology.png`,
  interiors: `${base}/interiors.png`,
  urban: `${base}/urban.png`,
  worfplace: `${base}/worfplace.png`,
  studioAbout: `${base}/studio-about.png`,
  architecture: `${base}/architecture.png`,
  lifeAtFoster: `${base}/life-at-foster-plus-partners.png`,
  equityDiversity: `${base}/equity-diversity-and-inclusion.png`,
  globalStudio: `${base}/global-studio.png`,
} as const;

// Other
export const IMG_MISC = {
  latestNews: `${base}/latest-news.png`,
  heroMain: `${base}/hero-main.png`,
  heroMain2: `${base}/hero-main2.png`,
  heroMain3: `${base}/hero-main3.png`,
  studioVacancies: `${base}/studio-vacancies.png`,
  contactHero: `${base}/A.Mehroj.jpg`,
} as const;

// Careers (banner + 2 cards)
export const IMG_CAREERS = {
  banner: `${base}/p16.jpg`,
  vacancies: `${base}/studio-vacancies.png`,
  life: `${base}/life-at-foster-plus-partners.png`,
} as const;

// Insights (banner + 2 cards)
export const IMG_INSIGHTS = {
  banner: `${base}/latest-news.png`,
  plusJournal: `${base}/p7.jpg`,
  publications: `${base}/interiors.png`,
} as const;
