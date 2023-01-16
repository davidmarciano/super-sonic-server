export interface RecommendedApp {
  id: number;
  name: string;
  category: string;
  external_id: string;
  rating: number;
  install_count: string
  description: string;
  url: string;
  publisher: string;
  icon: string;
  min_age: number;
}

export interface FindQuery {
  count: number;
  offset: number;
  name: string;
  category: string;
  min_age: number;
  rating: number;
}

type NormalizedApp = Omit<RecommendedApp, 'external_id' | 'install_count' | 'description' | 'publisher'>;

export type FilterKeys = keyof Omit<NormalizedApp, 'id' | 'icon'>

export interface FindResponse {
  apps: NormalizedApp[];
  totalCount: number;
};