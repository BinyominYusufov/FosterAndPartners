import { IMG_EXPERTISE } from '@/lib/images';

export interface Team {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
}

export const TEAMS: Team[] = [
  { slug: 'architecture', titleKey: 'architecture', descriptionKey: 'architectureDesc', image: IMG_EXPERTISE.expertiseInterior },
  { slug: 'industrial-design', titleKey: 'industrialDesign', descriptionKey: 'industrialDesignDesc', image: IMG_EXPERTISE.lifeAtFoster },
  { slug: 'urban-design-and-landscape', titleKey: 'urbanDesignAndLandscape', descriptionKey: 'urbanDesignDesc', image: IMG_EXPERTISE.climate },
  { slug: 'structure', titleKey: 'structure', descriptionKey: 'structureDesc', image: IMG_EXPERTISE.enginering },
  { slug: 'interiors', titleKey: 'interiors', descriptionKey: 'interiorsDesc', image: IMG_EXPERTISE.interiors },
  { slug: 'sustainability', titleKey: 'sustainability', descriptionKey: 'sustainabilityDesc', image: IMG_EXPERTISE.climate },
  { slug: 'technology', titleKey: 'technology', descriptionKey: 'technologyDesc', image: IMG_EXPERTISE.technology },
  { slug: 'engineering', titleKey: 'engineering', descriptionKey: 'engineeringDesc', image: IMG_EXPERTISE.enginering },
  { slug: 'workplace', titleKey: 'workplace', descriptionKey: 'workplaceDesc', image: IMG_EXPERTISE.worfplace },
  { slug: 'master-planning', titleKey: 'masterPlanning', descriptionKey: 'masterPlanningDesc', image: IMG_EXPERTISE.studioAbout },
  { slug: 'research', titleKey: 'research', descriptionKey: 'researchDesc', image: IMG_EXPERTISE.technology },
  { slug: 'transport', titleKey: 'transport', descriptionKey: 'transportDesc', image: IMG_EXPERTISE.urban },
  { slug: 'residential', titleKey: 'residential', descriptionKey: 'residentialDesc', image: IMG_EXPERTISE.expertiseInterior },
  { slug: 'cultural', titleKey: 'cultural', descriptionKey: 'culturalDesc', image: IMG_EXPERTISE.architecture },
  { slug: 'facade', titleKey: 'facade', descriptionKey: 'facadeDesc', image: IMG_EXPERTISE.interiors },
  { slug: 'environmental', titleKey: 'environmental', descriptionKey: 'environmentalDesc', image: IMG_EXPERTISE.climate },
  { slug: 'digital', titleKey: 'digital', descriptionKey: 'digitalDesc', image: IMG_EXPERTISE.technology },
  { slug: 'innovation', titleKey: 'innovation', descriptionKey: 'innovationDesc', image: IMG_EXPERTISE.lifeAtFoster },
  { slug: 'collaboration', titleKey: 'collaboration', descriptionKey: 'collaborationDesc', image: IMG_EXPERTISE.equityDiversity },
  { slug: 'global-studio', titleKey: 'globalStudio', descriptionKey: 'globalStudioDesc', image: IMG_EXPERTISE.globalStudio },
];

export const TEAMS_BY_SLUG = new Map(TEAMS.map((t) => [t.slug, t]));
