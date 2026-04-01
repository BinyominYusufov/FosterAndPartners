/**
 * DRF pagination envelope:
 * { count, next, previous, results }.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ========= Auth (/token, /token/refresh) =========

export interface TokenObtainPair {
  username: string;
  password: string;
}

export interface TokenObtainPairResponse {
  access: string;
  refresh: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}

// ========= Contact messages (/contact-messages, POST) =========

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// ========= Expertise (/expertise) =========

export interface ExpertiseTopicList {
  id: number;
  slug: string;
  title: string | null;
  description: string | null;
  image: string | null;
  order: number;
  titleKey?: string | null;
  descriptionKey?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpertiseTopicDetail extends ExpertiseTopicList {
  is_published: boolean;
}

// ========= Insights: Plus Journal (/insights/plus-journal) =========

export interface JournalArticleList {
  id: number;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  titleKey?: string | null;
  summaryKey?: string | null;
  authors?: string | null;
  authorsKey?: string | null;
  date?: string | null;
  read_time_minutes?: number | null;
  readTimeMinutes?: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface JournalArticleDetail extends JournalArticleList {
  body: string;
  bodyKey?: string | null;
  is_published: boolean;
}

// Backwards-compatible aliases used in UI routes/components.
export type PlusJournalArticle = JournalArticleList;
export type PlusJournalArticleDetail = JournalArticleDetail;
export type PlusJournalArticleList = JournalArticleList;

export interface JournalArticleWrite {
  id?: number;
  slug: string;
  title_en?: string;
  title_ru?: string;
  title_tj?: string;
  title_cn?: string;
  summary_en?: string;
  summary_ru?: string;
  summary_tj?: string;
  summary_cn?: string;
  body_en?: string;
  body_ru?: string;
  body_tj?: string;
  body_cn?: string;
  published_at?: string | null;
  is_published?: boolean;
}

// ========= News (/news) =========

export type NewsArticleType = 'news' | 'press' | 'event' | 'blog';

export interface NewsArticleList {
  id: number;
  slug: string;
  type: NewsArticleType;
  title: string;
  summary: string;
  image: string | null;
  /**
   * Optional fields used by the UI as fallbacks or legacy API compatibility.
   * Keep them optional to avoid runtime crashes when backend doesn't provide them.
   */
  date?: string | null;
  read_time_minutes?: number | null;
  readTimeMinutes?: number | null;
  titleKey?: string | null;
  summaryKey?: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsArticleDetail extends NewsArticleList {
  body: string;
  bodyKey?: string | null;
  is_published: boolean;
}

// ========= Newsletter subscriptions (/newsletter-subscriptions, POST) =========

export interface NewsletterSubscription {
  email: string;
}

// ========= People (/people) =========

export interface PersonList {
  id: number;
  slug: string | null;
  /**
   * Some UI pages expect legacy/aggregated fields.
   * Keep optional to avoid coupling to a single backend shape.
   */
  name?: string | null;
  nameKey?: string | null;
  titleKey?: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  position: string;
  board: string;
  is_board_member: boolean;
  is_active: boolean;
  title: string;
  role: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PersonDetail extends PersonList {
  bio: string;
  is_published: boolean;
}

// ========= Projects (/projects) =========

export interface ProjectList {
  id: number;
  slug: string | null;
  type: string;
  region: string;
  year: number | null;
  location: string;
  is_featured: boolean;
  completed_at: string | null;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends ProjectList {
  is_published: boolean;
}

// ========= Publications (/publications) =========

export interface PublicationList {
  id: number;
  slug: string | null;
  title: string;
  description: string;
  file: string | null;
  cover_image: string | null;
  /**
   * Optional fields referenced by the current UI.
   * Some backends expose these; others only provide cover_image/file.
   */
  image?: string | null;
  year?: number | null;
  publisher?: string | null;
  publisherKey?: string | null;
  buy_url?: string | null;
  buyUrl?: string | null;
  titleKey?: string | null;
  descriptionKey?: string | null;
  published_at: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface PublicationDetail extends PublicationList {
  is_published: boolean;
}

/**
 * Convenience aliases used throughout the client app.
 * Prefer the more specific *List/*Detail types in new code.
 */
export type NewsArticle = NewsArticleDetail;
export type Publication = PublicationDetail;
export type Project = ProjectDetail;
export type Person = PersonDetail;
export type Team = TeamDetail;
export type ExpertiseTopic = ExpertiseTopicDetail;
export type StudioTopic = StudioTopicDetail;

export interface PublicationWrite {
  id?: number;
  slug?: string | null;
  title_en?: string;
  title_ru?: string;
  title_tj?: string;
  title_cn?: string;
  description_en?: string;
  description_ru?: string;
  description_tj?: string;
  description_cn?: string;
  published_at?: string | null;
  is_published?: boolean;
  order?: number;
}

// ========= Studio topics (/studio-topics) =========

export interface StudioTopicList {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface StudioTopicDetail extends StudioTopicList {
  is_published: boolean;
}

export interface StudioTopicWrite {
  id?: number;
  slug: string;
  title_en?: string;
  title_ru?: string;
  title_tj?: string;
  title_cn?: string;
  description_en?: string;
  description_ru?: string;
  description_tj?: string;
  description_cn?: string;
  is_published?: boolean;
  order?: number;
}

// ========= Teams (/teams) =========

export interface TeamList {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  order: number;
  titleKey?: string | null;
  descriptionKey?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamDetail extends TeamList {
  is_published: boolean;
}
