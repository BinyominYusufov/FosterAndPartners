import { IMG_PROJECTS } from '@/lib/images'

export type ProjectType =
  | 'Residential'
  | 'Commercial'
  | 'Infrastructure'
  | 'Masterplan'
  | 'Cultural'

export type ProjectRegion =
  | 'Europe'
  | 'Middle East'
  | 'Asia'
  | 'North America'

export interface Project {
  id: string
  year: number
  type: ProjectType
  region: ProjectRegion
  location: string
  image: string
}

export const projects: Project[] = [
  { id: '1', year: 2017, type: 'Commercial', region: 'Europe', location: 'London, UK', image: IMG_PROJECTS[0] },
  { id: '2', year: 2017, type: 'Commercial', region: 'North America', location: 'Cupertino, USA', image: IMG_PROJECTS[1] },
  { id: '3', year: 2004, type: 'Infrastructure', region: 'Europe', location: 'Millau, France', image: IMG_PROJECTS[2] },
  { id: '4', year: 2006, type: 'Commercial', region: 'North America', location: 'New York, USA', image: IMG_PROJECTS[3] },
  { id: '5', year: 2016, type: 'Masterplan', region: 'Middle East', location: 'Abu Dhabi, UAE', image: IMG_PROJECTS[4] },
  { id: '6', year: 2003, type: 'Commercial', region: 'Europe', location: 'London, UK', image: IMG_PROJECTS[5] },
  { id: '7', year: 1997, type: 'Cultural', region: 'Europe', location: 'Glasgow, UK', image: IMG_PROJECTS[6] },
  { id: '8', year: 2010, type: 'Commercial', region: 'Asia', location: 'Singapore', image: IMG_PROJECTS[7] },
  { id: '9', year: 1999, type: 'Cultural', region: 'Europe', location: 'Berlin, Germany', image: IMG_PROJECTS[8] },
  { id: '10', year: 2018, type: 'Commercial', region: 'North America', location: 'Philadelphia, USA', image: IMG_PROJECTS[9] },
  { id: '11', year: 2022, type: 'Cultural', region: 'Middle East', location: 'Lusail, Qatar', image: IMG_PROJECTS[10] },
  { id: '12', year: 2022, type: 'Residential', region: 'Europe', location: 'London, UK', image: IMG_PROJECTS[11] },
  { id: '13', year: 1998, type: 'Infrastructure', region: 'Asia', location: 'Hong Kong', image: IMG_PROJECTS[12] },
  { id: '14', year: 1978, type: 'Cultural', region: 'Europe', location: 'Norwich, UK', image: IMG_PROJECTS[13] },
  { id: '15', year: 2010, type: 'Commercial', region: 'Middle East', location: 'Abu Dhabi, UAE', image: IMG_PROJECTS[14] },
  { id: '16', year: 2004, type: 'Residential', region: 'Europe', location: 'St. Moritz, Switzerland', image: IMG_PROJECTS[15] },
  { id: '17', year: 1985, type: 'Residential', region: 'Europe', location: 'London, UK', image: IMG_PROJECTS[16] },
  { id: '18', year: 1975, type: 'Commercial', region: 'Europe', location: 'Ipswich, UK', image: IMG_PROJECTS[17] },
  { id: '19', year: 2008, type: 'Infrastructure', region: 'Asia', location: 'Beijing, China', image: IMG_PROJECTS[18] },
  { id: '20', year: 2023, type: 'Cultural', region: 'Middle East', location: 'Abu Dhabi, UAE', image: IMG_PROJECTS[19] },
  { id: '21', year: 1995, type: 'Masterplan', region: 'Europe', location: 'London, UK', image: IMG_PROJECTS[20] },
  { id: '22', year: 2014, type: 'Commercial', region: 'North America', location: 'New York, USA', image: IMG_PROJECTS[21] },
  { id: '23', year: 2009, type: 'Masterplan', region: 'Asia', location: 'Incheon, South Korea', image: IMG_PROJECTS[22] },
  { id: '24', year: 1985, type: 'Cultural', region: 'Europe', location: 'Nîmes, France', image: IMG_PROJECTS[23] },
]
